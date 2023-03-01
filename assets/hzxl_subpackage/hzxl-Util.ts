import { CardIndex, OperatorCode, CheckType, LackType } from "./hzxl-Constants";

import { igs } from "../igs";
import EventTrack, { TrackNames } from "./hzxl-EventTrack";
import { Util } from "../lobby/start/script/api/utilApi";
import { Helper } from "../lobby/start/script/system/Helper";
import HzxlLogic from "./hzxl-logic";

export namespace scmjUtil {
    declare const wx: any
    var chairId = -1
    var isPicReady = false
    var loadTimer = 0
    export const BUNDLE_NAME = "hzxl"
    export const GAME_VERSION = "4"
    let handOrder = [] //定缺后手牌万条筒顺序

    export function setChairId(chairId) {
        this.chairId = chairId
    }

    export function s2c(index) {
        let maxPlyNum = HzxlLogic.getInstance().maxPlyNum
        if (maxPlyNum == 4) {
            return (index - this.chairId + maxPlyNum) % maxPlyNum + 1
        } else if (maxPlyNum == 3) {
            let result = (index - this.chairId + maxPlyNum) % maxPlyNum + 1
            if (result == 3) {
                result = 4
            }
            return result
        } else if (maxPlyNum == 2) {
            let result = (index - this.chairId + maxPlyNum) % maxPlyNum + 1
            if (result == 2) {
                result = 3
            }
            return result
        }
    }

    export function c2s(index) {
        let maxPlyNum = HzxlLogic.getInstance().maxPlyNum
        if (maxPlyNum == 4) {
            return (this.chairId + index + maxPlyNum) % maxPlyNum - 1
        } else if (maxPlyNum == 3) {
            let result = (this.chairId + index + maxPlyNum) % maxPlyNum - 1
            if (result == 3) {
                result = 2
            }
            return result
        } else if (maxPlyNum == 2) {
            let result = (index - this.chairId + maxPlyNum) % maxPlyNum + 1
            if (result == 2) {
                result = 1
            }
            return result
        }
    }

    export function pathNode(name, mapPaths, parent): cc.Node {
        let node = null
        for (let key in mapPaths) {
            node = cc.find(mapPaths[key] + name, parent)
            if (node) {
                break
            }
        }
        if (node) {
            return node
        } else {
            // console.log("pathNode did't find node of name ", name)
            return null
        }
    }

    export function addIntoPath(name, mapPaths, parent, child) {
        console.log("addIntoPath name ", name)
        let node = this.pathNode(name, mapPaths, parent)
        if (node) {
            node.addChild(child)
        }
    }

    export function stopLoaderTimer() {
        if (this.loadTimer != 0) {
            clearInterval(this.loadTimer)
            this.loadTimer = 0
        }
    }

    export function startLoaderTimer(callback) {
        this.stopLoaderTimer()
        this.loadTimer = setInterval(() => {
            if (isPicReady) {
                this.stopLoaderTimer()
                callback && callback()
                return
            }
        }, 1.0)
    }

    export function preLoadPic(callback?) {
        if (isPicReady) {
            callback && callback()
            return
        } else if (callback) {
            this.startLoaderTimer(callback)
            return
        }
        cc.assetManager.loadBundle("hzxl", (err, bundle) => {
            if (err) {

            } else {
                bundle.loadDir("images/", (err, res) => {
                    console.log("load hzxl images ready")
                    isPicReady = true
                    callback && callback()
                })
            }
        });
    }

    /** 按目录预加载资源 */
    export function preLoadDir(dirs: string[], callback?: () => void) {
        let bundle = cc.assetManager.getBundle(BUNDLE_NAME)
        let dir = dirs.pop()
        if (bundle) {
            bundle.preloadDir(dir + "/", (err, res) => {
                console.log("preload " + BUNDLE_NAME + "/" + dir + " ready")
                if (dirs.length > 0) {
                    scmjUtil.preLoadDir(dirs, callback)
                } else {
                    callback && callback()
                }
            })
        } else {
            cc.assetManager.loadBundle(BUNDLE_NAME, (err, bundle) => {
                if (err) {

                } else {
                    bundle.preloadDir(dir + "/", (err, res) => {
                        console.log("preload " + BUNDLE_NAME + "/" + dir + " ready")
                        if (dirs.length > 0) {
                            scmjUtil.preLoadDir(dirs, callback)
                        } else {
                            callback && callback()
                        }
                    })
                }
            })
        }
    }

    /** 按目录加载资源 */
    export function loadDir(dirs: string[], callback?: () => void, state: number = 0) {
        state++
        let onProgress = function (finish: number, total: number, item: cc.AssetManager.RequestItem) {
            // igs.log("loadDir finish", finish)
            igs.emit("load_asset_progress", { finish: finish, total: total, item: item, state: state })
        }
        let bundle = cc.assetManager.getBundle(BUNDLE_NAME)
        let dir = dirs.pop()
        if (bundle) {
            igs.log("loadDir", dir)
            bundle.loadDir(dir + "/", onProgress, (err, res) => {
                igs.log("scmj loadDir " + BUNDLE_NAME + "/" + dir + " ready")
                if (err) {
                    Helper.reportEvent("load loadDir err dir=" + dir, " err=", err.message)
                    return
                }
                if (dirs.length > 0) {
                    scmjUtil.loadDir(dirs, callback, state)
                } else {
                    callback && callback()
                }
            })
        } else {
            cc.assetManager.loadBundle(BUNDLE_NAME, onProgress, (err, bundle) => {
                if (err) {

                } else {
                    igs.log("loadDir", dir)
                    bundle.loadDir(dir + "/", onProgress, (err, res) => {
                        if (err) {
                            Helper.reportEvent("load loadDir err dir=" + dir, " err=", err.message)
                            return
                        }
                        igs.log("scmj loadDir " + BUNDLE_NAME + "/" + dir + " ready")
                        if (dirs.length > 0) {
                            scmjUtil.loadDir(dirs, callback, state)
                        } else {
                            callback && callback()
                        }
                    })
                }
            })
        }
    }


    /** 按单个文件路径加载资源 */
    export function loadAsset(pathName: string, type: typeof cc.Asset, callback: (asset: any, err?) => void, bundleName?: string): any {
        let bn = bundleName ? bundleName : BUNDLE_NAME
        if ("images/maJiang/mj" == pathName) {
            bn = "hzxl_subpackage"
        }
        let bundle = cc.assetManager.getBundle(bn)
        if (bundle) {
            let asset = bundle.get(pathName, type)
            if (asset) {
                callback(asset)
            } else {
                bundle.load(pathName, type, (err, res) => {
                    if (err) {
                        if ("images/maJiang/mj" == pathName) {
                            iGaoShouApi.showReloadAssetPop(() => {
                                scmjUtil.loadAsset(pathName, type, callback, bn)
                            })
                        }
                    } else {
                        callback(res)
                    }
                })
            }
        } else {
            cc.assetManager.loadBundle(bn, (err, bundle) => {
                if (err) {
                    if ("images/maJiang/mj" == pathName) {
                        iGaoShouApi.showReloadAssetPop(() => {
                            scmjUtil.loadAsset(pathName, type, callback, bn)
                        })
                    }
                } else {
                    bundle.load(pathName, type, (err, res) => {
                        if (err) {
                            if ("images/maJiang/mj" == pathName) {
                                iGaoShouApi.showReloadAssetPop(() => {
                                    scmjUtil.loadAsset(pathName, type, callback, bn)
                                })
                            }
                        } else {
                            callback(res)
                        }
                    })
                }
            })
        }
    }

    /** 按单个文件路径预加载资源 */
    export function preLoadAsset(pathName: string, type: typeof cc.Asset, bundleName?: string): any {
        let bn = bundleName ? bundleName : BUNDLE_NAME
        if ("images/maJiang/mj" == pathName) {
            bn = "hzxl_subpackage"
        }
        let bundle = cc.assetManager.getBundle(bn)
        if (bundle) {
            let asset = bundle.get(pathName, type)
            if (asset) {
            } else {
                bundle.load(pathName, type, (err, res) => {
                    if (err) {
                    } else {
                    }
                })
            }
        } else {
            cc.assetManager.loadBundle(bn, (err, bundle) => {
                if (err) {
                } else {
                    bundle.load(pathName, type, (err, res) => {
                        if (err) {
                        } else {
                        }
                    })
                }
            })
        }
    }

    export function playDiceAni(vecDices, parent, callback) {
        cc.log("playDiceAni")
        addGameRoundDiceBegin()
        this.loadAsset("images/dice/ani", cc.Texture2D, (res) => {
            if (!res) {
                addGameRoundDiceFail()
                callback()
                return
            }
            for (let key in vecDices) {
                let nPoint = vecDices[key]
                let sRect = cc.rect(0, 0, 900, 1932)
                let size = cc.size(0, 0)
                let offset = cc.v2(0, 0)
                let frames = []
                for (let i = 0; i < 9; ++i) {
                    size.width = 100
                    size.height = 322
                    let width = 100
                    let height = 322
                    let orgPoint = sRect.origin
                    let rect = cc.rect(orgPoint.x + ((nPoint - 1) * 9 + i) % 9 * 100, orgPoint.y + Math.floor(((nPoint - 1) * 9 + i) / 9) % 6 * 322, size.width, size.height)
                    frames[i] = new cc.SpriteFrame(res, rect, false, offset, size)
                }
                let nodeDice = new cc.Node();
                nodeDice.scale = 0.4
                nodeDice.name = 'NodeDice';
                let sprite = nodeDice.addComponent(cc.Sprite);
                sprite.spriteFrame = frames[8]
                nodeDice.parent = parent;
                nodeDice.x = (key == "1" ? -22 : 8)
                nodeDice.y = 125
                let animation = nodeDice.addComponent(cc.Animation);
                let clip = cc.AnimationClip.createWithSpriteFrames(frames, 9);
                clip.name = 'anim_dice';
                clip.wrapMode = cc.WrapMode.Default;
                clip.speed = 2
                animation.addClip(clip)
                if (key == "1") {
                    animation.on('finished', () => {
                        nodeDice.runAction(cc.sequence(cc.delayTime(1.0), cc.removeSelf(true)))
                    })
                } else {
                    animation.on('finished', () => {
                        nodeDice.runAction(cc.sequence(cc.delayTime(1.0), cc.callFunc(callback), cc.removeSelf(true)))
                    })
                }
                animation.play("anim_dice")
            }
            addGameRoundDiceEnd()
        },"hzxl_subpackage")
    }

    export function isCrak(card) {
        if (card >= CardIndex.CrakStart && card <= CardIndex.CrakEnd) {
            return true
        } else {
            return false
        }
    }

    export function isBam(card) {
        if (card >= CardIndex.BamStart && card <= CardIndex.BamEnd) {
            return true
        } else {
            return false
        }
    }

    export function isDot(card) {
        if (card >= CardIndex.DotStart && card <= CardIndex.DotEnd) {
            return true
        } else {
            return false
        }
    }

    export function sortLack(handcards, lack = -1, bSort?) {
        return handcards
        // console.log("sortLack lack = ", lack, handOrder)
        if (handcards[0] == -1) {
            return handcards
        }
        if (lack == -1) {
            handOrder = []
        }
        let lacks = []
        let laizis = []
        let crak = []
        let bam = []
        let dot = []

        for (let card of handcards) {
            let cardValue = parseInt(card / 10 + "")
            if (card == 41) {
                laizis.push(card)
            } else if (lack != -1 && cardValue == lack) {
                lacks.push(card)
            } else if (cardValue == LackType.CRAK) {
                crak.push(card)
            } else if (cardValue == LackType.BAM) {
                bam.push(card)
            } else if (cardValue == LackType.DOT) {
                dot.push(card)
            }
        }
        let temp = [crak, bam, dot]
        temp.sort(function (a, b) { return b.length - a.length })
        if (handOrder.length > 0) {
            for (let v of handOrder) {
                if (v == LackType.CRAK) {
                    for (let card of crak) {
                        laizis.push(card)
                    }
                } else if (v == LackType.BAM) {
                    for (let card of bam) {
                        laizis.push(card)
                    }
                } else if (v == LackType.DOT) {
                    for (let card of dot) {
                        laizis.push(card)
                    }
                }
            }
            for (let card of lacks) {
                laizis.push(card)
            }
            // console.log("sortLack return 222", lacks, laizis, crak, bam, dot)
        } else {
            for (let v of temp) {
                for (let card of v) {
                    laizis.push(card)
                }
            }
            for (let card of lacks) {
                laizis.push(card)
            }
            // console.log("sortLack return 111", lacks, laizis, crak, bam, dot)
        }
        if (handOrder.length == 0 && lack != -1 && bSort) {
            for (let v of temp) {
                for (let card of v) {
                    let cardValue = parseInt(card / 10 + "")
                    handOrder.push(cardValue)
                    break
                }
            }
            handOrder.push(lack)
            for (let i = 0; i < 3; i++) {
                if (-1 == handOrder.indexOf(i)) {
                    handOrder.push(i)
                }
            }
            let index = handOrder.indexOf(lack)
            if (2 != index) {
                handOrder.splice(index, 1)
                handOrder.push(lack)
            }
            console.log("handOrder = ", handOrder)
        }

        return laizis
    }

    export function fanConfig(fan): string {
        return HzxlLogic.getInstance().curGameIndependent.getFanConfig(fan)
    }

    export function opcodeConfig(op): string {
        return HzxlLogic.getInstance().curGameIndependent.getOpcodeConfig(op)
    }

    export function checkTypeConfig(type): string {
        switch (type) {
            case CheckType.ChaHuaZhu:
                return "查花猪"
            case CheckType.ChaDaJiao:
                return "查大叫"
            case CheckType.ChaTingTuiShui:
                return "查听退税"
            case CheckType.GangShangPaoTuiGang:
                return "呼叫转移"
            case CheckType.GangFenFanHuan:
                return "杠分返还"
            case CheckType.GenZhuang:
                return "跟庄"
            case CheckType.GenZhuangTuiFei:
                return "跟庄退费"
            case CheckType.MaGenGang:
                return "马跟杠"
        }
        return ""
    }

    export function isKong(op): boolean {
        switch (op) {
            case OperatorCode.OP_KONG:
            case OperatorCode.OP_KONG_TURN:
            case OperatorCode.OP_KONG_DARK:
                return true
        }
        return false
    }

    export function isHu(op): boolean {
        switch (op) {
            case OperatorCode.OP_HU_DIANPAO:
            case OperatorCode.OP_HU_ZIMO:
            case OperatorCode.OP_HU_AFTER_KONG_TURN:
                return true
        }
        return false
    }

    export function hex2color(hexColor: string) {
        const hex = hexColor.replace(/^#?/, "0x");
        const c = parseInt(hex);
        const r = c >> 16;
        const g = (65280 & c) >> 8;
        const b = 255 & c;
        return cc.color(r, g, b, 255);
    };

    //保留2位小数，如：2，还会保留2 不会补0
    export function toDecimal2NoZero(x) {
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        return s;
    }

    // 数字转换
    export function numberFormat2(value) {
        let param = null;
        param = {}
        let k = 10000,
            sizes = ['', '万', '亿', '万亿'],
            i;
        if (value < k) {
            param.value = value
            param.unit = ''
        } else {
            i = Math.floor(Math.log(value) / Math.log(k));

            param.value = ((value / Math.pow(k, i))).toFixed(2);
            param.value = toDecimal2NoZero(param.value)
            param.unit = sizes[i];
        }
        return param.value + param.unit;
    }

    export function FormatNumWYCN(num: number): string {
        if (num < 100000) {
            return num.toString()
        }
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
            return strHead + "wy"
        else if (len / 4 > 2)
            return strHead + "y"
        else if (len / 4 > 1)
            return strHead + "w"
        return strNum
    }

    export function FormatNumWYCN2(num: number): string {
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
            return strHead + "万亿"
        else if (len / 4 > 2)
            return strHead + "亿"
        else if (len / 4 > 1)
            return strHead + "万"
        return strNum
    }

    //设置对手信息
    export function setupAvatarImage(e, t) {
        if (t && e && e.isValid) {
            var n = e,
                o = n.getComponent(cc.Sprite),
                i = n.width,
                a = n.height;
            cc.assetManager.loadRemote(t, {
                ext: ".png"
            }, function (e, t: cc.Texture2D) {
                if (!e) {
                    var r = new cc.SpriteFrame(t);
                    if (n.isValid) {
                        o.spriteFrame = r;
                        n.setContentSize(i, a);
                    }
                }
            });
        }
    };

    export function addEnterGameScene(step: string = "") {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_41_MATCH)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add("进入游戏界面" + step)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_41_MATCH, "41")
        // }
    }

    // 第一局玩家匹配（准备等待环节）
    export function addGameRoundMatch() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_41_MATCH)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_41_MATCH)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_41_MATCH, "41")
        // }
    }

    // 第一局玩家匹配成功
    export function addGameRoundMatchSuccess() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_41_MATCH_SUCCESS)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_41_MATCH_SUCCESS)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_41_MATCH_SUCCESS, "411")
        // }
    }

    // 增加第一局、第二局开始游戏
    export function addGameRoundBeginGame() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_42_BEGIN_GAME)
        // if (track && track.length > 0) {
        //     track = parseInt(track)
        //     if (42 == track) {
        //         track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_51_BEGIN_GAME)
        //         if (track && track.length > 0) {
        //         } else {
        //             EventTrack.add(TrackNames.GAME_ROUND_51_BEGIN_GAME)
        //             cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_51_BEGIN_GAME, "51")
        //         }
        //     }
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_42_BEGIN_GAME)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_42_BEGIN_GAME, "42")
        // }
    }

    // 第一局牌局中-玩家手动选择换牌
    export function addGameRoundExchangeCards() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_421_EXCHANGE_CARDS)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_421_EXCHANGE_CARDS)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_421_EXCHANGE_CARDS, "421")
        // }
    }

    // 第一局牌局中-玩家手动定缺
    export function addGameRoundLack() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_422_LACK)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_422_LACK)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_422_LACK, "422")
        // }
    }

    // 第一局牌局中-玩家手动出牌
    export function addGameRoundChuPai() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_423_CHU_PAI)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_423_CHU_PAI)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_423_CHU_PAI, "423")
        // }
    }

    // 第一局牌局中-进入托管状态
    export function addGameRoundAutoOn() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_424_AUTO_ON)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_424_AUTO_ON)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_424_AUTO_ON, "424")
        // }
    }

    // 第一局牌局中-取消托管
    export function addGameRoundAutoOff() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_425_AUTO_OFF)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_425_AUTO_OFF)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_425_AUTO_OFF, "425")
        // }
    }

    // 第一局牌局中-手动返回大厅
    export function addGameRoundBackLobby() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_426_BACK_LOBBY)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_426_BACK_LOBBY)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_426_BACK_LOBBY, "426")
        // }
    }

    // 第一局牌局中-切换到后台
    export function addGameRoundHide() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_427_HIDE)
        // if (track && track.length > 0) {
        // } else {
        // EventTrack.add(TrackNames.GAME_ROUND_427_HIDE)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_427_HIDE, "427")
        // }
    }

    // 增加第一局、第二局结束游戏
    export function addGameRoundEndGame() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_43_END_GAME)
        // if (track && track.length > 0) {
        //     track = parseInt(track)
        //     if (43 == track) {
        //         track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_52_END_GAME)
        //         if (track && track.length > 0) {
        //         } else {
        //             EventTrack.add(TrackNames.GAME_ROUND_52_END_GAME)
        //             cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_52_END_GAME, "52")
        //         }
        //     }
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_43_END_GAME)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_43_END_GAME, "43")
        // }
    }

    // 第一局结算界面-返回大厅
    export function addGameRoundEndBackLobby() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_431_BACK_LOBBY)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_431_BACK_LOBBY)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_431_BACK_LOBBY, "431")
        // }
    }

    // 第一局结算界面-切换到后台
    export function addGameRoundEndHide() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_432_HIDE)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_432_HIDE)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_432_HIDE, "432")
        // }
    }

    // 增加第一局再来一局
    export function addGameRoundNextGame() {
        // let track = cc.sys.localStorage.getItem(TrackNames.GAME_ROUND_44_NEXT_GAME)
        // if (track && track.length > 0) {
        // } else {
        EventTrack.add(TrackNames.GAME_ROUND_44_NEXT_GAME)
        //     cc.sys.localStorage.setItem(TrackNames.GAME_ROUND_44_NEXT_GAME, "44")
        // }
    }

    // 增加骰子动画开始
    export function addGameRoundDiceBegin() {
        EventTrack.add(TrackNames.GAME_ROUND_DICE_BEGIN)
    }

    // 增加骰子动画结束
    export function addGameRoundDiceEnd() {
        EventTrack.add(TrackNames.GAME_ROUND_DICE_END)
    }

    // 定庄开始
    export function addGameRoundSetBankerBegin() {
        EventTrack.add(TrackNames.GAME_ROUND_SET_BANKER_BEGIN)
    }

    // 定庄结束
    export function addGameRoundSetBankerEnd() {
        EventTrack.add(TrackNames.GAME_ROUND_SET_BANKER_END)
    }

    // 发牌开始
    export function addGameRoundDealBegin() {
        EventTrack.add(TrackNames.GAME_ROUND_DEAL_BEGIN)
    }

    // 发牌结束
    export function addGameRoundDealEnd() {
        EventTrack.add(TrackNames.GAME_ROUND_DEAL_END)
    }

    // 增加骰子动画失败
    export function addGameRoundDiceFail() {
        EventTrack.add(TrackNames.GAME_ROUND_DICE_FAIL)
    }

    // 振动
    export function vibrate() {
        if (Util.GetVibrationVolume() == 1) {
            if (CC_JSB) {
            } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                wx.vibrateLong({ type: "heavy" })
            } else {
            }
        }
    }

    // 番型倍数配置
    export function FanRatioConfig(fan: number): number {
        return HzxlLogic.getInstance().curGameIndependent.getFanRatioConfig(fan)
    }
}
