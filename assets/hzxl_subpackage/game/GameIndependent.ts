
export interface IGameIndependent {
    initGame(initparams: any, cb: GameIndependentCallback):void;
    getGamePlayDesc(): string[];
    getFanConfig(fan: number): string;
    getOpcodeConfig(op: number): string;
    getFanRatioConfig(fan: number): number;
    getPrivateRoomShowRuleLabels(): string[]
}

export type GameIndependentCallback = (bt: IGameIndependent, params: any) => void

export class AbstractGameIndependent implements IGameIndependent {
    initGame(initparams: any, cb: GameIndependentCallback): void {
        throw new Error("Method not implemented.");
    }
    getGamePlayDesc(): string[] {
        // throw new Error("Method not implemented.");
        return []
    }
    getFanConfig(fan: number): string {
        // throw new Error("Method not implemented.");
        return ""
    }
    getOpcodeConfig(op: number): string {
        // throw new Error("Method not implemented.");
        return ""
    }
    getFanRatioConfig(fan: number): number {
        // throw new Error("Method not implemented.");
        return 0
    }
    getPrivateRoomShowRuleLabels(): string[] {
        throw new Error("Method not implemented.");
    }
}

class GameIndependentWrapper {
    booter: {new(): AbstractGameIndependent;}
}

export class GameIndependent {
    static GameIndependentDict: Map<string, GameIndependentWrapper> = new Map();
    static register<T extends AbstractGameIndependent>(name: string, clazz: { new (): T;}) {
        let bt = new GameIndependentWrapper()
        bt.booter = clazz
        this.GameIndependentDict.set(name, bt)
    }
    static getIndependent(name: string): {new(): AbstractGameIndependent;} {
        let bt = this.GameIndependentDict.get(name)
        return bt?.booter
    }
}