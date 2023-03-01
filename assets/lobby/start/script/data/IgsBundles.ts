export class IgsBundles {
    static async Preload(name: string, asset: string) {
        cc.assetManager.getBundle(name) || await IgsBundles.load(name)
        cc.assetManager.getBundle(name).preload(asset)
    }

    static async Load(name: string, asset: string) {
        cc.assetManager.getBundle(name) || await IgsBundles.load(name)
        cc.assetManager.getBundle(name).load(asset, )
    }

    static load(name: string, callback?:Function) {
        return new Promise((resolve, reject) =>
            cc.assetManager.loadBundle(name, (err, asset) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve(asset)
                }                
            })
        ).then((asset) => callback?.(asset))
        .catch(() => callback?.(null))
    }


}