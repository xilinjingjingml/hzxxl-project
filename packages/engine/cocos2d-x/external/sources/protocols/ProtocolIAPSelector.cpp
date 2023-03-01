/****************************************************************************
Copyright (c) 2012-2013 cocos2d-x.org

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
#include "ProtocolIAPSelector.h"
#include "PluginJniHelper.h"
#include "PluginManager.h"
#include <android/log.h>
#include "PluginUtils.h"
#include "PluginJavaData.h"
#include <string>

namespace cocos2d { namespace plugin {

extern "C" {
	JNIEXPORT void JNICALL Java_org_cocos2dx_plugin_IAPSelectorWrapper_nativeOnPaySelectorResult(JNIEnv* env, jobject thiz, jstring className, jstring iapName, jstring msg)
	{
		std::string strMsg = PluginJniHelper::jstring2string(msg);
		std::string strClassName = PluginJniHelper::jstring2string(className);
		std::string strIAPName = PluginJniHelper::jstring2string(iapName);
		PluginProtocol* pPlugin = PluginUtils::getPluginPtr(strClassName);
		PluginUtils::outputLog("ProtocolIAPSelector", "nativeOnPaySelectorResult(), Get plugin ptr : %p", pPlugin);
		if (pPlugin != NULL)
		{
			PluginUtils::outputLog("ProtocolIAPSelector", "nativeOnPaySelectorResult(), Get plugin name : %s", pPlugin->getPluginName());
			ProtocolIAPSelector* pIAPSelector = dynamic_cast<ProtocolIAPSelector*>(pPlugin);
			if (pIAPSelector != NULL)
			{
				pIAPSelector->onPaySelectorResult(strIAPName.c_str(), strMsg.c_str());
			}
		}
	}
}

bool ProtocolIAPSelector::p_bPaying = false;

ProtocolIAPSelector::ProtocolIAPSelector()
: p_pPayResultListener(NULL)
{
}

ProtocolIAPSelector::~ProtocolIAPSelector()
{
}

void ProtocolIAPSelector::configDeveloperInfo(PIAPDeveloperInfo devInfo)
{

	PluginProtocol* plugin_protocol = NULL;
	std::map<std::string, std::string> iap_config;
	std::map<std::string, std::string> iap_type;
	std::map<std::string, std::map<std::string, std::string> >::iterator multitr;
	std::map<std::string, std::string>::iterator intertr;

	for(multitr=devInfo.begin(); multitr!=devInfo.end(); multitr++)
	{
		for(intertr= multitr ->second.begin(); intertr != multitr ->second.end(); intertr ++)
		{
			std::string key = intertr->first;
			iap_config[key] = intertr -> second;
		}

		std::map<std::string, std::string>::iterator iter = iap_config.find("name");

		if( iter != iap_config.end()){
			std::string iap_name = iter ->second;

			PluginUtils::outputLog("ProtocolIAPSelector", ":iap_name::%s",iap_name.c_str());

			plugin_protocol = PluginManager::getInstance()->loadPlugin(iap_name.c_str());

			ProtocolIAP * purchase_ = dynamic_cast<ProtocolIAP*>(plugin_protocol);
			purchase_->configDeveloperInfo(iap_config);
			purchase_->setResultListener(this);
			map_iaps_[iap_name] = purchase_;

			int i = 0;
			char buff[256] = {0};
			sprintf(buff, "payType%d", i);
			std::string pay_type_key = buff;
			iap_type[pay_type_key] = iap_name;
			i++;
		}
	}

	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "configDeveloperInfo"
		, "(Ljava/util/Hashtable;)V"))
	{
		// generate the hashtable from map
		jobject obj_Map = PluginUtils::createJavaMapObject(&iap_type);

		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
		t.env->DeleteLocalRef(obj_Map);
		t.env->DeleteLocalRef(t.classID);
	}

}

void ProtocolIAPSelector::payForProduct(TProductInfo info)
{
    if (p_bPaying)
    {
        PluginUtils::outputLog("ProtocolIAPSelector", "Now is paying");
        return;
    }

    if (info.empty())
    {
        if (NULL != p_pPayResultListener)
        {
            //onPayResult(kPayFail, "Product info error", null);
        	PluginUtils::outputLog("ProtocolIAPSelector", "The product info is empty!");
        }
        return;
    }
    else
    {
        p_bPaying = true;
        p_curInfo = info;

        PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "payForProduct"
			, "(Ljava/util/Hashtable;)V"))
		{
			// generate the hashtable from map
			jobject obj_Map = PluginUtils::createJavaMapObject(&info);

			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
			t.env->DeleteLocalRef(obj_Map);
			t.env->DeleteLocalRef(t.classID);
		}
    }
}

void ProtocolIAPSelector::payForProductWithName(TProductInfo info, const char* iap_name)
{
	if (map_iaps_[iap_name])
	{
		map_iaps_[iap_name]->payForProduct(info);
	}
	else
	{
		PluginUtils::outputLog("ProtocolIAPSelector", "iap plugin is null!");
	}
}

void ProtocolIAPSelector::setPayResultListener(PayResultListener* pListener)
{
	p_pPayResultListener = pListener;
}

void ProtocolIAPSelector::onPaySelectorResult( const char* name, const char* msg)
{
	payForProductWithName(p_curInfo, name);
}

void ProtocolIAPSelector::onPayResult(PayResultCode ret, const char* msg, TProductInfo info)
{
	p_bPaying = false;
	if (p_pPayResultListener)
	{
		p_pPayResultListener->onPayResult(ret, msg, p_curInfo);
	}
	else
	{
		PluginUtils::outputLog("ProtocolIAPSelector", "Result listener is null!");
	}
	p_curInfo.clear();
	PluginUtils::outputLog("ProtocolIAPSelector", "Pay result is : %d(%s)", (int) ret, msg);
}

}} // namespace cocos2d { namespace plugin {
