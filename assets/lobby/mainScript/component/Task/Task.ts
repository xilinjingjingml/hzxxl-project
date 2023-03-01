import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { Constants } from "../../../start/script/igsConstants";
import { TaskSrv } from "../../../start/script/system/TaskSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Task extends BaseUI {
    listContent: cc.Node = null
    taskNodePrefab: cc.Node = null
    taskItemList: {info: any, node:cc.Node}[] = new Array()
    boxContent: cc.Node = null
    dataList = null
    onOpen() {
        console.log("Task onOpen", this.param)
        this.initButton()
        this.initEvent()
        this.listContent.removeAllChildren()
        TaskSrv.GetTaskList((res) => {
            if (res.list) {
                this.initData(res.list)
            }
        })
    }

    protected start(): void {
        this.boxContent = cc.find("node/boxContent", this.node)
        this.listContent = cc.find("node/scrollView/view/content", this.node)
        this.taskNodePrefab = cc.find("node/scrollView/view/content/item", this.node)
        this.taskNodePrefab.active = false
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.TASK_UPDATE, (res)=>{
            if (res.list) {
                if(this.dataList){
                    for (let v of res.list) {
                        for (let i=0; i<this.dataList.length; i++) {
                            if(v.group_id == this.dataList[i].group_id){
                                this.dataList[i] = v
                            }
                        }
                    }
                    this.setChildParam("node/scrollView", {list: this.dataList})
                }
            }
        }, this)

        EventMgr.on(Constants.EVENT_DEFINE.TASK_CLOSE, (res)=>{
            this.close()
        }, this)
    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/btnCloseBoxContent", ()=>{
            this.boxContent.active = false
            this.setActive("node/btnCloseBoxContent", false)
        })
        

        for(let i=1;i<6;i++){
            this.setButtonClick("node/total/box"+i+"/btn", ()=>{
                console.log("i",i)
                console.log("x",cc.find("node/total/box"+i, this.node).x)
                this.setBoxTipContent({}, cc.find("node/total/box"+i, this.node).x)
            })
        }
    }

    initData(list: any) {   
        console.log("Task initData", list)     
        //排序
        for(let v of list){
            switch (v.status) {
                case 0:
                    v.sort_id = 1
                    break
                case 1:
                    v.sort_id = 0              
                    break
                case 2:
                    v.sort_id = 2
                    break
            }
        }
        list = list.sort((a, b) =>{
            return a.sort_id - b.sort_id
        })
        this.dataList = list 
        this.setChildParam("node/scrollView", {list: this.dataList})
    }

    setBoxTipContent(boxInfo: any, x: number){
        this.boxContent.active = true
        this.setActive("node/btnCloseBoxContent", true)
        this.boxContent.x = x
    }
}
