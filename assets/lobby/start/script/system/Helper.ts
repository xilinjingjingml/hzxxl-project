import { UIMgr } from "../base/UIMgr"
import { Constants } from "../igsConstants"
import { HttpMgr } from "../base/HttpMgr"
import { DataMgr } from "../base/DataMgr"
import { ActivitySrv, VipPrivilegeSrv } from "./ActivitySrv"
import { EventMgr } from "../base/EventMgr"
import { PluginMgr } from "../base/PluginMgr"
import { UserSrv } from "./UserSrv"
import { User } from "../data/User"
import { WxProxyWrapper } from "../pulgin/WxProxyWrapper"
import { igs } from "../../../../igs"
import { ExchangeSrv } from "./ExchangeSrv"
import { ShopSvr } from "./ShopSvr"
import { MatchSvr } from "./MatchSvr"
import { PlatformApi } from "../api/platformApi"
import { NetWorkTipViewManager } from "../../../../main/NetWorkTip/NetWorkTip"

let _func: Function = null
let _serverTime = 0

export namespace Helper {
    export function CallStaticMethod(clsName: string, methodName: string, methodSig?: string, params?: Function | any, callback?: Function): any {
        cc.log("callStaticMethod clsName = ", clsName, " methodName = ", methodName, " methodSig = ", methodSig)
        if (!callback && typeof params === "function") {
            callback = params
            params = {}
        }

        if (!CC_JSB) {
            callback && callback("no jsb", null)
            return
        }
        try {
            methodSig && params.unshift(methodSig)
            cc.log("callStaticMethod.apply")
            let result = jsb.reflection.callStaticMethod.apply(jsb.reflection, [clsName, methodName].concat(params))
            // callback && callback(null, result)
            return { err: null, result: result }
        } catch (error) {
            cc.log("callStaticMethod", JSON.stringify(error))
            // callback && callback(error, null)
            return { err: error, result: null }
        }
    }

    // 项目内使用的函数
    export function VersionCompare(versionA: string, versionB: string): number {
        const vA = versionA.split('.')
        versionB = versionB || "0.0.0"
        const vB = versionB.split('.')
        for (let i = 0; i < vA.length; ++i) {
            const a = parseInt(vA[i])
            const b = parseInt(vB[i] || '0')
            if (a === b) {
                continue
            } else {
                return a - b
            }
        }
        if (vB.length > vA.length) {
            return -1
        } else {
            return 0
        }
    }

    export function LoadBundle(name: string, callback: Function) {
        cc.assetManager.loadBundle(name, null, (err, bundle) => {
            if (err) {
                cc.error("iGaoShou bundler not found: " + err)
                callback && callback(err)
                return
            }

            callback && callback(bundle)
        })
    }

    export function Load<T>(callback: (onComplete: (err: Error, asset: T) => void) => void) {
        return new Promise<T>((resolve, reject) => callback((err: Error, asset: T) => {
            if (err) {
                return reject(err)
            }

            resolve(asset)
        }))
    }


    export function FormatCountdownTime(time: number){
        time = Math.trunc(time)
        let hour = Math.trunc(time/60/60)
        let minute = Math.trunc((time-hour*60*60)/60)
        let seconds = (time%60)
        return hour.toString().padStart(2, "0")+":"+minute.toString().padStart(2, "0")+":"+seconds.toString().padStart(2, "0")
    }

    export function FormatTimeString(time: string | number, format?: string) {
        if (!time)
            return ""

        if (typeof time === "number")
            time = Math.abs(time)

        let date = new Date(time)
        let year, month, day, hours, minutes, seconds

        if (date.getTime() > 946656000000) {
            year = date.getFullYear();
            month = (date.getMonth() + 1);
            day = date.getDate();
            hours = date.getHours();
            minutes = date.getMinutes();
            seconds = date.getSeconds();
        } else {
            let d = date.getTime()
            year = Math.floor(d / 31536000000)
            month = Math.floor((d / 31536000000) % 2592000000)
            day = Math.floor((d % 2592000000) / 86400000)
            hours = Math.floor((d % 86400000) / 3600000)
            minutes = Math.floor((d % 3600000) / 60000)
            seconds = Math.floor((d % 60000) / 1000)
        }

        return (format || "yyyy-MM-dd hh:mm:ss")
            .replace("yyyy", "" + year)
            .replace("yy", ("" + year).slice(-2))
            .replace("MM", ("00" + month).slice(-2))
            .replace("M", "" + month)
            .replace("dd", ("00" + day).slice(-2))
            .replace("d", "" + day)
            .replace("hh", ("00" + hours).slice(-2))
            .replace("h", "" + hours)
            .replace("mm", ("00" + minutes).slice(-2))
            .replace("m", "" + minutes)
            .replace("ss", ("00" + seconds).slice(-2))
            .replace("s", "" + seconds)
    }

    export function FormatNumKMBT(num: number): string {
        let strNum = "" + num
        let len = strNum.length
        let head = parseInt(strNum.substr(0, 3))
        let point = len % 3
        point = point === 0 ? 3 : point
        let strHead = "" + head / Math.pow(10, (3 - point))
        if (len / 3 > 4)
            return strHead + "t"
        else if (len / 3 > 3)
            return strHead + "b"
        else if (len / 3 > 2)
            return strHead + "m"
        else if (len / 3 > 1)
            return strHead + "k"
        return strNum
    }

    export function FormatNumWY(num: number): string {
        let strNum = "" + num
        let len = strNum.length
        let head = parseInt(strNum.substr(0, 4))
        let point = len % 4
        point = point === 0 ? 4 : point
        let strHead = "" + head / Math.pow(10, (4 - point))
        // if (len / 5 > 4)
        //     return strHead + "t"
        // else if (len / 5 > 3)
        //     return strHead + "b"
        // else 
        if (len / 4 > 3)
            return strHead + "we"
        else if (len / 4 > 2)
            return strHead + "e"
        else if (len / 4 > 1)
            return strHead + "w"
        return strNum
    }

    export function FormatNumQWY(num: number): string {
        let strNum = "" + num
        let len = strNum.length
        let head = parseInt(strNum.substr(0, 4))
        let point = len % 4
        point = point === 0 ? 4 : point
        let strHead = "" + head / Math.pow(10, (4 - point))
        // if (len / 5 > 4)
        //     return strHead + "t"
        // else if (len / 5 > 3)
        //     return strHead + "b"
        // else 
        if (len / 4 > 3)
            return strHead + "we"
        else if (len / 4 > 2)
            return strHead + "e"
        else if (len / 4 > 1)
            return strHead + "w"
        // else if (len === 4)
        //     return Math.floor(num / 1000) + (num % 1000 > 0 ? "." + num % 1000 : "") + "q"
        return strNum
    }

    export function FormatNumPrice(num: number): string {
        if (num >= 10000) {
            return FormatNumWY(num)
        } else {
            return ("" + num.toFixed(2))
        }
    }

    export function FormatNumSplit(num: number): string {
        let strNum = "" + Math.abs(num)
        let len = strNum.length
        let newStr = strNum.substr(-3)
        for (let i = 1; i < len / 3; i++) {
            newStr = strNum.substring(Math.max(len - (i + 1) * 3, 0), len - i * 3) + "," + newStr
        }

        if (num < 0) {
            newStr = "-" + newStr
        }

        return newStr
    }

    export function FormatNumWYCN(num: number): string {
        let strNum = "" + Math.abs(num)
        let len = strNum.length
        let head = parseInt(strNum.substr(0, 4))
        let point = len % 4
        point = point === 0 ? 4 : point
        let strHead = "" + head / Math.pow(10, (4 - point))
        // if (len / 5 > 4)
        //     return strHead + "t"
        // else if (len / 5 > 3)
        //     return strHead + "b"
        // else 
        strHead = num < 0 ? ("-" + strHead) : strHead
        if (len / 4 > 3)
            return strHead + "万亿"
        else if (len / 4 > 2)
            return strHead + "亿"
        else if (len / 4 > 1)
            return strHead + "万"
        return num < 0 ? ("-" + strNum) : strNum
    }

    export function FormatNumWYCNinRichText(num: number, fontSize: number): string {
        let strNum = "" + num
        let len = strNum.length
        let head = parseInt(strNum.substr(0, 4))
        let point = len % 4
        point = point === 0 ? 4 : point
        let strHead = "" + head / Math.pow(10, (4 - point))
        // if (len / 5 > 4)
        //     return strHead + "t"
        // else if (len / 5 > 3)
        //     return strHead + "b"
        // else 
        if (len / 4 > 2)
            return "<b>" + strHead + "<size=" + fontSize + ">亿</size></b>"
        else if (len / 4 > 1)
            return "<b>" + strHead + "<size=" + fontSize + ">万</size></b>"
        return "<b>" + strNum + "</b>"
    }

    export function OpenPageUI(page: string, title: string, icon?: string | cc.SpriteFrame | Function | any, param?: any | Function, callback?: Function) {
        if (!callback && typeof param === "function") {
            callback = param
            param = null
        }

        if (!callback && typeof icon === "function") {
            callback = icon
            icon = null
        }

        if (!param && typeof icon !== "string" && !(icon instanceof cc.SpriteFrame)) {
            param = icon
            icon = null
        }

        if (!param) {
            param = {}
        }

        let uiparam = {
            page: page || param.page,
            title: title || param.title,
            icon: icon || param.icon,
            param: param
        }

        for (let i in param) {
            uiparam[i] = param[i]
        }

        UIMgr.OpenUI("component/Base/GamePage",
            { enterAni: Constants.PAGE_ANI.LEFT_IN, leaveAni: Constants.PAGE_ANI.LEFT_OUT, closeCb: param.closeCb, param: uiparam }, callback)
    }

    export function OpenPopUI(page: string, title: string, icon?: string | cc.SpriteFrame | Function | any, param?: any | Function, callback?: Function) {
        if (!callback && typeof param === "function") {
            callback = param
            param = null
        }

        if (!callback && typeof icon === "function") {
            callback = icon
            icon = null
        }

        if (!param && typeof icon !== "string" && !(icon instanceof cc.SpriteFrame)) {
            param = icon
            icon = null
        }

        let uiparam = {
            page: page || param.page,
            title: title || param.title,
            icon: icon || param.icon,
        }

        for (let i in param) {
            uiparam[i] = param[i]
        }

        UIMgr.OpenUI("component/Base/GamePop", {
            enterAni: Constants.PAGE_ANI.POP_IN, mask: true, maskClose: true, single: param.single,
            position: cc.v3(0, cc.winSize.height * .118), closeCb: param.closeCb, param: uiparam
        }, callback)
    }

    export function OpenTip(msg: string) {
        if (!msg || msg.length === 0)
            return

        UIMgr.OpenUI("component/Base/TipEntry", { single: false, param: { msg: msg } })
    }

    export function OpenGamePop(param: any) {        
        UIMgr.OpenUI("component/Base/GamePop", { single: false, param: param })
    }

    export function GetURI(key: string): string {
        let search = window.location.search || ""
        var args = {}
        if (search.indexOf('?') != -1) {
            var query = search.substr(1)
            var pairs = query.split('&')
            for (var i = 0; i < pairs.length; i++) {
                var sp = pairs[i].split('=')
                args[sp[0]] = decodeURIComponent(sp[1])
            }
        }
        return args[key]
    }

    export function RequestKey() {
        return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    export function UUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    export function GetContry(region) {
        let country = DataMgr.getData<TCountryFlag>(Constants.DATA_DEFINE.IGS_REGION_FLAG)
        if (country) {
            return country[region]
        }
    }

    let _delayTag: number = 100000
    export function DelayFun(func: Function, delay: number = 0): number {
        if (!func || typeof func !== "function") {
            cc.warn("DelayFun func err")
            return
        }

        cc.tween(cc.Canvas.instance)
            .tag(_delayTag)
            .delay(delay)
            .call(() => func())
            .start()

        return _delayTag++
    }

    export function StopDelay(tag: number) {
        cc.tween(cc.Canvas.instance).tag(tag).stop()
    }

    export function GetHttp(uri: string, param: any, callback: Function) {
        let openid = DataMgr.getData<IAccount>(Helper.GetTokenDataKey()) || {}
        let cb = (msg) => {
            if (msg && msg.Code === 500) {
                if (msg.Detail === "invalid user token provided") {
                    EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                        GetHttp(uri, param, callback)
                    }, this)
                    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ACCOUNT_LOGIN)
                }
            }
            callback && callback(msg)
        }

        HttpMgr.get("https://" + DataMgr.data.Config.hostname + "/" + uri,
            { "User-Token": openid?.token }, param, cb)
    }

    export function PostHttp(uri: string, param: any, body: any, callback: Function, retry: boolean = true) {
        let openid = DataMgr.getData<IAccount>(Helper.GetTokenDataKey()) || {}
        if (!openid.token) {
            callback?.(null)
            return
        }

        let cb = (msg) => {
            if (msg && (msg.Code === 500 || msg.Code === 401 || msg.Code === 403)) {
                if (msg.Detail === "invalid user token provided" || msg.Detail === "invalid token") {
                    let openid = DataMgr.getData<IAccount>(Helper.GetTokenDataKey()) || {}
                    openid.token = null
                    DataMgr.setData(Helper.GetTokenDataKey(), openid)
                    EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                        PostHttp(uri, param, body, callback, false)
                    }, this)
                    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ACCOUNT_LOGIN)
                    return
                } else if (msg.Detail === "bad request overtime 5s") {
                    EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                        PostHttp(uri, param, body, callback, false)
                    }, this)
                    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ACCOUNT_LOGIN)
                    return
                }
            } else if (msg?.err) {
                msg.err = Helper.ParseJson(msg.err)
                if (msg.err.detail === "invalid token" || msg.err.detail === "invalid user token provided") {
                    let openid = DataMgr.getData<IAccount>(Helper.GetTokenDataKey()) || {}
                    openid.token = null
                    DataMgr.setData(Helper.GetTokenDataKey(), openid)
                    EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                        PostHttp(uri, param, body, callback, false)
                    }, this)
                    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ACCOUNT_LOGIN)
                    return
                }
            }

            callback && callback(msg)
        }

        let host = DataMgr.data.Config.hostname
        if (-1 !== uri.indexOf("authen-srv") || -1 !== uri.indexOf("mcbeam-version-api")|| -1 !== uri.indexOf("mcbeam-pay-api")) {
            host = host.replace("igaoshou.", "mcbeam.")
        }

        let head = {}
        if (openid && openid.token) {
            let authorization = sign(body, openid.token)
            head = {
                "User-Token": openid.token,
                "User-Authorization": authorization,
                "Igs-User-Id": openid.openid,
            }
        }

        HttpMgr.post("https://" + host + "/" + uri, head, param, body, retry ? cb : callback)
    }

    export function checkNetwork(confirm?: Function, cancel?: Function) {
        PluginMgr.checkNetwork()
            .then((succ) => {
                succ && confirm?.()
            })
            .catch(() => {
                let param = {
                    title: "温馨提示",
                    msg: "网络不稳定,请检查网络稍后再试\n\n按确定重新连接,按取消返回大厅",
                    confirmName: "取消",
                    cancelName: "确定",
                    cancel: () => checkNetwork(confirm, cancel),
                    confirm: () => cancel?.()
                }
                UIMgr.OpenUI(cc.assetManager.getBundle("lobbyMain"), "component/loginTip/LoginTip", { param: param })
            })
    }

    export function sign(param, userToken) {
        let now = Math.floor(Date.now() / 1000)
        let ts = now + "" //(now + _serverTime) + ""
        // cc.log("====sign now = " + now + " interval = " + _serverTime + " ts = " + ts)
        let ns = (Date.now() + Math.random()) + ""

        let keys = []
        for (let k in param) {
            keys.push(k)
        }

        keys.sort((a, b) => {
            for (let i in a) {
                if (a[i] && b[i]) {
                    let k1 = a[i].charCodeAt(0)
                    let k2 = b[i].charCodeAt(0)
                    if (k1 < k2)
                        return -1
                    else if (k1 > k2)
                        return 1
                } else if (a[i] && !b[i]) {
                    return 1
                } else if (!a[i] && b[i]) {
                    return -1
                }
            }
        })

        let str = ""
        for (let k of keys) {
            if (!param[k]) {
                continue
            }

            if (typeof param[k] === "string" || typeof param[k] === "number" || typeof param[k] === "boolean") {
                // str += k + "=" + encodeURIComponent(param[k]) + "&"
                str += k + "=" + (findChinese(param[k]) ? encodeURIComponent(param[k]) : param[k]) + "&"
            } else if (Array.isArray(param[k])) {
                str += k + "=" + JSON.stringify(param[k]) + "&"
            } else if (typeof param[k] === "object" && param[k]) {
                str += k + "=" + JSON.stringify(param[k]) + "&"
            } else {
                str += k + "=" + param[k] + "&"
            }
        }
        str = str.substr(0, str.length - 1)

        str = ts + "\n" + ns + "\n" + str + "\n"
        // cc.log("signParam = " + str)
        let sign = ""
        let cryptoJs = window["CryptoJS"]
        if (cryptoJs) {
            sign = cryptoJs.HmacSHA256(str, userToken).toString();
        }

        let authorization = {
            ts: ts,
            ns: ns,
            sign: sign,
        }

        // cc.log(authorization)
        return JSON.stringify(authorization)
    }

    let _lastPoint: string = ""
    let _lastTime  = 0
    export function reportEvent(moduleName: string, action: string = "", label: string = "") {
        // cc.log(Date.now() + "====Report Event " + moduleName + "_" + action + "_" + label)
        let newbie = User.AllGame <= 2
        // let str = "新的标签" + moduleName + '_' + action + '_' + label + '_newbie:' + newbie// + "_gameId:" + igs.gameId
        // cc.log(str)
        let str = moduleName + action + label// + '_newbie:' + newbie
        // if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        //     let wx = window["wx"]
        //     if (wx && wx.aldSendEvent) {
        //         wx.aldSendEvent(str)
        //     }
        // }

        // let igsEvt = window["igsEvt"]
        // if (igsEvt) {
        //     igsEvt.report(Math.floor(Date.now() / 1000) + ":" + str)
        // }

        if (moduleName === "游戏操作") {
            str += "_last:" + _lastPoint
            // str += "-interval:" + (Date.now()-_lastTime)
            igs.platform.trackEvent(str, {}, ["interval:" + (Date.now()-_lastTime)])
        } else {
            _lastPoint = str
            _lastTime = Date.now()
            igs.platform.trackEvent(str)
        }

    }

    export function copyToClipBoard(str: string, succTip: string = "已复制到剪贴板") {
        if (cc.sys.isBrowser) {
            var textArea = document.getElementById("clipBoard")
            if (textArea === null) {
                textArea = document.createElement("textarea")
                textArea.id = "clipBoard"
                textArea.textContent = str
                document.body.appendChild(textArea)
            }
            textArea["select"]()
            try {
                document.execCommand('copy')
                OpenTip(succTip)
                document.body.removeChild(textArea)
            } catch (err) {
                OpenTip("复制到剪贴板失败")
            }
        } else {
            PluginMgr.copyToClipboard(str)
        }
    }

    export function shareInfo(param?: any, callback?: Function) {
        console.log("shareInfo param", param)
        if (param && typeof param === "function") {
            callback = param
            param = null
        }

        if (Helper.isNative() && (!param ||!param.skip)) {
            UIMgr.OpenUI("component/Promote/PromoteShare", { single: true, param:{param:param, callback:callback}})
            return
        }

        let share = DataMgr.getData<any>(Constants.DATA_DEFINE.SHARE_INFO)
        if (null === share) {
            UserSrv.GetShareInfo(() => shareInfo(param, callback))
            return
        }
        if (param) {
            share.share_text = param.share_text ? param.share_text : share.share_text
            share.share_pic = param.share_pic ? param.share_pic : "https://download.mcbeam.cc/Image/" + DataMgr.data.Config.gameId + (cc.sys.isNative ? "_app_share.jpg" : "_share.jpg")
        }

        console.log("shareInfo share", share)
        let shareOpenId = ""
        if (User.Data && User.Data.openId) {
            shareOpenId = "shareOpenId=" + User.Data.openId
        }
        const shareData = {
            ShareWay: "1005",
            ShareTaskType: "",
            ShareTitle: share.share_text,
            ShareText: share.share_text,
            ShareUrl: "",
            ShareType: "2",
            gameid: "",
            SharedImg: share.share_pic,
            withOpenId: true,
            shareOpenId: shareOpenId,
        }

        callback && EventMgr.once(Constants.EVENT_DEFINE.SHARE_CALLBACK, callback)
        PluginMgr.share(shareData)
    }

    export function setServerTime(time: number) {
        _func = _func || Date.now
        _serverTime = time * 1000 - _func()

        Date.now = (): number => {
            return _func() + _serverTime
        }
    }

    export function createWxUserInfo(node: cc.Node, name: string, callback: Function, onCreate?: Function) {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            onCreate(false)
            return
        }

        if (!node || !name) {
            onCreate(false)
            return
        }

        let userTaskId = 1001
        let func = () => {
            if (node.isValid) {
                WxProxyWrapper.showUserInfoButton(node, name,
                    (res) => {
                        // 授权回调
                        callback?.(res.errMsg === "getUserInfo:ok")

                        if (res.errMsg === "getUserInfo:ok") {
                            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ACCOUNT_LOGIN, { async: true })
                            EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                                ActivitySrv.GetReward(userTaskId)
                            })
                        }
                    },
                    () => {
                        // 创建成功
                        onCreate && onCreate(true)
                    })
            }
        }

        let userInfoTask = ActivitySrv.GetActivityById(userTaskId)
        // console.log("baseTop ", userInfoTask)
        if (!userInfoTask) {
            EventMgr.once(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, () => {
                let task = ActivitySrv.GetActivityById(userTaskId)
                if (task && (!task.receive_num || task.receive_num < 1)) {
                    func()
                } else {
                    onCreate(false)
                }
            }, this)
        } else if (userInfoTask && (!userInfoTask.receive_num || userInfoTask.receive_num < 1)) {
            func()
        } else {
            onCreate(false)
        }
    }

    export function TokenAni(start: number, end: number, time?: number | Function, callback?: Function): cc.Tween {
        if (typeof callback !== "function" && typeof time === "function") {
            callback = time
            time = null
        }
        time = time || 2.0

        let t = null
        if (end > start) {
            t = cc.tween()
                .to(0.1, { scale: 1.5 })
                .to(0.1, { scale: 1 })
        } else {
            t = cc.tween().set({ scale: 1 })
        }

        return cc.tween()
            .set({ _tokenNum: start })
            .to(Number(time), { _tokenNum: end }, {
                progress: (start, end, current, t) => {
                    let d = cc.misc.lerp(start, end, t);
                    callback && callback(Math.ceil(d))
                    return d
                }
            })
            .then(t)
            .call(() => callback && callback(end))
    }

    export function ParseJson(json: string, tag: string = null) {
        if (typeof json !== "string") {
            return json
        }

        try {
            let msg = JSON.parse(json)
            return msg
        } catch (err) {
            if (tag) {
                Helper.reportEvent("JSON parse:", tag + ".", json)
            }

            console.log(err)
        }

        return json
    }

    export function CSVToArray(strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
            (
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[1];
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ) {
                arrData.push([]);
            }
            if (arrMatches[2]) {
                var strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"),
                    "\""
                );
            } else {
                var strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        if (arrData.length > 0) {
            arrData.pop();
        }
        return arrData;
    }

    interface IIPLocation {
        status: string
        info: string
        infocode: string
        province: string
        city: string
        adcode: string
        rectangle: string
    }
    export function getIPLocation(callback?: Function) {
        HttpMgr.get("https://restapi.amap.com/v3/ip?key=0113a13c88697dcea6a445584d535837", {}, {}, (res: IIPLocation) => {
            if (res) {
                if (res.status == "1") {
                    callback && callback(res.city)
                } else {
                    callback && callback(null)
                }
            }
        })
    }

    export function checkPhoneNum(phone: string) {
        var myreg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!myreg.test(phone)) {
            return false
        }
        return true
    }

    export function isNative() {
        if (cc.sys.isNative && cc.sys.OPPO_GAME != cc.sys.platform && cc.sys.VIVO_GAME != cc.sys.platform) {
            return true
        }
        return false
    }

    export function GetTokenDataKey() {
        let env = Number(Helper.GetURI("env")) || DataMgr.getData<number>(Constants.DATA_DEFINE.LAST_ENV) || (DataMgr.data.Config ? DataMgr.data.Config.env : 0)
        if (env === 0) {
            return Constants.DATA_DEFINE.OPEN_ID
        } else {
            return Constants.DATA_DEFINE.OPEN_ID + "_" + env
        }
    }

    export function LoginOut(params?: any) {
        DataMgr.setData(Helper.GetTokenDataKey(), {}, true)
        DataMgr.setData(Constants.DATA_DEFINE.EXCHANGE_DATA + "typeId" + 2, null)
        if (!UIMgr.FindUI("component/Personal/SessionEntry")) {
            UIMgr.OpenUI("component/Personal/SessionEntry", { param: {} })
        }
    }

    export function CaptureNode(nodeCapture: cc.Node) {
        let camera = nodeCapture.getComponent(cc.Camera)
        if (!camera) {
            camera = nodeCapture.addComponent(cc.Camera)
        }

        let width = nodeCapture.width;
        let height = nodeCapture.height;

        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);

        camera.targetTexture = texture;

        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext('2d');
        camera.render();

        // 指定需要读取的区域的像素
        let size = nodeCapture.getContentSize();
        let pixels = new Uint8Array(size.width * size.height * 4);
        let x = texture.width / 2 - nodeCapture.width / 2;
        let y = texture.height / 2 - nodeCapture.height / 2;
        let w = nodeCapture.width;
        let h = nodeCapture.height;
        let data = texture.readPixels(pixels, x, y, w, h);

        // write the render data
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }
        return canvas;
    }

    export function CaptureNodeInNative(nodeCapture: cc.Node) {
        let camera = nodeCapture.getComponent(cc.Camera)
        if (!camera) {
            camera = nodeCapture.addComponent(cc.Camera)
        }

        let width = nodeCapture.width;
        let height = nodeCapture.height;

        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);

        camera.targetTexture = texture;

        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext('2d');
        camera.render();

        // 指定需要读取的区域的像素
        let size = nodeCapture.getContentSize();
        let pixels = new Uint8Array(size.width * size.height * 4);
        let x = texture.width / 2 - nodeCapture.width / 2;
        let y = texture.height / 2 - nodeCapture.height / 2;
        let w = nodeCapture.width;
        let h = nodeCapture.height;
        let data = texture.readPixels(pixels, x, y, w, h);

        // write the render data
        let imageData = new Uint8Array(width * height * 4)
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                imageData[reStart + i] = data[start + i];
            }
        }

        if (CC_JSB) {
            let filePath = jsb.fileUtils.getWritablePath() + 'render_to_sprite_image.png';

            let success = jsb["saveImageData"](imageData, width, height, filePath)
            if (success) {
                cc.log("save1 image data success, file: " + filePath);
            }
            else {
                cc.error("save1 image data failed!");
            }

            return "file://" + filePath
        }

        return ""
    }

    export function checkExchange() {
        if (cc.sys.WECHAT_GAME === cc.sys.platform || Helper.isNative()) {
            let can = DataMgr.data.Config.platId !== 3 && Constants.sys.WECHAT_GAME_QQ !== cc.sys.platform

            let abKey = PluginMgr.getABTestKey("expt_no_exchange")
            console.log("abKey " + abKey)
            if (abKey === "1") {
                return can && false
            } else {
                return can && User.RegTime <= 1641830400
            }
        }

        return false
    }

    export function GMTToStr(){
        let date = new Date();
        let Str=date.getFullYear() + '' +
            ((date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : date.getMonth() + 1) + '' +
            (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ''
        return Number(Str);
    }
    
    export function formatNickname(nickname: string) {
        if (nickname.length > 6) {
            nickname = nickname.slice(0, 6) + "..."
        }
        return nickname
    }

    // export function isMember() {
    //     if(User.Data.items[Constants.ITEM_INDEX.MemberCard]){
    //         console.log("Number(User.Data.items[Constants.ITEM_INDEX.MemberCard].expireAt)", Number(User.Data.items[Constants.ITEM_INDEX.MemberCard].expireAt))
    //         console.log("new Date().getTime()/1000", new Date().getTime()/1000)
    //         if (new Date().getTime()/1000 < Number(User.Data.items[Constants.ITEM_INDEX.MemberCard].expireAt)) {
    //             return true
    //         }
    //     }
    //     return false
    // }

    // export function isSupreMember() {
    //     if(User.Data.items[Constants.ITEM_INDEX.SupreMemberCard]){
    //         if (new Date().getTime()/1000 < Number(User.Data.items[Constants.ITEM_INDEX.MemberCard].expireAt)) {
    //             return true
    //         }
    //     }
    //     return false
    // }

    //检查道具是否有效
    export function isItemValid(id){
        if(User.Data.items[id]){
            console.log("Number(User.Data.items[id].expireAt)", Number(User.Data.items[id].expireAt))
            console.log("new Date().getTime()/1000", new Date().getTime()/1000)
            if (new Date().getTime()/1000 < Number(User.Data.items[id].expireAt)) {
                return true
            }
        }
        return false
    }

    // 判断是否当天
    export function isToday(time) {
        let now = new Date()
        let prev = new Date(time)

        if (now.getFullYear() == prev.getFullYear() && now.getMonth() == prev.getMonth() && now.getDate() == prev.getDate()) {
            return true
        } else {
            return false
        }
    }

    export function findChinese(str) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
            // alert("不能含有汉字！");
            return true;
        }
        return false;
    }

    /** 按目录加载资源 */
    export function loadDir(bundleName: string, dirs: string[], callback?: () => void, state:number = 0) {
        state++
        let onProgress = function (finish: number, total: number, item: cc.AssetManager.RequestItem) {
            igs.emit("load_asset_progress", { finish: finish, total: total, item: item , state: state})
        }
        let bundle = cc.assetManager.getBundle(bundleName)
        let dir = dirs.pop()
        if (bundle) {            
            bundle.loadDir(dir + "/", onProgress, (err, res) => {
                console.log("helper loadDir " + bundleName + "/" + dir + " ready")
                if (dirs.length > 0) {
                    Helper.loadDir(bundleName, dirs, callback, state)
                } else {
                    callback && callback()
                }
            })
        } else {
            cc.assetManager.loadBundle(bundleName, (err, bundle) => {
                if (err) {

                } else {
                    bundle.loadDir(dir + "/",onProgress, (err, res) => {
                        console.log("helper loadDir " + bundleName + "/" + dir + " ready")
                        if (dirs.length > 0) {
                            Helper.loadDir(bundleName, dirs, callback, state)
                        } else {
                            callback && callback()
                        }
                    })
                }
            })
        }
    }

    export function checkLackMoney(needGold: number, callback: Function){                
        UIMgr.OpenUI("component/Activity/LackMoney/LackMoney", { single: true, param: {needGold: needGold, callback: callback}})        
    }

    export function checkBroke(needGold: number, callback: Function){        
        let info = ActivitySrv.GetActivityById(9)
        //检查破产补助
        VipPrivilegeSrv.GetPlayerVipPrivilege((vipPrivilege)=>{
            if(vipPrivilege && vipPrivilege.remedies_times > 0){
                info.day_times = vipPrivilege.remedies_times
            }
            if(info && info.param.broke_num >= needGold && info.receive_num < info.day_times){
                Helper.showBroke({ activityConfig: info, callback: callback })
            }
        })
    }

    export function showBroke(param: any, closeCb?: Function){
        UIMgr.OpenUI("component/Activity/Broke/Broke023", {
            single: true, param: param
        }, closeCb)
    }

    export function isAudit(os:string = cc.sys.OS_IOS){
        if(cc.sys.WECHAT_GAME === cc.sys.platform){
            if(cc.sys.os == os || !os || os.length == 0){
                if(DataMgr.data.OnlineParam.wechat_audit != Constants.auditCode){
                    DataMgr.data.OnlineParam.shop_rounds = DataMgr.data.OnlineParam.shop_rounds || 0
                    if(User.PlayGame > DataMgr.data.OnlineParam.shop_rounds) {
                        return false
                    }
                }
                return true
            }
        }

        return false
    }

    export function exchangeTemplateInfo(exchangeInfo: any, callback: Function){
        if (Helper.isAudit() == false && exchangeInfo.consume_list[0].item_id == Constants.ITEM_INDEX.GAME_DIAMOND && User.GameDiamond < exchangeInfo.consume_list[0].item_num) {	
            let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            let curBox:IShopInfo = null
            if(boxs){
                for(let k in boxs[Constants.SHOP_TYPE.NORMAL]){
                    if(boxs[Constants.SHOP_TYPE.NORMAL][k].items[Constants.ITEM_INDEX.GAME_DIAMOND] && Number(boxs[Constants.SHOP_TYPE.NORMAL][k].items[Constants.ITEM_INDEX.GAME_DIAMOND].num) >= Number(exchangeInfo.consume_list[0].item_num)){
                        curBox = boxs[Constants.SHOP_TYPE.NORMAL][k]
                        break
                    }
                }
            }
            if(curBox){     
                console.log("curBox", curBox)           
                let name = exchangeInfo.output_list[0].item_name.substr(exchangeInfo.output_list[0].item_name.length-2, 2)
                let param = {
                    msg: "您的钻石不足，是否花费【¥" + curBox.price/100 + "】充值" + curBox.items[Constants.ITEM_INDEX.GAME_DIAMOND].num + "钻石？充值后将为您自动购买【" + Helper.FormatNumWYCN(exchangeInfo.output_list[0].item_num) + name +"】",
                    hideClose: true,
                    hideCancel: false,
                    confirm: () => {
                        if(Helper.checkPayResult()){
                            EventMgr.once(Constants.EVENT_DEFINE.FOREGROUND, ()=>{                                
                                let param = {
                                    box_gid: curBox.boxId
                                }
                                ActivitySrv.GetShopPayResult(param, (res)=>{
                                    if(res && res.err && res.err.code == 200){
                                        UserSrv.UpdateItem(()=>{                    
                                            Helper.exchangeTemplateInfo(exchangeInfo, callback)
                                        })
                                    }else{
                                        callback(false)
                                    }
                                })                            
                            })
                        }
                        ShopSvr.Pay(curBox, (res)=>{
                            if(res && res.code == 0){
                                Helper.OpenTip("支付成功")
                                UserSrv.UpdateItem(()=>{
                                    Helper.exchangeTemplateInfo(exchangeInfo, callback)
                                })
                            }else if(res && res.msg){
                                Helper.OpenTip(res.msg)
                                callback(false)
                            }
                        })
                    },
                    cancel: () => {
                        callback(false)
                    }
                }
                Helper.OpenGamePop(param)
            } else {
                let name = exchangeInfo.consume_list[0].item_name
                Helper.OpenTip(name + "不足，请先购买"+ name)
                UIMgr.OpenUI("component/Shop/ShopSceneNew", { single: true, param: {tab: 2}, closeCb: ()=>{
                
                }})
            }
        } else {
            let param = {
                id: exchangeInfo.id
            }
            ExchangeSrv.exchangeTemplateInfo(param, (res, event) => {
                console.log("exchangeInfo", res)
                if (res && res.code == "0000") {                
                    UserSrv.UpdateItem(()=>{
                        UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: exchangeInfo.output_list }, closeCb:()=>{
                            callback(true)
                        }})
                    })
                } else {
                    if (res && res.msg) {
                        let msg = Helper.ParseJson(res.msg, "ShopScene")
                        if(msg && msg.code == 12003){
                            let name = exchangeInfo.consume_list[0].item_name
                            if(Helper.isAudit() || exchangeInfo.consume_list[0].item_id == Constants.ITEM_INDEX.FuCard){
                                Helper.OpenTip(name + "不足")
                            } else {
                                Helper.OpenTip(name + "不足，请先购买"+ name)
                            }
                        }else{
                            Helper.OpenTip(res.msg)
                        }
                    } else {
                        Helper.OpenTip("操作失败，请稍后再试！")
                    }
                    callback(false)
                }
            })
        }
    }

    export function checkPayResult(){
        if(cc.sys.WECHAT_GAME === cc.sys.platform && cc.sys.os == cc.sys.OS_IOS){
            return true
        }
        return false
    }

    export function quickGame(){
        let list = MatchSvr.getMatchList(Constants.GAME_TYPE_LABLE.MAJIONG_HZXL)

        let curMatch = null
        for(let v of list){
            let matchInfo = v
            if(matchInfo.metadata && matchInfo.metadata.gs_properties){
                let gs_properties = matchInfo.metadata.gs_properties                
                gs_properties.item_limit.max = gs_properties.item_limit.max || 0                
                let userItem = User.Items[gs_properties.settle_item]
                if(userItem && userItem.num >= gs_properties.item_limit.min && 
                    (gs_properties.item_limit.max == 0 || (gs_properties.item_limit.max > 0 && userItem.num <= gs_properties.item_limit.max))){
                        curMatch = matchInfo
                }
            }
        }
        
        MatchSvr.checkRealTimeMatch((res)=>{
            if(null === res){
                if(curMatch){
                    PlatformApi.enterGame(curMatch)                    
                }
            }
        })
    }

    export function isInLobbyScene(){
        console.log("cc.director.getScene().name", cc.director.getScene().name)
        return cc.director.getScene().name == "lobby"
    }

    export function CheckInList(obj, list){
        for(let v of list){
            if(v === obj){
                return true
            }
        }
        return false
    }


    
    //获取记牌器的付费点
    export function GetRecorderCardShopInfo() : IShopInfo{
       
        let boxes: TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if (boxes && boxes[Constants.SHOP_TYPE.NORMAL]) {
            let boxList: IShopInfo[] = []
            for (let idx in boxes[Constants.SHOP_TYPE.NORMAL]) {
                boxList.push(boxes[Constants.SHOP_TYPE.NORMAL][idx])
            }
            for (let boxinfo of boxList) {
                if (boxinfo.name.indexOf("12个记牌器") != -1) {
                    return boxinfo;
                }
            }
        }
        return null
    }

    
    //获取超级加倍的付费点
    export function GetSuperDoubleCardShopInfo() : IShopInfo{
       
        let boxes: TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if (boxes && boxes[Constants.SHOP_TYPE.NORMAL]) {
            let boxList: IShopInfo[] = []
            for (let idx in boxes[Constants.SHOP_TYPE.NORMAL]) {
                boxList.push(boxes[Constants.SHOP_TYPE.NORMAL][idx])
            }
            for (let boxinfo of boxList) {
                if (boxinfo.name.indexOf("12张超级加倍") != -1) {
                    return boxinfo;
                }
            }
        }
        return null
    }

    
    //获取超级加倍和记牌器的混合礼包
    export function GetSuperDoubleCardAndRecorderCardShopInfo() : IShopInfo{
       
        let boxes: TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if (boxes && boxes[Constants.SHOP_TYPE.NORMAL]) {
            let boxList: IShopInfo[] = []
            for (let idx in boxes[Constants.SHOP_TYPE.NORMAL]) {
                boxList.push(boxes[Constants.SHOP_TYPE.NORMAL][idx])
            }
            for (let boxinfo of boxList) {
                if (boxinfo.name.indexOf("加倍卡和记牌器混合礼包") != -1) {
                    return boxinfo;
                }
            }
        }
        return null
    }


    export function IsDDZGame() : boolean{
        return (DataMgr.data.Config.gameId == "940fb465-9726-4a01-9aae-270f388ff85a")
    }

    export function openNetWorkTip(){
        NetWorkTipViewManager.ShowTipsView()
    }

    export function closeNetWorkTip(){
        NetWorkTipViewManager.RemovePopView()
    }
}