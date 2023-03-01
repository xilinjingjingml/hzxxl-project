import { Constants } from "../igsConstants";
import { DataMgr } from "../base/DataMgr";
import { Helper } from "../system/Helper";
import { EventMgr } from "../base/EventMgr";
import { PluginMgr } from "../base/PluginMgr";
import { MatchSvr } from "../system/MatchSvr";
import { UserSrv } from "../system/UserSrv";
import { ShopSvr } from "../system/ShopSvr";
import { igs } from "../../../../igs";
import { UIMgr } from "../base/UIMgr";
import { User } from "../data/User";
import { Util } from "./utilApi";
import { ActivitySrv, MonthSignSrv, VipPrivilegeSrv } from "../system/ActivitySrv";
import { ExchangeSrv } from "../system/ExchangeSrv";
import { WxProxyWrapper } from "../pulgin/WxProxyWrapper";
import { Player } from "./playerApi";

let _ready: boolean = false

const _hostname = {
    [Constants.ENV.ENV_SANDBOX]: "igaoshou.mcbeam.cc",
    // [Constants.ENV.ENV_SANDBOX]: "igaoshou.wpgame.com.cn",
    [Constants.ENV.ENV_PRODUCTION]: "igaoshou.weipinggame.com.cn",
    [Constants.ENV.ENV_ABROAD]: "igaoshou.mcbeam.dev",
}

const PLATFORM_API = 'platformapi'

export namespace PlatformApi {

    export let isInLobby = false
    export let isForeground = true
    export let lobbyBundleList = []

    export function Initialize() {
        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.PLATFORM_INIT)
    }

    export function Launch() {
        Initialize()

        loadBase()

        let start = () => {
            MatchSvr.GetPlayerStatus((res) => {
                if (res && res.room_id && res.game_type == "RealTimeGame") {
                    let matchs: TMatchs = DataMgr.getData<TMatchs>(Constants.DATA_DEFINE.MATCH_CONFIG)
                    if (matchs && res && res.match_cid && matchs[res.match_cid]) {
                        let share_code = ""
                        let room_type = 0
                        if (res.metadata && res.metadata.properties) {
                            let properties = Helper.ParseJson(res.metadata.properties, "checkRealTimeMatch")
                            if (properties && properties.gs_properties && properties.gs_properties.share_code) {
                                share_code = properties.gs_properties.share_code
                            }

                            if (properties.gs_properties && properties.gs_properties.room_type) {
                                room_type = properties.gs_properties.room_type
                            }
                        }
                        if (Helper.CheckInList(room_type, [1])) {
                            MatchSvr.setCurRoomInfo({ serverId: res.server_id, gameGid: res.game_gid, roomId: res.room_id })
                            if (share_code && share_code.length > 0) {
                                MatchSvr.getRoomInfo({ share_code: share_code }, (res) => {
                                    if (res.room) {
                                        PlatformApi.joinPrivateGame(res.room, true, false)
                                    } else {
                                        enterLobby()
                                    }
                                })
                            } else {
                                PlatformApi.enterGame(matchs[res.match_cid], true)
                            }
                        } else {
                            enterLobby()
                        }
                    } else {
                        enterLobby()
                    }
                } else {
                    var option = WxProxyWrapper.getWxLaunchOptionsSync()
                    console.log("platformapi Launch option", option)
                    if (option && typeof option === "object" && option.shareMessageToFriendScene) {//开放域分享
                        let text = String(option.shareMessageToFriendScene)
                        let code = text.split(".")
                        option.inviteCode = code[1].padEnd(6, "0")
                    }
                    if (option && typeof option === "object" && option.inviteCode) { // 进入房间
                        MatchSvr.getRoomInfo({ share_code: option.inviteCode }, (res) => {
                            if (res.room) {
                                PlatformApi.joinPrivateGame(res.room, false, false)
                            } else {
                                enterLobby()
                            }
                        })
                    } else if (User.PlayGame === 0) {
                        DataMgr.setData("newuser", true)
                        // EventMgr.dispatchEvent(Constants.EVENT_DEFINE.RECORD_POINT, { moduleName: "登录", action: "初始化用户", label: "User.PlayGame === 0" })
                        let list = MatchSvr.getMatchList(Constants.GAME_TYPE_LABLE.MAJIONG_HZXL)
                        if (list.length > 0) {
                            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.RECORD_POINT, { moduleName: "登录", action: "初始化用户", label: "enterGame" })
                            PlatformApi.enterGame(list[0], false, false)
                        } else {
                            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.RECORD_POINT, { moduleName: "登录", action: "初始化用户", label: "enterLobby" })
                            enterLobby()
                        }
                    } else {
                        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.RECORD_POINT, { moduleName: "登录", action: "初始化用户", label: "enterLobby2" })
                        enterLobby()
                    }
                }
            })

            // if (User.Data.openId === "10000" || User.AllGame === 0) {
            //     let abKey = PluginMgr.getABTestKey("expt_enter_test")
            //     console.log("abKey " + abKey)
            //     if (abKey === "1") {
            //         enterGame()
            //     } else {
            //         enterMatch()
            //     }
            // } else {
            // enterLobby()
            // }
        }

        if (cc.sys.isNative) {
            EventMgr.once(Constants.EVENT_DEFINE.CONFIG_INIT, () => {
                EventMgr.dispatchEvent(Constants.EVENT_DEFINE.PLUGIN_INIT)
            })
            EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                start()
            })
        } else {
            EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                start()
            })
            EventMgr.once(Constants.EVENT_DEFINE.PLUGIN_FINISH, () => {
                // start()
            })
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.PLUGIN_INIT)
        }
        loadConfig()
    }

    export function GameBack() {
        enterResult()
        Util.PlayBackgroundMusic()
    }

    export function GotoLobby(tab: string = null) {
        enterLobby(tab, null)
    }

    export function SDKVersion(): string {
        return Constants.version
    }

    function loadBase() {
        DataMgr.data.Config = igs.exports.config
        let env = Helper.GetURI("env")
        if (null !== env && undefined !== env) {
            DataMgr.data.Config.env = Number(env)
        }
        env = DataMgr.getData(Constants.DATA_DEFINE.IGS_ENV)
        if (null !== env && undefined !== env) {
            DataMgr.data.Config.env = Number(env)
        }

        DataMgr.data.Config.hostname = _hostname[DataMgr.data.Config.env]

        let gameId = Helper.GetURI("gameid")
        if (gameId ?? false) {
            DataMgr.data.Config.gameId = gameId
        }
    }

    function loadConfig() {
        let lastGameId = DataMgr.getData<string>(Constants.DATA_DEFINE.LAST_GAME_ID) || DataMgr.data.Config.gameId
        if (DataMgr.data.Config.gameId !== lastGameId) {
            DataMgr.data.Config.gameId = lastGameId
            MatchSvr.LoadMatchConfig(lastGameId)
        } else if (!igs.exports.lobbyConfig.config || !igs.exports.lobbyConfig.config.match_detail) {
            MatchSvr.LoadMatchConfig(DataMgr.data.Config.gameId)
        } else {
            if (igs.exports.lobbyConfig.config.match_detail != "[]") {
                MatchSvr.initMatch(igs.exports.lobbyConfig.config.match_detail)
            } else {
                igs.on(igs.consts.Event.GET_ONLINE_PARAM_SUCCESS, () => {
                    MatchSvr.initMatch(igs.exports.lobbyConfig.config.match_detail)
                })
            }
        }

        UserSrv.initItems()
        // ShopSvr.initShop(igs.exports.lobbyConfig.config)

        cc.assetManager.loadBundle("baseScript", (err, asset) => {
            if (!err) {

            }

            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.CONFIG_INIT)
        })

        Util.PlayBackgroundMusic()
    }

    function enterResult(callback?: Function) {
        console.log("====enterResult " + Date.now())
        cc.assetManager.getBundle("lobbyMain").loadScene("result", (err, res) => {
            if (err) {
                Helper.reportEvent("load result scene", "err", err.message)
                return
            }
            console.log("===loadResult " + Date.now())
            cc.director.runSceneImmediate(res, null, () => {
                console.log("===runResult" + Date.now())
                callback?.()
            })
        })
    }

    function enterLobby(tab?: string, callback?: Function) {
        // Helper.reportEvent("平台加载", "大厅launch", "请求主界面")
        console.log("===enterLobby " + Date.now())
        igs.platform.trackEvent(igs.platform.TrackNames.IGS_LOBBY_LAUNCH)

        let onProgress = function (finish: number, total: number, item: cc.AssetManager.RequestItem) {
            igs.emit("load_asset_progress", { finish: finish, total: total, item: item })
        }

        let onComplete = function () {
            cc.assetManager.getBundle("lobbyMain").loadScene("lobby", onProgress, (err, scene) => {
                if (err) {
                    Helper.reportEvent("load scene err scene=" + "lobby", " err=", err.message)
                    // cc.assetManager.cacheManager.clearCache()
                    return
                }
                // Helper.reportEvent("平台加载", "大厅launch", "进入主界面")
                console.log("===loadLobby " + Date.now())
                cc.director.runSceneImmediate(scene, () => { }, () => {
                    igs.blockUI()
                    cc.assetManager.loadBundle("lobbyMain", (err, startBundle) => {
                        startBundle.load("component/baseScene/BaseScene", cc.Prefab, (err, baseScene: cc.Prefab) => {
                            igs.unBlockUI()
                            if (err) {
                                Helper.reportEvent("load scene err scene=" + "BaseScene", " err=", err.message)
                                return
                            }
                            let inst = cc.instantiate(baseScene)
                            let parent = cc.find("Canvas")
                            parent.insertChild(inst, parent.getChildByName("touchEffect").getSiblingIndex())

                            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.HIDE_BANNER)
                            if (tab) {
                                setTimeout(() => {
                                    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.INIT_MAIN_TAB, { name: tab })
                                }, .1);
                            }
                            console.log("===runLobby " + Date.now())
                            callback?.()
                        })
                    })
                })
            })
        }

        let loadDir = () => {
            onComplete()
        }

        let loadScene = function () {
            let bundle_name = "lobbyMain"
            let bundle = cc.assetManager.getBundle(bundle_name)
            if (bundle) {
                let asset = bundle.get("lobby")
                if (asset) {
                    loadDir()
                } else {
                    bundle.loadScene("lobby", onProgress, (err, res) => {
                        if (err) {
                            console.log("loadAsset err", err)
                            Helper.reportEvent("load scene err scene=" + "lobby", " err=", err.message)
                        } else {
                            loadDir()
                        }
                    })
                }
            } else {
                cc.assetManager.loadBundle(bundle_name, (err, bundle) => {
                    if (err) {
                        console.error("load bundle err", err)
                    } else {
                        loadScene()
                    }
                });
            }
        }
        loadScene()
    }

    function enterMatch(callback?: Function) {
        // Helper.reportEvent("平台加载", "大厅launch", "请求匹配界面")
        console.log("===enterMatch " + Date.now())
        cc.assetManager.getBundle("lobbyMain").loadScene("match", (err, scene) => {
            if (err) {
                Helper.reportEvent("load match scene", "err", err.message)
                return
            }
            MatchSvr.JoinSingleMatch()
            Helper.reportEvent("匹配-3.1、进入匹配界面")
            console.log("===loadMatch " + Date.now())
            cc.director.runSceneImmediate(scene, () => {
                console.log("===runMatch " + Date.now())
                callback?.()
            })
        })
    }

    export function enterGame(match: IMatchInfo, reconnect: boolean = false, showBlockUi: boolean = true) {
        showBlockUi && igs.blockUI()
        if (User.PlayGame === 0) {
            Helper.reportEvent("首局-4.1、进入游戏")
        } else if (User.PlayGame === 1) {
            Helper.reportEvent("第二局-5.1、进入第二局")
        } else {
            Helper.reportEvent("正常局数-8.1、进入游戏")
        }

        let ls: string[] = []
        ls.push(match.matchId)
        MatchSvr.setRealTimeMatchReqList(ls)
        DataMgr.setData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO, match)
        cc.assetManager.loadBundle("hzxl_subpackage", (err: Error, bundle: cc.AssetManager.Bundle) => {
            EventMgr.dispatchEvent("room_enter_game", { matchInfo: match, reconnect: reconnect })
        })
    }

    export function joinPrivateGame(room: any, reconnect: boolean = false, check: boolean = true) {
        let enter = function () {
            try {
                igs.odc.setMessageToFriendQuery(Number("0." + room.metadata.share_code))
            } catch (error) { }
            MatchSvr.privateRoomInfo = {}
            MatchSvr.privateRoomInfo.room = room
            MatchSvr.privateRoomInfo.serverId = room.server_id,
                MatchSvr.privateRoomInfo.gameGid = room.game_gid,
                MatchSvr.privateRoomInfo.roomId = room.room_id
            EventMgr.dispatchEvent("room_enter_game", { matchInfo: { gameId: room.game_gid }, reconnect: reconnect, privateRoomInfo: MatchSvr.privateRoomInfo })
            DataMgr.setData(Constants.DATA_DEFINE.HIDE_BROKE_POP, true)
        }
        if (check) {
            MatchSvr.checkRealTimeMatch((res) => {
                if (null === res) {
                    enter()
                }
            })
        } else {
            enter()
        }
    }

    export function joinPlayVideoGame(gameid, videoData) {
        DataMgr.setData(Constants.DATA_DEFINE.HIDE_BROKE_POP, true)
        EventMgr.dispatchEvent("room_enter_game", { matchInfo: { gameId: gameid }, videoData: videoData })
    }

    // function enterGame() {
    //     MatchSvr.JoinSingleMatch()
    //     MatchSvr.EnterSingleMatch()
    //     MatchSvr.StartGame()
    // }

    export function gameItemCheck(param: any, ret: number = 1) {
        let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
        console.log("gameItemCheck matchInfo", matchInfo)
        if (matchInfo && matchInfo.metadata) {
            let gs_properties = matchInfo.metadata.gs_properties
            console.log("gameItemCheck gs_properties", gs_properties)
            if (gs_properties) {
                let userItemNum = 0
                if (param.userItemNum) {
                    userItemNum = param.userItemNum
                } else {
                    let userItem = User.Items[gs_properties.settle_item]
                    if (userItem) {
                        userItemNum = userItem.num
                    }
                }
                console.log("gameItemCheck userItemNum", userItemNum)
                if (gs_properties.item_limit.max && userItemNum >= gs_properties.item_limit.max) {
                    let newMatchInfo = MatchSvr.getSuitedMatch(matchInfo.labals)
                    if (newMatchInfo) {
                        let name = newMatchInfo.name.substr(-3)
                        UIMgr.OpenUI("component/Activity/EarnMore", {
                            single: true, param: {
                                name: name, confirm: () => {
                                    let ls: string[] = []
                                    ls.push(newMatchInfo.matchId)
                                    DataMgr.setData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO, newMatchInfo)
                                    MatchSvr.setRealTimeMatchReqList(ls)
                                    param.callback && param.callback({ ret: 2 })
                                }
                            }
                        })
                        // let name = newMatchInfo.name.substr(-3)
                        // UIMgr.OpenUI("component/Base/GamePop", {
                        //     param: {
                        //         msg: "大神，您的实力太强了，推荐您前往"+name+"哦！",
                        //         confirm: () => {
                        //             let ls: string[] = []
                        //             ls.push(newMatchInfo.matchId)
                        //             DataMgr.setData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO, newMatchInfo)
                        //             MatchSvr.setRealTimeMatchReqList(ls)
                        //             param.callback && param.callback({ret: 2})
                        //         }
                        //     }
                        // })
                    } else {
                        Helper.OpenTip("暂无场次")
                    }
                } else if (userItemNum >= gs_properties.item_limit.min) {
                    param.callback && param.callback({ ret: ret })
                } else {
                    if (gs_properties.settle_item == DataMgr.data.Config.mainItemId) {
                        Helper.checkLackMoney(gs_properties.item_limit.min, (res) => {
                            if (res.isBuy) {
                                param.callback && param.callback({ ret: ret })
                            } else {
                                let newMatchInfo = MatchSvr.getSuitedMatch(matchInfo.labals)
                                if (res.exchangeBox && newMatchInfo.matchId != matchInfo.matchId) {
                                    let param1 = {
                                        matchInfo: newMatchInfo,
                                        exchangeBox: res.exchangeBox,
                                        confirm: () => {
                                            param.callback && param.callback({ ret: ret })
                                        },
                                        cancel: () => {
                                            let ls: string[] = []
                                            ls.push(newMatchInfo.matchId)
                                            DataMgr.setData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO, newMatchInfo)
                                            MatchSvr.setRealTimeMatchReqList(ls)
                                            param.callback && param.callback({ ret: 3 })
                                            PlatformApi.gameItemCheck(param, 2)
                                        }
                                    }
                                    UIMgr.OpenUI("component/Activity/DropMatch", { single: true, param: param1 })
                                } else {
                                    Helper.checkBroke(gs_properties.item_limit.min, (res) => {
                                        if (res.isBuy) {
                                            param.callback && param.callback({ ret: ret })
                                        }
                                    })
                                }
                            }
                        })
                    } else if (gs_properties.settle_item == Constants.ITEM_INDEX.GAME_BEAN) {
                        UIMgr.OpenUI("component/Shop/ExchangeBean", { single: true, param: { matchInfo: matchInfo } })
                    }
                }
            } else {
                param.callback && param.callback({ ret: ret })
                console.log("gs_properties is nil")
            }
        } else {
            param.callback && param.callback({ ret: ret })
            console.log("matchInfo or matchInfo.metadata is nil")
        }
    }

    //复活宝箱
    export function showResurgenceBox(param: any) {
        console.log("showResurgenceBox param=", param)
        if (!param.ndItem) {
            let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
            if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties) {
                let gs_properties = matchInfo.metadata.gs_properties
                param.ndItem = {}
                param.ndItem.id = gs_properties.settle_item
                param.ndItem.num = gs_properties.item_limit.min
            } else {
                param.callback && param.callback({ ret: 1 })
            }
        }

        if (param.ndItem) {
            UIMgr.OpenUI("component/Activity/ResurgenceBox/ResurgenceBox", { single: true, param: param })
        } else {
            param.callback && param.callback({ ret: 1 })
        }
    }

    //免费找回损失
    export function showRecoverLosses(param: any, closeCb: Function) {
        console.log("showRecoverLosses param=", param)
        if (param.resultData.score < 0) {
            let activity_id = 1017
            let config = ActivitySrv.GetActivityById(activity_id)
            if (config && config.receive_num < config.day_times) {
                ActivitySrv.GetActivityConfig(activity_id, param.roomInfo.roomId, (res) => {
                    if (res) {
                        UIMgr.OpenUI("component/Activity/RecoverLosses/RecoverLosses", {
                            single: true,
                            param: {
                                type: 1,
                                resultData: param.resultData,
                                activity: res,
                                callback: param.callback
                            },
                            closeCb: closeCb
                        })
                    } else {
                        PlatformApi.showPayRecoverLosses(param, closeCb)
                    }
                })
            } else {
                PlatformApi.showPayRecoverLosses(param, closeCb)
            }
        } else {
            closeCb && closeCb()
        }
    }

    //付费找回损失
    export function showPayRecoverLosses(param: any, closeCb: Function) {
        console.log("showPayRecoverLosses param=", param)
        let activity_id = 1018
        let config = ActivitySrv.GetActivityById(activity_id)
        if (Helper.isAudit() == false && config && config.receive_num < config.day_times) {
            ActivitySrv.GetActivityConfig(activity_id, param.roomInfo.roomId, (res) => {
                if (res) {
                    UIMgr.OpenUI("component/Activity/RecoverLosses/RecoverLosses", {
                        single: true,
                        param: {
                            type: 2,
                            resultData: param.resultData,
                            activity: res,
                            callback: param.callback
                        },
                        closeCb: closeCb
                    })
                } else {
                    closeCb && closeCb()
                }
            })
        } else {
            closeCb && closeCb()
        }
    }

    //是否有免费找回损失礼包
    export function checkZhssBox(param: any) {
        console.log("checkZhssBox param=", param)
        let getActivity = (activity_id, callback) => {
            ActivitySrv.GetActivityConfig(activity_id, param.roomInfo.roomId, (res) => {
                if (res) {
                    callback({ ret: 2, data: res })
                } else {
                    callback({ ret: 1 })
                }
            })
        }
        if (Helper.isAudit() == false && param && param.roomInfo && param.resultData && param.resultData.score && param.resultData.score < 0) {
            let activity_id = 1017
            let config = ActivitySrv.GetActivityById(activity_id)
            if (config && config.receive_num < config.day_times) {
                getActivity(activity_id, (res) => {
                    if (res.ret == 2) {
                        param.callback && param.callback({ ret: res.ret, data: res.data })
                    } else {
                        let activity_id = 1018
                        let config = ActivitySrv.GetActivityById(activity_id)
                        if (config && config.receive_num < config.day_times) {
                            getActivity(activity_id, (res) => {
                                if (res.ret == 2) {
                                    param.callback && param.callback({ ret: res.ret, data: res.data })
                                } else {
                                    param.callback && param.callback({ ret: 1 })
                                }
                            })
                        } else {
                            param.callback && param.callback({ ret: 1 })
                        }
                    }
                })
            } else {
                param.callback && param.callback({ ret: 1 })
            }
        } else {
            param.callback && param.callback({ ret: 1 })
        }
    }

    //赢币暴击
    export function showWinMore(param: any) {
        console.log("showWinMore param=", param)
        let activity_id = 1019
        let config = ActivitySrv.GetActivityById(activity_id)
        if (config && config.receive_num < config.day_times) {
            ActivitySrv.GetActivityConfig(activity_id, param.roomInfo.roomId, (res) => {
                if (res) {
                    UIMgr.OpenUI("component/Activity/WinMore/WinMore", {
                        single: true, param: {
                            type: 2, activity: res, callback: (res) => {
                                param.callback && param.callback(res)
                            }
                        }
                    })
                } else {
                    param.callback && param.callback({ ret: 1 })
                }
            })
        } else {
            param.callback && param.callback({ ret: 1 })
        }
    }

    //首胜礼包
    export function showFirstWin(param: any, callback: Function) {
        console.log("showFirstWin param=", param)
        if (param.gs_properties && (!param.gs_properties.room_type || param.gs_properties.room_type == 0)) {
            let resultData = param.resultData
            if (resultData.score > 0) {
                let activity_id = 1020
                let config = ActivitySrv.GetActivityById(activity_id)
                if (config && config.receive_num < config.day_times) {
                    UIMgr.OpenUI("component/Activity/FirstWin/FirstWin", {
                        single: true,
                        param: { activityConfig: config },
                        closeCb: () => {
                            callback && callback()
                        }
                    })
                    return
                }
            }
        }
        callback && callback()
    }

    export function userDoubleCard(param) {
        console.log("userDoubleCard param=", param)
        let getAward = () => {
            let activity_id = 1021
            let config = ActivitySrv.GetActivityById(activity_id)
            if (config && (config.day_times == 0 || (config.day_times > 0 && config.receive_num < config.day_times))) {
                ActivitySrv.GetActivityConfig(activity_id, param.roomInfo.roomId, (res) => {
                    if (res) {
                        ActivitySrv.GetDelayReward({ activity_id: activity_id }, (res) => {
                            UIMgr.OpenUI("component/Shop/GetAwardEntry", {
                                param: { awards: res.award_item, autoOpenBox: true }, closeCb: () => {
                                    param.callback && param.callback({ ret: 2 })
                                }
                            })
                        })
                    }
                })
            } else {
                param.callback && param.callback({ ret: 1 })
            }
        }

        if (User.DoubleCard > 0) {
            getAward()
        } else {
            UIMgr.OpenUI("component/DoubleCard/DoubleCard", {
                single: true, param: {}, closeCb: () => {
                    if (User.DoubleCard > 0) {
                        getAward()
                    } else {
                        param.callback && param.callback({ ret: 1 })
                    }
                }
            })
        }
    }

    //秋季丰收礼
    export function showAutumnHarvest(param: any, closeCb: Function) {
        let todayData: { date: string, count: number } = DataMgr.getData("today_showRoundBox") || {
            date: Helper.FormatTimeString(new Date().getTime(), "yyyy-MM-dd"),
            count: 0
        }
        if ((Player.GetSelf().newbie && todayData.count == 3) || (!Player.GetSelf().newbie && todayData.count == 1)) {
            let config = ActivitySrv.GetActivityById(12)
            if (config && config.receive_num < config.day_times) {
                UIMgr.OpenUI("component/Activity/AutumnHarvest/AutumnHarvest", { single: true, param: {}, closeCb: closeCb })
                return
            }
        }
        closeCb && closeCb()
    }

    //福卡
    export function showRoundBoxFoka(param: any, closeCb: Function) {
        PlatformApi.getFokaProess((res) => {
            console.log("showRoundBox getFokaProess", res.count, res.total_count)
            if (res && res.count == res.total_count) {
                UIMgr.OpenUI("component/Activity/Foka/Foka", { single: true, param: param, closeCb: closeCb })
            } else {
                closeCb && closeCb()
            }
        })
    }

    //结算界面弹框
    export function showRoundBox(param: any) {
        console.log("showRoundBox", param)
        User.PlayGame++

        if (param.resultData && param.roomInfo && param.roomInfo.roomId) {
            if (param.roomInfo && param.roomInfo.metadata) {
                let metadata = Helper.ParseJson(param.roomInfo.metadata, "showRoundBox")
                if (metadata && metadata.gs_properties) {
                    param.gs_properties = metadata.gs_properties
                }
            }
        }

        let todayData: { date: string, count: number } = DataMgr.getData("today_showRoundBox") || {
            date: Helper.FormatTimeString(new Date().getTime(), "yyyy-MM-dd"),
            count: 0
        }
        if (todayData.date != Helper.FormatTimeString(new Date().getTime(), "yyyy-MM-dd")) {
            todayData.date = Helper.FormatTimeString(new Date().getTime(), "yyyy-MM-dd")
            todayData.count = 0
        }
        todayData.count++
        DataMgr.setData("today_showRoundBox", todayData, true)

        let _queue = [
            PlatformApi.showFirstWin,
            PlatformApi.showRecoverLosses,
            PlatformApi.showAutumnHarvest,
            PlatformApi.showRoundBoxFoka
        ]

        let index = 0
        let popQueue = () => {
            if (_queue.length > index) {
                _queue[index++](param, () => {
                    popQueue()
                })
            } else {
                param.callback && (param.callback({ isEnd: true }))
            }
        }
        popQueue()
    }

    export function showTodayPersonalBill() {
        UIMgr.OpenUI("component/PersonalBill/PersonalBillSingle", { single: true, param: {} })
    }

    export function showRoomBillDetail(param) {
        if (MatchSvr.privateRoomInfo) {
            UIMgr.OpenUI("component/PersonalBill/PersonalBillDetail", { single: true, param: { room_id: MatchSvr.privateRoomInfo.roomId } })
        }
    }

    //使用道具
    export function useItem(param: any) {
        if (param.item_id == Constants.ITEM_INDEX.MJ_CAPPED_CARD) {
            if (User.CappedCard >= param.item_num) {
                UserSrv.UpdateItemReq("client consume", [{ id: param.item_id, num: -param.item_num }], null, (res) => {
                    console.log("useItem", res)
                    if (res.err) {
                        Helper.OpenTip(res.err.detail)
                        param.callback && param.callback({ ret: 1 })
                    } else {
                        param.callback && param.callback({ ret: 2 })
                    }
                })
            } else {
                ExchangeSrv.getExchangeTemplateInfo({ typeId: 1 }, (res) => {
                    console.log("getExchangeTemplateInfo", res)
                    let exchangeData = new Array()
                    if (res && res.code == "0000") {
                        if (res.result) {
                            for (let v of res.result) {
                                if (v.output_list && v.output_list[0].item_id == param.item_id) {
                                    exchangeData.push(v)
                                }
                            }

                            exchangeData.sort((a, b) => {
                                a.output_list[0].item_num = Number(a.output_list[0].item_num)
                                b.output_list[0].item_num = Number(b.output_list[0].item_num)
                                return a.output_list[0].item_num < b.output_list[0].item_num ? -1 : 1
                            })
                        }
                    }

                    if (exchangeData[0]) {
                        let box = exchangeData[0]
                        if (User.Items[box.consume_list[0].item_id] >= box.consume_list[0].item_num) {
                            let param1 = {
                                param: {
                                    msg: "是否花费" + box.consume_list[0].item_num + box.consume_list[0].item_name + "兑换" + box.output_list[0].item_num + "张封顶卡?",
                                    cancel: () => {
                                        console.log("getExchangeTemplateInfo cancel")
                                        param.callback && param.callback({ ret: 1 })
                                    },
                                    confirm: () => {
                                        console.log("getExchangeTemplateInfo confirm")
                                        Helper.exchangeTemplateInfo(box, (success) => {
                                            PlatformApi.useItem(param)
                                        })
                                    }
                                }
                            }
                            UIMgr.OpenUI("component/Base/GamePop", param1)
                        } else {
                            Helper.OpenTip("钻石不足，无法兑换封顶卡！")
                            param.callback && param.callback({ ret: 1 })
                        }
                    }
                })
            }
        } else if (param.item_id == Constants.ITEM_INDEX.MJ_DOUBLE_CARD) {
            PlatformApi.userDoubleCard(param)
        }
    }

    export function checkWelfareCount(callback: Function) {
        let count = 0
        //转盘
        let res = ActivitySrv.GetActivityById(4)
        if (res) {
            if (res.receive_num < res.day_times) {
                count++
            }
        }

        //免费金币
        res = ActivitySrv.GetActivityById(3)
        if (res) {
            if (res.receive_num < res.day_times) {
                count++
            }
        }

        //破产补助
        res = ActivitySrv.GetActivityById(9)
        if (res && res.activity_id == 9 && res.param && res.param.broke_num && User.MainToken < res.param.broke_num) {
            if (res.receive_num < res.day_times) {
                count++
            }
        }

        //签到
        MonthSignSrv.GetConfig((config) => {
            console.log("checkSign", config)
            let allGet = true
            for (let i = 0; i < config.list.length; i++) {
                let info = config.list[i]
                if (info.day_index <= config.today_week && info.receive != 1) {
                    allGet = false
                }
            }

            if (!allGet) {
                count++
            }
            callback({ count: count })
        })
    }

    export function showReloadAssetPop(callback: Function) {
        if (cc.sys.WECHAT_GAME === cc.sys.platform) {
            let wx = window["wx"]
            wx.showModal({
                title: "温馨提示",
                content: "网络连接异常，请检查网络后重试",
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        callback && callback()
                    }
                }
            })
        } else {
            let param = {
                param: {
                    msg: "网络连接异常，请检查网络后重试",
                    hideClose: true,
                    hideCancel: true,
                    confirm: () => {
                        callback && callback()
                    }
                }
            }
            UIMgr.OpenUI("component/Base/GamePop", param)
        }
    }

    export function showPlayVideoController(param) {
        UIMgr.OpenUI("component/PersonalBill/PlayVideo", { single: true, parent: param.node, param: param })
    }

    export function checkShowVipPrivilegeUpgrade(callback?: Function) {
        let level = DataMgr.getData(Constants.DATA_DEFINE.VIP_PRIVILEGE_LEVEL) || 0
        VipPrivilegeSrv.GetPlayerVipPrivilege((vipPrivilege) => {
            if (vipPrivilege && vipPrivilege.level > level) {
                DataMgr.setData(Constants.DATA_DEFINE.VIP_PRIVILEGE_LEVEL, vipPrivilege.level, true)
                UIMgr.OpenUI("component/VipPrivilege/VipPrivilegeUpgrade", { single: true, param: {} })
                callback && callback({ ret: 1 })
            } else {
                callback && callback({ ret: 0 })
            }
        }, true)
    }

    export function getHeadVipTxkList() {
        let txkList = [
            { level: 0, imgPath: "image/head/txk_0", isNew: true },

            { level: 1, imgPath: "image/head/txk_1", isNew: true },
            { level: 2, imgPath: "image/head/txk_1", isNew: false },
            { level: 3, imgPath: "image/head/txk_1", isNew: false },

            { level: 4, imgPath: "image/head/txk_2", isNew: true },
            { level: 5, imgPath: "image/head/txk_2", isNew: false },
            { level: 6, imgPath: "image/head/txk_2", isNew: false },

            { level: 7, imgPath: "image/head/txk_3", isNew: true },
            { level: 8, imgPath: "image/head/txk_3", isNew: false },
            { level: 9, imgPath: "image/head/txk_3", isNew: false },

            { level: 10, imgPath: "image/head/txk_4", isNew: true },
            { level: 11, imgPath: "image/head/txk_4", isNew: false },
            { level: 12, imgPath: "image/head/txk_4", isNew: false },

            { level: 13, imgPath: "image/head/txk_5", isNew: true },
            { level: 14, imgPath: "image/head/txk_5", isNew: false },

            { level: 15, imgPath: "image/head/txk_6", isNew: true },
        ]
        return txkList
    }

    export function setHeadVipTxk(headNode: cc.Node, level: number) {
        let txkList = PlatformApi.getHeadVipTxkList()
        let setSpriteFrame = (bundle) => {
            if (bundle) {
                bundle.load(txkList[level].imgPath, cc.SpriteFrame, (err, res: cc.SpriteFrame) => {
                    if (res && cc.isValid(headNode)) {
                        let sprite = headNode.getComponent(cc.Sprite)
                        if (sprite) {
                            sprite.spriteFrame = res
                        }
                    }
                })
            }
        }
        if (headNode && txkList[level]) {
            let bundle = cc.assetManager.getBundle("lobbySub")
            if (bundle) {
                setSpriteFrame(bundle)
            } else {
                PlatformApi.loadBundleLobbySub((err, bundle) => {
                    setSpriteFrame(bundle)
                })
            }
        }
    }

    export function loadBundleLobbySub(callback?: Function) {
        let bundle = cc.assetManager.getBundle("lobbySub")
        if(bundle){
            callback && callback(null, bundle)
        }else{
            cc.assetManager.loadBundle("lobbyScript", (err, bundle) => {
                if (err) {
                    callback && callback(err, bundle)
                } else {
                    cc.assetManager.loadBundle("lobbySub", (err, bundle) => {
                        callback && callback(err, bundle)
                    });
                }
            });
        }
    }

    export function getFokaProess(callback) {
        MatchSvr.getStatisticsMetrics(null, (res) => {
            let activityInfo = ActivitySrv.GetActivityById(1025)
            console.log("getFokaProess", activityInfo)
            if (activityInfo) {
                let count = 0
                let totalCount = 0
                if (activityInfo.total_receive_num == 0) {
                    count = res.total_count > 1 ? 1 : res.total_count
                    totalCount = 1
                } else {
                    let lastAwardAt = 0
                    if (activityInfo.player_data) {
                        try {
                            let obj = Helper.ParseJson(activityInfo.player_data, "foka")
                            lastAwardAt = obj.award_at
                        } catch { }
                    }
                    count = res.total_count - lastAwardAt
                    count = count > activityInfo.param.interval ? activityInfo.param.interval : count
                    totalCount = activityInfo.param.interval
                }
                count = count > totalCount ? totalCount : count
                count = count < 0 ? 0 : count
                callback && callback({ total_count: totalCount, count: count })
            } else {
                callback && callback(null)
            }
        })
    }

    export function showFoka(callback) {
        UIMgr.OpenUI("component/Activity/Foka/Foka", {
            single: true, param: {}, closeCb: () => {
                callback && callback()
            }
        })
    }
}

cc.game.on(cc.game.EVENT_SHOW, () => {
    console.log("==foreground==")
    PlatformApi.isForeground = true
    setTimeout(() => {
        if(!cc.audioEngine.isMusicPlaying()){
            Util.PlayBackgroundMusic()
        }
    }, 1000);
    cc.audioEngine.resumeMusic()
    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.FOREGROUND)

    Helper.reportEvent("游戏操作", "切换至前台")
    PluginMgr.setHidePlugAds(false)

    if (cc.sys.WECHAT_GAME === cc.sys.platform && cc.sys.os == cc.sys.OS_IOS) {
        UserSrv.UpdateItem()
    }
});

cc.game.on(cc.game.EVENT_HIDE, () => {
    console.log("==background==")
    PlatformApi.isForeground = false
    cc.audioEngine.pauseMusic()
    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.BACKGROUND)

    if (!PluginMgr.checkPlugAd()) {
        EventMgr.off(Constants.EVENT_DEFINE.FOREGROUND, PLATFORM_API)
        EventMgr.once(Constants.EVENT_DEFINE.FOREGROUND, () => {
            PluginMgr.showPluginAd()
        }, PLATFORM_API)
    }

    Helper.reportEvent("游戏操作", "切换至后台")
});

EventMgr.on(Constants.EVENT_DEFINE.RECORD_POINT, (res) => {
    if (res) {
        Helper.reportEvent(res.moduleName, res.action, res.label)
    }
})

let consoleError = window.console.error
window.console.error = (...args: any[]) => {
    // console.log("=======>", JSON.stringify(args));
    consoleError && consoleError.apply(window, args);
    Helper.reportEvent(JSON.stringify(args))
}