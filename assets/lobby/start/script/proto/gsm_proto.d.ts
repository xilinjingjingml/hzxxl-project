import * as $protobuf from "protobufjs";
/** Namespace gsm. */
export namespace gsm {

    /** Represents a Rooms */
    class Rooms extends $protobuf.rpc.Service {

        /**
         * Constructs a new Rooms service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new Rooms service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Rooms;

        /**
         * Calls StartMatching.
         * @param request StartMatchingReq message or plain object
         * @param callback Node-style callback called with the error, if any, and StartMatchingRsp
         */
        public startMatching(request: gsm.IStartMatchingReq, callback: gsm.Rooms.StartMatchingCallback): void;

        /**
         * Calls StartMatching.
         * @param request StartMatchingReq message or plain object
         * @returns Promise
         */
        public startMatching(request: gsm.IStartMatchingReq): Promise<gsm.StartMatchingRsp>;

        /**
         * Calls CancelMatching.
         * @param request CancelMatchingReq message or plain object
         * @param callback Node-style callback called with the error, if any, and CancelMatchingRsp
         */
        public cancelMatching(request: gsm.ICancelMatchingReq, callback: gsm.Rooms.CancelMatchingCallback): void;

        /**
         * Calls CancelMatching.
         * @param request CancelMatchingReq message or plain object
         * @returns Promise
         */
        public cancelMatching(request: gsm.ICancelMatchingReq): Promise<gsm.CancelMatchingRsp>;

        /**
         * Calls CreateRoom.
         * @param request CreateRoomReq message or plain object
         * @param callback Node-style callback called with the error, if any, and CreateRoomRsp
         */
        public createRoom(request: gsm.ICreateRoomReq, callback: gsm.Rooms.CreateRoomCallback): void;

        /**
         * Calls CreateRoom.
         * @param request CreateRoomReq message or plain object
         * @returns Promise
         */
        public createRoom(request: gsm.ICreateRoomReq): Promise<gsm.CreateRoomRsp>;

        /**
         * Calls DismissRoom.
         * @param request DismissRoomReq message or plain object
         * @param callback Node-style callback called with the error, if any, and DismissRoomRsp
         */
        public dismissRoom(request: gsm.IDismissRoomReq, callback: gsm.Rooms.DismissRoomCallback): void;

        /**
         * Calls DismissRoom.
         * @param request DismissRoomReq message or plain object
         * @returns Promise
         */
        public dismissRoom(request: gsm.IDismissRoomReq): Promise<gsm.DismissRoomRsp>;

        /**
         * Calls GetRoomList.
         * @param request GetRoomListReq message or plain object
         * @param callback Node-style callback called with the error, if any, and GetRoomListRsp
         */
        public getRoomList(request: gsm.IGetRoomListReq, callback: gsm.Rooms.GetRoomListCallback): void;

        /**
         * Calls GetRoomList.
         * @param request GetRoomListReq message or plain object
         * @returns Promise
         */
        public getRoomList(request: gsm.IGetRoomListReq): Promise<gsm.GetRoomListRsp>;

        /**
         * Calls GetMyRoom.
         * @param request GetMyRoomReq message or plain object
         * @param callback Node-style callback called with the error, if any, and GetMyRoomRsp
         */
        public getMyRoom(request: gsm.IGetMyRoomReq, callback: gsm.Rooms.GetMyRoomCallback): void;

        /**
         * Calls GetMyRoom.
         * @param request GetMyRoomReq message or plain object
         * @returns Promise
         */
        public getMyRoom(request: gsm.IGetMyRoomReq): Promise<gsm.GetMyRoomRsp>;

        /**
         * Calls GetRoomInfo.
         * @param request GetRoomInfoReq message or plain object
         * @param callback Node-style callback called with the error, if any, and GetRoomInfoRsp
         */
        public getRoomInfo(request: gsm.IGetRoomInfoReq, callback: gsm.Rooms.GetRoomInfoCallback): void;

        /**
         * Calls GetRoomInfo.
         * @param request GetRoomInfoReq message or plain object
         * @returns Promise
         */
        public getRoomInfo(request: gsm.IGetRoomInfoReq): Promise<gsm.GetRoomInfoRsp>;

        /**
         * Calls CheckRoomExists.
         * @param request CheckRoomExistsReq message or plain object
         * @param callback Node-style callback called with the error, if any, and CheckRoomExistsRsp
         */
        public checkRoomExists(request: gsm.ICheckRoomExistsReq, callback: gsm.Rooms.CheckRoomExistsCallback): void;

        /**
         * Calls CheckRoomExists.
         * @param request CheckRoomExistsReq message or plain object
         * @returns Promise
         */
        public checkRoomExists(request: gsm.ICheckRoomExistsReq): Promise<gsm.CheckRoomExistsRsp>;
    }

    namespace Rooms {

        /**
         * Callback as used by {@link gsm.Rooms#startMatching}.
         * @param error Error, if any
         * @param [response] StartMatchingRsp
         */
        type StartMatchingCallback = (error: (Error|null), response?: gsm.StartMatchingRsp) => void;

        /**
         * Callback as used by {@link gsm.Rooms#cancelMatching}.
         * @param error Error, if any
         * @param [response] CancelMatchingRsp
         */
        type CancelMatchingCallback = (error: (Error|null), response?: gsm.CancelMatchingRsp) => void;

        /**
         * Callback as used by {@link gsm.Rooms#createRoom}.
         * @param error Error, if any
         * @param [response] CreateRoomRsp
         */
        type CreateRoomCallback = (error: (Error|null), response?: gsm.CreateRoomRsp) => void;

        /**
         * Callback as used by {@link gsm.Rooms#dismissRoom}.
         * @param error Error, if any
         * @param [response] DismissRoomRsp
         */
        type DismissRoomCallback = (error: (Error|null), response?: gsm.DismissRoomRsp) => void;

        /**
         * Callback as used by {@link gsm.Rooms#getRoomList}.
         * @param error Error, if any
         * @param [response] GetRoomListRsp
         */
        type GetRoomListCallback = (error: (Error|null), response?: gsm.GetRoomListRsp) => void;

        /**
         * Callback as used by {@link gsm.Rooms#getMyRoom}.
         * @param error Error, if any
         * @param [response] GetMyRoomRsp
         */
        type GetMyRoomCallback = (error: (Error|null), response?: gsm.GetMyRoomRsp) => void;

        /**
         * Callback as used by {@link gsm.Rooms#getRoomInfo}.
         * @param error Error, if any
         * @param [response] GetRoomInfoRsp
         */
        type GetRoomInfoCallback = (error: (Error|null), response?: gsm.GetRoomInfoRsp) => void;

        /**
         * Callback as used by {@link gsm.Rooms#checkRoomExists}.
         * @param error Error, if any
         * @param [response] CheckRoomExistsRsp
         */
        type CheckRoomExistsCallback = (error: (Error|null), response?: gsm.CheckRoomExistsRsp) => void;
    }

    /** Represents a GsmSdk */
    class GsmSdk extends $protobuf.rpc.Service {

        /**
         * Constructs a new GsmSdk service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new GsmSdk service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): GsmSdk;

        /**
         * Calls TerminateGameRoom.
         * @param request DismissRoomNot message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public terminateGameRoom(request: gsm.IDismissRoomNot, callback: gsm.GsmSdk.TerminateGameRoomCallback): void;

        /**
         * Calls TerminateGameRoom.
         * @param request DismissRoomNot message or plain object
         * @returns Promise
         */
        public terminateGameRoom(request: gsm.IDismissRoomNot): Promise<gsm.Empty>;

        /**
         * Calls AcceptPlayer.
         * @param request AcceptPlayerNot message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public acceptPlayer(request: gsm.IAcceptPlayerNot, callback: gsm.GsmSdk.AcceptPlayerCallback): void;

        /**
         * Calls AcceptPlayer.
         * @param request AcceptPlayerNot message or plain object
         * @returns Promise
         */
        public acceptPlayer(request: gsm.IAcceptPlayerNot): Promise<gsm.Empty>;

        /**
         * Calls RemovePlayer.
         * @param request RemovePlayerNot message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public removePlayer(request: gsm.IRemovePlayerNot, callback: gsm.GsmSdk.RemovePlayerCallback): void;

        /**
         * Calls RemovePlayer.
         * @param request RemovePlayerNot message or plain object
         * @returns Promise
         */
        public removePlayer(request: gsm.IRemovePlayerNot): Promise<gsm.Empty>;

        /**
         * Calls CheckCanJoin.
         * @param request CheckCanJoinReq message or plain object
         * @param callback Node-style callback called with the error, if any, and CheckCanJoinRsp
         */
        public checkCanJoin(request: gsm.ICheckCanJoinReq, callback: gsm.GsmSdk.CheckCanJoinCallback): void;

        /**
         * Calls CheckCanJoin.
         * @param request CheckCanJoinReq message or plain object
         * @returns Promise
         */
        public checkCanJoin(request: gsm.ICheckCanJoinReq): Promise<gsm.CheckCanJoinRsp>;
    }

    namespace GsmSdk {

        /**
         * Callback as used by {@link gsm.GsmSdk#terminateGameRoom}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type TerminateGameRoomCallback = (error: (Error|null), response?: gsm.Empty) => void;

        /**
         * Callback as used by {@link gsm.GsmSdk#acceptPlayer}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type AcceptPlayerCallback = (error: (Error|null), response?: gsm.Empty) => void;

        /**
         * Callback as used by {@link gsm.GsmSdk#removePlayer}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type RemovePlayerCallback = (error: (Error|null), response?: gsm.Empty) => void;

        /**
         * Callback as used by {@link gsm.GsmSdk#checkCanJoin}.
         * @param error Error, if any
         * @param [response] CheckCanJoinRsp
         */
        type CheckCanJoinCallback = (error: (Error|null), response?: gsm.CheckCanJoinRsp) => void;
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
        constructor(properties?: gsm.IEmpty);

        /**
         * Creates a new Empty instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Empty instance
         */
        public static create(properties?: gsm.IEmpty): gsm.Empty;

        /**
         * Encodes the specified Empty message. Does not implicitly {@link gsm.Empty.verify|verify} messages.
         * @param message Empty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Empty message, length delimited. Does not implicitly {@link gsm.Empty.verify|verify} messages.
         * @param message Empty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Empty message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.Empty;

        /**
         * Decodes an Empty message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.Empty;

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
        public static fromObject(object: { [k: string]: any }): gsm.Empty;

        /**
         * Creates a plain object from an Empty message. Also converts values to other types if specified.
         * @param message Empty
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Empty to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateRoomReq. */
    interface ICreateRoomReq {

        /** CreateRoomReq gameId */
        gameId?: (string|null);

        /** CreateRoomReq properties */
        properties?: (string|null);

        /** CreateRoomReq roomId */
        roomId?: (string|null);
    }

    /** Represents a CreateRoomReq. */
    class CreateRoomReq implements ICreateRoomReq {

        /**
         * Constructs a new CreateRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICreateRoomReq);

        /** CreateRoomReq gameId. */
        public gameId: string;

        /** CreateRoomReq properties. */
        public properties: string;

        /** CreateRoomReq roomId. */
        public roomId: string;

        /**
         * Creates a new CreateRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateRoomReq instance
         */
        public static create(properties?: gsm.ICreateRoomReq): gsm.CreateRoomReq;

        /**
         * Encodes the specified CreateRoomReq message. Does not implicitly {@link gsm.CreateRoomReq.verify|verify} messages.
         * @param message CreateRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICreateRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateRoomReq message, length delimited. Does not implicitly {@link gsm.CreateRoomReq.verify|verify} messages.
         * @param message CreateRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICreateRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CreateRoomReq;

        /**
         * Decodes a CreateRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CreateRoomReq;

        /**
         * Verifies a CreateRoomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateRoomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateRoomReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.CreateRoomReq;

        /**
         * Creates a plain object from a CreateRoomReq message. Also converts values to other types if specified.
         * @param message CreateRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CreateRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateRoomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerInfo. */
    interface IPlayerInfo {

        /** PlayerInfo openid */
        openid?: (string|null);

        /** PlayerInfo status */
        status?: (gsm.PlayerInfo.Status|null);

        /** PlayerInfo joinTime */
        joinTime?: (number|Long|null);

        /** PlayerInfo leaveTime */
        leaveTime?: (number|Long|null);
    }

    /** Represents a PlayerInfo. */
    class PlayerInfo implements IPlayerInfo {

        /**
         * Constructs a new PlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IPlayerInfo);

        /** PlayerInfo openid. */
        public openid: string;

        /** PlayerInfo status. */
        public status: gsm.PlayerInfo.Status;

        /** PlayerInfo joinTime. */
        public joinTime: (number|Long);

        /** PlayerInfo leaveTime. */
        public leaveTime: (number|Long);

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfo instance
         */
        public static create(properties?: gsm.IPlayerInfo): gsm.PlayerInfo;

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link gsm.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link gsm.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.PlayerInfo;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.PlayerInfo;

        /**
         * Verifies a PlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): gsm.PlayerInfo;

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @param message PlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace PlayerInfo {

        /** Status enum. */
        enum Status {
            DEFAULT = 0,
            JOINED = 1,
            LEAVED = 2
        }
    }

    /** Properties of a RoomInfo. */
    interface IRoomInfo {

        /** RoomInfo roomId */
        roomId?: (string|null);

        /** RoomInfo serverId */
        serverId?: (string|null);

        /** RoomInfo gameGid */
        gameGid?: (string|null);

        /** RoomInfo matchCode */
        matchCode?: (string|null);

        /** RoomInfo maxPlayerNum */
        maxPlayerNum?: (number|null);

        /** RoomInfo owner */
        owner?: (string|null);

        /** RoomInfo properties */
        properties?: (string|null);

        /** RoomInfo players */
        players?: ({ [k: string]: gsm.IPlayerInfo }|null);

        /** RoomInfo createReason */
        createReason?: (gsm.RoomInfo.CreateReason|null);

        /** RoomInfo createTime */
        createTime?: (number|Long|null);
    }

    /** Represents a RoomInfo. */
    class RoomInfo implements IRoomInfo {

        /**
         * Constructs a new RoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IRoomInfo);

        /** RoomInfo roomId. */
        public roomId: string;

        /** RoomInfo serverId. */
        public serverId: string;

        /** RoomInfo gameGid. */
        public gameGid: string;

        /** RoomInfo matchCode. */
        public matchCode: string;

        /** RoomInfo maxPlayerNum. */
        public maxPlayerNum: number;

        /** RoomInfo owner. */
        public owner: string;

        /** RoomInfo properties. */
        public properties: string;

        /** RoomInfo players. */
        public players: { [k: string]: gsm.IPlayerInfo };

        /** RoomInfo createReason. */
        public createReason: gsm.RoomInfo.CreateReason;

        /** RoomInfo createTime. */
        public createTime: (number|Long);

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomInfo instance
         */
        public static create(properties?: gsm.IRoomInfo): gsm.RoomInfo;

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link gsm.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link gsm.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.RoomInfo;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.RoomInfo;

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
        public static fromObject(object: { [k: string]: any }): gsm.RoomInfo;

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @param message RoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.RoomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace RoomInfo {

        /** CreateReason enum. */
        enum CreateReason {
            CreateReasonDefault = 0,
            CreateReasonPlayer = 1,
            CreateReasonMatch = 2
        }
    }

    /** Properties of a CreateRoomRsp. */
    interface ICreateRoomRsp {

        /** CreateRoomRsp err */
        err?: (string|null);

        /** CreateRoomRsp room */
        room?: (gsm.IRoomInfo|null);
    }

    /** Represents a CreateRoomRsp. */
    class CreateRoomRsp implements ICreateRoomRsp {

        /**
         * Constructs a new CreateRoomRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICreateRoomRsp);

        /** CreateRoomRsp err. */
        public err: string;

        /** CreateRoomRsp room. */
        public room?: (gsm.IRoomInfo|null);

        /**
         * Creates a new CreateRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateRoomRsp instance
         */
        public static create(properties?: gsm.ICreateRoomRsp): gsm.CreateRoomRsp;

        /**
         * Encodes the specified CreateRoomRsp message. Does not implicitly {@link gsm.CreateRoomRsp.verify|verify} messages.
         * @param message CreateRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICreateRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateRoomRsp message, length delimited. Does not implicitly {@link gsm.CreateRoomRsp.verify|verify} messages.
         * @param message CreateRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICreateRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CreateRoomRsp;

        /**
         * Decodes a CreateRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CreateRoomRsp;

        /**
         * Verifies a CreateRoomRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateRoomRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.CreateRoomRsp;

        /**
         * Creates a plain object from a CreateRoomRsp message. Also converts values to other types if specified.
         * @param message CreateRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CreateRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DismissRoomReq. */
    interface IDismissRoomReq {

        /** DismissRoomReq gameGid */
        gameGid?: (string|null);

        /** DismissRoomReq roomId */
        roomId?: (string|null);

        /** DismissRoomReq openid */
        openid?: (string|null);

        /** DismissRoomReq serverId */
        serverId?: (string|null);
    }

    /** Represents a DismissRoomReq. */
    class DismissRoomReq implements IDismissRoomReq {

        /**
         * Constructs a new DismissRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IDismissRoomReq);

        /** DismissRoomReq gameGid. */
        public gameGid: string;

        /** DismissRoomReq roomId. */
        public roomId: string;

        /** DismissRoomReq openid. */
        public openid: string;

        /** DismissRoomReq serverId. */
        public serverId: string;

        /**
         * Creates a new DismissRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DismissRoomReq instance
         */
        public static create(properties?: gsm.IDismissRoomReq): gsm.DismissRoomReq;

        /**
         * Encodes the specified DismissRoomReq message. Does not implicitly {@link gsm.DismissRoomReq.verify|verify} messages.
         * @param message DismissRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IDismissRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DismissRoomReq message, length delimited. Does not implicitly {@link gsm.DismissRoomReq.verify|verify} messages.
         * @param message DismissRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IDismissRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DismissRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DismissRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.DismissRoomReq;

        /**
         * Decodes a DismissRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DismissRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.DismissRoomReq;

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
        public static fromObject(object: { [k: string]: any }): gsm.DismissRoomReq;

        /**
         * Creates a plain object from a DismissRoomReq message. Also converts values to other types if specified.
         * @param message DismissRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.DismissRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: gsm.IDismissRoomRsp);

        /** DismissRoomRsp err. */
        public err: string;

        /**
         * Creates a new DismissRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DismissRoomRsp instance
         */
        public static create(properties?: gsm.IDismissRoomRsp): gsm.DismissRoomRsp;

        /**
         * Encodes the specified DismissRoomRsp message. Does not implicitly {@link gsm.DismissRoomRsp.verify|verify} messages.
         * @param message DismissRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IDismissRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DismissRoomRsp message, length delimited. Does not implicitly {@link gsm.DismissRoomRsp.verify|verify} messages.
         * @param message DismissRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IDismissRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DismissRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DismissRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.DismissRoomRsp;

        /**
         * Decodes a DismissRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DismissRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.DismissRoomRsp;

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
        public static fromObject(object: { [k: string]: any }): gsm.DismissRoomRsp;

        /**
         * Creates a plain object from a DismissRoomRsp message. Also converts values to other types if specified.
         * @param message DismissRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.DismissRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DismissRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AcceptPlayerNot. */
    interface IAcceptPlayerNot {

        /** AcceptPlayerNot roomId */
        roomId?: (string|null);

        /** AcceptPlayerNot openid */
        openid?: (string|null);

        /** AcceptPlayerNot gameGid */
        gameGid?: (string|null);
    }

    /** Represents an AcceptPlayerNot. */
    class AcceptPlayerNot implements IAcceptPlayerNot {

        /**
         * Constructs a new AcceptPlayerNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IAcceptPlayerNot);

        /** AcceptPlayerNot roomId. */
        public roomId: string;

        /** AcceptPlayerNot openid. */
        public openid: string;

        /** AcceptPlayerNot gameGid. */
        public gameGid: string;

        /**
         * Creates a new AcceptPlayerNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcceptPlayerNot instance
         */
        public static create(properties?: gsm.IAcceptPlayerNot): gsm.AcceptPlayerNot;

        /**
         * Encodes the specified AcceptPlayerNot message. Does not implicitly {@link gsm.AcceptPlayerNot.verify|verify} messages.
         * @param message AcceptPlayerNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IAcceptPlayerNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcceptPlayerNot message, length delimited. Does not implicitly {@link gsm.AcceptPlayerNot.verify|verify} messages.
         * @param message AcceptPlayerNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IAcceptPlayerNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcceptPlayerNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcceptPlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.AcceptPlayerNot;

        /**
         * Decodes an AcceptPlayerNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AcceptPlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.AcceptPlayerNot;

        /**
         * Verifies an AcceptPlayerNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcceptPlayerNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcceptPlayerNot
         */
        public static fromObject(object: { [k: string]: any }): gsm.AcceptPlayerNot;

        /**
         * Creates a plain object from an AcceptPlayerNot message. Also converts values to other types if specified.
         * @param message AcceptPlayerNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.AcceptPlayerNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcceptPlayerNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RemovePlayerNot. */
    interface IRemovePlayerNot {

        /** RemovePlayerNot roomId */
        roomId?: (string|null);

        /** RemovePlayerNot openid */
        openid?: (string|null);

        /** RemovePlayerNot gameGid */
        gameGid?: (string|null);
    }

    /** Represents a RemovePlayerNot. */
    class RemovePlayerNot implements IRemovePlayerNot {

        /**
         * Constructs a new RemovePlayerNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IRemovePlayerNot);

        /** RemovePlayerNot roomId. */
        public roomId: string;

        /** RemovePlayerNot openid. */
        public openid: string;

        /** RemovePlayerNot gameGid. */
        public gameGid: string;

        /**
         * Creates a new RemovePlayerNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemovePlayerNot instance
         */
        public static create(properties?: gsm.IRemovePlayerNot): gsm.RemovePlayerNot;

        /**
         * Encodes the specified RemovePlayerNot message. Does not implicitly {@link gsm.RemovePlayerNot.verify|verify} messages.
         * @param message RemovePlayerNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IRemovePlayerNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemovePlayerNot message, length delimited. Does not implicitly {@link gsm.RemovePlayerNot.verify|verify} messages.
         * @param message RemovePlayerNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IRemovePlayerNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemovePlayerNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RemovePlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.RemovePlayerNot;

        /**
         * Decodes a RemovePlayerNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RemovePlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.RemovePlayerNot;

        /**
         * Verifies a RemovePlayerNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemovePlayerNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemovePlayerNot
         */
        public static fromObject(object: { [k: string]: any }): gsm.RemovePlayerNot;

        /**
         * Creates a plain object from a RemovePlayerNot message. Also converts values to other types if specified.
         * @param message RemovePlayerNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.RemovePlayerNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemovePlayerNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MatchPlayerInfo. */
    interface IMatchPlayerInfo {

        /** MatchPlayerInfo openid */
        openid?: (string|null);

        /** MatchPlayerInfo tags */
        tags?: ({ [k: string]: string }|null);
    }

    /** Represents a MatchPlayerInfo. */
    class MatchPlayerInfo implements IMatchPlayerInfo {

        /**
         * Constructs a new MatchPlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IMatchPlayerInfo);

        /** MatchPlayerInfo openid. */
        public openid: string;

        /** MatchPlayerInfo tags. */
        public tags: { [k: string]: string };

        /**
         * Creates a new MatchPlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchPlayerInfo instance
         */
        public static create(properties?: gsm.IMatchPlayerInfo): gsm.MatchPlayerInfo;

        /**
         * Encodes the specified MatchPlayerInfo message. Does not implicitly {@link gsm.MatchPlayerInfo.verify|verify} messages.
         * @param message MatchPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IMatchPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchPlayerInfo message, length delimited. Does not implicitly {@link gsm.MatchPlayerInfo.verify|verify} messages.
         * @param message MatchPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IMatchPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchPlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.MatchPlayerInfo;

        /**
         * Decodes a MatchPlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.MatchPlayerInfo;

        /**
         * Verifies a MatchPlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchPlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchPlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): gsm.MatchPlayerInfo;

        /**
         * Creates a plain object from a MatchPlayerInfo message. Also converts values to other types if specified.
         * @param message MatchPlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.MatchPlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchPlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartMatchingReq. */
    interface IStartMatchingReq {

        /** StartMatchingReq matchCode */
        matchCode?: (string|null);

        /** StartMatchingReq matchTicket */
        matchTicket?: (string|null);

        /** StartMatchingReq players */
        players?: (gsm.IMatchPlayerInfo[]|null);
    }

    /** Represents a StartMatchingReq. */
    class StartMatchingReq implements IStartMatchingReq {

        /**
         * Constructs a new StartMatchingReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IStartMatchingReq);

        /** StartMatchingReq matchCode. */
        public matchCode: string;

        /** StartMatchingReq matchTicket. */
        public matchTicket: string;

        /** StartMatchingReq players. */
        public players: gsm.IMatchPlayerInfo[];

        /**
         * Creates a new StartMatchingReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartMatchingReq instance
         */
        public static create(properties?: gsm.IStartMatchingReq): gsm.StartMatchingReq;

        /**
         * Encodes the specified StartMatchingReq message. Does not implicitly {@link gsm.StartMatchingReq.verify|verify} messages.
         * @param message StartMatchingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IStartMatchingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartMatchingReq message, length delimited. Does not implicitly {@link gsm.StartMatchingReq.verify|verify} messages.
         * @param message StartMatchingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IStartMatchingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartMatchingReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.StartMatchingReq;

        /**
         * Decodes a StartMatchingReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.StartMatchingReq;

        /**
         * Verifies a StartMatchingReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartMatchingReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartMatchingReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.StartMatchingReq;

        /**
         * Creates a plain object from a StartMatchingReq message. Also converts values to other types if specified.
         * @param message StartMatchingReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.StartMatchingReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartMatchingReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartMatchingRsp. */
    interface IStartMatchingRsp {

        /** StartMatchingRsp err */
        err?: (string|null);

        /** StartMatchingRsp matchTicket */
        matchTicket?: (string|null);
    }

    /** Represents a StartMatchingRsp. */
    class StartMatchingRsp implements IStartMatchingRsp {

        /**
         * Constructs a new StartMatchingRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IStartMatchingRsp);

        /** StartMatchingRsp err. */
        public err: string;

        /** StartMatchingRsp matchTicket. */
        public matchTicket: string;

        /**
         * Creates a new StartMatchingRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartMatchingRsp instance
         */
        public static create(properties?: gsm.IStartMatchingRsp): gsm.StartMatchingRsp;

        /**
         * Encodes the specified StartMatchingRsp message. Does not implicitly {@link gsm.StartMatchingRsp.verify|verify} messages.
         * @param message StartMatchingRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IStartMatchingRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartMatchingRsp message, length delimited. Does not implicitly {@link gsm.StartMatchingRsp.verify|verify} messages.
         * @param message StartMatchingRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IStartMatchingRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartMatchingRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.StartMatchingRsp;

        /**
         * Decodes a StartMatchingRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.StartMatchingRsp;

        /**
         * Verifies a StartMatchingRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartMatchingRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartMatchingRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.StartMatchingRsp;

        /**
         * Creates a plain object from a StartMatchingRsp message. Also converts values to other types if specified.
         * @param message StartMatchingRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.StartMatchingRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartMatchingRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CancelMatchingReq. */
    interface ICancelMatchingReq {

        /** CancelMatchingReq matchCode */
        matchCode?: (string|null);

        /** CancelMatchingReq matchTicket */
        matchTicket?: (string|null);
    }

    /** Represents a CancelMatchingReq. */
    class CancelMatchingReq implements ICancelMatchingReq {

        /**
         * Constructs a new CancelMatchingReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICancelMatchingReq);

        /** CancelMatchingReq matchCode. */
        public matchCode: string;

        /** CancelMatchingReq matchTicket. */
        public matchTicket: string;

        /**
         * Creates a new CancelMatchingReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelMatchingReq instance
         */
        public static create(properties?: gsm.ICancelMatchingReq): gsm.CancelMatchingReq;

        /**
         * Encodes the specified CancelMatchingReq message. Does not implicitly {@link gsm.CancelMatchingReq.verify|verify} messages.
         * @param message CancelMatchingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICancelMatchingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelMatchingReq message, length delimited. Does not implicitly {@link gsm.CancelMatchingReq.verify|verify} messages.
         * @param message CancelMatchingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICancelMatchingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelMatchingReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CancelMatchingReq;

        /**
         * Decodes a CancelMatchingReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CancelMatchingReq;

        /**
         * Verifies a CancelMatchingReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelMatchingReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelMatchingReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.CancelMatchingReq;

        /**
         * Creates a plain object from a CancelMatchingReq message. Also converts values to other types if specified.
         * @param message CancelMatchingReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CancelMatchingReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelMatchingReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CancelMatchingRsp. */
    interface ICancelMatchingRsp {

        /** CancelMatchingRsp err */
        err?: (string|null);
    }

    /** Represents a CancelMatchingRsp. */
    class CancelMatchingRsp implements ICancelMatchingRsp {

        /**
         * Constructs a new CancelMatchingRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICancelMatchingRsp);

        /** CancelMatchingRsp err. */
        public err: string;

        /**
         * Creates a new CancelMatchingRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelMatchingRsp instance
         */
        public static create(properties?: gsm.ICancelMatchingRsp): gsm.CancelMatchingRsp;

        /**
         * Encodes the specified CancelMatchingRsp message. Does not implicitly {@link gsm.CancelMatchingRsp.verify|verify} messages.
         * @param message CancelMatchingRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICancelMatchingRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelMatchingRsp message, length delimited. Does not implicitly {@link gsm.CancelMatchingRsp.verify|verify} messages.
         * @param message CancelMatchingRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICancelMatchingRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelMatchingRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CancelMatchingRsp;

        /**
         * Decodes a CancelMatchingRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CancelMatchingRsp;

        /**
         * Verifies a CancelMatchingRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelMatchingRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelMatchingRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.CancelMatchingRsp;

        /**
         * Creates a plain object from a CancelMatchingRsp message. Also converts values to other types if specified.
         * @param message CancelMatchingRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CancelMatchingRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelMatchingRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DismissRoomNot. */
    interface IDismissRoomNot {

        /** DismissRoomNot gameGid */
        gameGid?: (string|null);

        /** DismissRoomNot roomId */
        roomId?: (string|null);
    }

    /** Represents a DismissRoomNot. */
    class DismissRoomNot implements IDismissRoomNot {

        /**
         * Constructs a new DismissRoomNot.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IDismissRoomNot);

        /** DismissRoomNot gameGid. */
        public gameGid: string;

        /** DismissRoomNot roomId. */
        public roomId: string;

        /**
         * Creates a new DismissRoomNot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DismissRoomNot instance
         */
        public static create(properties?: gsm.IDismissRoomNot): gsm.DismissRoomNot;

        /**
         * Encodes the specified DismissRoomNot message. Does not implicitly {@link gsm.DismissRoomNot.verify|verify} messages.
         * @param message DismissRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IDismissRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DismissRoomNot message, length delimited. Does not implicitly {@link gsm.DismissRoomNot.verify|verify} messages.
         * @param message DismissRoomNot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IDismissRoomNot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DismissRoomNot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DismissRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.DismissRoomNot;

        /**
         * Decodes a DismissRoomNot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DismissRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.DismissRoomNot;

        /**
         * Verifies a DismissRoomNot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DismissRoomNot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DismissRoomNot
         */
        public static fromObject(object: { [k: string]: any }): gsm.DismissRoomNot;

        /**
         * Creates a plain object from a DismissRoomNot message. Also converts values to other types if specified.
         * @param message DismissRoomNot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.DismissRoomNot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DismissRoomNot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckRoomExistsReq. */
    interface ICheckRoomExistsReq {

        /** CheckRoomExistsReq roomId */
        roomId?: (string|null);

        /** CheckRoomExistsReq serverId */
        serverId?: (string|null);

        /** CheckRoomExistsReq gameGid */
        gameGid?: (string|null);
    }

    /** Represents a CheckRoomExistsReq. */
    class CheckRoomExistsReq implements ICheckRoomExistsReq {

        /**
         * Constructs a new CheckRoomExistsReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICheckRoomExistsReq);

        /** CheckRoomExistsReq roomId. */
        public roomId: string;

        /** CheckRoomExistsReq serverId. */
        public serverId: string;

        /** CheckRoomExistsReq gameGid. */
        public gameGid: string;

        /**
         * Creates a new CheckRoomExistsReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckRoomExistsReq instance
         */
        public static create(properties?: gsm.ICheckRoomExistsReq): gsm.CheckRoomExistsReq;

        /**
         * Encodes the specified CheckRoomExistsReq message. Does not implicitly {@link gsm.CheckRoomExistsReq.verify|verify} messages.
         * @param message CheckRoomExistsReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICheckRoomExistsReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckRoomExistsReq message, length delimited. Does not implicitly {@link gsm.CheckRoomExistsReq.verify|verify} messages.
         * @param message CheckRoomExistsReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICheckRoomExistsReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckRoomExistsReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckRoomExistsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CheckRoomExistsReq;

        /**
         * Decodes a CheckRoomExistsReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckRoomExistsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CheckRoomExistsReq;

        /**
         * Verifies a CheckRoomExistsReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckRoomExistsReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckRoomExistsReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.CheckRoomExistsReq;

        /**
         * Creates a plain object from a CheckRoomExistsReq message. Also converts values to other types if specified.
         * @param message CheckRoomExistsReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CheckRoomExistsReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckRoomExistsReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckRoomExistsRsp. */
    interface ICheckRoomExistsRsp {

        /** CheckRoomExistsRsp exists */
        exists?: (boolean|null);
    }

    /** Represents a CheckRoomExistsRsp. */
    class CheckRoomExistsRsp implements ICheckRoomExistsRsp {

        /**
         * Constructs a new CheckRoomExistsRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICheckRoomExistsRsp);

        /** CheckRoomExistsRsp exists. */
        public exists: boolean;

        /**
         * Creates a new CheckRoomExistsRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckRoomExistsRsp instance
         */
        public static create(properties?: gsm.ICheckRoomExistsRsp): gsm.CheckRoomExistsRsp;

        /**
         * Encodes the specified CheckRoomExistsRsp message. Does not implicitly {@link gsm.CheckRoomExistsRsp.verify|verify} messages.
         * @param message CheckRoomExistsRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICheckRoomExistsRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckRoomExistsRsp message, length delimited. Does not implicitly {@link gsm.CheckRoomExistsRsp.verify|verify} messages.
         * @param message CheckRoomExistsRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICheckRoomExistsRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckRoomExistsRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckRoomExistsRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CheckRoomExistsRsp;

        /**
         * Decodes a CheckRoomExistsRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckRoomExistsRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CheckRoomExistsRsp;

        /**
         * Verifies a CheckRoomExistsRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckRoomExistsRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckRoomExistsRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.CheckRoomExistsRsp;

        /**
         * Creates a plain object from a CheckRoomExistsRsp message. Also converts values to other types if specified.
         * @param message CheckRoomExistsRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CheckRoomExistsRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckRoomExistsRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetRoomInfoReq. */
    interface IGetRoomInfoReq {

        /** GetRoomInfoReq roomId */
        roomId?: (string|null);

        /** GetRoomInfoReq serverId */
        serverId?: (string|null);
    }

    /** Represents a GetRoomInfoReq. */
    class GetRoomInfoReq implements IGetRoomInfoReq {

        /**
         * Constructs a new GetRoomInfoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IGetRoomInfoReq);

        /** GetRoomInfoReq roomId. */
        public roomId: string;

        /** GetRoomInfoReq serverId. */
        public serverId: string;

        /**
         * Creates a new GetRoomInfoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetRoomInfoReq instance
         */
        public static create(properties?: gsm.IGetRoomInfoReq): gsm.GetRoomInfoReq;

        /**
         * Encodes the specified GetRoomInfoReq message. Does not implicitly {@link gsm.GetRoomInfoReq.verify|verify} messages.
         * @param message GetRoomInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IGetRoomInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetRoomInfoReq message, length delimited. Does not implicitly {@link gsm.GetRoomInfoReq.verify|verify} messages.
         * @param message GetRoomInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IGetRoomInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetRoomInfoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetRoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.GetRoomInfoReq;

        /**
         * Decodes a GetRoomInfoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetRoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.GetRoomInfoReq;

        /**
         * Verifies a GetRoomInfoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetRoomInfoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetRoomInfoReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.GetRoomInfoReq;

        /**
         * Creates a plain object from a GetRoomInfoReq message. Also converts values to other types if specified.
         * @param message GetRoomInfoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.GetRoomInfoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetRoomInfoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetRoomInfoRsp. */
    interface IGetRoomInfoRsp {

        /** GetRoomInfoRsp err */
        err?: (string|null);

        /** GetRoomInfoRsp room */
        room?: (gsm.IRoomInfo|null);
    }

    /** Represents a GetRoomInfoRsp. */
    class GetRoomInfoRsp implements IGetRoomInfoRsp {

        /**
         * Constructs a new GetRoomInfoRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IGetRoomInfoRsp);

        /** GetRoomInfoRsp err. */
        public err: string;

        /** GetRoomInfoRsp room. */
        public room?: (gsm.IRoomInfo|null);

        /**
         * Creates a new GetRoomInfoRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetRoomInfoRsp instance
         */
        public static create(properties?: gsm.IGetRoomInfoRsp): gsm.GetRoomInfoRsp;

        /**
         * Encodes the specified GetRoomInfoRsp message. Does not implicitly {@link gsm.GetRoomInfoRsp.verify|verify} messages.
         * @param message GetRoomInfoRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IGetRoomInfoRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetRoomInfoRsp message, length delimited. Does not implicitly {@link gsm.GetRoomInfoRsp.verify|verify} messages.
         * @param message GetRoomInfoRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IGetRoomInfoRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetRoomInfoRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetRoomInfoRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.GetRoomInfoRsp;

        /**
         * Decodes a GetRoomInfoRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetRoomInfoRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.GetRoomInfoRsp;

        /**
         * Verifies a GetRoomInfoRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetRoomInfoRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetRoomInfoRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.GetRoomInfoRsp;

        /**
         * Creates a plain object from a GetRoomInfoRsp message. Also converts values to other types if specified.
         * @param message GetRoomInfoRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.GetRoomInfoRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetRoomInfoRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetMyRoomReq. */
    interface IGetMyRoomReq {
    }

    /** Represents a GetMyRoomReq. */
    class GetMyRoomReq implements IGetMyRoomReq {

        /**
         * Constructs a new GetMyRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IGetMyRoomReq);

        /**
         * Creates a new GetMyRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetMyRoomReq instance
         */
        public static create(properties?: gsm.IGetMyRoomReq): gsm.GetMyRoomReq;

        /**
         * Encodes the specified GetMyRoomReq message. Does not implicitly {@link gsm.GetMyRoomReq.verify|verify} messages.
         * @param message GetMyRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IGetMyRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetMyRoomReq message, length delimited. Does not implicitly {@link gsm.GetMyRoomReq.verify|verify} messages.
         * @param message GetMyRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IGetMyRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetMyRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetMyRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.GetMyRoomReq;

        /**
         * Decodes a GetMyRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetMyRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.GetMyRoomReq;

        /**
         * Verifies a GetMyRoomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetMyRoomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetMyRoomReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.GetMyRoomReq;

        /**
         * Creates a plain object from a GetMyRoomReq message. Also converts values to other types if specified.
         * @param message GetMyRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.GetMyRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetMyRoomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetMyRoomRsp. */
    interface IGetMyRoomRsp {

        /** GetMyRoomRsp err */
        err?: (string|null);

        /** GetMyRoomRsp room */
        room?: (gsm.IRoomInfo|null);
    }

    /** Represents a GetMyRoomRsp. */
    class GetMyRoomRsp implements IGetMyRoomRsp {

        /**
         * Constructs a new GetMyRoomRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IGetMyRoomRsp);

        /** GetMyRoomRsp err. */
        public err: string;

        /** GetMyRoomRsp room. */
        public room?: (gsm.IRoomInfo|null);

        /**
         * Creates a new GetMyRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetMyRoomRsp instance
         */
        public static create(properties?: gsm.IGetMyRoomRsp): gsm.GetMyRoomRsp;

        /**
         * Encodes the specified GetMyRoomRsp message. Does not implicitly {@link gsm.GetMyRoomRsp.verify|verify} messages.
         * @param message GetMyRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IGetMyRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetMyRoomRsp message, length delimited. Does not implicitly {@link gsm.GetMyRoomRsp.verify|verify} messages.
         * @param message GetMyRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IGetMyRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetMyRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetMyRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.GetMyRoomRsp;

        /**
         * Decodes a GetMyRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetMyRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.GetMyRoomRsp;

        /**
         * Verifies a GetMyRoomRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetMyRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetMyRoomRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.GetMyRoomRsp;

        /**
         * Creates a plain object from a GetMyRoomRsp message. Also converts values to other types if specified.
         * @param message GetMyRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.GetMyRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetMyRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetRoomListReq. */
    interface IGetRoomListReq {

        /** GetRoomListReq gameGid */
        gameGid?: (string|null);

        /** GetRoomListReq conditions */
        conditions?: ({ [k: string]: string }|null);
    }

    /** Represents a GetRoomListReq. */
    class GetRoomListReq implements IGetRoomListReq {

        /**
         * Constructs a new GetRoomListReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IGetRoomListReq);

        /** GetRoomListReq gameGid. */
        public gameGid: string;

        /** GetRoomListReq conditions. */
        public conditions: { [k: string]: string };

        /**
         * Creates a new GetRoomListReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetRoomListReq instance
         */
        public static create(properties?: gsm.IGetRoomListReq): gsm.GetRoomListReq;

        /**
         * Encodes the specified GetRoomListReq message. Does not implicitly {@link gsm.GetRoomListReq.verify|verify} messages.
         * @param message GetRoomListReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IGetRoomListReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetRoomListReq message, length delimited. Does not implicitly {@link gsm.GetRoomListReq.verify|verify} messages.
         * @param message GetRoomListReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IGetRoomListReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetRoomListReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetRoomListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.GetRoomListReq;

        /**
         * Decodes a GetRoomListReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetRoomListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.GetRoomListReq;

        /**
         * Verifies a GetRoomListReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetRoomListReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetRoomListReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.GetRoomListReq;

        /**
         * Creates a plain object from a GetRoomListReq message. Also converts values to other types if specified.
         * @param message GetRoomListReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.GetRoomListReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetRoomListReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetRoomListRsp. */
    interface IGetRoomListRsp {

        /** GetRoomListRsp err */
        err?: (string|null);

        /** GetRoomListRsp roomList */
        roomList?: (gsm.IRoomInfo[]|null);
    }

    /** Represents a GetRoomListRsp. */
    class GetRoomListRsp implements IGetRoomListRsp {

        /**
         * Constructs a new GetRoomListRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.IGetRoomListRsp);

        /** GetRoomListRsp err. */
        public err: string;

        /** GetRoomListRsp roomList. */
        public roomList: gsm.IRoomInfo[];

        /**
         * Creates a new GetRoomListRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetRoomListRsp instance
         */
        public static create(properties?: gsm.IGetRoomListRsp): gsm.GetRoomListRsp;

        /**
         * Encodes the specified GetRoomListRsp message. Does not implicitly {@link gsm.GetRoomListRsp.verify|verify} messages.
         * @param message GetRoomListRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.IGetRoomListRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetRoomListRsp message, length delimited. Does not implicitly {@link gsm.GetRoomListRsp.verify|verify} messages.
         * @param message GetRoomListRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.IGetRoomListRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetRoomListRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetRoomListRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.GetRoomListRsp;

        /**
         * Decodes a GetRoomListRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetRoomListRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.GetRoomListRsp;

        /**
         * Verifies a GetRoomListRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetRoomListRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetRoomListRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.GetRoomListRsp;

        /**
         * Creates a plain object from a GetRoomListRsp message. Also converts values to other types if specified.
         * @param message GetRoomListRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.GetRoomListRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetRoomListRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckCanJoinReq. */
    interface ICheckCanJoinReq {

        /** CheckCanJoinReq gameId */
        gameId?: (string|null);

        /** CheckCanJoinReq roomId */
        roomId?: (string|null);

        /** CheckCanJoinReq openid */
        openid?: (string|null);
    }

    /** Represents a CheckCanJoinReq. */
    class CheckCanJoinReq implements ICheckCanJoinReq {

        /**
         * Constructs a new CheckCanJoinReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICheckCanJoinReq);

        /** CheckCanJoinReq gameId. */
        public gameId: string;

        /** CheckCanJoinReq roomId. */
        public roomId: string;

        /** CheckCanJoinReq openid. */
        public openid: string;

        /**
         * Creates a new CheckCanJoinReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckCanJoinReq instance
         */
        public static create(properties?: gsm.ICheckCanJoinReq): gsm.CheckCanJoinReq;

        /**
         * Encodes the specified CheckCanJoinReq message. Does not implicitly {@link gsm.CheckCanJoinReq.verify|verify} messages.
         * @param message CheckCanJoinReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICheckCanJoinReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckCanJoinReq message, length delimited. Does not implicitly {@link gsm.CheckCanJoinReq.verify|verify} messages.
         * @param message CheckCanJoinReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICheckCanJoinReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckCanJoinReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckCanJoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CheckCanJoinReq;

        /**
         * Decodes a CheckCanJoinReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckCanJoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CheckCanJoinReq;

        /**
         * Verifies a CheckCanJoinReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckCanJoinReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckCanJoinReq
         */
        public static fromObject(object: { [k: string]: any }): gsm.CheckCanJoinReq;

        /**
         * Creates a plain object from a CheckCanJoinReq message. Also converts values to other types if specified.
         * @param message CheckCanJoinReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CheckCanJoinReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckCanJoinReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckCanJoinRsp. */
    interface ICheckCanJoinRsp {

        /** CheckCanJoinRsp err */
        err?: (string|null);
    }

    /** Represents a CheckCanJoinRsp. */
    class CheckCanJoinRsp implements ICheckCanJoinRsp {

        /**
         * Constructs a new CheckCanJoinRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: gsm.ICheckCanJoinRsp);

        /** CheckCanJoinRsp err. */
        public err: string;

        /**
         * Creates a new CheckCanJoinRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckCanJoinRsp instance
         */
        public static create(properties?: gsm.ICheckCanJoinRsp): gsm.CheckCanJoinRsp;

        /**
         * Encodes the specified CheckCanJoinRsp message. Does not implicitly {@link gsm.CheckCanJoinRsp.verify|verify} messages.
         * @param message CheckCanJoinRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gsm.ICheckCanJoinRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckCanJoinRsp message, length delimited. Does not implicitly {@link gsm.CheckCanJoinRsp.verify|verify} messages.
         * @param message CheckCanJoinRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gsm.ICheckCanJoinRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckCanJoinRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckCanJoinRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gsm.CheckCanJoinRsp;

        /**
         * Decodes a CheckCanJoinRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckCanJoinRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gsm.CheckCanJoinRsp;

        /**
         * Verifies a CheckCanJoinRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckCanJoinRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckCanJoinRsp
         */
        public static fromObject(object: { [k: string]: any }): gsm.CheckCanJoinRsp;

        /**
         * Creates a plain object from a CheckCanJoinRsp message. Also converts values to other types if specified.
         * @param message CheckCanJoinRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gsm.CheckCanJoinRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckCanJoinRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
