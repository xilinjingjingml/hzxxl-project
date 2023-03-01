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
#ifndef __CCX_PROTOCOL_SESSION_H__
#define __CCX_PROTOCOL_SESSION_H__

#include "PluginProtocol.h"
#include <map>
#include <string>

namespace cocos2d { namespace plugin {
	typedef std::map<std::string, std::string> TSessionDeveloperInfo;
	typedef std::map<std::string, std::string> TSessionGameInfo;
	typedef std::map<std::string, std::string> TUserInfo;
	typedef std::map<std::string, std::string> TLoginItemsInfo;
	typedef std::map<std::string, std::string> TRankInfo;
	typedef std::map<std::string, std::string> TOtherInfo;

	typedef enum
	{
		kSessionSuccess = 0,        // 登录成功
		kSessionCancel,             // 登录取消
		kSessionFail,			    // 登录失败
		kSessionSwitchAccount,      // 切换帐号
		kSessionDefaultCallBack,    // 默认回调
		kSessionBinding,            // 帐号绑定
		kSessionBindingSuccess,     // 绑定成功
        kSessionBegin,              //开始WEB登陆
		kSessionUpdateSessionInfo,	// 更新用户信息
		KSessionKillGame,			// 结束游戏进程
	} SessionResultCode;

	class SessionResultListener
	{
	public:
		virtual void onSessionResult(SessionResultCode ret, const char* msg, TUserInfo info) = 0;
	};

	class ProtocolSession : public PluginProtocol
	{
	public:
		ProtocolSession();
		virtual ~ProtocolSession();

		/**
		@brief config game info
		@param info The info of game, must contains key:
		@warning For different plugin, the parameter should have other keys to pay.
		Look at the manual of plugins.
		*/
		void configGameInfo(TSessionGameInfo gameInfo);

		/**
		@brief config the developer info
		@param devInfo This parameter is the info of developer,
		different plugin have different format
		@warning Must invoke this interface before other interfaces.
		And invoked only once.
		*/
		void configDeveloperInfo(TSessionDeveloperInfo devInfo);

		/**
		@brief the interface for user login
		*/
		void sessionLogin();

		/**
		@brief the interface for user login by items
		*/
		void sessionItemsLogin(TLoginItemsInfo itemsInfo);

		/**
		@brief the interface of if user login state
		*/
		//bool isLogin();

		/**
		@brief the interface of user logout
		*/
		void sessionLogout();

		/**
		@breif set the result listener
		@param pListener The callback object for pay result
		@wraning Must invoke this interface before sessionForUser.
		*/
		void setResultListener(SessionResultListener* pListener);

		/**
		@brief session result callback
		@param ret The result code for pay result
		@param msg The result msg for pay result
		*/
		void onSessionResult(SessionResultCode ret, const char* msg);

    /**
    @brief get user info
    */
    void getSelfInfo();

    /**
    @brief get nearby user info
    */
    void getNearbyInfo();

    /**
    @brief get friend info
    */
    void getFriendInfo();

    /**
    @brief get the rank info
    */
    void getRankInfo(TRankInfo info);

    /**
    @brief get the image
    */
    //const char* getImage(const char* ImageId);
    
    /**
     @brief get the other info
     */
    void getOtherInfo(TOtherInfo info);

protected:
    static bool m_bSession;
    SessionResultListener* m_pListener;

	public:
		TUserInfo m_curInfo;
	};
}} // namespace cocos2d { namespace plugin {
#endif /* __CCX_PROTOCOL_IAP_H__ */
