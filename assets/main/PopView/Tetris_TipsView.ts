
const {ccclass, property} = cc._decorator;

@ccclass
export class Tetris_TipsView extends cc.Component {

    @property(cc.Button)
    btnExitGame:cc.Button = null;
    @property(cc.Button)
    btnClose:cc.Button = null;

    @property(cc.Label)
    labelTitle:cc.Label = null;
    @property(cc.Label)
    labelCont:cc.Label = null;

    @property(cc.Label)
    labelBtnSure:cc.Label = null;
    @property(cc.Label)
    labelBtnCancel:cc.Label = null;



    funcSure:Function = null;
    funcCancel:Function = null;

    start () {

        this.btnExitGame.node.on("click", this.ClickSure, this);
        this.btnClose.node.on("click", this.CloseView, this);

    }

    /**
     * 设置提示弹框的属性
     * @param strTitle 标题文字
     * @param strCont 正文文字
     * @param strSure 确定按钮的文字
     * @param strCancel 取消按钮的文字
     * @param funcSure 点击确定的回调
     * @param funcCancel 点击取消的回调
     */
    InitTipsViewData(strTitle ?:string, strCont ?:string, strSure ?:string, strCancel ?:string, funcSure ?:Function, funcCancel ?:Function, btnNum = 2)
    {
        this.btnClose.node.active = true;
        this.btnClose.node.x = -100;
        this.btnExitGame.node.active = true;
        this.btnExitGame.node.x = 100;
        if(btnNum == 1)
        {
            this.btnClose.node.active = false;
            this.btnExitGame.node.active = true;
            this.btnExitGame.node.x = 0
        }
        if(strTitle)
        {
            this.labelTitle.string = strTitle;
        }
        if(strCont)
        {
            this.labelCont.string = strCont;
        }
        if(strSure)
        {
            this.labelBtnSure.string = strSure;
        }
        if(strCancel)
        {
            this.labelBtnCancel.string = strCancel;
        }

        this.funcSure = funcSure;
        this.funcCancel = funcCancel;
    }

    // update (dt) {}
    CloseView()
    {
        if(this.funcCancel)
        {
            this.funcCancel();
        }
        TipsViewNManager.RemovePopView();
    }

    ClickSure()
    {
        if(this.funcSure)
        {
            this.funcSure();
        }

        TipsViewNManager.RemovePopView();
    }
}

class TipsView {

    bLoadingPrefab: boolean = false; //  是不是在加载prefab中

    bStopShowPop: boolean = false;       //如果加载prefab时

    prefabPopView: cc.Prefab = null;
    nodePopView: cc.Node = null;


    /**
     * 设置提示弹框的属性
     * @param strTitle 标题文字
     * @param strCont 正文文字
     * @param strSure 确定按钮的文字
     * @param strCancel 取消按钮的文字
     * @param funcSure 点击确定的回调
     * @param funcCancel 点击取消的回调
     * @param btnNum 显示的按钮个数, 只有1个时只需要显示确定按钮
     */
    ShowTipsView(strTitle ?: string, strCont ?: string, strSure ?: string, strCancel ?: string, funcSure ?: Function, funcCancel ?: Function, btnNum:number = 2)
    {
        if (this.nodePopView)
        {
            console.error("nodePopView已存在, 不用多次显示!!!!!!!!!!!");
            return;
        }
        if (!this.prefabPopView)
        {
            this.bLoadingPrefab = true;
            cc.resources.load("PopView/nodePopView", cc.Prefab, (err, prefab: cc.Prefab) =>
            {
                if (err)
                {
                    console.error("加载弹框失败!!!!!!!!!!!", err);
                    return;
                }
                if (this.bStopShowPop)
                {
                    console.error("加载时就已经不让显示了!!!!!!!!!");
                    this.bStopShowPop = false;
                    return;
                }
                this.prefabPopView = prefab;
                this.AddViewToScene(strTitle, strCont, strSure, strCancel, funcSure, funcCancel, btnNum);
                this.bLoadingPrefab = false;
            })
        }
        else
        {
            this.AddViewToScene(strTitle, strCont, strSure, strCancel, funcSure, funcCancel, btnNum);
        }
    }

    AddViewToScene(strTitle ?: string, strCont ?: string, strSure ?: string, strCancel ?: string, funcSure ?: Function, funcCancel ?: Function, btnNum:number = 2)
    {
        this.nodePopView = cc.instantiate(this.prefabPopView);
        // 放到最高层
        cc.director.getScene().addChild(this.nodePopView, cc.macro.MAX_ZINDEX);
        this.nodePopView.position = cc.v3(cc.winSize.width / 2, cc.winSize.height / 2)

        this.nodePopView.getComponent(Tetris_TipsView).InitTipsViewData(strTitle, strCont, strSure, strCancel, funcSure, funcCancel, btnNum)
    }


    RemovePopView()
    {
        if (this.bLoadingPrefab)
        {
            this.bStopShowPop = true;
        }
        if (this.nodePopView)
        {
            this.nodePopView.removeFromParent();
            this.nodePopView.destroy();
            this.nodePopView = null;
        }
    }


}
export let TipsViewNManager = new TipsView()

// @ts-ignore
window.TipsViewNManager11 = TipsViewNManager;


// setTimeout(()=>
// {
//     TipsViewNManager.ShowTipsView(null, null, null, null, ()=>
//     {
//         izx.dispatchEvent("BACKTOLOBBY", {})
//     });
// }, 5000)