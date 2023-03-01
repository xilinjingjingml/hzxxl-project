/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.gsm = (function() {

    /**
     * Namespace gsm.
     * @exports gsm
     * @namespace
     */
    var gsm = {};

    gsm.Rooms = (function() {

        /**
         * Constructs a new Rooms service.
         * @memberof gsm
         * @classdesc Represents a Rooms
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Rooms(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (Rooms.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Rooms;

        /**
         * Creates new Rooms service using the specified rpc implementation.
         * @function create
         * @memberof gsm.Rooms
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Rooms} RPC service. Useful where requests and/or responses are streamed.
         */
        Rooms.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link gsm.Rooms#startMatching}.
         * @memberof gsm.Rooms
         * @typedef StartMatchingCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.StartMatchingRsp} [response] StartMatchingRsp
         */

        /**
         * Calls StartMatching.
         * @function startMatching
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IStartMatchingReq} request StartMatchingReq message or plain object
         * @param {gsm.Rooms.StartMatchingCallback} callback Node-style callback called with the error, if any, and StartMatchingRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.startMatching = function startMatching(request, callback) {
            return this.rpcCall(startMatching, $root.gsm.StartMatchingReq, $root.gsm.StartMatchingRsp, request, callback);
        }, "name", { value: "StartMatching" });

        /**
         * Calls StartMatching.
         * @function startMatching
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IStartMatchingReq} request StartMatchingReq message or plain object
         * @returns {Promise<gsm.StartMatchingRsp>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.Rooms#cancelMatching}.
         * @memberof gsm.Rooms
         * @typedef CancelMatchingCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.CancelMatchingRsp} [response] CancelMatchingRsp
         */

        /**
         * Calls CancelMatching.
         * @function cancelMatching
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.ICancelMatchingReq} request CancelMatchingReq message or plain object
         * @param {gsm.Rooms.CancelMatchingCallback} callback Node-style callback called with the error, if any, and CancelMatchingRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.cancelMatching = function cancelMatching(request, callback) {
            return this.rpcCall(cancelMatching, $root.gsm.CancelMatchingReq, $root.gsm.CancelMatchingRsp, request, callback);
        }, "name", { value: "CancelMatching" });

        /**
         * Calls CancelMatching.
         * @function cancelMatching
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.ICancelMatchingReq} request CancelMatchingReq message or plain object
         * @returns {Promise<gsm.CancelMatchingRsp>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.Rooms#createRoom}.
         * @memberof gsm.Rooms
         * @typedef CreateRoomCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.CreateRoomRsp} [response] CreateRoomRsp
         */

        /**
         * Calls CreateRoom.
         * @function createRoom
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.ICreateRoomReq} request CreateRoomReq message or plain object
         * @param {gsm.Rooms.CreateRoomCallback} callback Node-style callback called with the error, if any, and CreateRoomRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.createRoom = function createRoom(request, callback) {
            return this.rpcCall(createRoom, $root.gsm.CreateRoomReq, $root.gsm.CreateRoomRsp, request, callback);
        }, "name", { value: "CreateRoom" });

        /**
         * Calls CreateRoom.
         * @function createRoom
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.ICreateRoomReq} request CreateRoomReq message or plain object
         * @returns {Promise<gsm.CreateRoomRsp>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.Rooms#dismissRoom}.
         * @memberof gsm.Rooms
         * @typedef DismissRoomCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.DismissRoomRsp} [response] DismissRoomRsp
         */

        /**
         * Calls DismissRoom.
         * @function dismissRoom
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IDismissRoomReq} request DismissRoomReq message or plain object
         * @param {gsm.Rooms.DismissRoomCallback} callback Node-style callback called with the error, if any, and DismissRoomRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.dismissRoom = function dismissRoom(request, callback) {
            return this.rpcCall(dismissRoom, $root.gsm.DismissRoomReq, $root.gsm.DismissRoomRsp, request, callback);
        }, "name", { value: "DismissRoom" });

        /**
         * Calls DismissRoom.
         * @function dismissRoom
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IDismissRoomReq} request DismissRoomReq message or plain object
         * @returns {Promise<gsm.DismissRoomRsp>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.Rooms#getRoomList}.
         * @memberof gsm.Rooms
         * @typedef GetRoomListCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.GetRoomListRsp} [response] GetRoomListRsp
         */

        /**
         * Calls GetRoomList.
         * @function getRoomList
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IGetRoomListReq} request GetRoomListReq message or plain object
         * @param {gsm.Rooms.GetRoomListCallback} callback Node-style callback called with the error, if any, and GetRoomListRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.getRoomList = function getRoomList(request, callback) {
            return this.rpcCall(getRoomList, $root.gsm.GetRoomListReq, $root.gsm.GetRoomListRsp, request, callback);
        }, "name", { value: "GetRoomList" });

        /**
         * Calls GetRoomList.
         * @function getRoomList
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IGetRoomListReq} request GetRoomListReq message or plain object
         * @returns {Promise<gsm.GetRoomListRsp>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.Rooms#getMyRoom}.
         * @memberof gsm.Rooms
         * @typedef GetMyRoomCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.GetMyRoomRsp} [response] GetMyRoomRsp
         */

        /**
         * Calls GetMyRoom.
         * @function getMyRoom
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IGetMyRoomReq} request GetMyRoomReq message or plain object
         * @param {gsm.Rooms.GetMyRoomCallback} callback Node-style callback called with the error, if any, and GetMyRoomRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.getMyRoom = function getMyRoom(request, callback) {
            return this.rpcCall(getMyRoom, $root.gsm.GetMyRoomReq, $root.gsm.GetMyRoomRsp, request, callback);
        }, "name", { value: "GetMyRoom" });

        /**
         * Calls GetMyRoom.
         * @function getMyRoom
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IGetMyRoomReq} request GetMyRoomReq message or plain object
         * @returns {Promise<gsm.GetMyRoomRsp>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.Rooms#getRoomInfo}.
         * @memberof gsm.Rooms
         * @typedef GetRoomInfoCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.GetRoomInfoRsp} [response] GetRoomInfoRsp
         */

        /**
         * Calls GetRoomInfo.
         * @function getRoomInfo
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IGetRoomInfoReq} request GetRoomInfoReq message or plain object
         * @param {gsm.Rooms.GetRoomInfoCallback} callback Node-style callback called with the error, if any, and GetRoomInfoRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.getRoomInfo = function getRoomInfo(request, callback) {
            return this.rpcCall(getRoomInfo, $root.gsm.GetRoomInfoReq, $root.gsm.GetRoomInfoRsp, request, callback);
        }, "name", { value: "GetRoomInfo" });

        /**
         * Calls GetRoomInfo.
         * @function getRoomInfo
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.IGetRoomInfoReq} request GetRoomInfoReq message or plain object
         * @returns {Promise<gsm.GetRoomInfoRsp>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.Rooms#checkRoomExists}.
         * @memberof gsm.Rooms
         * @typedef CheckRoomExistsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.CheckRoomExistsRsp} [response] CheckRoomExistsRsp
         */

        /**
         * Calls CheckRoomExists.
         * @function checkRoomExists
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.ICheckRoomExistsReq} request CheckRoomExistsReq message or plain object
         * @param {gsm.Rooms.CheckRoomExistsCallback} callback Node-style callback called with the error, if any, and CheckRoomExistsRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(Rooms.prototype.checkRoomExists = function checkRoomExists(request, callback) {
            return this.rpcCall(checkRoomExists, $root.gsm.CheckRoomExistsReq, $root.gsm.CheckRoomExistsRsp, request, callback);
        }, "name", { value: "CheckRoomExists" });

        /**
         * Calls CheckRoomExists.
         * @function checkRoomExists
         * @memberof gsm.Rooms
         * @instance
         * @param {gsm.ICheckRoomExistsReq} request CheckRoomExistsReq message or plain object
         * @returns {Promise<gsm.CheckRoomExistsRsp>} Promise
         * @variation 2
         */

        return Rooms;
    })();

    gsm.GsmSdk = (function() {

        /**
         * Constructs a new GsmSdk service.
         * @memberof gsm
         * @classdesc Represents a GsmSdk
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function GsmSdk(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (GsmSdk.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = GsmSdk;

        /**
         * Creates new GsmSdk service using the specified rpc implementation.
         * @function create
         * @memberof gsm.GsmSdk
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {GsmSdk} RPC service. Useful where requests and/or responses are streamed.
         */
        GsmSdk.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link gsm.GsmSdk#terminateGameRoom}.
         * @memberof gsm.GsmSdk
         * @typedef TerminateGameRoomCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.Empty} [response] Empty
         */

        /**
         * Calls TerminateGameRoom.
         * @function terminateGameRoom
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.IDismissRoomNot} request DismissRoomNot message or plain object
         * @param {gsm.GsmSdk.TerminateGameRoomCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GsmSdk.prototype.terminateGameRoom = function terminateGameRoom(request, callback) {
            return this.rpcCall(terminateGameRoom, $root.gsm.DismissRoomNot, $root.gsm.Empty, request, callback);
        }, "name", { value: "TerminateGameRoom" });

        /**
         * Calls TerminateGameRoom.
         * @function terminateGameRoom
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.IDismissRoomNot} request DismissRoomNot message or plain object
         * @returns {Promise<gsm.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.GsmSdk#acceptPlayer}.
         * @memberof gsm.GsmSdk
         * @typedef AcceptPlayerCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.Empty} [response] Empty
         */

        /**
         * Calls AcceptPlayer.
         * @function acceptPlayer
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.IAcceptPlayerNot} request AcceptPlayerNot message or plain object
         * @param {gsm.GsmSdk.AcceptPlayerCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GsmSdk.prototype.acceptPlayer = function acceptPlayer(request, callback) {
            return this.rpcCall(acceptPlayer, $root.gsm.AcceptPlayerNot, $root.gsm.Empty, request, callback);
        }, "name", { value: "AcceptPlayer" });

        /**
         * Calls AcceptPlayer.
         * @function acceptPlayer
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.IAcceptPlayerNot} request AcceptPlayerNot message or plain object
         * @returns {Promise<gsm.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.GsmSdk#removePlayer}.
         * @memberof gsm.GsmSdk
         * @typedef RemovePlayerCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.Empty} [response] Empty
         */

        /**
         * Calls RemovePlayer.
         * @function removePlayer
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.IRemovePlayerNot} request RemovePlayerNot message or plain object
         * @param {gsm.GsmSdk.RemovePlayerCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GsmSdk.prototype.removePlayer = function removePlayer(request, callback) {
            return this.rpcCall(removePlayer, $root.gsm.RemovePlayerNot, $root.gsm.Empty, request, callback);
        }, "name", { value: "RemovePlayer" });

        /**
         * Calls RemovePlayer.
         * @function removePlayer
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.IRemovePlayerNot} request RemovePlayerNot message or plain object
         * @returns {Promise<gsm.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link gsm.GsmSdk#checkCanJoin}.
         * @memberof gsm.GsmSdk
         * @typedef CheckCanJoinCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {gsm.CheckCanJoinRsp} [response] CheckCanJoinRsp
         */

        /**
         * Calls CheckCanJoin.
         * @function checkCanJoin
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.ICheckCanJoinReq} request CheckCanJoinReq message or plain object
         * @param {gsm.GsmSdk.CheckCanJoinCallback} callback Node-style callback called with the error, if any, and CheckCanJoinRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GsmSdk.prototype.checkCanJoin = function checkCanJoin(request, callback) {
            return this.rpcCall(checkCanJoin, $root.gsm.CheckCanJoinReq, $root.gsm.CheckCanJoinRsp, request, callback);
        }, "name", { value: "CheckCanJoin" });

        /**
         * Calls CheckCanJoin.
         * @function checkCanJoin
         * @memberof gsm.GsmSdk
         * @instance
         * @param {gsm.ICheckCanJoinReq} request CheckCanJoinReq message or plain object
         * @returns {Promise<gsm.CheckCanJoinRsp>} Promise
         * @variation 2
         */

        return GsmSdk;
    })();

    gsm.Empty = (function() {

        /**
         * Properties of an Empty.
         * @memberof gsm
         * @interface IEmpty
         */

        /**
         * Constructs a new Empty.
         * @memberof gsm
         * @classdesc Represents an Empty.
         * @implements IEmpty
         * @constructor
         * @param {gsm.IEmpty=} [properties] Properties to set
         */
        function Empty(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Empty instance using the specified properties.
         * @function create
         * @memberof gsm.Empty
         * @static
         * @param {gsm.IEmpty=} [properties] Properties to set
         * @returns {gsm.Empty} Empty instance
         */
        Empty.create = function create(properties) {
            return new Empty(properties);
        };

        /**
         * Encodes the specified Empty message. Does not implicitly {@link gsm.Empty.verify|verify} messages.
         * @function encode
         * @memberof gsm.Empty
         * @static
         * @param {gsm.IEmpty} message Empty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Empty.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Empty message, length delimited. Does not implicitly {@link gsm.Empty.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.Empty
         * @static
         * @param {gsm.IEmpty} message Empty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Empty.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Empty message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.Empty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.Empty} Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Empty.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.Empty();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Empty message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.Empty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.Empty} Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Empty.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Empty message.
         * @function verify
         * @memberof gsm.Empty
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Empty.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an Empty message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.Empty
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.Empty} Empty
         */
        Empty.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.Empty)
                return object;
            return new $root.gsm.Empty();
        };

        /**
         * Creates a plain object from an Empty message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.Empty
         * @static
         * @param {gsm.Empty} message Empty
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Empty.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Empty to JSON.
         * @function toJSON
         * @memberof gsm.Empty
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Empty.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Empty;
    })();

    gsm.CreateRoomReq = (function() {

        /**
         * Properties of a CreateRoomReq.
         * @memberof gsm
         * @interface ICreateRoomReq
         * @property {string|null} [gameId] CreateRoomReq gameId
         * @property {string|null} [properties] CreateRoomReq properties
         * @property {string|null} [roomId] CreateRoomReq roomId
         */

        /**
         * Constructs a new CreateRoomReq.
         * @memberof gsm
         * @classdesc Represents a CreateRoomReq.
         * @implements ICreateRoomReq
         * @constructor
         * @param {gsm.ICreateRoomReq=} [properties] Properties to set
         */
        function CreateRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateRoomReq gameId.
         * @member {string} gameId
         * @memberof gsm.CreateRoomReq
         * @instance
         */
        CreateRoomReq.prototype.gameId = "";

        /**
         * CreateRoomReq properties.
         * @member {string} properties
         * @memberof gsm.CreateRoomReq
         * @instance
         */
        CreateRoomReq.prototype.properties = "";

        /**
         * CreateRoomReq roomId.
         * @member {string} roomId
         * @memberof gsm.CreateRoomReq
         * @instance
         */
        CreateRoomReq.prototype.roomId = "";

        /**
         * Creates a new CreateRoomReq instance using the specified properties.
         * @function create
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {gsm.ICreateRoomReq=} [properties] Properties to set
         * @returns {gsm.CreateRoomReq} CreateRoomReq instance
         */
        CreateRoomReq.create = function create(properties) {
            return new CreateRoomReq(properties);
        };

        /**
         * Encodes the specified CreateRoomReq message. Does not implicitly {@link gsm.CreateRoomReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {gsm.ICreateRoomReq} message CreateRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
            if (message.properties != null && Object.hasOwnProperty.call(message, "properties"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.properties);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified CreateRoomReq message, length delimited. Does not implicitly {@link gsm.CreateRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {gsm.ICreateRoomReq} message CreateRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CreateRoomReq} CreateRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CreateRoomReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.string();
                    break;
                case 2:
                    message.properties = reader.string();
                    break;
                case 3:
                    message.roomId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CreateRoomReq} CreateRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateRoomReq message.
         * @function verify
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isString(message.gameId))
                    return "gameId: string expected";
            if (message.properties != null && message.hasOwnProperty("properties"))
                if (!$util.isString(message.properties))
                    return "properties: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            return null;
        };

        /**
         * Creates a CreateRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CreateRoomReq} CreateRoomReq
         */
        CreateRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CreateRoomReq)
                return object;
            var message = new $root.gsm.CreateRoomReq();
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            if (object.properties != null)
                message.properties = String(object.properties);
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            return message;
        };

        /**
         * Creates a plain object from a CreateRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CreateRoomReq
         * @static
         * @param {gsm.CreateRoomReq} message CreateRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateRoomReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameId = "";
                object.properties = "";
                object.roomId = "";
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.properties != null && message.hasOwnProperty("properties"))
                object.properties = message.properties;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this CreateRoomReq to JSON.
         * @function toJSON
         * @memberof gsm.CreateRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateRoomReq;
    })();

    gsm.PlayerInfo = (function() {

        /**
         * Properties of a PlayerInfo.
         * @memberof gsm
         * @interface IPlayerInfo
         * @property {string|null} [openid] PlayerInfo openid
         * @property {gsm.PlayerInfo.Status|null} [status] PlayerInfo status
         * @property {number|Long|null} [joinTime] PlayerInfo joinTime
         * @property {number|Long|null} [leaveTime] PlayerInfo leaveTime
         */

        /**
         * Constructs a new PlayerInfo.
         * @memberof gsm
         * @classdesc Represents a PlayerInfo.
         * @implements IPlayerInfo
         * @constructor
         * @param {gsm.IPlayerInfo=} [properties] Properties to set
         */
        function PlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfo openid.
         * @member {string} openid
         * @memberof gsm.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.openid = "";

        /**
         * PlayerInfo status.
         * @member {gsm.PlayerInfo.Status} status
         * @memberof gsm.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.status = 0;

        /**
         * PlayerInfo joinTime.
         * @member {number|Long} joinTime
         * @memberof gsm.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.joinTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PlayerInfo leaveTime.
         * @member {number|Long} leaveTime
         * @memberof gsm.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.leaveTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @function create
         * @memberof gsm.PlayerInfo
         * @static
         * @param {gsm.IPlayerInfo=} [properties] Properties to set
         * @returns {gsm.PlayerInfo} PlayerInfo instance
         */
        PlayerInfo.create = function create(properties) {
            return new PlayerInfo(properties);
        };

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link gsm.PlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof gsm.PlayerInfo
         * @static
         * @param {gsm.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.joinTime != null && Object.hasOwnProperty.call(message, "joinTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.joinTime);
            if (message.leaveTime != null && Object.hasOwnProperty.call(message, "leaveTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.leaveTime);
            return writer;
        };

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link gsm.PlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.PlayerInfo
         * @static
         * @param {gsm.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                case 3:
                    message.joinTime = reader.int64();
                    break;
                case 4:
                    message.leaveTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfo message.
         * @function verify
         * @memberof gsm.PlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.joinTime != null && message.hasOwnProperty("joinTime"))
                if (!$util.isInteger(message.joinTime) && !(message.joinTime && $util.isInteger(message.joinTime.low) && $util.isInteger(message.joinTime.high)))
                    return "joinTime: integer|Long expected";
            if (message.leaveTime != null && message.hasOwnProperty("leaveTime"))
                if (!$util.isInteger(message.leaveTime) && !(message.leaveTime && $util.isInteger(message.leaveTime.low) && $util.isInteger(message.leaveTime.high)))
                    return "leaveTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.PlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.PlayerInfo} PlayerInfo
         */
        PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.PlayerInfo)
                return object;
            var message = new $root.gsm.PlayerInfo();
            if (object.openid != null)
                message.openid = String(object.openid);
            switch (object.status) {
            case "DEFAULT":
            case 0:
                message.status = 0;
                break;
            case "JOINED":
            case 1:
                message.status = 1;
                break;
            case "LEAVED":
            case 2:
                message.status = 2;
                break;
            }
            if (object.joinTime != null)
                if ($util.Long)
                    (message.joinTime = $util.Long.fromValue(object.joinTime)).unsigned = false;
                else if (typeof object.joinTime === "string")
                    message.joinTime = parseInt(object.joinTime, 10);
                else if (typeof object.joinTime === "number")
                    message.joinTime = object.joinTime;
                else if (typeof object.joinTime === "object")
                    message.joinTime = new $util.LongBits(object.joinTime.low >>> 0, object.joinTime.high >>> 0).toNumber();
            if (object.leaveTime != null)
                if ($util.Long)
                    (message.leaveTime = $util.Long.fromValue(object.leaveTime)).unsigned = false;
                else if (typeof object.leaveTime === "string")
                    message.leaveTime = parseInt(object.leaveTime, 10);
                else if (typeof object.leaveTime === "number")
                    message.leaveTime = object.leaveTime;
                else if (typeof object.leaveTime === "object")
                    message.leaveTime = new $util.LongBits(object.leaveTime.low >>> 0, object.leaveTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.PlayerInfo
         * @static
         * @param {gsm.PlayerInfo} message PlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.openid = "";
                object.status = options.enums === String ? "DEFAULT" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.joinTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.joinTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.leaveTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.leaveTime = options.longs === String ? "0" : 0;
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.gsm.PlayerInfo.Status[message.status] : message.status;
            if (message.joinTime != null && message.hasOwnProperty("joinTime"))
                if (typeof message.joinTime === "number")
                    object.joinTime = options.longs === String ? String(message.joinTime) : message.joinTime;
                else
                    object.joinTime = options.longs === String ? $util.Long.prototype.toString.call(message.joinTime) : options.longs === Number ? new $util.LongBits(message.joinTime.low >>> 0, message.joinTime.high >>> 0).toNumber() : message.joinTime;
            if (message.leaveTime != null && message.hasOwnProperty("leaveTime"))
                if (typeof message.leaveTime === "number")
                    object.leaveTime = options.longs === String ? String(message.leaveTime) : message.leaveTime;
                else
                    object.leaveTime = options.longs === String ? $util.Long.prototype.toString.call(message.leaveTime) : options.longs === Number ? new $util.LongBits(message.leaveTime.low >>> 0, message.leaveTime.high >>> 0).toNumber() : message.leaveTime;
            return object;
        };

        /**
         * Converts this PlayerInfo to JSON.
         * @function toJSON
         * @memberof gsm.PlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Status enum.
         * @name gsm.PlayerInfo.Status
         * @enum {number}
         * @property {number} DEFAULT=0 DEFAULT value
         * @property {number} JOINED=1 JOINED value
         * @property {number} LEAVED=2 LEAVED value
         */
        PlayerInfo.Status = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DEFAULT"] = 0;
            values[valuesById[1] = "JOINED"] = 1;
            values[valuesById[2] = "LEAVED"] = 2;
            return values;
        })();

        return PlayerInfo;
    })();

    gsm.RoomInfo = (function() {

        /**
         * Properties of a RoomInfo.
         * @memberof gsm
         * @interface IRoomInfo
         * @property {string|null} [roomId] RoomInfo roomId
         * @property {string|null} [serverId] RoomInfo serverId
         * @property {string|null} [gameGid] RoomInfo gameGid
         * @property {string|null} [matchCode] RoomInfo matchCode
         * @property {number|null} [maxPlayerNum] RoomInfo maxPlayerNum
         * @property {string|null} [owner] RoomInfo owner
         * @property {string|null} [properties] RoomInfo properties
         * @property {Object.<string,gsm.IPlayerInfo>|null} [players] RoomInfo players
         * @property {gsm.RoomInfo.CreateReason|null} [createReason] RoomInfo createReason
         * @property {number|Long|null} [createTime] RoomInfo createTime
         */

        /**
         * Constructs a new RoomInfo.
         * @memberof gsm
         * @classdesc Represents a RoomInfo.
         * @implements IRoomInfo
         * @constructor
         * @param {gsm.IRoomInfo=} [properties] Properties to set
         */
        function RoomInfo(properties) {
            this.players = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomInfo roomId.
         * @member {string} roomId
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomId = "";

        /**
         * RoomInfo serverId.
         * @member {string} serverId
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.serverId = "";

        /**
         * RoomInfo gameGid.
         * @member {string} gameGid
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.gameGid = "";

        /**
         * RoomInfo matchCode.
         * @member {string} matchCode
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.matchCode = "";

        /**
         * RoomInfo maxPlayerNum.
         * @member {number} maxPlayerNum
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.maxPlayerNum = 0;

        /**
         * RoomInfo owner.
         * @member {string} owner
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.owner = "";

        /**
         * RoomInfo properties.
         * @member {string} properties
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.properties = "";

        /**
         * RoomInfo players.
         * @member {Object.<string,gsm.IPlayerInfo>} players
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.players = $util.emptyObject;

        /**
         * RoomInfo createReason.
         * @member {gsm.RoomInfo.CreateReason} createReason
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.createReason = 0;

        /**
         * RoomInfo createTime.
         * @member {number|Long} createTime
         * @memberof gsm.RoomInfo
         * @instance
         */
        RoomInfo.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @function create
         * @memberof gsm.RoomInfo
         * @static
         * @param {gsm.IRoomInfo=} [properties] Properties to set
         * @returns {gsm.RoomInfo} RoomInfo instance
         */
        RoomInfo.create = function create(properties) {
            return new RoomInfo(properties);
        };

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link gsm.RoomInfo.verify|verify} messages.
         * @function encode
         * @memberof gsm.RoomInfo
         * @static
         * @param {gsm.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverId);
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.gameGid);
            if (message.matchCode != null && Object.hasOwnProperty.call(message, "matchCode"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.matchCode);
            if (message.maxPlayerNum != null && Object.hasOwnProperty.call(message, "maxPlayerNum"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.maxPlayerNum);
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.owner);
            if (message.properties != null && Object.hasOwnProperty.call(message, "properties"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.properties);
            if (message.players != null && Object.hasOwnProperty.call(message, "players"))
                for (var keys = Object.keys(message.players), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.gsm.PlayerInfo.encode(message.players[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.createReason != null && Object.hasOwnProperty.call(message, "createReason"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.createReason);
            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.createTime);
            return writer;
        };

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link gsm.RoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.RoomInfo
         * @static
         * @param {gsm.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.RoomInfo(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.serverId = reader.string();
                    break;
                case 3:
                    message.gameGid = reader.string();
                    break;
                case 4:
                    message.matchCode = reader.string();
                    break;
                case 5:
                    message.maxPlayerNum = reader.int32();
                    break;
                case 6:
                    message.owner = reader.string();
                    break;
                case 7:
                    message.properties = reader.string();
                    break;
                case 8:
                    if (message.players === $util.emptyObject)
                        message.players = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = null;
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.string();
                            break;
                        case 2:
                            value = $root.gsm.PlayerInfo.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.players[key] = value;
                    break;
                case 9:
                    message.createReason = reader.int32();
                    break;
                case 10:
                    message.createTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomInfo message.
         * @function verify
         * @memberof gsm.RoomInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                if (!$util.isString(message.serverId))
                    return "serverId: string expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                if (!$util.isString(message.matchCode))
                    return "matchCode: string expected";
            if (message.maxPlayerNum != null && message.hasOwnProperty("maxPlayerNum"))
                if (!$util.isInteger(message.maxPlayerNum))
                    return "maxPlayerNum: integer expected";
            if (message.owner != null && message.hasOwnProperty("owner"))
                if (!$util.isString(message.owner))
                    return "owner: string expected";
            if (message.properties != null && message.hasOwnProperty("properties"))
                if (!$util.isString(message.properties))
                    return "properties: string expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!$util.isObject(message.players))
                    return "players: object expected";
                var key = Object.keys(message.players);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.gsm.PlayerInfo.verify(message.players[key[i]]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.createReason != null && message.hasOwnProperty("createReason"))
                switch (message.createReason) {
                default:
                    return "createReason: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.RoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.RoomInfo} RoomInfo
         */
        RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.RoomInfo)
                return object;
            var message = new $root.gsm.RoomInfo();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.serverId != null)
                message.serverId = String(object.serverId);
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            if (object.matchCode != null)
                message.matchCode = String(object.matchCode);
            if (object.maxPlayerNum != null)
                message.maxPlayerNum = object.maxPlayerNum | 0;
            if (object.owner != null)
                message.owner = String(object.owner);
            if (object.properties != null)
                message.properties = String(object.properties);
            if (object.players) {
                if (typeof object.players !== "object")
                    throw TypeError(".gsm.RoomInfo.players: object expected");
                message.players = {};
                for (var keys = Object.keys(object.players), i = 0; i < keys.length; ++i) {
                    if (typeof object.players[keys[i]] !== "object")
                        throw TypeError(".gsm.RoomInfo.players: object expected");
                    message.players[keys[i]] = $root.gsm.PlayerInfo.fromObject(object.players[keys[i]]);
                }
            }
            switch (object.createReason) {
            case "CreateReasonDefault":
            case 0:
                message.createReason = 0;
                break;
            case "CreateReasonPlayer":
            case 1:
                message.createReason = 1;
                break;
            case "CreateReasonMatch":
            case 2:
                message.createReason = 2;
                break;
            }
            if (object.createTime != null)
                if ($util.Long)
                    (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                else if (typeof object.createTime === "string")
                    message.createTime = parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.RoomInfo
         * @static
         * @param {gsm.RoomInfo} message RoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.players = {};
            if (options.defaults) {
                object.roomId = "";
                object.serverId = "";
                object.gameGid = "";
                object.matchCode = "";
                object.maxPlayerNum = 0;
                object.owner = "";
                object.properties = "";
                object.createReason = options.enums === String ? "CreateReasonDefault" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createTime = options.longs === String ? "0" : 0;
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                object.serverId = message.serverId;
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                object.matchCode = message.matchCode;
            if (message.maxPlayerNum != null && message.hasOwnProperty("maxPlayerNum"))
                object.maxPlayerNum = message.maxPlayerNum;
            if (message.owner != null && message.hasOwnProperty("owner"))
                object.owner = message.owner;
            if (message.properties != null && message.hasOwnProperty("properties"))
                object.properties = message.properties;
            var keys2;
            if (message.players && (keys2 = Object.keys(message.players)).length) {
                object.players = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.players[keys2[j]] = $root.gsm.PlayerInfo.toObject(message.players[keys2[j]], options);
            }
            if (message.createReason != null && message.hasOwnProperty("createReason"))
                object.createReason = options.enums === String ? $root.gsm.RoomInfo.CreateReason[message.createReason] : message.createReason;
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (typeof message.createTime === "number")
                    object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
            return object;
        };

        /**
         * Converts this RoomInfo to JSON.
         * @function toJSON
         * @memberof gsm.RoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * CreateReason enum.
         * @name gsm.RoomInfo.CreateReason
         * @enum {number}
         * @property {number} CreateReasonDefault=0 CreateReasonDefault value
         * @property {number} CreateReasonPlayer=1 CreateReasonPlayer value
         * @property {number} CreateReasonMatch=2 CreateReasonMatch value
         */
        RoomInfo.CreateReason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CreateReasonDefault"] = 0;
            values[valuesById[1] = "CreateReasonPlayer"] = 1;
            values[valuesById[2] = "CreateReasonMatch"] = 2;
            return values;
        })();

        return RoomInfo;
    })();

    gsm.CreateRoomRsp = (function() {

        /**
         * Properties of a CreateRoomRsp.
         * @memberof gsm
         * @interface ICreateRoomRsp
         * @property {string|null} [err] CreateRoomRsp err
         * @property {gsm.IRoomInfo|null} [room] CreateRoomRsp room
         */

        /**
         * Constructs a new CreateRoomRsp.
         * @memberof gsm
         * @classdesc Represents a CreateRoomRsp.
         * @implements ICreateRoomRsp
         * @constructor
         * @param {gsm.ICreateRoomRsp=} [properties] Properties to set
         */
        function CreateRoomRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateRoomRsp err.
         * @member {string} err
         * @memberof gsm.CreateRoomRsp
         * @instance
         */
        CreateRoomRsp.prototype.err = "";

        /**
         * CreateRoomRsp room.
         * @member {gsm.IRoomInfo|null|undefined} room
         * @memberof gsm.CreateRoomRsp
         * @instance
         */
        CreateRoomRsp.prototype.room = null;

        /**
         * Creates a new CreateRoomRsp instance using the specified properties.
         * @function create
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {gsm.ICreateRoomRsp=} [properties] Properties to set
         * @returns {gsm.CreateRoomRsp} CreateRoomRsp instance
         */
        CreateRoomRsp.create = function create(properties) {
            return new CreateRoomRsp(properties);
        };

        /**
         * Encodes the specified CreateRoomRsp message. Does not implicitly {@link gsm.CreateRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {gsm.ICreateRoomRsp} message CreateRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoomRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            if (message.room != null && Object.hasOwnProperty.call(message, "room"))
                $root.gsm.RoomInfo.encode(message.room, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CreateRoomRsp message, length delimited. Does not implicitly {@link gsm.CreateRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {gsm.ICreateRoomRsp} message CreateRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CreateRoomRsp} CreateRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CreateRoomRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                case 2:
                    message.room = $root.gsm.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateRoomRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CreateRoomRsp} CreateRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoomRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateRoomRsp message.
         * @function verify
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateRoomRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.room != null && message.hasOwnProperty("room")) {
                var error = $root.gsm.RoomInfo.verify(message.room);
                if (error)
                    return "room." + error;
            }
            return null;
        };

        /**
         * Creates a CreateRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CreateRoomRsp} CreateRoomRsp
         */
        CreateRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CreateRoomRsp)
                return object;
            var message = new $root.gsm.CreateRoomRsp();
            if (object.err != null)
                message.err = String(object.err);
            if (object.room != null) {
                if (typeof object.room !== "object")
                    throw TypeError(".gsm.CreateRoomRsp.room: object expected");
                message.room = $root.gsm.RoomInfo.fromObject(object.room);
            }
            return message;
        };

        /**
         * Creates a plain object from a CreateRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CreateRoomRsp
         * @static
         * @param {gsm.CreateRoomRsp} message CreateRoomRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateRoomRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = "";
                object.room = null;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            if (message.room != null && message.hasOwnProperty("room"))
                object.room = $root.gsm.RoomInfo.toObject(message.room, options);
            return object;
        };

        /**
         * Converts this CreateRoomRsp to JSON.
         * @function toJSON
         * @memberof gsm.CreateRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateRoomRsp;
    })();

    gsm.DismissRoomReq = (function() {

        /**
         * Properties of a DismissRoomReq.
         * @memberof gsm
         * @interface IDismissRoomReq
         * @property {string|null} [gameGid] DismissRoomReq gameGid
         * @property {string|null} [roomId] DismissRoomReq roomId
         * @property {string|null} [openid] DismissRoomReq openid
         * @property {string|null} [serverId] DismissRoomReq serverId
         */

        /**
         * Constructs a new DismissRoomReq.
         * @memberof gsm
         * @classdesc Represents a DismissRoomReq.
         * @implements IDismissRoomReq
         * @constructor
         * @param {gsm.IDismissRoomReq=} [properties] Properties to set
         */
        function DismissRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DismissRoomReq gameGid.
         * @member {string} gameGid
         * @memberof gsm.DismissRoomReq
         * @instance
         */
        DismissRoomReq.prototype.gameGid = "";

        /**
         * DismissRoomReq roomId.
         * @member {string} roomId
         * @memberof gsm.DismissRoomReq
         * @instance
         */
        DismissRoomReq.prototype.roomId = "";

        /**
         * DismissRoomReq openid.
         * @member {string} openid
         * @memberof gsm.DismissRoomReq
         * @instance
         */
        DismissRoomReq.prototype.openid = "";

        /**
         * DismissRoomReq serverId.
         * @member {string} serverId
         * @memberof gsm.DismissRoomReq
         * @instance
         */
        DismissRoomReq.prototype.serverId = "";

        /**
         * Creates a new DismissRoomReq instance using the specified properties.
         * @function create
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {gsm.IDismissRoomReq=} [properties] Properties to set
         * @returns {gsm.DismissRoomReq} DismissRoomReq instance
         */
        DismissRoomReq.create = function create(properties) {
            return new DismissRoomReq(properties);
        };

        /**
         * Encodes the specified DismissRoomReq message. Does not implicitly {@link gsm.DismissRoomReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {gsm.IDismissRoomReq} message DismissRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameGid);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomId);
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.openid);
            if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.serverId);
            return writer;
        };

        /**
         * Encodes the specified DismissRoomReq message, length delimited. Does not implicitly {@link gsm.DismissRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {gsm.IDismissRoomReq} message DismissRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DismissRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.DismissRoomReq} DismissRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.DismissRoomReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameGid = reader.string();
                    break;
                case 2:
                    message.roomId = reader.string();
                    break;
                case 3:
                    message.openid = reader.string();
                    break;
                case 4:
                    message.serverId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DismissRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.DismissRoomReq} DismissRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DismissRoomReq message.
         * @function verify
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DismissRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                if (!$util.isString(message.serverId))
                    return "serverId: string expected";
            return null;
        };

        /**
         * Creates a DismissRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.DismissRoomReq} DismissRoomReq
         */
        DismissRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.DismissRoomReq)
                return object;
            var message = new $root.gsm.DismissRoomReq();
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.serverId != null)
                message.serverId = String(object.serverId);
            return message;
        };

        /**
         * Creates a plain object from a DismissRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.DismissRoomReq
         * @static
         * @param {gsm.DismissRoomReq} message DismissRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DismissRoomReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameGid = "";
                object.roomId = "";
                object.openid = "";
                object.serverId = "";
            }
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                object.serverId = message.serverId;
            return object;
        };

        /**
         * Converts this DismissRoomReq to JSON.
         * @function toJSON
         * @memberof gsm.DismissRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DismissRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DismissRoomReq;
    })();

    gsm.DismissRoomRsp = (function() {

        /**
         * Properties of a DismissRoomRsp.
         * @memberof gsm
         * @interface IDismissRoomRsp
         * @property {string|null} [err] DismissRoomRsp err
         */

        /**
         * Constructs a new DismissRoomRsp.
         * @memberof gsm
         * @classdesc Represents a DismissRoomRsp.
         * @implements IDismissRoomRsp
         * @constructor
         * @param {gsm.IDismissRoomRsp=} [properties] Properties to set
         */
        function DismissRoomRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DismissRoomRsp err.
         * @member {string} err
         * @memberof gsm.DismissRoomRsp
         * @instance
         */
        DismissRoomRsp.prototype.err = "";

        /**
         * Creates a new DismissRoomRsp instance using the specified properties.
         * @function create
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {gsm.IDismissRoomRsp=} [properties] Properties to set
         * @returns {gsm.DismissRoomRsp} DismissRoomRsp instance
         */
        DismissRoomRsp.create = function create(properties) {
            return new DismissRoomRsp(properties);
        };

        /**
         * Encodes the specified DismissRoomRsp message. Does not implicitly {@link gsm.DismissRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {gsm.IDismissRoomRsp} message DismissRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified DismissRoomRsp message, length delimited. Does not implicitly {@link gsm.DismissRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {gsm.IDismissRoomRsp} message DismissRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DismissRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.DismissRoomRsp} DismissRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.DismissRoomRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DismissRoomRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.DismissRoomRsp} DismissRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DismissRoomRsp message.
         * @function verify
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DismissRoomRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates a DismissRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.DismissRoomRsp} DismissRoomRsp
         */
        DismissRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.DismissRoomRsp)
                return object;
            var message = new $root.gsm.DismissRoomRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from a DismissRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.DismissRoomRsp
         * @static
         * @param {gsm.DismissRoomRsp} message DismissRoomRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DismissRoomRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.err = "";
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            return object;
        };

        /**
         * Converts this DismissRoomRsp to JSON.
         * @function toJSON
         * @memberof gsm.DismissRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DismissRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DismissRoomRsp;
    })();

    gsm.AcceptPlayerNot = (function() {

        /**
         * Properties of an AcceptPlayerNot.
         * @memberof gsm
         * @interface IAcceptPlayerNot
         * @property {string|null} [roomId] AcceptPlayerNot roomId
         * @property {string|null} [openid] AcceptPlayerNot openid
         * @property {string|null} [gameGid] AcceptPlayerNot gameGid
         */

        /**
         * Constructs a new AcceptPlayerNot.
         * @memberof gsm
         * @classdesc Represents an AcceptPlayerNot.
         * @implements IAcceptPlayerNot
         * @constructor
         * @param {gsm.IAcceptPlayerNot=} [properties] Properties to set
         */
        function AcceptPlayerNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AcceptPlayerNot roomId.
         * @member {string} roomId
         * @memberof gsm.AcceptPlayerNot
         * @instance
         */
        AcceptPlayerNot.prototype.roomId = "";

        /**
         * AcceptPlayerNot openid.
         * @member {string} openid
         * @memberof gsm.AcceptPlayerNot
         * @instance
         */
        AcceptPlayerNot.prototype.openid = "";

        /**
         * AcceptPlayerNot gameGid.
         * @member {string} gameGid
         * @memberof gsm.AcceptPlayerNot
         * @instance
         */
        AcceptPlayerNot.prototype.gameGid = "";

        /**
         * Creates a new AcceptPlayerNot instance using the specified properties.
         * @function create
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {gsm.IAcceptPlayerNot=} [properties] Properties to set
         * @returns {gsm.AcceptPlayerNot} AcceptPlayerNot instance
         */
        AcceptPlayerNot.create = function create(properties) {
            return new AcceptPlayerNot(properties);
        };

        /**
         * Encodes the specified AcceptPlayerNot message. Does not implicitly {@link gsm.AcceptPlayerNot.verify|verify} messages.
         * @function encode
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {gsm.IAcceptPlayerNot} message AcceptPlayerNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptPlayerNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.openid);
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.gameGid);
            return writer;
        };

        /**
         * Encodes the specified AcceptPlayerNot message, length delimited. Does not implicitly {@link gsm.AcceptPlayerNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {gsm.IAcceptPlayerNot} message AcceptPlayerNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptPlayerNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AcceptPlayerNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.AcceptPlayerNot} AcceptPlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptPlayerNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.AcceptPlayerNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.openid = reader.string();
                    break;
                case 3:
                    message.gameGid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AcceptPlayerNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.AcceptPlayerNot} AcceptPlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptPlayerNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AcceptPlayerNot message.
         * @function verify
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AcceptPlayerNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            return null;
        };

        /**
         * Creates an AcceptPlayerNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.AcceptPlayerNot} AcceptPlayerNot
         */
        AcceptPlayerNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.AcceptPlayerNot)
                return object;
            var message = new $root.gsm.AcceptPlayerNot();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            return message;
        };

        /**
         * Creates a plain object from an AcceptPlayerNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.AcceptPlayerNot
         * @static
         * @param {gsm.AcceptPlayerNot} message AcceptPlayerNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AcceptPlayerNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roomId = "";
                object.openid = "";
                object.gameGid = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            return object;
        };

        /**
         * Converts this AcceptPlayerNot to JSON.
         * @function toJSON
         * @memberof gsm.AcceptPlayerNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AcceptPlayerNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AcceptPlayerNot;
    })();

    gsm.RemovePlayerNot = (function() {

        /**
         * Properties of a RemovePlayerNot.
         * @memberof gsm
         * @interface IRemovePlayerNot
         * @property {string|null} [roomId] RemovePlayerNot roomId
         * @property {string|null} [openid] RemovePlayerNot openid
         * @property {string|null} [gameGid] RemovePlayerNot gameGid
         */

        /**
         * Constructs a new RemovePlayerNot.
         * @memberof gsm
         * @classdesc Represents a RemovePlayerNot.
         * @implements IRemovePlayerNot
         * @constructor
         * @param {gsm.IRemovePlayerNot=} [properties] Properties to set
         */
        function RemovePlayerNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RemovePlayerNot roomId.
         * @member {string} roomId
         * @memberof gsm.RemovePlayerNot
         * @instance
         */
        RemovePlayerNot.prototype.roomId = "";

        /**
         * RemovePlayerNot openid.
         * @member {string} openid
         * @memberof gsm.RemovePlayerNot
         * @instance
         */
        RemovePlayerNot.prototype.openid = "";

        /**
         * RemovePlayerNot gameGid.
         * @member {string} gameGid
         * @memberof gsm.RemovePlayerNot
         * @instance
         */
        RemovePlayerNot.prototype.gameGid = "";

        /**
         * Creates a new RemovePlayerNot instance using the specified properties.
         * @function create
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {gsm.IRemovePlayerNot=} [properties] Properties to set
         * @returns {gsm.RemovePlayerNot} RemovePlayerNot instance
         */
        RemovePlayerNot.create = function create(properties) {
            return new RemovePlayerNot(properties);
        };

        /**
         * Encodes the specified RemovePlayerNot message. Does not implicitly {@link gsm.RemovePlayerNot.verify|verify} messages.
         * @function encode
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {gsm.IRemovePlayerNot} message RemovePlayerNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemovePlayerNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.openid);
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.gameGid);
            return writer;
        };

        /**
         * Encodes the specified RemovePlayerNot message, length delimited. Does not implicitly {@link gsm.RemovePlayerNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {gsm.IRemovePlayerNot} message RemovePlayerNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemovePlayerNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RemovePlayerNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.RemovePlayerNot} RemovePlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemovePlayerNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.RemovePlayerNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.openid = reader.string();
                    break;
                case 3:
                    message.gameGid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RemovePlayerNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.RemovePlayerNot} RemovePlayerNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemovePlayerNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemovePlayerNot message.
         * @function verify
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemovePlayerNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            return null;
        };

        /**
         * Creates a RemovePlayerNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.RemovePlayerNot} RemovePlayerNot
         */
        RemovePlayerNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.RemovePlayerNot)
                return object;
            var message = new $root.gsm.RemovePlayerNot();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            return message;
        };

        /**
         * Creates a plain object from a RemovePlayerNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.RemovePlayerNot
         * @static
         * @param {gsm.RemovePlayerNot} message RemovePlayerNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemovePlayerNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roomId = "";
                object.openid = "";
                object.gameGid = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            return object;
        };

        /**
         * Converts this RemovePlayerNot to JSON.
         * @function toJSON
         * @memberof gsm.RemovePlayerNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemovePlayerNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RemovePlayerNot;
    })();

    gsm.MatchPlayerInfo = (function() {

        /**
         * Properties of a MatchPlayerInfo.
         * @memberof gsm
         * @interface IMatchPlayerInfo
         * @property {string|null} [openid] MatchPlayerInfo openid
         * @property {Object.<string,string>|null} [tags] MatchPlayerInfo tags
         */

        /**
         * Constructs a new MatchPlayerInfo.
         * @memberof gsm
         * @classdesc Represents a MatchPlayerInfo.
         * @implements IMatchPlayerInfo
         * @constructor
         * @param {gsm.IMatchPlayerInfo=} [properties] Properties to set
         */
        function MatchPlayerInfo(properties) {
            this.tags = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchPlayerInfo openid.
         * @member {string} openid
         * @memberof gsm.MatchPlayerInfo
         * @instance
         */
        MatchPlayerInfo.prototype.openid = "";

        /**
         * MatchPlayerInfo tags.
         * @member {Object.<string,string>} tags
         * @memberof gsm.MatchPlayerInfo
         * @instance
         */
        MatchPlayerInfo.prototype.tags = $util.emptyObject;

        /**
         * Creates a new MatchPlayerInfo instance using the specified properties.
         * @function create
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {gsm.IMatchPlayerInfo=} [properties] Properties to set
         * @returns {gsm.MatchPlayerInfo} MatchPlayerInfo instance
         */
        MatchPlayerInfo.create = function create(properties) {
            return new MatchPlayerInfo(properties);
        };

        /**
         * Encodes the specified MatchPlayerInfo message. Does not implicitly {@link gsm.MatchPlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {gsm.IMatchPlayerInfo} message MatchPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchPlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.tags != null && Object.hasOwnProperty.call(message, "tags"))
                for (var keys = Object.keys(message.tags), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.tags[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MatchPlayerInfo message, length delimited. Does not implicitly {@link gsm.MatchPlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {gsm.IMatchPlayerInfo} message MatchPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchPlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchPlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.MatchPlayerInfo} MatchPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchPlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.MatchPlayerInfo(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    if (message.tags === $util.emptyObject)
                        message.tags = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = "";
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.string();
                            break;
                        case 2:
                            value = reader.string();
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.tags[key] = value;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchPlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.MatchPlayerInfo} MatchPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchPlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchPlayerInfo message.
         * @function verify
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchPlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.tags != null && message.hasOwnProperty("tags")) {
                if (!$util.isObject(message.tags))
                    return "tags: object expected";
                var key = Object.keys(message.tags);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.tags[key[i]]))
                        return "tags: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a MatchPlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.MatchPlayerInfo} MatchPlayerInfo
         */
        MatchPlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.MatchPlayerInfo)
                return object;
            var message = new $root.gsm.MatchPlayerInfo();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.tags) {
                if (typeof object.tags !== "object")
                    throw TypeError(".gsm.MatchPlayerInfo.tags: object expected");
                message.tags = {};
                for (var keys = Object.keys(object.tags), i = 0; i < keys.length; ++i)
                    message.tags[keys[i]] = String(object.tags[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchPlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.MatchPlayerInfo
         * @static
         * @param {gsm.MatchPlayerInfo} message MatchPlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchPlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.tags = {};
            if (options.defaults)
                object.openid = "";
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            var keys2;
            if (message.tags && (keys2 = Object.keys(message.tags)).length) {
                object.tags = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.tags[keys2[j]] = message.tags[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this MatchPlayerInfo to JSON.
         * @function toJSON
         * @memberof gsm.MatchPlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchPlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MatchPlayerInfo;
    })();

    gsm.StartMatchingReq = (function() {

        /**
         * Properties of a StartMatchingReq.
         * @memberof gsm
         * @interface IStartMatchingReq
         * @property {string|null} [matchCode] StartMatchingReq matchCode
         * @property {string|null} [matchTicket] StartMatchingReq matchTicket
         * @property {Array.<gsm.IMatchPlayerInfo>|null} [players] StartMatchingReq players
         */

        /**
         * Constructs a new StartMatchingReq.
         * @memberof gsm
         * @classdesc Represents a StartMatchingReq.
         * @implements IStartMatchingReq
         * @constructor
         * @param {gsm.IStartMatchingReq=} [properties] Properties to set
         */
        function StartMatchingReq(properties) {
            this.players = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StartMatchingReq matchCode.
         * @member {string} matchCode
         * @memberof gsm.StartMatchingReq
         * @instance
         */
        StartMatchingReq.prototype.matchCode = "";

        /**
         * StartMatchingReq matchTicket.
         * @member {string} matchTicket
         * @memberof gsm.StartMatchingReq
         * @instance
         */
        StartMatchingReq.prototype.matchTicket = "";

        /**
         * StartMatchingReq players.
         * @member {Array.<gsm.IMatchPlayerInfo>} players
         * @memberof gsm.StartMatchingReq
         * @instance
         */
        StartMatchingReq.prototype.players = $util.emptyArray;

        /**
         * Creates a new StartMatchingReq instance using the specified properties.
         * @function create
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {gsm.IStartMatchingReq=} [properties] Properties to set
         * @returns {gsm.StartMatchingReq} StartMatchingReq instance
         */
        StartMatchingReq.create = function create(properties) {
            return new StartMatchingReq(properties);
        };

        /**
         * Encodes the specified StartMatchingReq message. Does not implicitly {@link gsm.StartMatchingReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {gsm.IStartMatchingReq} message StartMatchingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartMatchingReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.matchCode != null && Object.hasOwnProperty.call(message, "matchCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.matchCode);
            if (message.matchTicket != null && Object.hasOwnProperty.call(message, "matchTicket"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.matchTicket);
            if (message.players != null && message.players.length)
                for (var i = 0; i < message.players.length; ++i)
                    $root.gsm.MatchPlayerInfo.encode(message.players[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified StartMatchingReq message, length delimited. Does not implicitly {@link gsm.StartMatchingReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {gsm.IStartMatchingReq} message StartMatchingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartMatchingReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartMatchingReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.StartMatchingReq} StartMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartMatchingReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.StartMatchingReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.matchCode = reader.string();
                    break;
                case 2:
                    message.matchTicket = reader.string();
                    break;
                case 3:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.gsm.MatchPlayerInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StartMatchingReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.StartMatchingReq} StartMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartMatchingReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartMatchingReq message.
         * @function verify
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartMatchingReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                if (!$util.isString(message.matchCode))
                    return "matchCode: string expected";
            if (message.matchTicket != null && message.hasOwnProperty("matchTicket"))
                if (!$util.isString(message.matchTicket))
                    return "matchTicket: string expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (var i = 0; i < message.players.length; ++i) {
                    var error = $root.gsm.MatchPlayerInfo.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates a StartMatchingReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.StartMatchingReq} StartMatchingReq
         */
        StartMatchingReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.StartMatchingReq)
                return object;
            var message = new $root.gsm.StartMatchingReq();
            if (object.matchCode != null)
                message.matchCode = String(object.matchCode);
            if (object.matchTicket != null)
                message.matchTicket = String(object.matchTicket);
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".gsm.StartMatchingReq.players: array expected");
                message.players = [];
                for (var i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".gsm.StartMatchingReq.players: object expected");
                    message.players[i] = $root.gsm.MatchPlayerInfo.fromObject(object.players[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a StartMatchingReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.StartMatchingReq
         * @static
         * @param {gsm.StartMatchingReq} message StartMatchingReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartMatchingReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (options.defaults) {
                object.matchCode = "";
                object.matchTicket = "";
            }
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                object.matchCode = message.matchCode;
            if (message.matchTicket != null && message.hasOwnProperty("matchTicket"))
                object.matchTicket = message.matchTicket;
            if (message.players && message.players.length) {
                object.players = [];
                for (var j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.gsm.MatchPlayerInfo.toObject(message.players[j], options);
            }
            return object;
        };

        /**
         * Converts this StartMatchingReq to JSON.
         * @function toJSON
         * @memberof gsm.StartMatchingReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartMatchingReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartMatchingReq;
    })();

    gsm.StartMatchingRsp = (function() {

        /**
         * Properties of a StartMatchingRsp.
         * @memberof gsm
         * @interface IStartMatchingRsp
         * @property {string|null} [err] StartMatchingRsp err
         * @property {string|null} [matchTicket] StartMatchingRsp matchTicket
         */

        /**
         * Constructs a new StartMatchingRsp.
         * @memberof gsm
         * @classdesc Represents a StartMatchingRsp.
         * @implements IStartMatchingRsp
         * @constructor
         * @param {gsm.IStartMatchingRsp=} [properties] Properties to set
         */
        function StartMatchingRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StartMatchingRsp err.
         * @member {string} err
         * @memberof gsm.StartMatchingRsp
         * @instance
         */
        StartMatchingRsp.prototype.err = "";

        /**
         * StartMatchingRsp matchTicket.
         * @member {string} matchTicket
         * @memberof gsm.StartMatchingRsp
         * @instance
         */
        StartMatchingRsp.prototype.matchTicket = "";

        /**
         * Creates a new StartMatchingRsp instance using the specified properties.
         * @function create
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {gsm.IStartMatchingRsp=} [properties] Properties to set
         * @returns {gsm.StartMatchingRsp} StartMatchingRsp instance
         */
        StartMatchingRsp.create = function create(properties) {
            return new StartMatchingRsp(properties);
        };

        /**
         * Encodes the specified StartMatchingRsp message. Does not implicitly {@link gsm.StartMatchingRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {gsm.IStartMatchingRsp} message StartMatchingRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartMatchingRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            if (message.matchTicket != null && Object.hasOwnProperty.call(message, "matchTicket"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.matchTicket);
            return writer;
        };

        /**
         * Encodes the specified StartMatchingRsp message, length delimited. Does not implicitly {@link gsm.StartMatchingRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {gsm.IStartMatchingRsp} message StartMatchingRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartMatchingRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartMatchingRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.StartMatchingRsp} StartMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartMatchingRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.StartMatchingRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                case 2:
                    message.matchTicket = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StartMatchingRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.StartMatchingRsp} StartMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartMatchingRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartMatchingRsp message.
         * @function verify
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartMatchingRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.matchTicket != null && message.hasOwnProperty("matchTicket"))
                if (!$util.isString(message.matchTicket))
                    return "matchTicket: string expected";
            return null;
        };

        /**
         * Creates a StartMatchingRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.StartMatchingRsp} StartMatchingRsp
         */
        StartMatchingRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.StartMatchingRsp)
                return object;
            var message = new $root.gsm.StartMatchingRsp();
            if (object.err != null)
                message.err = String(object.err);
            if (object.matchTicket != null)
                message.matchTicket = String(object.matchTicket);
            return message;
        };

        /**
         * Creates a plain object from a StartMatchingRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.StartMatchingRsp
         * @static
         * @param {gsm.StartMatchingRsp} message StartMatchingRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartMatchingRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = "";
                object.matchTicket = "";
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            if (message.matchTicket != null && message.hasOwnProperty("matchTicket"))
                object.matchTicket = message.matchTicket;
            return object;
        };

        /**
         * Converts this StartMatchingRsp to JSON.
         * @function toJSON
         * @memberof gsm.StartMatchingRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartMatchingRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartMatchingRsp;
    })();

    gsm.CancelMatchingReq = (function() {

        /**
         * Properties of a CancelMatchingReq.
         * @memberof gsm
         * @interface ICancelMatchingReq
         * @property {string|null} [matchCode] CancelMatchingReq matchCode
         * @property {string|null} [matchTicket] CancelMatchingReq matchTicket
         */

        /**
         * Constructs a new CancelMatchingReq.
         * @memberof gsm
         * @classdesc Represents a CancelMatchingReq.
         * @implements ICancelMatchingReq
         * @constructor
         * @param {gsm.ICancelMatchingReq=} [properties] Properties to set
         */
        function CancelMatchingReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CancelMatchingReq matchCode.
         * @member {string} matchCode
         * @memberof gsm.CancelMatchingReq
         * @instance
         */
        CancelMatchingReq.prototype.matchCode = "";

        /**
         * CancelMatchingReq matchTicket.
         * @member {string} matchTicket
         * @memberof gsm.CancelMatchingReq
         * @instance
         */
        CancelMatchingReq.prototype.matchTicket = "";

        /**
         * Creates a new CancelMatchingReq instance using the specified properties.
         * @function create
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {gsm.ICancelMatchingReq=} [properties] Properties to set
         * @returns {gsm.CancelMatchingReq} CancelMatchingReq instance
         */
        CancelMatchingReq.create = function create(properties) {
            return new CancelMatchingReq(properties);
        };

        /**
         * Encodes the specified CancelMatchingReq message. Does not implicitly {@link gsm.CancelMatchingReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {gsm.ICancelMatchingReq} message CancelMatchingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchingReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.matchCode != null && Object.hasOwnProperty.call(message, "matchCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.matchCode);
            if (message.matchTicket != null && Object.hasOwnProperty.call(message, "matchTicket"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.matchTicket);
            return writer;
        };

        /**
         * Encodes the specified CancelMatchingReq message, length delimited. Does not implicitly {@link gsm.CancelMatchingReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {gsm.ICancelMatchingReq} message CancelMatchingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchingReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelMatchingReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CancelMatchingReq} CancelMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchingReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CancelMatchingReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.matchCode = reader.string();
                    break;
                case 2:
                    message.matchTicket = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CancelMatchingReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CancelMatchingReq} CancelMatchingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchingReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelMatchingReq message.
         * @function verify
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelMatchingReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                if (!$util.isString(message.matchCode))
                    return "matchCode: string expected";
            if (message.matchTicket != null && message.hasOwnProperty("matchTicket"))
                if (!$util.isString(message.matchTicket))
                    return "matchTicket: string expected";
            return null;
        };

        /**
         * Creates a CancelMatchingReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CancelMatchingReq} CancelMatchingReq
         */
        CancelMatchingReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CancelMatchingReq)
                return object;
            var message = new $root.gsm.CancelMatchingReq();
            if (object.matchCode != null)
                message.matchCode = String(object.matchCode);
            if (object.matchTicket != null)
                message.matchTicket = String(object.matchTicket);
            return message;
        };

        /**
         * Creates a plain object from a CancelMatchingReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CancelMatchingReq
         * @static
         * @param {gsm.CancelMatchingReq} message CancelMatchingReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelMatchingReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.matchCode = "";
                object.matchTicket = "";
            }
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                object.matchCode = message.matchCode;
            if (message.matchTicket != null && message.hasOwnProperty("matchTicket"))
                object.matchTicket = message.matchTicket;
            return object;
        };

        /**
         * Converts this CancelMatchingReq to JSON.
         * @function toJSON
         * @memberof gsm.CancelMatchingReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelMatchingReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CancelMatchingReq;
    })();

    gsm.CancelMatchingRsp = (function() {

        /**
         * Properties of a CancelMatchingRsp.
         * @memberof gsm
         * @interface ICancelMatchingRsp
         * @property {string|null} [err] CancelMatchingRsp err
         */

        /**
         * Constructs a new CancelMatchingRsp.
         * @memberof gsm
         * @classdesc Represents a CancelMatchingRsp.
         * @implements ICancelMatchingRsp
         * @constructor
         * @param {gsm.ICancelMatchingRsp=} [properties] Properties to set
         */
        function CancelMatchingRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CancelMatchingRsp err.
         * @member {string} err
         * @memberof gsm.CancelMatchingRsp
         * @instance
         */
        CancelMatchingRsp.prototype.err = "";

        /**
         * Creates a new CancelMatchingRsp instance using the specified properties.
         * @function create
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {gsm.ICancelMatchingRsp=} [properties] Properties to set
         * @returns {gsm.CancelMatchingRsp} CancelMatchingRsp instance
         */
        CancelMatchingRsp.create = function create(properties) {
            return new CancelMatchingRsp(properties);
        };

        /**
         * Encodes the specified CancelMatchingRsp message. Does not implicitly {@link gsm.CancelMatchingRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {gsm.ICancelMatchingRsp} message CancelMatchingRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchingRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified CancelMatchingRsp message, length delimited. Does not implicitly {@link gsm.CancelMatchingRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {gsm.ICancelMatchingRsp} message CancelMatchingRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchingRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelMatchingRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CancelMatchingRsp} CancelMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchingRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CancelMatchingRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CancelMatchingRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CancelMatchingRsp} CancelMatchingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchingRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelMatchingRsp message.
         * @function verify
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelMatchingRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates a CancelMatchingRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CancelMatchingRsp} CancelMatchingRsp
         */
        CancelMatchingRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CancelMatchingRsp)
                return object;
            var message = new $root.gsm.CancelMatchingRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from a CancelMatchingRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CancelMatchingRsp
         * @static
         * @param {gsm.CancelMatchingRsp} message CancelMatchingRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelMatchingRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.err = "";
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            return object;
        };

        /**
         * Converts this CancelMatchingRsp to JSON.
         * @function toJSON
         * @memberof gsm.CancelMatchingRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelMatchingRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CancelMatchingRsp;
    })();

    gsm.DismissRoomNot = (function() {

        /**
         * Properties of a DismissRoomNot.
         * @memberof gsm
         * @interface IDismissRoomNot
         * @property {string|null} [gameGid] DismissRoomNot gameGid
         * @property {string|null} [roomId] DismissRoomNot roomId
         */

        /**
         * Constructs a new DismissRoomNot.
         * @memberof gsm
         * @classdesc Represents a DismissRoomNot.
         * @implements IDismissRoomNot
         * @constructor
         * @param {gsm.IDismissRoomNot=} [properties] Properties to set
         */
        function DismissRoomNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DismissRoomNot gameGid.
         * @member {string} gameGid
         * @memberof gsm.DismissRoomNot
         * @instance
         */
        DismissRoomNot.prototype.gameGid = "";

        /**
         * DismissRoomNot roomId.
         * @member {string} roomId
         * @memberof gsm.DismissRoomNot
         * @instance
         */
        DismissRoomNot.prototype.roomId = "";

        /**
         * Creates a new DismissRoomNot instance using the specified properties.
         * @function create
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {gsm.IDismissRoomNot=} [properties] Properties to set
         * @returns {gsm.DismissRoomNot} DismissRoomNot instance
         */
        DismissRoomNot.create = function create(properties) {
            return new DismissRoomNot(properties);
        };

        /**
         * Encodes the specified DismissRoomNot message. Does not implicitly {@link gsm.DismissRoomNot.verify|verify} messages.
         * @function encode
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {gsm.IDismissRoomNot} message DismissRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameGid);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified DismissRoomNot message, length delimited. Does not implicitly {@link gsm.DismissRoomNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {gsm.IDismissRoomNot} message DismissRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DismissRoomNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.DismissRoomNot} DismissRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.DismissRoomNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameGid = reader.string();
                    break;
                case 2:
                    message.roomId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DismissRoomNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.DismissRoomNot} DismissRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DismissRoomNot message.
         * @function verify
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DismissRoomNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            return null;
        };

        /**
         * Creates a DismissRoomNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.DismissRoomNot} DismissRoomNot
         */
        DismissRoomNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.DismissRoomNot)
                return object;
            var message = new $root.gsm.DismissRoomNot();
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            return message;
        };

        /**
         * Creates a plain object from a DismissRoomNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.DismissRoomNot
         * @static
         * @param {gsm.DismissRoomNot} message DismissRoomNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DismissRoomNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameGid = "";
                object.roomId = "";
            }
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this DismissRoomNot to JSON.
         * @function toJSON
         * @memberof gsm.DismissRoomNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DismissRoomNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DismissRoomNot;
    })();

    gsm.CheckRoomExistsReq = (function() {

        /**
         * Properties of a CheckRoomExistsReq.
         * @memberof gsm
         * @interface ICheckRoomExistsReq
         * @property {string|null} [roomId] CheckRoomExistsReq roomId
         * @property {string|null} [serverId] CheckRoomExistsReq serverId
         * @property {string|null} [gameGid] CheckRoomExistsReq gameGid
         */

        /**
         * Constructs a new CheckRoomExistsReq.
         * @memberof gsm
         * @classdesc Represents a CheckRoomExistsReq.
         * @implements ICheckRoomExistsReq
         * @constructor
         * @param {gsm.ICheckRoomExistsReq=} [properties] Properties to set
         */
        function CheckRoomExistsReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CheckRoomExistsReq roomId.
         * @member {string} roomId
         * @memberof gsm.CheckRoomExistsReq
         * @instance
         */
        CheckRoomExistsReq.prototype.roomId = "";

        /**
         * CheckRoomExistsReq serverId.
         * @member {string} serverId
         * @memberof gsm.CheckRoomExistsReq
         * @instance
         */
        CheckRoomExistsReq.prototype.serverId = "";

        /**
         * CheckRoomExistsReq gameGid.
         * @member {string} gameGid
         * @memberof gsm.CheckRoomExistsReq
         * @instance
         */
        CheckRoomExistsReq.prototype.gameGid = "";

        /**
         * Creates a new CheckRoomExistsReq instance using the specified properties.
         * @function create
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {gsm.ICheckRoomExistsReq=} [properties] Properties to set
         * @returns {gsm.CheckRoomExistsReq} CheckRoomExistsReq instance
         */
        CheckRoomExistsReq.create = function create(properties) {
            return new CheckRoomExistsReq(properties);
        };

        /**
         * Encodes the specified CheckRoomExistsReq message. Does not implicitly {@link gsm.CheckRoomExistsReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {gsm.ICheckRoomExistsReq} message CheckRoomExistsReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckRoomExistsReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverId);
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.gameGid);
            return writer;
        };

        /**
         * Encodes the specified CheckRoomExistsReq message, length delimited. Does not implicitly {@link gsm.CheckRoomExistsReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {gsm.ICheckRoomExistsReq} message CheckRoomExistsReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckRoomExistsReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CheckRoomExistsReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CheckRoomExistsReq} CheckRoomExistsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckRoomExistsReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CheckRoomExistsReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.serverId = reader.string();
                    break;
                case 3:
                    message.gameGid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CheckRoomExistsReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CheckRoomExistsReq} CheckRoomExistsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckRoomExistsReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CheckRoomExistsReq message.
         * @function verify
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CheckRoomExistsReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                if (!$util.isString(message.serverId))
                    return "serverId: string expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            return null;
        };

        /**
         * Creates a CheckRoomExistsReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CheckRoomExistsReq} CheckRoomExistsReq
         */
        CheckRoomExistsReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CheckRoomExistsReq)
                return object;
            var message = new $root.gsm.CheckRoomExistsReq();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.serverId != null)
                message.serverId = String(object.serverId);
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            return message;
        };

        /**
         * Creates a plain object from a CheckRoomExistsReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CheckRoomExistsReq
         * @static
         * @param {gsm.CheckRoomExistsReq} message CheckRoomExistsReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CheckRoomExistsReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roomId = "";
                object.serverId = "";
                object.gameGid = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                object.serverId = message.serverId;
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            return object;
        };

        /**
         * Converts this CheckRoomExistsReq to JSON.
         * @function toJSON
         * @memberof gsm.CheckRoomExistsReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CheckRoomExistsReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CheckRoomExistsReq;
    })();

    gsm.CheckRoomExistsRsp = (function() {

        /**
         * Properties of a CheckRoomExistsRsp.
         * @memberof gsm
         * @interface ICheckRoomExistsRsp
         * @property {boolean|null} [exists] CheckRoomExistsRsp exists
         */

        /**
         * Constructs a new CheckRoomExistsRsp.
         * @memberof gsm
         * @classdesc Represents a CheckRoomExistsRsp.
         * @implements ICheckRoomExistsRsp
         * @constructor
         * @param {gsm.ICheckRoomExistsRsp=} [properties] Properties to set
         */
        function CheckRoomExistsRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CheckRoomExistsRsp exists.
         * @member {boolean} exists
         * @memberof gsm.CheckRoomExistsRsp
         * @instance
         */
        CheckRoomExistsRsp.prototype.exists = false;

        /**
         * Creates a new CheckRoomExistsRsp instance using the specified properties.
         * @function create
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {gsm.ICheckRoomExistsRsp=} [properties] Properties to set
         * @returns {gsm.CheckRoomExistsRsp} CheckRoomExistsRsp instance
         */
        CheckRoomExistsRsp.create = function create(properties) {
            return new CheckRoomExistsRsp(properties);
        };

        /**
         * Encodes the specified CheckRoomExistsRsp message. Does not implicitly {@link gsm.CheckRoomExistsRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {gsm.ICheckRoomExistsRsp} message CheckRoomExistsRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckRoomExistsRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.exists != null && Object.hasOwnProperty.call(message, "exists"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.exists);
            return writer;
        };

        /**
         * Encodes the specified CheckRoomExistsRsp message, length delimited. Does not implicitly {@link gsm.CheckRoomExistsRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {gsm.ICheckRoomExistsRsp} message CheckRoomExistsRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckRoomExistsRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CheckRoomExistsRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CheckRoomExistsRsp} CheckRoomExistsRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckRoomExistsRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CheckRoomExistsRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.exists = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CheckRoomExistsRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CheckRoomExistsRsp} CheckRoomExistsRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckRoomExistsRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CheckRoomExistsRsp message.
         * @function verify
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CheckRoomExistsRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.exists != null && message.hasOwnProperty("exists"))
                if (typeof message.exists !== "boolean")
                    return "exists: boolean expected";
            return null;
        };

        /**
         * Creates a CheckRoomExistsRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CheckRoomExistsRsp} CheckRoomExistsRsp
         */
        CheckRoomExistsRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CheckRoomExistsRsp)
                return object;
            var message = new $root.gsm.CheckRoomExistsRsp();
            if (object.exists != null)
                message.exists = Boolean(object.exists);
            return message;
        };

        /**
         * Creates a plain object from a CheckRoomExistsRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CheckRoomExistsRsp
         * @static
         * @param {gsm.CheckRoomExistsRsp} message CheckRoomExistsRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CheckRoomExistsRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.exists = false;
            if (message.exists != null && message.hasOwnProperty("exists"))
                object.exists = message.exists;
            return object;
        };

        /**
         * Converts this CheckRoomExistsRsp to JSON.
         * @function toJSON
         * @memberof gsm.CheckRoomExistsRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CheckRoomExistsRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CheckRoomExistsRsp;
    })();

    gsm.GetRoomInfoReq = (function() {

        /**
         * Properties of a GetRoomInfoReq.
         * @memberof gsm
         * @interface IGetRoomInfoReq
         * @property {string|null} [roomId] GetRoomInfoReq roomId
         * @property {string|null} [serverId] GetRoomInfoReq serverId
         */

        /**
         * Constructs a new GetRoomInfoReq.
         * @memberof gsm
         * @classdesc Represents a GetRoomInfoReq.
         * @implements IGetRoomInfoReq
         * @constructor
         * @param {gsm.IGetRoomInfoReq=} [properties] Properties to set
         */
        function GetRoomInfoReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetRoomInfoReq roomId.
         * @member {string} roomId
         * @memberof gsm.GetRoomInfoReq
         * @instance
         */
        GetRoomInfoReq.prototype.roomId = "";

        /**
         * GetRoomInfoReq serverId.
         * @member {string} serverId
         * @memberof gsm.GetRoomInfoReq
         * @instance
         */
        GetRoomInfoReq.prototype.serverId = "";

        /**
         * Creates a new GetRoomInfoReq instance using the specified properties.
         * @function create
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {gsm.IGetRoomInfoReq=} [properties] Properties to set
         * @returns {gsm.GetRoomInfoReq} GetRoomInfoReq instance
         */
        GetRoomInfoReq.create = function create(properties) {
            return new GetRoomInfoReq(properties);
        };

        /**
         * Encodes the specified GetRoomInfoReq message. Does not implicitly {@link gsm.GetRoomInfoReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {gsm.IGetRoomInfoReq} message GetRoomInfoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomInfoReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverId);
            return writer;
        };

        /**
         * Encodes the specified GetRoomInfoReq message, length delimited. Does not implicitly {@link gsm.GetRoomInfoReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {gsm.IGetRoomInfoReq} message GetRoomInfoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomInfoReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetRoomInfoReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.GetRoomInfoReq} GetRoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomInfoReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.GetRoomInfoReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.serverId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetRoomInfoReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.GetRoomInfoReq} GetRoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomInfoReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetRoomInfoReq message.
         * @function verify
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetRoomInfoReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                if (!$util.isString(message.serverId))
                    return "serverId: string expected";
            return null;
        };

        /**
         * Creates a GetRoomInfoReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.GetRoomInfoReq} GetRoomInfoReq
         */
        GetRoomInfoReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.GetRoomInfoReq)
                return object;
            var message = new $root.gsm.GetRoomInfoReq();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.serverId != null)
                message.serverId = String(object.serverId);
            return message;
        };

        /**
         * Creates a plain object from a GetRoomInfoReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.GetRoomInfoReq
         * @static
         * @param {gsm.GetRoomInfoReq} message GetRoomInfoReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetRoomInfoReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roomId = "";
                object.serverId = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                object.serverId = message.serverId;
            return object;
        };

        /**
         * Converts this GetRoomInfoReq to JSON.
         * @function toJSON
         * @memberof gsm.GetRoomInfoReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetRoomInfoReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetRoomInfoReq;
    })();

    gsm.GetRoomInfoRsp = (function() {

        /**
         * Properties of a GetRoomInfoRsp.
         * @memberof gsm
         * @interface IGetRoomInfoRsp
         * @property {string|null} [err] GetRoomInfoRsp err
         * @property {gsm.IRoomInfo|null} [room] GetRoomInfoRsp room
         */

        /**
         * Constructs a new GetRoomInfoRsp.
         * @memberof gsm
         * @classdesc Represents a GetRoomInfoRsp.
         * @implements IGetRoomInfoRsp
         * @constructor
         * @param {gsm.IGetRoomInfoRsp=} [properties] Properties to set
         */
        function GetRoomInfoRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetRoomInfoRsp err.
         * @member {string} err
         * @memberof gsm.GetRoomInfoRsp
         * @instance
         */
        GetRoomInfoRsp.prototype.err = "";

        /**
         * GetRoomInfoRsp room.
         * @member {gsm.IRoomInfo|null|undefined} room
         * @memberof gsm.GetRoomInfoRsp
         * @instance
         */
        GetRoomInfoRsp.prototype.room = null;

        /**
         * Creates a new GetRoomInfoRsp instance using the specified properties.
         * @function create
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {gsm.IGetRoomInfoRsp=} [properties] Properties to set
         * @returns {gsm.GetRoomInfoRsp} GetRoomInfoRsp instance
         */
        GetRoomInfoRsp.create = function create(properties) {
            return new GetRoomInfoRsp(properties);
        };

        /**
         * Encodes the specified GetRoomInfoRsp message. Does not implicitly {@link gsm.GetRoomInfoRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {gsm.IGetRoomInfoRsp} message GetRoomInfoRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomInfoRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            if (message.room != null && Object.hasOwnProperty.call(message, "room"))
                $root.gsm.RoomInfo.encode(message.room, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetRoomInfoRsp message, length delimited. Does not implicitly {@link gsm.GetRoomInfoRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {gsm.IGetRoomInfoRsp} message GetRoomInfoRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomInfoRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetRoomInfoRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.GetRoomInfoRsp} GetRoomInfoRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomInfoRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.GetRoomInfoRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                case 2:
                    message.room = $root.gsm.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetRoomInfoRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.GetRoomInfoRsp} GetRoomInfoRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomInfoRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetRoomInfoRsp message.
         * @function verify
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetRoomInfoRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.room != null && message.hasOwnProperty("room")) {
                var error = $root.gsm.RoomInfo.verify(message.room);
                if (error)
                    return "room." + error;
            }
            return null;
        };

        /**
         * Creates a GetRoomInfoRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.GetRoomInfoRsp} GetRoomInfoRsp
         */
        GetRoomInfoRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.GetRoomInfoRsp)
                return object;
            var message = new $root.gsm.GetRoomInfoRsp();
            if (object.err != null)
                message.err = String(object.err);
            if (object.room != null) {
                if (typeof object.room !== "object")
                    throw TypeError(".gsm.GetRoomInfoRsp.room: object expected");
                message.room = $root.gsm.RoomInfo.fromObject(object.room);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetRoomInfoRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.GetRoomInfoRsp
         * @static
         * @param {gsm.GetRoomInfoRsp} message GetRoomInfoRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetRoomInfoRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = "";
                object.room = null;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            if (message.room != null && message.hasOwnProperty("room"))
                object.room = $root.gsm.RoomInfo.toObject(message.room, options);
            return object;
        };

        /**
         * Converts this GetRoomInfoRsp to JSON.
         * @function toJSON
         * @memberof gsm.GetRoomInfoRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetRoomInfoRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetRoomInfoRsp;
    })();

    gsm.GetMyRoomReq = (function() {

        /**
         * Properties of a GetMyRoomReq.
         * @memberof gsm
         * @interface IGetMyRoomReq
         */

        /**
         * Constructs a new GetMyRoomReq.
         * @memberof gsm
         * @classdesc Represents a GetMyRoomReq.
         * @implements IGetMyRoomReq
         * @constructor
         * @param {gsm.IGetMyRoomReq=} [properties] Properties to set
         */
        function GetMyRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GetMyRoomReq instance using the specified properties.
         * @function create
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {gsm.IGetMyRoomReq=} [properties] Properties to set
         * @returns {gsm.GetMyRoomReq} GetMyRoomReq instance
         */
        GetMyRoomReq.create = function create(properties) {
            return new GetMyRoomReq(properties);
        };

        /**
         * Encodes the specified GetMyRoomReq message. Does not implicitly {@link gsm.GetMyRoomReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {gsm.IGetMyRoomReq} message GetMyRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMyRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GetMyRoomReq message, length delimited. Does not implicitly {@link gsm.GetMyRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {gsm.IGetMyRoomReq} message GetMyRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMyRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetMyRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.GetMyRoomReq} GetMyRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMyRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.GetMyRoomReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetMyRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.GetMyRoomReq} GetMyRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMyRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetMyRoomReq message.
         * @function verify
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetMyRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GetMyRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.GetMyRoomReq} GetMyRoomReq
         */
        GetMyRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.GetMyRoomReq)
                return object;
            return new $root.gsm.GetMyRoomReq();
        };

        /**
         * Creates a plain object from a GetMyRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.GetMyRoomReq
         * @static
         * @param {gsm.GetMyRoomReq} message GetMyRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetMyRoomReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetMyRoomReq to JSON.
         * @function toJSON
         * @memberof gsm.GetMyRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetMyRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetMyRoomReq;
    })();

    gsm.GetMyRoomRsp = (function() {

        /**
         * Properties of a GetMyRoomRsp.
         * @memberof gsm
         * @interface IGetMyRoomRsp
         * @property {string|null} [err] GetMyRoomRsp err
         * @property {gsm.IRoomInfo|null} [room] GetMyRoomRsp room
         */

        /**
         * Constructs a new GetMyRoomRsp.
         * @memberof gsm
         * @classdesc Represents a GetMyRoomRsp.
         * @implements IGetMyRoomRsp
         * @constructor
         * @param {gsm.IGetMyRoomRsp=} [properties] Properties to set
         */
        function GetMyRoomRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetMyRoomRsp err.
         * @member {string} err
         * @memberof gsm.GetMyRoomRsp
         * @instance
         */
        GetMyRoomRsp.prototype.err = "";

        /**
         * GetMyRoomRsp room.
         * @member {gsm.IRoomInfo|null|undefined} room
         * @memberof gsm.GetMyRoomRsp
         * @instance
         */
        GetMyRoomRsp.prototype.room = null;

        /**
         * Creates a new GetMyRoomRsp instance using the specified properties.
         * @function create
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {gsm.IGetMyRoomRsp=} [properties] Properties to set
         * @returns {gsm.GetMyRoomRsp} GetMyRoomRsp instance
         */
        GetMyRoomRsp.create = function create(properties) {
            return new GetMyRoomRsp(properties);
        };

        /**
         * Encodes the specified GetMyRoomRsp message. Does not implicitly {@link gsm.GetMyRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {gsm.IGetMyRoomRsp} message GetMyRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMyRoomRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            if (message.room != null && Object.hasOwnProperty.call(message, "room"))
                $root.gsm.RoomInfo.encode(message.room, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetMyRoomRsp message, length delimited. Does not implicitly {@link gsm.GetMyRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {gsm.IGetMyRoomRsp} message GetMyRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMyRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetMyRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.GetMyRoomRsp} GetMyRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMyRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.GetMyRoomRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                case 2:
                    message.room = $root.gsm.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetMyRoomRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.GetMyRoomRsp} GetMyRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMyRoomRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetMyRoomRsp message.
         * @function verify
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetMyRoomRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.room != null && message.hasOwnProperty("room")) {
                var error = $root.gsm.RoomInfo.verify(message.room);
                if (error)
                    return "room." + error;
            }
            return null;
        };

        /**
         * Creates a GetMyRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.GetMyRoomRsp} GetMyRoomRsp
         */
        GetMyRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.GetMyRoomRsp)
                return object;
            var message = new $root.gsm.GetMyRoomRsp();
            if (object.err != null)
                message.err = String(object.err);
            if (object.room != null) {
                if (typeof object.room !== "object")
                    throw TypeError(".gsm.GetMyRoomRsp.room: object expected");
                message.room = $root.gsm.RoomInfo.fromObject(object.room);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetMyRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.GetMyRoomRsp
         * @static
         * @param {gsm.GetMyRoomRsp} message GetMyRoomRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetMyRoomRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = "";
                object.room = null;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            if (message.room != null && message.hasOwnProperty("room"))
                object.room = $root.gsm.RoomInfo.toObject(message.room, options);
            return object;
        };

        /**
         * Converts this GetMyRoomRsp to JSON.
         * @function toJSON
         * @memberof gsm.GetMyRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetMyRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetMyRoomRsp;
    })();

    gsm.GetRoomListReq = (function() {

        /**
         * Properties of a GetRoomListReq.
         * @memberof gsm
         * @interface IGetRoomListReq
         * @property {string|null} [gameGid] GetRoomListReq gameGid
         * @property {Object.<string,string>|null} [conditions] GetRoomListReq conditions
         */

        /**
         * Constructs a new GetRoomListReq.
         * @memberof gsm
         * @classdesc Represents a GetRoomListReq.
         * @implements IGetRoomListReq
         * @constructor
         * @param {gsm.IGetRoomListReq=} [properties] Properties to set
         */
        function GetRoomListReq(properties) {
            this.conditions = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetRoomListReq gameGid.
         * @member {string} gameGid
         * @memberof gsm.GetRoomListReq
         * @instance
         */
        GetRoomListReq.prototype.gameGid = "";

        /**
         * GetRoomListReq conditions.
         * @member {Object.<string,string>} conditions
         * @memberof gsm.GetRoomListReq
         * @instance
         */
        GetRoomListReq.prototype.conditions = $util.emptyObject;

        /**
         * Creates a new GetRoomListReq instance using the specified properties.
         * @function create
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {gsm.IGetRoomListReq=} [properties] Properties to set
         * @returns {gsm.GetRoomListReq} GetRoomListReq instance
         */
        GetRoomListReq.create = function create(properties) {
            return new GetRoomListReq(properties);
        };

        /**
         * Encodes the specified GetRoomListReq message. Does not implicitly {@link gsm.GetRoomListReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {gsm.IGetRoomListReq} message GetRoomListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomListReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameGid);
            if (message.conditions != null && Object.hasOwnProperty.call(message, "conditions"))
                for (var keys = Object.keys(message.conditions), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.conditions[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetRoomListReq message, length delimited. Does not implicitly {@link gsm.GetRoomListReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {gsm.IGetRoomListReq} message GetRoomListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomListReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetRoomListReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.GetRoomListReq} GetRoomListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomListReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.GetRoomListReq(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameGid = reader.string();
                    break;
                case 2:
                    if (message.conditions === $util.emptyObject)
                        message.conditions = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = "";
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.string();
                            break;
                        case 2:
                            value = reader.string();
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.conditions[key] = value;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetRoomListReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.GetRoomListReq} GetRoomListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomListReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetRoomListReq message.
         * @function verify
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetRoomListReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            if (message.conditions != null && message.hasOwnProperty("conditions")) {
                if (!$util.isObject(message.conditions))
                    return "conditions: object expected";
                var key = Object.keys(message.conditions);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.conditions[key[i]]))
                        return "conditions: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a GetRoomListReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.GetRoomListReq} GetRoomListReq
         */
        GetRoomListReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.GetRoomListReq)
                return object;
            var message = new $root.gsm.GetRoomListReq();
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            if (object.conditions) {
                if (typeof object.conditions !== "object")
                    throw TypeError(".gsm.GetRoomListReq.conditions: object expected");
                message.conditions = {};
                for (var keys = Object.keys(object.conditions), i = 0; i < keys.length; ++i)
                    message.conditions[keys[i]] = String(object.conditions[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetRoomListReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.GetRoomListReq
         * @static
         * @param {gsm.GetRoomListReq} message GetRoomListReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetRoomListReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.conditions = {};
            if (options.defaults)
                object.gameGid = "";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            var keys2;
            if (message.conditions && (keys2 = Object.keys(message.conditions)).length) {
                object.conditions = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.conditions[keys2[j]] = message.conditions[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this GetRoomListReq to JSON.
         * @function toJSON
         * @memberof gsm.GetRoomListReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetRoomListReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetRoomListReq;
    })();

    gsm.GetRoomListRsp = (function() {

        /**
         * Properties of a GetRoomListRsp.
         * @memberof gsm
         * @interface IGetRoomListRsp
         * @property {string|null} [err] GetRoomListRsp err
         * @property {Array.<gsm.IRoomInfo>|null} [roomList] GetRoomListRsp roomList
         */

        /**
         * Constructs a new GetRoomListRsp.
         * @memberof gsm
         * @classdesc Represents a GetRoomListRsp.
         * @implements IGetRoomListRsp
         * @constructor
         * @param {gsm.IGetRoomListRsp=} [properties] Properties to set
         */
        function GetRoomListRsp(properties) {
            this.roomList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetRoomListRsp err.
         * @member {string} err
         * @memberof gsm.GetRoomListRsp
         * @instance
         */
        GetRoomListRsp.prototype.err = "";

        /**
         * GetRoomListRsp roomList.
         * @member {Array.<gsm.IRoomInfo>} roomList
         * @memberof gsm.GetRoomListRsp
         * @instance
         */
        GetRoomListRsp.prototype.roomList = $util.emptyArray;

        /**
         * Creates a new GetRoomListRsp instance using the specified properties.
         * @function create
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {gsm.IGetRoomListRsp=} [properties] Properties to set
         * @returns {gsm.GetRoomListRsp} GetRoomListRsp instance
         */
        GetRoomListRsp.create = function create(properties) {
            return new GetRoomListRsp(properties);
        };

        /**
         * Encodes the specified GetRoomListRsp message. Does not implicitly {@link gsm.GetRoomListRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {gsm.IGetRoomListRsp} message GetRoomListRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomListRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            if (message.roomList != null && message.roomList.length)
                for (var i = 0; i < message.roomList.length; ++i)
                    $root.gsm.RoomInfo.encode(message.roomList[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetRoomListRsp message, length delimited. Does not implicitly {@link gsm.GetRoomListRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {gsm.IGetRoomListRsp} message GetRoomListRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRoomListRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetRoomListRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.GetRoomListRsp} GetRoomListRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomListRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.GetRoomListRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                case 2:
                    if (!(message.roomList && message.roomList.length))
                        message.roomList = [];
                    message.roomList.push($root.gsm.RoomInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetRoomListRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.GetRoomListRsp} GetRoomListRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRoomListRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetRoomListRsp message.
         * @function verify
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetRoomListRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.roomList != null && message.hasOwnProperty("roomList")) {
                if (!Array.isArray(message.roomList))
                    return "roomList: array expected";
                for (var i = 0; i < message.roomList.length; ++i) {
                    var error = $root.gsm.RoomInfo.verify(message.roomList[i]);
                    if (error)
                        return "roomList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetRoomListRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.GetRoomListRsp} GetRoomListRsp
         */
        GetRoomListRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.GetRoomListRsp)
                return object;
            var message = new $root.gsm.GetRoomListRsp();
            if (object.err != null)
                message.err = String(object.err);
            if (object.roomList) {
                if (!Array.isArray(object.roomList))
                    throw TypeError(".gsm.GetRoomListRsp.roomList: array expected");
                message.roomList = [];
                for (var i = 0; i < object.roomList.length; ++i) {
                    if (typeof object.roomList[i] !== "object")
                        throw TypeError(".gsm.GetRoomListRsp.roomList: object expected");
                    message.roomList[i] = $root.gsm.RoomInfo.fromObject(object.roomList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetRoomListRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.GetRoomListRsp
         * @static
         * @param {gsm.GetRoomListRsp} message GetRoomListRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetRoomListRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.roomList = [];
            if (options.defaults)
                object.err = "";
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            if (message.roomList && message.roomList.length) {
                object.roomList = [];
                for (var j = 0; j < message.roomList.length; ++j)
                    object.roomList[j] = $root.gsm.RoomInfo.toObject(message.roomList[j], options);
            }
            return object;
        };

        /**
         * Converts this GetRoomListRsp to JSON.
         * @function toJSON
         * @memberof gsm.GetRoomListRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetRoomListRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetRoomListRsp;
    })();

    gsm.CheckCanJoinReq = (function() {

        /**
         * Properties of a CheckCanJoinReq.
         * @memberof gsm
         * @interface ICheckCanJoinReq
         * @property {string|null} [gameId] CheckCanJoinReq gameId
         * @property {string|null} [roomId] CheckCanJoinReq roomId
         * @property {string|null} [openid] CheckCanJoinReq openid
         */

        /**
         * Constructs a new CheckCanJoinReq.
         * @memberof gsm
         * @classdesc Represents a CheckCanJoinReq.
         * @implements ICheckCanJoinReq
         * @constructor
         * @param {gsm.ICheckCanJoinReq=} [properties] Properties to set
         */
        function CheckCanJoinReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CheckCanJoinReq gameId.
         * @member {string} gameId
         * @memberof gsm.CheckCanJoinReq
         * @instance
         */
        CheckCanJoinReq.prototype.gameId = "";

        /**
         * CheckCanJoinReq roomId.
         * @member {string} roomId
         * @memberof gsm.CheckCanJoinReq
         * @instance
         */
        CheckCanJoinReq.prototype.roomId = "";

        /**
         * CheckCanJoinReq openid.
         * @member {string} openid
         * @memberof gsm.CheckCanJoinReq
         * @instance
         */
        CheckCanJoinReq.prototype.openid = "";

        /**
         * Creates a new CheckCanJoinReq instance using the specified properties.
         * @function create
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {gsm.ICheckCanJoinReq=} [properties] Properties to set
         * @returns {gsm.CheckCanJoinReq} CheckCanJoinReq instance
         */
        CheckCanJoinReq.create = function create(properties) {
            return new CheckCanJoinReq(properties);
        };

        /**
         * Encodes the specified CheckCanJoinReq message. Does not implicitly {@link gsm.CheckCanJoinReq.verify|verify} messages.
         * @function encode
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {gsm.ICheckCanJoinReq} message CheckCanJoinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckCanJoinReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomId);
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.openid);
            return writer;
        };

        /**
         * Encodes the specified CheckCanJoinReq message, length delimited. Does not implicitly {@link gsm.CheckCanJoinReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {gsm.ICheckCanJoinReq} message CheckCanJoinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckCanJoinReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CheckCanJoinReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CheckCanJoinReq} CheckCanJoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckCanJoinReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CheckCanJoinReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.string();
                    break;
                case 2:
                    message.roomId = reader.string();
                    break;
                case 3:
                    message.openid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CheckCanJoinReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CheckCanJoinReq} CheckCanJoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckCanJoinReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CheckCanJoinReq message.
         * @function verify
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CheckCanJoinReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isString(message.gameId))
                    return "gameId: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            return null;
        };

        /**
         * Creates a CheckCanJoinReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CheckCanJoinReq} CheckCanJoinReq
         */
        CheckCanJoinReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CheckCanJoinReq)
                return object;
            var message = new $root.gsm.CheckCanJoinReq();
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.openid != null)
                message.openid = String(object.openid);
            return message;
        };

        /**
         * Creates a plain object from a CheckCanJoinReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CheckCanJoinReq
         * @static
         * @param {gsm.CheckCanJoinReq} message CheckCanJoinReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CheckCanJoinReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameId = "";
                object.roomId = "";
                object.openid = "";
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            return object;
        };

        /**
         * Converts this CheckCanJoinReq to JSON.
         * @function toJSON
         * @memberof gsm.CheckCanJoinReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CheckCanJoinReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CheckCanJoinReq;
    })();

    gsm.CheckCanJoinRsp = (function() {

        /**
         * Properties of a CheckCanJoinRsp.
         * @memberof gsm
         * @interface ICheckCanJoinRsp
         * @property {string|null} [err] CheckCanJoinRsp err
         */

        /**
         * Constructs a new CheckCanJoinRsp.
         * @memberof gsm
         * @classdesc Represents a CheckCanJoinRsp.
         * @implements ICheckCanJoinRsp
         * @constructor
         * @param {gsm.ICheckCanJoinRsp=} [properties] Properties to set
         */
        function CheckCanJoinRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CheckCanJoinRsp err.
         * @member {string} err
         * @memberof gsm.CheckCanJoinRsp
         * @instance
         */
        CheckCanJoinRsp.prototype.err = "";

        /**
         * Creates a new CheckCanJoinRsp instance using the specified properties.
         * @function create
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {gsm.ICheckCanJoinRsp=} [properties] Properties to set
         * @returns {gsm.CheckCanJoinRsp} CheckCanJoinRsp instance
         */
        CheckCanJoinRsp.create = function create(properties) {
            return new CheckCanJoinRsp(properties);
        };

        /**
         * Encodes the specified CheckCanJoinRsp message. Does not implicitly {@link gsm.CheckCanJoinRsp.verify|verify} messages.
         * @function encode
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {gsm.ICheckCanJoinRsp} message CheckCanJoinRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckCanJoinRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified CheckCanJoinRsp message, length delimited. Does not implicitly {@link gsm.CheckCanJoinRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {gsm.ICheckCanJoinRsp} message CheckCanJoinRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckCanJoinRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CheckCanJoinRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsm.CheckCanJoinRsp} CheckCanJoinRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckCanJoinRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsm.CheckCanJoinRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CheckCanJoinRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsm.CheckCanJoinRsp} CheckCanJoinRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckCanJoinRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CheckCanJoinRsp message.
         * @function verify
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CheckCanJoinRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates a CheckCanJoinRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsm.CheckCanJoinRsp} CheckCanJoinRsp
         */
        CheckCanJoinRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsm.CheckCanJoinRsp)
                return object;
            var message = new $root.gsm.CheckCanJoinRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from a CheckCanJoinRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsm.CheckCanJoinRsp
         * @static
         * @param {gsm.CheckCanJoinRsp} message CheckCanJoinRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CheckCanJoinRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.err = "";
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            return object;
        };

        /**
         * Converts this CheckCanJoinRsp to JSON.
         * @function toJSON
         * @memberof gsm.CheckCanJoinRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CheckCanJoinRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CheckCanJoinRsp;
    })();

    return gsm;
})();

module.exports = $root.gsm;
