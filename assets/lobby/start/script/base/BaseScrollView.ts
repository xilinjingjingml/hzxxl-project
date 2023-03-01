import BaseUI from "../../../start/script/base/BaseUI";

const { ccclass, property } = cc._decorator;

interface IEventData {
    func: Function
    target: any
}
@ccclass
export default class BaseScrollView extends BaseUI{
    @property(cc.Node)
    content:cc.Node = null  //禁止使用cc.Layout
    @property(cc.Node)
    itemPrefab:cc.Node = null

    curOffsetY = 0      // 滑动偏移 距离顶部
    needSize = 0     //需求要求的高度/宽度
    visibleHeight:number = 0  //可视区域高度
    cachePool = [];// 移除的等待使用的item池
    showItemList = [];// 显示的item列表
    dataList = []
    showNum = 0  //可视区域显示的item数量-需要预加载的item数量
    miniIdx = 0
    _InitObjs = false

    todoList:IEventData[] = new Array()
    protected onLoad(): void {
        this.itemPrefab.active = false
        this.node.on("scrolling", this.onScrolling.bind(this), this)        
        this.visibleHeight = this.node.height
        this.showNum = Math.ceil(this.visibleHeight / this.itemPrefab.height) + 1
        this.showNum = this.showNum > 10 ? 10 : this.showNum
        this.showNum = this.showNum < 3 ? 3 : this.showNum

        let layout = this.content.getComponent(cc.Layout)
        if(layout){
            layout.enabled = false
        }

        let widget = this.content.getComponent(cc.Widget)
        if(widget){
            widget.enabled = false
        }
    }

    protected update(dt: number): void {
        if(this.todoList.length > 0){
            let todo = this.todoList[0]
            todo.func.apply(todo.target)
            this.todoList.splice(0,1)
        }
    }

    onScrolling() {
        let scrollOffset: cc.Vec2 = this.node.getComponent(cc.ScrollView).getScrollOffset();
        this.curOffsetY = scrollOffset.y
        this.refresh()
    }

    setParam(param: any): void {
        console.log("BaseScrollView",param)
        if(param.reload == true){
            while(this.showItemList.length > 0){
                this.showItemList[0].active = false
                this.cachePool.push(this.showItemList[0]);
                this.showItemList.splice(0, 1);
            }
            this.node.getComponent(cc.ScrollView).scrollToTop()
            this._InitObjs = false
            this.miniIdx = 0
        }

        if(param.list.length >= 0){
            this.dataList = param.list
            this.needSize = this.dataList.length*this.itemPrefab.height
            this.content.height = this.needSize

            if(param.list.length > 0){
                if(!this._InitObjs){
                    this._InitObjs = true
                    this.InitObjs()
                }
            }
        }
    }

    InitObjs(){
        if(this.showItemList.length == 0 && this.cachePool.length == 0){
            for(let i=0;i<this.showNum;i++){
                let func = ()=>{
                    let obj = cc.instantiate(this.itemPrefab);
                    obj.parent = this.content                
                    this.cachePool.push(obj)  
                }
                this.todoList.push({func:func, target: this})
            }
        }

        for(let i=0;i<this.showNum;i++){            
            let func = ()=>{
                this.refreshItem(i, i)
            }
            this.todoList.push({func:func,  target: this})
        }
    }

    refresh(){
        if(this.curOffsetY < 0 || Math.floor(this.curOffsetY + this.visibleHeight) > this.needSize){
            return
        }
        let miniIdx = Math.floor(this.curOffsetY / this.itemPrefab.height)
        let lastMinIdx = this.miniIdx
        if(this.miniIdx != miniIdx){
            let startY = -this.itemPrefab.height/2-miniIdx*this.itemPrefab.height
            let endY = -this.itemPrefab.height/2-(miniIdx+this.showNum)*this.itemPrefab.height            
            let deleteNodeUuIdList = [];
            let remainList = [];
            for(let i=0, len = this.showItemList.length; i<len; i++){
                let item = this.showItemList[i]
                if (item.position.y > startY || item.position.y <= endY) {
                    deleteNodeUuIdList.push(item.uuid);
                }
                else {
                    remainList.push(lastMinIdx + i)
                }
            }            

            let len = this.showItemList.length;
            for (let index = len - 1; index >= 0; index--)
            {
                let item = this.showItemList[index];
                if (deleteNodeUuIdList.indexOf(item.uuid) >= 0)
                {                    
                    this.cachePool.push(item);
                    this.showItemList.splice(index, 1);
                }
            }

            this.miniIdx = miniIdx
            for (let i = 0; i < this.showNum; i++) {
                let idx = this.miniIdx + i;
                if (remainList.indexOf(idx) < 0)
                {
                    this.refreshItem(idx, i);
                }
            }    
        }
    }

    refreshItemData(itemNode, data){
        this.setChildParam(itemNode, data)
    }

    private refreshItem(idx, objIdx) {
        let dataList = this.dataList
        if (idx < 0 || idx >= dataList.length)
            return;
        let obj = this.cachePool.pop();
        if (obj == null) {
            console.error("obj is null！idx=", idx);
            return;
        }

        let curX = 0;
        let curY = 0;
        curY = -this.itemPrefab.height/2 - this.itemPrefab.height * idx;

        
        obj.position = cc.v3(curX, curY);
        obj.active = true;
        this.refreshItemData(obj, dataList[idx]);

        this.showItemList.push(obj);
        this.showItemList.sort((a, b) => {
            return -a.position.y + b.position.y;
        })
    }
}