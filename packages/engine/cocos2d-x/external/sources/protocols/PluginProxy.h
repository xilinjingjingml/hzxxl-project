#ifndef __CocosCreator_PLUGINPROXY_H__
#define __CocosCreator_PLUGINPROXY_H__

#include "ProtocolPlatform.h"
#include "ProtocolSession.h"
#include "ProtocolIAP.h"
#include "ProtocolSocial.h"
#include "ProtocolAnalytics.h"
#include "ProtocolExtend.h"
#include "ProtocolPush.h"
#include "ProtocolAds.h"

#ifdef __OBJC__
#include "PluginUtilsIOS.h"
#else
#include "PluginUtils.h"
#endif

#include <map>
#include <iostream>
#include <stdlib.h>
#include <stdio.h>
#include <string>
#include <functional>

using namespace std;

#define kAnalyticsSessionExpiredTime 1000 * 10

namespace cocos2d {namespace plugin {

	typedef enum
	{
		kSession = 0,              // 登录;
		kPay,                      // 支付;
		kSocial,                   // 分享;
		kPlatform,            	   // 平台;
		kAds,					   // 广告;
		kMax
	} PluginResultType;

	class PluginProxy : 
	public PayResultListener,
	public AdsListener,
	public SessionResultListener,
	public ShareResultListener,
	public PlatformResultListener
	{
	public:
		static PluginProxy* getInstance();
		static void purgePluginProxy();

        PluginProxy();
        ~PluginProxy();
    private:

		static PluginProxy* s_pProxy;

	private:
		ProtocolSession * session_;
		ProtocolIAP* 		purchase_;
		ProtocolSocial* 	share_;
		ProtocolPush* 		push_;
		ProtocolExtend*     extend_;
		ProtocolPlatform* 	platform_;
		ProtocolAnalytics*  analytics_;
		ProtocolAds*		ads_;

		std::string pluginConfig;
		std::string packageName_;
		int pluginXRunEnv_;

	public:
		std::string gb2utf8(const char* src);
		void setPluginConfig(const char* pluginConfigs);
		void setPackageName(const char* packageName);
		void switchPluginXRunEnv(int env);
		/*
		**	装载、卸载插件;
		*/
		void unloadPlugin(const char* pluginName);
		void loadPlugin(const char* pluginName, int tagType, int pluginType);
		char* getPluginVersion(const char* pluginName, int tagType, int pluginType);
		char* getSDKVersion(const char* pluginName, int tagType, int pluginType);
		void webLoginParam(TSessionGameInfo& info);
        ProtocolPlatform* getPlatform();
	public:
		//登录;
		void userItemsLogin(const char* item);
		void logout();
		//支付;
		void payForProduct(const char* payInfo);
		//分享;
		void shareWithItems(const char* item);
		//推送;
		void StartPushSDKItem(const char* item);
        //用户推送消息给其他用户;
        void pushToUser(const char* item);
		//拓展;
		void jump2ExtendMethod(int tag, const char* cpInfo);
		//统计;
		void logEvent(int logTag, const char* eventName, const char* params);
        //
        //void setSessionInfo(const char* item);
        //广告;
        void showAds(int adsType, int sizeEnum, int pos);
        void showAds(const char* info);
        void hideAds(int adsType);

	public:
		// 登录回调;
		virtual void onSessionResult(SessionResultCode ret, const char* msg, TUserInfo info);
		// 支付回调;
		virtual void onPayResult(PayResultCode ret, const char* msg, TProductInfo info);
		// share回调;
		virtual void onShareResult(ShareResultCode ret, const char* msg, TShareInfo info);
		//平台回调;
		virtual void onPlatformResult(PlatformResultCode ret, const char* msg, const char* param);
		// 广告回调;
		virtual void onAdsResult(AdsResultCode ret, const char* msg, TAdsDeveloperInfo info);

		function<void(string)> mCallBack[kMax];
		void setSessionCallBack(function<void(string)>& cb) { mCallBack[kSession] = cb; }
		void setIapCallBack(function<void(string)>& cb) { mCallBack[kPay] = cb; }
		void setSocialCallBack(function<void(string)>& cb) { mCallBack[kSocial] = cb; }
		void setPlatformCallBack(function<void(string)>& cb) { mCallBack[kPlatform] = cb; }
		void setAdsCallBack(function<void(string)>& cb) { mCallBack[kAds] = cb; }
		void callback(std::string json, int type);

	public:

		std::map<std::string, std::string> JsonStringToMap(const char* info);
		std::string MapToJsonString(std::map<std::string, std::string> info);
		std::string getJsonStringValue(const char* info, const char* name);
		template<typename TypeOne, typename TypeTwo>
		std::string MapToString(std::map<TypeOne, TypeTwo>& info);
	private:
		string getString(const int32_t& a);
		string getString(const int64_t& a);
		string getString(const string& s);
		/*
		** 终端平台基础插件相关;
		*/
	public:
		char* getDeviceName();
		char* getDeviceIMEI();
		char* getDeviceIMSI();
		char* getDeviceType();
		char* getMacAddress();
		char* getSimType();
		/**
		* 获取网络状况的类别;
		*/
		int getReachability();
		void openURL(const char* addr);
		char* getPackageName();
		char* getVersionName();
		char* getVersionCode();
		void copyToClipboard(const char* text);
		void getClipBoardContent();
		void startUpdatingLocation();
		void callPhone(const char* phoneNum);
		void openGPS();
		/*
		** 开启推送接口;
		*/
		bool getIsPushOn();
		void openPush();

		void loadImageFinished(const char* imagepath);

		void voiceStart(const char* playerID);
		void voiceOver(const char* item);
		void voiceWantToCancel();
		void playSound(const char* filePathString);
		void stopSound();

		void initHeadFace(const char* item);

		//震动接口;
		void StartPhoneVibrate(const char* item);
		//电池电量;
		float getBatteryLevel();
		//蜂窝网信号强度;
		float getCurrentNetDBM();
		//WIFI信号强度;
		float getWIFILevel();
		//获取通讯录内容
		void getSystemContactInfos();
		//发短信
		void sendSMS(const char* item);
		void setStatusBarIsHidden(bool ishidden);
		float getStatusBarHeight();
		void SystemShare(const char* item);
		void PluginLog(const char* msg);

		char* getSocialURLParams();
		void clearSocialURLParams();
		void exitApp();

	};
}}
#endif // __PLUGINPROXY_H__

//#ifdef __CocosCreator_PLUGINPROXY_H__
//}
//#endif // __CocosCreator_PLUGINPROXY_H__
