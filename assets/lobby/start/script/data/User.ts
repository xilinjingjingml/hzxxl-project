import { DataMgr } from "../base/DataMgr"
import { Constants } from "../igsConstants"

// const FACES = [
//     { avatar: "https://pictures.hiigame.com/qmddz/1.jpg", region: "上海市" },
//     { avatar: "https://pictures.hiigame.com/qmddz/2.jpg", region: "上海市" },
//     { avatar: "https://pictures.hiigame.com/qmddz/3.jpg", region: "上海市" },
//     { avatar: "https://pictures.hiigame.com/qmddz/4.jpg", region: "上海市" },
//     { avatar: "https://pictures.hiigame.com/qmddz/5.jpg", region: "上海市" },
//     { avatar: "https://pictures.hiigame.com/qmddz/6.jpg", region: "上海市" },
// ]


export class User {
    private static _userData: IPlayerData = null
    private static _invitationCode: string = ""

    static get Data() {
        if (!User._userData) {
            User._userData = DataMgr.getData<IPlayerData>(Constants.DATA_DEFINE.USER_INFO)
            if (!User._userData) {
                User._userData = {
                    openId: "10000",
                    userName: "我",
                    avatar: "faces/" + Math.floor(Math.random() * 100 % 6 + 1),
                    region: "上海市",
                    items: [
                        // { id: Constants.ITEM_INDEX.LOTTERY, num: 0 },
                        // { id: Constants.ITEM_INDEX.DIAMOND, num: 0 },
                    ],
                    histroy: {
                        playGame: 0,
                        allGame: 0,
                        platGame: 0,
                        winNum: 0,
                        winCon: 0,
                        records: []
                    },
                }
            }

            let items = {}
            for (let k in User._userData.items) {
                let i = User._userData.items[k]
                if (i) {
                    items[i.id] = User._userData.items[k]
                }
            }
            User._userData.items = items
        }

        return User._userData
    }

    static set Data(data: IPlayerData)  {
        if (User.Data.league) {
            data.league = User.Data.league
        }
        User._userData = data
        DataMgr.setData<IPlayerData>(Constants.DATA_DEFINE.USER_INFO, User._userData, true)
    }

    static get OpenID(): string {
        return User.Data.openId
    }

    static get UserName(): string {
        return User.Data.userName
    }

    static get Avatar(): string {
        return User.Data.avatar
    }

    static set Avatar(avatar: string) {
        let data = User.Data
        data.avatar = avatar
        User.Data = data
    }

    static get Region(): string {
        return User.Data.region
    }

    static set Region(region: string) {
        let data = User.Data
        data.region = region || data.region
        User.Data = data
    }

    static get RegTime(): number {
        return User.Data.regTime || Math.floor(Date.now() / 1000)
    }

    static get JoinTime(): number {
        return User.Data.joinTime || Math.floor(Date.now() / 1000)
    }

    static get UserLife(): number {
        return Math.floor((Date.now() / 1000 - User.Data.regTime) / 86400)
    }

    static get Lottery(): number {
        return User.Data.items[Constants.ITEM_INDEX.LOTTERY] && User.Data.items[Constants.ITEM_INDEX.LOTTERY].num || 0
    }

    static set Lottery(lottery: number) {
        let data = User.Data
        User.Data.items[Constants.ITEM_INDEX.LOTTERY].num = lottery
        User.Data = data
    }

    static get Gold(): number {
        return User.Data.items[Constants.ITEM_INDEX.GAME_GOLD] && User.Data.items[Constants.ITEM_INDEX.GAME_GOLD].num || 0
    }

    static set Gold(gold: number) {
        let data = User.Data
        User.Data.items[Constants.ITEM_INDEX.GAME_GOLD] = User.Data.items[Constants.ITEM_INDEX.GAME_GOLD] || {id:Constants.ITEM_INDEX.GAME_GOLD, num:0, expireAt:0}
        User.Data.items[Constants.ITEM_INDEX.GAME_GOLD].num = gold
        User.Data = data
    }

    static get GameDiamond(): number {
        return User.Data.items[Constants.ITEM_INDEX.GAME_DIAMOND] && User.Data.items[Constants.ITEM_INDEX.GAME_DIAMOND].num || 0
    }

    static set GameDiamond(num: number) {
        let data = User.Data
        User.Data.items[Constants.ITEM_INDEX.GAME_DIAMOND] = User.Data.items[Constants.ITEM_INDEX.GAME_DIAMOND] || {id:Constants.ITEM_INDEX.GAME_DIAMOND, num:0, expireAt:0}
        User.Data.items[Constants.ITEM_INDEX.GAME_DIAMOND].num = num
        User.Data = data
    }  
    
    static get GameBean(): number {
        return User.Data.items[Constants.ITEM_INDEX.GAME_BEAN] && User.Data.items[Constants.ITEM_INDEX.GAME_BEAN].num || 0
    }

    static set GameBean(num: number) {
        let data = User.Data
        User.Data.items[Constants.ITEM_INDEX.GAME_BEAN] = User.Data.items[Constants.ITEM_INDEX.GAME_BEAN] || {id:Constants.ITEM_INDEX.GAME_BEAN, num:0, expireAt:0}
        User.Data.items[Constants.ITEM_INDEX.GAME_BEAN].num = num
        User.Data = data
    }

    static get DoubleCard(): number {
        return User.Data.items[Constants.ITEM_INDEX.MJ_DOUBLE_CARD] && User.Data.items[Constants.ITEM_INDEX.MJ_DOUBLE_CARD].num || 0
    }

    static set DoubleCard(num: number) {
        let data = User.Data
        User.Data.items[Constants.ITEM_INDEX.MJ_DOUBLE_CARD] = User.Data.items[Constants.ITEM_INDEX.MJ_DOUBLE_CARD] || {id:Constants.ITEM_INDEX.MJ_DOUBLE_CARD, num:0, expireAt:0}
        User.Data.items[Constants.ITEM_INDEX.MJ_DOUBLE_CARD].num = num
        User.Data = data
    }

    static get CappedCard(): number {
        return User.Data.items[Constants.ITEM_INDEX.MJ_CAPPED_CARD] && User.Data.items[Constants.ITEM_INDEX.MJ_CAPPED_CARD].num || 0
    }

    static set CappedCard(num: number) {
        let data = User.Data
        User.Data.items[Constants.ITEM_INDEX.MJ_CAPPED_CARD] = User.Data.items[Constants.ITEM_INDEX.MJ_CAPPED_CARD] || {id:Constants.ITEM_INDEX.MJ_CAPPED_CARD, num:0, expireAt:0}
        User.Data.items[Constants.ITEM_INDEX.MJ_CAPPED_CARD].num = num
        User.Data = data
    }

    static get FuCard(): number {
        return User.Data.items[Constants.ITEM_INDEX.FuCard] && User.Data.items[Constants.ITEM_INDEX.FuCard].num || 0
    }

    static set FuCard(num: number) {
        let data = User.Data
        if(!User.Data.items[Constants.ITEM_INDEX.FuCard]){
            User.Data.items[Constants.ITEM_INDEX.FuCard] = {id:Constants.ITEM_INDEX.FuCard, num:0, expireAt:0}
        }
        User.Data.items[Constants.ITEM_INDEX.FuCard].num = num
        User.Data = data
    }
    
    static get MainToken() {
        return User.Data.items[DataMgr.data.Config.mainItemId]?.num || 0
    }

    static get Items(): { [index: number]: IItemInfo } {
        return User.Data.items
    }

    static set Items(items: { [index: number]: IItemInfo }) {
        let data = User.Data
        for (let i in items) {
            let id = items[i].id || 0
            if (!data.items[id]) {
                data.items[id] = {
                    id: id,
                    num: items[i].num
                }
            } else {
                data.items[id].num = items[i].num
            }
        }
        User.Data = data
    }

    static get Diamond(): number {
        return User.Data.items[Constants.ITEM_INDEX.DIAMOND] && User.Data.items[Constants.ITEM_INDEX.DIAMOND].num || 0
    }

    static set Diamond(diamond: number) {
        let data = User.Data
        User.Data.items[Constants.ITEM_INDEX.DIAMOND].num = diamond
        User.Data = data
    }

    static get PlayGame(): number {
        return User.Data.histroy.playGame || 0
    }

    static set PlayGame(games: number) {
        let data = User.Data
        User.Data.histroy.playGame = games
        User.Data = data
    }

    static get AllGame(): number {
        return User.Data.histroy.allGame || 0
    }

    static set AllGame(games: number) {
        let data = User.Data
        User.Data.histroy.allGame = games
        User.Data = data
    }

    static get PlatGame(): number {
        return User.Data.histroy.platGame || 0
    }

    static set PlatGame(games: number) {
        let data = User.Data
        User.Data.histroy.platGame = games
        User.Data = data
    }

    static get WinCon(): number {
        return User.Data.histroy.winCon || 0
    }

    static set WinCon(games: number) {
        let data = User.Data
        User.Data.histroy.winCon = games
        User.Data = data
    }

    static get WinNum(): number {
        return User.Data.histroy.winNum || 0
    }

    static set WinNum(games: number) {
        let data = User.Data
        User.Data.histroy.winNum = games
        User.Data = data
    }

    static get Records(): boolean[] {
        return User.Data.histroy.records || []
    }

    static set Records(records: boolean[]) {
        let data = User.Data
        User.Data.histroy.records = records
        User.Data = data
    }

    static get Levels()  {
        return User.Data.levels
    }

    static set Levels(levels) {
        let data = User.Data
        User.Data.levels = levels
        User.Data = data
    }

    static get League(): ILeagueBase[] {
        return User.Data.league || []
    }

    static set League(league: ILeagueBase[]) {
        let data = User.Data
        User.Data.league = league
        User.Data = data
    }

    static get GradeRank(): IGradeRank {
        return User.Data.gradeRank
    }

    static set GradeRank(gradeRank: IGradeRank) {
        let data = User.Data
        User.Data.gradeRank = gradeRank
        User.Data = data
    }

    static get PromRedPacket(): number {
        return User.Data.items[Constants.ITEM_INDEX.PROM_REDPACKET] && User.Data.items[Constants.ITEM_INDEX.PROM_REDPACKET].num || 0
    }

    static set PromRedPacket(promRedPacket: number) {
        let data = User.Data
        if (!User.Data.items[Constants.ITEM_INDEX.PROM_REDPACKET]) {
            User.Data.items[Constants.ITEM_INDEX.PROM_REDPACKET] = { id: Constants.ITEM_INDEX.PROM_REDPACKET, num: promRedPacket }
        } else {
            User.Data.items[Constants.ITEM_INDEX.PROM_REDPACKET].num = promRedPacket
        }
        User.Data = data
    }

    static get InvitationCode(): string {
        return User._invitationCode || ""
    }

    static set InvitationCode(invitationCode: string) {
        User._invitationCode = invitationCode
    }

    static get WxOpenId(): string {
        return User.Data.wxOpenId
    }

    static set WxOpenId(openId: string)  {
        let data = User.Data
        User.Data.wxOpenId = openId
        User.Data = data
    }

    static get RotaryTableCoin(): number {
        return User.Data.items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN] && User.Data.items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN].num || 0
    }

    static set RotaryTableCoin(rotaryTableCoin: number) {
        let data = User.Data
        if(!User.Data.items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN]){
            User.Data.items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN] = { id: Constants.ITEM_INDEX.ROTARY_TABLE_COIN, num: rotaryTableCoin }
        }else{
            User.Data.items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN].num = rotaryTableCoin
        }
        User.Data = data
    }

    static get QpVipLevel(): number {
        return User.Data.items[Constants.ITEM_INDEX.QpVipLevel] && User.Data.items[Constants.ITEM_INDEX.QpVipLevel].num || 0
    }

    static set QpVipLevel(QpVipLevel: number) {
        let data = User.Data
        if(!User.Data.items[Constants.ITEM_INDEX.QpVipLevel]){
            User.Data.items[Constants.ITEM_INDEX.QpVipLevel] = { id: Constants.ITEM_INDEX.QpVipLevel, num: QpVipLevel }
        }else{
            User.Data.items[Constants.ITEM_INDEX.QpVipLevel].num = QpVipLevel
        }
        User.Data = data
    }

    static get QpVipExp(): number {
        return User.Data.items[Constants.ITEM_INDEX.QpVipExp] && User.Data.items[Constants.ITEM_INDEX.QpVipExp].num || 0
    }

    static set QpVipExp(QpVipExp: number) {
        let data = User.Data
        if(!User.Data.items[Constants.ITEM_INDEX.QpVipExp]){
            User.Data.items[Constants.ITEM_INDEX.QpVipExp] = { id: Constants.ITEM_INDEX.ROTARY_TABLE_COIN, num: QpVipExp }
        }else{
            User.Data.items[Constants.ITEM_INDEX.QpVipExp].num = QpVipExp
        }
        User.Data = data
    }
}