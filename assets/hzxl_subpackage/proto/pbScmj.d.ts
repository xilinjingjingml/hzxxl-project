import * as $protobuf from "protobufjs";
/** Namespace scmj. */
export namespace scmj {

    /** Represents a Scmj */
    class Scmj extends $protobuf.rpc.Service {

        /**
         * Constructs a new Scmj service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new Scmj service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Scmj;

        /**
         * Calls Operate.
         * @param request OperateRsp message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public operate(request: scmj.IOperateRsp, callback: scmj.Scmj.OperateCallback): void;

        /**
         * Calls Operate.
         * @param request OperateRsp message or plain object
         * @returns Promise
         */
        public operate(request: scmj.IOperateRsp): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Exchange.
         * @param request ExchangeRsp message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public exchange(request: scmj.IExchangeRsp, callback: scmj.Scmj.ExchangeCallback): void;

        /**
         * Calls Exchange.
         * @param request ExchangeRsp message or plain object
         * @returns Promise
         */
        public exchange(request: scmj.IExchangeRsp): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Lack.
         * @param request LackRsp message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public lack(request: scmj.ILackRsp, callback: scmj.Scmj.LackCallback): void;

        /**
         * Calls Lack.
         * @param request LackRsp message or plain object
         * @returns Promise
         */
        public lack(request: scmj.ILackRsp): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Bill.
         * @param request BillReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public bill(request: scmj.IBillReq, callback: scmj.Scmj.BillCallback): void;

        /**
         * Calls Bill.
         * @param request BillReq message or plain object
         * @returns Promise
         */
        public bill(request: scmj.IBillReq): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Complete.
         * @param request CompleteReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public complete(request: scmj.ICompleteReq, callback: scmj.Scmj.CompleteCallback): void;

        /**
         * Calls Complete.
         * @param request CompleteReq message or plain object
         * @returns Promise
         */
        public complete(request: scmj.ICompleteReq): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Auto.
         * @param request AutoReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public auto(request: scmj.IAutoReq, callback: scmj.Scmj.AutoCallback): void;

        /**
         * Calls Auto.
         * @param request AutoReq message or plain object
         * @returns Promise
         */
        public auto(request: scmj.IAutoReq): Promise<scmj.ScmjEmpty>;

        /**
         * Calls TingTip.
         * @param request TingTipReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public tingTip(request: scmj.ITingTipReq, callback: scmj.Scmj.TingTipCallback): void;

        /**
         * Calls TingTip.
         * @param request TingTipReq message or plain object
         * @returns Promise
         */
        public tingTip(request: scmj.ITingTipReq): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Ai.
         * @param request AiReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public ai(request: scmj.IAiReq, callback: scmj.Scmj.AiCallback): void;

        /**
         * Calls Ai.
         * @param request AiReq message or plain object
         * @returns Promise
         */
        public ai(request: scmj.IAiReq): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Chat.
         * @param request ChatReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public chat(request: scmj.IChatReq, callback: scmj.Scmj.ChatCallback): void;

        /**
         * Calls Chat.
         * @param request ChatReq message or plain object
         * @returns Promise
         */
        public chat(request: scmj.IChatReq): Promise<scmj.ScmjEmpty>;

        /**
         * Calls Recharge.
         * @param request RechargeRsp message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public recharge(request: scmj.IRechargeRsp, callback: scmj.Scmj.RechargeCallback): void;

        /**
         * Calls Recharge.
         * @param request RechargeRsp message or plain object
         * @returns Promise
         */
        public recharge(request: scmj.IRechargeRsp): Promise<scmj.ScmjEmpty>;

        /**
         * Calls CapMultiple.
         * @param request CapMultipleRsp message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public capMultiple(request: scmj.ICapMultipleRsp, callback: scmj.Scmj.CapMultipleCallback): void;

        /**
         * Calls CapMultiple.
         * @param request CapMultipleRsp message or plain object
         * @returns Promise
         */
        public capMultiple(request: scmj.ICapMultipleRsp): Promise<scmj.ScmjEmpty>;

        /**
         * Calls PrivateRoomResult.
         * @param request PrivateRoomResultReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ScmjEmpty
         */
        public privateRoomResult(request: scmj.IPrivateRoomResultReq, callback: scmj.Scmj.PrivateRoomResultCallback): void;

        /**
         * Calls PrivateRoomResult.
         * @param request PrivateRoomResultReq message or plain object
         * @returns Promise
         */
        public privateRoomResult(request: scmj.IPrivateRoomResultReq): Promise<scmj.ScmjEmpty>;
    }

    namespace Scmj {

        /**
         * Callback as used by {@link scmj.Scmj#operate}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type OperateCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#exchange}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type ExchangeCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#lack}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type LackCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#bill}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type BillCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#complete}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type CompleteCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#auto}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type AutoCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#tingTip}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type TingTipCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#ai}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type AiCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#chat}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type ChatCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#recharge}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type RechargeCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#capMultiple}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type CapMultipleCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;

        /**
         * Callback as used by {@link scmj.Scmj#privateRoomResult}.
         * @param error Error, if any
         * @param [response] ScmjEmpty
         */
        type PrivateRoomResultCallback = (error: (Error|null), response?: scmj.ScmjEmpty) => void;
    }

    /** Properties of a ScmjEmpty. */
    interface IScmjEmpty {
    }

    /** Represents a ScmjEmpty. */
    class ScmjEmpty implements IScmjEmpty {

        /**
         * Constructs a new ScmjEmpty.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IScmjEmpty);

        /**
         * Creates a new ScmjEmpty instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ScmjEmpty instance
         */
        public static create(properties?: scmj.IScmjEmpty): scmj.ScmjEmpty;

        /**
         * Encodes the specified ScmjEmpty message. Does not implicitly {@link scmj.ScmjEmpty.verify|verify} messages.
         * @param message ScmjEmpty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IScmjEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ScmjEmpty message, length delimited. Does not implicitly {@link scmj.ScmjEmpty.verify|verify} messages.
         * @param message ScmjEmpty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IScmjEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ScmjEmpty message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ScmjEmpty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ScmjEmpty;

        /**
         * Decodes a ScmjEmpty message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ScmjEmpty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ScmjEmpty;

        /**
         * Verifies a ScmjEmpty message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ScmjEmpty message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ScmjEmpty
         */
        public static fromObject(object: { [k: string]: any }): scmj.ScmjEmpty;

        /**
         * Creates a plain object from a ScmjEmpty message. Also converts values to other types if specified.
         * @param message ScmjEmpty
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ScmjEmpty, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ScmjEmpty to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClientTimerNoti. */
    interface IClientTimerNoti {

        /** ClientTimerNoti chairId */
        chairId?: (number|null);

        /** ClientTimerNoti second */
        second?: (number|null);

        /** ClientTimerNoti remainCardNum */
        remainCardNum?: (number|null);
    }

    /** Represents a ClientTimerNoti. */
    class ClientTimerNoti implements IClientTimerNoti {

        /**
         * Constructs a new ClientTimerNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IClientTimerNoti);

        /** ClientTimerNoti chairId. */
        public chairId: number;

        /** ClientTimerNoti second. */
        public second: number;

        /** ClientTimerNoti remainCardNum. */
        public remainCardNum: number;

        /**
         * Creates a new ClientTimerNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientTimerNoti instance
         */
        public static create(properties?: scmj.IClientTimerNoti): scmj.ClientTimerNoti;

        /**
         * Encodes the specified ClientTimerNoti message. Does not implicitly {@link scmj.ClientTimerNoti.verify|verify} messages.
         * @param message ClientTimerNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IClientTimerNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientTimerNoti message, length delimited. Does not implicitly {@link scmj.ClientTimerNoti.verify|verify} messages.
         * @param message ClientTimerNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IClientTimerNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientTimerNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientTimerNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ClientTimerNoti;

        /**
         * Decodes a ClientTimerNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientTimerNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ClientTimerNoti;

        /**
         * Verifies a ClientTimerNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientTimerNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientTimerNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ClientTimerNoti;

        /**
         * Creates a plain object from a ClientTimerNoti message. Also converts values to other types if specified.
         * @param message ClientTimerNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ClientTimerNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientTimerNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MjPlayMarkNoti. */
    interface IMjPlayMarkNoti {

        /** MjPlayMarkNoti chairId */
        chairId?: (number|null);

        /** MjPlayMarkNoti hide */
        hide?: (boolean|null);
    }

    /** Represents a MjPlayMarkNoti. */
    class MjPlayMarkNoti implements IMjPlayMarkNoti {

        /**
         * Constructs a new MjPlayMarkNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IMjPlayMarkNoti);

        /** MjPlayMarkNoti chairId. */
        public chairId: number;

        /** MjPlayMarkNoti hide. */
        public hide: boolean;

        /**
         * Creates a new MjPlayMarkNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MjPlayMarkNoti instance
         */
        public static create(properties?: scmj.IMjPlayMarkNoti): scmj.MjPlayMarkNoti;

        /**
         * Encodes the specified MjPlayMarkNoti message. Does not implicitly {@link scmj.MjPlayMarkNoti.verify|verify} messages.
         * @param message MjPlayMarkNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IMjPlayMarkNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MjPlayMarkNoti message, length delimited. Does not implicitly {@link scmj.MjPlayMarkNoti.verify|verify} messages.
         * @param message MjPlayMarkNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IMjPlayMarkNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MjPlayMarkNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MjPlayMarkNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.MjPlayMarkNoti;

        /**
         * Decodes a MjPlayMarkNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MjPlayMarkNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.MjPlayMarkNoti;

        /**
         * Verifies a MjPlayMarkNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MjPlayMarkNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MjPlayMarkNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.MjPlayMarkNoti;

        /**
         * Creates a plain object from a MjPlayMarkNoti message. Also converts values to other types if specified.
         * @param message MjPlayMarkNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.MjPlayMarkNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MjPlayMarkNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserItem. */
    interface IUserItem {

        /** UserItem uid */
        uid?: (string|null);

        /** UserItem nickname */
        nickname?: (string|null);

        /** UserItem score */
        score?: (number|Long|null);

        /** UserItem giveup */
        giveup?: (boolean|null);
    }

    /** Represents a UserItem. */
    class UserItem implements IUserItem {

        /**
         * Constructs a new UserItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IUserItem);

        /** UserItem uid. */
        public uid: string;

        /** UserItem nickname. */
        public nickname: string;

        /** UserItem score. */
        public score: (number|Long);

        /** UserItem giveup. */
        public giveup: boolean;

        /**
         * Creates a new UserItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserItem instance
         */
        public static create(properties?: scmj.IUserItem): scmj.UserItem;

        /**
         * Encodes the specified UserItem message. Does not implicitly {@link scmj.UserItem.verify|verify} messages.
         * @param message UserItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IUserItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserItem message, length delimited. Does not implicitly {@link scmj.UserItem.verify|verify} messages.
         * @param message UserItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IUserItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.UserItem;

        /**
         * Decodes a UserItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.UserItem;

        /**
         * Verifies a UserItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserItem
         */
        public static fromObject(object: { [k: string]: any }): scmj.UserItem;

        /**
         * Creates a plain object from a UserItem message. Also converts values to other types if specified.
         * @param message UserItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.UserItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterNotiItem. */
    interface IEnterNotiItem {

        /** EnterNotiItem chairId */
        chairId?: (number|null);

        /** EnterNotiItem ready */
        ready?: (number|null);

        /** EnterNotiItem data */
        data?: (scmj.IUserItem|null);
    }

    /** Represents an EnterNotiItem. */
    class EnterNotiItem implements IEnterNotiItem {

        /**
         * Constructs a new EnterNotiItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IEnterNotiItem);

        /** EnterNotiItem chairId. */
        public chairId: number;

        /** EnterNotiItem ready. */
        public ready: number;

        /** EnterNotiItem data. */
        public data?: (scmj.IUserItem|null);

        /**
         * Creates a new EnterNotiItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterNotiItem instance
         */
        public static create(properties?: scmj.IEnterNotiItem): scmj.EnterNotiItem;

        /**
         * Encodes the specified EnterNotiItem message. Does not implicitly {@link scmj.EnterNotiItem.verify|verify} messages.
         * @param message EnterNotiItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IEnterNotiItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterNotiItem message, length delimited. Does not implicitly {@link scmj.EnterNotiItem.verify|verify} messages.
         * @param message EnterNotiItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IEnterNotiItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterNotiItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterNotiItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.EnterNotiItem;

        /**
         * Decodes an EnterNotiItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterNotiItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.EnterNotiItem;

        /**
         * Verifies an EnterNotiItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterNotiItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterNotiItem
         */
        public static fromObject(object: { [k: string]: any }): scmj.EnterNotiItem;

        /**
         * Creates a plain object from an EnterNotiItem message. Also converts values to other types if specified.
         * @param message EnterNotiItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.EnterNotiItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterNotiItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterAck. */
    interface IEnterAck {

        /** EnterAck ret */
        ret?: (number|null);

        /** EnterAck items */
        items?: (scmj.IEnterNotiItem[]|null);
    }

    /** Represents an EnterAck. */
    class EnterAck implements IEnterAck {

        /**
         * Constructs a new EnterAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IEnterAck);

        /** EnterAck ret. */
        public ret: number;

        /** EnterAck items. */
        public items: scmj.IEnterNotiItem[];

        /**
         * Creates a new EnterAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterAck instance
         */
        public static create(properties?: scmj.IEnterAck): scmj.EnterAck;

        /**
         * Encodes the specified EnterAck message. Does not implicitly {@link scmj.EnterAck.verify|verify} messages.
         * @param message EnterAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IEnterAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterAck message, length delimited. Does not implicitly {@link scmj.EnterAck.verify|verify} messages.
         * @param message EnterAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IEnterAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.EnterAck;

        /**
         * Decodes an EnterAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.EnterAck;

        /**
         * Verifies an EnterAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterAck
         */
        public static fromObject(object: { [k: string]: any }): scmj.EnterAck;

        /**
         * Creates a plain object from an EnterAck message. Also converts values to other types if specified.
         * @param message EnterAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.EnterAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterNoti. */
    interface IEnterNoti {

        /** EnterNoti item */
        item?: (scmj.IEnterNotiItem|null);
    }

    /** Represents an EnterNoti. */
    class EnterNoti implements IEnterNoti {

        /**
         * Constructs a new EnterNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IEnterNoti);

        /** EnterNoti item. */
        public item?: (scmj.IEnterNotiItem|null);

        /**
         * Creates a new EnterNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterNoti instance
         */
        public static create(properties?: scmj.IEnterNoti): scmj.EnterNoti;

        /**
         * Encodes the specified EnterNoti message. Does not implicitly {@link scmj.EnterNoti.verify|verify} messages.
         * @param message EnterNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IEnterNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterNoti message, length delimited. Does not implicitly {@link scmj.EnterNoti.verify|verify} messages.
         * @param message EnterNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IEnterNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.EnterNoti;

        /**
         * Decodes an EnterNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.EnterNoti;

        /**
         * Verifies an EnterNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.EnterNoti;

        /**
         * Creates a plain object from an EnterNoti message. Also converts values to other types if specified.
         * @param message EnterNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.EnterNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BeginGameNoti. */
    interface IBeginGameNoti {
    }

    /** Represents a BeginGameNoti. */
    class BeginGameNoti implements IBeginGameNoti {

        /**
         * Constructs a new BeginGameNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IBeginGameNoti);

        /**
         * Creates a new BeginGameNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BeginGameNoti instance
         */
        public static create(properties?: scmj.IBeginGameNoti): scmj.BeginGameNoti;

        /**
         * Encodes the specified BeginGameNoti message. Does not implicitly {@link scmj.BeginGameNoti.verify|verify} messages.
         * @param message BeginGameNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IBeginGameNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BeginGameNoti message, length delimited. Does not implicitly {@link scmj.BeginGameNoti.verify|verify} messages.
         * @param message BeginGameNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IBeginGameNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BeginGameNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BeginGameNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.BeginGameNoti;

        /**
         * Decodes a BeginGameNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BeginGameNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.BeginGameNoti;

        /**
         * Verifies a BeginGameNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BeginGameNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BeginGameNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.BeginGameNoti;

        /**
         * Creates a plain object from a BeginGameNoti message. Also converts values to other types if specified.
         * @param message BeginGameNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.BeginGameNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BeginGameNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TaxNoti. */
    interface ITaxNoti {

        /** TaxNoti tax */
        tax?: (number|Long|null);
    }

    /** Represents a TaxNoti. */
    class TaxNoti implements ITaxNoti {

        /**
         * Constructs a new TaxNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ITaxNoti);

        /** TaxNoti tax. */
        public tax: (number|Long);

        /**
         * Creates a new TaxNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaxNoti instance
         */
        public static create(properties?: scmj.ITaxNoti): scmj.TaxNoti;

        /**
         * Encodes the specified TaxNoti message. Does not implicitly {@link scmj.TaxNoti.verify|verify} messages.
         * @param message TaxNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ITaxNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaxNoti message, length delimited. Does not implicitly {@link scmj.TaxNoti.verify|verify} messages.
         * @param message TaxNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ITaxNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaxNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaxNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.TaxNoti;

        /**
         * Decodes a TaxNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaxNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.TaxNoti;

        /**
         * Verifies a TaxNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaxNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaxNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.TaxNoti;

        /**
         * Creates a plain object from a TaxNoti message. Also converts values to other types if specified.
         * @param message TaxNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.TaxNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaxNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SetBankerNoti. */
    interface ISetBankerNoti {

        /** SetBankerNoti chairId */
        chairId?: (number|null);

        /** SetBankerNoti dices */
        dices?: (number[]|null);

        /** SetBankerNoti setEast */
        setEast?: (number|null);
    }

    /** Represents a SetBankerNoti. */
    class SetBankerNoti implements ISetBankerNoti {

        /**
         * Constructs a new SetBankerNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ISetBankerNoti);

        /** SetBankerNoti chairId. */
        public chairId: number;

        /** SetBankerNoti dices. */
        public dices: number[];

        /** SetBankerNoti setEast. */
        public setEast: number;

        /**
         * Creates a new SetBankerNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SetBankerNoti instance
         */
        public static create(properties?: scmj.ISetBankerNoti): scmj.SetBankerNoti;

        /**
         * Encodes the specified SetBankerNoti message. Does not implicitly {@link scmj.SetBankerNoti.verify|verify} messages.
         * @param message SetBankerNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ISetBankerNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SetBankerNoti message, length delimited. Does not implicitly {@link scmj.SetBankerNoti.verify|verify} messages.
         * @param message SetBankerNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ISetBankerNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SetBankerNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SetBankerNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.SetBankerNoti;

        /**
         * Decodes a SetBankerNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SetBankerNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.SetBankerNoti;

        /**
         * Verifies a SetBankerNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SetBankerNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SetBankerNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.SetBankerNoti;

        /**
         * Creates a plain object from a SetBankerNoti message. Also converts values to other types if specified.
         * @param message SetBankerNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.SetBankerNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SetBankerNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdateCardsNoti. */
    interface IUpdateCardsNoti {

        /** UpdateCardsNoti chairId */
        chairId?: (number|null);

        /** UpdateCardsNoti handcards */
        handcards?: (number[]|null);

        /** UpdateCardsNoti leftcards */
        leftcards?: (number[]|null);

        /** UpdateCardsNoti dispcards */
        dispcards?: (number[]|null);

        /** UpdateCardsNoti hucards */
        hucards?: (number[]|null);

        /** UpdateCardsNoti card */
        card?: (number|null);

        /** UpdateCardsNoti wallTiles */
        wallTiles?: (number[]|null);

        /** UpdateCardsNoti playCards */
        playCards?: (number[]|null);
    }

    /** Represents an UpdateCardsNoti. */
    class UpdateCardsNoti implements IUpdateCardsNoti {

        /**
         * Constructs a new UpdateCardsNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IUpdateCardsNoti);

        /** UpdateCardsNoti chairId. */
        public chairId: number;

        /** UpdateCardsNoti handcards. */
        public handcards: number[];

        /** UpdateCardsNoti leftcards. */
        public leftcards: number[];

        /** UpdateCardsNoti dispcards. */
        public dispcards: number[];

        /** UpdateCardsNoti hucards. */
        public hucards: number[];

        /** UpdateCardsNoti card. */
        public card: number;

        /** UpdateCardsNoti wallTiles. */
        public wallTiles: number[];

        /** UpdateCardsNoti playCards. */
        public playCards: number[];

        /**
         * Creates a new UpdateCardsNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateCardsNoti instance
         */
        public static create(properties?: scmj.IUpdateCardsNoti): scmj.UpdateCardsNoti;

        /**
         * Encodes the specified UpdateCardsNoti message. Does not implicitly {@link scmj.UpdateCardsNoti.verify|verify} messages.
         * @param message UpdateCardsNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IUpdateCardsNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateCardsNoti message, length delimited. Does not implicitly {@link scmj.UpdateCardsNoti.verify|verify} messages.
         * @param message UpdateCardsNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IUpdateCardsNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateCardsNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateCardsNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.UpdateCardsNoti;

        /**
         * Decodes an UpdateCardsNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateCardsNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.UpdateCardsNoti;

        /**
         * Verifies an UpdateCardsNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateCardsNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateCardsNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.UpdateCardsNoti;

        /**
         * Creates a plain object from an UpdateCardsNoti message. Also converts values to other types if specified.
         * @param message UpdateCardsNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.UpdateCardsNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateCardsNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExchangeReq. */
    interface IExchangeReq {

        /** ExchangeReq cards */
        cards?: (number[]|null);

        /** ExchangeReq type */
        type?: (number|null);
    }

    /** Represents an ExchangeReq. */
    class ExchangeReq implements IExchangeReq {

        /**
         * Constructs a new ExchangeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IExchangeReq);

        /** ExchangeReq cards. */
        public cards: number[];

        /** ExchangeReq type. */
        public type: number;

        /**
         * Creates a new ExchangeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExchangeReq instance
         */
        public static create(properties?: scmj.IExchangeReq): scmj.ExchangeReq;

        /**
         * Encodes the specified ExchangeReq message. Does not implicitly {@link scmj.ExchangeReq.verify|verify} messages.
         * @param message ExchangeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IExchangeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExchangeReq message, length delimited. Does not implicitly {@link scmj.ExchangeReq.verify|verify} messages.
         * @param message ExchangeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IExchangeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExchangeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExchangeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ExchangeReq;

        /**
         * Decodes an ExchangeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExchangeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ExchangeReq;

        /**
         * Verifies an ExchangeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExchangeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExchangeReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.ExchangeReq;

        /**
         * Creates a plain object from an ExchangeReq message. Also converts values to other types if specified.
         * @param message ExchangeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ExchangeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExchangeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExchangeRsp. */
    interface IExchangeRsp {

        /** ExchangeRsp cards */
        cards?: (number[]|null);
    }

    /** Represents an ExchangeRsp. */
    class ExchangeRsp implements IExchangeRsp {

        /**
         * Constructs a new ExchangeRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IExchangeRsp);

        /** ExchangeRsp cards. */
        public cards: number[];

        /**
         * Creates a new ExchangeRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExchangeRsp instance
         */
        public static create(properties?: scmj.IExchangeRsp): scmj.ExchangeRsp;

        /**
         * Encodes the specified ExchangeRsp message. Does not implicitly {@link scmj.ExchangeRsp.verify|verify} messages.
         * @param message ExchangeRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IExchangeRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExchangeRsp message, length delimited. Does not implicitly {@link scmj.ExchangeRsp.verify|verify} messages.
         * @param message ExchangeRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IExchangeRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExchangeRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExchangeRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ExchangeRsp;

        /**
         * Decodes an ExchangeRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExchangeRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ExchangeRsp;

        /**
         * Verifies an ExchangeRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExchangeRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExchangeRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.ExchangeRsp;

        /**
         * Creates a plain object from an ExchangeRsp message. Also converts values to other types if specified.
         * @param message ExchangeRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ExchangeRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExchangeRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExchangeNoti. */
    interface IExchangeNoti {

        /** ExchangeNoti chairId */
        chairId?: (number|null);

        /** ExchangeNoti status */
        status?: (number|null);

        /** ExchangeNoti cards */
        cards?: (number[]|null);
    }

    /** Represents an ExchangeNoti. */
    class ExchangeNoti implements IExchangeNoti {

        /**
         * Constructs a new ExchangeNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IExchangeNoti);

        /** ExchangeNoti chairId. */
        public chairId: number;

        /** ExchangeNoti status. */
        public status: number;

        /** ExchangeNoti cards. */
        public cards: number[];

        /**
         * Creates a new ExchangeNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExchangeNoti instance
         */
        public static create(properties?: scmj.IExchangeNoti): scmj.ExchangeNoti;

        /**
         * Encodes the specified ExchangeNoti message. Does not implicitly {@link scmj.ExchangeNoti.verify|verify} messages.
         * @param message ExchangeNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IExchangeNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExchangeNoti message, length delimited. Does not implicitly {@link scmj.ExchangeNoti.verify|verify} messages.
         * @param message ExchangeNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IExchangeNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExchangeNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExchangeNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ExchangeNoti;

        /**
         * Decodes an ExchangeNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExchangeNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ExchangeNoti;

        /**
         * Verifies an ExchangeNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExchangeNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExchangeNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ExchangeNoti;

        /**
         * Creates a plain object from an ExchangeNoti message. Also converts values to other types if specified.
         * @param message ExchangeNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ExchangeNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExchangeNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExchangeConfirmNoti. */
    interface IExchangeConfirmNoti {

        /** ExchangeConfirmNoti chairId */
        chairId?: (number|null);

        /** ExchangeConfirmNoti status */
        status?: (number|null);
    }

    /** Represents an ExchangeConfirmNoti. */
    class ExchangeConfirmNoti implements IExchangeConfirmNoti {

        /**
         * Constructs a new ExchangeConfirmNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IExchangeConfirmNoti);

        /** ExchangeConfirmNoti chairId. */
        public chairId: number;

        /** ExchangeConfirmNoti status. */
        public status: number;

        /**
         * Creates a new ExchangeConfirmNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExchangeConfirmNoti instance
         */
        public static create(properties?: scmj.IExchangeConfirmNoti): scmj.ExchangeConfirmNoti;

        /**
         * Encodes the specified ExchangeConfirmNoti message. Does not implicitly {@link scmj.ExchangeConfirmNoti.verify|verify} messages.
         * @param message ExchangeConfirmNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IExchangeConfirmNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExchangeConfirmNoti message, length delimited. Does not implicitly {@link scmj.ExchangeConfirmNoti.verify|verify} messages.
         * @param message ExchangeConfirmNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IExchangeConfirmNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExchangeConfirmNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExchangeConfirmNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ExchangeConfirmNoti;

        /**
         * Decodes an ExchangeConfirmNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExchangeConfirmNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ExchangeConfirmNoti;

        /**
         * Verifies an ExchangeConfirmNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExchangeConfirmNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExchangeConfirmNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ExchangeConfirmNoti;

        /**
         * Creates a plain object from an ExchangeConfirmNoti message. Also converts values to other types if specified.
         * @param message ExchangeConfirmNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ExchangeConfirmNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExchangeConfirmNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExchangeCompleteNoti. */
    interface IExchangeCompleteNoti {

        /** ExchangeCompleteNoti way */
        way?: (number|null);
    }

    /** Represents an ExchangeCompleteNoti. */
    class ExchangeCompleteNoti implements IExchangeCompleteNoti {

        /**
         * Constructs a new ExchangeCompleteNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IExchangeCompleteNoti);

        /** ExchangeCompleteNoti way. */
        public way: number;

        /**
         * Creates a new ExchangeCompleteNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExchangeCompleteNoti instance
         */
        public static create(properties?: scmj.IExchangeCompleteNoti): scmj.ExchangeCompleteNoti;

        /**
         * Encodes the specified ExchangeCompleteNoti message. Does not implicitly {@link scmj.ExchangeCompleteNoti.verify|verify} messages.
         * @param message ExchangeCompleteNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IExchangeCompleteNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExchangeCompleteNoti message, length delimited. Does not implicitly {@link scmj.ExchangeCompleteNoti.verify|verify} messages.
         * @param message ExchangeCompleteNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IExchangeCompleteNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExchangeCompleteNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExchangeCompleteNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ExchangeCompleteNoti;

        /**
         * Decodes an ExchangeCompleteNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExchangeCompleteNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ExchangeCompleteNoti;

        /**
         * Verifies an ExchangeCompleteNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExchangeCompleteNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExchangeCompleteNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ExchangeCompleteNoti;

        /**
         * Creates a plain object from an ExchangeCompleteNoti message. Also converts values to other types if specified.
         * @param message ExchangeCompleteNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ExchangeCompleteNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExchangeCompleteNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LackReq. */
    interface ILackReq {

        /** LackReq lack */
        lack?: (number|null);
    }

    /** Represents a LackReq. */
    class LackReq implements ILackReq {

        /**
         * Constructs a new LackReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ILackReq);

        /** LackReq lack. */
        public lack: number;

        /**
         * Creates a new LackReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LackReq instance
         */
        public static create(properties?: scmj.ILackReq): scmj.LackReq;

        /**
         * Encodes the specified LackReq message. Does not implicitly {@link scmj.LackReq.verify|verify} messages.
         * @param message LackReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ILackReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LackReq message, length delimited. Does not implicitly {@link scmj.LackReq.verify|verify} messages.
         * @param message LackReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ILackReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LackReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LackReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.LackReq;

        /**
         * Decodes a LackReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LackReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.LackReq;

        /**
         * Verifies a LackReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LackReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LackReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.LackReq;

        /**
         * Creates a plain object from a LackReq message. Also converts values to other types if specified.
         * @param message LackReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.LackReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LackReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LackRsp. */
    interface ILackRsp {

        /** LackRsp lack */
        lack?: (number|null);
    }

    /** Represents a LackRsp. */
    class LackRsp implements ILackRsp {

        /**
         * Constructs a new LackRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ILackRsp);

        /** LackRsp lack. */
        public lack: number;

        /**
         * Creates a new LackRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LackRsp instance
         */
        public static create(properties?: scmj.ILackRsp): scmj.LackRsp;

        /**
         * Encodes the specified LackRsp message. Does not implicitly {@link scmj.LackRsp.verify|verify} messages.
         * @param message LackRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ILackRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LackRsp message, length delimited. Does not implicitly {@link scmj.LackRsp.verify|verify} messages.
         * @param message LackRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ILackRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LackRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LackRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.LackRsp;

        /**
         * Decodes a LackRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LackRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.LackRsp;

        /**
         * Verifies a LackRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LackRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LackRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.LackRsp;

        /**
         * Creates a plain object from a LackRsp message. Also converts values to other types if specified.
         * @param message LackRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.LackRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LackRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LackNoti. */
    interface ILackNoti {

        /** LackNoti chairId */
        chairId?: (number|null);

        /** LackNoti lack */
        lack?: (number|null);
    }

    /** Represents a LackNoti. */
    class LackNoti implements ILackNoti {

        /**
         * Constructs a new LackNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ILackNoti);

        /** LackNoti chairId. */
        public chairId: number;

        /** LackNoti lack. */
        public lack: number;

        /**
         * Creates a new LackNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LackNoti instance
         */
        public static create(properties?: scmj.ILackNoti): scmj.LackNoti;

        /**
         * Encodes the specified LackNoti message. Does not implicitly {@link scmj.LackNoti.verify|verify} messages.
         * @param message LackNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ILackNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LackNoti message, length delimited. Does not implicitly {@link scmj.LackNoti.verify|verify} messages.
         * @param message LackNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ILackNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LackNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LackNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.LackNoti;

        /**
         * Decodes a LackNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LackNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.LackNoti;

        /**
         * Verifies a LackNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LackNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LackNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.LackNoti;

        /**
         * Creates a plain object from a LackNoti message. Also converts values to other types if specified.
         * @param message LackNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.LackNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LackNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OperateReq. */
    interface IOperateReq {

        /** OperateReq opcodes */
        opcodes?: (number[]|null);

        /** OperateReq card */
        card?: (number|null);

        /** OperateReq serialId */
        serialId?: (number|null);

        /** OperateReq tingCards */
        tingCards?: (scmj.ITingCards[]|null);

        /** OperateReq tingCard */
        tingCard?: (scmj.ITingCard[]|null);

        /** OperateReq operates */
        operates?: (scmj.OperateReq.IOperate[]|null);
    }

    /** Represents an OperateReq. */
    class OperateReq implements IOperateReq {

        /**
         * Constructs a new OperateReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IOperateReq);

        /** OperateReq opcodes. */
        public opcodes: number[];

        /** OperateReq card. */
        public card: number;

        /** OperateReq serialId. */
        public serialId: number;

        /** OperateReq tingCards. */
        public tingCards: scmj.ITingCards[];

        /** OperateReq tingCard. */
        public tingCard: scmj.ITingCard[];

        /** OperateReq operates. */
        public operates: scmj.OperateReq.IOperate[];

        /**
         * Creates a new OperateReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OperateReq instance
         */
        public static create(properties?: scmj.IOperateReq): scmj.OperateReq;

        /**
         * Encodes the specified OperateReq message. Does not implicitly {@link scmj.OperateReq.verify|verify} messages.
         * @param message OperateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IOperateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OperateReq message, length delimited. Does not implicitly {@link scmj.OperateReq.verify|verify} messages.
         * @param message OperateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IOperateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OperateReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OperateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.OperateReq;

        /**
         * Decodes an OperateReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OperateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.OperateReq;

        /**
         * Verifies an OperateReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OperateReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OperateReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.OperateReq;

        /**
         * Creates a plain object from an OperateReq message. Also converts values to other types if specified.
         * @param message OperateReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.OperateReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OperateReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace OperateReq {

        /** Properties of an Operate. */
        interface IOperate {

            /** Operate opcode */
            opcode?: (number|null);

            /** Operate opCard */
            opCard?: (number|null);

            /** Operate cards */
            cards?: (number[]|null);
        }

        /** Represents an Operate. */
        class Operate implements IOperate {

            /**
             * Constructs a new Operate.
             * @param [properties] Properties to set
             */
            constructor(properties?: scmj.OperateReq.IOperate);

            /** Operate opcode. */
            public opcode: number;

            /** Operate opCard. */
            public opCard: number;

            /** Operate cards. */
            public cards: number[];

            /**
             * Creates a new Operate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Operate instance
             */
            public static create(properties?: scmj.OperateReq.IOperate): scmj.OperateReq.Operate;

            /**
             * Encodes the specified Operate message. Does not implicitly {@link scmj.OperateReq.Operate.verify|verify} messages.
             * @param message Operate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: scmj.OperateReq.IOperate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Operate message, length delimited. Does not implicitly {@link scmj.OperateReq.Operate.verify|verify} messages.
             * @param message Operate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: scmj.OperateReq.IOperate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Operate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Operate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.OperateReq.Operate;

            /**
             * Decodes an Operate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Operate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.OperateReq.Operate;

            /**
             * Verifies an Operate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Operate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Operate
             */
            public static fromObject(object: { [k: string]: any }): scmj.OperateReq.Operate;

            /**
             * Creates a plain object from an Operate message. Also converts values to other types if specified.
             * @param message Operate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: scmj.OperateReq.Operate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Operate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an OperateRsp. */
    interface IOperateRsp {

        /** OperateRsp opcode */
        opcode?: (number|null);

        /** OperateRsp card */
        card?: (number|null);

        /** OperateRsp opCards */
        opCards?: (number[]|null);

        /** OperateRsp serialId */
        serialId?: (number|null);
    }

    /** Represents an OperateRsp. */
    class OperateRsp implements IOperateRsp {

        /**
         * Constructs a new OperateRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IOperateRsp);

        /** OperateRsp opcode. */
        public opcode: number;

        /** OperateRsp card. */
        public card: number;

        /** OperateRsp opCards. */
        public opCards: number[];

        /** OperateRsp serialId. */
        public serialId: number;

        /**
         * Creates a new OperateRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OperateRsp instance
         */
        public static create(properties?: scmj.IOperateRsp): scmj.OperateRsp;

        /**
         * Encodes the specified OperateRsp message. Does not implicitly {@link scmj.OperateRsp.verify|verify} messages.
         * @param message OperateRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IOperateRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OperateRsp message, length delimited. Does not implicitly {@link scmj.OperateRsp.verify|verify} messages.
         * @param message OperateRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IOperateRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OperateRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OperateRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.OperateRsp;

        /**
         * Decodes an OperateRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OperateRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.OperateRsp;

        /**
         * Verifies an OperateRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OperateRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OperateRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.OperateRsp;

        /**
         * Creates a plain object from an OperateRsp message. Also converts values to other types if specified.
         * @param message OperateRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.OperateRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OperateRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OperateNoti. */
    interface IOperateNoti {

        /** OperateNoti chairId */
        chairId?: (number|null);

        /** OperateNoti opcode */
        opcode?: (number|null);

        /** OperateNoti card */
        card?: (number|null);

        /** OperateNoti fanId */
        fanId?: (number|null);

        /** OperateNoti huStatus */
        huStatus?: (scmj.IHuStatus|null);
    }

    /** Represents an OperateNoti. */
    class OperateNoti implements IOperateNoti {

        /**
         * Constructs a new OperateNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IOperateNoti);

        /** OperateNoti chairId. */
        public chairId: number;

        /** OperateNoti opcode. */
        public opcode: number;

        /** OperateNoti card. */
        public card: number;

        /** OperateNoti fanId. */
        public fanId: number;

        /** OperateNoti huStatus. */
        public huStatus?: (scmj.IHuStatus|null);

        /**
         * Creates a new OperateNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OperateNoti instance
         */
        public static create(properties?: scmj.IOperateNoti): scmj.OperateNoti;

        /**
         * Encodes the specified OperateNoti message. Does not implicitly {@link scmj.OperateNoti.verify|verify} messages.
         * @param message OperateNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IOperateNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OperateNoti message, length delimited. Does not implicitly {@link scmj.OperateNoti.verify|verify} messages.
         * @param message OperateNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IOperateNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OperateNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OperateNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.OperateNoti;

        /**
         * Decodes an OperateNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OperateNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.OperateNoti;

        /**
         * Verifies an OperateNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OperateNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OperateNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.OperateNoti;

        /**
         * Creates a plain object from an OperateNoti message. Also converts values to other types if specified.
         * @param message OperateNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.OperateNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OperateNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AutoReq. */
    interface IAutoReq {

        /** AutoReq auto */
        auto?: (number|null);
    }

    /** Represents an AutoReq. */
    class AutoReq implements IAutoReq {

        /**
         * Constructs a new AutoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IAutoReq);

        /** AutoReq auto. */
        public auto: number;

        /**
         * Creates a new AutoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AutoReq instance
         */
        public static create(properties?: scmj.IAutoReq): scmj.AutoReq;

        /**
         * Encodes the specified AutoReq message. Does not implicitly {@link scmj.AutoReq.verify|verify} messages.
         * @param message AutoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IAutoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AutoReq message, length delimited. Does not implicitly {@link scmj.AutoReq.verify|verify} messages.
         * @param message AutoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IAutoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AutoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AutoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.AutoReq;

        /**
         * Decodes an AutoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AutoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.AutoReq;

        /**
         * Verifies an AutoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AutoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AutoReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.AutoReq;

        /**
         * Creates a plain object from an AutoReq message. Also converts values to other types if specified.
         * @param message AutoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.AutoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AutoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AutoNoti. */
    interface IAutoNoti {

        /** AutoNoti chairId */
        chairId?: (number|null);

        /** AutoNoti auto */
        auto?: (number|null);
    }

    /** Represents an AutoNoti. */
    class AutoNoti implements IAutoNoti {

        /**
         * Constructs a new AutoNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IAutoNoti);

        /** AutoNoti chairId. */
        public chairId: number;

        /** AutoNoti auto. */
        public auto: number;

        /**
         * Creates a new AutoNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AutoNoti instance
         */
        public static create(properties?: scmj.IAutoNoti): scmj.AutoNoti;

        /**
         * Encodes the specified AutoNoti message. Does not implicitly {@link scmj.AutoNoti.verify|verify} messages.
         * @param message AutoNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IAutoNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AutoNoti message, length delimited. Does not implicitly {@link scmj.AutoNoti.verify|verify} messages.
         * @param message AutoNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IAutoNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AutoNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AutoNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.AutoNoti;

        /**
         * Decodes an AutoNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AutoNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.AutoNoti;

        /**
         * Verifies an AutoNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AutoNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AutoNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.AutoNoti;

        /**
         * Creates a plain object from an AutoNoti message. Also converts values to other types if specified.
         * @param message AutoNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.AutoNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AutoNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ScoreChangeItem. */
    interface IScoreChangeItem {

        /** ScoreChangeItem chairId */
        chairId?: (number|null);

        /** ScoreChangeItem presentScore */
        presentScore?: (number|Long|null);

        /** ScoreChangeItem totalScore */
        totalScore?: (number|Long|null);

        /** ScoreChangeItem score */
        score?: (number|Long|null);

        /** ScoreChangeItem shieldTimes */
        shieldTimes?: (number|null);
    }

    /** Represents a ScoreChangeItem. */
    class ScoreChangeItem implements IScoreChangeItem {

        /**
         * Constructs a new ScoreChangeItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IScoreChangeItem);

        /** ScoreChangeItem chairId. */
        public chairId: number;

        /** ScoreChangeItem presentScore. */
        public presentScore: (number|Long);

        /** ScoreChangeItem totalScore. */
        public totalScore: (number|Long);

        /** ScoreChangeItem score. */
        public score: (number|Long);

        /** ScoreChangeItem shieldTimes. */
        public shieldTimes: number;

        /**
         * Creates a new ScoreChangeItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ScoreChangeItem instance
         */
        public static create(properties?: scmj.IScoreChangeItem): scmj.ScoreChangeItem;

        /**
         * Encodes the specified ScoreChangeItem message. Does not implicitly {@link scmj.ScoreChangeItem.verify|verify} messages.
         * @param message ScoreChangeItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IScoreChangeItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ScoreChangeItem message, length delimited. Does not implicitly {@link scmj.ScoreChangeItem.verify|verify} messages.
         * @param message ScoreChangeItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IScoreChangeItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ScoreChangeItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ScoreChangeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ScoreChangeItem;

        /**
         * Decodes a ScoreChangeItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ScoreChangeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ScoreChangeItem;

        /**
         * Verifies a ScoreChangeItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ScoreChangeItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ScoreChangeItem
         */
        public static fromObject(object: { [k: string]: any }): scmj.ScoreChangeItem;

        /**
         * Creates a plain object from a ScoreChangeItem message. Also converts values to other types if specified.
         * @param message ScoreChangeItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ScoreChangeItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ScoreChangeItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ScoreChangeNoti. */
    interface IScoreChangeNoti {

        /** ScoreChangeNoti items */
        items?: (scmj.IScoreChangeItem[]|null);

        /** ScoreChangeNoti changeType */
        changeType?: (string|null);
    }

    /** Represents a ScoreChangeNoti. */
    class ScoreChangeNoti implements IScoreChangeNoti {

        /**
         * Constructs a new ScoreChangeNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IScoreChangeNoti);

        /** ScoreChangeNoti items. */
        public items: scmj.IScoreChangeItem[];

        /** ScoreChangeNoti changeType. */
        public changeType: string;

        /**
         * Creates a new ScoreChangeNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ScoreChangeNoti instance
         */
        public static create(properties?: scmj.IScoreChangeNoti): scmj.ScoreChangeNoti;

        /**
         * Encodes the specified ScoreChangeNoti message. Does not implicitly {@link scmj.ScoreChangeNoti.verify|verify} messages.
         * @param message ScoreChangeNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IScoreChangeNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ScoreChangeNoti message, length delimited. Does not implicitly {@link scmj.ScoreChangeNoti.verify|verify} messages.
         * @param message ScoreChangeNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IScoreChangeNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ScoreChangeNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ScoreChangeNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ScoreChangeNoti;

        /**
         * Decodes a ScoreChangeNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ScoreChangeNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ScoreChangeNoti;

        /**
         * Verifies a ScoreChangeNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ScoreChangeNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ScoreChangeNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ScoreChangeNoti;

        /**
         * Creates a plain object from a ScoreChangeNoti message. Also converts values to other types if specified.
         * @param message ScoreChangeNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ScoreChangeNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ScoreChangeNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BillReq. */
    interface IBillReq {
    }

    /** Represents a BillReq. */
    class BillReq implements IBillReq {

        /**
         * Constructs a new BillReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IBillReq);

        /**
         * Creates a new BillReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BillReq instance
         */
        public static create(properties?: scmj.IBillReq): scmj.BillReq;

        /**
         * Encodes the specified BillReq message. Does not implicitly {@link scmj.BillReq.verify|verify} messages.
         * @param message BillReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IBillReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BillReq message, length delimited. Does not implicitly {@link scmj.BillReq.verify|verify} messages.
         * @param message BillReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IBillReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BillReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BillReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.BillReq;

        /**
         * Decodes a BillReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BillReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.BillReq;

        /**
         * Verifies a BillReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BillReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BillReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.BillReq;

        /**
         * Creates a plain object from a BillReq message. Also converts values to other types if specified.
         * @param message BillReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.BillReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BillReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BillItem. */
    interface IBillItem {

        /** BillItem op */
        op?: (number|null);

        /** BillItem fan */
        fan?: (number|null);

        /** BillItem ratio */
        ratio?: (number|null);

        /** BillItem score */
        score?: (number|Long|null);

        /** BillItem position */
        position?: (string|null);

        /** BillItem type */
        type?: (number|null);

        /** BillItem cards */
        cards?: (number[]|null);

        /** BillItem fans */
        fans?: (number[]|null);

        /** BillItem noLost */
        noLost?: (number|null);

        /** BillItem contractType */
        contractType?: (number|null);

        /** BillItem contractChairId */
        contractChairId?: (number|null);
    }

    /** Represents a BillItem. */
    class BillItem implements IBillItem {

        /**
         * Constructs a new BillItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IBillItem);

        /** BillItem op. */
        public op: number;

        /** BillItem fan. */
        public fan: number;

        /** BillItem ratio. */
        public ratio: number;

        /** BillItem score. */
        public score: (number|Long);

        /** BillItem position. */
        public position: string;

        /** BillItem type. */
        public type: number;

        /** BillItem cards. */
        public cards: number[];

        /** BillItem fans. */
        public fans: number[];

        /** BillItem noLost. */
        public noLost: number;

        /** BillItem contractType. */
        public contractType: number;

        /** BillItem contractChairId. */
        public contractChairId: number;

        /**
         * Creates a new BillItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BillItem instance
         */
        public static create(properties?: scmj.IBillItem): scmj.BillItem;

        /**
         * Encodes the specified BillItem message. Does not implicitly {@link scmj.BillItem.verify|verify} messages.
         * @param message BillItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IBillItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BillItem message, length delimited. Does not implicitly {@link scmj.BillItem.verify|verify} messages.
         * @param message BillItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IBillItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BillItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BillItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.BillItem;

        /**
         * Decodes a BillItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BillItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.BillItem;

        /**
         * Verifies a BillItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BillItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BillItem
         */
        public static fromObject(object: { [k: string]: any }): scmj.BillItem;

        /**
         * Creates a plain object from a BillItem message. Also converts values to other types if specified.
         * @param message BillItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.BillItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BillItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BillRsp. */
    interface IBillRsp {

        /** BillRsp score */
        score?: (number|Long|null);

        /** BillRsp items */
        items?: (scmj.IBillItem[]|null);
    }

    /** Represents a BillRsp. */
    class BillRsp implements IBillRsp {

        /**
         * Constructs a new BillRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IBillRsp);

        /** BillRsp score. */
        public score: (number|Long);

        /** BillRsp items. */
        public items: scmj.IBillItem[];

        /**
         * Creates a new BillRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BillRsp instance
         */
        public static create(properties?: scmj.IBillRsp): scmj.BillRsp;

        /**
         * Encodes the specified BillRsp message. Does not implicitly {@link scmj.BillRsp.verify|verify} messages.
         * @param message BillRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IBillRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BillRsp message, length delimited. Does not implicitly {@link scmj.BillRsp.verify|verify} messages.
         * @param message BillRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IBillRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BillRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BillRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.BillRsp;

        /**
         * Decodes a BillRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BillRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.BillRsp;

        /**
         * Verifies a BillRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BillRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BillRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.BillRsp;

        /**
         * Creates a plain object from a BillRsp message. Also converts values to other types if specified.
         * @param message BillRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.BillRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BillRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerBill. */
    interface IPlayerBill {

        /** PlayerBill uid */
        uid?: (string|null);

        /** PlayerBill items */
        items?: (scmj.IBillItem[]|null);
    }

    /** Represents a PlayerBill. */
    class PlayerBill implements IPlayerBill {

        /**
         * Constructs a new PlayerBill.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IPlayerBill);

        /** PlayerBill uid. */
        public uid: string;

        /** PlayerBill items. */
        public items: scmj.IBillItem[];

        /**
         * Creates a new PlayerBill instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerBill instance
         */
        public static create(properties?: scmj.IPlayerBill): scmj.PlayerBill;

        /**
         * Encodes the specified PlayerBill message. Does not implicitly {@link scmj.PlayerBill.verify|verify} messages.
         * @param message PlayerBill message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IPlayerBill, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerBill message, length delimited. Does not implicitly {@link scmj.PlayerBill.verify|verify} messages.
         * @param message PlayerBill message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IPlayerBill, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerBill message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerBill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.PlayerBill;

        /**
         * Decodes a PlayerBill message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerBill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.PlayerBill;

        /**
         * Verifies a PlayerBill message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerBill message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerBill
         */
        public static fromObject(object: { [k: string]: any }): scmj.PlayerBill;

        /**
         * Creates a plain object from a PlayerBill message. Also converts values to other types if specified.
         * @param message PlayerBill
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.PlayerBill, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerBill to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResultNoti. */
    interface IResultNoti {

        /** ResultNoti score */
        score?: (number|Long|null);

        /** ResultNoti items */
        items?: (scmj.IBillItem[]|null);

        /** ResultNoti data */
        data?: (scmj.IUserItem[]|null);

        /** ResultNoti playerBill */
        playerBill?: (scmj.IPlayerBill[]|null);

        /** ResultNoti status */
        status?: (boolean|null);
    }

    /** Represents a ResultNoti. */
    class ResultNoti implements IResultNoti {

        /**
         * Constructs a new ResultNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IResultNoti);

        /** ResultNoti score. */
        public score: (number|Long);

        /** ResultNoti items. */
        public items: scmj.IBillItem[];

        /** ResultNoti data. */
        public data: scmj.IUserItem[];

        /** ResultNoti playerBill. */
        public playerBill: scmj.IPlayerBill[];

        /** ResultNoti status. */
        public status: boolean;

        /**
         * Creates a new ResultNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResultNoti instance
         */
        public static create(properties?: scmj.IResultNoti): scmj.ResultNoti;

        /**
         * Encodes the specified ResultNoti message. Does not implicitly {@link scmj.ResultNoti.verify|verify} messages.
         * @param message ResultNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IResultNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResultNoti message, length delimited. Does not implicitly {@link scmj.ResultNoti.verify|verify} messages.
         * @param message ResultNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IResultNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResultNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResultNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ResultNoti;

        /**
         * Decodes a ResultNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResultNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ResultNoti;

        /**
         * Verifies a ResultNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResultNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResultNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ResultNoti;

        /**
         * Creates a plain object from a ResultNoti message. Also converts values to other types if specified.
         * @param message ResultNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ResultNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResultNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HuStatus. */
    interface IHuStatus {

        /** HuStatus type */
        type?: (string|null);

        /** HuStatus status */
        status?: (boolean|null);
    }

    /** Represents a HuStatus. */
    class HuStatus implements IHuStatus {

        /**
         * Constructs a new HuStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IHuStatus);

        /** HuStatus type. */
        public type: string;

        /** HuStatus status. */
        public status: boolean;

        /**
         * Creates a new HuStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HuStatus instance
         */
        public static create(properties?: scmj.IHuStatus): scmj.HuStatus;

        /**
         * Encodes the specified HuStatus message. Does not implicitly {@link scmj.HuStatus.verify|verify} messages.
         * @param message HuStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IHuStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HuStatus message, length delimited. Does not implicitly {@link scmj.HuStatus.verify|verify} messages.
         * @param message HuStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IHuStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HuStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HuStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.HuStatus;

        /**
         * Decodes a HuStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HuStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.HuStatus;

        /**
         * Verifies a HuStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HuStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HuStatus
         */
        public static fromObject(object: { [k: string]: any }): scmj.HuStatus;

        /**
         * Creates a plain object from a HuStatus message. Also converts values to other types if specified.
         * @param message HuStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.HuStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HuStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CompleteReq. */
    interface ICompleteReq {
    }

    /** Represents a CompleteReq. */
    class CompleteReq implements ICompleteReq {

        /**
         * Constructs a new CompleteReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ICompleteReq);

        /**
         * Creates a new CompleteReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CompleteReq instance
         */
        public static create(properties?: scmj.ICompleteReq): scmj.CompleteReq;

        /**
         * Encodes the specified CompleteReq message. Does not implicitly {@link scmj.CompleteReq.verify|verify} messages.
         * @param message CompleteReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ICompleteReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CompleteReq message, length delimited. Does not implicitly {@link scmj.CompleteReq.verify|verify} messages.
         * @param message CompleteReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ICompleteReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CompleteReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CompleteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.CompleteReq;

        /**
         * Decodes a CompleteReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CompleteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.CompleteReq;

        /**
         * Verifies a CompleteReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CompleteReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompleteReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.CompleteReq;

        /**
         * Creates a plain object from a CompleteReq message. Also converts values to other types if specified.
         * @param message CompleteReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.CompleteReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompleteReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameDataItem. */
    interface IGameDataItem {

        /** GameDataItem chairId */
        chairId?: (number|null);

        /** GameDataItem lack */
        lack?: (number|null);

        /** GameDataItem giveup */
        giveup?: (boolean|null);

        /** GameDataItem auto */
        auto?: (boolean|null);

        /** GameDataItem addScore */
        addScore?: (number|Long|null);

        /** GameDataItem cards */
        cards?: (scmj.IUpdateCardsNoti|null);

        /** GameDataItem huStatus */
        huStatus?: (scmj.IHuStatus|null);

        /** GameDataItem ai */
        ai?: (number[]|null);

        /** GameDataItem recharge */
        recharge?: (number|null);

        /** GameDataItem shieldTimes */
        shieldTimes?: (number|null);

        /** GameDataItem capMultiple */
        capMultiple?: (number|null);
    }

    /** Represents a GameDataItem. */
    class GameDataItem implements IGameDataItem {

        /**
         * Constructs a new GameDataItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IGameDataItem);

        /** GameDataItem chairId. */
        public chairId: number;

        /** GameDataItem lack. */
        public lack: number;

        /** GameDataItem giveup. */
        public giveup: boolean;

        /** GameDataItem auto. */
        public auto: boolean;

        /** GameDataItem addScore. */
        public addScore: (number|Long);

        /** GameDataItem cards. */
        public cards?: (scmj.IUpdateCardsNoti|null);

        /** GameDataItem huStatus. */
        public huStatus?: (scmj.IHuStatus|null);

        /** GameDataItem ai. */
        public ai: number[];

        /** GameDataItem recharge. */
        public recharge: number;

        /** GameDataItem shieldTimes. */
        public shieldTimes: number;

        /** GameDataItem capMultiple. */
        public capMultiple: number;

        /**
         * Creates a new GameDataItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameDataItem instance
         */
        public static create(properties?: scmj.IGameDataItem): scmj.GameDataItem;

        /**
         * Encodes the specified GameDataItem message. Does not implicitly {@link scmj.GameDataItem.verify|verify} messages.
         * @param message GameDataItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IGameDataItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameDataItem message, length delimited. Does not implicitly {@link scmj.GameDataItem.verify|verify} messages.
         * @param message GameDataItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IGameDataItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameDataItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameDataItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.GameDataItem;

        /**
         * Decodes a GameDataItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameDataItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.GameDataItem;

        /**
         * Verifies a GameDataItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameDataItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameDataItem
         */
        public static fromObject(object: { [k: string]: any }): scmj.GameDataItem;

        /**
         * Creates a plain object from a GameDataItem message. Also converts values to other types if specified.
         * @param message GameDataItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.GameDataItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameDataItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CompleteNoti. */
    interface ICompleteNoti {

        /** CompleteNoti state */
        state?: (number|null);

        /** CompleteNoti east */
        east?: (number|null);

        /** CompleteNoti banker */
        banker?: (number|null);

        /** CompleteNoti remainCardNum */
        remainCardNum?: (number|null);

        /** CompleteNoti baseItems */
        baseItems?: (scmj.IEnterNotiItem[]|null);

        /** CompleteNoti gameItems */
        gameItems?: (scmj.IGameDataItem[]|null);

        /** CompleteNoti dices */
        dices?: (number[]|null);

        /** CompleteNoti laizi */
        laizi?: (number[]|null);
    }

    /** Represents a CompleteNoti. */
    class CompleteNoti implements ICompleteNoti {

        /**
         * Constructs a new CompleteNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ICompleteNoti);

        /** CompleteNoti state. */
        public state: number;

        /** CompleteNoti east. */
        public east: number;

        /** CompleteNoti banker. */
        public banker: number;

        /** CompleteNoti remainCardNum. */
        public remainCardNum: number;

        /** CompleteNoti baseItems. */
        public baseItems: scmj.IEnterNotiItem[];

        /** CompleteNoti gameItems. */
        public gameItems: scmj.IGameDataItem[];

        /** CompleteNoti dices. */
        public dices: number[];

        /** CompleteNoti laizi. */
        public laizi: number[];

        /**
         * Creates a new CompleteNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CompleteNoti instance
         */
        public static create(properties?: scmj.ICompleteNoti): scmj.CompleteNoti;

        /**
         * Encodes the specified CompleteNoti message. Does not implicitly {@link scmj.CompleteNoti.verify|verify} messages.
         * @param message CompleteNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ICompleteNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CompleteNoti message, length delimited. Does not implicitly {@link scmj.CompleteNoti.verify|verify} messages.
         * @param message CompleteNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ICompleteNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CompleteNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CompleteNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.CompleteNoti;

        /**
         * Decodes a CompleteNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CompleteNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.CompleteNoti;

        /**
         * Verifies a CompleteNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CompleteNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompleteNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.CompleteNoti;

        /**
         * Creates a plain object from a CompleteNoti message. Also converts values to other types if specified.
         * @param message CompleteNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.CompleteNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompleteNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TingCard. */
    interface ITingCard {

        /** TingCard card */
        card?: (number|null);

        /** TingCard left */
        left?: (number|null);

        /** TingCard ratio */
        ratio?: (number|null);

        /** TingCard fan */
        fan?: (number|null);
    }

    /** Represents a TingCard. */
    class TingCard implements ITingCard {

        /**
         * Constructs a new TingCard.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ITingCard);

        /** TingCard card. */
        public card: number;

        /** TingCard left. */
        public left: number;

        /** TingCard ratio. */
        public ratio: number;

        /** TingCard fan. */
        public fan: number;

        /**
         * Creates a new TingCard instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TingCard instance
         */
        public static create(properties?: scmj.ITingCard): scmj.TingCard;

        /**
         * Encodes the specified TingCard message. Does not implicitly {@link scmj.TingCard.verify|verify} messages.
         * @param message TingCard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ITingCard, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TingCard message, length delimited. Does not implicitly {@link scmj.TingCard.verify|verify} messages.
         * @param message TingCard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ITingCard, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TingCard message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TingCard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.TingCard;

        /**
         * Decodes a TingCard message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TingCard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.TingCard;

        /**
         * Verifies a TingCard message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TingCard message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TingCard
         */
        public static fromObject(object: { [k: string]: any }): scmj.TingCard;

        /**
         * Creates a plain object from a TingCard message. Also converts values to other types if specified.
         * @param message TingCard
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.TingCard, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TingCard to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TingCards. */
    interface ITingCards {

        /** TingCards playCard */
        playCard?: (number|null);

        /** TingCards tingCards */
        tingCards?: (scmj.ITingCard[]|null);
    }

    /** Represents a TingCards. */
    class TingCards implements ITingCards {

        /**
         * Constructs a new TingCards.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ITingCards);

        /** TingCards playCard. */
        public playCard: number;

        /** TingCards tingCards. */
        public tingCards: scmj.ITingCard[];

        /**
         * Creates a new TingCards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TingCards instance
         */
        public static create(properties?: scmj.ITingCards): scmj.TingCards;

        /**
         * Encodes the specified TingCards message. Does not implicitly {@link scmj.TingCards.verify|verify} messages.
         * @param message TingCards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ITingCards, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TingCards message, length delimited. Does not implicitly {@link scmj.TingCards.verify|verify} messages.
         * @param message TingCards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ITingCards, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TingCards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TingCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.TingCards;

        /**
         * Decodes a TingCards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TingCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.TingCards;

        /**
         * Verifies a TingCards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TingCards message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TingCards
         */
        public static fromObject(object: { [k: string]: any }): scmj.TingCards;

        /**
         * Creates a plain object from a TingCards message. Also converts values to other types if specified.
         * @param message TingCards
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.TingCards, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TingCards to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TingTipReq. */
    interface ITingTipReq {
    }

    /** Represents a TingTipReq. */
    class TingTipReq implements ITingTipReq {

        /**
         * Constructs a new TingTipReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ITingTipReq);

        /**
         * Creates a new TingTipReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TingTipReq instance
         */
        public static create(properties?: scmj.ITingTipReq): scmj.TingTipReq;

        /**
         * Encodes the specified TingTipReq message. Does not implicitly {@link scmj.TingTipReq.verify|verify} messages.
         * @param message TingTipReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ITingTipReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TingTipReq message, length delimited. Does not implicitly {@link scmj.TingTipReq.verify|verify} messages.
         * @param message TingTipReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ITingTipReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TingTipReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TingTipReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.TingTipReq;

        /**
         * Decodes a TingTipReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TingTipReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.TingTipReq;

        /**
         * Verifies a TingTipReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TingTipReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TingTipReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.TingTipReq;

        /**
         * Creates a plain object from a TingTipReq message. Also converts values to other types if specified.
         * @param message TingTipReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.TingTipReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TingTipReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TingTipRsp. */
    interface ITingTipRsp {

        /** TingTipRsp tingCards */
        tingCards?: (scmj.ITingCard[]|null);
    }

    /** Represents a TingTipRsp. */
    class TingTipRsp implements ITingTipRsp {

        /**
         * Constructs a new TingTipRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ITingTipRsp);

        /** TingTipRsp tingCards. */
        public tingCards: scmj.ITingCard[];

        /**
         * Creates a new TingTipRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TingTipRsp instance
         */
        public static create(properties?: scmj.ITingTipRsp): scmj.TingTipRsp;

        /**
         * Encodes the specified TingTipRsp message. Does not implicitly {@link scmj.TingTipRsp.verify|verify} messages.
         * @param message TingTipRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ITingTipRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TingTipRsp message, length delimited. Does not implicitly {@link scmj.TingTipRsp.verify|verify} messages.
         * @param message TingTipRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ITingTipRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TingTipRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TingTipRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.TingTipRsp;

        /**
         * Decodes a TingTipRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TingTipRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.TingTipRsp;

        /**
         * Verifies a TingTipRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TingTipRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TingTipRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.TingTipRsp;

        /**
         * Creates a plain object from a TingTipRsp message. Also converts values to other types if specified.
         * @param message TingTipRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.TingTipRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TingTipRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TingNoti. */
    interface ITingNoti {

        /** TingNoti isTing */
        isTing?: (number|null);
    }

    /** Represents a TingNoti. */
    class TingNoti implements ITingNoti {

        /**
         * Constructs a new TingNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ITingNoti);

        /** TingNoti isTing. */
        public isTing: number;

        /**
         * Creates a new TingNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TingNoti instance
         */
        public static create(properties?: scmj.ITingNoti): scmj.TingNoti;

        /**
         * Encodes the specified TingNoti message. Does not implicitly {@link scmj.TingNoti.verify|verify} messages.
         * @param message TingNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ITingNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TingNoti message, length delimited. Does not implicitly {@link scmj.TingNoti.verify|verify} messages.
         * @param message TingNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ITingNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TingNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TingNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.TingNoti;

        /**
         * Decodes a TingNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TingNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.TingNoti;

        /**
         * Verifies a TingNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TingNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TingNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.TingNoti;

        /**
         * Creates a plain object from a TingNoti message. Also converts values to other types if specified.
         * @param message TingNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.TingNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TingNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AiReq. */
    interface IAiReq {

        /** AiReq ai */
        ai?: (number[]|null);
    }

    /** Represents an AiReq. */
    class AiReq implements IAiReq {

        /**
         * Constructs a new AiReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IAiReq);

        /** AiReq ai. */
        public ai: number[];

        /**
         * Creates a new AiReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AiReq instance
         */
        public static create(properties?: scmj.IAiReq): scmj.AiReq;

        /**
         * Encodes the specified AiReq message. Does not implicitly {@link scmj.AiReq.verify|verify} messages.
         * @param message AiReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IAiReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AiReq message, length delimited. Does not implicitly {@link scmj.AiReq.verify|verify} messages.
         * @param message AiReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IAiReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AiReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AiReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.AiReq;

        /**
         * Decodes an AiReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AiReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.AiReq;

        /**
         * Verifies an AiReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AiReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AiReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.AiReq;

        /**
         * Creates a plain object from an AiReq message. Also converts values to other types if specified.
         * @param message AiReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.AiReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AiReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatReq. */
    interface IChatReq {

        /** ChatReq msg */
        msg?: (string|null);

        /** ChatReq targetChairId */
        targetChairId?: (number|null);
    }

    /** Represents a ChatReq. */
    class ChatReq implements IChatReq {

        /**
         * Constructs a new ChatReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IChatReq);

        /** ChatReq msg. */
        public msg: string;

        /** ChatReq targetChairId. */
        public targetChairId: number;

        /**
         * Creates a new ChatReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatReq instance
         */
        public static create(properties?: scmj.IChatReq): scmj.ChatReq;

        /**
         * Encodes the specified ChatReq message. Does not implicitly {@link scmj.ChatReq.verify|verify} messages.
         * @param message ChatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IChatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatReq message, length delimited. Does not implicitly {@link scmj.ChatReq.verify|verify} messages.
         * @param message ChatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IChatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ChatReq;

        /**
         * Decodes a ChatReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ChatReq;

        /**
         * Verifies a ChatReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.ChatReq;

        /**
         * Creates a plain object from a ChatReq message. Also converts values to other types if specified.
         * @param message ChatReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ChatReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatNoti. */
    interface IChatNoti {

        /** ChatNoti chairId */
        chairId?: (number|null);

        /** ChatNoti msg */
        msg?: (string|null);

        /** ChatNoti targetChairId */
        targetChairId?: (number|null);
    }

    /** Represents a ChatNoti. */
    class ChatNoti implements IChatNoti {

        /**
         * Constructs a new ChatNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IChatNoti);

        /** ChatNoti chairId. */
        public chairId: number;

        /** ChatNoti msg. */
        public msg: string;

        /** ChatNoti targetChairId. */
        public targetChairId: number;

        /**
         * Creates a new ChatNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatNoti instance
         */
        public static create(properties?: scmj.IChatNoti): scmj.ChatNoti;

        /**
         * Encodes the specified ChatNoti message. Does not implicitly {@link scmj.ChatNoti.verify|verify} messages.
         * @param message ChatNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IChatNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatNoti message, length delimited. Does not implicitly {@link scmj.ChatNoti.verify|verify} messages.
         * @param message ChatNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IChatNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ChatNoti;

        /**
         * Decodes a ChatNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ChatNoti;

        /**
         * Verifies a ChatNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ChatNoti;

        /**
         * Creates a plain object from a ChatNoti message. Also converts values to other types if specified.
         * @param message ChatNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ChatNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RechargeItem. */
    interface IRechargeItem {

        /** RechargeItem chairId */
        chairId?: (number|null);

        /** RechargeItem recharge */
        recharge?: (number|null);

        /** RechargeItem shieldTimes */
        shieldTimes?: (number|null);
    }

    /** Represents a RechargeItem. */
    class RechargeItem implements IRechargeItem {

        /**
         * Constructs a new RechargeItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IRechargeItem);

        /** RechargeItem chairId. */
        public chairId: number;

        /** RechargeItem recharge. */
        public recharge: number;

        /** RechargeItem shieldTimes. */
        public shieldTimes: number;

        /**
         * Creates a new RechargeItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RechargeItem instance
         */
        public static create(properties?: scmj.IRechargeItem): scmj.RechargeItem;

        /**
         * Encodes the specified RechargeItem message. Does not implicitly {@link scmj.RechargeItem.verify|verify} messages.
         * @param message RechargeItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IRechargeItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RechargeItem message, length delimited. Does not implicitly {@link scmj.RechargeItem.verify|verify} messages.
         * @param message RechargeItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IRechargeItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RechargeItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RechargeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.RechargeItem;

        /**
         * Decodes a RechargeItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RechargeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.RechargeItem;

        /**
         * Verifies a RechargeItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RechargeItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RechargeItem
         */
        public static fromObject(object: { [k: string]: any }): scmj.RechargeItem;

        /**
         * Creates a plain object from a RechargeItem message. Also converts values to other types if specified.
         * @param message RechargeItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.RechargeItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RechargeItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RechargeReq. */
    interface IRechargeReq {

        /** RechargeReq items */
        items?: (scmj.IRechargeItem[]|null);
    }

    /** Represents a RechargeReq. */
    class RechargeReq implements IRechargeReq {

        /**
         * Constructs a new RechargeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IRechargeReq);

        /** RechargeReq items. */
        public items: scmj.IRechargeItem[];

        /**
         * Creates a new RechargeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RechargeReq instance
         */
        public static create(properties?: scmj.IRechargeReq): scmj.RechargeReq;

        /**
         * Encodes the specified RechargeReq message. Does not implicitly {@link scmj.RechargeReq.verify|verify} messages.
         * @param message RechargeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IRechargeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RechargeReq message, length delimited. Does not implicitly {@link scmj.RechargeReq.verify|verify} messages.
         * @param message RechargeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IRechargeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RechargeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RechargeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.RechargeReq;

        /**
         * Decodes a RechargeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RechargeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.RechargeReq;

        /**
         * Verifies a RechargeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RechargeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RechargeReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.RechargeReq;

        /**
         * Creates a plain object from a RechargeReq message. Also converts values to other types if specified.
         * @param message RechargeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.RechargeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RechargeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RechargeRsp. */
    interface IRechargeRsp {

        /** RechargeRsp recharge */
        recharge?: (number|null);

        /** RechargeRsp shieldTimes */
        shieldTimes?: (number|null);
    }

    /** Represents a RechargeRsp. */
    class RechargeRsp implements IRechargeRsp {

        /**
         * Constructs a new RechargeRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IRechargeRsp);

        /** RechargeRsp recharge. */
        public recharge: number;

        /** RechargeRsp shieldTimes. */
        public shieldTimes: number;

        /**
         * Creates a new RechargeRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RechargeRsp instance
         */
        public static create(properties?: scmj.IRechargeRsp): scmj.RechargeRsp;

        /**
         * Encodes the specified RechargeRsp message. Does not implicitly {@link scmj.RechargeRsp.verify|verify} messages.
         * @param message RechargeRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IRechargeRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RechargeRsp message, length delimited. Does not implicitly {@link scmj.RechargeRsp.verify|verify} messages.
         * @param message RechargeRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IRechargeRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RechargeRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RechargeRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.RechargeRsp;

        /**
         * Decodes a RechargeRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RechargeRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.RechargeRsp;

        /**
         * Verifies a RechargeRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RechargeRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RechargeRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.RechargeRsp;

        /**
         * Creates a plain object from a RechargeRsp message. Also converts values to other types if specified.
         * @param message RechargeRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.RechargeRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RechargeRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RechargeNoti. */
    interface IRechargeNoti {

        /** RechargeNoti items */
        items?: (scmj.IRechargeItem[]|null);
    }

    /** Represents a RechargeNoti. */
    class RechargeNoti implements IRechargeNoti {

        /**
         * Constructs a new RechargeNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IRechargeNoti);

        /** RechargeNoti items. */
        public items: scmj.IRechargeItem[];

        /**
         * Creates a new RechargeNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RechargeNoti instance
         */
        public static create(properties?: scmj.IRechargeNoti): scmj.RechargeNoti;

        /**
         * Encodes the specified RechargeNoti message. Does not implicitly {@link scmj.RechargeNoti.verify|verify} messages.
         * @param message RechargeNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IRechargeNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RechargeNoti message, length delimited. Does not implicitly {@link scmj.RechargeNoti.verify|verify} messages.
         * @param message RechargeNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IRechargeNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RechargeNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RechargeNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.RechargeNoti;

        /**
         * Decodes a RechargeNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RechargeNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.RechargeNoti;

        /**
         * Verifies a RechargeNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RechargeNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RechargeNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.RechargeNoti;

        /**
         * Creates a plain object from a RechargeNoti message. Also converts values to other types if specified.
         * @param message RechargeNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.RechargeNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RechargeNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CapMultipleReq. */
    interface ICapMultipleReq {
    }

    /** Represents a CapMultipleReq. */
    class CapMultipleReq implements ICapMultipleReq {

        /**
         * Constructs a new CapMultipleReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ICapMultipleReq);

        /**
         * Creates a new CapMultipleReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CapMultipleReq instance
         */
        public static create(properties?: scmj.ICapMultipleReq): scmj.CapMultipleReq;

        /**
         * Encodes the specified CapMultipleReq message. Does not implicitly {@link scmj.CapMultipleReq.verify|verify} messages.
         * @param message CapMultipleReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ICapMultipleReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CapMultipleReq message, length delimited. Does not implicitly {@link scmj.CapMultipleReq.verify|verify} messages.
         * @param message CapMultipleReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ICapMultipleReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CapMultipleReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CapMultipleReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.CapMultipleReq;

        /**
         * Decodes a CapMultipleReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CapMultipleReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.CapMultipleReq;

        /**
         * Verifies a CapMultipleReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CapMultipleReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CapMultipleReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.CapMultipleReq;

        /**
         * Creates a plain object from a CapMultipleReq message. Also converts values to other types if specified.
         * @param message CapMultipleReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.CapMultipleReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CapMultipleReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CapMultipleRsp. */
    interface ICapMultipleRsp {

        /** CapMultipleRsp capMultiple */
        capMultiple?: (number|null);
    }

    /** Represents a CapMultipleRsp. */
    class CapMultipleRsp implements ICapMultipleRsp {

        /**
         * Constructs a new CapMultipleRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ICapMultipleRsp);

        /** CapMultipleRsp capMultiple. */
        public capMultiple: number;

        /**
         * Creates a new CapMultipleRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CapMultipleRsp instance
         */
        public static create(properties?: scmj.ICapMultipleRsp): scmj.CapMultipleRsp;

        /**
         * Encodes the specified CapMultipleRsp message. Does not implicitly {@link scmj.CapMultipleRsp.verify|verify} messages.
         * @param message CapMultipleRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ICapMultipleRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CapMultipleRsp message, length delimited. Does not implicitly {@link scmj.CapMultipleRsp.verify|verify} messages.
         * @param message CapMultipleRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ICapMultipleRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CapMultipleRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CapMultipleRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.CapMultipleRsp;

        /**
         * Decodes a CapMultipleRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CapMultipleRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.CapMultipleRsp;

        /**
         * Verifies a CapMultipleRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CapMultipleRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CapMultipleRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.CapMultipleRsp;

        /**
         * Creates a plain object from a CapMultipleRsp message. Also converts values to other types if specified.
         * @param message CapMultipleRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.CapMultipleRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CapMultipleRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CapMultipleNoti. */
    interface ICapMultipleNoti {

        /** CapMultipleNoti chairId */
        chairId?: (number|null);

        /** CapMultipleNoti capMultiple */
        capMultiple?: (number|null);
    }

    /** Represents a CapMultipleNoti. */
    class CapMultipleNoti implements ICapMultipleNoti {

        /**
         * Constructs a new CapMultipleNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ICapMultipleNoti);

        /** CapMultipleNoti chairId. */
        public chairId: number;

        /** CapMultipleNoti capMultiple. */
        public capMultiple: number;

        /**
         * Creates a new CapMultipleNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CapMultipleNoti instance
         */
        public static create(properties?: scmj.ICapMultipleNoti): scmj.CapMultipleNoti;

        /**
         * Encodes the specified CapMultipleNoti message. Does not implicitly {@link scmj.CapMultipleNoti.verify|verify} messages.
         * @param message CapMultipleNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ICapMultipleNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CapMultipleNoti message, length delimited. Does not implicitly {@link scmj.CapMultipleNoti.verify|verify} messages.
         * @param message CapMultipleNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ICapMultipleNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CapMultipleNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CapMultipleNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.CapMultipleNoti;

        /**
         * Decodes a CapMultipleNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CapMultipleNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.CapMultipleNoti;

        /**
         * Verifies a CapMultipleNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CapMultipleNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CapMultipleNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.CapMultipleNoti;

        /**
         * Creates a plain object from a CapMultipleNoti message. Also converts values to other types if specified.
         * @param message CapMultipleNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.CapMultipleNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CapMultipleNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RountCountNoti. */
    interface IRountCountNoti {

        /** RountCountNoti quan */
        quan?: (number|null);

        /** RountCountNoti ju */
        ju?: (number|null);

        /** RountCountNoti count */
        count?: (number|null);
    }

    /** Represents a RountCountNoti. */
    class RountCountNoti implements IRountCountNoti {

        /**
         * Constructs a new RountCountNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IRountCountNoti);

        /** RountCountNoti quan. */
        public quan: number;

        /** RountCountNoti ju. */
        public ju: number;

        /** RountCountNoti count. */
        public count: number;

        /**
         * Creates a new RountCountNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RountCountNoti instance
         */
        public static create(properties?: scmj.IRountCountNoti): scmj.RountCountNoti;

        /**
         * Encodes the specified RountCountNoti message. Does not implicitly {@link scmj.RountCountNoti.verify|verify} messages.
         * @param message RountCountNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IRountCountNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RountCountNoti message, length delimited. Does not implicitly {@link scmj.RountCountNoti.verify|verify} messages.
         * @param message RountCountNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IRountCountNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RountCountNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RountCountNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.RountCountNoti;

        /**
         * Decodes a RountCountNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RountCountNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.RountCountNoti;

        /**
         * Verifies a RountCountNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RountCountNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RountCountNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.RountCountNoti;

        /**
         * Creates a plain object from a RountCountNoti message. Also converts values to other types if specified.
         * @param message RountCountNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.RountCountNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RountCountNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PauseGameNoti. */
    interface IPauseGameNoti {

        /** PauseGameNoti flag */
        flag?: (number|null);

        /** PauseGameNoti waitTime */
        waitTime?: (number|null);

        /** PauseGameNoti leftTime */
        leftTime?: (number|null);

        /** PauseGameNoti chairId */
        chairId?: (number|null);

        /** PauseGameNoti nickName */
        nickName?: (string|null);
    }

    /** Represents a PauseGameNoti. */
    class PauseGameNoti implements IPauseGameNoti {

        /**
         * Constructs a new PauseGameNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IPauseGameNoti);

        /** PauseGameNoti flag. */
        public flag: number;

        /** PauseGameNoti waitTime. */
        public waitTime: number;

        /** PauseGameNoti leftTime. */
        public leftTime: number;

        /** PauseGameNoti chairId. */
        public chairId: number;

        /** PauseGameNoti nickName. */
        public nickName: string;

        /**
         * Creates a new PauseGameNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PauseGameNoti instance
         */
        public static create(properties?: scmj.IPauseGameNoti): scmj.PauseGameNoti;

        /**
         * Encodes the specified PauseGameNoti message. Does not implicitly {@link scmj.PauseGameNoti.verify|verify} messages.
         * @param message PauseGameNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IPauseGameNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PauseGameNoti message, length delimited. Does not implicitly {@link scmj.PauseGameNoti.verify|verify} messages.
         * @param message PauseGameNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IPauseGameNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PauseGameNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PauseGameNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.PauseGameNoti;

        /**
         * Decodes a PauseGameNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PauseGameNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.PauseGameNoti;

        /**
         * Verifies a PauseGameNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PauseGameNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PauseGameNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.PauseGameNoti;

        /**
         * Creates a plain object from a PauseGameNoti message. Also converts values to other types if specified.
         * @param message PauseGameNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.PauseGameNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PauseGameNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameStatisc. */
    interface IGameStatisc {

        /** GameStatisc bankerNum */
        bankerNum?: (number|null);

        /** GameStatisc huNum */
        huNum?: (number|null);

        /** GameStatisc dianPaoNum */
        dianPaoNum?: (number|null);

        /** GameStatisc gangNum */
        gangNum?: (number|null);

        /** GameStatisc chaDaJiaoNum */
        chaDaJiaoNum?: (number|null);

        /** GameStatisc amount */
        amount?: (number|Long|null);

        /** GameStatisc lianZhuangNum */
        lianZhuangNum?: (number|null);
    }

    /** Represents a GameStatisc. */
    class GameStatisc implements IGameStatisc {

        /**
         * Constructs a new GameStatisc.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IGameStatisc);

        /** GameStatisc bankerNum. */
        public bankerNum: number;

        /** GameStatisc huNum. */
        public huNum: number;

        /** GameStatisc dianPaoNum. */
        public dianPaoNum: number;

        /** GameStatisc gangNum. */
        public gangNum: number;

        /** GameStatisc chaDaJiaoNum. */
        public chaDaJiaoNum: number;

        /** GameStatisc amount. */
        public amount: (number|Long);

        /** GameStatisc lianZhuangNum. */
        public lianZhuangNum: number;

        /**
         * Creates a new GameStatisc instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStatisc instance
         */
        public static create(properties?: scmj.IGameStatisc): scmj.GameStatisc;

        /**
         * Encodes the specified GameStatisc message. Does not implicitly {@link scmj.GameStatisc.verify|verify} messages.
         * @param message GameStatisc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IGameStatisc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStatisc message, length delimited. Does not implicitly {@link scmj.GameStatisc.verify|verify} messages.
         * @param message GameStatisc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IGameStatisc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStatisc message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStatisc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.GameStatisc;

        /**
         * Decodes a GameStatisc message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStatisc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.GameStatisc;

        /**
         * Verifies a GameStatisc message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStatisc message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStatisc
         */
        public static fromObject(object: { [k: string]: any }): scmj.GameStatisc;

        /**
         * Creates a plain object from a GameStatisc message. Also converts values to other types if specified.
         * @param message GameStatisc
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.GameStatisc, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStatisc to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PrivateRoomResultReq. */
    interface IPrivateRoomResultReq {
    }

    /** Represents a PrivateRoomResultReq. */
    class PrivateRoomResultReq implements IPrivateRoomResultReq {

        /**
         * Constructs a new PrivateRoomResultReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IPrivateRoomResultReq);

        /**
         * Creates a new PrivateRoomResultReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PrivateRoomResultReq instance
         */
        public static create(properties?: scmj.IPrivateRoomResultReq): scmj.PrivateRoomResultReq;

        /**
         * Encodes the specified PrivateRoomResultReq message. Does not implicitly {@link scmj.PrivateRoomResultReq.verify|verify} messages.
         * @param message PrivateRoomResultReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IPrivateRoomResultReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PrivateRoomResultReq message, length delimited. Does not implicitly {@link scmj.PrivateRoomResultReq.verify|verify} messages.
         * @param message PrivateRoomResultReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IPrivateRoomResultReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PrivateRoomResultReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PrivateRoomResultReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.PrivateRoomResultReq;

        /**
         * Decodes a PrivateRoomResultReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PrivateRoomResultReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.PrivateRoomResultReq;

        /**
         * Verifies a PrivateRoomResultReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PrivateRoomResultReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PrivateRoomResultReq
         */
        public static fromObject(object: { [k: string]: any }): scmj.PrivateRoomResultReq;

        /**
         * Creates a plain object from a PrivateRoomResultReq message. Also converts values to other types if specified.
         * @param message PrivateRoomResultReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.PrivateRoomResultReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PrivateRoomResultReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PrivateRoomResultRsp. */
    interface IPrivateRoomResultRsp {

        /** PrivateRoomResultRsp gameStatiscs */
        gameStatiscs?: (scmj.IGameStatisc[]|null);

        /** PrivateRoomResultRsp ownerName */
        ownerName?: (string|null);
    }

    /** Represents a PrivateRoomResultRsp. */
    class PrivateRoomResultRsp implements IPrivateRoomResultRsp {

        /**
         * Constructs a new PrivateRoomResultRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IPrivateRoomResultRsp);

        /** PrivateRoomResultRsp gameStatiscs. */
        public gameStatiscs: scmj.IGameStatisc[];

        /** PrivateRoomResultRsp ownerName. */
        public ownerName: string;

        /**
         * Creates a new PrivateRoomResultRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PrivateRoomResultRsp instance
         */
        public static create(properties?: scmj.IPrivateRoomResultRsp): scmj.PrivateRoomResultRsp;

        /**
         * Encodes the specified PrivateRoomResultRsp message. Does not implicitly {@link scmj.PrivateRoomResultRsp.verify|verify} messages.
         * @param message PrivateRoomResultRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IPrivateRoomResultRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PrivateRoomResultRsp message, length delimited. Does not implicitly {@link scmj.PrivateRoomResultRsp.verify|verify} messages.
         * @param message PrivateRoomResultRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IPrivateRoomResultRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PrivateRoomResultRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PrivateRoomResultRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.PrivateRoomResultRsp;

        /**
         * Decodes a PrivateRoomResultRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PrivateRoomResultRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.PrivateRoomResultRsp;

        /**
         * Verifies a PrivateRoomResultRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PrivateRoomResultRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PrivateRoomResultRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.PrivateRoomResultRsp;

        /**
         * Creates a plain object from a PrivateRoomResultRsp message. Also converts values to other types if specified.
         * @param message PrivateRoomResultRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.PrivateRoomResultRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PrivateRoomResultRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PrivateRoomResultNoti. */
    interface IPrivateRoomResultNoti {

        /** PrivateRoomResultNoti gameStatiscs */
        gameStatiscs?: (scmj.IGameStatisc[]|null);

        /** PrivateRoomResultNoti ownerName */
        ownerName?: (string|null);
    }

    /** Represents a PrivateRoomResultNoti. */
    class PrivateRoomResultNoti implements IPrivateRoomResultNoti {

        /**
         * Constructs a new PrivateRoomResultNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IPrivateRoomResultNoti);

        /** PrivateRoomResultNoti gameStatiscs. */
        public gameStatiscs: scmj.IGameStatisc[];

        /** PrivateRoomResultNoti ownerName. */
        public ownerName: string;

        /**
         * Creates a new PrivateRoomResultNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PrivateRoomResultNoti instance
         */
        public static create(properties?: scmj.IPrivateRoomResultNoti): scmj.PrivateRoomResultNoti;

        /**
         * Encodes the specified PrivateRoomResultNoti message. Does not implicitly {@link scmj.PrivateRoomResultNoti.verify|verify} messages.
         * @param message PrivateRoomResultNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IPrivateRoomResultNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PrivateRoomResultNoti message, length delimited. Does not implicitly {@link scmj.PrivateRoomResultNoti.verify|verify} messages.
         * @param message PrivateRoomResultNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IPrivateRoomResultNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PrivateRoomResultNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PrivateRoomResultNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.PrivateRoomResultNoti;

        /**
         * Decodes a PrivateRoomResultNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PrivateRoomResultNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.PrivateRoomResultNoti;

        /**
         * Verifies a PrivateRoomResultNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PrivateRoomResultNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PrivateRoomResultNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.PrivateRoomResultNoti;

        /**
         * Creates a plain object from a PrivateRoomResultNoti message. Also converts values to other types if specified.
         * @param message PrivateRoomResultNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.PrivateRoomResultNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PrivateRoomResultNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OwnerNoti. */
    interface IOwnerNoti {

        /** OwnerNoti owner */
        owner?: (string|null);
    }

    /** Represents an OwnerNoti. */
    class OwnerNoti implements IOwnerNoti {

        /**
         * Constructs a new OwnerNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IOwnerNoti);

        /** OwnerNoti owner. */
        public owner: string;

        /**
         * Creates a new OwnerNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OwnerNoti instance
         */
        public static create(properties?: scmj.IOwnerNoti): scmj.OwnerNoti;

        /**
         * Encodes the specified OwnerNoti message. Does not implicitly {@link scmj.OwnerNoti.verify|verify} messages.
         * @param message OwnerNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IOwnerNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OwnerNoti message, length delimited. Does not implicitly {@link scmj.OwnerNoti.verify|verify} messages.
         * @param message OwnerNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IOwnerNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OwnerNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OwnerNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.OwnerNoti;

        /**
         * Decodes an OwnerNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OwnerNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.OwnerNoti;

        /**
         * Verifies an OwnerNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OwnerNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OwnerNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.OwnerNoti;

        /**
         * Creates a plain object from an OwnerNoti message. Also converts values to other types if specified.
         * @param message OwnerNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.OwnerNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OwnerNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ConnectNoti. */
    interface IConnectNoti {

        /** ConnectNoti chairId */
        chairId?: (number|null);

        /** ConnectNoti uid */
        uid?: (string|null);

        /** ConnectNoti status */
        status?: (number|null);
    }

    /** Represents a ConnectNoti. */
    class ConnectNoti implements IConnectNoti {

        /**
         * Constructs a new ConnectNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IConnectNoti);

        /** ConnectNoti chairId. */
        public chairId: number;

        /** ConnectNoti uid. */
        public uid: string;

        /** ConnectNoti status. */
        public status: number;

        /**
         * Creates a new ConnectNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConnectNoti instance
         */
        public static create(properties?: scmj.IConnectNoti): scmj.ConnectNoti;

        /**
         * Encodes the specified ConnectNoti message. Does not implicitly {@link scmj.ConnectNoti.verify|verify} messages.
         * @param message ConnectNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IConnectNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ConnectNoti message, length delimited. Does not implicitly {@link scmj.ConnectNoti.verify|verify} messages.
         * @param message ConnectNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IConnectNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ConnectNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ConnectNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.ConnectNoti;

        /**
         * Decodes a ConnectNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ConnectNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.ConnectNoti;

        /**
         * Verifies a ConnectNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ConnectNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ConnectNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.ConnectNoti;

        /**
         * Creates a plain object from a ConnectNoti message. Also converts values to other types if specified.
         * @param message ConnectNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.ConnectNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ConnectNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LastRoundNoti. */
    interface ILastRoundNoti {

        /** LastRoundNoti endTime */
        endTime?: (number|null);
    }

    /** Represents a LastRoundNoti. */
    class LastRoundNoti implements ILastRoundNoti {

        /**
         * Constructs a new LastRoundNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ILastRoundNoti);

        /** LastRoundNoti endTime. */
        public endTime: number;

        /**
         * Creates a new LastRoundNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LastRoundNoti instance
         */
        public static create(properties?: scmj.ILastRoundNoti): scmj.LastRoundNoti;

        /**
         * Encodes the specified LastRoundNoti message. Does not implicitly {@link scmj.LastRoundNoti.verify|verify} messages.
         * @param message LastRoundNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ILastRoundNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LastRoundNoti message, length delimited. Does not implicitly {@link scmj.LastRoundNoti.verify|verify} messages.
         * @param message LastRoundNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ILastRoundNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LastRoundNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LastRoundNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.LastRoundNoti;

        /**
         * Decodes a LastRoundNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LastRoundNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.LastRoundNoti;

        /**
         * Verifies a LastRoundNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LastRoundNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LastRoundNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.LastRoundNoti;

        /**
         * Creates a plain object from a LastRoundNoti message. Also converts values to other types if specified.
         * @param message LastRoundNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.LastRoundNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LastRoundNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GuiPaiNoti. */
    interface IGuiPaiNoti {

        /** GuiPaiNoti card */
        card?: (number|null);

        /** GuiPaiNoti laizi */
        laizi?: (number[]|null);
    }

    /** Represents a GuiPaiNoti. */
    class GuiPaiNoti implements IGuiPaiNoti {

        /**
         * Constructs a new GuiPaiNoti.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IGuiPaiNoti);

        /** GuiPaiNoti card. */
        public card: number;

        /** GuiPaiNoti laizi. */
        public laizi: number[];

        /**
         * Creates a new GuiPaiNoti instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GuiPaiNoti instance
         */
        public static create(properties?: scmj.IGuiPaiNoti): scmj.GuiPaiNoti;

        /**
         * Encodes the specified GuiPaiNoti message. Does not implicitly {@link scmj.GuiPaiNoti.verify|verify} messages.
         * @param message GuiPaiNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IGuiPaiNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GuiPaiNoti message, length delimited. Does not implicitly {@link scmj.GuiPaiNoti.verify|verify} messages.
         * @param message GuiPaiNoti message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IGuiPaiNoti, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GuiPaiNoti message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GuiPaiNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.GuiPaiNoti;

        /**
         * Decodes a GuiPaiNoti message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GuiPaiNoti
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.GuiPaiNoti;

        /**
         * Verifies a GuiPaiNoti message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GuiPaiNoti message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GuiPaiNoti
         */
        public static fromObject(object: { [k: string]: any }): scmj.GuiPaiNoti;

        /**
         * Creates a plain object from a GuiPaiNoti message. Also converts values to other types if specified.
         * @param message GuiPaiNoti
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.GuiPaiNoti, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GuiPaiNoti to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CardDetail. */
    interface ICardDetail {

        /** CardDetail card */
        card?: (number|null);

        /** CardDetail status */
        status?: (number|null);
    }

    /** Represents a CardDetail. */
    class CardDetail implements ICardDetail {

        /**
         * Constructs a new CardDetail.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.ICardDetail);

        /** CardDetail card. */
        public card: number;

        /** CardDetail status. */
        public status: number;

        /**
         * Creates a new CardDetail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CardDetail instance
         */
        public static create(properties?: scmj.ICardDetail): scmj.CardDetail;

        /**
         * Encodes the specified CardDetail message. Does not implicitly {@link scmj.CardDetail.verify|verify} messages.
         * @param message CardDetail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.ICardDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CardDetail message, length delimited. Does not implicitly {@link scmj.CardDetail.verify|verify} messages.
         * @param message CardDetail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.ICardDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CardDetail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CardDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.CardDetail;

        /**
         * Decodes a CardDetail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CardDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.CardDetail;

        /**
         * Verifies a CardDetail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CardDetail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CardDetail
         */
        public static fromObject(object: { [k: string]: any }): scmj.CardDetail;

        /**
         * Creates a plain object from a CardDetail message. Also converts values to other types if specified.
         * @param message CardDetail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.CardDetail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CardDetail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MaiMaItem. */
    interface IMaiMaItem {

        /** MaiMaItem chairId */
        chairId?: (number|null);

        /** MaiMaItem maNum */
        maNum?: (number|null);

        /** MaiMaItem cards */
        cards?: (number[]|null);

        /** MaiMaItem maCards */
        maCards?: (number[]|null);
    }

    /** Represents a MaiMaItem. */
    class MaiMaItem implements IMaiMaItem {

        /**
         * Constructs a new MaiMaItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IMaiMaItem);

        /** MaiMaItem chairId. */
        public chairId: number;

        /** MaiMaItem maNum. */
        public maNum: number;

        /** MaiMaItem cards. */
        public cards: number[];

        /** MaiMaItem maCards. */
        public maCards: number[];

        /**
         * Creates a new MaiMaItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MaiMaItem instance
         */
        public static create(properties?: scmj.IMaiMaItem): scmj.MaiMaItem;

        /**
         * Encodes the specified MaiMaItem message. Does not implicitly {@link scmj.MaiMaItem.verify|verify} messages.
         * @param message MaiMaItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IMaiMaItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MaiMaItem message, length delimited. Does not implicitly {@link scmj.MaiMaItem.verify|verify} messages.
         * @param message MaiMaItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IMaiMaItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MaiMaItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MaiMaItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.MaiMaItem;

        /**
         * Decodes a MaiMaItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MaiMaItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.MaiMaItem;

        /**
         * Verifies a MaiMaItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MaiMaItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MaiMaItem
         */
        public static fromObject(object: { [k: string]: any }): scmj.MaiMaItem;

        /**
         * Creates a plain object from a MaiMaItem message. Also converts values to other types if specified.
         * @param message MaiMaItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.MaiMaItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MaiMaItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MaiMaRsp. */
    interface IMaiMaRsp {

        /** MaiMaRsp maItems */
        maItems?: (scmj.IMaiMaItem[]|null);

        /** MaiMaRsp winChairIds */
        winChairIds?: (number[]|null);

        /** MaiMaRsp loseChairIds */
        loseChairIds?: (number[]|null);
    }

    /** Represents a MaiMaRsp. */
    class MaiMaRsp implements IMaiMaRsp {

        /**
         * Constructs a new MaiMaRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: scmj.IMaiMaRsp);

        /** MaiMaRsp maItems. */
        public maItems: scmj.IMaiMaItem[];

        /** MaiMaRsp winChairIds. */
        public winChairIds: number[];

        /** MaiMaRsp loseChairIds. */
        public loseChairIds: number[];

        /**
         * Creates a new MaiMaRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MaiMaRsp instance
         */
        public static create(properties?: scmj.IMaiMaRsp): scmj.MaiMaRsp;

        /**
         * Encodes the specified MaiMaRsp message. Does not implicitly {@link scmj.MaiMaRsp.verify|verify} messages.
         * @param message MaiMaRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: scmj.IMaiMaRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MaiMaRsp message, length delimited. Does not implicitly {@link scmj.MaiMaRsp.verify|verify} messages.
         * @param message MaiMaRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: scmj.IMaiMaRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MaiMaRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MaiMaRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): scmj.MaiMaRsp;

        /**
         * Decodes a MaiMaRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MaiMaRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): scmj.MaiMaRsp;

        /**
         * Verifies a MaiMaRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MaiMaRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MaiMaRsp
         */
        public static fromObject(object: { [k: string]: any }): scmj.MaiMaRsp;

        /**
         * Creates a plain object from a MaiMaRsp message. Also converts values to other types if specified.
         * @param message MaiMaRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: scmj.MaiMaRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MaiMaRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
