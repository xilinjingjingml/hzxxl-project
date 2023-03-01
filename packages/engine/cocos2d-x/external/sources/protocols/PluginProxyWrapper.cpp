#include "PluginProxyWrapper.h"
#include "PluginJniHelper.h"
#include <platform/android/jni/JniHelper.h>

PluginProxyWrapper* PluginProxyWrapper::m_pluginproxywrapper = NULL;
cocos2d::plugin::PluginProxy* PluginProxyWrapper::m_pluginproxy = NULL;

PluginProxyWrapper::PluginProxyWrapper()
{
    printf("--- <%s : %d>\n", __func__, __LINE__);
}

PluginProxyWrapper::~PluginProxyWrapper()
{
    printf("--- <%s : %d>\n", __func__, __LINE__);
}

PluginProxyWrapper* PluginProxyWrapper::getInstance()
{
    if (m_pluginproxywrapper == NULL) {
        m_pluginproxywrapper = new PluginProxyWrapper();
        m_pluginproxy = cocos2d::plugin::PluginProxy::getInstance();
        cocos2d::PluginJniHelper::setJavaVM(cocos2d::JniHelper::getJavaVM());
    }
    return m_pluginproxywrapper;
}

void PluginProxyWrapper::setPluginConfig(std::string pluginConfigs_)
{
	m_pluginproxy->setPluginConfig(pluginConfigs_.c_str());
}
void PluginProxyWrapper::loadPlugin(std::string pluginName, int tagType, int pluginType)
{
	m_pluginproxy->loadPlugin(pluginName.c_str(), tagType, pluginType);
}
void PluginProxyWrapper::setPackageName(std::string packageName)
{
	m_pluginproxy->setPackageName(packageName.c_str());
}
std::string PluginProxyWrapper::getSDKVersion(std::string pluginName, int tagType, int pluginType)
{
	return m_pluginproxy->getSDKVersion(pluginName.c_str(), tagType, pluginType);
}
std::string PluginProxyWrapper::getPluginVersion(std::string pluginName, int tagType, int pluginType)
{
	return m_pluginproxy->getPluginVersion(pluginName.c_str(), tagType, pluginType);
}

void PluginProxyWrapper::userItemsLogin(std::string item)
{
	m_pluginproxy->userItemsLogin(item.c_str());
}
void PluginProxyWrapper::logout()
{
	m_pluginproxy->logout();
}
//支付;
void PluginProxyWrapper::payForProduct(std::string payInfo)
{
	m_pluginproxy->payForProduct(payInfo.c_str());
}
//分享;
void PluginProxyWrapper::shareWithItems(std::string item)
{
	m_pluginproxy->shareWithItems(item.c_str());
}
//推送;
void PluginProxyWrapper::StartPushSDKItem(std::string item)
{
	m_pluginproxy->StartPushSDKItem(item.c_str());
}
//用户推送消息给其他用户;
void PluginProxyWrapper::pushToUser(std::string item)
{
    m_pluginproxy->pushToUser(item.c_str());
}
//拓展;
void PluginProxyWrapper::jump2ExtendMethod(int tag, std::string cpInfo)
{
	m_pluginproxy->jump2ExtendMethod(tag, cpInfo.c_str());
}
//统计;
void PluginProxyWrapper::logEvent(int logTag, std::string eventName, std::string params)
{
	m_pluginproxy->logEvent(logTag, eventName.c_str(), params.c_str());
}
//广告;
void PluginProxyWrapper::showAds(int adsType, int sizeEnum, int pos)
{
	m_pluginproxy->showAds(adsType, sizeEnum, pos);
}
void PluginProxyWrapper::showAds(std::string info)
{
	m_pluginproxy->showAds(info.c_str());
}
void PluginProxyWrapper::hideAds(int adsType)
{
	m_pluginproxy->hideAds(adsType);
}
void PluginProxyWrapper::switchPluginXRunEnv(int env)
{
	m_pluginproxy->switchPluginXRunEnv(env);
}

void PluginProxyWrapper::setSessionCallBack(function<void(string)>& cb)
{ 
	//mCallBackWrapper = cb;
	m_pluginproxy->setSessionCallBack(cb);
}
void PluginProxyWrapper::setIapCallBack(function<void(string)>& cb)
{
	//mCallBackWrapper = cb;
	m_pluginproxy->setIapCallBack(cb);
}
void PluginProxyWrapper::setSocialCallBack(function<void(string)>& cb)
{
	//mCallBackWrapper = cb;
	m_pluginproxy->setSocialCallBack(cb);
}
void PluginProxyWrapper::setPlatformCallBack(function<void(string)>& cb)
{
	//mCallBackWrapper = cb;
	m_pluginproxy->setPlatformCallBack(cb);
}
void PluginProxyWrapper::setAdsCallBack(function<void(string)>& cb)
{
	//mCallBackWrapper = cb;
	m_pluginproxy->setAdsCallBack(cb);
}

void PluginProxyWrapper::PluginLog(std::string info)
{
    m_pluginproxy->PluginLog(info.c_str());
}
/*
void PluginProxyWrapper::setSessionInfo(std::string info)
{
    m_pluginproxy->setSessionInfo(info.c_str());
}
*/
std::string PluginProxyWrapper::getDeviceName()
{
	return m_pluginproxy->getDeviceName();
}

std::string PluginProxyWrapper::getDeviceIMEI()
{
	return m_pluginproxy->getDeviceIMEI();
}

std::string PluginProxyWrapper::getDeviceIMSI()
{
	return m_pluginproxy->getDeviceIMSI();
}

std::string PluginProxyWrapper::getDeviceType()
{
	return m_pluginproxy->getDeviceType();
}

std::string PluginProxyWrapper::getMacAddress()
{
	return m_pluginproxy->getMacAddress();
}

std::string PluginProxyWrapper::getSimType()
{
	return m_pluginproxy->getSimType();
}

int PluginProxyWrapper::getReachability()
{
	return m_pluginproxy->getReachability();
}

void PluginProxyWrapper::openURL(std::string addr)
{
	m_pluginproxy->openURL(addr.c_str());
}

std::string PluginProxyWrapper::getPackageName()
{
	return m_pluginproxy->getPackageName();
}

std::string PluginProxyWrapper::getVersionName()
{
	return m_pluginproxy->getVersionName();
}

std::string PluginProxyWrapper::getVersionCode()
{
	return m_pluginproxy->getVersionCode();
}

void PluginProxyWrapper::copyToClipboard(std::string text)
{
	m_pluginproxy->copyToClipboard(text.c_str());
}

void PluginProxyWrapper::getClipBoardContent()
{
	m_pluginproxy->getClipBoardContent();
}

void PluginProxyWrapper::startUpdatingLocation()
{
	m_pluginproxy->startUpdatingLocation();
}

void PluginProxyWrapper::callPhone(std::string phoneNum)
{
	m_pluginproxy->callPhone(phoneNum.c_str());
}

void PluginProxyWrapper::openGPS()
{
	m_pluginproxy->openGPS();
}

bool PluginProxyWrapper::getIsPushOn()
{
	return m_pluginproxy->getIsPushOn();
}

void PluginProxyWrapper::openPush()
{
	m_pluginproxy->openPush();
}

void PluginProxyWrapper::loadImageFinished(std::string imagepath)
{
	m_pluginproxy->loadImageFinished(imagepath.c_str());
}

void PluginProxyWrapper::voiceStart(std::string playerID)
{
	m_pluginproxy->voiceStart(playerID.c_str());
}

void PluginProxyWrapper::voiceOver(std::string item)
{
	m_pluginproxy->voiceOver(item.c_str());
}

void PluginProxyWrapper::voiceWantToCancel()
{
	m_pluginproxy->voiceWantToCancel();
}

void PluginProxyWrapper::playSound(std::string filePathString)
{
	m_pluginproxy->playSound(filePathString.c_str());
}

void PluginProxyWrapper::stopSound()
{
	m_pluginproxy->stopSound();
}

void PluginProxyWrapper::initHeadFace(std::string item)
{
	m_pluginproxy->initHeadFace(item.c_str());
}

void PluginProxyWrapper::StartPhoneVibrate(std::string item)
{
	m_pluginproxy->StartPhoneVibrate(item.c_str());
}

float PluginProxyWrapper::getBatteryLevel()
{
	return m_pluginproxy->getBatteryLevel();
}

float PluginProxyWrapper::getCurrentNetDBM()
{
	return m_pluginproxy->getCurrentNetDBM();
}

float PluginProxyWrapper::getWIFILevel()
{
	return m_pluginproxy->getWIFILevel();
}

void PluginProxyWrapper::sendSMS(std::string item)
{
    m_pluginproxy->sendSMS(item.c_str());
}
void PluginProxyWrapper::getSystemContactInfos()
{
    m_pluginproxy->getSystemContactInfos();
}

void PluginProxyWrapper::setStatusBarIsHidden(bool ishidden)
{
    m_pluginproxy->setStatusBarIsHidden(ishidden);
}

float PluginProxyWrapper::getStatusBarHeight()
{
    return m_pluginproxy->getStatusBarHeight();
}

void PluginProxyWrapper::SystemShare(std::string item)
{
    m_pluginproxy->SystemShare(item.c_str());
}

std::string PluginProxyWrapper::getSocialURLParams()
{
	return m_pluginproxy->getSocialURLParams();
}

void PluginProxyWrapper::clearSocialURLParams()
{
	m_pluginproxy->clearSocialURLParams();
}

void PluginProxyWrapper::exitApp()
{
	m_pluginproxy->exitApp();
}

//void PluginProxyWrapper::ResultCallBack(std::string callbackinfo)
//{
//	mCallBackWrapper(callbackinfo);
//}
