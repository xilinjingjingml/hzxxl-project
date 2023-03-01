import BaseUI from "../../../../start/script/base/BaseUI";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { WxProxyWrapper } from "../../../../start/script/pulgin/WxProxyWrapper";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";



const { ccclass, property } = cc._decorator;

@ccclass
export default class Subscribe extends BaseUI {
    onOpen() {
        console.log("Subscribe onOpen", this.param)
        this.initButton()
        this.initData()
        this.runTween("topArrow", cc.tween().repeatForever(cc.tween().by(.5, {x: 20}).delay(.1).by(.2, {x: -20})))
    }

    initEvent() {

    }

    protected onDestroy(): void {
    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/btnGetaward", ()=>{
            this.onPressGetAward()
        })
    }


    initData() {        
        let res = ActivitySrv.GetActivityById(1012)
        console.log("Subscribe initData", res)
        if(res){
            this.setLabelValue("node/jinbi/num", "金币:"+res.weight[0].rewards[0].min_num)
            this.setLabelValue("node/zuanshi/num", "钻石:"+res.weight[0].rewards[1].min_num)
        }

        if(cc.sys.WECHAT_GAME === cc.sys.platform){
            let id = WxProxyWrapper.getLaunchOptionsSync()  
            // WxProxyWrapper.getPhonePlatform((system) => {        
                if (id === 1023 || id === 1001 || id === 1089 || id === 1103 || id === 1104) {
                    this.setButtonInfo("node/btnGetaward", { interactable: true })
                } else {
                    this.setButtonInfo("node/btnGetaward", { interactable: false })
                }
            // })
        }
    }

    onPressGetAward() {
        ActivitySrv.GetReward(1012, (res) => {
            UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res.award_item }, closeCb: ()=>{
                this.close()
                EventMgr.dispatchEvent(Constants.EVENT_DEFINE.SUBSCRIBE_UPDATE)
            } })
        })
    }
}
