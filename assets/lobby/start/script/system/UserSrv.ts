import { Helper } from "./Helper"
import { Constants } from "../igsConstants"
import { DataMgr } from "../base/DataMgr"
import { MatchSvr } from "./MatchSvr"
import { ShopSvr } from "./ShopSvr"
import { HttpMgr } from "../base/HttpMgr"
import { EventMgr } from "../base/EventMgr"
import { UIMgr } from "../base/UIMgr"
import { User } from "../data/User"
import { PushSvr } from "./PushSvr"
import { PlatformApi } from "../api/platformApi"

const GET_CONFIG_URI = "igaoshou-lobby-srv/lobby/getConfig"
const GET_PLY_DETAIL = "igaoshou-lobby-srv/lobby/getPlyDetail"
const GET_ITEM = "igaoshou-lobby-srv/lobby/getItem"
const GET_PLY_GAME_LIST = "igaoshou-lobby-srv/lobby/getPlyGameList"
const COIN2TICKET = "igaoshou-lobby-srv/lobby/Coin2Ticket"

const GET_GAME_INFO = "api/mcbeam-version-api/config/loadGameInfo"
const GET_ONLINE_NUM = "igaoshou-lobby-srv/lobby/getOnlineNum"

const GET_USER_INFO = "mcbeam-authen-srv/user/GetUserInfo"

const GET_GAME_REPORT = "api/igaoshou-game-center/center/getGameReport"

const UPDATE_ITEM = "igaoshou-lobby-srv/lobby/updateItem"

const GET_ONLINE_STATUS = "igaoshou-lobby-srv/lobby/getOnlineStatus"

let _gameInfo: { [index: string]: string } = {}

const USER_SRV = "user_srv"

export namespace UserSrv {
    export function LoadConfig(callback?: Function, retry: number = 0) {
        Helper.PostHttp(GET_CONFIG_URI, null, null, (res) => {
            cc.log(res)
            if (res) {
                // initItems(res.config)
                MatchSvr.initMatch(res.config.match_detail)
                // ShopSvr.initShop(res.config)
            } else if (retry < 3) {
                Helper.DelayFun(() => LoadConfig(callback, ++retry), .5 * retry)
                return
            } else {
                let param = {
                    msg: "获取配置信息失败\n" + (res.err ?? ""),
                    confirmName: "退出",
                    cancelName: "重试",
                    cancel: () => LoadConfig(callback, 0),
                    confirm: () => { cc.game.end() },
                }
                // Helper.OpenPopUI("component/Base/MsgEntry", "登录失败", param)
                UIMgr.OpenUI(cc.assetManager.getBundle("lobbyMain"), "component/loginTip/LoginTip", { param: param })
                return
            }
            callback && callback()
        })
    }

    export function GetPlyDetail(openid?: string | Function, callback?: Function, gameid?: string) {
        if (!callback && typeof openid === "function") {
            callback = openid
            openid = null
        }

        let token = DataMgr.getData<IAccount>(Helper.GetTokenDataKey()) || {}
        if (!openid) {
            openid = token.openid
        }

        if (token.token !== openid) {
            let players = DataMgr.getData<TPlayers>(Constants.DATA_DEFINE.PLAYERS_INFO)
            if (players && players[openid as string]) {
                callback && callback(players[openid as string])
                return
            }
        }

        let id = openid as string
        let gid = gameid as string
        let param = {
            openid: id,
            game_gid: gid
        }
        Helper.PostHttp(GET_PLY_DETAIL, null, param, (res) => {
            console.log("GET_PLY_DETAIL", res)
            if (DataMgr.data.Config.env != 2 && res && res.area_info) {
                let area_arr = res.area_info.split("|")
                res.area_info = area_arr[2] || area_arr[0]
                res.area_info = res.area_info.length > 0 ? res.area_info : "中国"
            }
            if (token.openid !== id) {
                if (res) {
                    let players = DataMgr.getData<TPlayers>(Constants.DATA_DEFINE.PLAYERS_INFO) || {}
                    let ply: IPlayerBase = players[id] || { userName: "未知用户", openId: id, avatar: "", region: "" }
                    ply.userName = res.nickname || ply.userName
                    ply.avatar = res.headimage || ply.avatar
                    ply.region = res.area_info || ""
                    ply.props = []
                    if (res.props) {
                        for (let v1 of res.props) {
                            ply.props.push({id:v1.id, num:v1.num, expireAt:v1.expire_at})
                        }
                    }
                    players[id] = ply
                    DataMgr.setData(Constants.DATA_DEFINE.PLAYERS_INFO, players)
                    callback && callback(ply)
                }
            } else {
                User.Avatar = res.headimage
                User.Region = res.area_info
                callback && callback(User.Data)
            }
        })
    }

    export function UpdateItem(callback?: Function) {
        Helper.PostHttp(GET_ITEM, null, null, (res) => {
            if (!res || !res.item_list) {
                return
            }
            let haveMember = false
            console.log("jin---UpdateItem item_list: ", res.item_list)
            for (let i in res.item_list) {
                let id = res.item_list[i].id || 0
                res.item_list[i].num = res.item_list[i].num || 0
                if(res.item_list[i].num){
                    res.item_list[i].num = Number(res.item_list[i].num)
                }
                if (id === Constants.ITEM_INDEX.LOTTERY) {
                    User.Lottery = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.DIAMOND) {
                    User.Diamond = Number(res.item_list[i].num)
                } /*else if (id === Constants.ITEM_INDEX.MemberCard) {
                    haveMember = true;
                    if (Helper.isMember(res.item_list[i])) {
                        // 会员道具未过期
                        DataMgr.setData(User.OpenID + Constants.DATA_DEFINE.IS_MEMBER, true)
                    } else {
                        // 会员过期
                        DataMgr.setData(User.OpenID + Constants.DATA_DEFINE.IS_MEMBER, false)
                    }
                }*/ else if (id === Constants.ITEM_INDEX.PROM_REDPACKET) {
                    User.PromRedPacket = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.GAME_DIAMOND) {
                    User.GameDiamond = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.GAME_GOLD) {
                    User.Gold = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.GAME_BEAN) {
                    User.GameBean = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.ROTARY_TABLE_COIN) {
                    User.RotaryTableCoin = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.MJ_DOUBLE_CARD) {
                    User.DoubleCard = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.MJ_CAPPED_CARD) {
                    User.CappedCard = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.FuCard) {
                    User.FuCard = Number(res.item_list[i].num)
                } else if (id === Constants.ITEM_INDEX.QpVipExp) {
                    let check = false
                    if(User.QpVipExp != Number(res.item_list[i].num)){
                        check = true
                    }
                    User.QpVipExp = Number(res.item_list[i].num)
                    check && PlatformApi.checkShowVipPrivilegeUpgrade()
                } else{
                    let numCount = 0;
                    if(res.item_list[i].num){
                        numCount = res.item_list[i].num
                    }
                    User.Data.items[id] = { id: id, num: numCount, expireAt: res.item_list[i].expire_at };
                }
            }
            if (!haveMember) {
                // 未充值过会员道具
                DataMgr.setData(User.OpenID + Constants.DATA_DEFINE.IS_MEMBER, false)
            }

            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.UPDATE_USER_ITEM)
            //
            MatchSvr.UpdateMatch()
            callback && callback()
        })
    }

    export function CheckItem(items: IItemInfo[]): boolean {
        for (let i of items) {
            if (i.id === Constants.ITEM_INDEX.LOTTERY && User.Lottery < i.num) {
                return false
            } else if (i.id === Constants.ITEM_INDEX.DIAMOND && User.Diamond < i.num) {
                return false
            }
        }

        return true
    }

    export function GetPlayerGameList(openid: string = null) {
        let param = {}
        if (openid) {
            param["openid"] = openid
        }
        Helper.PostHttp(GET_PLY_GAME_LIST, null, param, (res) => {
            cc.log(res)
            res = res || {}
            let levels = []
            levels["igaoshou"] = {
                type: "igaoshou",
                name: "平台等级",
                icon: "",
                lv: res.plat_level || 0,
                exp: res.plat_exp || 0,
                maxExp: res.max_plat_exp || 0,
            }
            for (let i in res.list) {
                let l = res.list[i]
                levels[l.game_id] = {
                    type: l.game_id,
                    name: "",
                    icon: "",
                    lv: l.level || 0,
                    exp: l.exp || 0,
                    maxExp: l.max_exp || 0,
                }
            }
            User.Levels = levels
        })
    }

    export function GetGameInfo(gameId: string, callback: Function = null) {
        if (_gameInfo && _gameInfo[gameId]) {
            callback && callback(_gameInfo[gameId])
            return
        }
        let param = {
            game_gid: gameId,
            is_lobby: 1,
        }
        Helper.PostHttp(GET_GAME_INFO, null, param, (res) => {
            cc.log(res)
            _gameInfo = _gameInfo || {}
            _gameInfo[gameId] = res
            callback && callback(res)
        })
    }

    export function GetShareInfo(callback: Function = null) {
        let param = {
            game_gid: DataMgr.data.Config.gameId,
            is_lobby: 1,
        }
        Helper.PostHttp(GET_GAME_INFO, null, param, (res) => {
            console.log("GET_GAME_INFO", res)
            _gameInfo = _gameInfo || {}
            _gameInfo[DataMgr.data.Config.gameId] = res
            try { res.share_info = JSON.parse(res.share_info) } catch { }
            DataMgr.setData(Constants.DATA_DEFINE.SHARE_INFO, res.share_info)
            callback && callback(res)
        })
    }

    export function GetPromotion(callback?: Function) {
        let param = {
            game_gid: DataMgr.data.Config.gameId,
            is_lobby: 0,
        }
        let host = DataMgr.data.Config.hostname
        host = host.replace("igaoshou.", "mcbeam.")
        HttpMgr.post("https://" + host + "/" + GET_GAME_INFO, null, null, param, (res) => {
            cc.log("GetPromotionGetPromotion==>", res)
            if (res && res.promotion_info) {
                res.promotion_info = Helper.ParseJson(res.promotion_info, "getPromotion")
                if (res.promotion_info && res.promotion_info.sort) {
                    res.promotion_info.sort((a, b) => {
                        return a.sort_id < b.sort_id ? -1 : 1
                    })
                    DataMgr.setData(Constants.DATA_DEFINE.OTHER_GAME_PROMOTION, res.promotion_info)
                }
                callback?.(res.promotion_info)
            }
        })
    }

    export function initItems() {
        // if (!data || !data.items) {
        //     return
        // }

        // let cfg = JSON.parse(data.items)
        // if (!cfg) {
        //     return
        // }

        let cfg = [
            { "id": 0, "name": "银币", "desc": "银币", "icon": "https://icon.mcbeam.cc/coinv.png" },
            { "id": 1, "name": "奖券", "desc": "奖券", "icon": "https://icon.mcbeam.cc/ticket.png" },
            { "id": 2, "name": "金币", "desc": "金币", "icon": "https://icon.mcbeam.cc/diamon.png" },
            { "id": 8, "name": "钻石", "desc": "麻将钻石", "icon": "https://icon.mcbeam.cc/diamon.png" },
            { "id": 7, "name": "转盘币", "desc": "转盘币", "icon": "https://icon.mcbeam.cc/diamon.png" },
            { "id": 10000, "name": "经验值", "desc": "经验值", "icon": "https://icon.mcbeam.cc/exp.png" },
            { "id": 10001, "name": "专业赛奖章", "desc": "专业赛奖章", "icon": "https://icon.mcbeam.cc/golden_medal.png" },
            { "id": 10002, "name": "练习赛奖章", "desc": "练习赛奖章", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10005, "name": "金币", "desc": "麻将金币", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10006, "name": "金豆", "desc": "麻将金豆", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10014, "name": "双倍卡", "desc": "麻将双倍卡", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10015, "name": "封顶卡", "desc": "麻将封顶卡", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10009, "name": "金豆", "desc": "斗地主金豆", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10017, "name": "加倍卡", "desc": "斗地主超级加倍卡", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10018, "name": "记牌器", "desc": "斗地主记牌器", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10019, "name": "免输卡", "desc": "免输卡", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
            { "id": 10021, "name": "话费", "desc": "话费", "icon": "https://icon.mcbeam.cc/silver_medal.png" },
        ]

        let IItemConfigs: { [index: number]: IItemConfig } = {}
        for (let idx in cfg) {
            let item = cfg[idx]
            let id = item.id || 0
            IItemConfigs[id] = {
                id: id,
                name: item.name,
                desc: item.desc,
                pic: item.icon,
            }
        }
        cc.log(IItemConfigs)

        DataMgr.setData(Constants.DATA_DEFINE.ITEM_CONFIG, IItemConfigs, true)
    }

    export function GetItemInfo(id: number): IItemConfig {
        let config = DataMgr.getData<{ [index: number]: IItemConfig }>(Constants.DATA_DEFINE.ITEM_CONFIG)
        return config ? config[id] : null
    }

    export function Coin2Ticket(callback?: Function) {
        Helper.PostHttp(COIN2TICKET, null, null, (res) => {
            console.log("COIN2TICKET", res)
            callback && callback(res)
        })
    }

    export function GetOnlineNum(games: string[], callback?: Function) {
        let strGame = ""
        for (let v of games) {
            strGame += v + "|"
        }
        strGame = strGame.substr(0, strGame.length - 1)
        let param = {
            game_list: strGame
        }
        Helper.PostHttp(GET_ONLINE_NUM, null, param, (res) => {
            callback && callback(res)
        })
    }

    export function GetUserInfo() {
        Helper.PostHttp(GET_USER_INFO, null, {}, (res) => {
            console.log("GET_USER_INFO", res)
            if (res && res.code == "0000") {
                console.log("GET_USER_INFO_SUCC", res)
                if (res.wx_openid) {
                    // this.wx_openid = res.wx_openid
                    User.WxOpenId = res.wx_openid
                }

                if (res.address) {
                    DataMgr.setData(Constants.DATA_DEFINE.ADDRESS_DATA, JSON.parse(res.address))
                } else {
                    DataMgr.setData(Constants.DATA_DEFINE.ADDRESS_DATA, null)
                }
                EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ADDRESS_LIST_UPDATE)
            }
        })
    }

    export function getGameReport(param, callback: Function) {
        console.log("GET_GAME_REPORT param", param)
        Helper.PostHttp(GET_GAME_REPORT, null, param, (res) => {
            console.log("GET_GAME_REPORT res", res)
            if (res) {
                callback(res)
            }
        })
    }

    //使用道具
    export function UpdateItemReq(reason: string, items: { id: number, num: number }[], tags: { [name: string]: string }, callback?: Function) {
        for (let i of items) {
            if (User.Items[i.id].num < Math.abs(i.num)) {
                callback?.({ err: "item not enought!" })
                return
            }
        }

        let param: any = {
            reason: reason,
            item_list: items,
            // tags: tags
        }

        if (tags) {
            param.tags = tags
        }

        console.log("UpdateItemReq param", param)
        Helper.PostHttp(UPDATE_ITEM, null, param, (res) => {
            // console.log("GET_USER_INFO", res)
            if (res.err) {
                callback?.(res)
            } else {
                UpdateItem(() => {
                    let list = []
                    for (let i of items) {
                        list.push({ id: i.id, num: User.Items[i.id].num })
                    }
                    callback({ item_list: list })
                })
            }
        })
    }

    export function getOnlineStatus(param, callback: Function) {
        console.log("GET_ONLINE_STATUS param", param)
        Helper.PostHttp(GET_ONLINE_STATUS, null, param, (res) => {
            console.log("GET_ONLINE_STATUS res", res)            
            callback(res)            
        })
    }

    EventMgr.on(Constants.EVENT_DEFINE.MSG_PUSH_NOT, onInvite, USER_SRV)
    export function InviteUser(openid, inviteCode) {
        PushSvr.SendPushMsg(openid, JSON.stringify({inviteCode: inviteCode }), 2)
    }

    export function sendInviteResult(openid, msg) {
        PushSvr.SendPushMsg(openid, JSON.stringify({msg: msg }), 3)
    }

    export function onInvite(msg) {
        if (msg.showType === 2) {
            let p = Helper.ParseJson(msg.msg)
            if(p && p.inviteCode){
                MatchSvr.getRoomInfo({share_code: p.inviteCode}, (res)=>{
                    if(res.room){
                        // 显示邀请界面
                        if (PlatformApi.isInLobby) {
                            console.log("===onInvite", msg)
                            res.sender = msg.sender
                            UIMgr.OpenUI("component/Firends/InvitePop", { single: true, param: res })
                        } else {
                            UserSrv.sendInviteResult(msg.sender, "对方已在游戏中")
                        }
                    }
                })
            }
        }else if(msg.showType === 3) {
            let p = Helper.ParseJson(msg.msg)
            Helper.OpenTip(p.msg)
        }
    }

    export function getQpVipLevel(ply: IPlayerBase){
        if(ply.openId == User.OpenID){
            return User.QpVipLevel
        }else{
            for(let v of ply.props){
                if(v.id == Constants.ITEM_INDEX.QpVipLevel){
                    return v.num
                }
            }
        }
        return 0
    }
}