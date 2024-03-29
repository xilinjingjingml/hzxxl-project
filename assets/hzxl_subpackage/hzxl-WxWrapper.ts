// import DataManager from "./baseData/DataManager"

import { igs } from "../igs"

// import { isFreeAdvert,  iMessageBox, showFriendPayPop, loadOrderStatus } from "./BaseFuncTs"
let izx = igs.izx

declare const wx: any

const mWxValid: boolean = window["wx"] ? true : false

// const ValidScene = [1001, 1089]
// const AdvertErr = [1000, 1003, 1004, 1005]
// const AdvertFreqErr = [2001, 2002, 2003, 2004, 2005]
// const AdvertUnitId = {
//     Video: "adunit-efe436952d2ef6fc",
//     Banner: "adunit-7bd52837ae07ea68",
//     Interstitial: "adunit-5a57b7b03655a08b",
//     Grid: "adunit-b016cf057deb6a4c"
// }


// const adapt = { screen: null, design: null, ratio: 1, width: 0, height: 0 }

// const advertVideo = {}
// const advertBanner = { }
// const advertInterstitial = { instance: null, valid: true, visible: false }
// const advertGrid = { instance: null, valid: true, rect: null }
// const share = { invoked: true, time: 0, skipCheck: false, callback: null }

// let shareConfig: any = [
//     {
//         title: [
//             "有了这款麻将，老公不出去找牌友通宵了！",
//             "同事最近疯狂种草的游戏，一玩就是一天，根本停不下来！",
//             "不费流量，不费钱，真正免费的麻将，无聊的时候来两把！",
//             "一份钱不花的麻将，玩游戏还能赢话费！",
//             "玩游戏还能赢话费？这款麻将太爽了！"
//         ],
//         image: [
//             "https://pictures.hiigame.com/qmddz/share1.jpg",
//             "https://pictures.hiigame.com/qmddz/share2.jpg"
//         ]
//     }
// ]
const common = { userinfo: null, callback: null, flag: null, scene: 0, backad: true, query: null, appQueryChecked: false }

const GET_WX_OPENID = "mcbeam-authen-srv/auth/weChatMiniSessionKey"
const GAME_LOGIN = "mcbeam-authen-srv/auth/weChatLogin"

namespace WxWrapper {

    export function init() {
        if (mWxValid) {
            //checkAppUpdate()
            //showShareMenu(false)
            //addWxEventListener()

            // adapt.screen = cc.view.getFrameSize()
            // adapt.design = cc.view.getDesignResolutionSize()
            // adapt.ratio = Math.min(adapt.screen.width / adapt.design.width, adapt.screen.height / adapt.design.height)
            // adapt.width = window['_fullWinSize'] ? window['_fullWinSize'].width - cc.winSize.width : 0 //cc.winSize.width - cc.winSize.width

            // const safeArea = wx.getSystemInfoSync().safeArea
            // if (safeArea) {
            //     adapt.height = adapt.screen.height - safeArea.bottom
            // }

            // share.invoked = DataManager.load("WX_FLAG_SHARE") || false

            // const option = wx.getLaunchOptionsSync()
            // common.scene = option.scene
            // common.query = option.query
        }
    }

    export function navigateToMiniProgram(miniGameId: string){
        if (mWxValid){
            wx.navigateToMiniProgram({
                appId: miniGameId,
                path: null,
                extraData: {
                    foo: 'QMDDZ-AD-CLIENT'
                },
                envVersion: 'release',
                success(res) {
                    // console.log("jin---navigateToMiniProgram success")
                },
                fail(){
                    console.log("jin---navigateToMiniProgram fail")
                }
            })
        }
    }

    function errorMsg(tag, res) {
        return tag + ":" + (res ? (res.tips || res.msg) : "unknown")
    }

    function saveKV(key :string, value :string) {
        localStorage.setItem(key, value)
        return true
    }

    function getKV(key :string) {
        let temp = localStorage.getItem(key)
        if ("" === temp || null === temp) {
            return null
        }
        return temp
    }

    function sendMessageToScene(msg) {
    
    }

    function showModal(message) {
        wx.showModal({
            title: "系统提示",
            content: message,
            showCancel: false
        })
    }

    export function vibrateLongTap() {
        wx.vibrateLong()
    }

    export function vibrateShortTap() {
        wx.vibrateShort({ type: "medium" })
    }

    export function vibrateShortTapHeavy() {
        wx.vibrateShort({ type: "heavy" })
    }

    export function vibrateShortTapMedium() {
        wx.vibrateShort({ type: "medium" });
    }

    export function vibrateShortTapLight() {
        wx.vibrateShort({ type: "light" });
    }

    function checkSession(callback) {
        wx.checkSession({
            success: (res) => { callback(true) },
            fail: (res) => { callback(false) }
        })
    }

    function getBindOpenId() {
        return common.query ? common.query.openId : null
    }

    // export function login(callback, forUpdate?) {
    //     if (mWxValid) {
    //         const onGetOpenId = (id, save) => {
                
    //             save && saveKV("WX_USER_OPENID", id)

    //             !forUpdate ? loginGame(id, null, callback) : getUserInfo((err, uinfo) => {
    //                 !err ? loginGame(id, uinfo, callback) : callback(err, null)
    //             })
    //         }

    //         checkSession((valid) => {
    //             const localid = getKV("WX_USER_OPENID")

    //             valid && localid ? onGetOpenId(localid, false) : code2Session((err, openid) => {
    //                 !err ? onGetOpenId(openid, localid != openid) : callback(err, null)
    //             })
    //         })
    //     }
    // }

    // function loginGame(openId, uinfo, callback) {
    //     const bindOpenId = getBindOpenId()
    //     let url = izx.httpUrl + GAME_LOGIN
    //     let body = {
    //         mid: izx.mid,
    //         pn: izx.packetName,
    //         imei: izx.imei,
    //         openid: openId,
    //         device: izx.device,
    //     }
    //     izx.log("wx-loginGame1",body)
    //     HttpMgr.post(url, null, body, (res) => {
    //         izx.log("wx-loginGame",res)
    //         callback(res)
    //     })
    // }

    // function code2Session(callback) {
    //     wx.login({
    //         success: (res) => {
    //             let url = izx.httpUrl + GET_WX_OPENID
    //             let body = {
    //                 mid: izx.mid,
    //                 pn: izx.packetName,
    //                 js_code: res.code
    //             }
    //             HttpMgr.post(url, null, body, (res) => {
    //                 if (res && res.code === "00000" && res.openid) {
    //                     callback(null, res.openid)
    //                     return
    //                 }
    //                 callback(errorMsg("GetOpenId", res), null)
    //             })
    //         },
    //         fail: (res) => { callback(res.errMsg, null) }
    //     })
    // }

    function getSetting(callback) {
        wx.getSetting({
            complete: (res) => {
                callback(res.authSetting || {})
            }
        })
    }

    // scope.userInfo 用户信息授权
    export function checkUserScope(scope, callback) {
        if (mWxValid) {
            getSetting((setting) => {
                callback(setting["scope." + scope] == true)
            })
        } else {
            callback(false)
        }
    }

    export function getUserInfo(callback) {
        if (mWxValid) {
            wx.getUserInfo({
                // openIdList: ["selfOpenId"],
                lang: "zh_CN",
                success: (res) => { callback(null, res) },
                fail: (res) => { callback(res.errMsg, null) }
            })
        }
    }

    // // wx.createUserInfoButton >= 2.0.1
    // export function showUserInfoButton(rect, callback) {
    //     if (mWxValid && wx.createUserInfoButton) {
    //         const flag = [rect.x, rect.y, rect.width, rect.height].join('-')
    //         if (!common.userinfo || common.flag !== flag) {
    //             common.userinfo && common.userinfo.destroy()

    //             const area = convertToDeviceSpace(rect)
    //             const userinfo = wx.createUserInfoButton({
    //                 type: "text",
    //                 text: '',
    //                 style: {
    //                     left: area.left,
    //                     top: area.top,
    //                     width: area.width,
    //                     height: area.height,
    //                     backgroundColor: "#00000000"
    //                 }
    //             })

    //             userinfo.onTap((res) => {
    //                 if (res.rawData && res.signature) {
    //                     userinfo.hide()
    //                     common.callback && common.callback()
    //                     common.callback && (common.callback = null)
    //                 }
    //             })

    //             common.userinfo = userinfo
    //             common.flag = flag
    //         }

    //         common.callback = callback
    //         common.userinfo.show()
    //     }
    // }

    // export function hideUserInfoButton() {
    //     if (mWxValid) {
    //         common.userinfo && common.userinfo.hide()
    //     }
    // }

    // // wx.getUpdateManager >= 1.9.9
    // function checkAppUpdate() {
    //     if (wx.getUpdateManager) {
    //         const updateManager = wx.getUpdateManager()
    //         updateManager.onCheckForUpdate((res) => {
    //             if (res.hasUpdate) {
    //                 updateManager.onUpdateReady(() => {
    //                     wx.showModal({
    //                         title: "更新提示",
    //                         content: "新版本已经准备好,是否重启应用?",
    //                         success: (res) => {
    //                             if (res.confirm) {
    //                                 updateManager.applyUpdate()
    //                             }
    //                         }
    //                     })
    //                 })

    //                 updateManager.onUpdateFailed(() => {
    //                     wx.showModal({
    //                         title: "已经有新版本了",
    //                         content: "新版本已经上线啦,请您删除当前小程序,重新搜索打开",
    //                     })
    //                 })
    //             }
    //         })
    //     }
    // }

    // export function pay(payInfo, callback) {
    //     if (mWxValid) {
    //         const onSessionReady = () => {
    //             setBackToShowAd(false)
    //             requestMidasPayment(payInfo, callback)
    //         }

    //         code2Session((err, openid) => {
    //             openid ? onSessionReady() : callback(false, err)
    //         })

    //         // checkSession((valid) => {
    //         //     valid ? onSessionReady() : code2Session((err, openid) => {
    //         //         openid ? onSessionReady() : callback(false, "账号过期,需要重新登录")
    //         //     })
    //         // })
    //     }
    // }

    // function requestMidasPayment(payInfo, callback) {
    //     wx.requestMidasPayment({
    //         mode: "game",
    //         env: 0, // 0正式 1沙箱
    //         offerId: DataManager.Instance.wxMIDASID,
    //         currencyType: "CNY",
    //         platform: "android",
    //         buyQuantity: payInfo.price,
    //         zoneId: "2", // 后台必须配置
    //         success: () => {
    //             wx.showLoading({ title: "订单处理中", mask: true })
    //             const info_product = {
    //                 appid: wxAPPID,
    //                 offer_id: DataManager.Instance.wxMIDASID,
    //                 pid: DataManager.UserData.guid,
    //                 ticket: DataManager.UserData.ticket,
    //                 openid: DataManager.UserData.openId,
    //                 order: payInfo.order,
    //                 pf: "android",
    //                 envFlag: "office" // office正式 sandBox沙箱
    //             }
    //             HttpMgr.get(DataManager.getURL("WX_PAY_SURE_URL"), info_product, (res) => {
    //                 wx.hideLoading()
    //                 if (res && res.ret == 0) {
    //                     callback(true, "支付成功")
    //                 } else {
    //                     callback(false, "道具发放失败，请联系客服！")
    //                 }
    //             })
    //         },
    //         fail: (res) => {
    //             if (res.errCode == 1) {
    //                 callback(false, "支付取消")
    //             } else {
    //                 callback(false, "支付失败 code:" + res.errCode)
    //             }
    //         }
    //     })
    // }

    // function makeShareParam(shareData) {
    //     shareData = shareData || {}

    //     shareData.query = shareData.query || {}

    //     if (shareData.withOpenId) {
    //         shareData.query.openId = DataManager.UserData.openId
    //     }

    //     let query = ''
    //     let prefix = ''
    //     for (let key in shareData.query) {
    //         query += prefix + key + '=' + shareData.query[key]
    //         prefix = '&'
    //     }
    //     shareData.query = query

    //     const config = randomShare()

    //     return {
    //         title: shareData.title || config.title,
    //         imageUrl: shareData.imageUrl || config.image,
    //         query: shareData.query
    //     }
    // }

    // export function shareAppMessage(param) {
    //     if (mWxValid) {
    //         wx.shareAppMessage(makeShareParam(param))
    //         if (param.callback) {
    //             share.skipCheck = param.skipCheck
    //             share.callback = param.callback
    //             share.time = Date.now()
    //         }
    //     } else {
    //         param.callback && param.callback()
    //     }
    // }

    // wx.setClipboardData >= 1.1.0
    export function setClipboardData(data, callback) {
        if (mWxValid) {
            if (wx.setClipboardData) {
                wx.setClipboardData({
                    data: data,
                    success: (res) => {
                        callback(true)
                    },
                    fail: (res) => {
                        callback(false)
                    }
                })
            } else {
                callback(false)
            }
        }
    }

    // // wx.createRewardedVideoAd >= 2.0.4
    // function createVideoAdvert(unitid) {
    //     if (!advertVideo[unitid]) {
    //         const advert = { instance: null, valid: true, callback: null }
    //         const instance = wx.createRewardedVideoAd({ adUnitId: unitid, multiton: true })

    //         instance.onError((res) => {
    //             console.error("视频广告" + unitid, res)
    //             if (AdvertErr.indexOf(res.errCode) !== -1) {
    //                 advert.valid = false
    //             }

    //             if (advert.callback) {
    //                 advert.callback(2)
    //                 advert.callback = null
    //             }
    //         })

    //         instance.onClose((res) => {
    //             if (advert.callback) {
    //                 if (!res || res.isEnded) {
    //                     advert.callback(0)
    //                 } else {
    //                     advert.callback(1)
    //                 }
    //                 advert.callback = null
    //             }
    //         })

    //         advert.instance = instance
    //         advertVideo[unitid] = advert
    //     }

    //     return advertVideo[unitid]
    // }

    // export function showVideoAdvert(unitid ,callback) {
    //     if (mWxValid) {
    //         const advert = createVideoAdvert(unitid || AdvertUnitId.Video)

    //         if (!advert.valid) {
    //             callback(2)
    //             return
    //         }

    //         advert.callback = callback

    //         wx.showLoading({ title: "加载中", mask: true })

    //         advert.instance.load()
    //             .then(() => {
    //                 advert.instance.show()
    //                     .then(wx.hideLoading)
    //                     .catch((res) => {
    //                         console.error("视频广告显示", res)
    //                         wx.hideLoading()
    //                     })
    //             })
    //             .catch(wx.hideLoading)
    //     } else {
    //         callback(0)
    //     }
    // }

    // // wx.createBannerAd >= 2.0.4
    // function createBannerAdvert(unitid) {
    //     if (!advertBanner[unitid]) {
    //         const advert = { instance: null, valid: true, rect: null, ref: 0 }
    //         const instance = wx.createBannerAd({
    //             adUnitId: unitid,
    //             adIntervals: 30,
    //             style: {
    //                 top: 0,
    //                 left: 0,
    //                 width: 300
    //             }
    //         })

    //         instance.onError((res) => {
    //             console.error("Banner广告" + unitid, res)
    //             if (AdvertErr.indexOf(res.errCode) !== -1) {
    //                 instance.valid = false
    //             }
    //         })

    //         instance.onResize((res) => {
    //             const left = (adapt.screen.width - res.width) / 2
    //             const top = adapt.screen.height - res.height

    //             instance.style.left = left
    //             instance.style.top = top

    //             const x = left / adapt.ratio - adapt.width / 2
    //             const y = (adapt.screen.height - top - res.height) / adapt.ratio
    //             const width = res.width / adapt.ratio
    //             const height = (res.height + adapt.height) / adapt.ratio

    //             advert.rect = cc.rect(x, y, width, height)

    //             cc.log("createBannerAdvert.onResize", unitid, new Date().getTime())
    //             sendMessageToScene({ opcode: "onBannerResize", rect: advert.rect })
    //         })

    //         advert.instance = instance
    //         advertBanner[unitid] = advert
    //     }

    //     return advertBanner[unitid]
    // }

    // export function showBannerAdvert(unitid) {
    //     if (mWxValid) {
    //         const advert = createBannerAdvert(unitid || AdvertUnitId.Banner)

    //         if (!advert.valid) {
    //             return
    //         }

    //         if (advert.rect) {
    //             cc.log("showBannerAdvert.onBannerResize", unitid, new Date().getTime())
    //             sendMessageToScene({ opcode: "onBannerResize", rect: advert.rect })
    //         }

    //         advert.ref++
    //         cc.log("showBannerAdvert", unitid, new Date().getTime())
    //         advert.instance.show()
    //             .catch((res) => {
    //                 console.error("Banner广告显示", unitid, res)
    //             })
    //     }
    // }

    // export function hideBannerAdvert(unitid, hideAll?) {
    //     if (mWxValid) {
    //         if (hideAll) {
    //             for (const id in advertBanner) {
    //                 advertBanner[id].ref = 0
    //                 advertBanner[id].instance.hide()
    //             }
    //         } else {
    //             const advert = createBannerAdvert(unitid || AdvertUnitId.Banner)
    //             advert.ref--
    //             if (advert.ref <= 0) {
    //                 advert.ref = 0
    //                 advert.instance.hide()
    //             }
    //         }
    //     }
    // }

    // // wx.createInterstitialAd >= 2.6.0
    // function createInterstitialAdvert(unitid) {
    //     if (wx.createInterstitialAd && !advertInterstitial.instance) {
    //         const advert = wx.createInterstitialAd({ adUnitId: unitid })

    //         advert.onError((res) => {
    //             console.error("插屏广告", res)
    //             advertInterstitial.visible = false
    //             if (AdvertFreqErr.indexOf(res.errCode) !== -1 && AdvertErr.indexOf(res.errCode) !== -1) {
    //                 advertInterstitial.valid = false
    //             }
    //         })

    //         advert.onClose(() => {
    //             advertInterstitial.visible = false
    //         })

    //         advertInterstitial.instance = advert
    //     }

    //     return advertInterstitial.instance
    // }

    // export function showInterstitialAdvert() {
    //     if (mWxValid && wx.createInterstitialAd && advertInterstitial.valid && !advertInterstitial.visible && !isFreeAdvert()) {

    //         advertInterstitial.visible = true
    //         const advert = createInterstitialAdvert(AdvertUnitId.Interstitial)

    //         advert.show()
    //             .catch((res) => {
    //                 console.error("插屏广告显示", res)
    //                 advertInterstitial.visible = false
    //             })
    //     }
    // }

    // // wx.createGridAd >= 2.9.2
    // function createGridAdvert(unitid) {
    //     if (!advertGrid.instance) {
    //         const advert = wx.createGridAd({
    //             adUnitId: unitid,
    //             adIntervals: 30,
    //             adTheme: "white",
    //             gridCount: 5,
    //             style: {
    //                 top: 0,
    //                 left: 0,
    //                 width: 300
    //             }
    //         })

    //         advert.onError((res) => {
    //             console.error("格子广告", res)
    //             if (AdvertErr.indexOf(res.errCode) !== -1) {
    //                 advertGrid.valid = false
    //             }
    //         })

    //         advert.onResize((res) => {
    //             const left = (adapt.screen.width - res.width) / 2
    //             const top = adapt.screen.height - res.height

    //             advert.style.left = left
    //             advert.style.top = top

    //             const x = left / adapt.ratio - adapt.width / 2
    //             const y = (adapt.screen.height - top - res.height) / adapt.ratio
    //             const width = res.width / adapt.ratio
    //             const height = (res.height + adapt.height) / adapt.ratio

    //             advertGrid.rect = cc.rect(x, y, width, height)

    //             sendMessageToScene({ opcode: "onGridResize", rect: advertGrid.rect })
    //         })

    //         advertGrid.instance = advert
    //     }

    //     return advertGrid.instance
    // }

    // export function showGridAdvert() {
    //     if (mWxValid && wx.createGridAd && advertGrid.valid) {
    //         if (advertGrid.rect) {
    //             sendMessageToScene({ opcode: "onGridResize", rect: advertGrid.rect })
    //         }

    //         const advert = createGridAdvert(AdvertUnitId.Grid)
    //         advert.show()
    //             .catch((res) => {
    //                 console.error("格子广告显示", res)
    //             })
    //     }
    // }

    // export function hideGridAdvert() {
    //     if (mWxValid && advertGrid.instance) {
    //         advertGrid.instance.hide()
    //     }
    // }

    // // wx.setEnableDebug >= 1.4.0
    // export function setEnableDebug(enable) {
    //     if (mWxValid) {
    //         wx.setEnableDebug && wx.setEnableDebug({ enableDebug: enable })
    //     }
    // }

    // export function exitMiniProgram() {
    //     if (mWxValid) {
    //         wx.exitMiniProgram({
    //             success: () => {
    //                 cc.log("wx.exitMiniProgram success")
    //             },
    //             fail: () => {
    //                 cc.log("wx.exitMiniProgram fail")
    //             }
    //         })
    //     }
    // }

    // // wx.showShareMenu >= 1.1.0
    // function showShareMenu(withShareTicket) {
    //     wx.showShareMenu && wx.showShareMenu({ withShareTicket: withShareTicket || false })

    //     wx.onShareAppMessage(() => {
    //         const config = randomShare()
    //         let query = "openId=" + DataManager.UserData.openId

    //         return {
    //             title: config.title,
    //             imageUrl: config.image,
    //             query: query
    //         }
    //     })
    // }

    // export function setBackToShowAd(show) {
    //     common.backad = show
    // }

    // // wx.onShareMessageToFriend >= 2.9.4
    // function addWxEventListener() {
    //     wx.onShow((res) => {
    //         common.query = res.query
    //         common.scene = res.scene
    //         common.appQueryChecked = false

    //         if (share.callback) {
    //             let success = true
    //             if (share.skipCheck) {
    //                 // do nothing
    //             } else if (!share.invoked) {
    //                 success = false
    //                 share.invoked = true
    //                 DataManager.save("WX_FLAG_SHARE", true)
    //             } else if (Date.now() - share.time < 3000) {
    //                 success = false
    //             }

    //             success ? share.callback() : showModal("分享失败，请换个群试试。")
    //             share.callback = null
    //         } else if (checkAppQuery()) {
    //             // do nothing
    //         } else if (common.backad && null == DataManager.CommonData["gameServer"] && !DataManager.CommonData.CancelBackAd) {
    //             showInterstitialAdvert()
    //         }
    //         setBackToShowAd(true)
    //     })

    //     if (wx.onShareMessageToFriend) {
    //         wx.onShareMessageToFriend((res) => {
    //             sendMessageToScene({ opcode: "onShareToFriend", success: res.success })
    //         })
    //     }
    // }



    // export function captureScreen(param, callback) {
    //     if (!mWxValid) {
    //         callback(false)
    //         return
    //     }

    //     param.success = (res) => { callback(true, res.tempFilePath) }
    //     param.fail = () => { cc.log('screenshot fail'); callback(false) }
    //     //cc.game.canvas.toTempFilePath(param)
    // }

    // export function checkSceneCode() {
    //     if (!mWxValid) {
    //         return true
    //     }

    //     return ValidScene.indexOf(common.scene) !== -1
    // }

    // export function setShareConfig(config) {
    //     shareConfig = config
    // }

    // export function randomShare() {
    //     const config = shareConfig[Math.floor(Math.random() * shareConfig.length)]
    //     let title = config.title
    //     let image = config.image

    //     if (Array.isArray(title)) {
    //         title = title[Math.floor(Math.random() * title.length)]
    //     }

    //     if (Array.isArray(image)) {
    //         image = image[Math.floor(Math.random() * image.length)]
    //     }

    //     return { title: title, image: image }
    // }

    // export function getNotchHeight() {
    //     if (cc.view.getFrameSize().equals(cc.size(812, 375))) {
    //         return 30
    //     }

    //     if (!mWxValid) {
    //         return 0
    //     }

    //     const info = wx.getSystemInfoSync()

    //     if (!info.safeArea || !info.screenWidth) {
    //         return 0
    //     }

    //     return Math.max(info.safeArea.left, info.screenWidth - info.safeArea.right)
    // }

    

    // // wx.getOpenDataContext >= 1.9.92
    // export function postMessage(message) {
    //     if (mWxValid && wx.getOpenDataContext) {
    //         const context = wx.getOpenDataContext()
    //         context && context.postMessage(message)
    //     }
    // }

    // export function convertToDeviceSpace(rect) {
    //     if (mWxValid) {
    //         const width = rect.width * adapt.ratio
    //         const height = rect.height * adapt.ratio
    //         const left = (adapt.width / 2 + rect.x) * adapt.ratio
    //         const top = adapt.screen.height - rect.y * adapt.ratio - height

    //         return { top: top, left: left, width: width, height: height }
    //     }
    //     return rect
    // }

    // export function initVideo(unitid) {
    //     if (mWxValid) {
    //         createVideoAdvert(unitid || AdvertUnitId.Video)
    //     }
    // }

    // export function initBanner(unitid) {
    //     if (mWxValid) {
    //         createBannerAdvert(unitid || AdvertUnitId.Banner)
    //     }
    // }

    // // wx.requestSubscribeMessage >= 2.4.4
    // export function requestSubscribeMessage(templateId, callback) {
    //     if (mWxValid && wx.requestSubscribeMessage) {
    //         wx.requestSubscribeMessage({
    //             tmplIds: [templateId],
    //             complete: (res) => {
    //                 if (res.errMsg == "requestSubscribeMessage:ok" && res[templateId] == "accept") {
    //                     HttpMgr.get(DataManager.getURL("WX_SUBSCRIBE_MESSAGE"), {
    //                         appId: wxAPPID,
    //                         openId: DataManager.UserData.openId,
    //                         pageId: 1001,
    //                         templateId: templateId
    //                     }, (res) => {
    //                         if (res && res.ret == 0) {
    //                             callback(true)
    //                         } else {
    //                             callback(false)
    //                         }
    //                     })
    //                 } else {
    //                     console.error(res.errCode + res.errMsg)
    //                     callback(false)
    //                 }
    //             }
    //         })
    //     } else {
    //         callback(false)
    //     }
    // }

    // export function checkAppQuery() {
    //     if (!common.appQueryChecked && common.query && common.query.event) {
    //         const event = common.query.event
    //         if (event == "friendPay") {
    //             if (cc.sys.os == cc.sys.OS_IOS) {
    //                 iMessageBox("暂不支持IOS用户赠送")
    //             } else {
    //                 loadOrderStatus(common.query.order, (res) => {
    //                     if (res) {
    //                         if (res.ret == 1) {
    //                             showFriendPayPop(common.query, true)
    //                         } else if (res.ret == 0) {
    //                             iMessageBox("订单已支付")
    //                         } else {
    //                             iMessageBox("订单支付已关闭")
    //                         }
    //                     } else {
    //                         iMessageBox("订单状态查询失败")
    //                     }
    //                 })
    //                 return true
    //             }
    //         }
    //         common.appQueryChecked = true
    //     }
    //     return false
    // }
}

export default WxWrapper