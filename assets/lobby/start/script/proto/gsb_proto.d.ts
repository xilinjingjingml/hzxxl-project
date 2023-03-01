import * as $protobuf from "protobufjs";
/** Namespace gsbase. */
export namespace gsbase {

    /** Version enum. */
    enum Version {
        major = 0,
        minor = 1
    }

    /** Properties of a JoinRoomReq. */
    interface IJoinRoomReq {

        /** JoinRoomReq roomId */
        roomId?: (string|null);

        /** JoinRoomReq token */
        token?: (string|null);
    }

    /** Represents a JoinRoomReq. */
    class JoinRoomReq implements IJoinRoomReq {

        /**
         * Constructs a new JoinRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IJoinRoomReq);

        /** JoinRoomReq roomId. */
        public roomId: string;

        /** JoinRoomReq token. */
        public token: string;

        /**
         * Creates a new JoinRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomReq instance
         */
        public static create(properties?: gsbase.IJoinRoomReq): gsbase.JoinRoomReq;

        /**
         * Encodes the specified JoinRoomReq message. Does not implicitly {@link gsbase.JoinRoomReq.verify|verify} messages.
         * @param message JoinRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IJoinRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomReq message, length delimited. Does not implicitly {@link gsbase.JoinRoomReq.verify|verify} messages.
         * @param message JoinRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IJoinRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.JoinRoomReq;

        /**
         * Decodes a JoinRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.JoinRoomReq;

        /**
         * Verifies a JoinRoomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.JoinRoomReq;

        /**
         * Creates a plain object from a JoinRoomReq message. Also converts values to other types if specified.
         * @param message JoinRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.JoinRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinRoomRsp. */
    interface IJoinRoomRsp {

        /** JoinRoomRsp err */
        err?: (string|null);

        /** JoinRoomRsp room */
        room?: (gsbase.IRoomInfo|null);
    }

    /** Represents a JoinRoomRsp. */
    class JoinRoomRsp implements IJoinRoomRsp {

        /**
         * Constructs a new JoinRoomRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IJoinRoomRsp);

        /** JoinRoomRsp err. */
        public err: string;

        /** JoinRoomRsp room. */
        public room?: (gsbase.IRoomInfo|null);

        /**
         * Creates a new JoinRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomRsp instance
         */
        public static create(properties?: gsbase.IJoinRoomRsp): gsbase.JoinRoomRsp;

        /**
         * Encodes the specified JoinRoomRsp message. Does not implicitly {@link gsbase.JoinRoomRsp.verify|verify} messages.
         * @param message JoinRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IJoinRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomRsp message, length delimited. Does not implicitly {@link gsbase.JoinRoomRsp.verify|verify} messages.
         * @param message JoinRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IJoinRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.JoinRoomRsp;

        /**
         * Decodes a JoinRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.JoinRoomRsp;

        /**
         * Verifies a JoinRoomRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.JoinRoomRsp;

        /**
         * Creates a plain object from a JoinRoomRsp message. Also converts values to other types if specified.
         * @param message JoinRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.JoinRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinRoomNot. */
    interface IJoinRoomNot {

        /** JoinRoomNot openid */
        openid?: (string|null);

        /** JoinRoomNot room */
        room?: (gsbase.IRoomInfo|null);
    }

    /** Represents a JoinRoomNot. */
    class JoinRoomNot implements IJoinRoomNot {

        /**
         * Constructs a new JoinRoomNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IJoinRoomNot);

        /** JoinRoomNot openid. */
        public openid: string;

        /** JoinRoomNot room. */
        public room?: (gsbase.IRoomInfo|null);

        /**
         * Creates a new JoinRoomNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomNot instance
         */
        public static create(properties?: gsbase.IJoinRoomNot): gsbase.JoinRoomNot;

        /**
         * Encodes the specified JoinRoomNot message. Does not implicitly {@link gsbase.JoinRoomNot.verify|verify} messages.
         * @param message JoinRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IJoinRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomNot message, length delimited. Does not implicitly {@link gsbase.JoinRoomNot.verify|verify} messages.
         * @param message JoinRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IJoinRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.JoinRoomNot;

        /**
         * Decodes a JoinRoomNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.JoinRoomNot;

        /**
         * Verifies a JoinRoomNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.JoinRoomNot;

        /**
         * Creates a plain object from a JoinRoomNot message. Also converts values to other types if specified.
         * @param message JoinRoomNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.JoinRoomNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LeaveRoomReq. */
    interface ILeaveRoomReq {
    }

    /** Represents a LeaveRoomReq. */
    class LeaveRoomReq implements ILeaveRoomReq {

        /**
         * Constructs a new LeaveRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.ILeaveRoomReq);

        /**
         * Creates a new LeaveRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoomReq instance
         */
        public static create(properties?: gsbase.ILeaveRoomReq): gsbase.LeaveRoomReq;

        /**
         * Encodes the specified LeaveRoomReq message. Does not implicitly {@link gsbase.LeaveRoomReq.verify|verify} messages.
         * @param message LeaveRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.ILeaveRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoomReq message, length delimited. Does not implicitly {@link gsbase.LeaveRoomReq.verify|verify} messages.
         * @param message LeaveRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.ILeaveRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.LeaveRoomReq;

        /**
         * Decodes a LeaveRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.LeaveRoomReq;

        /**
         * Verifies a LeaveRoomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoomReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.LeaveRoomReq;

        /**
         * Creates a plain object from a LeaveRoomReq message. Also converts values to other types if specified.
         * @param message LeaveRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.LeaveRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LeaveRoomRsp. */
    interface ILeaveRoomRsp {

        /** LeaveRoomRsp err */
        err?: (string|null);

        /** LeaveRoomRsp openid */
        openid?: (string|null);
    }

    /** Represents a LeaveRoomRsp. */
    class LeaveRoomRsp implements ILeaveRoomRsp {

        /**
         * Constructs a new LeaveRoomRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.ILeaveRoomRsp);

        /** LeaveRoomRsp err. */
        public err: string;

        /** LeaveRoomRsp openid. */
        public openid: string;

        /**
         * Creates a new LeaveRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoomRsp instance
         */
        public static create(properties?: gsbase.ILeaveRoomRsp): gsbase.LeaveRoomRsp;

        /**
         * Encodes the specified LeaveRoomRsp message. Does not implicitly {@link gsbase.LeaveRoomRsp.verify|verify} messages.
         * @param message LeaveRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.ILeaveRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoomRsp message, length delimited. Does not implicitly {@link gsbase.LeaveRoomRsp.verify|verify} messages.
         * @param message LeaveRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.ILeaveRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.LeaveRoomRsp;

        /**
         * Decodes a LeaveRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.LeaveRoomRsp;

        /**
         * Verifies a LeaveRoomRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoomRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.LeaveRoomRsp;

        /**
         * Creates a plain object from a LeaveRoomRsp message. Also converts values to other types if specified.
         * @param message LeaveRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.LeaveRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DismissNot. */
    interface IDismissNot {

        /** DismissNot msg */
        msg?: (string|null);

        /** DismissNot code */
        code?: (gsbase.DismissNot.Type|null);
    }

    /** Represents a DismissNot. */
    class DismissNot implements IDismissNot {

        /**
         * Constructs a new DismissNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IDismissNot);

        /** DismissNot msg. */
        public msg: string;

        /** DismissNot code. */
        public code: gsbase.DismissNot.Type;

        /**
         * Creates a new DismissNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DismissNot instance
         */
        public static create(properties?: gsbase.IDismissNot): gsbase.DismissNot;

        /**
         * Encodes the specified DismissNot message. Does not implicitly {@link gsbase.DismissNot.verify|verify} messages.
         * @param message DismissNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IDismissNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DismissNot message, length delimited. Does not implicitly {@link gsbase.DismissNot.verify|verify} messages.
         * @param message DismissNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IDismissNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DismissNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.DismissNot;

        /**
         * Decodes a DismissNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.DismissNot;

        /**
         * Verifies a DismissNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DismissNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DismissNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.DismissNot;

        /**
         * Creates a plain object from a DismissNot message. Also converts values to other types if specified.
         * @param message DismissNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.DismissNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DismissNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace DismissNot {

        /** Type enum. */
        enum Type {
            GameOverDismiss = 0,
            OwnerDismiss = 1,
            UserDismiss = 2,
            TimeOutDismiss = 3,
            AdminDismiss = 4
        }
    }

    /** Properties of a DismissRoomReq. */
    interface IDismissRoomReq {

        /** DismissRoomReq openid */
        openid?: (string|null);

        /** DismissRoomReq roomId */
        roomId?: (string|null);
    }

    /** Represents a DismissRoomReq. */
    class DismissRoomReq implements IDismissRoomReq {

        /**
         * Constructs a new DismissRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IDismissRoomReq);

        /** DismissRoomReq openid. */
        public openid: string;

        /** DismissRoomReq roomId. */
        public roomId: string;

        /**
         * Creates a new DismissRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DismissRoomReq instance
         */
        public static create(properties?: gsbase.IDismissRoomReq): gsbase.DismissRoomReq;

        /**
         * Encodes the specified DismissRoomReq message. Does not implicitly {@link gsbase.DismissRoomReq.verify|verify} messages.
         * @param message DismissRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IDismissRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DismissRoomReq message, length delimited. Does not implicitly {@link gsbase.DismissRoomReq.verify|verify} messages.
         * @param message DismissRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IDismissRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DismissRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DismissRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.DismissRoomReq;

        /**
         * Decodes a DismissRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DismissRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.DismissRoomReq;

        /**
         * Verifies a DismissRoomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DismissRoomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DismissRoomReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.DismissRoomReq;

        /**
         * Creates a plain object from a DismissRoomReq message. Also converts values to other types if specified.
         * @param message DismissRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.DismissRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DismissRoomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DismissRoomRsp. */
    interface IDismissRoomRsp {

        /** DismissRoomRsp err */
        err?: (string|null);
    }

    /** Represents a DismissRoomRsp. */
    class DismissRoomRsp implements IDismissRoomRsp {

        /**
         * Constructs a new DismissRoomRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IDismissRoomRsp);

        /** DismissRoomRsp err. */
        public err: string;

        /**
         * Creates a new DismissRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DismissRoomRsp instance
         */
        public static create(properties?: gsbase.IDismissRoomRsp): gsbase.DismissRoomRsp;

        /**
         * Encodes the specified DismissRoomRsp message. Does not implicitly {@link gsbase.DismissRoomRsp.verify|verify} messages.
         * @param message DismissRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IDismissRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DismissRoomRsp message, length delimited. Does not implicitly {@link gsbase.DismissRoomRsp.verify|verify} messages.
         * @param message DismissRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IDismissRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DismissRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DismissRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.DismissRoomRsp;

        /**
         * Decodes a DismissRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DismissRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.DismissRoomRsp;

        /**
         * Verifies a DismissRoomRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DismissRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DismissRoomRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.DismissRoomRsp;

        /**
         * Creates a plain object from a DismissRoomRsp message. Also converts values to other types if specified.
         * @param message DismissRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.DismissRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DismissRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplyDismissReq. */
    interface IApplyDismissReq {
    }

    /** Represents an ApplyDismissReq. */
    class ApplyDismissReq implements IApplyDismissReq {

        /**
         * Constructs a new ApplyDismissReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IApplyDismissReq);

        /**
         * Creates a new ApplyDismissReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplyDismissReq instance
         */
        public static create(properties?: gsbase.IApplyDismissReq): gsbase.ApplyDismissReq;

        /**
         * Encodes the specified ApplyDismissReq message. Does not implicitly {@link gsbase.ApplyDismissReq.verify|verify} messages.
         * @param message ApplyDismissReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IApplyDismissReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplyDismissReq message, length delimited. Does not implicitly {@link gsbase.ApplyDismissReq.verify|verify} messages.
         * @param message ApplyDismissReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IApplyDismissReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplyDismissReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ApplyDismissReq;

        /**
         * Decodes an ApplyDismissReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ApplyDismissReq;

        /**
         * Verifies an ApplyDismissReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplyDismissReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplyDismissReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.ApplyDismissReq;

        /**
         * Creates a plain object from an ApplyDismissReq message. Also converts values to other types if specified.
         * @param message ApplyDismissReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.ApplyDismissReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplyDismissReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplyDismissRsp. */
    interface IApplyDismissRsp {

        /** ApplyDismissRsp err */
        err?: (string|null);
    }

    /** Represents an ApplyDismissRsp. */
    class ApplyDismissRsp implements IApplyDismissRsp {

        /**
         * Constructs a new ApplyDismissRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IApplyDismissRsp);

        /** ApplyDismissRsp err. */
        public err: string;

        /**
         * Creates a new ApplyDismissRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplyDismissRsp instance
         */
        public static create(properties?: gsbase.IApplyDismissRsp): gsbase.ApplyDismissRsp;

        /**
         * Encodes the specified ApplyDismissRsp message. Does not implicitly {@link gsbase.ApplyDismissRsp.verify|verify} messages.
         * @param message ApplyDismissRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IApplyDismissRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplyDismissRsp message, length delimited. Does not implicitly {@link gsbase.ApplyDismissRsp.verify|verify} messages.
         * @param message ApplyDismissRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IApplyDismissRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplyDismissRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ApplyDismissRsp;

        /**
         * Decodes an ApplyDismissRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ApplyDismissRsp;

        /**
         * Verifies an ApplyDismissRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplyDismissRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplyDismissRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.ApplyDismissRsp;

        /**
         * Creates a plain object from an ApplyDismissRsp message. Also converts values to other types if specified.
         * @param message ApplyDismissRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.ApplyDismissRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplyDismissRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplyDismissNot. */
    interface IApplyDismissNot {

        /** ApplyDismissNot openid */
        openid?: (string|null);

        /** ApplyDismissNot applyTime */
        applyTime?: (number|Long|null);

        /** ApplyDismissNot expire */
        expire?: (number|Long|null);

        /** ApplyDismissNot status */
        status?: (gsbase.ApplyDismissNot.IStatus[]|null);
    }

    /** Represents an ApplyDismissNot. */
    class ApplyDismissNot implements IApplyDismissNot {

        /**
         * Constructs a new ApplyDismissNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IApplyDismissNot);

        /** ApplyDismissNot openid. */
        public openid: string;

        /** ApplyDismissNot applyTime. */
        public applyTime: (number|Long);

        /** ApplyDismissNot expire. */
        public expire: (number|Long);

        /** ApplyDismissNot status. */
        public status: gsbase.ApplyDismissNot.IStatus[];

        /**
         * Creates a new ApplyDismissNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplyDismissNot instance
         */
        public static create(properties?: gsbase.IApplyDismissNot): gsbase.ApplyDismissNot;

        /**
         * Encodes the specified ApplyDismissNot message. Does not implicitly {@link gsbase.ApplyDismissNot.verify|verify} messages.
         * @param message ApplyDismissNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IApplyDismissNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplyDismissNot message, length delimited. Does not implicitly {@link gsbase.ApplyDismissNot.verify|verify} messages.
         * @param message ApplyDismissNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IApplyDismissNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplyDismissNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ApplyDismissNot;

        /**
         * Decodes an ApplyDismissNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ApplyDismissNot;

        /**
         * Verifies an ApplyDismissNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplyDismissNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplyDismissNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.ApplyDismissNot;

        /**
         * Creates a plain object from an ApplyDismissNot message. Also converts values to other types if specified.
         * @param message ApplyDismissNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.ApplyDismissNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplyDismissNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ApplyDismissNot {

        /** Properties of a Status. */
        interface IStatus {

            /** Status openid */
            openid?: (string|null);

            /** Status opTime */
            opTime?: (number|Long|null);

            /** Status reply */
            reply?: (boolean|null);
        }

        /** Represents a Status. */
        class Status implements IStatus {

            /**
             * Constructs a new Status.
             * @param [properties] Properties to set
             */
            constructor(properties?: gsbase.ApplyDismissNot.IStatus);

            /** Status openid. */
            public openid: string;

            /** Status opTime. */
            public opTime: (number|Long);

            /** Status reply. */
            public reply: boolean;

            /**
             * Creates a new Status instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Status instance
             */
            public static create(properties?: gsbase.ApplyDismissNot.IStatus): gsbase.ApplyDismissNot.Status;

            /**
             * Encodes the specified Status message. Does not implicitly {@link gsbase.ApplyDismissNot.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gsbase.ApplyDismissNot.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Status message, length delimited. Does not implicitly {@link gsbase.ApplyDismissNot.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gsbase.ApplyDismissNot.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Status message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ApplyDismissNot.Status;

            /**
             * Decodes a Status message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ApplyDismissNot.Status;

            /**
             * Verifies a Status message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Status message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Status
             */
            public static fromObject(object: { [k: string]: any }): gsbase.ApplyDismissNot.Status;

            /**
             * Creates a plain object from a Status message. Also converts values to other types if specified.
             * @param message Status
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gsbase.ApplyDismissNot.Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Status to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a ReplyDismissReq. */
    interface IReplyDismissReq {

        /** ReplyDismissReq reply */
        reply?: (boolean|null);
    }

    /** Represents a ReplyDismissReq. */
    class ReplyDismissReq implements IReplyDismissReq {

        /**
         * Constructs a new ReplyDismissReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IReplyDismissReq);

        /** ReplyDismissReq reply. */
        public reply: boolean;

        /**
         * Creates a new ReplyDismissReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReplyDismissReq instance
         */
        public static create(properties?: gsbase.IReplyDismissReq): gsbase.ReplyDismissReq;

        /**
         * Encodes the specified ReplyDismissReq message. Does not implicitly {@link gsbase.ReplyDismissReq.verify|verify} messages.
         * @param message ReplyDismissReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IReplyDismissReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReplyDismissReq message, length delimited. Does not implicitly {@link gsbase.ReplyDismissReq.verify|verify} messages.
         * @param message ReplyDismissReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IReplyDismissReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReplyDismissReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ReplyDismissReq;

        /**
         * Decodes a ReplyDismissReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ReplyDismissReq;

        /**
         * Verifies a ReplyDismissReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReplyDismissReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReplyDismissReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.ReplyDismissReq;

        /**
         * Creates a plain object from a ReplyDismissReq message. Also converts values to other types if specified.
         * @param message ReplyDismissReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.ReplyDismissReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReplyDismissReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReplyDismissRsp. */
    interface IReplyDismissRsp {

        /** ReplyDismissRsp err */
        err?: (string|null);
    }

    /** Represents a ReplyDismissRsp. */
    class ReplyDismissRsp implements IReplyDismissRsp {

        /**
         * Constructs a new ReplyDismissRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IReplyDismissRsp);

        /** ReplyDismissRsp err. */
        public err: string;

        /**
         * Creates a new ReplyDismissRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReplyDismissRsp instance
         */
        public static create(properties?: gsbase.IReplyDismissRsp): gsbase.ReplyDismissRsp;

        /**
         * Encodes the specified ReplyDismissRsp message. Does not implicitly {@link gsbase.ReplyDismissRsp.verify|verify} messages.
         * @param message ReplyDismissRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IReplyDismissRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReplyDismissRsp message, length delimited. Does not implicitly {@link gsbase.ReplyDismissRsp.verify|verify} messages.
         * @param message ReplyDismissRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IReplyDismissRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReplyDismissRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ReplyDismissRsp;

        /**
         * Decodes a ReplyDismissRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ReplyDismissRsp;

        /**
         * Verifies a ReplyDismissRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReplyDismissRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReplyDismissRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.ReplyDismissRsp;

        /**
         * Creates a plain object from a ReplyDismissRsp message. Also converts values to other types if specified.
         * @param message ReplyDismissRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.ReplyDismissRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReplyDismissRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReplyDismissNot. */
    interface IReplyDismissNot {

        /** ReplyDismissNot openid */
        openid?: (string|null);

        /** ReplyDismissNot reply */
        reply?: (boolean|null);

        /** ReplyDismissNot replyList */
        replyList?: (gsbase.ReplyDismissNot.IReplyInfo[]|null);
    }

    /** Represents a ReplyDismissNot. */
    class ReplyDismissNot implements IReplyDismissNot {

        /**
         * Constructs a new ReplyDismissNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IReplyDismissNot);

        /** ReplyDismissNot openid. */
        public openid: string;

        /** ReplyDismissNot reply. */
        public reply: boolean;

        /** ReplyDismissNot replyList. */
        public replyList: gsbase.ReplyDismissNot.IReplyInfo[];

        /**
         * Creates a new ReplyDismissNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReplyDismissNot instance
         */
        public static create(properties?: gsbase.IReplyDismissNot): gsbase.ReplyDismissNot;

        /**
         * Encodes the specified ReplyDismissNot message. Does not implicitly {@link gsbase.ReplyDismissNot.verify|verify} messages.
         * @param message ReplyDismissNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IReplyDismissNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReplyDismissNot message, length delimited. Does not implicitly {@link gsbase.ReplyDismissNot.verify|verify} messages.
         * @param message ReplyDismissNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IReplyDismissNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReplyDismissNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ReplyDismissNot;

        /**
         * Decodes a ReplyDismissNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ReplyDismissNot;

        /**
         * Verifies a ReplyDismissNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReplyDismissNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReplyDismissNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.ReplyDismissNot;

        /**
         * Creates a plain object from a ReplyDismissNot message. Also converts values to other types if specified.
         * @param message ReplyDismissNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.ReplyDismissNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReplyDismissNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ReplyDismissNot {

        /** Properties of a ReplyInfo. */
        interface IReplyInfo {

            /** ReplyInfo openid */
            openid?: (string|null);

            /** ReplyInfo reply */
            reply?: (boolean|null);
        }

        /** Represents a ReplyInfo. */
        class ReplyInfo implements IReplyInfo {

            /**
             * Constructs a new ReplyInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: gsbase.ReplyDismissNot.IReplyInfo);

            /** ReplyInfo openid. */
            public openid: string;

            /** ReplyInfo reply. */
            public reply: boolean;

            /**
             * Creates a new ReplyInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ReplyInfo instance
             */
            public static create(properties?: gsbase.ReplyDismissNot.IReplyInfo): gsbase.ReplyDismissNot.ReplyInfo;

            /**
             * Encodes the specified ReplyInfo message. Does not implicitly {@link gsbase.ReplyDismissNot.ReplyInfo.verify|verify} messages.
             * @param message ReplyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gsbase.ReplyDismissNot.IReplyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ReplyInfo message, length delimited. Does not implicitly {@link gsbase.ReplyDismissNot.ReplyInfo.verify|verify} messages.
             * @param message ReplyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gsbase.ReplyDismissNot.IReplyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ReplyInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ReplyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.ReplyDismissNot.ReplyInfo;

            /**
             * Decodes a ReplyInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ReplyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.ReplyDismissNot.ReplyInfo;

            /**
             * Verifies a ReplyInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ReplyInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ReplyInfo
             */
            public static fromObject(object: { [k: string]: any }): gsbase.ReplyDismissNot.ReplyInfo;

            /**
             * Creates a plain object from a ReplyInfo message. Also converts values to other types if specified.
             * @param message ReplyInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gsbase.ReplyDismissNot.ReplyInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ReplyInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a KickOutReq. */
    interface IKickOutReq {

        /** KickOutReq openid */
        openid?: (string|null);
    }

    /** Represents a KickOutReq. */
    class KickOutReq implements IKickOutReq {

        /**
         * Constructs a new KickOutReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IKickOutReq);

        /** KickOutReq openid. */
        public openid: string;

        /**
         * Creates a new KickOutReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KickOutReq instance
         */
        public static create(properties?: gsbase.IKickOutReq): gsbase.KickOutReq;

        /**
         * Encodes the specified KickOutReq message. Does not implicitly {@link gsbase.KickOutReq.verify|verify} messages.
         * @param message KickOutReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IKickOutReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KickOutReq message, length delimited. Does not implicitly {@link gsbase.KickOutReq.verify|verify} messages.
         * @param message KickOutReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IKickOutReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KickOutReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KickOutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.KickOutReq;

        /**
         * Decodes a KickOutReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KickOutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.KickOutReq;

        /**
         * Verifies a KickOutReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KickOutReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KickOutReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.KickOutReq;

        /**
         * Creates a plain object from a KickOutReq message. Also converts values to other types if specified.
         * @param message KickOutReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.KickOutReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KickOutReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a KickOutRsp. */
    interface IKickOutRsp {

        /** KickOutRsp err */
        err?: (string|null);
    }

    /** Represents a KickOutRsp. */
    class KickOutRsp implements IKickOutRsp {

        /**
         * Constructs a new KickOutRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IKickOutRsp);

        /** KickOutRsp err. */
        public err: string;

        /**
         * Creates a new KickOutRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KickOutRsp instance
         */
        public static create(properties?: gsbase.IKickOutRsp): gsbase.KickOutRsp;

        /**
         * Encodes the specified KickOutRsp message. Does not implicitly {@link gsbase.KickOutRsp.verify|verify} messages.
         * @param message KickOutRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IKickOutRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KickOutRsp message, length delimited. Does not implicitly {@link gsbase.KickOutRsp.verify|verify} messages.
         * @param message KickOutRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IKickOutRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KickOutRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KickOutRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.KickOutRsp;

        /**
         * Decodes a KickOutRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KickOutRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.KickOutRsp;

        /**
         * Verifies a KickOutRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KickOutRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KickOutRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.KickOutRsp;

        /**
         * Creates a plain object from a KickOutRsp message. Also converts values to other types if specified.
         * @param message KickOutRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.KickOutRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KickOutRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Player. */
    interface IPlayer {

        /** Player openid */
        openid?: (string|null);

        /** Player metadata */
        metadata?: ({ [k: string]: string }|null);

        /** Player nickname */
        nickname?: (string|null);

        /** Player type */
        type?: (number|null);
    }

    /** Represents a Player. */
    class Player implements IPlayer {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IPlayer);

        /** Player openid. */
        public openid: string;

        /** Player metadata. */
        public metadata: { [k: string]: string };

        /** Player nickname. */
        public nickname: string;

        /** Player type. */
        public type: number;

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        public static create(properties?: gsbase.IPlayer): gsbase.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link gsbase.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link gsbase.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.Player;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.Player;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Player
         */
        public static fromObject(object: { [k: string]: any }): gsbase.Player;

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @param message Player
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Player to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomInfo. */
    interface IRoomInfo {

        /** RoomInfo roomId */
        roomId?: (string|null);

        /** RoomInfo matchCode */
        matchCode?: (string|null);

        /** RoomInfo metadata */
        metadata?: (string|null);

        /** RoomInfo players */
        players?: (gsbase.IPlayer[]|null);

        /** RoomInfo owner */
        owner?: (string|null);

        /** RoomInfo createAt */
        createAt?: (number|Long|null);

        /** RoomInfo minPlayerNum */
        minPlayerNum?: (number|null);

        /** RoomInfo maxPlayerNum */
        maxPlayerNum?: (number|null);

        /** RoomInfo gameGid */
        gameGid?: (string|null);

        /** RoomInfo serverId */
        serverId?: (string|null);
    }

    /** Represents a RoomInfo. */
    class RoomInfo implements IRoomInfo {

        /**
         * Constructs a new RoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IRoomInfo);

        /** RoomInfo roomId. */
        public roomId: string;

        /** RoomInfo matchCode. */
        public matchCode: string;

        /** RoomInfo metadata. */
        public metadata: string;

        /** RoomInfo players. */
        public players: gsbase.IPlayer[];

        /** RoomInfo owner. */
        public owner: string;

        /** RoomInfo createAt. */
        public createAt: (number|Long);

        /** RoomInfo minPlayerNum. */
        public minPlayerNum: number;

        /** RoomInfo maxPlayerNum. */
        public maxPlayerNum: number;

        /** RoomInfo gameGid. */
        public gameGid: string;

        /** RoomInfo serverId. */
        public serverId: string;

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomInfo instance
         */
        public static create(properties?: gsbase.IRoomInfo): gsbase.RoomInfo;

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link gsbase.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link gsbase.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.RoomInfo;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.RoomInfo;

        /**
         * Verifies a RoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomInfo
         */
        public static fromObject(object: { [k: string]: any }): gsbase.RoomInfo;

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @param message RoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.RoomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GsbPingReq. */
    interface IGsbPingReq {

        /** GsbPingReq reqTime */
        reqTime?: (number|Long|null);
    }

    /** Represents a GsbPingReq. */
    class GsbPingReq implements IGsbPingReq {

        /**
         * Constructs a new GsbPingReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IGsbPingReq);

        /** GsbPingReq reqTime. */
        public reqTime: (number|Long);

        /**
         * Creates a new GsbPingReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GsbPingReq instance
         */
        public static create(properties?: gsbase.IGsbPingReq): gsbase.GsbPingReq;

        /**
         * Encodes the specified GsbPingReq message. Does not implicitly {@link gsbase.GsbPingReq.verify|verify} messages.
         * @param message GsbPingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IGsbPingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GsbPingReq message, length delimited. Does not implicitly {@link gsbase.GsbPingReq.verify|verify} messages.
         * @param message GsbPingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IGsbPingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GsbPingReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GsbPingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.GsbPingReq;

        /**
         * Decodes a GsbPingReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GsbPingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.GsbPingReq;

        /**
         * Verifies a GsbPingReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GsbPingReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GsbPingReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.GsbPingReq;

        /**
         * Creates a plain object from a GsbPingReq message. Also converts values to other types if specified.
         * @param message GsbPingReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.GsbPingReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GsbPingReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GsbPingRsp. */
    interface IGsbPingRsp {

        /** GsbPingRsp reqTime */
        reqTime?: (number|Long|null);

        /** GsbPingRsp ackTime */
        ackTime?: (number|Long|null);
    }

    /** Represents a GsbPingRsp. */
    class GsbPingRsp implements IGsbPingRsp {

        /**
         * Constructs a new GsbPingRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IGsbPingRsp);

        /** GsbPingRsp reqTime. */
        public reqTime: (number|Long);

        /** GsbPingRsp ackTime. */
        public ackTime: (number|Long);

        /**
         * Creates a new GsbPingRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GsbPingRsp instance
         */
        public static create(properties?: gsbase.IGsbPingRsp): gsbase.GsbPingRsp;

        /**
         * Encodes the specified GsbPingRsp message. Does not implicitly {@link gsbase.GsbPingRsp.verify|verify} messages.
         * @param message GsbPingRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IGsbPingRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GsbPingRsp message, length delimited. Does not implicitly {@link gsbase.GsbPingRsp.verify|verify} messages.
         * @param message GsbPingRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IGsbPingRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GsbPingRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GsbPingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.GsbPingRsp;

        /**
         * Decodes a GsbPingRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GsbPingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.GsbPingRsp;

        /**
         * Verifies a GsbPingRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GsbPingRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GsbPingRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.GsbPingRsp;

        /**
         * Creates a plain object from a GsbPingRsp message. Also converts values to other types if specified.
         * @param message GsbPingRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.GsbPingRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GsbPingRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoundStartNot. */
    interface IRoundStartNot {

        /** RoundStartNot roundId */
        roundId?: (string|null);

        /** RoundStartNot curRound */
        curRound?: (number|null);

        /** RoundStartNot startTime */
        startTime?: (number|Long|null);
    }

    /** Represents a RoundStartNot. */
    class RoundStartNot implements IRoundStartNot {

        /**
         * Constructs a new RoundStartNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IRoundStartNot);

        /** RoundStartNot roundId. */
        public roundId: string;

        /** RoundStartNot curRound. */
        public curRound: number;

        /** RoundStartNot startTime. */
        public startTime: (number|Long);

        /**
         * Creates a new RoundStartNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoundStartNot instance
         */
        public static create(properties?: gsbase.IRoundStartNot): gsbase.RoundStartNot;

        /**
         * Encodes the specified RoundStartNot message. Does not implicitly {@link gsbase.RoundStartNot.verify|verify} messages.
         * @param message RoundStartNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IRoundStartNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoundStartNot message, length delimited. Does not implicitly {@link gsbase.RoundStartNot.verify|verify} messages.
         * @param message RoundStartNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IRoundStartNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoundStartNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoundStartNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.RoundStartNot;

        /**
         * Decodes a RoundStartNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoundStartNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.RoundStartNot;

        /**
         * Verifies a RoundStartNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoundStartNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoundStartNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.RoundStartNot;

        /**
         * Creates a plain object from a RoundStartNot message. Also converts values to other types if specified.
         * @param message RoundStartNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.RoundStartNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoundStartNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoundEndNot. */
    interface IRoundEndNot {

        /** RoundEndNot roundId */
        roundId?: (string|null);

        /** RoundEndNot curRound */
        curRound?: (number|null);

        /** RoundEndNot endTime */
        endTime?: (number|Long|null);
    }

    /** Represents a RoundEndNot. */
    class RoundEndNot implements IRoundEndNot {

        /**
         * Constructs a new RoundEndNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IRoundEndNot);

        /** RoundEndNot roundId. */
        public roundId: string;

        /** RoundEndNot curRound. */
        public curRound: number;

        /** RoundEndNot endTime. */
        public endTime: (number|Long);

        /**
         * Creates a new RoundEndNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoundEndNot instance
         */
        public static create(properties?: gsbase.IRoundEndNot): gsbase.RoundEndNot;

        /**
         * Encodes the specified RoundEndNot message. Does not implicitly {@link gsbase.RoundEndNot.verify|verify} messages.
         * @param message RoundEndNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IRoundEndNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoundEndNot message, length delimited. Does not implicitly {@link gsbase.RoundEndNot.verify|verify} messages.
         * @param message RoundEndNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IRoundEndNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoundEndNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoundEndNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.RoundEndNot;

        /**
         * Decodes a RoundEndNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoundEndNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.RoundEndNot;

        /**
         * Verifies a RoundEndNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoundEndNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoundEndNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.RoundEndNot;

        /**
         * Creates a plain object from a RoundEndNot message. Also converts values to other types if specified.
         * @param message RoundEndNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.RoundEndNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoundEndNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterRoomNot. */
    interface IEnterRoomNot {

        /** EnterRoomNot roomId */
        roomId?: (string|null);

        /** EnterRoomNot uid */
        uid?: (string|null);

        /** EnterRoomNot nickname */
        nickname?: (string|null);

        /** EnterRoomNot money */
        money?: (number|Long|null);

        /** EnterRoomNot type */
        type?: (number|null);

        /** EnterRoomNot chairId */
        chairId?: (number|null);
    }

    /** Represents an EnterRoomNot. */
    class EnterRoomNot implements IEnterRoomNot {

        /**
         * Constructs a new EnterRoomNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IEnterRoomNot);

        /** EnterRoomNot roomId. */
        public roomId: string;

        /** EnterRoomNot uid. */
        public uid: string;

        /** EnterRoomNot nickname. */
        public nickname: string;

        /** EnterRoomNot money. */
        public money: (number|Long);

        /** EnterRoomNot type. */
        public type: number;

        /** EnterRoomNot chairId. */
        public chairId: number;

        /**
         * Creates a new EnterRoomNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterRoomNot instance
         */
        public static create(properties?: gsbase.IEnterRoomNot): gsbase.EnterRoomNot;

        /**
         * Encodes the specified EnterRoomNot message. Does not implicitly {@link gsbase.EnterRoomNot.verify|verify} messages.
         * @param message EnterRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IEnterRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterRoomNot message, length delimited. Does not implicitly {@link gsbase.EnterRoomNot.verify|verify} messages.
         * @param message EnterRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IEnterRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterRoomNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.EnterRoomNot;

        /**
         * Decodes an EnterRoomNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.EnterRoomNot;

        /**
         * Verifies an EnterRoomNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterRoomNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterRoomNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.EnterRoomNot;

        /**
         * Creates a plain object from an EnterRoomNot message. Also converts values to other types if specified.
         * @param message EnterRoomNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.EnterRoomNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterRoomNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LeaveRoomNot. */
    interface ILeaveRoomNot {

        /** LeaveRoomNot plyId */
        plyId?: (string|null);

        /** LeaveRoomNot reason */
        reason?: (gsbase.LeaveRoomNot.Type|null);
    }

    /** Represents a LeaveRoomNot. */
    class LeaveRoomNot implements ILeaveRoomNot {

        /**
         * Constructs a new LeaveRoomNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.ILeaveRoomNot);

        /** LeaveRoomNot plyId. */
        public plyId: string;

        /** LeaveRoomNot reason. */
        public reason: gsbase.LeaveRoomNot.Type;

        /**
         * Creates a new LeaveRoomNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoomNot instance
         */
        public static create(properties?: gsbase.ILeaveRoomNot): gsbase.LeaveRoomNot;

        /**
         * Encodes the specified LeaveRoomNot message. Does not implicitly {@link gsbase.LeaveRoomNot.verify|verify} messages.
         * @param message LeaveRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.ILeaveRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoomNot message, length delimited. Does not implicitly {@link gsbase.LeaveRoomNot.verify|verify} messages.
         * @param message LeaveRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.ILeaveRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoomNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.LeaveRoomNot;

        /**
         * Decodes a LeaveRoomNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.LeaveRoomNot;

        /**
         * Verifies a LeaveRoomNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoomNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoomNot
         */
        public static fromObject(object: { [k: string]: any }): gsbase.LeaveRoomNot;

        /**
         * Creates a plain object from a LeaveRoomNot message. Also converts values to other types if specified.
         * @param message LeaveRoomNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.LeaveRoomNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoomNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace LeaveRoomNot {

        /** Type enum. */
        enum Type {
            Leave = 0,
            Kick = 1
        }
    }

    /** Properties of a StartGameReq. */
    interface IStartGameReq {
    }

    /** Represents a StartGameReq. */
    class StartGameReq implements IStartGameReq {

        /**
         * Constructs a new StartGameReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IStartGameReq);

        /**
         * Creates a new StartGameReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartGameReq instance
         */
        public static create(properties?: gsbase.IStartGameReq): gsbase.StartGameReq;

        /**
         * Encodes the specified StartGameReq message. Does not implicitly {@link gsbase.StartGameReq.verify|verify} messages.
         * @param message StartGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IStartGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartGameReq message, length delimited. Does not implicitly {@link gsbase.StartGameReq.verify|verify} messages.
         * @param message StartGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IStartGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartGameReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.StartGameReq;

        /**
         * Decodes a StartGameReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.StartGameReq;

        /**
         * Verifies a StartGameReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartGameReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartGameReq
         */
        public static fromObject(object: { [k: string]: any }): gsbase.StartGameReq;

        /**
         * Creates a plain object from a StartGameReq message. Also converts values to other types if specified.
         * @param message StartGameReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.StartGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartGameReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartGameRsp. */
    interface IStartGameRsp {

        /** StartGameRsp err */
        err?: (string|null);
    }

    /** Represents a StartGameRsp. */
    class StartGameRsp implements IStartGameRsp {

        /**
         * Constructs a new StartGameRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsbase.IStartGameRsp);

        /** StartGameRsp err. */
        public err: string;

        /**
         * Creates a new StartGameRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartGameRsp instance
         */
        public static create(properties?: gsbase.IStartGameRsp): gsbase.StartGameRsp;

        /**
         * Encodes the specified StartGameRsp message. Does not implicitly {@link gsbase.StartGameRsp.verify|verify} messages.
         * @param message StartGameRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsbase.IStartGameRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartGameRsp message, length delimited. Does not implicitly {@link gsbase.StartGameRsp.verify|verify} messages.
         * @param message StartGameRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsbase.IStartGameRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartGameRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsbase.StartGameRsp;

        /**
         * Decodes a StartGameRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsbase.StartGameRsp;

        /**
         * Verifies a StartGameRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartGameRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartGameRsp
         */
        public static fromObject(object: { [k: string]: any }): gsbase.StartGameRsp;

        /**
         * Creates a plain object from a StartGameRsp message. Also converts values to other types if specified.
         * @param message StartGameRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsbase.StartGameRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartGameRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
