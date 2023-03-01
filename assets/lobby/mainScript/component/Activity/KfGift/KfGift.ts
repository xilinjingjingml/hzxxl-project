/**
 * Creator by Jin on 2022.3.17
*/

import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { User } from "../../../../start/script/data/User";
import { Constants } from "../../../../start/script/igsConstants";
import { WxProxyWrapper } from "../../../../start/script/pulgin/WxProxyWrapper";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { Helper } from "../../../../start/script/system/Helper";
import { ScribeSrv } from "../../../../start/script/system/ScribeSrv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class KfGift extends BaseUI {

    onLoad(): void {
        
    }

    protected start(): void {
        this.initButton()
        this.initData()
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{this.close()})

        this.setButtonClick("node/btnGet", this.node, ()=>{
            let param = {
                game_gid: DataMgr.data.Config.gameId,
                pn: DataMgr.data.Config.pn,
                openid: User.OpenID
            }
            WxProxyWrapper.openCustomerServiceConversation({
                showMessageCard: true,
                sendMessageTitle:"领金币",
                sendMessageImg:"https://download.mcbeam.cc/Image/free_coin.jpg",
                sendMessagePath:"index?freeCoin=" + JSON.stringify(param),
                success:(res)=>{
                    console.log("success res", res)
                    if(res.path.length > 0){
                        let config = ActivitySrv.GetActivityById(11)
                        if (config && config.receive_num < config.day_times) {
                            ActivitySrv.OnClickActivity(config, ()=>{
                                if(cc.isValid(this.node)){
                                    this.close()
                                }
                            })
                        }
                    }
                }
            })
        })
    }

    onClose(): void {
        
    }

    initData(){
       
    }
}
