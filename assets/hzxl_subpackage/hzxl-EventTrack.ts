/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2021-07-08 10:49:00
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-07-12 13:56:04
 */

import { igs } from "../igs";
import { Helper } from "../lobby/start/script/system/Helper";

export class TrackNames {
    // 游戏启动
    public static GAME_LAUNCH = "game-launch";
    // igs初始化前
    public static INIT_IGS = "init-igs"
    // igs初始化成功
    public static IGS_LAUNCH = "igs-launch"
    // 新手引导开始
    public static GAME_GUIDE_START = "game-guide-start"
    // 新手引导第1步开始
    public static GAME_GUIDE_STEP_1 = "game-guide-step-1"
    // 新手引导第2步开始
    public static GAME_GUIDE_STEP_2 = "game-guide-step-2"
    // 新手引导第3步开始
    public static GAME_GUIDE_STEP_3 = "game-guide-step-3"
    // 新手引导完成
    public static GAME_GUIDE_FINISH = "game-guide-finish"
    // 新手引导跳过
    public static GAME_GUIDE_SKIP = "game-guide-skip"
    // 进入游戏界面
    public static GAME_SCENE = "game-scene"
    // 退出游戏界面
    public static GAME_QUIT = "game-quit"
    // 游戏倒计时开始
    public static GAME_START_TIMER = "game-start-timer"
    // 进入结算界面
    public static GAME_RESULT = "game-result"
    // 动画
    public static READY_ANI_PLAY = "READY动画播放"
    // 第一局玩家匹配（准备等待环节）
    public static GAME_ROUND_41_MATCH = "游戏-4.1玩家匹配（准备等待环节）"
    // 第一局玩家匹配成功
    public static GAME_ROUND_41_MATCH_SUCCESS = "游戏-4.1.1玩家匹配成功"
    // 第一局牌局开始
    public static GAME_ROUND_42_BEGIN_GAME = "游戏-4.2牌局开始"
    // 第一局牌局中-玩家手动选择换牌
    public static GAME_ROUND_421_EXCHANGE_CARDS = "游戏-4.2.1牌局中-玩家手动选择换牌"
    // 第一局牌局中-玩家手动定缺
    public static GAME_ROUND_422_LACK = "游戏-4.2.2牌局中-玩家手动定缺"
    // 第一局牌局中-玩家手动出牌
    public static GAME_ROUND_423_CHU_PAI = "游戏-4.2.3牌局中-玩家手动出牌"
    // 第一局牌局中-进入托管状态
    public static GAME_ROUND_424_AUTO_ON = "游戏-4.2.4牌局中-进入托管状态"
    // 第一局牌局中-取消托管
    public static GAME_ROUND_425_AUTO_OFF = "游戏-4.2.5牌局中-取消托管"
    // 第一局牌局中-手动返回大厅
    public static GAME_ROUND_426_BACK_LOBBY = "游戏-4.2.6牌局中-手动返回大厅"
    // 第一局牌局中-切换到后台
    public static GAME_ROUND_427_HIDE = "游戏-4.2.7牌局中-切换到后台"
    // 第一局牌局结算
    public static GAME_ROUND_43_END_GAME = "游戏-4.3牌局结算"
    // 第一局结算界面-返回大厅
    public static GAME_ROUND_431_BACK_LOBBY = "游戏-4.3.1结算界面-返回大厅"
    // 第一局结算界面-切换到后台
    public static GAME_ROUND_432_HIDE = "游戏-4.3.2结算界面-切换到后台"
    // 第一局下一局
    public static GAME_ROUND_44_NEXT_GAME = "游戏-4.4下一局"
    // 第二局开始游戏
    public static GAME_ROUND_51_BEGIN_GAME = "游戏-5.1开始游戏"
    // 第二局结束游戏
    public static GAME_ROUND_52_END_GAME = "游戏-5.2结束游戏"
    // 骰子动画开始
    public static GAME_ROUND_DICE_BEGIN = "游戏-4.2.0.1骰子动画开始"
    // 骰子动画结束
    public static GAME_ROUND_DICE_END = "游戏-4.2.0.2骰子动画结束"
    // 骰子动画失败
    public static GAME_ROUND_DICE_FAIL = "游戏-4.2.0.3骰子动画失败"
    // 定庄开始
    public static GAME_ROUND_SET_BANKER_BEGIN = "游戏-4.2.0.4定庄开始"
    // 定庄结束
    public static GAME_ROUND_SET_BANKER_END = "游戏-4.2.0.5定庄结束"
    // 发牌开始
    public static GAME_ROUND_DEAL_BEGIN = "游戏-4.2.0.6发牌开始"
    // 发牌结束
    public static GAME_ROUND_DEAL_END = "游戏-4.2.0.7发牌结束"
}

let userLabel = () => {
    if (!window['iGaoShouApi']) {
        return "newbie-unknown"
    }
    let self = iGaoShouApi.GetSelf()
    if (!self) {
        return "newbie-unknown"
    }
    return self.newbie ? "newbie-true" : "newbie-false"
}

export default class EventTrack {
    static add(name: string) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            Helper.reportEvent(name/* + "-" + userLabel()*/)
        }
    }
}