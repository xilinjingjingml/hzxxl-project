import { igs } from "../../../../igs";
import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { MemberSrv } from "../../../start/script/system/MemberSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseSceneLeft extends BaseUI {
   @property(cc.Node)
   btnWeekCard: cc.Node = null
   @property(cc.Node)
   btnFirstBox: cc.Node = null
   @property(cc.Node)
   btnZhuanPan: cc.Node = null
   @property(cc.Node)
   btnYaoJinBi: cc.Node = null
   @property(cc.Node)
   btnMianFeiJinBi: cc.Node = null
   @property(cc.Node)
   btnChaoJiZheKou: cc.Node = null
   @property(cc.Node)
   btnSubscribe: cc.Node = null
   start() {
      this.initData()
      this.initEvent()
      this.initButton()

      // this.getNode("content").x += igs.exports.safeArea.left
      console.log("igs.exports.safeArea", igs.exports.safeArea)
   }
   initEvent() {

      if(Helper.IsDDZGame()){
         EventMgr.on("FIRST_CHAGE_CLOSE", this.checkFirstBoxShow, this)
      }
      
      EventMgr.on(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, () => {
         this.checkZhuanPanShow()
         this.checkFreeGoldShow()
      }, this)

      EventMgr.on(Constants.EVENT_DEFINE.REFRESH_ACTIVITY_ROOLED_CONINS, () => {
         this.checkYaoJinBiShow()
      }, this)

      EventMgr.on(Constants.EVENT_DEFINE.SUBSCRIBE_UPDATE, () => {
         this.checkSubscribeShow()
      }, this)

      igs.on(igs.consts.Event.IGS_SAFEAREA_CHANGED, () => {
         console.log("IGS_SAFEAREA_CHANGED igs.exports.safeArea", igs.exports.safeArea)
      }, this)
   }

   initData() {
      this.checkWeekCardShow()
      this.checkFirstBoxShow()
      this.checkZhuanPanShow()
      this.checkYaoJinBiShow()
      this.checkFreeGoldShow()
      this.checkChaoJiZheKouBoxShow()
      this.checkSubscribeShow()

      if(Helper.IsDDZGame()){
         // this.setActive(this.btnFirstBox, false)
         this.setActive(this.btnYaoJinBi, false)
         this.setActive(this.btnChaoJiZheKou, false)
         this.setActive(this.btnSubscribe, false)
      }
   }

   initButton() {
      this.setButtonClick(this.btnWeekCard, () => {
         UIMgr.OpenUI("component/WeeksCard/WeeksCard", {
            single: true, param: {}, closeCb: () => {
               this.checkWeekCardShow()
            }
         })
      })

      this.setButtonClick(this.btnFirstBox, () => {
         if (Helper.IsDDZGame()) {
            let boxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if (boxes && boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
               for (let idx in boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
                  let firstBox = boxes[Constants.SHOP_TYPE.FIRST_PAY][idx]
                  if (firstBox.name == "大厅首充礼包" && !firstBox.isBuy) {
                     UIMgr.OpenUI("component/FirstChargeBox/FirstChargeBox", {
                        index: 99, param: {
                           shopBoxInfo: firstBox,
                           checkQueue: true,
                           isInLobby: true,
                        }
                     })
                     return;
                  }
               }
            }
         } else {
            UIMgr.OpenUI("component/Activity/FirstBox", {
               single: true, param: {}, closeCb: () => {
                  this.checkFirstBoxShow()
               }
            })
         }

      })

      this.setButtonClick(this.btnZhuanPan, () => {
         UIMgr.OpenUI("component/Activity/SlyderAdventures/SlyderAdventures", {
            single: true, param: {}, closeCb: () => {
               this.checkZhuanPanShow()
            }
         })
      })

      this.setButtonClick(this.btnYaoJinBi, () => {
         UIMgr.OpenUI("component/Activity/RolledCoins/RolledCoins", { single: true, param: {} })
      })

      this.setButtonClick(this.btnMianFeiJinBi, () => {
         UIMgr.OpenUI("component/Activity/FreeGold/FreeGold", {
            single: true, param: {}, closeCb: () => {
               this.checkFreeGoldShow()
            }
         })
      })

      this.setButtonClick(this.btnChaoJiZheKou, () => {
         let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
         if(boxs && boxs[Constants.SHOP_TYPE.PREFERENCE]) {
            UIMgr.OpenUI("component/Activity/discount/DiscountBox", {
               single: true, param: {}, closeCb: () => {
                  this.checkChaoJiZheKouBoxShow()
               }
            })
         }
      })

      this.setButtonClick(this.btnSubscribe, () => {
         UIMgr.OpenUI("component/Activity/Subscribe/Subscribe", { single: true, param: {} })
      })
   }

   //周卡显示检查
   checkWeekCardShow() {
      if (Helper.isAudit()){
         this.btnWeekCard.active = false
      }else{
         this.setActive("red", this.btnWeekCard, false)
         let vipCardInfo = MemberSrv.getMemberInfo()
         let nowTime = new Date().getTime()/1000    
         let today = Number(Helper.FormatTimeString(new Date().getTime(), "yyyyMMdd"))
         for(let v of vipCardInfo){
            console.log("vipCardInfo", v)
            if(v.invalid_date > nowTime){                              
               if(today != v.receive_date){
                  this.setActive("red", this.btnWeekCard, true)
               }
            }
         }
      }
   }

   //首充礼包显示检查
   checkFirstBoxShow() {
      this.setActive(this.btnFirstBox, false)
      if (Helper.isAudit() == false && DataMgr.data.OnlineParam.firstbox !== 0) {
         let boxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
         if (boxes && boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
            for (let idx in boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
               if (!boxes[Constants.SHOP_TYPE.FIRST_PAY][idx].isBuy) {
                  this.setActive(this.btnFirstBox, true)
               }
            }
         }
      }
   }

   //转盘显示检查
   checkZhuanPanShow() {
      this.btnZhuanPan.active = false
      if (DataMgr.data.OnlineParam.zhuanpan !== 0) {
         this.btnZhuanPan.active = true
      }

      this.setActive("red", this.btnZhuanPan, false)
      // let res = ActivitySrv.GetActivityById(4)
      // if(res){
      //    if (res.day_times && res.receive_num && res.receive_num >= res.day_times){
      //       this.setActive("red", this.btnZhuanPan, false)
      //    }else{
      //       this.setActive("red", this.btnZhuanPan, true)
      //    }
      // }   
   }

   //摇金币显示检查
   checkYaoJinBiShow() {
      this.btnYaoJinBi.active = false
      if (Helper.isAudit() == false && DataMgr.data.OnlineParam.yaojinbi !== 0) {
         this.btnYaoJinBi.active = true
         this.setActive("red", this.btnYaoJinBi, false)
         // RolledCoinsSrv.GetConfig(true, (res)=>{
         //    if(res.day_times-res.receive_num){
         //       this.setActive("red", this.btnYaoJinBi, true)
         //    }
         // })
      }
   }

   checkFreeGoldShow() {
      // this.setActive("red", this.btnMianFeiJinBi, false)
      this.setActive(this.btnMianFeiJinBi, false)
      if (DataMgr.data.OnlineParam.freegold !== 0) {
         this.setActive(this.btnMianFeiJinBi, true)
         let res = ActivitySrv.GetActivityById(3)
         if (res) {
            if (res.day_times && res.receive_num && res.receive_num >= res.day_times) {
               this.setActive(this.btnMianFeiJinBi, false)
            } else {
               this.setActive(this.btnMianFeiJinBi, true)
            }
         }
      }
   }

   //超级折扣显示检查
   checkChaoJiZheKouBoxShow() {
      this.btnChaoJiZheKou.active = false

      this.setActive("red", this.btnChaoJiZheKou, false)
      if (Helper.isAudit() === false && DataMgr.data.OnlineParam.chaojizhekou !== 0) {
         this.btnChaoJiZheKou.active = true
         // let boxList:IShopInfo[] = []
         // let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
         // if(!boxs){
         //    return
         // }
         // for(let k in boxs[Constants.SHOP_TYPE.PREFERENCE]){
         //    if(boxs[Constants.SHOP_TYPE.PREFERENCE][k].param && boxs[Constants.SHOP_TYPE.PREFERENCE][k].param.show_in_discount == 1){
         //          boxList.push(boxs[Constants.SHOP_TYPE.PREFERENCE][k])
         //    }
         // }
         // console.log("checkChaoJiZheKouBoxShow boxList", boxList)
         // for(let box of boxList){
         //    if(!box.isBuy){
         //       this.setActive("red", this.btnChaoJiZheKou, true)
         //       break
         //    }
         // }
      }
   }

   //订阅有礼按钮
   checkSubscribeShow() {
      this.setActive(this.btnSubscribe, false)
      if (DataMgr.data.OnlineParam.dingyu !== 0) {
         let ret = false
         let res = ActivitySrv.GetActivityById(1012)
         if (res) {
            if (res.receive_num < res.day_times) {
               ret = true
            }
         }
         this.setActive(this.btnSubscribe, ret)
         this.setActive("red", this.btnSubscribe, false)
      }
   }
}
