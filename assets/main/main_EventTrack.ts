/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2021-07-08 10:49:00
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-18 18:15:32
 */

import { igs } from "../igs";



export class TrackNames {
    // 游戏启动
    public static GAME_LAUNCH = "方块-game-launch";
}

let userLabel = ()=>{
    if (!window.iGaoShouApi) {
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
            igs.platform.trackEvent(name + "-" + userLabel())
        }
    }
}