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
#include "ProtocolExtend.h"
#include "PluginJniHelper.h"
#include <android/log.h>
#include "PluginUtils.h"
#include "PluginJavaData.h"


namespace cocos2d { namespace plugin {

extern "C" {
	JNIEXPORT void JNICALL Java_org_cocos2dx_plugin_ExtendWrapper_nativeOnExtendResult(JNIEnv* env, jobject thiz, jstring className, jint ret, jstring msg, jstring extendResult)
	{
		std::string strMsg = PluginJniHelper::jstring2string(msg);
		std::string strClassName = PluginJniHelper::jstring2string(className);
		std::string strExtendResult = PluginJniHelper::jstring2string(extendResult);
		PluginProtocol* pPlugin = PluginUtils::getPluginPtr(strClassName);

		PluginUtils::outputLog("ProtocolExtend", "nativeOnExtendResult(), Get plugin ptr : %p", pPlugin);
		if (pPlugin != NULL)
		{
			PluginUtils::outputLog("ProtocolExtend", "nativeOnExtendResult(), Get plugin name : %s", pPlugin->getPluginName());
			ProtocolExtend* pExtend = dynamic_cast<ProtocolExtend*>(pPlugin);
			if (pExtend != NULL)
			{
				PluginUtils::outputLog("ProtocolExtend", "nativeOnExtendResult(), Json String : %s", strExtendResult.c_str());
				PluginUtils::parseSimpleJson2Map(strExtendResult,pExtend->m_curInfo);
				pExtend->onExtendResult((ExtendResultCode) ret, strMsg.c_str());
			}
		}
	}
}

bool ProtocolExtend::m_bExtend = false;
ProtocolExtend::ProtocolExtend()
: m_pListener(NULL)
{
}

ProtocolExtend::~ProtocolExtend()
{
}

void ProtocolExtend::jumpToUserCenter()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "enterUserCenter"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolExtend::jumpToSocial()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "showSocial"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolExtend::jumpToFeedBack()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "feedBack"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolExtend::jumpToBBS()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "showBBS"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}

}

void ProtocolExtend::shareToThirdPlatformWithScreenShot(const std::string& strText, const std::string& pPath)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "shareToThirdPlatformWithRGB"
		, "(Ljava/lang/String;Ljava/lang/String;)V"))
	{
		// invoke java method

		jstring jstrText = t.env->NewStringUTF(strText.c_str());
		jstring jstrPath = t.env->NewStringUTF(pPath.c_str());

		t.env->CallVoidMethod(pData->jobj, t.methodID, jstrText, jstrPath);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jstrText);
		t.env->DeleteLocalRef(jstrPath);
	}
}

//int shareToThirdPlatformWithFile(const std::string& strText, const std::string& strFile)
//{
//	unsigned long nSize = 0;
//	unsigned char* buff = CCFileUtils::getFileData(strFile.c_str(), "r", &nSize);
//
//	if(nSize <= 0)
//	{
//		return -1;
//	}
//
//	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
//	PluginJniMethodInfo t;
//	int result = -1;
//	if (PluginJniHelper::getMethodInfo(t
//		, pData->jclassName.c_str()
//		, "shareToThirdPlatformWithImageBuffer"
//		, "(Ljava/lang/String;[III)V"))
//	{
//		// invoke java method
//		jbyteArray jbuff = t.env->NewByteArray(nSize);
//		t.env->SetByteArrayRegion(jbuff, 0, nSize, (jbyte*)buff);
//
//		jstring jstrText = t.env->NewStringUTF(strText.c_str());
//	    result = t.env->CallIntMethod(t.classID, t.methodID, jstrText, jbuff);
//
//		t.env->DeleteLocalRef(t.classID);
//		t.env->DeleteLocalRef(jstrText);
//		t.env->DeleteLocalRef(jbuff);
//		return result;
//	}
//	else
//	{
//		PluginUtils::outputLog("%s::shareToThirdPlatformWithImageBuffer not valid!", this->getPluginName());
//	}
//
//	delete[] buff;
//	return result;
//}

void ProtocolExtend::onPause(){
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getStaticMethodInfo(t
		, pData->jclassName.c_str()
		, "onResume"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolExtend::onExit(){
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "onExit"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}


void ProtocolExtend::create_toolbar()
{

	PluginUtils::outputLog("ProtocolExtend", "create_toolbar");

	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "createToolBar"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolExtend::jumpToExtend(int tag)
{
	PluginUtils::outputLog("ProtocolExtend", "jumpToExtend");

		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "jumpToExtend"
			, "(I)V"))
		{
			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, tag);
			t.env->DeleteLocalRef(t.classID);
		}
}

void ProtocolExtend::jumpToExtend(int tag, TExtendInfo info)
{
	PluginUtils::outputLog("ProtocolExtend", "jumpToExtend");

		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "jumpToExtend"
			, "(ILjava/util/Hashtable;)V"))
		{
			PluginUtils::outputLog("ProtocolExtend", "jumpToExtend22222222");
			jobject obj_Map = PluginUtils::createJavaMapObject(&info);

			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, tag, obj_Map);
			t.env->DeleteLocalRef(obj_Map);
			t.env->DeleteLocalRef(t.classID);
		}
}

void ProtocolExtend::setResultListener(ExtendResultListener* pListener)
{
	m_pListener = pListener;
}

void ProtocolExtend::onExtendResult(ExtendResultCode ret, const char* msg)
{
	TExtendInfo::iterator it;
	for(it=m_curInfo.begin();it!=m_curInfo.end();it++)
	{
		std::string value = it->second;
		PluginUtils::outputLog("ProtocolExtend::onExtendResult", "%s",value.c_str());
	}
    m_bExtend = false;
    if (m_pListener)
    {
    	m_pListener->onExtendResult(ret, msg, m_curInfo);
    }
    else
    {
        PluginUtils::outputLog("ProtocolExtend", "Result listener is null!");
    }
    m_curInfo.clear();
    PluginUtils::outputLog("ProtocolExtend", "Extend result is : %d(%s),size:%d", (int) ret, msg, m_curInfo.size());
}

}} // namespace cocos2d { namespace plugin {
