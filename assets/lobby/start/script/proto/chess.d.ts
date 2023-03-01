import * as $protobuf from "protobufjs";
/** Namespace chess. */
export namespace chess {

    /** Properties of a ReadyReq. */
    interface IReadyReq {

        /** ReadyReq isReady */
        isReady?: (boolean|null);
    }

    /** Represents a ReadyReq. */
    class ReadyReq implements IReadyReq {

        /**
         * Constructs a new ReadyReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: chess.IReadyReq);

        /** ReadyReq isReady. */
        public isReady: boolean;

        /**
         * Creates a new ReadyReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadyReq instance
         */
        public static create(properties?: chess.IReadyReq): chess.ReadyReq;

        /**
         * Encodes the specified ReadyReq message. Does not implicitly {@link chess.ReadyReq.verify|verify} messages.
         * @param message ReadyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chess.IReadyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadyReq message, length delimited. Does not implicitly {@link chess.ReadyReq.verify|verify} messages.
         * @param message ReadyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chess.IReadyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadyReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chess.ReadyReq;

        /**
         * Decodes a ReadyReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chess.ReadyReq;

        /**
         * Verifies a ReadyReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReadyReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReadyReq
         */
        public static fromObject(object: { [k: string]: any }): chess.ReadyReq;

        /**
         * Creates a plain object from a ReadyReq message. Also converts values to other types if specified.
         * @param message ReadyReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chess.ReadyReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReadyReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReadyRsp. */
    interface IReadyRsp {

        /** ReadyRsp err */
        err?: (string|null);
    }

    /** Represents a ReadyRsp. */
    class ReadyRsp implements IReadyRsp {

        /**
         * Constructs a new ReadyRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: chess.IReadyRsp);

        /** ReadyRsp err. */
        public err: string;

        /**
         * Creates a new ReadyRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadyRsp instance
         */
        public static create(properties?: chess.IReadyRsp): chess.ReadyRsp;

        /**
         * Encodes the specified ReadyRsp message. Does not implicitly {@link chess.ReadyRsp.verify|verify} messages.
         * @param message ReadyRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chess.IReadyRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadyRsp message, length delimited. Does not implicitly {@link chess.ReadyRsp.verify|verify} messages.
         * @param message ReadyRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chess.IReadyRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadyRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadyRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chess.ReadyRsp;

        /**
         * Decodes a ReadyRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadyRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chess.ReadyRsp;

        /**
         * Verifies a ReadyRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReadyRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReadyRsp
         */
        public static fromObject(object: { [k: string]: any }): chess.ReadyRsp;

        /**
         * Creates a plain object from a ReadyRsp message. Also converts values to other types if specified.
         * @param message ReadyRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chess.ReadyRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReadyRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReadyNot. */
    interface IReadyNot {

        /** ReadyNot uid */
        uid?: (string|null);

        /** ReadyNot isReady */
        isReady?: (boolean|null);
    }

    /** Represents a ReadyNot. */
    class ReadyNot implements IReadyNot {

        /**
         * Constructs a new ReadyNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: chess.IReadyNot);

        /** ReadyNot uid. */
        public uid: string;

        /** ReadyNot isReady. */
        public isReady: boolean;

        /**
         * Creates a new ReadyNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadyNot instance
         */
        public static create(properties?: chess.IReadyNot): chess.ReadyNot;

        /**
         * Encodes the specified ReadyNot message. Does not implicitly {@link chess.ReadyNot.verify|verify} messages.
         * @param message ReadyNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chess.IReadyNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadyNot message, length delimited. Does not implicitly {@link chess.ReadyNot.verify|verify} messages.
         * @param message ReadyNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chess.IReadyNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadyNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadyNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chess.ReadyNot;

        /**
         * Decodes a ReadyNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadyNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chess.ReadyNot;

        /**
         * Verifies a ReadyNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReadyNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReadyNot
         */
        public static fromObject(object: { [k: string]: any }): chess.ReadyNot;

        /**
         * Creates a plain object from a ReadyNot message. Also converts values to other types if specified.
         * @param message ReadyNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chess.ReadyNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReadyNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
