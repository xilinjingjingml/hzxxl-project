import { OperatorCode } from "../hzxl-Constants"
import { AbstractGameIndependent, GameIndependent, GameIndependentCallback } from "./GameIndependent"

enum hzxlFan {
    // 以下【32番】
    /**
     * 十八罗汉：胡牌牌型中有4种杠牌。(不计碰碰胡)
     * S:12,12,12,12 13,13,13,13 17,17,17,17 19,19,19,19 H:28,28
     */
    ShiBaLuoHan = 0,

    /**
     * 大三元：胡牌牌型中有中发白三种刻(杠)牌。
     * S: H:11,11 12,13,14 41,41,41 42,42,42 43,43,43
     */
    DaSanYuan,

    /**
     * 大四喜：胡牌牌型中有东南西北4种刻(杠)牌。(不计碰碰胡)
     * S: H:11,11 31,31,31 32,32,32 33,33,33 34,34,34
     */
    DaSiXi,

    /**
     * 十三幺：有19万，19条，19筒及东南西北中发白各1张，外加以上13张牌中任意1张组成的胡牌。(不计门清)
     * S: H:1,9,11,19,21,29,31,32,33,34,41,42,43,1
     */
    ShiSanYao,

    /**
     * 九宝莲灯：同一花色形成1112345678999，再摸到该种牌任何一张即可胡牌。(不计清一色，门前清)
     * S: H:11,11,11 12,13,14,15,16,17,18 19,19,19 15
     */
    JiuBaoLianDeng,

    /**
     * 清龙七对：清一色+龙七对。(不计清一色、龙七对)
     * S: H:11,11 11,11 14,14 15,15 16,16 17,17 19,19
     */
    QingLongQiDui,

    /**
     * 地胡：闲家摸第1张牌就自摸胡牌。
     * 天胡：庄家发牌后直接胡牌。
     */
    TianHu,
    DiHu,

    // 以下【16番】
    /**
     * 小四喜：胡牌牌型中有东南西北组成的3种刻(杠)牌及1对将牌。
     * S: H:11,12,13 31,31 32,32,32 33,33,33 34,34,34
     */
    XiaoSiXi,

    /**
     * 小三元：胡牌牌型中有中发白组成的2种刻(杠)牌及1对将牌。
     * S: H:11,11,11 12,13,14 41,41,41 42,42,42 43,43
     */
    XiaoSanYuan,

    /**
     * 字一色：由东南西北中发白的4种刻牌(杠)和1对将牌组成的胡牌。(不计碰碰胡)
     * S: H:31,31,31 32,32,32 33,33,33 41,41,41 42,42
     */
    ZiYiSe,

    /**
     * 清七对：清一色七对。（不计清一色、七对）
     * S: H:11,11 12,12 14,14 15,15 16,16 17,17 19,19
     */
    QingQiDui,

    // 以下【8番】
    /**
     * 龙七对：七对牌型中有4张相同牌。
     * S: H:11,11, 11,11 14,14 18,18 19,19 26,26 27,27
     */
    LongQiDui,

    /**
     * 清碰：清一色+碰碰胡。(不计清一色、碰碰胡)
     * S: H:11,11,11 14,14,14 15,15,15 17,17,17 19,19
     */
    QingPeng,

    // 以下【4番】
    /**
     * 七对：由7个对子组成的胡牌。
     * S: H:11,11 13,13 14,14 18,18 19,19 26,26 27,27
     */
    QiDui,

    /**
     * 清一色：由一种花色序数牌组成的胡牌。
     * S: H:11,11,11 12,13,14 15,15,15 16,16,16 19,19
     */
    QingYiSe,

    /**
     * 混碰：混一色+碰碰胡。(不计混一色、碰碰胡)
     * S: H:11,11,11 13,13,13 17,17,17 31,31,31 34,34
     */
    HunPeng,

    // 以下【2番】
    /**
     * 杠上开花：杠牌后补牌正是要胡的牌。
     */
    GangShangKaiHua,

    /**
     * 碰碰胡：由4种刻牌(杠)外加1对将牌组成的胡牌。
     * S: H:12,12,12 13,13,13 18,18,18 23,23,23 28,28
     */
    PengPengHu,

    /**
     * 混一色：由一种花色序数牌及字牌组成的胡牌。
     * S: H:11,11,11 12,13,14 17,18,19 31,31,31 34,34
     */
    HunYiSe,

    /**
     * 门前清：胡牌时，没有吃、碰、明杠过。
     * S: H:12,13,14 14,15,16 17,18,19 21,22,23 28,28
     */
    MenQianQing,

    /**
     * 自摸：玩家通过自摸胡牌。
     */
    ZiMo,

    /**
     * 杠后炮：玩家杠牌后打出的第1张牌是能胡的牌。
     */
    GangHouPao,

    /**
     * 抢杠胡：其他玩家补杠的牌刚好是能胡的牌。
     */
    QiangGangHu,

    // 以下【1番】
    /**
     * 平胡：最普通的胡牌牌型。
     * S: H:12,13,14 14,15,16 17,17,17 21,22,23 28,28
     */
    PingHu,

    /**
     * 明杠：其他玩家直接放杠，杠牌后放杠玩家扣3分。
     * S:14,14,14,14 H:11,11,11 11,12,13 22,22,22 26,26
     */
    MingGang,

    /**
     * 暗杠：4张牌都是玩家自己摸到的，杠牌后其他三家都扣2分。
     */
    AnGang,

    /**
     * 补杠：碰牌后，第4张牌是自己摸到的，杠牌后其他三家都扣1分。
     */
    BuGang,

    /**
     * 金钩钓：胡牌时手牌只剩下一张单吊胡牌，不计碰碰胡。
     */
    JinGouGou,

    /**
     * 全带幺：顺子、刻子和将牌都含一或九。
     */
    DaiYaoJiu,

    /**
     * 将对：由二、五、八组成的碰碰胡，不计碰碰胡。
     */
    JiangDui,

    /**
     * 清金钩钓：由清一色和金钩钓组成的胡牌。
     */
    QingJinGouGou,

    /**
     * 清幺九：同一种花色的带幺九，不计带幺九、清一色。
     */
    QingDaiYaoJiu,

    /**
     * 清十八罗汉：清一色十八罗汉，不计4杠、金钩钓、碰碰胡。
     */
    QingShiBaLuoHan,

    /**
     * 妙手回春：牌面最后一张牌打出并且给其他人点炮胡牌。
     */
     MiaoShouHuiChun,

    /**
     * 海底捞月：牌面最后一张牌并且自摸胡牌。
     */
     HaiDiLaoYue,

    /**
     * 素胡：没有赖子参与的牌型
     */
    SuHu,

    /**
     * 边张：12胡3，89胡7的牌型
     */
    BianZhang,

    /**
     * 坎张：胡牌时胡顺子中间那张牌
     */
    KanZhang,

    /**
     * 单钓：胡牌时钓将胡牌
     */
    DanDiao,

    /**
     * 一般高：胡牌手牌中包含同花色的3连对
     */
    YiBanGao,

    /**
     * 六连顺：胡牌手牌中包含同花色的6连张
     */
    LiuLianShun,

    /**
     * 双同刻：胡牌牌型中包含2个点数相同花色不同的刻子
     */
    ShuangTongKe,

    /**
     * 老少配：胡牌牌型中包含同花色的123+789两组顺子
     */
    LaoShaoPei,

    /**
     * 断幺九：不包含任何1、9的牌
     */
    DuanYaoJiu,

    /**
     * 双暗刻：有2个暗杠或暗刻
     */
    ShuangAnKe,

    /**
     * 捉五魁：有四万六万只胡五万
     */
    ZhuoWuKui,

    /**
     * 不求人：没有碰、明杠且是自摸胡牌
     */
    BuQiuRen,

    /**
     * 五行八卦：胡牌时，有且只有2个杠
     */
    WuXingBaGua,

    /**
     * 一条龙：胡牌时，牌型中包含同花色1-9
     */
    YiTiaoLong,

    /**
     * 三暗刻：有3个暗杠或暗刻
     */
    SanAnKe,

    /**
     * 大于五：胡牌牌型中所有牌的点数都大于5
     */
    DaYuWu,

    /**
     * 小于五：胡牌牌型中所有牌的点数都小于5
     */
    XiaoYuWu,

    /**
     * 三节高：胡牌牌型中包含3个同花色且点数连续的刻子/杠
     */
    SanJieGao,

    /**
     * 全双刻：胡牌牌型中只有刻/杠和将，且刻子点数都是偶数
     */
    QuanShuangKe,

    /**
     * 百万石：胡牌牌型中万字牌的点数>=100
     */
    BaiWanShi,

    /**
     * 推不倒：胡牌时只有245689条和1234589筒当中的牌组成的胡牌
     */
    TuiBuDao,

    /**
     * 十二金钗：胡牌时有3个杠
     */
    ShiErJinChai,

    /**
     * 四节高：牌型中包含4个同花色且点数连续的刻子/杠
     */
    SiJieGao,

    /**
     * 绿一色：牌型只由2、3、4、6、8条组成的胡牌牌型
     */
    LvYiSe,

    /**
     * 守中抱一：手牌只剩一张红中单钓红中的胡牌
     */
    ShouZhongBaoYi,

    /**
     * 全小：所有牌点数只有1,2,3
     */
    QuanXiao,

    /**
     * 全中：所有牌点数只有4,5,6
     */
    QuanZhong,

    /**
     * 全大：所有牌点数只有7,8,9
     */
    QuanDa,

    /**
     * 单龙七对：七对牌型中有4张相同牌。
     */
    DanLongQiDui,

    /**
     * 全带五：牌型中所有的顺子，刻子将都含有点数5
     */
    QuanDaiWu,

    /**
     * 四暗刻：有4个暗杠或暗刻
     */
    SiAnKe,

    /**
     * 双龙七对：七对牌型中有2个根。
     */
    ShuangLongQiDui,

    /**
     * 连七对：胡牌牌型为同花色点数相连的七个对子
     */
    LianQiDui,

    /**
     * 全幺九：胡牌牌型中只有点数1和9的牌组成
     */
    QuanYaoJiu,

    /**
     * 一色双龙会：胡牌牌型为同花色11223355778899
     */
    YiSeShuangLongHui,

    /**
     * 三龙七对：七对牌型中有3个根。
     */
    SanLongQiDui,
}

export default class hzxlGameIndependent extends AbstractGameIndependent{
    getGamePlayDesc(): string[] {
        return ["有缺打缺", "凑清一色", "自动杠牌", "自动胡牌"]
    }

    getFanConfig(fan): string {
        let Fan = hzxlFan
        switch (fan) {
            case Fan.ShiBaLuoHan:
                return "十八罗汉"
            case Fan.DaSanYuan:
                return "大三元"
            case Fan.DaSiXi:
                return "大四喜"
            case Fan.ShiSanYao:
                return "十三幺"
            case Fan.JiuBaoLianDeng:
                return "九宝莲灯"
            case Fan.QingLongQiDui:
                return "清龙七对"
            case Fan.TianHu:
                return "天胡"
            case Fan.DiHu:
                return "地胡"
            case Fan.XiaoSiXi:
                return "小四喜"
            case Fan.XiaoSanYuan:
                return " 小三元"
            case Fan.ZiYiSe:
                return "字一色"
            case Fan.QingQiDui:
                return "清七对"
            case Fan.QingPeng:
                return "清碰"
            case Fan.QiDui:
                return "七对"
            case Fan.QingYiSe:
                return "清一色"
            case Fan.HunPeng:
                return "混碰"
            case Fan.GangShangKaiHua:
                return " 杠上开花"
            case Fan.PengPengHu:
                return "碰碰胡"
            case Fan.HunYiSe:
                return "混一色"
            case Fan.MenQianQing:
                return "门前清"
            case Fan.ZiMo:
                return "自摸"
            case Fan.GangHouPao:
                return "杠后炮"
            case Fan.QiangGangHu:
                return "抢杠胡"
            case Fan.PingHu:
                return "平胡"
            case Fan.MingGang:
                return "明杠"
            case Fan.AnGang:
                return "暗杠"
            case Fan.BuGang:
                return "补杠"
            case Fan.JinGouGou:
                return "金钩钓"
            case Fan.DaiYaoJiu:
                return "全带幺"
            case Fan.JiangDui:
                return "将对"
            case Fan.QingJinGouGou:
                return "清金钩钓"
            case Fan.QingDaiYaoJiu:
                return "清幺九"
            case Fan.QingShiBaLuoHan:
                return "清十八罗汉"
            case Fan.MiaoShouHuiChun:
                return "妙手回春"
            case Fan.HaiDiLaoYue:
                return "海底捞月"
            case Fan.SuHu:
                return "素胡"
            case Fan.BianZhang:
                return "边张"
            case Fan.KanZhang:
                return "坎张"
            case Fan.DanDiao:
                return "单钓"
            case Fan.YiBanGao:
                return "一般高"
            case Fan.LiuLianShun:
                return "六连顺"
            case Fan.ShuangTongKe:
                return "双同刻"
            case Fan.LaoShaoPei:
                return "老少副"
            case Fan.DuanYaoJiu:
                return "断幺九"
            case Fan.ShuangAnKe:
                return "双暗刻"
            case Fan.ZhuoWuKui:
                return "捉五魁"
            case Fan.BuQiuRen:
                return "不求人"
            case Fan.WuXingBaGua:
                return "五行八卦"
            case Fan.YiTiaoLong:
                return "一条龙"
            case Fan.SanAnKe:
                return "三暗刻"
            case Fan.DaYuWu:
                return "大于五"
            case Fan.XiaoYuWu:
                return "小于五"
            case Fan.SanJieGao:
                return "三节高"
            case Fan.QuanShuangKe:
                return "全双刻"
            case Fan.BaiWanShi:
                return "百万石"
            case Fan.TuiBuDao:
                return "推不倒"
            case Fan.ShiErJinChai:
                return "十二金钗"
            case Fan.SiJieGao:
                return "四节高"
            case Fan.LvYiSe:
                return "绿一色"
            case Fan.ShouZhongBaoYi:
                return "守中抱一"
            case Fan.QuanXiao:
                return "全小"
            case Fan.QuanZhong:
                return "全中"
            case Fan.QuanDa:
                return "全大"
            case Fan.LongQiDui:
            case Fan.DanLongQiDui:
                return "龙七对"
            case Fan.QuanDaiWu:
                return "全带五"
            case Fan.SiAnKe:
                return "四暗刻"
            case Fan.ShuangLongQiDui:
                return "双龙七对"
            case Fan.LianQiDui:
                return "连七对"
            case Fan.QuanYaoJiu:
                return "全幺九"
            case Fan.YiSeShuangLongHui:
                return "一色双龙会"
            case Fan.SanLongQiDui:
                return "三龙七对"
        }
        return ""
    }

    initGame(initparams: any, cb: GameIndependentCallback): void {        
        cb(this, {})
    }

    getOpcodeConfig(op): string{
        switch (op) {
            case OperatorCode.OP_KONG:
            case OperatorCode.OP_KONG_TURN:
                return "刮风"
            case OperatorCode.OP_KONG_DARK:
                return "下雨"
            case OperatorCode.OP_HU_DIANPAO:
                return "吃胡"
            case OperatorCode.OP_HU_ZIMO:
                return "自摸"
            case OperatorCode.OP_HU_AFTER_KONG_TURN:
                return "抢杠胡"
        }
        return ""
    }

    getFanRatioConfig(fan: number): number{
        let Fan = hzxlFan
        switch (fan) {
            case Fan.SanLongQiDui:
                return 288
            case Fan.TianHu, Fan.DiHu:
                return 256
            case Fan.YiSeShuangLongHui, Fan.ShiBaLuoHan:
                return 128
            case Fan.QuanYaoJiu, Fan.LianQiDui, Fan.ShuangLongQiDui:
                return 96
            case Fan.JiuBaoLianDeng:
                return 64
            case Fan.SiAnKe, Fan.QuanDaiWu, Fan.DanLongQiDui:
                return 32
            case Fan.QuanDa, Fan.QuanZhong, Fan.QuanXiao, Fan.ShouZhongBaoYi, Fan.LvYiSe:
                return 24
            case Fan.DaiYaoJiu, Fan.ShiErJinChai, Fan.JiangDui, Fan.SiJieGao:
                return 16
            case Fan.QiDui:
                return 12
            case Fan.LongQiDui, Fan.BaiWanShi, Fan.QuanShuangKe, Fan.SanJieGao, Fan.XiaoYuWu, Fan.DaYuWu, Fan.SanAnKe, Fan.JinGouGou, Fan.TuiBuDao:
                return 8
            case Fan.YiTiaoLong:
                return 6
            case Fan.WuXingBaGua:
                return 5
            case Fan.QingYiSe, Fan.BuQiuRen, Fan.ZhuoWuKui, Fan.ShuangAnKe:
                return 4
            case Fan.PengPengHu, /*Fan.GangHouPao, Fan.QiangGangHu,*/ Fan.DuanYaoJiu, Fan.LaoShaoPei, Fan.ShuangTongKe, Fan.LiuLianShun, Fan.YiBanGao, Fan.DanDiao, Fan.KanZhang, Fan.BianZhang, Fan.SuHu/*, Fan.GangShangKaiHua, Fan.ZiMo, Fan.HaiDiLaoYue, Fan.HaiDiPao*/:
                return 2
            case Fan.PingHu:
                return 1
        }
        return 0
    }

    getPrivateRoomShowRuleLabels(): string[] {
        return ["base_room_time", "auto_play_game", "max_fan", "hongzhong_num", "change_card_num", "change_card_color", "hujiaozhuanyi", "youquedaque", "set_banker", "round_banker"]
    }
}

GameIndependent.register("09965902-5d1e-4632-ac38-8d4551dc1142", hzxlGameIndependent)