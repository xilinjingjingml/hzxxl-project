#pragma

#ifndef _PluginProxyWrapper_H_

#define _PluginProxyWrapper_

#include "PluginProxy.h"
#include <map>
#include <string>
#include <stdio.h>
#include <iostream>
#include <fstream>
#include <functional>

using namespace std;

class PluginProxyWrapper
{
public:
	//  单例
    static PluginProxyWrapper* getInstance();
    PluginProxyWrapper();
    ~PluginProxyWrapper();
    
	void setPluginConfig(std::string pluginConfigs_);
	void loadPlugin(std::string pluginName, int tagType, int pluginType);
	void setPackageName(std::string packageName);
	std::string getSDKVersion(std::string pluginName, int tagType, int pluginType);
	std::string getPluginVersion(std::string pluginName, int tagType, int pluginType);

	//登录;
	void userItemsLogin(std::string item);
	void logout();
	//支付;
	void payForProduct(std::string payInfo);
	//分享;
	void shareWithItems(std::string item);
	//推送;
	void StartPushSDKItem(std::string item);
	//用户推送消息给其他用户;
	void pushToUser(std::string item);
	//拓展;
	void jump2ExtendMethod(int tag, std::string cpInfo);
	//统计;
	void logEvent(int logTag, std::string eventName, std::string params);
	void switchPluginXRunEnv(int env);
	//广告;
    void showAds(int adsType, int sizeEnum, int pos);
    void showAds(std::string info);
    void hideAds(int adsType);
	/**回调**/
	//typedef void(*ResultCallBackWrapper)(std::string callbackinfo);
	//function<void(string)> mCallBackWrapper;
	void setSessionCallBack(function<void(string)>& cb);
	void setIapCallBack(function<void(string)>& cb);
	void setSocialCallBack(function<void(string)>& cb);
	void setPlatformCallBack(function<void(string)>& cb);
	void setAdsCallBack(function<void(string)>& cb);
	//void ResultCallBack(std::string callbackinfo);
	//ResultCallBackWrapper mCallBackWrapper;
	
	std::string getDeviceName();
	std::string getDeviceIMEI();
	std::string getDeviceIMSI();
	std::string getDeviceType();
	std::string getMacAddress();
	std::string getSimType();
	/**
	* 获取网络状况的类别;
	*/
	int getReachability();
	void openURL(std::string addr);
	std::string getPackageName();
	std::string getVersionName();
	std::string getVersionCode();
	void copyToClipboard(std::string text);
	void getClipBoardContent();
	void startUpdatingLocation();
	void callPhone(std::string phoneNum);
	void openGPS();
	/*
	** 开启推送接口;
	*/
	bool getIsPushOn();
	void openPush();

	void loadImageFinished(std::string imagepath);

	void voiceStart(std::string playerID);
	void voiceOver(std::string item);
	void voiceWantToCancel();
	void playSound(std::string filePathString);
	void stopSound();

	void initHeadFace(std::string item);

	//震动接口;
	void StartPhoneVibrate(std::string item);
	//电池电量;
	float getBatteryLevel();
	//蜂窝网信号强度;
	float getCurrentNetDBM();
	//WIFI信号强度;
	float getWIFILevel();
	//获取通讯录内容
	void getSystemContactInfos();
	//发短信
	void sendSMS(std::string item);
	void setStatusBarIsHidden(bool ishidden);
	float getStatusBarHeight();
	void SystemShare(std::string item);
	void PluginLog(std::string msg);
    //void setSessionInfo(std::string item);
    std::string getSocialURLParams();
	void clearSocialURLParams();
	void exitApp();
private:
	static PluginProxyWrapper* m_pluginproxywrapper;
    static cocos2d::plugin::PluginProxy* m_pluginproxy;
};

#endif

