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
#ifndef __CCX_PROTOCOL_COMMON_H__
#define __CCX_PROTOCOL_COMMON_H__
#include "PluginProtocol.h"
namespace cocos2d { namespace plugin {
	typedef std::map<std::string, std::string> TPlatformItemsInfo;

	typedef enum
	{
		kPlatformInitHeadfaceSuccess = 0,					//	头像初始化完成;
		kPlatformInitHeadfaceFail,							//	头像初始化失败;
		kPlatformUploadHeadfaceSuccess,						//	头像上传完成;
		kPlatformUploadHeadfaceFail,						//	头像上传失败;
		
		kPlatformPlaySoundStart,							//	录音开始播放;
		kPlatformPlaySoundPause,							//	录音中断播放;
		kPlatformPlaySoundResume,							//	录音恢复播放;
		kPlatformPlaySoundStop,								//	录音停止播放;
		kPlatformPlaySoundOver,								//	录音播放结束;
		kPlatformPlaySoundError,							//	录音播放错误;

		kPlatformRecordVoiceStart,							//	录音开始;
		kPlatformRecordVoiceCancle,							//	录音取消;
		kPlatformRecordVoiceOver,							//	录音结束;
		kPlatformRecordUploadStart,							//	上传开始;
		kPlatformRecordUploadOver,							//	上传结束;
		kPlatformRecordUploadFail,							//	上传失败;
		kPlatformRecordVoiceFail,							//	录音失败
		kPlatformSaveIMGSuccess,                          	//保存到相册成功
    	kPlatformSaveIMGFail,                             	//保存到相册失败
		kPlatformLocationSuccess,							//定位成功
		kPlatformLocationFail,								//定位失败
		kPlatformGetClipBoardSuccess,						//获取剪切板内容成功
		kPlatformGetUserUidSuccess,							//获取私人房用户座椅号
		kPlatformLoginWaWaJiRoomSuccess,					//进入娃娃机房间成功
		kPlatformWaWaJiRoomOnPlaySuccess,					//娃娃机拉流成功
		kPlatformGetContactsSuccess,                        //获取通讯录内容成功
        kPlatformGetContactsFail,                           //获取通讯录失败
		
		kPlatformUploadExtraParamSuccess=28,				//上传图片成功
		kPlatformUploadExtraParamFail=29,					//上传图片失败
        kPlatformGetKEFUFail,                               //当前客服服务不可用
        kPlatformSystemShareSuccess,                        //系统分享成功
        kPlatformSystemShareCancel,                         //系统分享取消
        kPlatformGetSocialURLParams,                        //获取url跳转app透传的参数

		kPlatformGetOpenInstallParms=50,					//获取openinstall安装参数
	} PlatformResultCode;

	class PlatformResultListener
	{
	public:
		virtual void onPlatformResult(PlatformResultCode ret, const char* msg, const char* param) = 0;
	};

	class ProtocolPlatform : public PluginProtocol
	{
	public:
		ProtocolPlatform();
		virtual ~ProtocolPlatform();

		void onPlatformResult(PlatformResultCode ret, const char* msg, const char* param);

		void setResultListener(PlatformResultListener* pListener);

		void configDeveloperInfo();
        
        float getCurrentNetDBM();
        float getWIFILevel();
        void StartPhoneVibrate(TPlatformItemsInfo phoneInfo);
		/**
		@brief to get devoice name
		@param null

		*/
		std::string getDeviceName();

		/**
		@brief to get devoice type
		@param null

		*/
		std::string getDeviceType();

		/**
		@brief to get devoice name
		@param null

		*/
		std::string getMacAddress();

		/**
		@brief to get device imei
		@param null
		*/
		std::string getDeviceIMEI();

		/**
		@brief to get device imsi
		@param null
		*/
		std::string getDeviceIMSI();

		/**
		@brief to get telphone number
		@param mobile telephone number
		@waring
		*/
		std::string getTelNumber();

		/**
		@brief to get sim card type
		@param null
		*/
		std::string getSimType();

		/**
		@brief to get sim card state
		@param null
		*/
		bool getSimState();

		/**
		@brief to get device batteryLevel
		@param null
		*/
		float getBatteryLevel();

		/**
		@brief to get netWork environment
		@param null
		*/
		int getReachability();

		/**
		@brief to open android url action
		@param null
		*/
		void openURL(std::string strURL);

		/**
		@brief to determine whether the app exist
		@param null
		*/
		int isAppExist(const char* pPacketName);

		/**
		@brief to determine whether the app exist
		@param null
		*/
		bool installApp(const char* pPacketName);

		/**
		@brief to determine open the appliation if it exist
		@param nBDOPID, strTicket, strPacketName, strAccount, strPassword, strDomain, nGameID, strLoginAddr, nLoginPort, strServerAddr, nServerPort, nChannel
		*/
		bool openAppJNI(int nBDOPID, const char* strTicket, const char* strPacketName, const char* strAccount, const char* strPassword, const char* strDomain,
			int nGameID, const char* strLoginAddr, int nLoginPort, const char* strServerAddr, int nServerPort, int nChannel);
		bool openAppJNI(const char* strPacketName);

		bool installAppJNI(const char* pPacketName);

		//bool createDirectory(const std::string& path);

		float getSignalStrength();

		void detachNativeTextField();

		void setNativeTextFieldString(std::string text);

		void setNativeTextFieldPosition(float x, float y, float w, float h);

		void attachNativeTextField(std::string placeHolder,float size, float x, float y, float width, float height);

		/**
		@brief to get the string with the gbk character set from platform
		@param null
		*/
		std::string getGBStringJNI(const char* str);

		/**
		@brief to get the string with the utf character set from platform
		*/
		std::string getUTFStringJNI(const char* pStr);

		/**
		@brief to get the version of app
		@param null
		*/
		std::string getVersionName();

		/**
		@brief to get the version of app
		@param null
		*/
		std::string getVersionCode();

		/**
		@brief to get the name of app
		@param null
		*/
		std::string getPackageName();

		/**
		@brief to get the build of app
		@param null
		*/
		std::string getBuild();

		void initHeadFace(TPlatformItemsInfo itemsInfo);
		/*
		@brief to init the headface
		@param null
		*/
		void initHeadFace();
		/**
		@brief to upload head face
		@param null
		*/
		//std::string IPlatformUploadHeadFace();

		std::string getNativeTextFieldString(const char* pPacketName);
		/**
		@brief to copy text to clopboard
		@param text
		*/
		void copyToClipboard(const char* text);

		std::string screenCut();

		void callPhone(std::string phonenum);

		std::string getMetaName(std::string metaname);

		void playSound(std::string filePathString);
		void stopSound();

		void prepareAudio(std::string playerID);
		void voiceOver(TPlatformItemsInfo itemsInfo);
		void voiceOver();
		void voiceWantToCancel();
        
        void loadImageFinished(std::string imagepath);

        void openGPS();
        void startUpdatingLocation();

        void getClipBoardContent();

        bool getIsPushOn();
        void openPush();
        
        void sendSMS(TPlatformItemsInfo itemsInfo);
        void getSystemContactInfos();
        void setStatusBarIsHidden(bool ishidden);
        float getStatusBarHeight();
        void SystemShare(TPlatformItemsInfo shareInfo);
        void PluginLog(std::string msg);
        //void setSessionInfo(TPlatformItemsInfo sessioninfo);

        std::string getSocialURLParams();
        void clearSocialURLParams();
        void exitApp();
	protected:
		PlatformResultListener* m_pListener;
    public:
        TPlatformItemsInfo m_curInfo;
	};
}} // namespace cocos2d { namespace plugin {
#endif /* __CCX_PROTOCOL_COMMON_H__ */
