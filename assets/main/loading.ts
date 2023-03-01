import { igs } from "../igs";

/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2020-11-02 10:40:56
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-18 16:56:53
 */
let izx = igs.izx
let BaseUI = izx.BaseUI
const {ccclass, property} = cc._decorator;


@ccclass
export default class Loading extends BaseUI {
    @property(cc.Node)
    progressBar: cc.Node = null;
    @property(cc.Node)
    progressTipNode: cc.Node = null;
    @property(cc.Label)
    text: cc.Label = null;
    @property(cc.Node)
    progressHead: cc.Node = null;
    @property(cc.Button)
    btnFix:cc.Button = null

    preType:number = -1
    tetrisRandCache = [0,0,0,0]

    progresBarTimer = null
    progresCount = 0
    titlesCount = 0

    onLoad(){
        this.text.getComponent(cc.Label).string = "正在加载中..."
    }

    start () {
        this.schedule(() => {
            let type
            do {
                type = Math.floor(Math.random() * 4)
                if (this.preType != type && this.tetrisRandCache[type] < 1) {
                    this.preType = type
                    this.tetrisRandCache[type] += 1;
                } else {
                    type = false;
                }
            } while ( type === false );
    
            if (this.tetrisRandCache.every(function (n) {
                return n >= 1;
            })) {
                this.tetrisRandCache = [0, 0, 0, 0];
            }
        }, 1)

        let background = cc.find("background", this.node)
        let scale = cc.winSize.height / background.height
        if(scale < cc.winSize.width / background.width){
            scale = cc.winSize.width / background.width
        }
        background.scale = scale

        var titles = [
            "资源加载中，此过程不消耗流量",
            "正在打扫房间",
            "正在收拾牌桌",
            "正在准备就坐",
            "游戏马上开始",
        ]
        this.setProgresBar(0)
        // this.text.getComponent(cc.Label).string = titles[0]
        igs.on("load_asset_progress", (res)=>{
            console.log("load_asset_progress finish="+res.finish+"  res.total="+res.total+"  res.state="+res.state)
            let label = titles[0]
            if(res.state && titles[res.state-1]){
                label = titles[res.state-1]
            }
            if(res && res.finish > 0 && res.total > 0){
                this.setProgresBar(res.finish/res.total)
                label = label + " " + Math.floor(res.finish/res.total*100) + "%"
            }
            this.text.getComponent(cc.Label).string = label

            this.progressTipNode.active = false
            if(null == this.progresBarTimer){
                this.progresBarTimer = setInterval(()=>{
                    this.progresCount += Math.random()*20
                    let num = (this.progresCount > 100 ? 100 : this.progresCount)
                    this.setProgresBar(num/100)            
                    let label = titles[this.titlesCount]            
                    label = label + " " + (Math.floor(num)) + "%"            
                    this.text.getComponent(cc.Label).string = label
        
                    if(this.progresCount > 100){
                        this.progresCount = 0
                        this.titlesCount++
                        this.titlesCount = this.titlesCount >= titles.length ? 0 : this.titlesCount
                    }
                }, 80)
            }
        }, this)
    }

    setProgresBar(e) {
        this.progressBar.getComponent(cc.ProgressBar).progress = e
        if(e > 0){
            this.progressHead.x = this.progressBar.width*e - 40
        }
    };

    onDestroy() {
        super.onDestroy()
        this.unscheduleAllCallbacks()
        igs.offTarget(this)

        if (this.progresBarTimer) {
            clearTimeout(this.progresBarTimer)
            this.progresBarTimer = null
        }
    }

    onPressFix(){
        console.log("Loading onPressFix")
        igs.platform.trackEvent("点击游戏修复")
        if(cc.sys.WECHAT_GAME === cc.sys.platform){
            cc.assetManager.cacheManager.clearCache()
            // cc.game.restart()
            let wx = window["wx"]
            console.log("Loading onPressFix 1")
            if(wx){
                console.log("Loading onPressFix 2")
                wx.clearStorage({complete:()=>{                    
                    console.log("Loading onPressFix 3")
                    if(wx.restartMiniProgram){
                        wx.restartMiniProgram()
                    }else{
                        wx.showModal({
                            title: "微信版本过低",
                            content: "请更新最新版本微信后再试！",
                        })
                    }
                    console.log("Loading onPressFix 4")
                }})
            }
        }
    }

    onPressKF(){
        console.log("Loading onPressKF")
        if(cc.sys.WECHAT_GAME === cc.sys.platform){
            let wx = window["wx"]
            if(wx){                
                let param = {
                    game_gid: igs.exports.config.gameId,
                    pn: igs.exports.config.pn,
                    openid: ""
                }
                console.log("Loading onPressKF param", param)
                wx.openCustomerServiceConversation({
                    showMessageCard: true,
                    sendMessageTitle:"联系客服",
                    sendMessageImg:"https://download.mcbeam.cc/Image/custom_service.jpg",
                    sendMessagePath:"index?customParam=" + JSON.stringify(param),
                    success:(res)=>{
                        console.log("success res", res)                    
                    }})
            }
        }
    }
}
