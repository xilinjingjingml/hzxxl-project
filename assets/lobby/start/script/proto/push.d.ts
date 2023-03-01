import * as $protobuf from "protobufjs";
/** Namespace push. */
export namespace push {

    /** Represents a Push */
    class Push extends $protobuf.rpc.Service {

        /**
         * Constructs a new Push service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new Push service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Push;

        /**
         * Calls Register.
         * @param request RegisterReq message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public register(request: push.IRegisterReq, callback: push.Push.RegisterCallback): void;

        /**
         * Calls Register.
         * @param request RegisterReq message or plain object
         * @returns Promise
         */
        public register(request: push.IRegisterReq): Promise<push.Empty>;
    }

    namespace Push {

        /**
         * Callback as used by {@link push.Push#register}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type RegisterCallback = (error: (Error|null), response?: push.Empty) => void;
    }

    /** Properties of an Empty. */
    interface IEmpty {
    }

    /** Represents an Empty. */
    class Empty implements IEmpty {

        /**
         * Constructs a new Empty.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IEmpty);

        /**
         * Creates a new Empty instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Empty instance
         */
        public static create(properties?: push.IEmpty): push.Empty;

        /**
         * Encodes the specified Empty message. Does not implicitly {@link push.Empty.verify|verify} messages.
         * @param message Empty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Empty message, length delimited. Does not implicitly {@link push.Empty.verify|verify} messages.
         * @param message Empty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Empty message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.Empty;

        /**
         * Decodes an Empty message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.Empty;

        /**
         * Verifies an Empty message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Empty message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Empty
         */
        public static fromObject(object: { [k: string]: any }): push.Empty;

        /**
         * Creates a plain object from an Empty message. Also converts values to other types if specified.
         * @param message Empty
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Empty to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SysError. */
    interface ISysError {

        /** SysError id */
        id?: (string|null);

        /** SysError code */
        code?: (number|null);

        /** SysError detail */
        detail?: (string|null);

        /** SysError status */
        status?: (string|null);
    }

    /** Represents a SysError. */
    class SysError implements ISysError {

        /**
         * Constructs a new SysError.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.ISysError);

        /** SysError id. */
        public id: string;

        /** SysError code. */
        public code: number;

        /** SysError detail. */
        public detail: string;

        /** SysError status. */
        public status: string;

        /**
         * Creates a new SysError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SysError instance
         */
        public static create(properties?: push.ISysError): push.SysError;

        /**
         * Encodes the specified SysError message. Does not implicitly {@link push.SysError.verify|verify} messages.
         * @param message SysError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.ISysError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SysError message, length delimited. Does not implicitly {@link push.SysError.verify|verify} messages.
         * @param message SysError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.ISysError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SysError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SysError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.SysError;

        /**
         * Decodes a SysError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SysError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.SysError;

        /**
         * Verifies a SysError message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SysError message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SysError
         */
        public static fromObject(object: { [k: string]: any }): push.SysError;

        /**
         * Creates a plain object from a SysError message. Also converts values to other types if specified.
         * @param message SysError
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.SysError, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SysError to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RegisterReq. */
    interface IRegisterReq {

        /** RegisterReq openid */
        openid?: (string|null);

        /** RegisterReq token */
        token?: (string|null);

        /** RegisterReq cliVer */
        cliVer?: (number|Long|null);
    }

    /** Represents a RegisterReq. */
    class RegisterReq implements IRegisterReq {

        /**
         * Constructs a new RegisterReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IRegisterReq);

        /** RegisterReq openid. */
        public openid: string;

        /** RegisterReq token. */
        public token: string;

        /** RegisterReq cliVer. */
        public cliVer: (number|Long);

        /**
         * Creates a new RegisterReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterReq instance
         */
        public static create(properties?: push.IRegisterReq): push.RegisterReq;

        /**
         * Encodes the specified RegisterReq message. Does not implicitly {@link push.RegisterReq.verify|verify} messages.
         * @param message RegisterReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IRegisterReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterReq message, length delimited. Does not implicitly {@link push.RegisterReq.verify|verify} messages.
         * @param message RegisterReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IRegisterReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.RegisterReq;

        /**
         * Decodes a RegisterReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.RegisterReq;

        /**
         * Verifies a RegisterReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterReq
         */
        public static fromObject(object: { [k: string]: any }): push.RegisterReq;

        /**
         * Creates a plain object from a RegisterReq message. Also converts values to other types if specified.
         * @param message RegisterReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.RegisterReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RegisterRsp. */
    interface IRegisterRsp {
    }

    /** Represents a RegisterRsp. */
    class RegisterRsp implements IRegisterRsp {

        /**
         * Constructs a new RegisterRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IRegisterRsp);

        /**
         * Creates a new RegisterRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterRsp instance
         */
        public static create(properties?: push.IRegisterRsp): push.RegisterRsp;

        /**
         * Encodes the specified RegisterRsp message. Does not implicitly {@link push.RegisterRsp.verify|verify} messages.
         * @param message RegisterRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IRegisterRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterRsp message, length delimited. Does not implicitly {@link push.RegisterRsp.verify|verify} messages.
         * @param message RegisterRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IRegisterRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.RegisterRsp;

        /**
         * Decodes a RegisterRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.RegisterRsp;

        /**
         * Verifies a RegisterRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterRsp
         */
        public static fromObject(object: { [k: string]: any }): push.RegisterRsp;

        /**
         * Creates a plain object from a RegisterRsp message. Also converts values to other types if specified.
         * @param message RegisterRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.RegisterRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushReq. */
    interface IPushReq {

        /** PushReq openid */
        openid?: (string|null);

        /** PushReq route */
        route?: (string|null);

        /** PushReq body */
        body?: (Uint8Array|null);
    }

    /** Represents a PushReq. */
    class PushReq implements IPushReq {

        /**
         * Constructs a new PushReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IPushReq);

        /** PushReq openid. */
        public openid: string;

        /** PushReq route. */
        public route: string;

        /** PushReq body. */
        public body: Uint8Array;

        /**
         * Creates a new PushReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushReq instance
         */
        public static create(properties?: push.IPushReq): push.PushReq;

        /**
         * Encodes the specified PushReq message. Does not implicitly {@link push.PushReq.verify|verify} messages.
         * @param message PushReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IPushReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushReq message, length delimited. Does not implicitly {@link push.PushReq.verify|verify} messages.
         * @param message PushReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IPushReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.PushReq;

        /**
         * Decodes a PushReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.PushReq;

        /**
         * Verifies a PushReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushReq
         */
        public static fromObject(object: { [k: string]: any }): push.PushReq;

        /**
         * Creates a plain object from a PushReq message. Also converts values to other types if specified.
         * @param message PushReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.PushReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushRsp. */
    interface IPushRsp {
    }

    /** Represents a PushRsp. */
    class PushRsp implements IPushRsp {

        /**
         * Constructs a new PushRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IPushRsp);

        /**
         * Creates a new PushRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushRsp instance
         */
        public static create(properties?: push.IPushRsp): push.PushRsp;

        /**
         * Encodes the specified PushRsp message. Does not implicitly {@link push.PushRsp.verify|verify} messages.
         * @param message PushRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IPushRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushRsp message, length delimited. Does not implicitly {@link push.PushRsp.verify|verify} messages.
         * @param message PushRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IPushRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.PushRsp;

        /**
         * Decodes a PushRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.PushRsp;

        /**
         * Verifies a PushRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushRsp
         */
        public static fromObject(object: { [k: string]: any }): push.PushRsp;

        /**
         * Creates a plain object from a PushRsp message. Also converts values to other types if specified.
         * @param message PushRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.PushRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Ping. */
    interface IPing {

        /** Ping now */
        now?: (number|Long|null);

        /** Ping openid */
        openid?: (string|null);
    }

    /** Represents a Ping. */
    class Ping implements IPing {

        /**
         * Constructs a new Ping.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IPing);

        /** Ping now. */
        public now: (number|Long);

        /** Ping openid. */
        public openid: string;

        /**
         * Creates a new Ping instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ping instance
         */
        public static create(properties?: push.IPing): push.Ping;

        /**
         * Encodes the specified Ping message. Does not implicitly {@link push.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link push.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.Ping;

        /**
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.Ping;

        /**
         * Verifies a Ping message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ping
         */
        public static fromObject(object: { [k: string]: any }): push.Ping;

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @param message Ping
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ping to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Pong. */
    interface IPong {

        /** Pong now */
        now?: (number|Long|null);

        /** Pong send */
        send?: (number|Long|null);
    }

    /** Represents a Pong. */
    class Pong implements IPong {

        /**
         * Constructs a new Pong.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IPong);

        /** Pong now. */
        public now: (number|Long);

        /** Pong send. */
        public send: (number|Long);

        /**
         * Creates a new Pong instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Pong instance
         */
        public static create(properties?: push.IPong): push.Pong;

        /**
         * Encodes the specified Pong message. Does not implicitly {@link push.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Pong message, length delimited. Does not implicitly {@link push.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pong message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.Pong;

        /**
         * Decodes a Pong message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.Pong;

        /**
         * Verifies a Pong message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Pong message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Pong
         */
        public static fromObject(object: { [k: string]: any }): push.Pong;

        /**
         * Creates a plain object from a Pong message. Also converts values to other types if specified.
         * @param message Pong
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.Pong, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Pong to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdateItemNot. */
    interface IUpdateItemNot {
    }

    /** Represents an UpdateItemNot. */
    class UpdateItemNot implements IUpdateItemNot {

        /**
         * Constructs a new UpdateItemNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IUpdateItemNot);

        /**
         * Creates a new UpdateItemNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateItemNot instance
         */
        public static create(properties?: push.IUpdateItemNot): push.UpdateItemNot;

        /**
         * Encodes the specified UpdateItemNot message. Does not implicitly {@link push.UpdateItemNot.verify|verify} messages.
         * @param message UpdateItemNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IUpdateItemNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateItemNot message, length delimited. Does not implicitly {@link push.UpdateItemNot.verify|verify} messages.
         * @param message UpdateItemNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IUpdateItemNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateItemNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateItemNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.UpdateItemNot;

        /**
         * Decodes an UpdateItemNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateItemNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.UpdateItemNot;

        /**
         * Verifies an UpdateItemNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateItemNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateItemNot
         */
        public static fromObject(object: { [k: string]: any }): push.UpdateItemNot;

        /**
         * Creates a plain object from an UpdateItemNot message. Also converts values to other types if specified.
         * @param message UpdateItemNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.UpdateItemNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateItemNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MsgPushNot. */
    interface IMsgPushNot {

        /** MsgPushNot showType */
        showType?: (number|null);

        /** MsgPushNot openUri */
        openUri?: (string|null);

        /** MsgPushNot msg */
        msg?: (string|null);

        /** MsgPushNot sender */
        sender?: (string|null);
    }

    /** Represents a MsgPushNot. */
    class MsgPushNot implements IMsgPushNot {

        /**
         * Constructs a new MsgPushNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IMsgPushNot);

        /** MsgPushNot showType. */
        public showType: number;

        /** MsgPushNot openUri. */
        public openUri: string;

        /** MsgPushNot msg. */
        public msg: string;

        /** MsgPushNot sender. */
        public sender: string;

        /**
         * Creates a new MsgPushNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgPushNot instance
         */
        public static create(properties?: push.IMsgPushNot): push.MsgPushNot;

        /**
         * Encodes the specified MsgPushNot message. Does not implicitly {@link push.MsgPushNot.verify|verify} messages.
         * @param message MsgPushNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IMsgPushNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MsgPushNot message, length delimited. Does not implicitly {@link push.MsgPushNot.verify|verify} messages.
         * @param message MsgPushNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IMsgPushNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MsgPushNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgPushNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.MsgPushNot;

        /**
         * Decodes a MsgPushNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgPushNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.MsgPushNot;

        /**
         * Verifies a MsgPushNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MsgPushNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgPushNot
         */
        public static fromObject(object: { [k: string]: any }): push.MsgPushNot;

        /**
         * Creates a plain object from a MsgPushNot message. Also converts values to other types if specified.
         * @param message MsgPushNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.MsgPushNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MsgPushNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushMessageReq. */
    interface IPushMessageReq {

        /** PushMessageReq openid */
        openid?: (string|null);

        /** PushMessageReq message */
        message?: (string|null);

        /** PushMessageReq showType */
        showType?: (number|null);
    }

    /** Represents a PushMessageReq. */
    class PushMessageReq implements IPushMessageReq {

        /**
         * Constructs a new PushMessageReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IPushMessageReq);

        /** PushMessageReq openid. */
        public openid: string;

        /** PushMessageReq message. */
        public message: string;

        /** PushMessageReq showType. */
        public showType: number;

        /**
         * Creates a new PushMessageReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushMessageReq instance
         */
        public static create(properties?: push.IPushMessageReq): push.PushMessageReq;

        /**
         * Encodes the specified PushMessageReq message. Does not implicitly {@link push.PushMessageReq.verify|verify} messages.
         * @param message PushMessageReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IPushMessageReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushMessageReq message, length delimited. Does not implicitly {@link push.PushMessageReq.verify|verify} messages.
         * @param message PushMessageReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IPushMessageReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushMessageReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushMessageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.PushMessageReq;

        /**
         * Decodes a PushMessageReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushMessageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.PushMessageReq;

        /**
         * Verifies a PushMessageReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushMessageReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushMessageReq
         */
        public static fromObject(object: { [k: string]: any }): push.PushMessageReq;

        /**
         * Creates a plain object from a PushMessageReq message. Also converts values to other types if specified.
         * @param message PushMessageReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.PushMessageReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushMessageReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushMessageRsp. */
    interface IPushMessageRsp {

        /** PushMessageRsp err */
        err?: (string|null);
    }

    /** Represents a PushMessageRsp. */
    class PushMessageRsp implements IPushMessageRsp {

        /**
         * Constructs a new PushMessageRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IPushMessageRsp);

        /** PushMessageRsp err. */
        public err: string;

        /**
         * Creates a new PushMessageRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushMessageRsp instance
         */
        public static create(properties?: push.IPushMessageRsp): push.PushMessageRsp;

        /**
         * Encodes the specified PushMessageRsp message. Does not implicitly {@link push.PushMessageRsp.verify|verify} messages.
         * @param message PushMessageRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IPushMessageRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushMessageRsp message, length delimited. Does not implicitly {@link push.PushMessageRsp.verify|verify} messages.
         * @param message PushMessageRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IPushMessageRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushMessageRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushMessageRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.PushMessageRsp;

        /**
         * Decodes a PushMessageRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushMessageRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.PushMessageRsp;

        /**
         * Verifies a PushMessageRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushMessageRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushMessageRsp
         */
        public static fromObject(object: { [k: string]: any }): push.PushMessageRsp;

        /**
         * Creates a plain object from a PushMessageRsp message. Also converts values to other types if specified.
         * @param message PushMessageRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.PushMessageRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushMessageRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GsbPing. */
    interface IGsbPing {

        /** GsbPing now */
        now?: (number|Long|null);
    }

    /** Represents a GsbPing. */
    class GsbPing implements IGsbPing {

        /**
         * Constructs a new GsbPing.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IGsbPing);

        /** GsbPing now. */
        public now: (number|Long);

        /**
         * Creates a new GsbPing instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GsbPing instance
         */
        public static create(properties?: push.IGsbPing): push.GsbPing;

        /**
         * Encodes the specified GsbPing message. Does not implicitly {@link push.GsbPing.verify|verify} messages.
         * @param message GsbPing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IGsbPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GsbPing message, length delimited. Does not implicitly {@link push.GsbPing.verify|verify} messages.
         * @param message GsbPing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IGsbPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GsbPing message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GsbPing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.GsbPing;

        /**
         * Decodes a GsbPing message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GsbPing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.GsbPing;

        /**
         * Verifies a GsbPing message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GsbPing message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GsbPing
         */
        public static fromObject(object: { [k: string]: any }): push.GsbPing;

        /**
         * Creates a plain object from a GsbPing message. Also converts values to other types if specified.
         * @param message GsbPing
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.GsbPing, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GsbPing to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GsbPong. */
    interface IGsbPong {

        /** GsbPong err */
        err?: (string|null);

        /** GsbPong cliNow */
        cliNow?: (number|Long|null);

        /** GsbPong now */
        now?: (number|Long|null);
    }

    /** Represents a GsbPong. */
    class GsbPong implements IGsbPong {

        /**
         * Constructs a new GsbPong.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IGsbPong);

        /** GsbPong err. */
        public err: string;

        /** GsbPong cliNow. */
        public cliNow: (number|Long);

        /** GsbPong now. */
        public now: (number|Long);

        /**
         * Creates a new GsbPong instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GsbPong instance
         */
        public static create(properties?: push.IGsbPong): push.GsbPong;

        /**
         * Encodes the specified GsbPong message. Does not implicitly {@link push.GsbPong.verify|verify} messages.
         * @param message GsbPong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IGsbPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GsbPong message, length delimited. Does not implicitly {@link push.GsbPong.verify|verify} messages.
         * @param message GsbPong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IGsbPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GsbPong message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GsbPong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.GsbPong;

        /**
         * Decodes a GsbPong message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GsbPong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.GsbPong;

        /**
         * Verifies a GsbPong message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GsbPong message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GsbPong
         */
        public static fromObject(object: { [k: string]: any }): push.GsbPong;

        /**
         * Creates a plain object from a GsbPong message. Also converts values to other types if specified.
         * @param message GsbPong
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.GsbPong, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GsbPong to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SystemMessage. */
    interface ISystemMessage {

        /** SystemMessage code */
        code?: (number|null);

        /** SystemMessage err */
        err?: (string|null);

        /** SystemMessage request */
        request?: (string|null);
    }

    /** Represents a SystemMessage. */
    class SystemMessage implements ISystemMessage {

        /**
         * Constructs a new SystemMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.ISystemMessage);

        /** SystemMessage code. */
        public code: number;

        /** SystemMessage err. */
        public err: string;

        /** SystemMessage request. */
        public request: string;

        /**
         * Creates a new SystemMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SystemMessage instance
         */
        public static create(properties?: push.ISystemMessage): push.SystemMessage;

        /**
         * Encodes the specified SystemMessage message. Does not implicitly {@link push.SystemMessage.verify|verify} messages.
         * @param message SystemMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.ISystemMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link push.SystemMessage.verify|verify} messages.
         * @param message SystemMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.ISystemMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SystemMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.SystemMessage;

        /**
         * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.SystemMessage;

        /**
         * Verifies a SystemMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SystemMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SystemMessage
         */
        public static fromObject(object: { [k: string]: any }): push.SystemMessage;

        /**
         * Creates a plain object from a SystemMessage message. Also converts values to other types if specified.
         * @param message SystemMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.SystemMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SystemMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MatchingStatusNot. */
    interface IMatchingStatusNot {

        /** MatchingStatusNot err */
        err?: (string|null);

        /** MatchingStatusNot matchCid */
        matchCid?: (string|null);

        /** MatchingStatusNot matchId */
        matchId?: (string|null);

        /** MatchingStatusNot startTime */
        startTime?: (number|Long|null);
    }

    /** Represents a MatchingStatusNot. */
    class MatchingStatusNot implements IMatchingStatusNot {

        /**
         * Constructs a new MatchingStatusNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: push.IMatchingStatusNot);

        /** MatchingStatusNot err. */
        public err: string;

        /** MatchingStatusNot matchCid. */
        public matchCid: string;

        /** MatchingStatusNot matchId. */
        public matchId: string;

        /** MatchingStatusNot startTime. */
        public startTime: (number|Long);

        /**
         * Creates a new MatchingStatusNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchingStatusNot instance
         */
        public static create(properties?: push.IMatchingStatusNot): push.MatchingStatusNot;

        /**
         * Encodes the specified MatchingStatusNot message. Does not implicitly {@link push.MatchingStatusNot.verify|verify} messages.
         * @param message MatchingStatusNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: push.IMatchingStatusNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchingStatusNot message, length delimited. Does not implicitly {@link push.MatchingStatusNot.verify|verify} messages.
         * @param message MatchingStatusNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: push.IMatchingStatusNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchingStatusNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchingStatusNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): push.MatchingStatusNot;

        /**
         * Decodes a MatchingStatusNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchingStatusNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): push.MatchingStatusNot;

        /**
         * Verifies a MatchingStatusNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchingStatusNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchingStatusNot
         */
        public static fromObject(object: { [k: string]: any }): push.MatchingStatusNot;

        /**
         * Creates a plain object from a MatchingStatusNot message. Also converts values to other types if specified.
         * @param message MatchingStatusNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: push.MatchingStatusNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchingStatusNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
