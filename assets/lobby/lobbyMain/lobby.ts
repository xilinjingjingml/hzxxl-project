import { PlatformApi } from "../start/script/api/platformApi";
import BaseUI from "../start/script/base/BaseUI";


const { ccclass, property } = cc._decorator;

@ccclass
export default class lobby extends BaseUI {
    protected onLoad(): void {
        console.log("lobbyScene onLoad")
    }

    protected start(): void {
        console.log("lobbyScene start")
    }

    onEnable() {
        PlatformApi.isInLobby = true
        localStorage.setItem("isInLobby", JSON.stringify(true))
    }

    onDisable(){
        PlatformApi.isInLobby = false
        localStorage.setItem("isInLobby", JSON.stringify(false))
    }
}
