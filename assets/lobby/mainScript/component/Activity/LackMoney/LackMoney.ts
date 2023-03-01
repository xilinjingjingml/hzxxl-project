import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { User } from "../../../../start/script/data/User";
import { Constants } from "../../../../start/script/igsConstants";
import { ExchangeSrv } from "../../../../start/script/system/ExchangeSrv";
import { Helper } from "../../../../start/script/system/Helper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LackMoney extends BaseUI {
	// UIMgr.OpenUI("component/Activity/LackMoney", { single: true, param: {needGold:100000} })

	// @property(dragonBones.ArmatureDisplay)
	// bgAni: dragonBones.ArmatureDisplay = null;
	// this.bgAni.playAnimation("newAnimation", 0)

	curBox: any = null
	typeId = 1
	isBuy = false
	onOpen() {
		console.log("LackMoney onOpen", this.param)
		this.registerEvent()
		this.initButton()

		let param = {
            typeId: this.typeId
        }
		ExchangeSrv.getExchangeTemplateInfo(param, (res) => {
			console.log("getExchangeTemplateInfo", res)
			let data = null
			if (cc.isValid(this.node) && res && res.code == "0000") {
                if (res.result) {
					res.result.sort((a, b) => {
						a.output_list[0].item_num = Number(a.output_list[0].item_num)
						b.output_list[0].item_num = Number(b.output_list[0].item_num)
						return a.output_list[0].item_num < b.output_list[0].item_num ? -1 : 1
					})
					for (let v of res.result) {
						// console.log("v.output_list[0].item_num", v.output_list[0].item_num)
					}
					for (let v of res.result) {
						if (v.output_list[0].item_id == DataMgr.data.Config.mainItemId && v.output_list[0].item_num >= this.param.needGold) {
							data = v
							break
						}
					}
                }
            }

			if (data) {
				this.curBox = data
				this.initData(data)
			}
		})
	}


	// LIFE-CYCLE CALLBACKS:
	protected start(): void {
        this.node.zIndex = 10
	}

	protected onDestroy(): void {
		this.param.callback && this.param.callback({ isBuy: this.isBuy, exchangeBox: this.curBox })
	}

	initButton() {
		this.setButtonClick("btnClose", this.node, () => {
			this.close()
		})

		this.setButtonClick("btnBuy", this.node, () => {
			this.onPressExchange()
		})
    }

	// 注册事件
	registerEvent() {
		// izx.on(SCMJ_EVENT.UPDATE_BILL, this.updateBill, this)
	}

	initData(data) {
		this.setLabelValue("tip", Helper.FormatNumWYCN(this.param.needGold - User.MainToken))
		this.setLabelValue("money", Helper.FormatNumWY(data.output_list[0].item_num))
		this.setLabelValue("btnBuy/Background/content/num", data.consume_list[0].item_num)
		let originalPrice = data.output_list[0].item_num / 10000
		this.setLabelValue("originalPrice", "原价：" + originalPrice + "钻石")
		let zhe = data.consume_list[0].item_num / originalPrice * 10
		let zheStr = "" + zhe
		zheStr = zheStr.substring(0, 3)
		this.setLabelValue("Discount/node/num", zheStr)
	}

	onPressExchange() {
		console.log("btnBuy on click")
		this.exchangeTemplateInfo(this.curBox)
		// let data = this.curBox
		// if (User.GameDiamond < data.consume_list[0].item_num) {
		// 	Helper.OpenTip("钻石不足")
		// } else {
		// 	if (cc.sys.WECHAT_GAME === cc.sys.platform) {
		// 		let weChatSession: any = DataMgr.getData("WeChatSession")
		// 		let systemInfo: any = WxProxyWrapper.getSystemInfoSync()
		// 		let param = {
		// 			id: data.id,
		// 			appid: DataMgr.data.Config.wxAPPID,
		// 			openid: weChatSession ? weChatSession.openid : null,
		// 			device_id: User.OpenID,
		// 			device_type: systemInfo ? systemInfo.model : "unknow",
		// 			address: User.Region,
		// 		}
		// 		console.log("param", param)
		// 		this.exchangeTemplateInfo(param, data)
		// 	} else {
		// 		let param = {
		// 			id: data.id,
		// 			device_id: User.OpenID,
		// 			device_type: PluginMgr.getDeviceName(),
		// 			address: User.Region,
		// 		}
		// 		console.log("param", param)
		// 		this.exchangeTemplateInfo(param, data)
		// 	}
		// }
	}

	exchangeTemplateInfo(box: any) {
		if (box) {
			Helper.exchangeTemplateInfo(box, (success) => {
				this.isBuy = success
				if (success) {
					this.close()
				}
			})
		}
    }
}
