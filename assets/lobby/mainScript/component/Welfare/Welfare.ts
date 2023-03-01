import BaseUI from "../../../start/script/base/BaseUI";
import { User } from "../../../start/script/data/User";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";




const { ccclass, property } = cc._decorator;

@ccclass
export default class Welfare extends BaseUI {
    @property(cc.Node)
    zhuanPan: cc.Node = null
    @property(cc.Node)
    qianDao: cc.Node = null
    @property(cc.Node)
    kanShiPin: cc.Node = null
    @property(cc.Node)
    jinBiBuZhu: cc.Node = null
    
    activityList:any[] = new Array()
    onOpen() {
        console.log("Welfare openId", User.Data.openId)
        ActivitySrv.GetActivityConfig(0, (res)=>{
            console.log("GetActivityConfig",res)
            if(res){
                for(let v of res){
                    if(v.activity_id == 3 || v.activity_id == 4  || v.activity_id == 9 || v.activity_id == 8){
                        this.activityList.push(v)
                    }
                }
                this.initData()
            }
        })
        this.initEvent()
        this.initButton()
    }

    initEvent() {
       
    }

    initButton(){
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })
    }

    initData() {        
        for(let v of this.activityList){       
            if(v.activity_id == 3){
                this.setChildParam(this.kanShiPin, v)
            }else if(v.activity_id == 4){   
                this.setChildParam(this.zhuanPan, v)
            }else if(v.activity_id == 9){
                this.setChildParam(this.jinBiBuZhu, v)                
            }else if(v.activity_id == 8){
                this.setChildParam(this.qianDao, v)                
            }           
        }
    }

    onChangePage(page: number){
        
    }
}
