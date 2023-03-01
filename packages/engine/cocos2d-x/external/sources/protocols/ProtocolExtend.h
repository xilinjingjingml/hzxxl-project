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
#ifndef __CCX_PROTOCOL_EXTEND_H__
#define __CCX_PROTOCOL_EXTEND_H__

#include "PluginProtocol.h"

namespace cocos2d { namespace plugin {

typedef std::map<std::string, std::string> TExtendInfo;
typedef std::map<std::string, std::string> TFriendInfo;

typedef enum
{
	kExtendSuccess = 0,        //成功
	kExtendCancel,             //取消
	kExtendFail,			   //失败
} ExtendResultCode;

class ExtendResultListener
{
public:
	virtual void onExtendResult(ExtendResultCode ret, const char* msg, TExtendInfo info) = 0;
};

class ProtocolExtend : public PluginProtocol
{
public:
	ProtocolExtend();
	virtual ~ProtocolExtend();

	 /**
	@brief to jump to feedback page
	@param null
	@warning only a few platform has feedback page, eg.91

	*/
	void jumpToUserCenter();

    /**
    @brief to jump to feedback page
    @param null
    @warning only a few platform has feedback page, eg.91
     
    */
	void jumpToFeedBack();

    /**
     @brief to jump to bbs page
     @param null
     @warning only a few platform has bbs page, eg.91
     
    */
    void jumpToBBS();

    void jumpToSocial();

    void shareToThirdPlatformWithScreenShot(const std::string& strText, const std::string& pPath);

    //int shareToThirdPlatformWithFile(const std::string& strText, const std::string& strFile);

    void onPause();

    void onExit();


    //bool getSoundEffect();


    /**
     * @brief the interface of create tool bar
     */
    void create_toolbar();

    void updateScore(TExtendInfo info);

    void addFriend(TFriendInfo info);

    void moreGame();

    void jumpToExtend(int tag);
    void jumpToExtend(int tag, TExtendInfo info);

    void setResultListener(ExtendResultListener* pListener);
    void onExtendResult(ExtendResultCode ret, const char* msg);

protected:
    static bool m_bExtend;
    ExtendResultListener* m_pListener;
public:
    TExtendInfo m_curInfo;
};
}} // namespace cocos2d { namespace plugin {

#endif /* __CCX_PROTOCOL_IAP_H__ */
