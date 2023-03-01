import { DataMgr } from "../base/DataMgr"
import { Constants } from "../igsConstants"
import { User } from "./User"

class Friends {
    static _instance = null

    static getInstance() {
        if (!Friends._instance) {
            Friends._instance = new Friends()
        }

        return Friends._instance
    }

    private constructor() {
        this.friends = DataMgr.getData<{ [index: string]: { openid: string, time: number }[] }>(Constants.DATA_DEFINE.FRIEND_LIST) || {}
    }

    friends: { [index: string]: { openid: string, time: number }[] } = {}
    AddFriend(gameid: string, openid: string) {
        if (!gameid) return
        if (!openid || openid === User.OpenID) return

        if (!this.friends[gameid]) {
            this.friends[gameid] = []
        }

        let idx = -1
        for (let i in this.friends[gameid]) {
            if (this.friends[gameid][i].openid === openid) {
                idx = Number(i)
                break;
            }
        }

        if (idx >= 0) {
            this.friends[gameid].splice(idx, 1)
        }

        this.friends[gameid].push({ openid: openid, time: Date.now() })
        if (this.friends[gameid].length > 30) {
            this.friends[gameid].shift()
        }
        DataMgr.setData(Constants.DATA_DEFINE.FRIEND_LIST, this.friends, true)
    }

    GetFriendsByGame(gameid: string): { openid: string, time: number }[] {
        let list = []
        if(this.friends[gameid]){
            list = list.concat(this.friends[gameid])
        }
        return list.reverse()
    }

    GetFriends(): { openid: string, time: number, gameid: string }[] {
        let list = []
        for (let k in this.friends) {
            list.concat(this.friends[k].map(i => i["gameid"] = k))
        }

        list.sort((a, b) => a.time - b.time)

        return list.splice(list.length - 30)
    }
}

export let LocalFriends: {
    AddFriend(gameid: string, openid: string)
    GetFriendsByGame(gameid: string): { openid: string, time: number }[]
} = Friends.getInstance()