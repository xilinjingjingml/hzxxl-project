
#include <external/sources/protocols/ext/Json/lib_json/reader.h>
#include <external/sources/protocols/ext/Json/lib_json/writer.h>
#include "PluginProxy.h"
#include "PluginManager.h"
#include "PluginFactory.h"
#include "json_lib.h"

namespace cocos2d {namespace plugin {

	enum {
		TAG_LOG_EVENT_ID = 0,
		TAG_LOG_EVENT_ID_KV,
		TAG_LOG_EVENT_ID_DURATION,
		TAG_LOG_EVENT_LABEL_DURATION,
		TAG_LOG_EVENT_BEGIN,
		TAG_LOG_EVENT_END,
		TAG_LOG_EVENT_LABEL_BEGIN,
		TAG_LOG_EVENT_LABEL_END
	};

	PluginProxy* PluginProxy::s_pProxy = NULL;

	PluginProxy::PluginProxy()
	{
		session_ = NULL;
		purchase_ = NULL;
		share_ = NULL;
		push_ = NULL;
		extend_ = NULL;
		platform_ = NULL;
		analytics_ = NULL;
		ads_ = NULL;
	}
	
	PluginProxy::~PluginProxy()
	{

	}
	
	PluginProxy* PluginProxy::getInstance()
	{
		if (s_pProxy == NULL) {
			s_pProxy = new PluginProxy();
		}
		return s_pProxy;
	}

	void PluginProxy::purgePluginProxy()
	{

	}
	void PluginProxy::unloadPlugin(const char* pluginName)
	{

	}

	char * PluginProxy::getSocialURLParams()
	{
		std::string params;

		if (getPlatform())
		{
			params = getPlatform()->getSocialURLParams();
		}

		return strdup(params.data());
	}

	void PluginProxy::clearSocialURLParams()
	{
		if (getPlatform())
		{
			getPlatform()->clearSocialURLParams();
		}
	}

	void PluginProxy::exitApp()
	{
		if (getPlatform())
		{
			getPlatform()->exitApp();
		}
	}

	char * PluginProxy::getDeviceName()
	{
		std::string deviceName;

		if (getPlatform())
		{
			deviceName = getPlatform()->getDeviceName();
		}

		return strdup(deviceName.data());
	}

	char * PluginProxy::getDeviceIMEI()
	{
		std::string deveiceIMEI;

		if (getPlatform())
		{
			deveiceIMEI = getPlatform()->getDeviceIMEI();
		}

		return strdup(deveiceIMEI.data());
	}

	char * PluginProxy::getDeviceIMSI()
	{
		std::string deviceIMSI;

		if (getPlatform())
		{
			deviceIMSI = getPlatform()->getDeviceIMSI();
		}

		return strdup(deviceIMSI.data());
	}

	char * PluginProxy::getDeviceType()
	{
		std::string deviceType;

		if (getPlatform())
		{
			deviceType = getPlatform()->getDeviceType();
		}

		return strdup(deviceType.data());
	}

	char * PluginProxy::getMacAddress()
	{
		std::string macAddress;

		if (getPlatform())
		{
			macAddress = getPlatform()->getMacAddress();
		}

		return strdup(macAddress.data());
	}

	char * PluginProxy::getSimType()
	{
		std::string simType;
		if (getPlatform())
		{
			simType = getPlatform()->getSimType();
		}

		return strdup(simType.data());
	}

	int PluginProxy::getReachability()
	{
		int net_status = 0;
		if (getPlatform())
		{
			net_status = getPlatform()->getReachability();
		}

		return net_status;
	}

	void PluginProxy::openURL(const char * addr)
	{
		if (getPlatform())
		{
			getPlatform()->openURL(addr);
		}
	}

	char * PluginProxy::getPackageName()
	{
		std::string packageName;

		if (getPlatform())
		{
			packageName = getPlatform()->getPackageName();
		}

		return strdup(packageName.data());
	}

	char * PluginProxy::getVersionName()
	{
		std::string versionName;

		if (getPlatform())
		{
			versionName = getPlatform()->getVersionName();
		}
		return strdup(versionName.data());
	}

	char * PluginProxy::getVersionCode()
	{
		std::string versionCode;

		if (getPlatform())
		{
			versionCode = getPlatform()->getVersionCode();
		}

		return strdup(versionCode.data());
	}

	void PluginProxy::copyToClipboard(const char * text)
	{
		if (getPlatform())
		{
			getPlatform()->copyToClipboard(text);
		}
	}

	void PluginProxy::getClipBoardContent()
	{
		if (getPlatform())
		{
			getPlatform()->getClipBoardContent();
		}
	}

	void PluginProxy::startUpdatingLocation()
	{
		if (getPlatform())
		{
			getPlatform()->startUpdatingLocation();
		}
	}

	void PluginProxy::callPhone(const char * phoneNum)
	{
		if (getPlatform())
		{
			getPlatform()->callPhone(phoneNum);
		}
	}

	void PluginProxy::openGPS()
	{
		if (getPlatform())
		{
			getPlatform()->openGPS();
		}
	}

	bool PluginProxy::getIsPushOn()
	{
		bool ispushon = false;
		if (getPlatform())
		{
			ispushon = getPlatform()->getIsPushOn();
		}
		return ispushon;
	}

	void PluginProxy::openPush()
	{
		if (getPlatform())
		{
			getPlatform()->openPush();
		}
	}

	void PluginProxy::loadImageFinished(const char* imagepath)
	{
		if (getPlatform())
		{
			getPlatform()->loadImageFinished(imagepath);
		}
	}

	void PluginProxy::initHeadFace(const char* item)
	{
		TPlatformItemsInfo platformItemsInfo = JsonStringToMap(item);
		if (getPlatform())
		{
			getPlatform()->initHeadFace(platformItemsInfo);
		}
	}

	void PluginProxy::voiceStart(const char* playerID)
	{
		if (getPlatform())
		{
			getPlatform()->prepareAudio(playerID);
		}
	}
	void PluginProxy::voiceOver(const char* item)
	{
		TPlatformItemsInfo platformItemsInfo = JsonStringToMap(item);
		if (getPlatform())
		{
			getPlatform()->voiceOver(platformItemsInfo);
		}
	}

	void PluginProxy::voiceWantToCancel()
	{
		if (getPlatform())
		{
			getPlatform()->voiceWantToCancel();
		}
	}

	void PluginProxy::playSound(const char* filePathString)
	{
		if (getPlatform())
		{
			getPlatform()->playSound(filePathString);
		}
	}

	void PluginProxy::stopSound()
	{
		if (getPlatform())
		{
			getPlatform()->stopSound();
		}
	}

	void PluginProxy::StartPhoneVibrate(const char* item)
	{
		if (getPlatform())
		{
			TShareInfo info = JsonStringToMap(item);
			getPlatform()->StartPhoneVibrate(info);
		}
	}

	float PluginProxy::getBatteryLevel()
	{
		float batteryLevel = 0;

		if (getPlatform())
		{
			batteryLevel = getPlatform()->getBatteryLevel();
		}
		return batteryLevel;
	}

	float PluginProxy::getCurrentNetDBM()
	{
		float DBMLevel = 0;

		if (getPlatform())
		{
			DBMLevel = getPlatform()->getCurrentNetDBM();
		}
		return DBMLevel;
	}

	float PluginProxy::getWIFILevel()
	{
		float wifiLevel = 0;

		if (getPlatform())
		{
			wifiLevel = getPlatform()->getWIFILevel();
		}
		return wifiLevel;
	}
    
    void PluginProxy::sendSMS(const char* item)
    {
        if (getPlatform())
        {
            TPlatformItemsInfo info = JsonStringToMap(item);
            getPlatform()->sendSMS(info);
        }
    }
    void PluginProxy::getSystemContactInfos()
    {
        if (getPlatform())
        {
            getPlatform()->getSystemContactInfos();
        }
    }
    
    void PluginProxy::setStatusBarIsHidden(bool ishidden)
    {
        if (getPlatform())
        {
            getPlatform()->setStatusBarIsHidden(ishidden);
        }
    }
    
    ProtocolPlatform* PluginProxy::getPlatform()
    {
        if (!platform_) {
            PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin("PlatformWP");
            platform_ = dynamic_cast<ProtocolPlatform*>(plugin_protocol);
        }
        return platform_;
    }
    
    float PluginProxy::getStatusBarHeight()
    {
        float height = 0;
        
        if (getPlatform())
        {
            height = getPlatform()->getStatusBarHeight();
        }
        return height;
    }
    
    void PluginProxy::SystemShare(const char* item)
    {
        if (getPlatform())
        {
            TPlatformItemsInfo info = JsonStringToMap(item);
            getPlatform()->SystemShare(info);
        }
    }
    /*
    void PluginProxy::setSessionInfo(const char* item)
    {
        if(getPlatform())
        {
            TPlatformItemsInfo info = JsonStringToMap(item);
            getPlatform()->setSessionInfo(info);
        }
    }
    */
    void PluginProxy::PluginLog(const char* item)
    {
        if (getPlatform())
        {
            getPlatform()->PluginLog(item);
        }
    }
    
	void PluginProxy::callback(std::string json, int type)
	{
		function<void(string)>& cb = mCallBack[type];
		if (!cb)
			return;
		cb(json);
	}

	std::map<std::string, std::string> PluginProxy::JsonStringToMap(const char* json_string)
	{
		std::map<std::string, std::string> info;
		info.clear();
		CSJson::Value root;
		CSJson::Reader reader;
		std::string json = json_string;
		bool flag = reader.parse(json, root);
		if (flag)
		{
			CSJson::Value::Members members = root.getMemberNames();
			for (size_t i = 0; i < members.size(); i++)
			{
				std::string key = members[i];
				if (root[key].isString())
				{
					info[key] = root[key].asString();
				}
				else if (root[key].isInt() || root[key].isBool())
				{
					char temp[64];
					sprintf(temp, "%d", root[key].asInt());
					info[key] = temp;
				}
			}
		}
		return info;
	}
	std::string PluginProxy::MapToJsonString(std::map<std::string, std::string> info)
	{
		CSJson::FastWriter writerinfo;
		CSJson::Value winfo;
		for (std::map<std::string, std::string>::iterator i = info.begin(); i != info.end(); i++)
		{
			std::string name = i->first.c_str();
			std::string namevalue = i->second.c_str();
			winfo[name] = namevalue;
		}
		std::string msg = writerinfo.write(winfo);
		return msg;
	}
    
    std::string PluginProxy::getJsonStringValue(const char* info, const char* name)
    {
        std::string flagname = name;
        std::string value;
        CSJson::Reader reader;
        CSJson::Value root;
        if (reader.parse(info, root))
        {
            CSJson::Value::Members members = root.getMemberNames();
            for (size_t i = 0; i < members.size(); i++)
            {
                std::string key = members[i];
                if (flagname == key)
                {
                    if (root[key].isString())
                    {
                        value = root[key].asString();
                        return value;
                    }
                    else if (root[key].isInt() || root[key].isBool())
                    {
                        char temp[64];
                        sprintf(temp, "%d", root[key].asInt());
                        value = temp;
                        return value;
                    }
                }
                
            }
        }
        
        return value;
    }
    
	void PluginProxy::userItemsLogin(const char* item)
	{
		TProductInfo productInfo = JsonStringToMap(item);
		if (session_)
		{
			session_->sessionItemsLogin(productInfo);
		}
	}

	void PluginProxy::logout()
	{
		if (session_)
		{
			session_->sessionLogout();
		}
	}

	void PluginProxy::payForProduct(const char* payInfo)
	{
		TProductInfo productInfo = JsonStringToMap(payInfo);
		if (purchase_)
		{
			purchase_->payForProduct(productInfo);
		}
		else {
			printf("NO purchase_");
		}
	}

	void PluginProxy::shareWithItems(const char* item)
	{
		if (share_)
		{
			TShareInfo info = JsonStringToMap(item);
			share_->share(info);
		}
	}

	void PluginProxy::StartPushSDKItem(const char* item)
	{
		if (push_)
		{
			TShareInfo info = JsonStringToMap(item);
			push_->StartPushSDKItem(info);
		}
	}
    
    void PluginProxy::pushToUser(const char* item)
    {
        if (push_)
        {
            TShareInfo info = JsonStringToMap(item);
            push_->pushToUser(info);
        }
    }

	void PluginProxy::jump2ExtendMethod(int tag, const char* cpInfo)
	{
		if (extend_)
		{
			TExtendInfo infoList = JsonStringToMap(cpInfo);
			extend_->jumpToExtend(tag, infoList);
		}
	}

	void PluginProxy::showAds(int adsType, int sizeEnum, int pos)
	{
		if (ads_)
		{
			ads_->showAds(adsType, sizeEnum, pos);
		}
	}

	void PluginProxy::showAds(const char* item)
	{
		if (ads_)
		{
            TAdsDeveloperInfo info = JsonStringToMap(item);
			ads_->showAds(info);
		}
	}

	void PluginProxy::hideAds(int adsType)
	{
		if (ads_)
		{
			ads_->hideAds(adsType);
		}
	}

	void PluginProxy::setPluginConfig(const char* pluginConfigs_)
	{
		CSJson::FastWriter writerinfo;
		CSJson::Reader reader;
		CSJson::Value root;
		if (reader.parse(pluginConfigs_, root))
		{
			CSJson::Value pluginsroot;
			CSJson::Value pluginroot = root["plugins"];
			int isize = pluginroot.size();
			for (int i = 0; i < isize; i++)
			{
				if (pluginroot[i].isMember("name"))
				{
					pluginsroot[pluginroot[i]["name"].asString()] = pluginroot[i];
				}
			}
            pluginConfig = pluginsroot.toStyledString();
            printf("PluginProxy::setPluginConfig====pluginConfig=%s\n", pluginConfig.c_str());
		}
	}
	char* PluginProxy::getSDKVersion(const char* pluginName, int tagType, int pluginType)
	{
		loadPlugin(pluginName, tagType, pluginType);
		PluginProtocol* protocol = PluginManager::getInstance()->loadPlugin(pluginName);
		return strdup(protocol->getSDKVersion().data());
	}

	char* PluginProxy::getPluginVersion(const char* pluginName, int tagType, int pluginType)
	{
		loadPlugin(pluginName, tagType, pluginType);
		PluginProtocol* protocol = PluginManager::getInstance()->loadPlugin(pluginName);
		return strdup(protocol->getPluginVersion().data());
	}
	
	void PluginProxy::loadPlugin(const char* pluginName, int tagType, int pluginType)
	{
//        std::string pluginname = "IAPAlipay";
//        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginname.c_str());
//        std::map<std::string, std::string> mpluginconfig;
//        mpluginconfig["name"] = "IAPAlipay";
//        mpluginconfig["type"] = "3";
//        mpluginconfig["default"] = "1";
//        mpluginconfig["mid"] = "2";
//        mpluginconfig["needConfirm"] = "0";
//        mpluginconfig["appscheme"] = "com.casino.pokecircle";
//        pluginType = kPluginIAP;
		//
//        std::string pluginname = "ExtendQIYUKF";
//        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginname.c_str());
//        std::map<std::string, std::string> mpluginconfig;
//        mpluginconfig["name"] = "ExtendQIYUKF";
//        mpluginconfig["type"] = "6";
//        mpluginconfig["default"] = "1";
//        pluginType = kPluginExend;
        //
//        std::string pluginname = "SessionFacebook";
//        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginname.c_str());
//        std::map<std::string, std::string> mpluginconfig;
//        mpluginconfig["name"] = "SessionFacebook";
//        mpluginconfig["type"] = "5";
//        mpluginconfig["tag"] = "2";
//        mpluginconfig["default"] = "1";
//        mpluginconfig["LoginHost"] = "http://t.login.weiyu788.com/";
//        pluginType = kPluginSession;
        //
//        std::string pluginname = "SocialFacebook";
//        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginname.c_str());
//        std::map<std::string, std::string> mpluginconfig;
//        mpluginconfig["name"] = "SocialFacebook";
//        mpluginconfig["type"] = "4";
//        mpluginconfig["tag"] = "5";
//        mpluginconfig["default"] = "1";
//        mpluginconfig["SocialHost"] = "http://t.statics.weiyu788.com/execute/task/award/draw";
//        pluginType = kPluginSocial;
		//
//        std::string pluginname = "SessionIZhangXin";
//        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginname.c_str());
//        std::map<std::string, std::string> mpluginconfig;
//        mpluginconfig["name"] = "SessionIZhangXin";
//        mpluginconfig["type"] = "5";
//        mpluginconfig["tag"] = "2";
//        mpluginconfig["default"] = "1";
//        pluginType = kPluginSession;
		//switchPluginXRunEnv(1);
        //
//        std::string pluginname = "SocialWeiXin";
//        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginname.c_str());
//        std::map<std::string, std::string> mpluginconfig;
//        mpluginconfig["name"] = "SocialWeiXin";
//        mpluginconfig["type"] = "4";
//        mpluginconfig["tag"] = "5";
//        mpluginconfig["default"] = "1";
//        pluginType = kPluginSocial;
        //
//        std::string pluginname = "PushXinGe";
//        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginname.c_str());
//        std::map<std::string, std::string> mpluginconfig;
//        mpluginconfig["name"] = "PushXinGe";
//        mpluginconfig["type"] = "7";
//        mpluginconfig["default"] = "1";
//        pluginType = kPluginPush;
        
		printf("cocos WILL LOAD %s as %d\n", pluginName, pluginType);
        std::map<std::string, std::string> mpluginconfig;
        PluginProtocol* plugin_protocol = PluginManager::getInstance()->loadPlugin(pluginName);
        plugin_protocol->setRunEnv(pluginXRunEnv_);
        CSJson::Reader reader;
        CSJson::Value root;
        if (reader.parse(pluginConfig, root))
        {
            CSJson::Value pluginsroot;
            CSJson::Value pluginroot = root[pluginName];
            std::string plugins = pluginroot.toStyledString();
            mpluginconfig = JsonStringToMap(plugins.c_str());
        }

		switch (pluginType)
		{
		case kPluginSession:
            session_ = dynamic_cast<ProtocolSession*>(plugin_protocol);
            if (session_) {
                session_->setRunEnv(pluginXRunEnv_);
                TSessionGameInfo info2;
                webLoginParam(info2);
                session_->configGameInfo(info2);
                session_->configDeveloperInfo(mpluginconfig);
                session_->setResultListener(this);
                //session_->sessionItemsLogin(mpluginconfig);
            }
			break;
		case kPluginAnalytics:
			analytics_ = dynamic_cast<ProtocolAnalytics*>(plugin_protocol);
            if (analytics_) {
                //analytics_->setRunEnv(pluginXRunEnv_);
                analytics_->setCaptureUncaughtException(true);
                analytics_->setSessionContinueMillis(kAnalyticsSessionExpiredTime);
                analytics_->startSession("");
            }
			break;
		case kPluginIAP:
			purchase_ = dynamic_cast<ProtocolIAP*>(plugin_protocol);
			if (purchase_)
			{
				purchase_->setRunEnv(pluginXRunEnv_);
				purchase_->configDeveloperInfo(mpluginconfig);
				purchase_->setResultListener(this);
				//purchase_->payForProduct(mpluginconfig);
				printf("purchase_ loaded!");
			}
			else
			{
				printf("-purchase_sms_----------------configDeveloperInfo( is NULL)--------------------");
			}
			break;
		case kPluginExend:
			extend_ = dynamic_cast<ProtocolExtend*>(plugin_protocol);
            if (extend_) {
                extend_->setRunEnv(pluginXRunEnv_);
                //extend_->jumpToExtend(3, mpluginconfig);
            }
			break;
		case kPluginPush:
			push_ = dynamic_cast<ProtocolPush*>(plugin_protocol);
            if (push_) {
                push_->configDeveloperInfo(mpluginconfig);
                push_->setRunEnv(pluginXRunEnv_);
                //push_->StartPushSDKItem(mpluginconfig);
            }
			break;
		case kPluginSocial:
			share_ = dynamic_cast<ProtocolSocial*>(plugin_protocol);
			if (share_)
			{
				share_->setRunEnv(pluginXRunEnv_);
				share_->configDeveloperInfo(mpluginconfig);
				share_->setResultListener(this);
                //share_->share(mpluginconfig);
			}
			break;
		case kPluginPlatform:
			platform_ = dynamic_cast<ProtocolPlatform*>(plugin_protocol);
			if (getPlatform())
			{
				getPlatform()->setResultListener(this);
				getPlatform()->configDeveloperInfo();
				getPlatform()->setRunEnv(pluginXRunEnv_);
			}
			break;
		case kPluginAds:
			ads_ = dynamic_cast<ProtocolAds*>(plugin_protocol);
			if (ads_)
			{
				ads_->configDeveloperInfo(mpluginconfig);
				ads_->setAdsListener(this);
			}
			break;
		default:
			printf("UNKOWN PLUGIN!!!!!!!!!!!");
			break;
		}
		//return plugin_protocol;
	}

	void PluginProxy::logEvent(int logTag, const char* eventName, const char* params)
	{
		if (!analytics_) {
			return;
		}
		switch (logTag)
		{
		case TAG_LOG_EVENT_ID:
			{
				analytics_->logEvent(eventName);
			}
			break;
		case TAG_LOG_EVENT_ID_KV:
			{
				LogEventParamMap paramMap;
				CSJson::Value root;
				CSJson::Reader reader;
				std::string json = params;
				bool flag = reader.parse(json, root);
				if (flag)
				{
					CSJson::Value::Members members = root.getMemberNames();
					for (size_t i = 0; i < members.size(); i++)
					{
						std::string key = members[i];
						if (root[key].isArray() || root[key].isObject())
						{
							printf("don't support recursively json param\n");
							return;
						}
						paramMap.insert(LogEventParamPair(key, root[key].asString()));
					}
				}

				analytics_->logEvent(eventName, &paramMap);
			}
			break;
		case TAG_LOG_EVENT_LABEL_DURATION:
			{
				int duration = 0;
				std::string str_label;
				CSJson::Value root;
				CSJson::Reader reader;
				std::string json = params;
				bool flag = reader.parse(json, root);
				if (flag)
				{
					CSJson::Value::Members members = root.getMemberNames();
					for (size_t i = 0; i < members.size(); i++)
					{
						std::string key = members[i];
						if (root[key].isArray() || root[key].isObject())
						{
							printf("don't support recursively json param\n");
							return;
						}
						if (strcmp(key.c_str(), "duration") == 0)
						{
							duration = root[key].asInt();
						}
						else if (strcmp(key.c_str(), "label") == 0)
						{
							str_label = root[key].asString();
						}
					}
				}

				PluginParam event2(eventName);
				PluginParam dura2(duration);
				PluginParam label(str_label.c_str());
				analytics_->callFuncWithParam("logEventWithDurationLabel", &event2, &dura2, &label, NULL);
			}
			break;
		case TAG_LOG_EVENT_ID_DURATION:
			{
				PluginParam event1(eventName);
				PluginParam dura1(atoi(params));
				analytics_->callFuncWithParam("logEventWithDuration", &event1, &dura1, NULL);
			}
			break;
		case TAG_LOG_EVENT_BEGIN:
			{
				analytics_->logTimedEventBegin(eventName);
			}
			break;
		case TAG_LOG_EVENT_END:
			{
				analytics_->logTimedEventEnd(eventName);
			}
			break;
		case TAG_LOG_EVENT_LABEL_BEGIN:
			{
				PluginParam event1(eventName);
				PluginParam label1(params);
				analytics_->callFuncWithParam("logTimedEventWithLabelBegin", &event1, &label1, NULL);
			}
			break;
		case TAG_LOG_EVENT_LABEL_END:
			{
				PluginParam event1(eventName);
				PluginParam label1(params);
				analytics_->callFuncWithParam("logTimedEventWithLabelEnd", &event1, &label1, NULL);
			}
			break;
		}
	}

	void PluginProxy::setPackageName(const char* packageName)
	{
		packageName_ = packageName;/*
        TUserInfo userInfo;
        userInfo["pn"] = packageName_;
        userInfo["name"] = "SessionGuest";
        userInfo["type"] = "5";
        userInfo["tag"] = "2";
        userInfo["default"] = "1";
        userInfo["order"] = "2";
        std::string msg = "login success";
        onSessionResult(0, msg.c_str(), userInfo);*/
	}
	void PluginProxy::webLoginParam(TSessionGameInfo& info)
	{
		pair< string, string > k_v;
		k_v.first = "PacketName";
		k_v.second = packageName_;
		info.insert(k_v);
	}
	void PluginProxy::onSessionResult(SessionResultCode ret, const char* msg, TUserInfo info)
	{
		std::string jinfo = MapToJsonString(info);
		CSJson::Reader reader;
		CSJson::Value root1;
		if (reader.parse(jinfo, root1))
		{
			CSJson::Value root;
			root["SessionResultCode"] = CSJson::Value((int)ret);
			root["msg"] = CSJson::Value(msg);
			root["sessionInfo"] = root1;
			CSJson::FastWriter writerinfo;
			std::string cbinfo = writerinfo.write(root);
			callback(cbinfo, kSession);
		}
	}

	void PluginProxy::onPayResult(PayResultCode ret, const char* msg, TProductInfo info)
	{
		std::string jinfo = MapToJsonString(info);
		CSJson::Reader reader;
		CSJson::Value root1;
		if (reader.parse(jinfo, root1))
		{
			CSJson::Value root;
			root["PayResultCode"] = CSJson::Value((int)ret);
			root["msg"] = CSJson::Value(msg);
			root["payInfo"] = root1;
			CSJson::FastWriter writerinfo;
			std::string cbinfo = writerinfo.write(root);
			callback(cbinfo, kPay);
		}
	}

	void PluginProxy::onShareResult(ShareResultCode ret, const char* msg, TShareInfo info)
	{
		std::string jinfo = MapToJsonString(info);
		CSJson::Reader reader;
		CSJson::Value root1;
		if (reader.parse(jinfo, root1))
		{
			CSJson::Value root;
			root["ShareResultCode"] = CSJson::Value((int)ret);
			root["msg"] = CSJson::Value(msg);
			root["shareResultInfo"] = root1;
			CSJson::FastWriter writerinfo;
			std::string cbinfo = writerinfo.write(root);
			callback(cbinfo, kSocial);
		}
	}
    
	void PluginProxy::onPlatformResult(PlatformResultCode ret, const char* msg, const char* param)
	{
		printf("onPlatformResultret:%d,msg:%s,url:%s", ret, msg, param);

		CSJson::FastWriter writerinfo;
		CSJson::Value root;
		root["PlatformResultCode"] = CSJson::Value((int)ret);
		root["msg"] = CSJson::Value(msg);
		root["url"] = CSJson::Value(param);
		std::string jc = writerinfo.write(root);

		switch (ret)
		{
		case kPlatformInitHeadfaceSuccess:
			//strHeadIconPathCache = strHeadFacePath;
			//strHeadFacePath = param;
			//TODO
			//sendEvent(kIPlatformEventPhotoNative, msg);
			printf("onHeadImageResult:build param = %s", jc.data());
			//LuaProxy::getInstance()->runLuaFunction("onHeadImageResult",jc);
			break;
		case kPlatformInitHeadfaceFail:
			//TODO
			//sendEvent(kIPlatformEventPhotoNative, msg);
			printf("onHeadImageResult:build param = %s", jc.data());
			//LuaProxy::getInstance()->runLuaFunction("onHeadImageResult",jc);
			break;
		case kPlatformUploadHeadfaceSuccess:
			//strHeadIconUrl = param;
			//TODO
			//sendEvent(kIPlatformEventPhotoUploadFinish, msg);
			printf("onHeadImageResult:build param = %s", jc.data());
			//LuaProxy::getInstance()->runLuaFunction("onHeadImageResult",jc);
			break;
		case kPlatformUploadHeadfaceFail:
			//TODO
			//sendEvent(kIPlatformEventPhotoUploadFail, msg); 
			printf("onHeadImageResult:build param = %s", jc.data());
			//LuaProxy::getInstance()->runLuaFunction("onHeadImageResult",jc);
			break;
		case kPlatformPlaySoundStart:							//	录音开始播放;
		case kPlatformPlaySoundPause:							//	录音中断播放;
		case kPlatformPlaySoundResume:							//	录音恢复播放;
		case kPlatformPlaySoundStop:							//	录音停止播放;
		case kPlatformPlaySoundOver:							//	录音播放结束;
		case kPlatformPlaySoundError:							//	录音播放错误;
			printf("onPlayVoiceResult:build param = %s", jc.data());
			//LuaProxy::getInstance()->runLuaFunction("onPlayVoiceResult",jc);
			break;
		case kPlatformRecordVoiceStart:							//	录音开始;
		case kPlatformRecordVoiceCancle:						//	录音取消;
		case kPlatformRecordVoiceOver:							//	录音结束;
        case kPlatformRecordVoiceFail:                          //  录音失败
		case kPlatformRecordUploadStart:						//	上传开始;
		case kPlatformRecordUploadOver:                         //	上传结束;
        case kPlatformRecordUploadFail:                         //  上传失败;
			printf("onRecordResult:build param = %s", jc.data());
			//LuaProxy::getInstance()->runLuaFunction("onRecordResult",jc);
			break;
        case kPlatformSaveIMGSuccess:
        case kPlatformSaveIMGFail:
            printf("onSaveIMGResult:build param = %s", jc.data());
            break;
        case kPlatformGetUserUidSuccess:
            printf("onGetUserUidResult:build param = %s", jc.data());
            break;
        case kPlatformLocationSuccess:
        case kPlatformLocationFail:
            printf("onLocationResult:build param = %s", jc.data());
            //LuaProxy::getInstance()->runLuaFunction("onLocationResult",jc);
            break;
        case kPlatformGetClipBoardSuccess:
            printf("onGetClipBoardContent:build param = %s", jc.data());
            //LuaProxy::getInstance()->runLuaFunction("onGetClipBoardContent",jc);
            break;
        case kPlatformLoginWaWaJiRoomSuccess:
		case kPlatformWaWaJiRoomOnPlaySuccess:
			printf("onPlatformResult:build param = %s", jc.data());
			//LuaProxy::getInstance()->runLuaFunction("onPlatformResult",jc);
			break;
        case kPlatformGetContactsSuccess://获取通讯录内容成功;
        case kPlatformGetContactsFail://获取通讯录失败;
            printf("onPlatformResult:build param = %s", jc.data());
            break;
		}
		callback(jc, kPlatform);
	}

	void PluginProxy::onAdsResult(AdsResultCode ret, const char* msg, TAdsDeveloperInfo info)
	{
		std::string jinfo = MapToJsonString(info);
		CSJson::Reader reader;
		CSJson::Value root1;
		if (reader.parse(jinfo, root1))
		{
			CSJson::Value root;
			root["AdsResultCode"] = CSJson::Value((int)ret);
			root["msg"] = CSJson::Value(msg);
			root["adsInfo"] = root1;
			CSJson::FastWriter writerinfo;
			std::string cbinfo = writerinfo.write(root);
			callback(cbinfo, kAds);
		}
	}

	void PluginProxy::switchPluginXRunEnv(int env)
	{
		pluginXRunEnv_ = env;
		
		if(extend_)
			((PluginProtocol*)extend_)->setRunEnv(env);
		if(ads_)
			((PluginProtocol*)ads_)->setRunEnv(env);
		if(analytics_)
			((PluginProtocol*)analytics_)->setRunEnv(env);
		if(purchase_)
			((PluginProtocol*)purchase_)->setRunEnv(env);
		if(session_)
			((PluginProtocol*)session_)->setRunEnv(env);
		if(getPlatform())
			((PluginProtocol*)getPlatform())->setRunEnv(env);
		if (push_)
			((PluginProtocol*)push_)->setRunEnv(env);
		
	}

	std::string PluginProxy::gb2utf8(const char* src)
	{/*
		//GB2312到UTF-8的转换
		int len = MultiByteToWideChar(CP_ACP, 0, src, -1, NULL, 0);
		wchar_t* wstr = new wchar_t[len + 1];
		memset(wstr, 0, len + 1);
		MultiByteToWideChar(CP_ACP, 0, src, -1, wstr, len);
		len = WideCharToMultiByte(CP_UTF8, 0, wstr, -1, NULL, 0, NULL, NULL);
		char* str = new char[len + 1];
		memset(str, 0, len + 1);
		WideCharToMultiByte(CP_UTF8, 0, wstr, -1, str, len, NULL, NULL);
		std::string strtemp = str;
		if (wstr)
			delete[] wstr;
		if (str)
			delete[] str;
		return strtemp;*/
		return "";
	}

}}
