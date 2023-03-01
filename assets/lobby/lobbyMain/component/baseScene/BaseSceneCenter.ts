import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { PluginMgr } from "../../../start/script/base/PluginMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseSceneCenter extends BaseUI {
   @property(cc.Node)
   btnDisplayGame:cc.Node = null

   onLoad(){
      this.btnDisplayGame.active = false
   }

   start() {
      this.initData()
      this.initEvent()
      this.initButton()

      if(!Helper.isAudit() && this.btnDisplayGame && DataMgr.data.OnlineParam.display_game_icon){
         cc.assetManager.loadRemote(DataMgr.data.OnlineParam.display_game_icon, cc.Texture2D, (err, res: cc.Texture2D) => {
            if(res){
               this.getNode("Background", this.btnDisplayGame).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res)
               this.setLabelValue("Background/name", this.btnDisplayGame, DataMgr.data.OnlineParam.display_game_name)
               this.btnDisplayGame.active = true
               this.setButtonClick(this.btnDisplayGame, ()=>{
                  PluginMgr.navigateToMiniGame(DataMgr.data.OnlineParam.display_game_appid)
               })
            }
         })
      }
   }

   initEvent() {
   }

   initData() {
      let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
      console.log("matchInfo", matchInfo)
      if (matchInfo) {
         if (matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.MAJIONG_HZXL) >= 0
            || matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL) >= 0
            || matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.MAJIONG_XLCH) >= 0) {
            this.onPressHzxl()
         } else if (matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ) >= 0) {
            this.onPressXzhsz()
         } else if (matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL) >= 0) {
            this.onPressFk8hz()
         } else if (matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.DDZ_SANREN) >= 0
            || matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.DDZ_BXP) >= 0
            || matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.DDZ_QDZ) >= 0
            || matchInfo.labals.indexOf(Constants.GAME_TYPE_LABLE.DDZ_ERDDZ) >= 0) {
            this.onPressSanren()
         }
      }
   }

   initButton() {
      this.setButtonClick("right/room/hzxl", () => {
         this.onPressHzxl()
      })

      this.setButtonClick("right/room/fk8hz", () => {
         this.onPressFk8hz()
      })

      this.setButtonClick("right/room/xzhsz", () => {
         this.onPressXzhsz()
      })

      this.setButtonClick("right/room/xlhsz", () => {
         this.onPressXlhsz()
      })

      this.setButtonClick("right/room/sanren", () => {
         this.onPressSanren()
      })

      this.setButtonClick("right/room/btnPaiWei", () => {
         Helper.OpenTip("敬请期待")
      })

      this.setButtonClick("right/room/btnOtherGame", () => {
         UIMgr.OpenUI("component/OtherGames/OtherGames", { single: true, param: {} })
      })

      this.setButtonClick("right/room/btnMore", () => {
         UIMgr.OpenUI("component/MoreGame/MoreGame", { single: true, param: {} })
      })

      this.setButtonClick("right/room/btnJoinRoom", () => {
         UIMgr.OpenUI("component/PrivateRoom/JoinRoom", { single: true })
      })

      this.setButtonClick("right/room/btnCreateRoom", () => {
         UIMgr.OpenUI("component/PrivateRoom/PrivateRoom", { single: true })
      })

      this.setButtonClick("right/room/btnHaoyoufang", () => {
         // 好友房界面
         UIMgr.OpenUI("component/PrivateRoom/PrivateRoomPop", {single:true, param:{}})
      })
   }

   setParam(param: any) {
      this.param = param
      if(this.param.param && this.param.param.gameLabel){
         this.setChildParam("btnQuickGame", { label: this.param.param.gameLabel })
      }
   }

   onPressHzxl() {
      let labels = [
         Constants.GAME_TYPE_LABLE.MAJIONG_HZXL,
         Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL,
         Constants.GAME_TYPE_LABLE.MAJIONG_XLCH,
         Constants.GAME_TYPE_LABLE.GDMJ_TDH
      ]
      UIMgr.OpenUI("component/GameSession/GameSession", { single: true, param: { labels: labels } })
   }

   onPressXzhsz() {
      UIMgr.OpenUI("component/GameSession/GameSession", { single: true, param: { labels: [Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ] } })
   }

   onPressFk8hz() {
      UIMgr.OpenUI("component/GameSession/GameSession", { single: true, param: { labels: [Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL] } })
   }

   onPressXlhsz() {
      UIMgr.OpenUI("component/GameSession/GameSession", { single: true, param: { labels: [Constants.GAME_TYPE_LABLE.MAJIONG_XLCH] } })
   }

   onPressSanren() {
      let labels = [
         Constants.GAME_TYPE_LABLE.DDZ_BXP,
         Constants.GAME_TYPE_LABLE.DDZ_SANREN,
         Constants.GAME_TYPE_LABLE.DDZ_QDZ,
         Constants.GAME_TYPE_LABLE.DDZ_ERDDZ
      ]
      UIMgr.OpenUI("component/GameSession/GameSession", { single: true, param: { labels: labels } })
   }
}
