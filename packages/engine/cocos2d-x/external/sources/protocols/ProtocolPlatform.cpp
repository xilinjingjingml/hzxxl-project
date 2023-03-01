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
#include "ProtocolPlatform.h"
#include "PluginJniHelper.h"
#include <android/log.h>
#include "PluginUtils.h"
#include "PluginJavaData.h"


namespace cocos2d { namespace plugin {

extern "C"
{
	JNIEXPORT void JNICALL Java_org_cocos2dx_plugin_PlatformWrapper_nativeOnPlatformResult(JNIEnv* env, jobject thiz, jstring className, jint ret, jstring msg, jstring platformResult)
	{
		std::string strMsg = PluginJniHelper::jstring2string(msg);
		std::string strClassName = PluginJniHelper::jstring2string(className);
		std::string strPlatformResult = PluginJniHelper::jstring2string(platformResult);
		PluginProtocol* pPlugin = PluginUtils::getPluginPtr(strClassName);
		PluginUtils::outputLog("ProtocolPlatform", "nativeOnPlarformResult(), Get plugin ptr : %p", pPlugin);
		if (pPlugin != NULL)
		{
			PluginUtils::outputLog("ProtocolPlatform", "nativeOnPlarformResult(), Get plugin name : %s", pPlugin->getPluginName());
			ProtocolPlatform* pPlatform = dynamic_cast<ProtocolPlatform*>(pPlugin);
			if (pPlatform != NULL)
			{
				pPlatform->onPlatformResult((PlatformResultCode) ret, strMsg.c_str(), strPlatformResult.c_str());
			}
		}
	}
}

ProtocolPlatform::ProtocolPlatform()
{
}

ProtocolPlatform::~ProtocolPlatform()
{
}


void ProtocolPlatform::setResultListener(PlatformResultListener* pListener)
{
	m_pListener = pListener;
}

void ProtocolPlatform::onPlatformResult(PlatformResultCode ret, const char* msg, const char* param)
{
    if (m_pListener)
    {
    	m_pListener->onPlatformResult(ret, msg, param);
    }
    else
    {
        PluginUtils::outputLog("ProtocolPlatform", "Result listener is null!");
    }
    PluginUtils::outputLog("ProtocolPlatform", "Platform result is : %d(%s)", (int) ret, msg);
}

std::string ProtocolPlatform::getGBStringJNI(const char* str)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;

	if(PluginJniHelper::getMethodInfo(t
	   ,"java/lang/String"
	   , "getBytes"
	   , "(Ljava/lang/String;)[B"))
	{
		jstring jMessage = t.env->NewStringUTF(str);
		jstring jEncode = t.env->NewStringUTF("GB2312");

		jbyteArray jBytes = (jbyteArray)t.env->CallObjectMethod(jMessage, t.methodID, jEncode);
		jbyte* ba = t.env->GetByteArrayElements(jBytes, JNI_FALSE);
		std::string ret = (char*)ba;

		t.env->ReleaseByteArrayElements(jBytes, ba, 0);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jMessage);
		t.env->DeleteLocalRef(jEncode);
		return ret;
	}
}

std::string ProtocolPlatform::getUTFStringJNI(const char* pStr)
{

	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;

	if(PluginJniHelper::getMethodInfo(t
	   ,"java/lang/String"
	   ,"<init>"
	   , "([BLjava/lang/String;)V"))
	{
		jbyteArray bytes = t.env->NewByteArray((jsize)strlen(pStr));
		t.env->SetByteArrayRegion(bytes, 0, (jsize)strlen(pStr), (jbyte*)pStr);
		jstring jencoding = t.env->NewStringUTF("GB2312");
		jstring jChar = (jstring)t.env->NewObject(t.classID, t.methodID, bytes, jencoding);

		std::string ret = PluginJniHelper::jstring2string(jChar);

		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(bytes);
		t.env->DeleteLocalRef(jencoding);
		t.env->DeleteLocalRef(jChar);

		return ret;
	}
	return "";
}

void ProtocolPlatform::configDeveloperInfo()
{
	PluginUtils::outputLog("ProtocolPlatform" ,"configDeveloperInfo");

	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "configDeveloperInfo"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
	else
	{
		PluginUtils::outputLog("ProtocolPlatform" ,"ProtocolPlatform::can't find configDeveloperInfo method !");
	}
}

std::string ProtocolPlatform::getDeviceName()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getDeviceName"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jDeviceName = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string deviceName = PluginJniHelper::jstring2string(jDeviceName);

		t.env->DeleteLocalRef(t.classID);

		return deviceName;
	}
}

std::string ProtocolPlatform::getDeviceType()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getDeviceType"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jDeviceType = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string deviceType = PluginJniHelper::jstring2string(jDeviceType);

		t.env->DeleteLocalRef(t.classID);

		return deviceType;
	}
}

std::string ProtocolPlatform::getMacAddress()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getMacAddress"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jMacAddress = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string macAddress = PluginJniHelper::jstring2string(jMacAddress);
		t.env->DeleteLocalRef(t.classID);
		return macAddress;
	}
}

std::string ProtocolPlatform::getDeviceIMEI()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getDeviceIMEI"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jDeviceIMEI = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string deviceIMEI = PluginJniHelper::jstring2string(jDeviceIMEI);
		t.env->DeleteLocalRef(t.classID);
		return deviceIMEI;
	}
}

std::string ProtocolPlatform::getDeviceIMSI()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getDeviceIMSI"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jDeviceIMSI = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string deviceIMSI = PluginJniHelper::jstring2string(jDeviceIMSI);
		t.env->DeleteLocalRef(t.classID);
		return deviceIMSI;
	}
}

std::string ProtocolPlatform::getTelNumber()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getTelNumber"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jTelNumber = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string telNumber = PluginJniHelper::jstring2string(jTelNumber);
		t.env->DeleteLocalRef(t.classID);
		return telNumber;
	}
}

std::string ProtocolPlatform::getSimType()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getSimType"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jSimType = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string simType = PluginJniHelper::jstring2string(jSimType);
		t.env->DeleteLocalRef(t.classID);
		return simType;
	}
}

bool ProtocolPlatform::getSimState()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getSimState"
		, "()Z"))
	{
		// invoke java method
		jboolean jSimState = (jboolean)t.env->CallBooleanMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
		return jSimState;
	}
}

float ProtocolPlatform::getBatteryLevel()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getBatteryLevel"
		, "()F"))
	{
		// invoke java method
		float batteryLevel = t.env->CallFloatMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
		return batteryLevel;
	}
}

int ProtocolPlatform::getReachability()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;

	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getReachability"
		, "()I"))
	{
		// invoke java method
		int reachability = t.env->CallIntMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
		return reachability;
	}
	else
	{
		return 0;
	}
}

void ProtocolPlatform::openURL(std::string strURL)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "openURL"
		, "(Ljava/lang/String;)V"))
	{
		// invoke java method
		jstring jstrURL = t.env->NewStringUTF(strURL.c_str());
		t.env->CallVoidMethod(pData->jobj, t.methodID, jstrURL);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jstrURL);
	}
}

int ProtocolPlatform::isAppExist(const char* pPacketName)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	int ret = 0;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "isAppExist"
		, "(Ljava/lang/String;)I"))
	{
		// invoke java method
		jstring jStrName = t.env->NewStringUTF(pPacketName);
		ret = (int)t.env->CallIntMethod(pData->jobj, t.methodID, jStrName);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jStrName);

		return ret;
	}
}

bool ProtocolPlatform::installApp(const char* pPacketName)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;

	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "installApp"
		, "(Ljava/lang/String;)Z"))
	{
		// invoke java method
		jstring jStrName = t.env->NewStringUTF(pPacketName);
		t.env->CallBooleanMethod(pData->jobj, t.methodID, jStrName);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jStrName);

		return false;
	}
}

bool ProtocolPlatform::openAppJNI(int nBDOPID, const char* strTicket, const char* strPacketName, const char* strAccount, const char* strPassword, const char* strDomain,
		int nGameID, const char* strLoginAddr, int nLoginPort, const char* strServerAddr, int nServerPort, int nChannel)
{
		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;

		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "openApp"
			, "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;ILjava/lang/String;ILjava/lang/String;II)Z"))
		{
			jstring jStrTicket = t.env->NewStringUTF(strTicket);
			jstring jStrPacketName = t.env->NewStringUTF(strPacketName);
			jstring jStrAccount = t.env->NewStringUTF(strAccount);
			jstring jStrPassword = t.env->NewStringUTF(strPassword);
			jstring jStrDomain = t.env->NewStringUTF(strDomain);
			jstring jStrLoginAddr = t.env->NewStringUTF(strLoginAddr);

			jstring jStrServerAddr = t.env->NewStringUTF(strServerAddr);

			t.env->CallBooleanMethod(pData->jobj, t.methodID, nBDOPID, jStrTicket, jStrPacketName,
			jStrAccount, jStrPassword, jStrDomain, nGameID, jStrLoginAddr, nLoginPort, jStrServerAddr, nServerPort, nChannel);

			t.env->DeleteLocalRef(jStrTicket);
			t.env->DeleteLocalRef(jStrPacketName);
			t.env->DeleteLocalRef(jStrAccount);
			t.env->DeleteLocalRef(jStrPassword);
			t.env->DeleteLocalRef(jStrDomain);
			t.env->DeleteLocalRef(jStrLoginAddr);
			t.env->DeleteLocalRef(jStrServerAddr);
			t.env->DeleteLocalRef(t.classID);
		}
		return false;
}

bool ProtocolPlatform::openAppJNI(const char* strPacketName)
{
		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		jboolean jopenApp = false;

		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "openApp"
			, "(Ljava/lang/String;)Z"))
		{
			jstring jStrPacketName = t.env->NewStringUTF(strPacketName);
			jopenApp = t.env->CallBooleanMethod(pData->jobj, t.methodID, jStrPacketName);
			t.env->DeleteLocalRef(jStrPacketName);
			t.env->DeleteLocalRef(t.classID);
		}
		return jopenApp;
}

std::string ProtocolPlatform::getVersionName()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getVersionName"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jVersionName = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string versionName = PluginJniHelper::jstring2string(jVersionName);
		t.env->DeleteLocalRef(t.classID);
		return versionName;
	}
}

std::string ProtocolPlatform::getVersionCode()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getVersionCode"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jVersionCode = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string versionCode = PluginJniHelper::jstring2string(jVersionCode);
		t.env->DeleteLocalRef(t.classID);
		return versionCode;
	}
}

std::string ProtocolPlatform::screenCut()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "screenCut"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jPath = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string path = PluginJniHelper::jstring2string(jPath);
		t.env->DeleteLocalRef(t.classID);

		return path;
	}
}

std::string ProtocolPlatform::getPackageName()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getPackageName"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jPackageName = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string packageName = PluginJniHelper::jstring2string(jPackageName);
		t.env->DeleteLocalRef(t.classID);
		return packageName;
	}
}

bool ProtocolPlatform::installAppJNI(const char* pPacketName)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;

	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "installApp"
		, "(Ljava/lang/String;)Z"))
	{
		jstring jStrName = t.env->NewStringUTF(pPacketName);
		t.env->CallBooleanMethod(pData->jobj, t.methodID, jStrName);
		t.env->DeleteLocalRef(jStrName);
		t.env->DeleteLocalRef(t.classID);
	}
	return false;
}

void ProtocolPlatform::initHeadFace(TPlatformItemsInfo itemsInfo)
{
    if (itemsInfo.empty())
    {
        PluginUtils::outputLog("ProtocolPlatform", "itemsInfo is null");
        initHeadFace();
        return;
    }
    else
    {
    	PluginUtils::outputLog("ProtocolPlatform", "begin to initHeadFace itemsInfo ");
        PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
    	PluginJniMethodInfo t;
        if (PluginJniHelper::getMethodInfo(t
    		, pData->jclassName.c_str()
    		, "initHeadFace"
    		, "(Ljava/util/Hashtable;)V"))
    	{
        	// generate the hashtable from map
        	jobject obj_Map = PluginUtils::createJavaMapObject(&itemsInfo);

            // invoke java method
            t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
            t.env->DeleteLocalRef(obj_Map);
            t.env->DeleteLocalRef(t.classID);
        }
        else
        {
        	PluginUtils::outputLog("ProtocolPlatform" ,"ProtocolPlatform::can't find initHeadFace method !");
        }
    }
}

void ProtocolPlatform::initHeadFace()
{
	PluginUtils::outputLog("ProtocolPlatform" ,"initHeadFace");

	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "initHeadFace"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
	else
	{
		PluginUtils::outputLog("ProtocolPlatform" ,"ProtocolPlatform::can't find initHeadFace method !");
	}
}

void ProtocolPlatform::copyToClipboard(const char* text)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "copyToClipboard"
		, "(Ljava/lang/String;)V"))
	{
		jstring jStrText = t.env->NewStringUTF(text);
		PluginUtils::outputLog("ProtocolPlatform::copyToClipboard",
				"******************************");
		t.env->CallVoidMethod(pData->jobj, t.methodID, jStrText);
		PluginUtils::outputLog("ProtocolPlatform::copyToClipboard",
				"------------------------------");
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jStrText);
	}
	else
	{
		PluginUtils::outputLog("ProtocolPlatform" ,"ProtocolPlatform::can't find copyToClipboard method !");
	}
}

void ProtocolPlatform::callPhone(std::string phonenum)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "callPhone"
		, "(Ljava/lang/String;)V"))
	{
		// invoke java method
		jstring jphonenum = t.env->NewStringUTF(phonenum.c_str());
		t.env->CallVoidMethod(pData->jobj, t.methodID, jphonenum);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jphonenum);
	}
}

std::string ProtocolPlatform::getMetaName(std::string metaname)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getMetaName"
		, "(Ljava/lang/String;)Ljava/lang/String;"))
	{
		// invoke java method
		jstring jmetaname = t.env->NewStringUTF(metaname.c_str());
		t.env->CallVoidMethod(pData->jobj, t.methodID, jmetaname);
		jstring jMetaValue = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string MetaValue = PluginJniHelper::jstring2string(jMetaValue);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jmetaname);
		return MetaValue;
	}
}

void ProtocolPlatform::playSound(std::string filePathString)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "playSound"
		, "(Ljava/lang/String;)V"))
	{
		// invoke java method
		jstring jfilepath = t.env->NewStringUTF(filePathString.c_str());
		t.env->CallVoidMethod(pData->jobj, t.methodID, jfilepath);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jfilepath);
	}
}

void ProtocolPlatform::stopSound()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "stopSound"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::prepareAudio(std::string playerID)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "prepareAudio"
		, "(Ljava/lang/String;)V"))
	{
		// invoke java method
		jstring jplayerID = t.env->NewStringUTF(playerID.c_str());
		t.env->CallVoidMethod(pData->jobj, t.methodID, jplayerID);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jplayerID);
	}
}

void ProtocolPlatform::voiceOver(TPlatformItemsInfo itemsInfo)
{
	if (itemsInfo.empty())
	{
		PluginUtils::outputLog("ProtocolPlatform", "itemsInfo is null");
		voiceOver();
		return;
	}
	else
	{
		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "voiceOver"
			, "(Ljava/util/Hashtable;)V"))
		{
			// generate the hashtable from map
			jobject obj_Map = PluginUtils::createJavaMapObject(&itemsInfo);

			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
			t.env->DeleteLocalRef(obj_Map);
			t.env->DeleteLocalRef(t.classID);
		}
		else
		{
			PluginUtils::outputLog("ProtocolPlatform" ,"ProtocolPlatform::can't find voiceOver method !");
		}
	}
}
void ProtocolPlatform::voiceOver()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "voiceOver"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::voiceWantToCancel()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "voiceWantToCancel"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::loadImageFinished(std::string imagepath)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "loadImageFinished"
		, "(Ljava/lang/String;)V"))
	{
		// invoke java method
		jstring jimagepath = t.env->NewStringUTF(imagepath.c_str());
		t.env->CallVoidMethod(pData->jobj, t.methodID, jimagepath);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jimagepath);
	}
}

void ProtocolPlatform::startUpdatingLocation()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "startUpdatingLocation"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::openGPS()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "openGPS"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::getClipBoardContent()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getClipBoardContent"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

float ProtocolPlatform::getCurrentNetDBM()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "getCurrentNetDBM"
			, "()F"))
		{
			// invoke java method
			float batteryLevel = t.env->CallFloatMethod(pData->jobj, t.methodID);
			t.env->DeleteLocalRef(t.classID);
			return batteryLevel;
		}
}

float ProtocolPlatform::getWIFILevel()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "getWIFILevel"
			, "()F"))
		{
			// invoke java method
			float batteryLevel = t.env->CallFloatMethod(pData->jobj, t.methodID);
			t.env->DeleteLocalRef(t.classID);
			return batteryLevel;
		}
}

void ProtocolPlatform::StartPhoneVibrate(TPlatformItemsInfo itemsInfo)
{
	if (itemsInfo.empty())
	{
		PluginUtils::outputLog("ProtocolPlatform", "itemsInfo is null");
		return;
	}
	else
	{
		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "StartPhoneVibrate"
			, "(Ljava/util/Hashtable;)V"))
		{
			// generate the hashtable from map
			jobject obj_Map = PluginUtils::createJavaMapObject(&itemsInfo);

			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
			t.env->DeleteLocalRef(obj_Map);
			t.env->DeleteLocalRef(t.classID);
		}
		else
		{
			PluginUtils::outputLog("ProtocolPlatform" ,"ProtocolPlatform::can't find StartPhoneVibrate method !");
		}
	}
}

bool ProtocolPlatform::getIsPushOn()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getIsPushOn"
		, "()Z"))
	{
		// invoke java method
		jboolean jSimState = (jboolean)t.env->CallBooleanMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
		return jSimState;
	}
}

void ProtocolPlatform::openPush()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "openPush"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::getSystemContactInfos()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getSystemContactInfos"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::sendSMS(TPlatformItemsInfo itemsInfo)
{
	if (itemsInfo.empty())
	{
		PluginUtils::outputLog("ProtocolPlatform", "sendSMS itemsInfo is null");
		return;
	}
	else
	{
		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "sendSMS"
			, "(Ljava/util/Hashtable;)V"))
		{
			// generate the hashtable from map
			jobject obj_Map = PluginUtils::createJavaMapObject(&itemsInfo);

			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
			t.env->DeleteLocalRef(obj_Map);
			t.env->DeleteLocalRef(t.classID);
		}
		else
		{
			PluginUtils::outputLog("ProtocolPlatform", "ProtocolPlatform::can't find sendSMS method !");
		}
	}
}

void ProtocolPlatform::setStatusBarIsHidden(bool ishidden)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "setStatusBarIsHidden"
		, "(Z)V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID, ishidden);
		t.env->DeleteLocalRef(t.classID);
	}
}

float ProtocolPlatform::getStatusBarHeight()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "getStatusBarHeight"
			, "()F"))
		{
			// invoke java method
			float batteryLevel = t.env->CallFloatMethod(pData->jobj, t.methodID);
			t.env->DeleteLocalRef(t.classID);
			return batteryLevel;
		}
}

void ProtocolPlatform::SystemShare(TPlatformItemsInfo itemsInfo)
{
	if (itemsInfo.empty())
	{
		PluginUtils::outputLog("ProtocolPlatform", "SystemShare itemsInfo is null");
		return;
	}
	else
	{
		PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
		PluginJniMethodInfo t;
		if (PluginJniHelper::getMethodInfo(t
			, pData->jclassName.c_str()
			, "SystemShare"
			, "(Ljava/util/Hashtable;)V"))
		{
			// generate the hashtable from map
			jobject obj_Map = PluginUtils::createJavaMapObject(&itemsInfo);

			// invoke java method
			t.env->CallVoidMethod(pData->jobj, t.methodID, obj_Map);
			t.env->DeleteLocalRef(obj_Map);
			t.env->DeleteLocalRef(t.classID);
		}
		else
		{
			PluginUtils::outputLog("ProtocolPlatform", "ProtocolPlatform::can't find SystemShare method !");
		}
	}
}

void ProtocolPlatform::PluginLog(std::string msg)
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "PluginLog"
		, "(Ljava/lang/String;)V"))
	{
		// invoke java method
		jstring jfilepath = t.env->NewStringUTF(msg.c_str());
		t.env->CallVoidMethod(pData->jobj, t.methodID, jfilepath);
		t.env->DeleteLocalRef(t.classID);
		t.env->DeleteLocalRef(jfilepath);
	}
}

std::string ProtocolPlatform::getSocialURLParams()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "getSocialURLParams"
		, "()Ljava/lang/String;"))
	{
		// invoke java method
		jstring jParams = (jstring)t.env->CallObjectMethod(pData->jobj, t.methodID);
		std::string param = PluginJniHelper::jstring2string(jParams);
		t.env->DeleteLocalRef(t.classID);
		return param;
	}
}

void ProtocolPlatform::clearSocialURLParams()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "clearSocialURLParams"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

void ProtocolPlatform::exitApp()
{
	PluginJavaData* pData = PluginUtils::getPluginJavaData(this);
	PluginJniMethodInfo t;
	if (PluginJniHelper::getMethodInfo(t
		, pData->jclassName.c_str()
		, "exitApp"
		, "()V"))
	{
		// invoke java method
		t.env->CallVoidMethod(pData->jobj, t.methodID);
		t.env->DeleteLocalRef(t.classID);
	}
}

}} // namespace cocos2d { namespace plugin {
