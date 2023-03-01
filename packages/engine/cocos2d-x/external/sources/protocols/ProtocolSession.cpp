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
#include "ProtocolSession.h"
#include "PluginJniHelper.h"
#include <android/log.h>
#include "PluginUtils.h"
#include "PluginJavaData.h"

namespace cocos2d { namespace plugin {

extern "C" {
	JNIEXPORT void JNICALL Java_org_cocos2dx_plugin_SessionWrapper_nativeOnSessionResult(JNIEnv* env, jobject thiz, jstring className, jint ret, jstring msg, jstring sessionResult)
	{
		std::string strMsg = PluginJniHelper::jstring2string(msg);
		std::string strClassName = PluginJniHelper::jstring2string(className);
		std::string strSessionResult = PluginJniHelper::jstring2string(sessionResult);
		PluginProtocol* pPlugin = PluginUtils::getPluginPtr(strClassName);

		PluginUtils::outputLog("ProtocolSession", "nativeOnSessionResult(), Get plugin ptr : %p", pPlugin);
		if (pPlugin != NULL)
		{
			PluginUtils::outputLog("ProtocolSession", "nativeOnSessionResult(), Get plugin name : %s", pPlugin->getPluginName());
			ProtocolSession* pSession = dynamic_cast<ProtocolSession*>(pPlugin);
			if (pSession != NULL)
			{
				PluginUtils::outputLog("ProtocolSession", "nativeOnSessionResult(), Json String : %s", strSessionResult.c_str());
				PluginUtils::parseSimpleJson2Map(strSessionResult,pSession->m_curInfo);
				pSession->onSessionResult((SessionResultCode) ret, strMsg.c_str());
			}
		}
	}
}

bool ProtocolSession::m_bSession = false;

ProtocolSession::ProtocolSession()
: m_pListener(NULL)
{
}

ProtocolSession::~ProtocolSession()
{
}

void ProtocolSession::configGameInfo(TSessionGameInfo gameInfo)
{
	if (gameInfo.empty())
	{
		PluginUtils::outputLog("ProtocolSession", "The game info is empty!");
		return;
	}
    else
    {
        PluginUtils::outputLog("ProtocolSession", "configGameInfo invoke!!!!!!!!!!");

        PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "configGameInfo"
			, "(Ljava/util/Hashtable;)V"))
		{
			// generate the hashtable from map
			PluginUtils::outputLog("ProtocolSession", "configGameInfo invoke");
			jobject obj_Map = PluginUtils::createJavaMapObject(&gameInfo);

			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
			t.env->DeleteLocalRef(obj_Map);
			t.env->DeleteLocalRef(t.classID);
		}
    }
}

void ProtocolSession::configDeveloperInfo(TSessionDeveloperInfo devInfo)
{
    if (devInfo.empty())
    {
        PluginUtils::outputLog("ProtocolSession", "The developer info is empty!");
        return;
    }
    else
    {
    	PluginUtils::outputLog("ProtocolSession", "begin to config developer info ");
        PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
    	PluginJniMethodInfo t;
        if (PluginJniHelper::getMethodInfo(t
    		, pData->jclassName.c_str()
    		, "configDeveloperInfo"
    		, "(Ljava/util/Hashtable;)V"))
    	{
        	// generate the hashtable from map
        	jobject obj_Map = PluginUtils::createJavaMapObject(&devInfo);

            // invoke java method
            t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
            t.env->DeleteLocalRef(obj_Map);
            t.env->DeleteLocalRef(t.classID);
        }
    }
}

void ProtocolSession::sessionLogin()
{
	PluginUtils::outputLog("ProtocolSession", "begin to login 1 !!! ");

	m_bSession = true;

	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);

	std::string className = pData->jclassName;

	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, className.c_str()
		, "userLogin"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
	else
	{
		PluginUtils::outputLog("ProtocolSession", "can not find java method userLogin !!! ");
	}
}

void ProtocolSession::sessionItemsLogin(TLoginItemsInfo itemsInfo)
{
    if (itemsInfo.empty())
    {
        PluginUtils::outputLog("ProtocolSession", "The itemsInfo is empty!");
        return;
    }
    else
    {
    	PluginUtils::outputLog("ProtocolSession", "begin to config itemsInfo ");
        PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
    	PluginJniMethodInfo t;
        if (PluginJniHelper::getMethodInfo(t
    		, pData->jclassName.c_str()
    		, "userItemsLogin"
    		, "(Ljava/util/Hashtable;)V"))
    	{
        	// generate the hashtable from map
        	jobject obj_Map = PluginUtils::createJavaMapObject(&itemsInfo);

            // invoke java method
            t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
            t.env->DeleteLocalRef(obj_Map);
            t.env->DeleteLocalRef(t.classID);
        }
    }
}

void ProtocolSession::sessionLogout()
{

	m_bSession = true;

	PluginUtils::outputLog("ProtocolSession", "begin to logout");

	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "userLogout"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolSession::setResultListener(SessionResultListener* pListener)
{
	m_pListener = pListener;
}

void ProtocolSession::onSessionResult(SessionResultCode ret, const char* msg)
{
	TUserInfo::iterator it;
	for(it=m_curInfo.begin();it!=m_curInfo.end();it++)
	{
		std::string value = it->second;
		PluginUtils::outputLog("ProtocolSession::onSessionResult", "%s",value.c_str());
	}
    m_bSession = false;
    if (m_pListener)
    {
    	m_pListener->onSessionResult(ret, msg, m_curInfo);
    }
    else
    {
        PluginUtils::outputLog("ProtocolSession", "Result listener is null!");
    }
    m_curInfo.clear();
    PluginUtils::outputLog("ProtocolSession", "Session result is : %d(%s),size:%d", (int) ret, msg, m_curInfo.size());
}

}} // namespace cocos2d { namespace plugin {
