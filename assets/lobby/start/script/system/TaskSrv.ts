import { Helper } from "./Helper"
import { Constants } from "../igsConstants"
import { DataMgr } from "../base/DataMgr"
import { UIMgr } from "../base/UIMgr";
import { EventMgr } from "../base/EventMgr";

const GET_TASK_LIST_URI = "igaoshou-task-srv/task/GetTaskList"
const GET_AWARD = "igaoshou-task-srv/task/GetAward"
const GET_NEXT = "igaoshou-task-srv/task/GetNextTask"

const UPDATE_TASK_STATUS = "igaoshou-task-srv/task/UpdateTaskStatus"

export namespace TaskSrv {
    export function GetTaskList(callback?: Function) {
        Helper.PostHttp(GET_TASK_LIST_URI, null, null, (res) => {
            console.log("GET_TASK_LIST_URI", res)
            if (res && res.list) {
                for(let v of res.list){
                    v.cond_type = v.cond_type || 0                    
                    v.status = v.status || 0
                }
                callback && callback(res)
                EventMgr.dispatchEvent(Constants.EVENT_DEFINE.TASK_UPDATE, res)
            }
        })
    }

    export function GetAward(task_id: string, callback?: Function) {
        let param = {
            task_id: task_id
        }
        Helper.PostHttp(GET_AWARD, null, param, (res) => {
            console.log("GET_AWARD", res)
            if (res) {
                callback && callback(res)                
            }
        })
    }

    export function GetNextTask(task_id: string, callback?: Function) {
        // 在线参数
        if ((task_id === "1005" || task_id === "1006") && DataMgr.data.OnlineParam.full_round_dialog_box === 0)  {
            callback && callback(null)
            
            return
        }

        let param = {
            group_id: task_id
        }
        Helper.PostHttp(GET_NEXT, null, param, (res) => {
            cc.log("GET_NEXT", res)
            if (res) {
                callback && callback(res)
                
            }
        })
    }

    export function UpdateTaskStatus(id: string, progress: number, callback?: Function) {
        let param = {
            task_tid: id,
            progress: progress
        }
        Helper.PostHttp(UPDATE_TASK_STATUS, null, param, (res) => {
            if (!res.err) {
                callback?.(true)
                return
            }

            callback?.(false)
        })
    }
}