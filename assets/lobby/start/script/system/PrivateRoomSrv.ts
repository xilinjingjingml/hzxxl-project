import { Helper } from "./Helper"

const GET_LIST_GAME_RESULE = "igaoshou-club-srv/club/listGameResult"
const GET_DESC_GAME_RESULE = "igaoshou-club-srv/club/descGameResult"

const GET_REPLAY = "igaoshou-club-srv/club/getReplay"

export namespace PrivateRoomSrv {

    export function GetListGameResult(param: any, callback: Function) {
        Helper.PostHttp(GET_LIST_GAME_RESULE, null, param, (res) => {
            console.log("GET_LIST_GAME_RESULE", res)
            if (res) {
                callback && callback(res)
            }
        })
    }

    export function GetDescGameResult(param: any, callback: Function) {
        Helper.PostHttp(GET_DESC_GAME_RESULE, null, param, (res) => {
            console.log("GET_DESC_GAME_RESULE", res)
            if (res) {
                callback && callback(res)
            }
        })
    }

    export function GetReplay(param: any, callback: Function) {
        Helper.PostHttp(GET_REPLAY, null, param, (res) => {
            console.log("GET_REPLAY", res)
            if (res) {
                callback && callback(res)
            }
        })
    }
}