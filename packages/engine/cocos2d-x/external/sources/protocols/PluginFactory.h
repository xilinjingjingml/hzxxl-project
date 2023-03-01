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
#ifndef __CCX_PLUGIN_FACTORY_H__
#define __CCX_PLUGIN_FACTORY_H__

#include <map>
#include <string>

namespace cocos2d { namespace plugin {
	// 所有插件;
	enum {
		kPluginAds = 1,
		kPluginAnalytics,			//2
		kPluginIAP,					//3
		kPluginSocial,				//4
		kPluginSession,				//5
		kPluginExend,				//6
		kPluginPush,				//7
		kPluginIAPSelector,			//8
		kPluginPlatform,			//9 平台功能插件，各基础功能，每个应用必须接入
		kPluginIAPSms,				//10
	};

	// 所有第三方平台;
	typedef enum
	{
		kUserNetDragon = 1,
		kUserVisitor,		//2
		kUserTest,			//3
		kUserSina,			//4
		kUserTencent,		//5
		kUserTXY,			//6
		kUserMIUI,			//7
		kPlatformUmeng,		//8
		kPlatformChangyu,	//9
		kPlatformSohu,		//10
		kPlatformYuwan,		//11
		kPlatformSohuGuest,	//12
		kPlatformSky,		//13
		kUserIZhangxin,		//14 掌心登录
		kPlatformJoy7,		//15
		kPlatformMomo,		//16
		kUserOffline,		//17单机版更新
		kPlatformYDMM,		//18移动MM
	}  ThirdPartyLoginType;

	class PluginProtocol;
	class PluginManager;
	class PluginFactory
	{
	public:
		virtual ~PluginFactory();
		/** Get singleton of PluginFactory */
		static PluginFactory* getInstance();

		/** Destory the instance of PluginFactory */
		static void purgeFactory();

	private:
		friend class PluginManager;
		PluginFactory(void);

		/** create the plugin by name */
		PluginProtocol* createPlugin(const char* name);
		
		void addPluginConfig(std::map<std::string, std::string> configInfo);
	};
}} //namespace cocos2d { namespace plugin {
#endif /* __CCX_PLUGIN_FACTORY_H__ */
