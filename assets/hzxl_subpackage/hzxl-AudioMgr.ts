import { AudioConfig } from "./hzxl-AudioConfig";
import { scmjUtil } from "./hzxl-Util";

import { igs } from "../igs";
import { Util } from "../lobby/start/script/api/utilApi";
let izx = igs.izx

export namespace AudioMgr {

    export function playMusic(name) {
        if (!AudioConfig.audio_sounds_table['sound'][name]) {
            return false
        }
        let audioUrl = addSoundPath(AudioConfig.audio_sounds_table['sound'][name])
        scmjUtil.loadAsset(audioUrl, cc.AudioClip, (res) => {
            if (!res) {
                cc.log(res)
            } else {
                Util.SetBackgroundMusic(res)
                Util.PlayBackgroundMusic()
                // cc.audioEngine.playMusic(res, true)
            }
        });
    }

    export function stopBackground() {
        cc.audioEngine.stopMusic()
    }

    export function playSound(name, sex = null) {
        if (sex != null) {
            var sexname = name + ((sex == 1) ? 'woman' : 'man')
            if (ccPlaySound(sexname)) {
                return
            }
        }
        ccPlaySound(name)
    }

    export function playBackground() {
        stopBackground()
        playMusic('bg_music')
    }


    export function ccPlaySound(audioName) {
        if (!AudioConfig.audio_sounds_table['sound'][audioName]) {
            return false
        }
        let audioUrl = addSoundPath(AudioConfig.audio_sounds_table['sound'][audioName])
        // let dialect = izx.utils.isDialect()
        // if (dialect == 1) {
        //   audioUrl = audioUrl.replace("sounds/normal/", "sounds/dialect/")
        // }
        scmjUtil.loadAsset(audioUrl, cc.AudioClip, (res) => {
            if (!res) {
                cc.log(res)
            } else {
                cc.audioEngine.playEffect(res, false)
            }
        });
        return true
    }

    export function addSoundPath(path) {
        return path
    }

    export function playEffect(name: string, loop?: boolean | Function, cb?: Function) {
        if (typeof loop === "function") {
            cb = loop
            loop = null
        }
        let callback = (bundle) => {
            if (bundle) {
                bundle.load(name, cc.AudioClip, (err, res: cc.AudioClip) => {
                    if (err) {
                        console.log(name + " sound not exists!")
                        return
                    }

                    if (typeof loop !== "boolean") {
                        loop = false
                    }

                    let id = cc.audioEngine.playEffect(res, loop)
                    if (cb) {
                        // cc.audioEngine.setFinishCallback(id, cb);
                        cb(id)
                    }
                })
            }
        }
        let bundle = cc.resources
        if (bundle) {
            callback(bundle)
        } else {
            cc.assetManager.loadBundle("hzxl", (err, bundle) => {
                callback(bundle)
            });
        }
    }

    export function playBtn() {
        playSound("menu")
    }
}