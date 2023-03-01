import BaseUI from "../../../start/script/base/BaseUI";
import { User } from "../../../start/script/data/User";
import { Helper } from "../../../start/script/system/Helper";
import { PrivateRoomSrv } from "../../../start/script/system/PrivateRoomSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalBill extends BaseUI {
    @property(cc.Node)
    dateContent:cc.Node = null
    @property(cc.Node)
    dateItemPrefab:cc.Node = null
    @property(cc.Boolean)
    sigleToday: boolean = false

    dateIndex: number = 0

    pageStart = 0
    pageNum = 20

    dateList = [
        {name:"近7天", list:[]},
        {name:"近3天", list:[]},
        {name:"今天", list:[]},
        {name:"昨天", list:[]},
    ]

    dataList = []
    start() {
        this.dateItemPrefab.active = false
        this.dateContent.active = false

        for(let i=2;i<7;i++){
            let date = new Date(new Date().getTime()-i*86400*1000)
            this.dateList.push({name:(date.getMonth()+1)+"月"+date.getDate()+"日", list:[Number(Helper.FormatTimeString(new Date().getTime()-i*86400*1000, "yyyyMMdd"))]})
        }
        //近7天
        for(let i=0;i<7;i++){
            this.dateList[0].list.push(Number(Helper.FormatTimeString(new Date().getTime()-i*86400*1000, "yyyyMMdd")))
        }
        //近3天
        for(let i=0;i<3;i++){
            this.dateList[1].list.push(Number(Helper.FormatTimeString(new Date().getTime()-i*86400*1000, "yyyyMMdd")))
        }

        this.dateList[2].list.push(Number(Helper.FormatTimeString(new Date().getTime()-0*86400*1000, "yyyyMMdd")))
        this.dateList[3].list.push(Number(Helper.FormatTimeString(new Date().getTime()-1*86400*1000, "yyyyMMdd")))
        
        console.log("this.dateList", this.dateList)

        this.initData()
        this.initEvent()
        this.initButton()

        this.getListGameResult()
    }

    initEvent() {
       
    }

    initButton(){
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/total/btnDate", ()=>{
            this.dateContent.active = !this.dateContent.active
            this.setActive("node/total/btnDate/arrow_up", this.dateContent.active)
            this.setActive("node/total/btnDate/arrow_down", !this.dateContent.active)
        }, 0)
    }

    initData() {
        for(let i=0;i<this.dateList.length;i++){
            let itemNode = cc.instantiate(this.dateItemPrefab)
            itemNode.parent = this.dateContent
            itemNode.active = true
            this.setLabelValue("name", itemNode, this.dateList[i].name)

            this.setButtonClick("btn", itemNode, ()=>{
                this.dateContent.active = false
                this.dateIndex = i
                this.setLabelValue("node/total/btnDate/Background/Label", this.dateList[i].name)
                this.setActive("node/total/btnDate/arrow_up", this.dateContent.active)
                this.setActive("node/total/btnDate/arrow_down", !this.dateContent.active)

                this.pageStart = 0
                this.dataList = []
                this.setLabelValue("node/total/score", "总得分：" + 0)
                this.setChildParam("node/scrollView", {list: [], reload: true})                
                this.getListGameResult()
            })
        }
    }

    initContent(data:any){
        data.amount = data.amount || 0
        this.setLabelValue("node/total/score", "总得分：" + data.amount)
        this.setChildParam("node/scrollView", {list: this.dataList})
    }

    
    onScrollViewEvents(event: Event, eventType: cc.ScrollView.EventType, customEventData: string){        
        // console.log("onScrollViewEvents eventType", eventType)
        if(eventType == cc.ScrollView.EventType.BOUNCE_BOTTOM){
            this.getListGameResult()
        }
    }

    getListGameResult(){
        if(this.pageStart >=0){
            let param = {
                date_list:this.dateList[this.dateIndex].list, 
                start:this.pageStart, 
                num: this.pageNum
            }

            if(this.sigleToday){
                param.date_list = [Number(Helper.FormatTimeString(new Date().getTime()-0*86400*1000, "yyyyMMdd"))]
            }
            console.log("getListGameResult", param)
            PrivateRoomSrv.GetListGameResult(param, (res)=>{
                if(cc.isValid(this.node) && res){
                    this.pageStart = res.next_start
                    if(res.list && res.list.length > 0){
                        for(let v of res.list){
                            this.dataList.push(v)
                        }
                        this.initContent(res)                        
                    }

                    this.setActive("node/tip", this.dataList.length == 0)
                }
            })
        }
    }
}
