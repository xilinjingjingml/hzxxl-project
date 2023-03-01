import BaseUI from "../../../start/script/base/BaseUI";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RuleDetails extends BaseUI {
    @property(cc.Node)
    tabToggleContent:cc.Node = null
    @property(cc.Node)
    tabTogglebPrefab:cc.Node = null
    @property(cc.RichText)
    ruleLabel:cc.RichText = null
    @property(cc.ScrollView)
    contentScrollView:cc.ScrollView = null

    @property(cc.Node)
    titleToggleContent:cc.Node = null
    @property(cc.Node)
    titleTogglebPrefab:cc.Node = null

    curGame = ""
    showTab = 0

    gameRule = null
    onLoad(){
        this.titleTogglebPrefab.active = false
    }

    protected start(): void {
        console.log("RuleDetails onOpen", this.param)
        if(Helper.IsDDZGame()){
            this.gameRule = this.gameDDZ
            this.param.label = "ddz"
        }else{
            this.gameRule = this.gameName
        }
        this.tabTogglebPrefab.active = false
        this.initButton()
        this.initEvent()
        this.initData()
    }

    initEvent() {

    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })
    }
    
    initData(){
        let findGame = false
        for(let v in this.gameRule){
            if(this.param.label.indexOf(v) >= 0){
                findGame = true
                break
            }
        }

        let curGame = false
        for(let v in this.gameRule){
            let toggle = cc.instantiate(this.tabTogglebPrefab)
            toggle.parent = this.tabToggleContent
            toggle.active = true
            this.setLabelValue("Background/name", toggle, this.gameRule[v].name)
            this.setLabelValue("checkmark/name", toggle, this.gameRule[v].name)
            if(findGame){
                if(!curGame && this.param.label.indexOf(v) >= 0){
                    curGame = true
                    toggle.getComponent(cc.Toggle).isChecked = true                
                    this.onChangeGame(v)
                }
            }else if(!curGame){
                curGame = true
                toggle.getComponent(cc.Toggle).isChecked = true                
                this.onChangeGame(v)
            }

            this.setToggleClick(toggle, ()=>{
                this.onChangeGame(v)
            })
        }
    }

    onChangeGame(game: string){
        if(this.curGame == game){
            return
        }        

        this.curGame = game

        this.titleToggleContent.removeAllChildren()
        if(this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL || this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL){
            game = Constants.GAME_TYPE_LABLE.MAJIONG_HZXL
        }if(this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ){
            game = Constants.GAME_TYPE_LABLE.MAJIONG_XLCH
        }
        for(let i=0;i<this.gameRule[game].rule.length;i++){
            let rule = this.gameRule[game].rule[i]
            let tab = cc.instantiate(this.titleTogglebPrefab)
            tab.active = true
            tab.parent = this.titleToggleContent
            this.setLabelValue("Background/Label", tab, rule.tab)
            this.setLabelValue("checkmark/Label", tab, rule.tab)

            this.setToggleClick(tab, ()=>{
                this.onChangeTab(i)
            })

            if(i==this.showTab){
                tab.getComponent(cc.Toggle).isChecked = true
                this.onChangeTab(i)
            }
        }
    }

    onChangeTab(showTab:number){
        this.showTab = showTab
        this.contentScrollView.stopAutoScroll()
        this.contentScrollView.scrollToTop()
        if(this.gameRule[this.curGame].rule && this.gameRule[this.curGame].rule[showTab] && this.gameRule[this.curGame].rule[showTab].desc){            
            this.setRuleLabel(this.gameRule[this.curGame].rule[showTab].desc)
        }else{
            if(showTab == 0){
                if(this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL || this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL){
                    let text = this.gameRule[Constants.GAME_TYPE_LABLE.MAJIONG_HZXL].rule[showTab].desc
                    if(this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL){
                        text = text.replace("4张红中", "6张红中")
                        text = text.replace("4个红中", "6个红中")
                    }else if(this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL){
                        text = text.replace("4张红中", "8张红中")
                        text = text.replace("4个红中", "8个红中")
                    }
                    this.setRuleLabel(text)
                }
            }else{
                if(this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL || this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL){
                    this.setRuleLabel(this.gameRule[Constants.GAME_TYPE_LABLE.MAJIONG_HZXL].rule[showTab].desc)
                }else if(this.curGame == Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ){
                    this.setRuleLabel(this.gameRule[Constants.GAME_TYPE_LABLE.MAJIONG_XLCH].rule[showTab].desc)
                }
            }
        }        
    }

    setRuleLabel(text:string){
        setTimeout(() => {
            this.ruleLabel.string = text
        }, 1);
    }

    gameName = {
        [Constants.GAME_TYPE_LABLE.MAJIONG_HZXL]: {name: "红中血流", image: "component/Rule/images/hzxl", 
            rule: [{
                    tab:"玩法规则", 
                    desc: "红中血流，在血流成河玩法的基础上增加4张红中（万能牌)，并加入更多的胡牌牌型，使得胡牌更加容易。"+
                    "\r\n"+
                    "\r\n基础规则"+
                    "\r\n1.玩家人数：4人"+
                    "\r\n2.用牌：1-9万、1-9筒、1-9条，4个红中，共112张牌"+
                    "\r\n3.可以碰、杠，不可以吃"+
                    "\r\n4.定庄：第一个胡牌者下局为庄，一炮多响则放炮者为庄。无人胡牌时，庄家继续当庄"+
                    "\r\n5.胡牌："+
                    "\r\n       1)可以点炮胡、抢杠胡、—炮多响"+
                    "\r\n       2)缺—门才能胡牌，即胡牌时手牌不能超过2种花色"+
                    "\r\n       3)每局每个玩家可多次胡牌，直到摸完所有牌，牌局结束"+
                    "\r\n       4)每次胡牌时直接结算"+
                    "\r\n"+
                    "\r\n行牌规则"+
                    "\r\n1.换三张：发完手牌后，每位玩家选择3张任意花色手牌，随机与其他1位玩家交换"+
                    "\r\n2.定缺：在发完手牌后选择一门不要的花色即为定缺，定缺牌打不完不能听牌，在对局中不能更改定缺"+
                    "\r\n3.杠牌:"+
                    "\r\n      1)刮风:即点杠、直杠"+
                    "\r\n      2)下雨:即暗杠"+
                    "\r\n      3)杠牌直接结算输赢"+
                    "\r\n4.红中:"+
                    "\r\n      1)红中为万能牌，可以充当任意牌，包括已经绝张的牌"+
                    "\r\n      2)红中牌可以打出去，效果与万能牌一致。大概率造成一炮多响"+
                    "\r\n      3)有红中的胡牌中，可能满足多种牌型，择最大番型的牌展示"+
                    "\r\n      4)打出去的红中被他人胡牌，同样付他人最大番型金币数"+
                    "\r\n      5)单红中不可钓任意牌做将胡牌"+
                    "\r\n      6)双红中可以钓任意牌（缺门除外）组成刻子顺子胡牌"+
                    "\r\n5.退税：对局结束后，未听牌的玩家，退回全部杠牌所得"+
                    "\r\n6.查大叫：牌局结束时，除花猪之外的未听牌玩家赔给听牌未胡牌玩家最大可能倍数。（不包含自摸倍数)"+
                    "\r\n7.查花猪：对局结束后，所定缺花色的牌没有打完的玩家为花猪，花猪玩家赔给其他玩家一定倍数金币。"+
                    "\r\n"+
                    "\r\n结算说明"+
                    "\r\n1.倍数封顶：各场次有不同的倍数封顶"+
                    "\r\n2.结算封顶：单次胡牌不能超过携带游戏金币"+
                    "\r\n3.单次胡牌封顶：部分场次存在单次胡牌游戏金币封顶"
                },
                {
                    tab:"结算番型", 
                    desc: "1.牌型："+
                    "\r\n【平胡】×1"+
                    "\r\n由4个刻子或顶子加对子组成胡牌"+
                    "\r\n【素胡】×2"+
                    "\r\n胡牌时，没有红中赖子参与的牌型"+
                    "\r\n【边张】×2"+
                    "\r\n12胡3,89胡7的牌型"+
                    "\r\n【坎张】×2"+
                    "\r\n胡牌时，只胡顺子中间的那张牌"+
                    "\r\n【单钓】×2"+
                    "\r\n胡牌时，是属于钓将胡牌"+
                    "\r\n【一般高】×2"+
                    "\r\n胡牌时，手牌中包含同花色的3连对"+
                    "\r\n【六连顺】×2"+
                    "\r\n胡牌时，手牌中包含同花色的6连张"+
                    "\r\n【双同刻】×2"+
                    "\r\n牌型中包含2个点数相同花色不同的刻子"+
                    "\r\n【老少副】×2"+
                    "\r\n牌型中包含同花色的123+789这两组顺子"+
                    "\r\n【碰碰胡】×2"+
                    "\r\n由4个刻子（或杠牌）和将牌组成的胡牌"+
                    "\r\n【断幺九】×2"+
                    "\r\n不包含任何的1、9的牌"+
                    "\r\n【双暗刻】×4"+
                    "\r\n牌型中有2个暗杠暗刻"+
                    "\r\n【捉五魁】×4"+
                    "\r\n牌型中有四万六万只胡五万"+
                    "\r\n【不求人】×4"+
                    "\r\n胡牌时，没有碰、明杠且是自摸胡牌"+
                    "\r\n【清一色】×4"+
                    "\r\n全部由万简条中的一种花色组成的胡牌"+
                    "\r\n【五行八卦】×5"+
                    "\r\n胡牌时，有且只有两个杠"+
                    "\r\n【一条龙】×6"+
                    "\r\n牌型中包含同花色1-9"+
                    "\r\n【三暗刻】×8"+
                    "\r\n牌型中有3个暗杠/暗刻"+
                    "\r\n【金钩的】×8"+
                    "\r\n胡牌时，手牌只剩下一张牌单吊胡牌"+
                    "\r\n【大于五】×8"+
                    "\r\n胡牌牌型中所有牌的点数都大于5"+
                    "\r\n【小于五】×8"+
                    "\r\n胡牌牌型中所有牌的点数都小于5"+
                    "\r\n【三节高】×8"+
                    "\r\n牌型中包含3个同花色且点数连续的刻子/杠"+
                    "\r\n【全双刻】×8"+
                    "\r\n牌型中只有刻/杠和将，且刻子点数都是偶数"+
                    "\r\n【百万石】×8"+
                    "\r\n牌型中万字牌的点数之和≥100"+
                    "\r\n【推不倒】×8"+
                    "\r\n只由245689条和1234589筒当中的牌组成的胡牌"+
                    "\r\n【七对】×12"+
                    "\r\n由七个对子组成的胡牌"+
                    "\r\n【将对】×16"+
                    "\r\n所有牌都是点数2、5、8的碰胡"+
                    "\r\n【十二金钗】×16"+
                    "\r\n胡的牌中有3个杠"+
                    "\r\n【全带幺】×16"+
                    "\r\n每副刻子顺/将都包含1或9"+
                    "\r\n【四节高】×16"+
                    "\r\n牌型中包含4个同花色且点数连续的刻子/杠"+
                    "\r\n【绿一色】×24"+
                    "\r\n牌型中只由2、3、4、6、8条组成的胡牌牌型"+
                    "\r\n【守中抱一】×24"+
                    "\r\n牌型中只剩1张红中单钓红中胡牌"+
                    "\r\n【全小】×24"+
                    "\r\n胡牌时，所有手牌点数只有1、2、3"+
                    "\r\n【全中】×24"+
                    "\r\n胡牌时，所有手牌点数只有4、5、6"+
                    "\r\n【全大】×24"+
                    "\r\n胡牌时，所有手牌点数只有7、8、9"+
                    "\r\n【龙七对】×32"+
                    "\r\n在七对的牌型中包含1个根"+
                    "\r\n【全带五】×32"+
                    "\r\n牌型中所有的顺子、刻子、将都含有点数5"+
                    "\r\n【四暗刻】×32"+
                    "\r\n牌型中有4个暗杠/暗刻"+
                    "\r\n【九莲宝灯】×64"+
                    "\r\n胡牌牌型为同花色1112345678999"+
                    "\r\n【双龙七对】×96"+
                    "\r\n七对的牌型中含有2个根"+
                    "\r\n【连七对】×96"+
                    "\r\n胡牌牌型为同花色点数相连的7个对子"+
                    "\r\n【全幺九】×96"+
                    "\r\n胡牌牌型中只有点数1和点数9的牌组成"+
                    "\r\n【十八罗汉】×128"+
                    "\r\n牌型中包含4个杠和一对将"+
                    "\r\n【一色双龙会】×128"+
                    "\r\n胡牌牌型为同花色11223355778899"+
                    "\r\n【天胡】×256"+
                    "\r\n换完三张后庄家直接胡牌"+
                    "\r\n【地胡】×256"+
                    "\r\n非庄家第一轮摸牌就胡牌"+
                    "\r\n【三龙七对】×288"+
                    "\r\n七对的牌型中包含3个根"+
                    "\r\n"+
                    "\r\n2.翻倍："+
                    "\r\n【根】×2：手中四张一样的牌为1根，每有1根，胡牌时额外×2"+
                    "\r\n【门清】×2：没有吃、碰明杠、点炮胡"+
                    "\r\n【自摸】×2：自摸胡牌"+
                    "\r\n【杠上炮】×2：杠牌后，打出的牌给其他玩家点炮"+
                    "\r\n【抢杠胡】×2：胡其他人补杠的那张牌"+
                    "\r\n【杠上开花】×2：杠牌后补张胡牌"+
                    "\r\n【海底捞月】×2：牌墙已摸完，胡本局打出的最后一张牌"+
                    "\r\n【妙手回春】×2：摸牌墙上最后一张牌成自摸" 
                }]
            },
        [Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL]: { name: "6红中血流", image: "component/Rule/images/6hzxl" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL]: { name: "8红中血流", image: "component/Rule/images/8hzxl" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XLCH]: { name: "血流成河", image: "component/Rule/images/xlch",
            rule:[{
                    tab:"玩法规则", 
                    desc:"血流成河，沿用了“血战到底”的基本打法，不同的是，场上的玩家在胡牌以后，仍可以继续游戏。别的玩家打出的牌，若正是叫牌，则可以再次胡牌。在不改变听牌的牌型的前提下，还可以杠牌。直至桌面的牌摸完，此局才算结束。"+
                    "\r\n"+
                    "\r\n基础规则"+
                    "\r\n1.玩家人数：4人"+
                    "\r\n2.用牌：1-9万、1-9筒、1-9条，共108张牌"+
                    "\r\n3.可以碰、杠，不可以吃"+
                    "\r\n4.定庄：第一个胡牌者下局为庄，一炮多响则放炮者为庄。无人胡牌时，庄家继续当庄"+
                    "\r\n5.胡牌："+
                    "\r\n       1)可以点炮胡、抢杠胡、—炮多响"+
                    "\r\n       2)缺—门才能胡牌，即胡牌时手牌不能超过2种花色"+
                    "\r\n       3)每局每个玩家可多次胡牌，直到摸完所有牌，牌局结束"+
                    "\r\n       4)每次胡牌时直接结算"+
                    "\r\n"+
                    "\r\n行牌规则"+
                    "\r\n1.换三张：发完手牌后，每位玩家选择3张任意花色手牌，随机与其他1位玩家交换"+
                    "\r\n2.定缺：在发完手牌后选择一门不要的花色即为定缺，定缺牌打不完不能听牌，在对局中不能更改定缺"+
                    "\r\n3.杠牌:"+
                    "\r\n      1)刮风:即点杠、直杠"+
                    "\r\n      2)下雨:即暗杠"+
                    "\r\n      3)杠牌直接结算输赢"+
                    "\r\n4.退税：对局结束后，未听牌的玩家，退回全部杠牌所得"+
                    "\r\n5.查大叫：牌局结束时，除花猪之外的未听牌玩家赔给听牌未胡牌玩家最大可能倍数。（不包含自摸倍数)"+
                    "\r\n6.查花猪：对局结束后，所定缺花色的牌没有打完的玩家为花猪，花猪玩家赔给其他玩家一定倍数金币。"+
                    "\r\n"+
                    "\r\n结算说明"+
                    "\r\n1.倍数封顶：各场次有不同的倍数封顶"+
                    "\r\n2.结算封顶：单次胡牌不能超过携带游戏金币"+
                    "\r\n3.单次胡牌封顶：部分场次存在单次胡牌游戏金币封顶"
                },
                {
                    tab:"结算番型", 
                    desc: "1.牌型："+
                    "\r\n【平胡】×1"+
                    "\r\n由4个刻子或顺子加对子组成胡牌"+
                    "\r\n【碰碰胡】×2"+
                    "\r\n由4个刻子(或杠牌)和将牌组成的胡牌"+
                    "\r\n【断幺九】×2"+
                    "\r\n不包含任何的1、9的牌"+
                    "\r\n【幺九】×4"+
                    "\r\n每副刻子/顺/将都包含1或9"+
                    "\r\n【清一色】×4"+
                    "\r\n全部由万筒条中的一种花色组成的胡牌"+
                    "\r\n【七对】×4"+
                    "\r\n由七个对子组成的胡牌"+
                    "\r\n【金钩钓】×4"+
                    "\r\n胡牌时，手牌只剩下一张牌单吊胡牌"+
                    "\r\n【将对】×8"+
                    "\r\n所有牌都是点数2、5、8的碰碰胡"+
                    "\r\n【清碰】×8"+
                    "\r\n清一色的碰碰胡"+
                    "\r\n【龙七对】×8"+
                    "\r\n在七对的牌型中包含1个根"+
                    "\r\n【清七对】×16"+
                    "\r\n清一色的七对"+
                    "\r\n【清金钩钓】×16"+
                    "\r\n清一色的金钩钓"+
                    "\r\n【清幺九】×16"+
                    "\r\n清一色加幺九"+
                    "\r\n【将金钩钓】×16"+
                    "\r\n金钩钓里的手牌、碰牌和杠牌必须是2、5、8"+
                    "\r\n【清龙七对】×32"+
                    "\r\n清一色的龙七对"+
                    "\r\n【清双龙七对】×64"+
                    "\r\n清一色的双龙七对"+
                    "\r\n【十八罗汉】×64"+
                    "\r\n金钩钓，且胡牌时有4个杠牌"+
                    "\r\n【地胡】×64"+
                    "\r\n非庄家第一轮摸牌就胡牌"+
                    "\r\n【天胡】×64"+
                    "\r\n换完三张后庄家直接胡牌"+
                    "\r\n【清三龙七对】×128"+
                    "\r\n清一色的三龙七对"+
                    "\r\n【清十八罗汉】×256"+
                    "\r\n清一色和十八罗汉组成的胡牌"+
                    "\r\n"+
                    "\r\n2.翻倍："+
                    "\r\n【根】×2：手中四张一样的牌为1根，每有1根，胡牌时额外×2"+
                    "\r\n【自摸】×2：自摸胡牌"+
                    "\r\n【杠上开花】×2：杠牌后补张胡牌"+
                    "\r\n【杠上炮】×2：杠牌后，打出的牌给其他玩家点炮"+
                    "\r\n【抢杠胡】×2：胡其他人补杠的那张牌"+
                    "\r\n【海底捞月】×2：牌墙已摸完，胡本局打出的最后一张牌"+
                    "\r\n【门清】×2：没有吃、碰明杠、点炮胡"
                }]
            },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ]: { name: "血战换三张", image: "component/Rule/images/xzdd",
            rule:[{
                tab:"玩法规则", 
                desc: "血战到底，四川乃至全国都非常流行的麻将游戏打法，主要特点为一家胡了并不结束该局，而是未胡的玩家继续打，直到有3家都胡或者余下的玩家流局。"+
                "\r\n"+
                "\r\n基础规则"+
                "\r\n1.玩家人数：4人"+
                "\r\n2.用牌：1-9万、1-9筒、1-9条，共108张牌"+
                "\r\n3.可以碰、杠，不可以吃"+
                "\r\n4.定庄：第一个胡牌者下局为庄，一炮多响则放炮者为庄。无人胡牌时，庄家继续当庄"+
                "\r\n5.胡牌："+
                "\r\n       1)可以点炮胡、抢杠胡、—炮多响"+
                "\r\n       2)缺—门才能胡牌，即胡牌时手牌不能超过2种花色"+
                "\r\n       3)每局每个玩家可多次胡牌，直到摸完所有牌，牌局结束"+
                "\r\n       4)每次胡牌时直接结算"+
                "\r\n"+
                "\r\n行牌规则"+
                "\r\n1.换三张：发完手牌后，每位玩家选择3张任意花色手牌，随机与其他1位玩家交换"+
                "\r\n2.定缺：在发完手牌后选择一门不要的花色即为定缺，定缺牌打不完不能听牌，在对局中不能更改定缺"+
                "\r\n3.杠牌:"+
                "\r\n      1)刮风:即点杠、直杠"+
                "\r\n      2)下雨:即暗杠"+
                "\r\n      3)杠牌直接结算输赢"+
                "\r\n4.退税：对局结束后，未听牌的玩家，退回全部杠牌所得"+
                "\r\n5.查大叫：牌局结束时，除花猪之外的未听牌玩家赔给听牌未胡牌玩家最大可能倍数。（不包含自摸倍数)"+
                "\r\n6.查花猪：对局结束后，所定缺花色的牌没有打完的玩家为花猪，花猪玩家赔给其他玩家一定倍数金币。"+
                "\r\n"+
                "\r\n结算说明"+
                "\r\n1.倍数封顶：各场次有不同的倍数封顶"+
                "\r\n2.结算封顶：单次胡牌不能超过携带游戏金币"+
                "\r\n3.单次胡牌封顶：部分场次存在单次胡牌游戏金币封顶" }]
        },
        [Constants.GAME_TYPE_LABLE.GDMJ_TDH]: { name: "广东推倒胡", image: "component/Rule/images/xzdd",
            rule:[{
                tab:"玩法规则", 
                desc:""+
                "\r\n【基础规则】"+
                "\r\n1.玩家人数：游戏有4人、3人、2人模式"+
                "\r\n2.用牌：条筒万和东南西北中发白，共136张牌"+
                "\r\n3.坐庄：首局随机庄，之后连庄（庄家胡牌、被一炮多响、流局时庄家连庄，否则由庄家的下家坐庄）"+
                "\r\n4.流局：牌堆的牌摸完时，如果没有人胡牌则流局，流局返还杠分"+
                "\r\n5.鬼牌：条筒万和东南西北中发白，共136张牌"+
                "\r\n  1).定义：能替代任意牌的万能牌，只能做手牌，不能打出（手中立着的牌只剩一对牌加2张鬼牌时不能碰牌）或吃碰杠"+
                "\r\n  2).翻鬼玩法：筒条万1-9，翻1万则2万为鬼(n+1)，翻9万则1万为鬼；东南西北中发白，翻东则南为鬼，翻白则东为鬼"+
                "\r\n6.吃碰杠：可以碰、杠，不能吃"+
                "\r\n7.胡牌：可自摸、抢杠胡(可以一炮多响)，不能点炮胡"+

                "\r\n【牌型规则】"+
                "\r\n胡牌的基本牌型："+
                "\r\n1.11、123、123、123、123"+
                "\r\n2.11、123、123、123、111(或1111，下同)"+
                "\r\n3.11、123、123、111、111"+
                "\r\n4.11、123、111、111、111"+
                "\r\n5.11、111、111、111、111"+
                "\r\n6.11、11、11、11、11、11、11"+
                "\r\n注：1=单张 11=将、对子 111=刻子 1111=杠 123=顺子"+

                "\r\n【算分规则】"+
                "\r\n1)结算规则"+
                "\r\n   胡牌得分=底分*【胡牌牌型番数*（中马数+3）+2*连庄次数】"+
                "\r\n   其它分=跟庄分+杠分"+
                "\r\n2)承包规则"+
                "\r\n   抢杠承包：抢杠胡时，被抢杠的玩家需要承包3家的胡牌分"+
                "\r\n   杠爆全包：点杠造成的杠上开花胡牌，点杠者需要承包3家所输胡牌分"+
                "\r\n   12张落地承包： 碰/点杠4次后自摸胡，则第4次被A碰/点杠的那个玩家承包3家的胡牌分（暗杠后无法触发）"+
                "\r\n3)牌型番数"+
                "\r\n   【2倍】"+
                "\r\n   七对/龙七对/双龙七对/三龙七对：由7个对子组成的胡牌"+
                "\r\n   无鬼：胡牌时没有鬼牌"+
                "\r\n   【4倍】"+
                "\r\n   自摸：自摸胡牌赢3家"+
                "\r\n   抢杠胡：胡其他人补杠的那张牌，为抢杠胡，被抢杠的杠分返还"+
                "\r\n4)杠分"+
                "\r\n   暗杠：其他3家每人输2倍底分"+
                "\r\n   补杠（明杠）：其他3家每人输1倍底分"+
                "\r\n   点杠（明杠）：点杠者输3倍底分"+
                "\r\n5)买马"+
                "\r\n   金币场买马"+
                "\r\n   1.另一幅牌买马，每人开局买2马"+
                "\r\n   2.位置与点数对应关系如下："+
                "\r\n   庄家：1、5、9、东"+
                "\r\n   庄家下家：2、6、南、中"+
                "\r\n   庄家对家：3、7、西、发"+
                "\r\n   庄家上家：4、8、北、白"+
                "\r\n   好友房买马"+
                "\r\n   1.只能由胡牌者买马"+
                "\r\n   2.位置与点数对应关系如下"+
                "\r\n   庄家：1、5、9、东、中"+
                "\r\n   庄家下家：2、6、南、发（二人模式时无）"+
                "\r\n   庄家对家：3、7、西、白（三人模式时无）"+
                "\r\n   庄家上家：4、8、北（二人模式时无）"+
                "\r\n   3.马牌买中赢家：和赢家赢一样的倍数"+
                "\r\n6)跟庄"+
                "\r\n   1.定义：庄家打出的第一张牌，其他3家跟着出相同的牌，则庄家赔每人1倍底分"+
                "\r\n   2.过程中发生吃碰杠则跟庄失败，流局跟庄倍数退还"+
                "\r\n7)节节高"+
                "\r\n   庄家每连庄1次，胡牌倍数+2；连庄n次，胡牌倍数+2n倍"
            }]
        }      
    }

    gameDDZ = {
        ["ddz"]: {name: "斗地主", image: "", 
            rule: [{
                    tab:"基础规则", 
                    desc: "1)人数"+
                    "\r\n抢地主和叫三分模式参加游戏人数都为固定3人，其中，地主1人为一方，其他2家农民为一方。"+
                    "\r\n" +
                    "\r\n2)用牌"+
                    "\r\n一副牌54张，每人17张，留3张做底牌，在确定地主之前玩家不能看底牌，在确定地主之后，底牌可见。"+
                    "\r\n" +
                    "\r\n3)明牌"+
                    "\r\n明牌为亮明手上所有牌进行游戏，主要分为 “明牌开始”、“发牌明牌”、“明牌” 三种："+
                    "\r\n● 明牌开始：在还没发牌时，就选择明牌并保持开始游戏，倍率X5；"+
                    "\r\n● 发牌明牌：在发牌的过程中选择明牌游戏，根据发牌数量的多少翻倍，发第1-6张时明牌倍率X4、发第7-12张时明牌倍率X3，之后明牌倍率X2；"+
                    "\r\n● 明牌：在收完三张底牌后可以选择明牌并开始游戏，倍率X2。"+
                    "\r\n" +
                    "\r\n4)发牌" +
                    "\r\n游戏开始后每人发17张牌，在确定地主后将三张底牌交给地主，并亮出底牌让所有人都能看到。" +
                    "\r\n" +
                    "\r\n5)叫牌" +
                    "\r\n如果有玩家在叫牌前选择“明牌”，则第一个选择“明牌”的玩家先叫牌，否则首轮先叫牌的玩家由系统随机选定，叫牌按出牌的顺序轮流进行。如果都“不叫”，则由首轮先叫牌玩家当地主。" +
                    "\r\n根据模式不同，叫牌方式不同：" +
                    "\r\nA.抢地主模式" +
                    "\r\n      叫牌时可以选择“叫地主”、“不叫”。" +
                    "\r\n      当某位玩家叫完地主后，按照出牌顺序剩余玩家均有且只有一次“抢地主”的机会。每成功一次则游戏倍率X2。不“叫地主”的玩家不能“抢地主”。" +
                    "\r\n      有玩家选择“抢地主”后，如果没有其他玩家继续“抢地主”则由“抢地主”的玩家担任地主。" +
                    "\r\n      如果没有玩家选择“抢地主”，则由“叫地主”的玩家担任地主。" +
                    "\r\nB.叫三分模式" +
                    "\r\n      叫牌时可以叫“1分”“2分”，“3分”不叫”。" +
                    "\r\n      每人只能叫一次，后叫牌者只能叫比前面玩家高的分或者不叫。" +
                    "\r\n      叫牌结束后所叫分值最大的玩家为地主；如果有玩家叫“3分”则立即结束叫牌，该玩家为地主。" +
                    "\r\n" +
                    "\r\n6)加倍" +
                    "\r\n确定地主并且地主已经拿到三张底牌的时候，三个玩家都有“加倍”或者“不加倍”选择，如果有玩家选择“加倍”则该玩家游戏倍率 X2，如果选择“超级加倍”则该玩家游戏倍率X4。" +
                    "\r\n" +
                    "\r\n7)出牌顺序" +
                    "\r\n地主首先出牌，然后按逆时针顺序依次出牌，轮到用户跟牌时，用户可以选择“不出”或出比上一个玩家大的牌。某一玩家出完牌时结束本局。" +
                    "\r\n" +
                    "\r\n8)胜负" +
                    "\r\n地主先出完牌则地主胜，否则另外两家胜。"
                },
                {
                    tab:"牌型规则", 
                    desc: "1)火箭"+
                    "\r\n双王(大王+小王)，最大的牌，可打任意牌型。"+
                    "\r\n"+
                    "\r\n2)炸弹"+
                    "\r\n四张相同数值的牌，如9999。"+
                    "\r\n"+
                    "\r\n3)单牌"+
                    "\r\n单张牌，如A。除非使用炸弹，不然跟牌的玩家只能出单张。单张按牌面数值比较大小：大王>小王>2>A>K>Q>J>10>9>8>7>6>5>4>3。"+
                    "\r\n"+
                    "\r\n4)对牌"+
                    "\r\n数值相同的两张牌。如 AA。除非使用炸弹，不然跟牌的玩家只能出对子。大小比较以牌面数值来决定大小。"+
                    "\r\n"+
                    "\r\n5)三张"+
                    "\r\n数值相同的三张牌。如333。除非使用炸弹，不然跟牌的玩家只能出三张牌。大小比较以牌面数值来决定大小。"+
                    "\r\n"+
                    "\r\n6)三带一"+
                    "\r\n数值相同的三张牌+一张单牌，例如：333+4，除非使用炸弹，不然跟牌的玩家只能出三带一。大小比较以三张相同牌面数值来决定，所带的牌不比较大小。"+
                    "\r\n"+
                    "\r\n7)三带二"+
                    "\r\n数值相同的三张牌+一对牌，例如：333+44，除非使用炸弹，不然跟牌的玩家只能出三带二。大小比较以三张相同牌面数值来决定，所带的牌不比较大小。"+
                    "\r\n"+
                    "\r\n8)顺子"+
                    "\r\n五张或更多的连续单牌，不包括2和双王，如345678，除非使用炸弹，不然跟牌的玩家所出的顺子必须和出牌玩家所出顺子的牌数量一样。大小比较以顺子最后一张牌的牌面大小来比较。"+
                    "\r\n"+
                    "\r\n9)连对"+
                    "\r\n三对或更多的连续对子，不包括2和双王，如33445566。除非使用炸弹，不然跟牌的玩家所出的连对必须和出牌玩家所出连对的牌数量一样。大小比较以连对的最后一对牌的牌面大小来比较。"+
                    "\r\n"+
                    "\r\n10)飞机"+
                    "\r\n二个或更多的连续三张牌，不包括2和双王，如：333444。除非使用炸弹，不然跟牌的玩家所出的飞机必须和出牌玩家所出飞机的牌数量一样。大小比较以飞机的最后三张相同点数的牌的牌面大小来比较。"+
                    "\r\n"+
                    "\r\n11)飞机带翅膀"+
                    "\r\n飞机+同数量的单牌(或同数量的对子)。例如：333444+58或333444+5566。除非使用炸弹，不然跟牌的玩家所出的飞机带翅膀必须和出牌的玩家所出的飞机带翅膀的牌型一样。大小比较以飞机的最后三张相同的牌的牌面大小来比较。"+
                    "\r\n"+
                    "\r\n12)四带二"+
                    "\r\n数值相同的四张牌+两张单牌(或两个对子)。如 3333+47或 3333+4455。除非使用炸弹，不然跟牌的玩家只能出四带二。大小比较以四张相同牌面数值来决定大小，所带的牌不比较大小。四带二不算炸弹。"
                },
                {
                    tab:"算分规则", 
                    desc: "1)倍率算法"+
                    "\r\n游戏倍率计算规则如下："+
                    "\r\n● 明牌：玩家明牌时的倍率，若同时有多名玩家选择“明牌”则按照最大的明牌倍数计算；"+
                    "\r\n● 叫地主：抢地主模式中，叫地主倍率为3倍，叫三分模式中，则根据具体叫的分数；"+
                    "\r\n● 抢地主：玩家每抢一次地主倍率X2；"+
                    "\r\n● 加倍：倍率 X2；"+
                    "\r\n● 超级加倍：倍率X4；"+
                    "\r\n● 炸弹：每打出一个炸弹倍率X2；"+
                    "\r\n● 春天：地主出牌至结束，农民一张牌未出时，倍率X2；"+
                    "\r\n● 反春：地主只出一手牌后，其余农民出牌直至牌局结束时，倍率X2。"+
                    "\r\n"+
                    "\r\n2)游戏结算"+
                    "\r\n游戏结束后每个玩家输赢分数如下："+
                    "\r\n● 地主赢：=房间底分X倍率 X两家农民-桌费"+
                    "\r\n● 地主输：=房间底分X倍率 X两家农民-桌费"+
                    "\r\n● 农民赢：=房间底分X倍率-桌费"+
                    "\r\n● 农民输：=房间底分X倍率-桌费"+
                    "\r\n"+
                    "\r\n3)封顶、破产"+
                    "\r\n封顶：赢的超过自身携带游戏币则达到上限（优先扣除输到破产玩家的游戏币，然后剩余的部分再从另外玩家身上扣除）。"+
                    "\r\n如A、B、C三家，A有5000游戏币，B有3000游戏币，C有8000游戏币。"+
                    "\r\n● A为地主：若A赢，则A赢分上限为B的2500游戏币+C的2500游戏币=5000游戏币。"+
                    "\r\n  若A输，则A输分上限为5000游戏币，B赢2500游戏币，C赢2500游戏币。"+
                    "\r\n● B为地主：若B赢，则B赢分上限为A的1500游戏币+C的1500游戏币=3000游戏币。"+
                    "\r\n  若B输，则B输分上限为3000游戏币，A赢1500游戏币，C赢1500游戏币。"+
                    "\r\n● C为地主：若C赢，则C赢分上限为A的5000游戏币+B的3000游戏币=8000游戏币。"+
                    "\r\n  若C输，则C输分上限为8000游戏币，A赢5000游戏币，B赢3000游戏币。"+
                    "\r\n破产：输到0则达到下限（优先支付赢到封顶的玩家，然后剩余的支付给另外的玩家）。"+
                    "\r\n如A、B、C三家，A有5000游戏币，B有1000游戏币，C有6000游戏币。"+
                    "\r\n● A为地主：若A赢，则A赢分为B的1000游戏币+C的2500游戏币=3500游戏币。"+
                    "\r\n  若A输，则A输分为5000游戏币，B赢1000游戏币，C赢4000游戏币。"+
                    "\r\n● B为地主：若B赢，则B赢分上限为A的500游戏币+C的500游戏币=1000游戏币。"+
                    "\r\n  若B输，则B输分上限为1000游戏币，A赢500游戏币，C赢500游戏币。"+
                    "\r\n● C为地主：若C赢，则C赢分上限为A的5000游戏币+B的1000游戏币=6000游戏币。"+
                    "\r\n  若C输，则C输分上限为6000游戏币，A赢5000游戏币，B赢1000游戏币。"
                }]
            },
    }
}