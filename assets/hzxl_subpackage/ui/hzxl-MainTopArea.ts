import { igs } from "../../igs";
import { PlatformApi } from "../../lobby/start/script/api/platformApi";
import { Helper } from "../../lobby/start/script/system/Helper";
import { AudioMgr } from "../hzxl-AudioMgr";
import { SCMJ_EVENT } from "../hzxl-Events";
import HzxlLogic from "../hzxl-logic";

let izx = igs.izx

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainTopArea extends cc.Component {
    @property(cc.Node)
    btnFoKa: cc.Node = null

    fokaCount = 0
    fokaTotalCount = 0
    
    protected start(): void {
        this.initData()
        this.initButton()
        this.registerEvent()
    }

    onDestroy() {
        izx.offByTag(this)
    }

    initData(){
        this.setFokaData()
    }

    initButton(){        
        izx.Button.bindButtonClick(this.btnFoKa, this.node, (sender, data) => {
            AudioMgr.playBtn()
            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)

            if(this.fokaTotalCount > this.fokaCount){
                Helper.OpenTip("还差" + (this.fokaTotalCount - this.fokaCount) + "局即可领取福卡礼包")
            }else{
                Helper.OpenTip("即将领取福卡礼包")
            }
        })
    }

    setFokaData(){
        if(!HzxlLogic.getInstance().bPivateRoom){
            PlatformApi.getFokaProess((res)=>{
                console.log("MainTopArea", res)
                if(res){
                    this.fokaCount = res.count
                    this.fokaTotalCount = res.total_count
                    cc.find("Background/progress/text", this.btnFoKa).getComponent(cc.Label).string = res.count + "/" + res.total_count
                    
                    let mask = cc.find("Background/progress/mask", this.btnFoKa)
                    let width = 0
                    if(res.count > 0 || res.total_count > 0){
                        width = cc.find("spt", mask).width*res.count/res.total_count
                    }
                    width = width > cc.find("spt", mask).width ? cc.find("spt", mask).width : width
                    mask.width = width
                }
            })
        }else{
            this.btnFoKa.active = false
        }
    }

    registerEvent() {
        izx.on(SCMJ_EVENT.ROUND_START_NOTI, this.setFokaData, this)

        izx.on(SCMJ_EVENT.SHOW_FOKA_TIP1, ()=>{
            if(!HzxlLogic.getInstance().bPivateRoom){
                let track = cc.sys.localStorage.getItem("FOKA_GIFT_TIP")
                if(!track){
                    cc.sys.localStorage.setItem("FOKA_GIFT_TIP", true)
                    let giftTip = cc.find("gift_tip", this.btnFoKa)
                    cc.tween(giftTip)
                        .delay(1)
                        .set({active: true})
                        .delay(3)
                        .call(()=>{
                            giftTip.active = false
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_FOKA_TIP2)
                        })
                        .start()
                }
            }
        }, this)
    }
}
