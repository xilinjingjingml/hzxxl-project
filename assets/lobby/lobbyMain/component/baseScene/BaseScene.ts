/*
 * @Description: 主界面
 * @Version: 1.0
 * @Autor: sonke
 * @Date: 20210330 1528
 * @LastEditors: sonke
 * @LastEditTime: 20210330 1529
 */

import { igs } from "../../../../igs";
import { Match } from "../../../start/script/api/matchApi";
import { PlatformApi } from "../../../start/script/api/platformApi";
import { Util } from "../../../start/script/api/utilApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { WxProxyWrapper } from "../../../start/script/pulgin/WxProxyWrapper";
import { ActivitySrv, MonthSignSrv, RolledCoinsSrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { LeagueSvr } from "../../../start/script/system/LeagueSvr";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { NoticeSrv } from "../../../start/script/system/NoticeSrv";
import { QualifyingSrv } from "../../../start/script/system/QualifyingSrv";
import { UserSrv } from "../../../start/script/system/UserSrv";



const { ccclass, property } = cc._decorator;

// const RESULT_CHECK = "resultCheck"

@ccclass
export default class BaseScene extends BaseUI {

    _queue = [
        this.checkActivity11.bind(this),
        // this.checkRealTimeMatchReback.bind(this),
        // this.checkNewbiw.bind(this),
        this.checkFirstBox.bind(this),
        // this.checkSalesBox.bind(this),
        this.checkSign.bind(this),
        // this.checkRolledCoins.bind(this),
        // this.checkSylder.bind(this),
        // this.checkLeague.bind(this),
        // this.checkOfflineResult.bind(this),
        // this.checkGradeUpdate.bind(this),
        this.checkNotice.bind(this),
        this.checkVipPrivilege.bind(this)
    ]

    //新用户弹窗顺序
    _queue2 = [
        this.checkActivity11.bind(this),
        this.checkFreeBox.bind(this),
        this.checkSign.bind(this),
        this.checkFirstBox.bind(this),
    ]

    _idx = 0;

    loadPrefabQueue = new Array()

    protected onLoad(): void {
        if (Helper.IsDDZGame()) {
            this._queue = [
                this.checkOldPlayerRetrunGift.bind(this),
                this.checkFirstBox222.bind(this),
                this.checkSalesBox.bind(this),
                this.checkSign.bind(this),
                this.checkNotice.bind(this),
            ]

            //新用户弹窗顺序
            this._queue2 = [
                this.checkOldPlayerRetrunGift.bind(this),
                this.checkFirstBox222.bind(this),
                this.checkFreeBox.bind(this),
                this.checkSign.bind(this),
            ]
        } else {
            this._queue = [
                this.checkActivity11.bind(this),
                this.checkFirstBox.bind(this),
                this.checkSign.bind(this),
                this.checkNotice.bind(this),                
                this.checkVipPrivilege.bind(this)
            ]

            //新用户弹窗顺序
            this._queue2 = [
                this.checkActivity11.bind(this),
                this.checkFreeBox.bind(this),
                this.checkSign.bind(this),
                this.checkFirstBox.bind(this),
            ]
        }
    }


    loadQueue() {
        console.log("BaseScene loadQueue")
        igs.blockUI((node: cc.Node) => {
            node.getComponent("BlockUI").setParam({ type: 1 })
        })
        let count = 0
        for (let config of this.loadPrefabQueue) {
            let bundle = cc.assetManager.getBundle("lobbyMain")
            if(bundle){
                bundle.load(config.path, (err, prefab: cc.Prefab) => {
                    if (err) {
                        console.error("load lobby config.path", config.path, "err", err.message)
                    } else if (cc.isValid(this.node)) {
                        let node = cc.instantiate(prefab)
                        if (node) {
                            node.parent = config.parent
                            node.zIndex = config.zIndex

                            let ui = node.getComponent(BaseUI)
                            ui.setParam(config)
                        }
                    }

                    if (cc.isValid(this.node)) {
                        count++
                        if (count == this.loadPrefabQueue.length) {
                            igs.unBlockUI()
                        }
                    }
                })
            }else{
                console.log("bundle lobbyMain not find")
            }
        }
    }

    start() {
        Helper.reportEvent("进入大厅")
        console.log("loadBundle lobbySub")
        PlatformApi.loadBundleLobbySub((err, bundle)=>{
            if(err){                        
                console.error("load bundle lobbySub err", err)
            }else{
                DataMgr.data.Bundle = bundle
                if(cc.isValid(this.node)){
                    this.initData()
                }
            }
        });
        let bundle = cc.assetManager.getBundle("lobbyMain")
        bundle.load("component/baseScene/sounds/bgm_game", cc.AudioClip, (err, asset) => {
            if (err) {
                cc.error("Background Music is null! Path is " + "component/baseScene/sounds/bgm_game")
                return
            }
            if (asset instanceof cc.AudioClip) {
                Util.SetBackgroundMusic(asset)
                Util.PlayBackgroundMusic()
            }
        })

        this.initEvent()

        this.loadPrefabQueue.push({ path: "component/baseScene/BaseSceneJuese", parent: this.node, zIndex: 0 })
        this.loadPrefabQueue.push({ path: "component/baseScene/BaseSceneTop", parent: this.node, zIndex: 1 })
        this.loadPrefabQueue.push({ path: "component/baseScene/BaseSceneBottom", parent: this.node, zIndex: 1 })
        this.loadPrefabQueue.push({ path: "component/baseScene/BaseSceneLeft", parent: this.node, zIndex: 1 })
        // this.loadPrefabQueue.push({path: "component/baseScene/BaseSceneCenter", parent: this.node, zIndex:2})
        if (DataMgr.data.Config.gameId === "09965902-5d1e-4632-ac38-8d4551dc1142" || DataMgr.data.Config.gameId === "09965902-5d1e-4632-ac38-8d4551dc1143") {    // 麻将
            this.loadPrefabQueue.push({ path: "component/baseScene/BaseSceneCenterMJ", parent: this.node, zIndex: 2, param: { gameLabel: Constants.GAME_TYPE_LABLE.MAJIONG_HZXL } })
        } else if (DataMgr.data.Config.gameId === "940fb465-9726-4a01-9aae-270f388ff85a") { // 斗地主
            this.loadPrefabQueue.push({ path: "component/baseScene/BaseSceneCenterDDZ", parent: this.node, zIndex: 2, param: { gameLabel: Constants.GAME_TYPE_LABLE.DDZ_SANREN } })
        } else {    // 棋牌圈
            this.loadPrefabQueue.push({ path: "component/baseScene/BaseSceneCenterCircle", parent: this.node, zIndex: 2 })
        }
        this.loadQueue()                 

        try {
            igs.odc.updateScore2("invite-friend", {
                score: 1,
                wxopenid: ""
            })
        } catch (error) {

        }
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.CHANGE_GAME_ID, this.onChangeGame, this)
        EventMgr.on(Constants.EVENT_DEFINE.FIRST_OPEN_QUEUE, this.checkQueue, this)

        EventMgr.on(Constants.EVENT_DEFINE.SHOW_BASE_SCENE_LOADING, this.showLoading, this)
        EventMgr.on(Constants.EVENT_DEFINE.HIDE_BASE_SCENE_LOADING, this.hideLoading, this)

        EventMgr.on(Constants.EVENT_DEFINE.PLUGIN_ON_SHOW, (res) => {
            if (res && res.query && res.query.shareMessageToFriendScene) {//开放域分享
                let text = String(res.query.shareMessageToFriendScene)
                let code = text.split(".")
                res.query.inviteCode = code[1].padEnd(6, "0")
            }
            if (res && res.query && res.query.inviteCode) { // 进入房间
                MatchSvr.getRoomInfo({ share_code: res.query.inviteCode }, (res) => {
                    if (res.room) {
                        PlatformApi.joinPrivateGame(res.room)
                    }
                })
            }
        }, this)
    }

    initData() {
        UserSrv.GetPromotion()
        MatchSvr.GetPlayerProfile()
        // this.checkQueue()
        let self = this
        this.checkRealTimeMatchReback((next) => {
            if (false === next) return
            //只有第一次打开才弹
            let opened = DataMgr.getData<boolean>("firstOpen")
            if (!opened) {
                ActivitySrv.init(() => {
                    self.checkQueue()
                })
                DataMgr.setData("firstOpen", true)
            } else {
                let hidePop = DataMgr.getData(Constants.DATA_DEFINE.HIDE_BROKE_POP)
                if (hidePop) {
                    DataMgr.setData(Constants.DATA_DEFINE.HIDE_BROKE_POP, false)
                } else {
                    let info = ActivitySrv.GetActivityById(9)
                    console.log("BaseScene initData", info)
                    if (User.MainToken == 0 && info && info.receive_num < info.day_times) {
                        Helper.showBroke({ activityConfig: info }, () => {
                            if (User.MainToken > 0) {
                                Helper.quickGame()
                            }
                        })
                    } else if (User.MainToken < 1000000) {//小于等于100万,弹出免费金币
                        this.checkFreeBox(false)
                    }
                }
            }
        })

        cc.tween(this.getNode("loading/loading")).repeatForever(cc.tween().to(1.5, { angle: -180 }).to(1.5, { angle: -360 }).set({ angle: 0 })).start()
        this.setActive("loading", false)

        cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
            DataMgr.setData(Constants.DATA_DEFINE.BASE_CONTENT_HEIGHT, this.getNode("center/main").height)
        })

        UserSrv.UpdateItem()
        // QualifyingSrv.GetQualifyingConfig()
    }

    onChangeGame(msg) {
        console.log("====onChangeGame == " + JSON.stringify(msg))
        if (!msg) {
            return
        }

        let gameId = msg.gameId
        if (!gameId) {
            return
        }

        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.SHOW_BASE_SCENE_LOADING)

        EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.CHANGE_MAIN_TAB, { name: "match" })
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.HIDE_BASE_SCENE_LOADING)
            Match.SetCurGame(gameId)
            DataMgr.setData(Constants.DATA_DEFINE.GAME_BUNDLE, msg.bundle, true)
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.UPDATE_MATCH_LIST)
        }, this)
        DataMgr.data.Config.gameId = gameId
        DataMgr.setData<string>(Constants.DATA_DEFINE.LAST_GAME_ID, gameId, true)
        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ACCOUNT_LOGIN, { relogin: true })
    }

    checkQueue() {
        if (cc.isValid(this.node)) {
            let newuser = DataMgr.getData<boolean>("newuser")
            if (newuser) {
                this._queue = this._queue2
            }
            if (this._queue.length > this._idx) {
                this._queue[this._idx++]()
            }
        }
    }

    //检查客服回话消息奖励（如果从客服消息进入游戏也要做奖励发放检查）
    checkActivity11() {
        let id = WxProxyWrapper.getLaunchOptionsSync()
        if (id == 1073) {
            let config = ActivitySrv.GetActivityById(11)
            if (config && config.receive_num < config.day_times) {
                ActivitySrv.OnClickActivity(config, () => {
                    this.checkQueue()
                })
            } else {
                this.checkQueue()
            }
        } else {
            this.checkQueue()
        }
    }

    checkFreeBox(next: boolean = true) {
        let activityInfo = ActivitySrv.GetActivityById(3)
        if (activityInfo && activityInfo.day_times - activityInfo.receive_num > 0) {
            UIMgr.OpenUI("component/Activity/FreeGold/FreeGold", { single: true, param: { checkQueue: next } }, (scene) => {
                if (scene instanceof cc.Node) {
                    scene.zIndex = 1
                }
            })
            return
        }

        if (next) {
            this.checkQueue()
        }
    }

    checkSalesBox() {
        if (Helper.isAudit() == false) {
            let boxList: IShopInfo[] = []
            let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            for (let k in boxs[Constants.SHOP_TYPE.PREFERENCE]) {
                if (boxs[Constants.SHOP_TYPE.PREFERENCE][k].param && boxs[Constants.SHOP_TYPE.PREFERENCE][k].param.show_in_discount == 1) {
                    boxList.push(boxs[Constants.SHOP_TYPE.PREFERENCE][k])
                }
            }

            let curBox = null
            console.log("boxList", boxList)
            for (let i = 0; i < boxList.length; i++) {
                let box = boxList[i]
                if (!box.isBuy) {
                    UIMgr.OpenUI("component/Activity/discount/DiscountBox", {
                        single: true, param: { checkQueue: true }, closeCb: (scene) => {
                            if (scene instanceof cc.Node) {
                                scene.zIndex = 1
                            }
                        }
                    })
                    return
                }
            }
        }
        this.checkQueue()
    }

    //送的和首胜礼包一样
    checkOldPlayerRetrunGift() {
        if (User.PlayGame == 0) {
            this.checkQueue()
            return
        }
        let activity_id = 1020
        let config = ActivitySrv.GetActivityById(activity_id)
        cc.log("老玩家回归礼包=========>", config);
        if (config && config.receive_num < config.day_times) {
            UIMgr.OpenUI("component/Activity/FirstWin2/FirstWin2", {
                index: 2, single: true, param: { activityConfig: config, OldPlayer: true, checkQueue: true }, closeCb: () => {
                }
            })
            return;
        }
        this.checkQueue()
    }

    checkFirstBox() {
        let boxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if (Helper.isAudit() == false) {
            if (boxes && boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
                for (let idx in boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
                    if (!boxes[Constants.SHOP_TYPE.FIRST_PAY][idx].isBuy) {
                        UIMgr.OpenUI("component/Activity/FirstBox", { single: true, param: { checkQueue: true } }, (scene) => {
                            if (scene instanceof cc.Node) {
                                scene.zIndex = 1
                            }
                        })
                        return
                    }
                }
            }
        }
        this.checkQueue()
    }

    checkFirstBox222(next: boolean = true) {

        var myDate = new Date();
        let strToday = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()

        let strLastCheckDay = cc.sys.localStorage.getItem("LAST_CHECK_FIRST_GIFT");

        cc.sys.localStorage.setItem("LAST_CHECK_FIRST_GIFT", strToday)

        if (strLastCheckDay && strLastCheckDay == strToday) {
            this.checkQueue();
            return;
        }


        let boxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if (!Helper.isAudit()) {
            if (boxes && boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
                for (let idx in boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
                    let firstBox = boxes[Constants.SHOP_TYPE.FIRST_PAY][idx]
                    if (firstBox.name == "大厅首充礼包" && !firstBox.isBuy) {
                        UIMgr.OpenUI("component/FirstChargeBox/FirstChargeBox", {
                            index: 10, param: {
                                shopBoxInfo: firstBox,
                                checkQueue: next,
                                isInLobby: true,
                            }
                        })
                        return
                    }
                }
            }
        }
        this.checkQueue()
    }

    checkNewbiw() {
        let info = ActivitySrv.GetActivityById(1002)
        let node = this.getNode("center/main/view/content/MatchScene/logo/btnNewbie")
        if (info) {
            UIMgr.OpenUI("component/Activity/NewbieAward", { single: true, param: { activityInfo: info, checkQueue: true, btn: node } })
            return
        }

        this.checkSign()
    }

    checkSign() {
        let self = this
        let node = this.getNode("center/main/view/content/MatchScene/logo/btnSign")
        let res = ActivitySrv.GetActivityById(8)
        if (res) {
            MonthSignSrv.GetConfig((config) => {
                console.log("checkSign", config)
                for (let i = 0; i < config.list.length; i++) {
                    let info = config.list[i]
                    if (info.day_index == config.today_week && info.receive != 1) {
                        UIMgr.OpenUI("component/Activity/Sign/Sign", { single: true, param: { signConfig: config, activityConfig: res, checkQueue: true } }, (scene) => {
                            if (scene instanceof cc.Node) {
                                scene.zIndex = 1
                            }
                        })
                        return
                    }
                }
                this.checkQueue()
            })
        } else {
            this.checkQueue()
        }
    }

    checkRolledCoins() {
        if (Helper.isAudit() == false) {
            RolledCoinsSrv.GetConfig(true, (res) => {
                if (res.day_times - res.receive_num) {
                    UIMgr.OpenUI("component/Activity/RolledCoins/RolledCoins", { single: true, param: {} })
                    return
                }

                this.checkQueue()
            })
        } else {
            this.checkQueue()
        }
    }

    checkSylder() {
        let info = ActivitySrv.GetActivityById(4)
        if (info) {
            info.receive_time = info.receive_time || 1
            info.receive_num = info.receive_num || 0
            if (info.day_times && info.receive_num < info.day_times) {
                if (info.receive_time && Date.now() / 1000 - info.receive_time >= info.interval_time * 60) {
                    UIMgr.OpenUI("component/Activity/SlyderAdventures", { single: true, param: { dataInfo: info, checkQueue: true } })
                    return
                }
            }
        }

        this.checkQueue()
    }

    checkLeague() {
        let self = this
        LeagueSvr.GetCurLeague(Constants.LEAGUE_TYPE.PRACTICE_LEAGUE, (res) => {
            if (res && res.league_id) {
                LeagueSvr.GetLeagueAwardConfig(Constants.LEAGUE_TYPE.PRACTICE_LEAGUE, res.league_id, () => {
                    let data = DataMgr.getData<any>(Constants.DATA_DEFINE.LEAGUE_RESULT)
                    if (data) {
                        let param = {
                            confirmName: "分享",
                            cancelName: "知道了",
                            confirmIcon: "image/button/common-lvanniou",
                            confirm: () => { Helper.shareInfo() },
                            type: Constants.LEAGUE_TYPE.PRACTICE_LEAGUE,
                        }
                        Helper.OpenPopUI("component/League/LeagueSettlement", "联赛结算", param)
                        return
                    }

                    self.checkQueue()
                })
                return
            }
            self.checkQueue()
        })
    }

    // checkOfflineResult() {
    //     let self = this
    //     MatchSvr.GeCompletedList(() => {
    //         let data = DataMgr.getData<TResults>(Constants.DATA_DEFINE.MATCH_COMPLETED)
    //         if (data) {
    //             let results: TResults = data.filter(item => item.playerState === Constants.PLAYER_MATCH_STATE.PLAYER_MATCH_STATE_AWARD)
    //             if (results.length > 0) {
    //                 UIMgr.OpenUI("component/Match/MatchOfflineEntry", {single: true, param: results })
    //                 return
    //             }
    //         }

    //         self.checkQueue()
    //     })
    // }

    checkGradeUpdate() {
        let self = this
        QualifyingSrv.GetCurSeason((res) => {
            //上一赛赛季结算信息
            if (res.last_settle) {
                UIMgr.OpenUI("component/League/QualifyingLevel", { single: true, param: { type: 1, data: res } })
                return
            } else {
                let curSeason: any = DataMgr.getData(Constants.DATA_DEFINE.QUALIFYING_CUR_SEASON)
                if (curSeason) {
                    if (res.grade.level > curSeason.grade.level) {
                        QualifyingSrv.GetListRewardStatus((status_list) => {
                            for (let v of status_list) {
                                if (v.major == res.grade.major && v.minor == res.grade.minor && v.status != 2) {   //status = 0条件不满足 1未领取 2已领取
                                    UIMgr.OpenUI("component/League/QualifyingLevel", { single: true, param: { type: 2, data: { grade: curSeason.grade, finalGrade: res.grade } } })
                                    DataMgr.setData(Constants.DATA_DEFINE.QUALIFYING_CUR_SEASON, res, true)
                                    return
                                }
                            }
                        })
                    }
                }
            }
            DataMgr.setData(Constants.DATA_DEFINE.QUALIFYING_CUR_SEASON, res, true)
            self.checkQueue()
        })
    }

    checkVipPrivilege(){
        PlatformApi.checkShowVipPrivilegeUpgrade((res)=>{
            console.log("checkVipPrivilege", res)
            if(res.ret == 0){
                this.checkQueue()
            }
        })
    }

    checkNotice(checkNext: boolean = true) {
        let self = this
        let param = {
            plat_aid: DataMgr.data.Config.platId,
            game_gid: DataMgr.data.Config.gameId,
            pn: DataMgr.data.Config.pn,
            ns: "igaoshou",
        }
        NoticeSrv.getNotice(param, (res) => {
            if (res && res.code == "00000" && res.notice) {
                for (let v of res.notice) {
                    let openPop = false
                    let readTime: number = DataMgr.getData(Constants.DATA_DEFINE.NOTICE_READ_DATA + v._id)
                    let readDay = readTime && new Date(readTime).getDate() || -1
                    let today = new Date().getDate()
                    let now = new Date().getTime() / 1000
                    if (now > v.begin_time && now < v.end_time && readDay != today) {
                        if (v.skip == "1" || v.skip == "5") {
                            if (cc.sys.WECHAT_GAME === cc.sys.platform) {
                                openPop = true
                            }
                        } else if (v.skip == "6" && DataMgr.data.OnlineParam.promote_system == 1) {
                            openPop = true
                        } else {
                            openPop = true
                        }
                        if (openPop) {
                            UIMgr.OpenUI("component/Notice/Notice", { single: true, param: v })
                            return
                        }
                    }
                }
            }

            if (checkNext) {
                self.checkQueue()
            }
        })
    }

    checkRealTimeMatchReback(callback?: Function) {
        console.log("checkRealTimeMatchReback")
        let hasCheck = DataMgr.getData(Constants.DATA_DEFINE.CHECK_REAL_TIME_MACTH)
        if (hasCheck) {
            callback(true)
        } else {
            DataMgr.setData(Constants.DATA_DEFINE.CHECK_REAL_TIME_MACTH, true)
            MatchSvr.checkRealTimeMatch(callback)
        }
    }

    showLoading() {
        this.setActive("loading", true)
    }

    hideLoading() {
        this.setActive("loading", false)
    }
}
