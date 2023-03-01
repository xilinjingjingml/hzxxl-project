import BaseUI from "../../../start/script/base/BaseUI";
import { NewGateMgr } from "../../../start/script/base/NewGateMgr";
import { transport } from "../../../start/script/websocket-ts/transport";

import { EventMgr } from "../../../start/script/base/EventMgr";
import { Constants } from "../../../start/script/igsConstants";
import { User } from "../../../start/script/data/User";
import { PrivateRoomSrv } from "../../../start/script/system/PrivateRoomSrv";
import { Helper } from "../../../start/script/system/Helper";
let protobuf = window["protobuf"]

// // Common aliases
// var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// var ByteBuffer = require('bytebuffer')

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayVideo extends BaseUI {
    @property(cc.Node)
    roundContent: cc.Node = null
    @property(cc.Node)
    roundItemPrefab: cc.Node = null

    @property(cc.Color)
    selectColor: cc.Color = null
    @property(cc.Color)
    normalColor: cc.Color = null

    step = 0
    packageList: any[] = []

    stepTimer = null
    videoData = null
    onLoad() {
        this.node.zIndex = 3
        this.setActive("content/btnPlay", false)
        this.roundItemPrefab.active = false
        this.setRoundContentActivity(false)
    }

    start() {
        console.log("PlayVideo", this.param)

        this.videoData = this.param.videoData
        this.initButton()
        this.initEvent()
        this.initData(this.videoData)
        PrivateRoomSrv.GetDescGameResult({ room_id: this.videoData.room_id }, (res) => {
            console.log("GetDescGameResult res", res)
            if (cc.isValid(this.node)) {
                for (let v of res.rounds) {
                    let itemNode = cc.instantiate(this.roundItemPrefab)
                    itemNode.active = true
                    itemNode.parent = this.roundContent

                    this.setLabelValue("name", itemNode, "第" + v.index + "局")

                    this.setButtonClick("btn", itemNode, () => {
                        this.param.onChangeRounds?.(v.index)
                        this.setRoundContentActivity(false)
                        this.GetReplay(v.index)
                    })
                }
            }
        })
    }

    protected onDestroy(): void {
        this.stopStepTimer()
    }

    stopStepTimer() {
        if (this.stepTimer) {
            clearTimeout(this.stepTimer)
            this.stepTimer = null
        }
    }

    initEvent() {

    }

    initButton() {
        this.setButtonClick("content/btnClose", () => {
            this.param.onClose?.()
            if (cc.isValid(this.node)) {
                this.close()
            }
        })

        this.setButtonClick("content/btnRounds", () => {
            this.setRoundContentActivity(!this.roundContent.active)
        }, 0)

        this.setButtonClick("content/btnReplay", () => {
            this.param.onReplay?.()
            this.step = 0
            this.popPackage()
        })

        this.setButtonClick("content/btnPause", () => {
            this.stopStepTimer()
            this.setActive("content/btnPause", false)
            this.setActive("content/btnPlay", true)
        })

        this.setButtonClick("content/btnPlay", () => {
            this.popPackage()
            this.setActive("content/btnPause", true)
            this.setActive("content/btnPlay", false)
        })

        this.setButtonClick("content/btnSpeed", () => {
            this.popPackage(false)
        }, 0)
    }

    initData(res) {
        let buffer = []
        protobuf.util.base64.decode(res.data, buffer, 0)

        this.step = 0
        this.packageList = []
        this.decodePacket(buffer)

        this.setLabelValue("content/btnRounds/Background/Label", "第" + res.index + "局")
    }

    GetReplay(index) {
        let param = {
            room_id: this.videoData.room_id,
            round: index
        }
        PrivateRoomSrv.GetReplay(param, (res) => {
            if (cc.isValid(this.node)) {
                if (res.err) {
                    Helper.OpenTip("录像不存在")
                } else {
                    this.initData(res)
                }
            }
        })
    }

    decodePacket(data: any) {
        let offset = 0
        while (offset < data.length) {
            let length = data[offset + 0] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]
            offset += 4

            let buffer = []
            for (let i = 0; i < length; i++) {
                buffer.push(data[offset + i])
            }
            offset += length

            let dataAsArray = new Uint8Array(buffer)
            let msg = transport.Message.decode(dataAsArray)
            let route = msg.header["Micro-Route"]
            let userId = msg.header['Micro-UserId']
            if (userId == User.Data.openId) {
                this.packageList.push(buffer)
            }
        }

        this.updateStep()
        this.popPackage()
    }

    setRoundContentActivity(activity: boolean) {
        this.roundContent.active = activity
        this.setActive("content/btnRounds/Background/up", !this.roundContent.active)
        this.setActive("content/btnRounds/Background/down", this.roundContent.active)
    }

    updateStep() {
        this.setLabelValue("step", (this.step + 1) + "/" + this.packageList.length + "步")
    }

    popPackage(autoPlay = true) {
        if (this.step < this.packageList.length) {
            let buffer = this.packageList[this.step]
            let dataAsArray = new Uint8Array(buffer)
            let msg = transport.Message.decode(dataAsArray)
            let route = msg.header["Micro-Route"]
            let userId = msg.header['Micro-UserId']
            let data = NewGateMgr.decodePacket(route, msg.body)
            console.log("decodePacket route", userId, route, data)
            this.updateStep()
            this.step++

            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ON_DATA, data)

            this.stopStepTimer()
            if (autoPlay) {
                this.stepTimer = setTimeout(() => this.popPackage(), 200)
            }
            this.setActive("content/btnPause", autoPlay)
            this.setActive("content/btnPlay", !autoPlay)
        }
    }
}
