/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.gsbase = (function() {

    /**
     * Namespace gsbase.
     * @exports gsbase
     * @namespace
     */
    var gsbase = {};

    /**
     * Version enum.
     * @name gsbase.Version
     * @enum {number}
     * @property {number} major=0 major value
     * @property {number} minor=1 minor value
     */
    gsbase.Version = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "major"] = 0;
        values[valuesById[1] = "minor"] = 1;
        return values;
    })();

    gsbase.JoinRoomReq = (function() {

        /**
         * Properties of a JoinRoomReq.
         * @memberof gsbase
         * @interface IJoinRoomReq
         * @property {string|null} [roomId] JoinRoomReq roomId
         * @property {string|null} [token] JoinRoomReq token
         */

        /**
         * Constructs a new JoinRoomReq.
         * @memberof gsbase
         * @classdesc Represents a JoinRoomReq.
         * @implements IJoinRoomReq
         * @constructor
         * @param {gsbase.IJoinRoomReq=} [properties] Properties to set
         */
        function JoinRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoomReq roomId.
         * @member {string} roomId
         * @memberof gsbase.JoinRoomReq
         * @instance
         */
        JoinRoomReq.prototype.roomId = "";

        /**
         * JoinRoomReq token.
         * @member {string} token
         * @memberof gsbase.JoinRoomReq
         * @instance
         */
        JoinRoomReq.prototype.token = "";

        /**
         * Creates a new JoinRoomReq instance using the specified properties.
         * @function create
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {gsbase.IJoinRoomReq=} [properties] Properties to set
         * @returns {gsbase.JoinRoomReq} JoinRoomReq instance
         */
        JoinRoomReq.create = function create(properties) {
            return new JoinRoomReq(properties);
        };

        /**
         * Encodes the specified JoinRoomReq message. Does not implicitly {@link gsbase.JoinRoomReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {gsbase.IJoinRoomReq} message JoinRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified JoinRoomReq message, length delimited. Does not implicitly {@link gsbase.JoinRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {gsbase.IJoinRoomReq} message JoinRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.JoinRoomReq} JoinRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.JoinRoomReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.JoinRoomReq} JoinRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoomReq message.
         * @function verify
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a JoinRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.JoinRoomReq} JoinRoomReq
         */
        JoinRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.JoinRoomReq)
                return object;
            var message = new $root.gsbase.JoinRoomReq();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a JoinRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.JoinRoomReq
         * @static
         * @param {gsbase.JoinRoomReq} message JoinRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roomId = "";
                object.token = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this JoinRoomReq to JSON.
         * @function toJSON
         * @memberof gsbase.JoinRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoomReq;
    })();

    gsbase.JoinRoomRsp = (function() {

        /**
         * Properties of a JoinRoomRsp.
         * @memberof gsbase
         * @interface IJoinRoomRsp
         * @property {string|null} [err] JoinRoomRsp err
         * @property {gsbase.IRoomInfo|null} [room] JoinRoomRsp room
         */

        /**
         * Constructs a new JoinRoomRsp.
         * @memberof gsbase
         * @classdesc Represents a JoinRoomRsp.
         * @implements IJoinRoomRsp
         * @constructor
         * @param {gsbase.IJoinRoomRsp=} [properties] Properties to set
         */
        function JoinRoomRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoomRsp err.
         * @member {string} err
         * @memberof gsbase.JoinRoomRsp
         * @instance
         */
        JoinRoomRsp.prototype.err = "";

        /**
         * JoinRoomRsp room.
         * @member {gsbase.IRoomInfo|null|undefined} room
         * @memberof gsbase.JoinRoomRsp
         * @instance
         */
        JoinRoomRsp.prototype.room = null;

        /**
         * Creates a new JoinRoomRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {gsbase.IJoinRoomRsp=} [properties] Properties to set
         * @returns {gsbase.JoinRoomRsp} JoinRoomRsp instance
         */
        JoinRoomRsp.create = function create(properties) {
            return new JoinRoomRsp(properties);
        };

        /**
         * Encodes the specified JoinRoomRsp message. Does not implicitly {@link gsbase.JoinRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {gsbase.IJoinRoomRsp} message JoinRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            if (message.room != null && Object.hasOwnProperty.call(message, "room"))
                $root.gsbase.RoomInfo.encode(message.room, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified JoinRoomRsp message, length delimited. Does not implicitly {@link gsbase.JoinRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {gsbase.IJoinRoomRsp} message JoinRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.JoinRoomRsp} JoinRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.JoinRoomRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                case 2:
                    message.room = $root.gsbase.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoomRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.JoinRoomRsp} JoinRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoomRsp message.
         * @function verify
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.room != null && message.hasOwnProperty("room")) {
                var error = $root.gsbase.RoomInfo.verify(message.room);
                if (error)
                    return "room." + error;
            }
            return null;
        };

        /**
         * Creates a JoinRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.JoinRoomRsp} JoinRoomRsp
         */
        JoinRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.JoinRoomRsp)
                return object;
            var message = new $root.gsbase.JoinRoomRsp();
            if (object.err != null)
                message.err = String(object.err);
            if (object.room != null) {
                if (typeof object.room !== "object")
                    throw TypeError(".gsbase.JoinRoomRsp.room: object expected");
                message.room = $root.gsbase.RoomInfo.fromObject(object.room);
            }
            return message;
        };

        /**
         * Creates a plain object from a JoinRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.JoinRoomRsp
         * @static
         * @param {gsbase.JoinRoomRsp} message JoinRoomRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomRsp.toObject = function toObject(message, options) {
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
                object.room = $root.gsbase.RoomInfo.toObject(message.room, options);
            return object;
        };

        /**
         * Converts this JoinRoomRsp to JSON.
         * @function toJSON
         * @memberof gsbase.JoinRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoomRsp;
    })();

    gsbase.JoinRoomNot = (function() {

        /**
         * Properties of a JoinRoomNot.
         * @memberof gsbase
         * @interface IJoinRoomNot
         * @property {string|null} [openid] JoinRoomNot openid
         * @property {gsbase.IRoomInfo|null} [room] JoinRoomNot room
         */

        /**
         * Constructs a new JoinRoomNot.
         * @memberof gsbase
         * @classdesc Represents a JoinRoomNot.
         * @implements IJoinRoomNot
         * @constructor
         * @param {gsbase.IJoinRoomNot=} [properties] Properties to set
         */
        function JoinRoomNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoomNot openid.
         * @member {string} openid
         * @memberof gsbase.JoinRoomNot
         * @instance
         */
        JoinRoomNot.prototype.openid = "";

        /**
         * JoinRoomNot room.
         * @member {gsbase.IRoomInfo|null|undefined} room
         * @memberof gsbase.JoinRoomNot
         * @instance
         */
        JoinRoomNot.prototype.room = null;

        /**
         * Creates a new JoinRoomNot instance using the specified properties.
         * @function create
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {gsbase.IJoinRoomNot=} [properties] Properties to set
         * @returns {gsbase.JoinRoomNot} JoinRoomNot instance
         */
        JoinRoomNot.create = function create(properties) {
            return new JoinRoomNot(properties);
        };

        /**
         * Encodes the specified JoinRoomNot message. Does not implicitly {@link gsbase.JoinRoomNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {gsbase.IJoinRoomNot} message JoinRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.room != null && Object.hasOwnProperty.call(message, "room"))
                $root.gsbase.RoomInfo.encode(message.room, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified JoinRoomNot message, length delimited. Does not implicitly {@link gsbase.JoinRoomNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {gsbase.IJoinRoomNot} message JoinRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoomNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.JoinRoomNot} JoinRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.JoinRoomNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    message.room = $root.gsbase.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoomNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.JoinRoomNot} JoinRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoomNot message.
         * @function verify
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.room != null && message.hasOwnProperty("room")) {
                var error = $root.gsbase.RoomInfo.verify(message.room);
                if (error)
                    return "room." + error;
            }
            return null;
        };

        /**
         * Creates a JoinRoomNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.JoinRoomNot} JoinRoomNot
         */
        JoinRoomNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.JoinRoomNot)
                return object;
            var message = new $root.gsbase.JoinRoomNot();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.room != null) {
                if (typeof object.room !== "object")
                    throw TypeError(".gsbase.JoinRoomNot.room: object expected");
                message.room = $root.gsbase.RoomInfo.fromObject(object.room);
            }
            return message;
        };

        /**
         * Creates a plain object from a JoinRoomNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.JoinRoomNot
         * @static
         * @param {gsbase.JoinRoomNot} message JoinRoomNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.openid = "";
                object.room = null;
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.room != null && message.hasOwnProperty("room"))
                object.room = $root.gsbase.RoomInfo.toObject(message.room, options);
            return object;
        };

        /**
         * Converts this JoinRoomNot to JSON.
         * @function toJSON
         * @memberof gsbase.JoinRoomNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoomNot;
    })();

    gsbase.LeaveRoomReq = (function() {

        /**
         * Properties of a LeaveRoomReq.
         * @memberof gsbase
         * @interface ILeaveRoomReq
         */

        /**
         * Constructs a new LeaveRoomReq.
         * @memberof gsbase
         * @classdesc Represents a LeaveRoomReq.
         * @implements ILeaveRoomReq
         * @constructor
         * @param {gsbase.ILeaveRoomReq=} [properties] Properties to set
         */
        function LeaveRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new LeaveRoomReq instance using the specified properties.
         * @function create
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {gsbase.ILeaveRoomReq=} [properties] Properties to set
         * @returns {gsbase.LeaveRoomReq} LeaveRoomReq instance
         */
        LeaveRoomReq.create = function create(properties) {
            return new LeaveRoomReq(properties);
        };

        /**
         * Encodes the specified LeaveRoomReq message. Does not implicitly {@link gsbase.LeaveRoomReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {gsbase.ILeaveRoomReq} message LeaveRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified LeaveRoomReq message, length delimited. Does not implicitly {@link gsbase.LeaveRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {gsbase.ILeaveRoomReq} message LeaveRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.LeaveRoomReq} LeaveRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.LeaveRoomReq();
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
         * Decodes a LeaveRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.LeaveRoomReq} LeaveRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveRoomReq message.
         * @function verify
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a LeaveRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.LeaveRoomReq} LeaveRoomReq
         */
        LeaveRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.LeaveRoomReq)
                return object;
            return new $root.gsbase.LeaveRoomReq();
        };

        /**
         * Creates a plain object from a LeaveRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.LeaveRoomReq
         * @static
         * @param {gsbase.LeaveRoomReq} message LeaveRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoomReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this LeaveRoomReq to JSON.
         * @function toJSON
         * @memberof gsbase.LeaveRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeaveRoomReq;
    })();

    gsbase.LeaveRoomRsp = (function() {

        /**
         * Properties of a LeaveRoomRsp.
         * @memberof gsbase
         * @interface ILeaveRoomRsp
         * @property {string|null} [err] LeaveRoomRsp err
         * @property {string|null} [openid] LeaveRoomRsp openid
         */

        /**
         * Constructs a new LeaveRoomRsp.
         * @memberof gsbase
         * @classdesc Represents a LeaveRoomRsp.
         * @implements ILeaveRoomRsp
         * @constructor
         * @param {gsbase.ILeaveRoomRsp=} [properties] Properties to set
         */
        function LeaveRoomRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeaveRoomRsp err.
         * @member {string} err
         * @memberof gsbase.LeaveRoomRsp
         * @instance
         */
        LeaveRoomRsp.prototype.err = "";

        /**
         * LeaveRoomRsp openid.
         * @member {string} openid
         * @memberof gsbase.LeaveRoomRsp
         * @instance
         */
        LeaveRoomRsp.prototype.openid = "";

        /**
         * Creates a new LeaveRoomRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {gsbase.ILeaveRoomRsp=} [properties] Properties to set
         * @returns {gsbase.LeaveRoomRsp} LeaveRoomRsp instance
         */
        LeaveRoomRsp.create = function create(properties) {
            return new LeaveRoomRsp(properties);
        };

        /**
         * Encodes the specified LeaveRoomRsp message. Does not implicitly {@link gsbase.LeaveRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {gsbase.ILeaveRoomRsp} message LeaveRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.openid);
            return writer;
        };

        /**
         * Encodes the specified LeaveRoomRsp message, length delimited. Does not implicitly {@link gsbase.LeaveRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {gsbase.ILeaveRoomRsp} message LeaveRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.LeaveRoomRsp} LeaveRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.LeaveRoomRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.err = reader.string();
                    break;
                case 2:
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
         * Decodes a LeaveRoomRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.LeaveRoomRsp} LeaveRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveRoomRsp message.
         * @function verify
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoomRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            return null;
        };

        /**
         * Creates a LeaveRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.LeaveRoomRsp} LeaveRoomRsp
         */
        LeaveRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.LeaveRoomRsp)
                return object;
            var message = new $root.gsbase.LeaveRoomRsp();
            if (object.err != null)
                message.err = String(object.err);
            if (object.openid != null)
                message.openid = String(object.openid);
            return message;
        };

        /**
         * Creates a plain object from a LeaveRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.LeaveRoomRsp
         * @static
         * @param {gsbase.LeaveRoomRsp} message LeaveRoomRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoomRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = "";
                object.openid = "";
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            return object;
        };

        /**
         * Converts this LeaveRoomRsp to JSON.
         * @function toJSON
         * @memberof gsbase.LeaveRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeaveRoomRsp;
    })();

    gsbase.DismissNot = (function() {

        /**
         * Properties of a DismissNot.
         * @memberof gsbase
         * @interface IDismissNot
         * @property {string|null} [msg] DismissNot msg
         * @property {gsbase.DismissNot.Type|null} [code] DismissNot code
         */

        /**
         * Constructs a new DismissNot.
         * @memberof gsbase
         * @classdesc Represents a DismissNot.
         * @implements IDismissNot
         * @constructor
         * @param {gsbase.IDismissNot=} [properties] Properties to set
         */
        function DismissNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DismissNot msg.
         * @member {string} msg
         * @memberof gsbase.DismissNot
         * @instance
         */
        DismissNot.prototype.msg = "";

        /**
         * DismissNot code.
         * @member {gsbase.DismissNot.Type} code
         * @memberof gsbase.DismissNot
         * @instance
         */
        DismissNot.prototype.code = 0;

        /**
         * Creates a new DismissNot instance using the specified properties.
         * @function create
         * @memberof gsbase.DismissNot
         * @static
         * @param {gsbase.IDismissNot=} [properties] Properties to set
         * @returns {gsbase.DismissNot} DismissNot instance
         */
        DismissNot.create = function create(properties) {
            return new DismissNot(properties);
        };

        /**
         * Encodes the specified DismissNot message. Does not implicitly {@link gsbase.DismissNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.DismissNot
         * @static
         * @param {gsbase.IDismissNot} message DismissNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            return writer;
        };

        /**
         * Encodes the specified DismissNot message, length delimited. Does not implicitly {@link gsbase.DismissNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.DismissNot
         * @static
         * @param {gsbase.IDismissNot} message DismissNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DismissNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.DismissNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.DismissNot} DismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.DismissNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msg = reader.string();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DismissNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.DismissNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.DismissNot} DismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DismissNot message.
         * @function verify
         * @memberof gsbase.DismissNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DismissNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.code != null && message.hasOwnProperty("code"))
                switch (message.code) {
                default:
                    return "code: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        /**
         * Creates a DismissNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.DismissNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.DismissNot} DismissNot
         */
        DismissNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.DismissNot)
                return object;
            var message = new $root.gsbase.DismissNot();
            if (object.msg != null)
                message.msg = String(object.msg);
            switch (object.code) {
            case "GameOverDismiss":
            case 0:
                message.code = 0;
                break;
            case "OwnerDismiss":
            case 1:
                message.code = 1;
                break;
            case "UserDismiss":
            case 2:
                message.code = 2;
                break;
            case "TimeOutDismiss":
            case 3:
                message.code = 3;
                break;
            case "AdminDismiss":
            case 4:
                message.code = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a DismissNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.DismissNot
         * @static
         * @param {gsbase.DismissNot} message DismissNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DismissNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.msg = "";
                object.code = options.enums === String ? "GameOverDismiss" : 0;
            }
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = options.enums === String ? $root.gsbase.DismissNot.Type[message.code] : message.code;
            return object;
        };

        /**
         * Converts this DismissNot to JSON.
         * @function toJSON
         * @memberof gsbase.DismissNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DismissNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Type enum.
         * @name gsbase.DismissNot.Type
         * @enum {number}
         * @property {number} GameOverDismiss=0 GameOverDismiss value
         * @property {number} OwnerDismiss=1 OwnerDismiss value
         * @property {number} UserDismiss=2 UserDismiss value
         * @property {number} TimeOutDismiss=3 TimeOutDismiss value
         * @property {number} AdminDismiss=4 AdminDismiss value
         */
        DismissNot.Type = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "GameOverDismiss"] = 0;
            values[valuesById[1] = "OwnerDismiss"] = 1;
            values[valuesById[2] = "UserDismiss"] = 2;
            values[valuesById[3] = "TimeOutDismiss"] = 3;
            values[valuesById[4] = "AdminDismiss"] = 4;
            return values;
        })();

        return DismissNot;
    })();

    gsbase.DismissRoomReq = (function() {

        /**
         * Properties of a DismissRoomReq.
         * @memberof gsbase
         * @interface IDismissRoomReq
         * @property {string|null} [openid] DismissRoomReq openid
         * @property {string|null} [roomId] DismissRoomReq roomId
         */

        /**
         * Constructs a new DismissRoomReq.
         * @memberof gsbase
         * @classdesc Represents a DismissRoomReq.
         * @implements IDismissRoomReq
         * @constructor
         * @param {gsbase.IDismissRoomReq=} [properties] Properties to set
         */
        function DismissRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DismissRoomReq openid.
         * @member {string} openid
         * @memberof gsbase.DismissRoomReq
         * @instance
         */
        DismissRoomReq.prototype.openid = "";

        /**
         * DismissRoomReq roomId.
         * @member {string} roomId
         * @memberof gsbase.DismissRoomReq
         * @instance
         */
        DismissRoomReq.prototype.roomId = "";

        /**
         * Creates a new DismissRoomReq instance using the specified properties.
         * @function create
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {gsbase.IDismissRoomReq=} [properties] Properties to set
         * @returns {gsbase.DismissRoomReq} DismissRoomReq instance
         */
        DismissRoomReq.create = function create(properties) {
            return new DismissRoomReq(properties);
        };

        /**
         * Encodes the specified DismissRoomReq message. Does not implicitly {@link gsbase.DismissRoomReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {gsbase.IDismissRoomReq} message DismissRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified DismissRoomReq message, length delimited. Does not implicitly {@link gsbase.DismissRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {gsbase.IDismissRoomReq} message DismissRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DismissRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.DismissRoomReq} DismissRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.DismissRoomReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
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
         * Decodes a DismissRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.DismissRoomReq} DismissRoomReq
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
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DismissRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            return null;
        };

        /**
         * Creates a DismissRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.DismissRoomReq} DismissRoomReq
         */
        DismissRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.DismissRoomReq)
                return object;
            var message = new $root.gsbase.DismissRoomReq();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            return message;
        };

        /**
         * Creates a plain object from a DismissRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.DismissRoomReq
         * @static
         * @param {gsbase.DismissRoomReq} message DismissRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DismissRoomReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.openid = "";
                object.roomId = "";
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this DismissRoomReq to JSON.
         * @function toJSON
         * @memberof gsbase.DismissRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DismissRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DismissRoomReq;
    })();

    gsbase.DismissRoomRsp = (function() {

        /**
         * Properties of a DismissRoomRsp.
         * @memberof gsbase
         * @interface IDismissRoomRsp
         * @property {string|null} [err] DismissRoomRsp err
         */

        /**
         * Constructs a new DismissRoomRsp.
         * @memberof gsbase
         * @classdesc Represents a DismissRoomRsp.
         * @implements IDismissRoomRsp
         * @constructor
         * @param {gsbase.IDismissRoomRsp=} [properties] Properties to set
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
         * @memberof gsbase.DismissRoomRsp
         * @instance
         */
        DismissRoomRsp.prototype.err = "";

        /**
         * Creates a new DismissRoomRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.DismissRoomRsp
         * @static
         * @param {gsbase.IDismissRoomRsp=} [properties] Properties to set
         * @returns {gsbase.DismissRoomRsp} DismissRoomRsp instance
         */
        DismissRoomRsp.create = function create(properties) {
            return new DismissRoomRsp(properties);
        };

        /**
         * Encodes the specified DismissRoomRsp message. Does not implicitly {@link gsbase.DismissRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.DismissRoomRsp
         * @static
         * @param {gsbase.IDismissRoomRsp} message DismissRoomRsp message or plain object to encode
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
         * Encodes the specified DismissRoomRsp message, length delimited. Does not implicitly {@link gsbase.DismissRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.DismissRoomRsp
         * @static
         * @param {gsbase.IDismissRoomRsp} message DismissRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DismissRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DismissRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.DismissRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.DismissRoomRsp} DismissRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DismissRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.DismissRoomRsp();
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
         * @memberof gsbase.DismissRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.DismissRoomRsp} DismissRoomRsp
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
         * @memberof gsbase.DismissRoomRsp
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
         * @memberof gsbase.DismissRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.DismissRoomRsp} DismissRoomRsp
         */
        DismissRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.DismissRoomRsp)
                return object;
            var message = new $root.gsbase.DismissRoomRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from a DismissRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.DismissRoomRsp
         * @static
         * @param {gsbase.DismissRoomRsp} message DismissRoomRsp
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
         * @memberof gsbase.DismissRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DismissRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DismissRoomRsp;
    })();

    gsbase.ApplyDismissReq = (function() {

        /**
         * Properties of an ApplyDismissReq.
         * @memberof gsbase
         * @interface IApplyDismissReq
         */

        /**
         * Constructs a new ApplyDismissReq.
         * @memberof gsbase
         * @classdesc Represents an ApplyDismissReq.
         * @implements IApplyDismissReq
         * @constructor
         * @param {gsbase.IApplyDismissReq=} [properties] Properties to set
         */
        function ApplyDismissReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ApplyDismissReq instance using the specified properties.
         * @function create
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {gsbase.IApplyDismissReq=} [properties] Properties to set
         * @returns {gsbase.ApplyDismissReq} ApplyDismissReq instance
         */
        ApplyDismissReq.create = function create(properties) {
            return new ApplyDismissReq(properties);
        };

        /**
         * Encodes the specified ApplyDismissReq message. Does not implicitly {@link gsbase.ApplyDismissReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {gsbase.IApplyDismissReq} message ApplyDismissReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplyDismissReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ApplyDismissReq message, length delimited. Does not implicitly {@link gsbase.ApplyDismissReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {gsbase.IApplyDismissReq} message ApplyDismissReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplyDismissReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ApplyDismissReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.ApplyDismissReq} ApplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplyDismissReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ApplyDismissReq();
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
         * Decodes an ApplyDismissReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.ApplyDismissReq} ApplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplyDismissReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApplyDismissReq message.
         * @function verify
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApplyDismissReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an ApplyDismissReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.ApplyDismissReq} ApplyDismissReq
         */
        ApplyDismissReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.ApplyDismissReq)
                return object;
            return new $root.gsbase.ApplyDismissReq();
        };

        /**
         * Creates a plain object from an ApplyDismissReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.ApplyDismissReq
         * @static
         * @param {gsbase.ApplyDismissReq} message ApplyDismissReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApplyDismissReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ApplyDismissReq to JSON.
         * @function toJSON
         * @memberof gsbase.ApplyDismissReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApplyDismissReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ApplyDismissReq;
    })();

    gsbase.ApplyDismissRsp = (function() {

        /**
         * Properties of an ApplyDismissRsp.
         * @memberof gsbase
         * @interface IApplyDismissRsp
         * @property {string|null} [err] ApplyDismissRsp err
         */

        /**
         * Constructs a new ApplyDismissRsp.
         * @memberof gsbase
         * @classdesc Represents an ApplyDismissRsp.
         * @implements IApplyDismissRsp
         * @constructor
         * @param {gsbase.IApplyDismissRsp=} [properties] Properties to set
         */
        function ApplyDismissRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApplyDismissRsp err.
         * @member {string} err
         * @memberof gsbase.ApplyDismissRsp
         * @instance
         */
        ApplyDismissRsp.prototype.err = "";

        /**
         * Creates a new ApplyDismissRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {gsbase.IApplyDismissRsp=} [properties] Properties to set
         * @returns {gsbase.ApplyDismissRsp} ApplyDismissRsp instance
         */
        ApplyDismissRsp.create = function create(properties) {
            return new ApplyDismissRsp(properties);
        };

        /**
         * Encodes the specified ApplyDismissRsp message. Does not implicitly {@link gsbase.ApplyDismissRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {gsbase.IApplyDismissRsp} message ApplyDismissRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplyDismissRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified ApplyDismissRsp message, length delimited. Does not implicitly {@link gsbase.ApplyDismissRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {gsbase.IApplyDismissRsp} message ApplyDismissRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplyDismissRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ApplyDismissRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.ApplyDismissRsp} ApplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplyDismissRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ApplyDismissRsp();
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
         * Decodes an ApplyDismissRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.ApplyDismissRsp} ApplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplyDismissRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApplyDismissRsp message.
         * @function verify
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApplyDismissRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates an ApplyDismissRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.ApplyDismissRsp} ApplyDismissRsp
         */
        ApplyDismissRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.ApplyDismissRsp)
                return object;
            var message = new $root.gsbase.ApplyDismissRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from an ApplyDismissRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.ApplyDismissRsp
         * @static
         * @param {gsbase.ApplyDismissRsp} message ApplyDismissRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApplyDismissRsp.toObject = function toObject(message, options) {
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
         * Converts this ApplyDismissRsp to JSON.
         * @function toJSON
         * @memberof gsbase.ApplyDismissRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApplyDismissRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ApplyDismissRsp;
    })();

    gsbase.ApplyDismissNot = (function() {

        /**
         * Properties of an ApplyDismissNot.
         * @memberof gsbase
         * @interface IApplyDismissNot
         * @property {string|null} [openid] ApplyDismissNot openid
         * @property {number|Long|null} [applyTime] ApplyDismissNot applyTime
         * @property {number|Long|null} [expire] ApplyDismissNot expire
         * @property {Array.<gsbase.ApplyDismissNot.IStatus>|null} [status] ApplyDismissNot status
         */

        /**
         * Constructs a new ApplyDismissNot.
         * @memberof gsbase
         * @classdesc Represents an ApplyDismissNot.
         * @implements IApplyDismissNot
         * @constructor
         * @param {gsbase.IApplyDismissNot=} [properties] Properties to set
         */
        function ApplyDismissNot(properties) {
            this.status = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApplyDismissNot openid.
         * @member {string} openid
         * @memberof gsbase.ApplyDismissNot
         * @instance
         */
        ApplyDismissNot.prototype.openid = "";

        /**
         * ApplyDismissNot applyTime.
         * @member {number|Long} applyTime
         * @memberof gsbase.ApplyDismissNot
         * @instance
         */
        ApplyDismissNot.prototype.applyTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApplyDismissNot expire.
         * @member {number|Long} expire
         * @memberof gsbase.ApplyDismissNot
         * @instance
         */
        ApplyDismissNot.prototype.expire = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApplyDismissNot status.
         * @member {Array.<gsbase.ApplyDismissNot.IStatus>} status
         * @memberof gsbase.ApplyDismissNot
         * @instance
         */
        ApplyDismissNot.prototype.status = $util.emptyArray;

        /**
         * Creates a new ApplyDismissNot instance using the specified properties.
         * @function create
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {gsbase.IApplyDismissNot=} [properties] Properties to set
         * @returns {gsbase.ApplyDismissNot} ApplyDismissNot instance
         */
        ApplyDismissNot.create = function create(properties) {
            return new ApplyDismissNot(properties);
        };

        /**
         * Encodes the specified ApplyDismissNot message. Does not implicitly {@link gsbase.ApplyDismissNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {gsbase.IApplyDismissNot} message ApplyDismissNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplyDismissNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.applyTime != null && Object.hasOwnProperty.call(message, "applyTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.applyTime);
            if (message.expire != null && Object.hasOwnProperty.call(message, "expire"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.expire);
            if (message.status != null && message.status.length)
                for (var i = 0; i < message.status.length; ++i)
                    $root.gsbase.ApplyDismissNot.Status.encode(message.status[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ApplyDismissNot message, length delimited. Does not implicitly {@link gsbase.ApplyDismissNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {gsbase.IApplyDismissNot} message ApplyDismissNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplyDismissNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ApplyDismissNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.ApplyDismissNot} ApplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplyDismissNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ApplyDismissNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    message.applyTime = reader.int64();
                    break;
                case 3:
                    message.expire = reader.int64();
                    break;
                case 4:
                    if (!(message.status && message.status.length))
                        message.status = [];
                    message.status.push($root.gsbase.ApplyDismissNot.Status.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ApplyDismissNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.ApplyDismissNot} ApplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplyDismissNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApplyDismissNot message.
         * @function verify
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApplyDismissNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.applyTime != null && message.hasOwnProperty("applyTime"))
                if (!$util.isInteger(message.applyTime) && !(message.applyTime && $util.isInteger(message.applyTime.low) && $util.isInteger(message.applyTime.high)))
                    return "applyTime: integer|Long expected";
            if (message.expire != null && message.hasOwnProperty("expire"))
                if (!$util.isInteger(message.expire) && !(message.expire && $util.isInteger(message.expire.low) && $util.isInteger(message.expire.high)))
                    return "expire: integer|Long expected";
            if (message.status != null && message.hasOwnProperty("status")) {
                if (!Array.isArray(message.status))
                    return "status: array expected";
                for (var i = 0; i < message.status.length; ++i) {
                    var error = $root.gsbase.ApplyDismissNot.Status.verify(message.status[i]);
                    if (error)
                        return "status." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ApplyDismissNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.ApplyDismissNot} ApplyDismissNot
         */
        ApplyDismissNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.ApplyDismissNot)
                return object;
            var message = new $root.gsbase.ApplyDismissNot();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.applyTime != null)
                if ($util.Long)
                    (message.applyTime = $util.Long.fromValue(object.applyTime)).unsigned = false;
                else if (typeof object.applyTime === "string")
                    message.applyTime = parseInt(object.applyTime, 10);
                else if (typeof object.applyTime === "number")
                    message.applyTime = object.applyTime;
                else if (typeof object.applyTime === "object")
                    message.applyTime = new $util.LongBits(object.applyTime.low >>> 0, object.applyTime.high >>> 0).toNumber();
            if (object.expire != null)
                if ($util.Long)
                    (message.expire = $util.Long.fromValue(object.expire)).unsigned = false;
                else if (typeof object.expire === "string")
                    message.expire = parseInt(object.expire, 10);
                else if (typeof object.expire === "number")
                    message.expire = object.expire;
                else if (typeof object.expire === "object")
                    message.expire = new $util.LongBits(object.expire.low >>> 0, object.expire.high >>> 0).toNumber();
            if (object.status) {
                if (!Array.isArray(object.status))
                    throw TypeError(".gsbase.ApplyDismissNot.status: array expected");
                message.status = [];
                for (var i = 0; i < object.status.length; ++i) {
                    if (typeof object.status[i] !== "object")
                        throw TypeError(".gsbase.ApplyDismissNot.status: object expected");
                    message.status[i] = $root.gsbase.ApplyDismissNot.Status.fromObject(object.status[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ApplyDismissNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.ApplyDismissNot
         * @static
         * @param {gsbase.ApplyDismissNot} message ApplyDismissNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApplyDismissNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.status = [];
            if (options.defaults) {
                object.openid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.applyTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.applyTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.expire = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.expire = options.longs === String ? "0" : 0;
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.applyTime != null && message.hasOwnProperty("applyTime"))
                if (typeof message.applyTime === "number")
                    object.applyTime = options.longs === String ? String(message.applyTime) : message.applyTime;
                else
                    object.applyTime = options.longs === String ? $util.Long.prototype.toString.call(message.applyTime) : options.longs === Number ? new $util.LongBits(message.applyTime.low >>> 0, message.applyTime.high >>> 0).toNumber() : message.applyTime;
            if (message.expire != null && message.hasOwnProperty("expire"))
                if (typeof message.expire === "number")
                    object.expire = options.longs === String ? String(message.expire) : message.expire;
                else
                    object.expire = options.longs === String ? $util.Long.prototype.toString.call(message.expire) : options.longs === Number ? new $util.LongBits(message.expire.low >>> 0, message.expire.high >>> 0).toNumber() : message.expire;
            if (message.status && message.status.length) {
                object.status = [];
                for (var j = 0; j < message.status.length; ++j)
                    object.status[j] = $root.gsbase.ApplyDismissNot.Status.toObject(message.status[j], options);
            }
            return object;
        };

        /**
         * Converts this ApplyDismissNot to JSON.
         * @function toJSON
         * @memberof gsbase.ApplyDismissNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApplyDismissNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        ApplyDismissNot.Status = (function() {

            /**
             * Properties of a Status.
             * @memberof gsbase.ApplyDismissNot
             * @interface IStatus
             * @property {string|null} [openid] Status openid
             * @property {number|Long|null} [opTime] Status opTime
             * @property {boolean|null} [reply] Status reply
             */

            /**
             * Constructs a new Status.
             * @memberof gsbase.ApplyDismissNot
             * @classdesc Represents a Status.
             * @implements IStatus
             * @constructor
             * @param {gsbase.ApplyDismissNot.IStatus=} [properties] Properties to set
             */
            function Status(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Status openid.
             * @member {string} openid
             * @memberof gsbase.ApplyDismissNot.Status
             * @instance
             */
            Status.prototype.openid = "";

            /**
             * Status opTime.
             * @member {number|Long} opTime
             * @memberof gsbase.ApplyDismissNot.Status
             * @instance
             */
            Status.prototype.opTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Status reply.
             * @member {boolean} reply
             * @memberof gsbase.ApplyDismissNot.Status
             * @instance
             */
            Status.prototype.reply = false;

            /**
             * Creates a new Status instance using the specified properties.
             * @function create
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {gsbase.ApplyDismissNot.IStatus=} [properties] Properties to set
             * @returns {gsbase.ApplyDismissNot.Status} Status instance
             */
            Status.create = function create(properties) {
                return new Status(properties);
            };

            /**
             * Encodes the specified Status message. Does not implicitly {@link gsbase.ApplyDismissNot.Status.verify|verify} messages.
             * @function encode
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {gsbase.ApplyDismissNot.IStatus} message Status message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Status.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
                if (message.opTime != null && Object.hasOwnProperty.call(message, "opTime"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.opTime);
                if (message.reply != null && Object.hasOwnProperty.call(message, "reply"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.reply);
                return writer;
            };

            /**
             * Encodes the specified Status message, length delimited. Does not implicitly {@link gsbase.ApplyDismissNot.Status.verify|verify} messages.
             * @function encodeDelimited
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {gsbase.ApplyDismissNot.IStatus} message Status message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Status.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Status message from the specified reader or buffer.
             * @function decode
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {gsbase.ApplyDismissNot.Status} Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Status.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ApplyDismissNot.Status();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openid = reader.string();
                        break;
                    case 2:
                        message.opTime = reader.int64();
                        break;
                    case 3:
                        message.reply = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Status message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {gsbase.ApplyDismissNot.Status} Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Status.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Status message.
             * @function verify
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Status.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.openid != null && message.hasOwnProperty("openid"))
                    if (!$util.isString(message.openid))
                        return "openid: string expected";
                if (message.opTime != null && message.hasOwnProperty("opTime"))
                    if (!$util.isInteger(message.opTime) && !(message.opTime && $util.isInteger(message.opTime.low) && $util.isInteger(message.opTime.high)))
                        return "opTime: integer|Long expected";
                if (message.reply != null && message.hasOwnProperty("reply"))
                    if (typeof message.reply !== "boolean")
                        return "reply: boolean expected";
                return null;
            };

            /**
             * Creates a Status message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gsbase.ApplyDismissNot.Status} Status
             */
            Status.fromObject = function fromObject(object) {
                if (object instanceof $root.gsbase.ApplyDismissNot.Status)
                    return object;
                var message = new $root.gsbase.ApplyDismissNot.Status();
                if (object.openid != null)
                    message.openid = String(object.openid);
                if (object.opTime != null)
                    if ($util.Long)
                        (message.opTime = $util.Long.fromValue(object.opTime)).unsigned = false;
                    else if (typeof object.opTime === "string")
                        message.opTime = parseInt(object.opTime, 10);
                    else if (typeof object.opTime === "number")
                        message.opTime = object.opTime;
                    else if (typeof object.opTime === "object")
                        message.opTime = new $util.LongBits(object.opTime.low >>> 0, object.opTime.high >>> 0).toNumber();
                if (object.reply != null)
                    message.reply = Boolean(object.reply);
                return message;
            };

            /**
             * Creates a plain object from a Status message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gsbase.ApplyDismissNot.Status
             * @static
             * @param {gsbase.ApplyDismissNot.Status} message Status
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Status.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.openid = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.opTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.opTime = options.longs === String ? "0" : 0;
                    object.reply = false;
                }
                if (message.openid != null && message.hasOwnProperty("openid"))
                    object.openid = message.openid;
                if (message.opTime != null && message.hasOwnProperty("opTime"))
                    if (typeof message.opTime === "number")
                        object.opTime = options.longs === String ? String(message.opTime) : message.opTime;
                    else
                        object.opTime = options.longs === String ? $util.Long.prototype.toString.call(message.opTime) : options.longs === Number ? new $util.LongBits(message.opTime.low >>> 0, message.opTime.high >>> 0).toNumber() : message.opTime;
                if (message.reply != null && message.hasOwnProperty("reply"))
                    object.reply = message.reply;
                return object;
            };

            /**
             * Converts this Status to JSON.
             * @function toJSON
             * @memberof gsbase.ApplyDismissNot.Status
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Status.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Status;
        })();

        return ApplyDismissNot;
    })();

    gsbase.ReplyDismissReq = (function() {

        /**
         * Properties of a ReplyDismissReq.
         * @memberof gsbase
         * @interface IReplyDismissReq
         * @property {boolean|null} [reply] ReplyDismissReq reply
         */

        /**
         * Constructs a new ReplyDismissReq.
         * @memberof gsbase
         * @classdesc Represents a ReplyDismissReq.
         * @implements IReplyDismissReq
         * @constructor
         * @param {gsbase.IReplyDismissReq=} [properties] Properties to set
         */
        function ReplyDismissReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReplyDismissReq reply.
         * @member {boolean} reply
         * @memberof gsbase.ReplyDismissReq
         * @instance
         */
        ReplyDismissReq.prototype.reply = false;

        /**
         * Creates a new ReplyDismissReq instance using the specified properties.
         * @function create
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {gsbase.IReplyDismissReq=} [properties] Properties to set
         * @returns {gsbase.ReplyDismissReq} ReplyDismissReq instance
         */
        ReplyDismissReq.create = function create(properties) {
            return new ReplyDismissReq(properties);
        };

        /**
         * Encodes the specified ReplyDismissReq message. Does not implicitly {@link gsbase.ReplyDismissReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {gsbase.IReplyDismissReq} message ReplyDismissReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplyDismissReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reply != null && Object.hasOwnProperty.call(message, "reply"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.reply);
            return writer;
        };

        /**
         * Encodes the specified ReplyDismissReq message, length delimited. Does not implicitly {@link gsbase.ReplyDismissReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {gsbase.IReplyDismissReq} message ReplyDismissReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplyDismissReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReplyDismissReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.ReplyDismissReq} ReplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplyDismissReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ReplyDismissReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reply = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReplyDismissReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.ReplyDismissReq} ReplyDismissReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplyDismissReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReplyDismissReq message.
         * @function verify
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReplyDismissReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reply != null && message.hasOwnProperty("reply"))
                if (typeof message.reply !== "boolean")
                    return "reply: boolean expected";
            return null;
        };

        /**
         * Creates a ReplyDismissReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.ReplyDismissReq} ReplyDismissReq
         */
        ReplyDismissReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.ReplyDismissReq)
                return object;
            var message = new $root.gsbase.ReplyDismissReq();
            if (object.reply != null)
                message.reply = Boolean(object.reply);
            return message;
        };

        /**
         * Creates a plain object from a ReplyDismissReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.ReplyDismissReq
         * @static
         * @param {gsbase.ReplyDismissReq} message ReplyDismissReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReplyDismissReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.reply = false;
            if (message.reply != null && message.hasOwnProperty("reply"))
                object.reply = message.reply;
            return object;
        };

        /**
         * Converts this ReplyDismissReq to JSON.
         * @function toJSON
         * @memberof gsbase.ReplyDismissReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReplyDismissReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReplyDismissReq;
    })();

    gsbase.ReplyDismissRsp = (function() {

        /**
         * Properties of a ReplyDismissRsp.
         * @memberof gsbase
         * @interface IReplyDismissRsp
         * @property {string|null} [err] ReplyDismissRsp err
         */

        /**
         * Constructs a new ReplyDismissRsp.
         * @memberof gsbase
         * @classdesc Represents a ReplyDismissRsp.
         * @implements IReplyDismissRsp
         * @constructor
         * @param {gsbase.IReplyDismissRsp=} [properties] Properties to set
         */
        function ReplyDismissRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReplyDismissRsp err.
         * @member {string} err
         * @memberof gsbase.ReplyDismissRsp
         * @instance
         */
        ReplyDismissRsp.prototype.err = "";

        /**
         * Creates a new ReplyDismissRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {gsbase.IReplyDismissRsp=} [properties] Properties to set
         * @returns {gsbase.ReplyDismissRsp} ReplyDismissRsp instance
         */
        ReplyDismissRsp.create = function create(properties) {
            return new ReplyDismissRsp(properties);
        };

        /**
         * Encodes the specified ReplyDismissRsp message. Does not implicitly {@link gsbase.ReplyDismissRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {gsbase.IReplyDismissRsp} message ReplyDismissRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplyDismissRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified ReplyDismissRsp message, length delimited. Does not implicitly {@link gsbase.ReplyDismissRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {gsbase.IReplyDismissRsp} message ReplyDismissRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplyDismissRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReplyDismissRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.ReplyDismissRsp} ReplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplyDismissRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ReplyDismissRsp();
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
         * Decodes a ReplyDismissRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.ReplyDismissRsp} ReplyDismissRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplyDismissRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReplyDismissRsp message.
         * @function verify
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReplyDismissRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates a ReplyDismissRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.ReplyDismissRsp} ReplyDismissRsp
         */
        ReplyDismissRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.ReplyDismissRsp)
                return object;
            var message = new $root.gsbase.ReplyDismissRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from a ReplyDismissRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.ReplyDismissRsp
         * @static
         * @param {gsbase.ReplyDismissRsp} message ReplyDismissRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReplyDismissRsp.toObject = function toObject(message, options) {
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
         * Converts this ReplyDismissRsp to JSON.
         * @function toJSON
         * @memberof gsbase.ReplyDismissRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReplyDismissRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReplyDismissRsp;
    })();

    gsbase.ReplyDismissNot = (function() {

        /**
         * Properties of a ReplyDismissNot.
         * @memberof gsbase
         * @interface IReplyDismissNot
         * @property {string|null} [openid] ReplyDismissNot openid
         * @property {boolean|null} [reply] ReplyDismissNot reply
         * @property {Array.<gsbase.ReplyDismissNot.IReplyInfo>|null} [replyList] ReplyDismissNot replyList
         */

        /**
         * Constructs a new ReplyDismissNot.
         * @memberof gsbase
         * @classdesc Represents a ReplyDismissNot.
         * @implements IReplyDismissNot
         * @constructor
         * @param {gsbase.IReplyDismissNot=} [properties] Properties to set
         */
        function ReplyDismissNot(properties) {
            this.replyList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReplyDismissNot openid.
         * @member {string} openid
         * @memberof gsbase.ReplyDismissNot
         * @instance
         */
        ReplyDismissNot.prototype.openid = "";

        /**
         * ReplyDismissNot reply.
         * @member {boolean} reply
         * @memberof gsbase.ReplyDismissNot
         * @instance
         */
        ReplyDismissNot.prototype.reply = false;

        /**
         * ReplyDismissNot replyList.
         * @member {Array.<gsbase.ReplyDismissNot.IReplyInfo>} replyList
         * @memberof gsbase.ReplyDismissNot
         * @instance
         */
        ReplyDismissNot.prototype.replyList = $util.emptyArray;

        /**
         * Creates a new ReplyDismissNot instance using the specified properties.
         * @function create
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {gsbase.IReplyDismissNot=} [properties] Properties to set
         * @returns {gsbase.ReplyDismissNot} ReplyDismissNot instance
         */
        ReplyDismissNot.create = function create(properties) {
            return new ReplyDismissNot(properties);
        };

        /**
         * Encodes the specified ReplyDismissNot message. Does not implicitly {@link gsbase.ReplyDismissNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {gsbase.IReplyDismissNot} message ReplyDismissNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplyDismissNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.reply != null && Object.hasOwnProperty.call(message, "reply"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.reply);
            if (message.replyList != null && message.replyList.length)
                for (var i = 0; i < message.replyList.length; ++i)
                    $root.gsbase.ReplyDismissNot.ReplyInfo.encode(message.replyList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ReplyDismissNot message, length delimited. Does not implicitly {@link gsbase.ReplyDismissNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {gsbase.IReplyDismissNot} message ReplyDismissNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplyDismissNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReplyDismissNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.ReplyDismissNot} ReplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplyDismissNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ReplyDismissNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    message.reply = reader.bool();
                    break;
                case 3:
                    if (!(message.replyList && message.replyList.length))
                        message.replyList = [];
                    message.replyList.push($root.gsbase.ReplyDismissNot.ReplyInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReplyDismissNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.ReplyDismissNot} ReplyDismissNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplyDismissNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReplyDismissNot message.
         * @function verify
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReplyDismissNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.reply != null && message.hasOwnProperty("reply"))
                if (typeof message.reply !== "boolean")
                    return "reply: boolean expected";
            if (message.replyList != null && message.hasOwnProperty("replyList")) {
                if (!Array.isArray(message.replyList))
                    return "replyList: array expected";
                for (var i = 0; i < message.replyList.length; ++i) {
                    var error = $root.gsbase.ReplyDismissNot.ReplyInfo.verify(message.replyList[i]);
                    if (error)
                        return "replyList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ReplyDismissNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.ReplyDismissNot} ReplyDismissNot
         */
        ReplyDismissNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.ReplyDismissNot)
                return object;
            var message = new $root.gsbase.ReplyDismissNot();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.reply != null)
                message.reply = Boolean(object.reply);
            if (object.replyList) {
                if (!Array.isArray(object.replyList))
                    throw TypeError(".gsbase.ReplyDismissNot.replyList: array expected");
                message.replyList = [];
                for (var i = 0; i < object.replyList.length; ++i) {
                    if (typeof object.replyList[i] !== "object")
                        throw TypeError(".gsbase.ReplyDismissNot.replyList: object expected");
                    message.replyList[i] = $root.gsbase.ReplyDismissNot.ReplyInfo.fromObject(object.replyList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ReplyDismissNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.ReplyDismissNot
         * @static
         * @param {gsbase.ReplyDismissNot} message ReplyDismissNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReplyDismissNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.replyList = [];
            if (options.defaults) {
                object.openid = "";
                object.reply = false;
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.reply != null && message.hasOwnProperty("reply"))
                object.reply = message.reply;
            if (message.replyList && message.replyList.length) {
                object.replyList = [];
                for (var j = 0; j < message.replyList.length; ++j)
                    object.replyList[j] = $root.gsbase.ReplyDismissNot.ReplyInfo.toObject(message.replyList[j], options);
            }
            return object;
        };

        /**
         * Converts this ReplyDismissNot to JSON.
         * @function toJSON
         * @memberof gsbase.ReplyDismissNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReplyDismissNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        ReplyDismissNot.ReplyInfo = (function() {

            /**
             * Properties of a ReplyInfo.
             * @memberof gsbase.ReplyDismissNot
             * @interface IReplyInfo
             * @property {string|null} [openid] ReplyInfo openid
             * @property {boolean|null} [reply] ReplyInfo reply
             */

            /**
             * Constructs a new ReplyInfo.
             * @memberof gsbase.ReplyDismissNot
             * @classdesc Represents a ReplyInfo.
             * @implements IReplyInfo
             * @constructor
             * @param {gsbase.ReplyDismissNot.IReplyInfo=} [properties] Properties to set
             */
            function ReplyInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ReplyInfo openid.
             * @member {string} openid
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @instance
             */
            ReplyInfo.prototype.openid = "";

            /**
             * ReplyInfo reply.
             * @member {boolean} reply
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @instance
             */
            ReplyInfo.prototype.reply = false;

            /**
             * Creates a new ReplyInfo instance using the specified properties.
             * @function create
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {gsbase.ReplyDismissNot.IReplyInfo=} [properties] Properties to set
             * @returns {gsbase.ReplyDismissNot.ReplyInfo} ReplyInfo instance
             */
            ReplyInfo.create = function create(properties) {
                return new ReplyInfo(properties);
            };

            /**
             * Encodes the specified ReplyInfo message. Does not implicitly {@link gsbase.ReplyDismissNot.ReplyInfo.verify|verify} messages.
             * @function encode
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {gsbase.ReplyDismissNot.IReplyInfo} message ReplyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReplyInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
                if (message.reply != null && Object.hasOwnProperty.call(message, "reply"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.reply);
                return writer;
            };

            /**
             * Encodes the specified ReplyInfo message, length delimited. Does not implicitly {@link gsbase.ReplyDismissNot.ReplyInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {gsbase.ReplyDismissNot.IReplyInfo} message ReplyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReplyInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ReplyInfo message from the specified reader or buffer.
             * @function decode
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {gsbase.ReplyDismissNot.ReplyInfo} ReplyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReplyInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.ReplyDismissNot.ReplyInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openid = reader.string();
                        break;
                    case 2:
                        message.reply = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ReplyInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {gsbase.ReplyDismissNot.ReplyInfo} ReplyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReplyInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ReplyInfo message.
             * @function verify
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReplyInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.openid != null && message.hasOwnProperty("openid"))
                    if (!$util.isString(message.openid))
                        return "openid: string expected";
                if (message.reply != null && message.hasOwnProperty("reply"))
                    if (typeof message.reply !== "boolean")
                        return "reply: boolean expected";
                return null;
            };

            /**
             * Creates a ReplyInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gsbase.ReplyDismissNot.ReplyInfo} ReplyInfo
             */
            ReplyInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.gsbase.ReplyDismissNot.ReplyInfo)
                    return object;
                var message = new $root.gsbase.ReplyDismissNot.ReplyInfo();
                if (object.openid != null)
                    message.openid = String(object.openid);
                if (object.reply != null)
                    message.reply = Boolean(object.reply);
                return message;
            };

            /**
             * Creates a plain object from a ReplyInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @static
             * @param {gsbase.ReplyDismissNot.ReplyInfo} message ReplyInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReplyInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.openid = "";
                    object.reply = false;
                }
                if (message.openid != null && message.hasOwnProperty("openid"))
                    object.openid = message.openid;
                if (message.reply != null && message.hasOwnProperty("reply"))
                    object.reply = message.reply;
                return object;
            };

            /**
             * Converts this ReplyInfo to JSON.
             * @function toJSON
             * @memberof gsbase.ReplyDismissNot.ReplyInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReplyInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ReplyInfo;
        })();

        return ReplyDismissNot;
    })();

    gsbase.KickOutReq = (function() {

        /**
         * Properties of a KickOutReq.
         * @memberof gsbase
         * @interface IKickOutReq
         * @property {string|null} [openid] KickOutReq openid
         */

        /**
         * Constructs a new KickOutReq.
         * @memberof gsbase
         * @classdesc Represents a KickOutReq.
         * @implements IKickOutReq
         * @constructor
         * @param {gsbase.IKickOutReq=} [properties] Properties to set
         */
        function KickOutReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KickOutReq openid.
         * @member {string} openid
         * @memberof gsbase.KickOutReq
         * @instance
         */
        KickOutReq.prototype.openid = "";

        /**
         * Creates a new KickOutReq instance using the specified properties.
         * @function create
         * @memberof gsbase.KickOutReq
         * @static
         * @param {gsbase.IKickOutReq=} [properties] Properties to set
         * @returns {gsbase.KickOutReq} KickOutReq instance
         */
        KickOutReq.create = function create(properties) {
            return new KickOutReq(properties);
        };

        /**
         * Encodes the specified KickOutReq message. Does not implicitly {@link gsbase.KickOutReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.KickOutReq
         * @static
         * @param {gsbase.IKickOutReq} message KickOutReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickOutReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            return writer;
        };

        /**
         * Encodes the specified KickOutReq message, length delimited. Does not implicitly {@link gsbase.KickOutReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.KickOutReq
         * @static
         * @param {gsbase.IKickOutReq} message KickOutReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickOutReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KickOutReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.KickOutReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.KickOutReq} KickOutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickOutReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.KickOutReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
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
         * Decodes a KickOutReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.KickOutReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.KickOutReq} KickOutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickOutReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KickOutReq message.
         * @function verify
         * @memberof gsbase.KickOutReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KickOutReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            return null;
        };

        /**
         * Creates a KickOutReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.KickOutReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.KickOutReq} KickOutReq
         */
        KickOutReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.KickOutReq)
                return object;
            var message = new $root.gsbase.KickOutReq();
            if (object.openid != null)
                message.openid = String(object.openid);
            return message;
        };

        /**
         * Creates a plain object from a KickOutReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.KickOutReq
         * @static
         * @param {gsbase.KickOutReq} message KickOutReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KickOutReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.openid = "";
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            return object;
        };

        /**
         * Converts this KickOutReq to JSON.
         * @function toJSON
         * @memberof gsbase.KickOutReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KickOutReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KickOutReq;
    })();

    gsbase.KickOutRsp = (function() {

        /**
         * Properties of a KickOutRsp.
         * @memberof gsbase
         * @interface IKickOutRsp
         * @property {string|null} [err] KickOutRsp err
         */

        /**
         * Constructs a new KickOutRsp.
         * @memberof gsbase
         * @classdesc Represents a KickOutRsp.
         * @implements IKickOutRsp
         * @constructor
         * @param {gsbase.IKickOutRsp=} [properties] Properties to set
         */
        function KickOutRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KickOutRsp err.
         * @member {string} err
         * @memberof gsbase.KickOutRsp
         * @instance
         */
        KickOutRsp.prototype.err = "";

        /**
         * Creates a new KickOutRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {gsbase.IKickOutRsp=} [properties] Properties to set
         * @returns {gsbase.KickOutRsp} KickOutRsp instance
         */
        KickOutRsp.create = function create(properties) {
            return new KickOutRsp(properties);
        };

        /**
         * Encodes the specified KickOutRsp message. Does not implicitly {@link gsbase.KickOutRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {gsbase.IKickOutRsp} message KickOutRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickOutRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified KickOutRsp message, length delimited. Does not implicitly {@link gsbase.KickOutRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {gsbase.IKickOutRsp} message KickOutRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickOutRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KickOutRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.KickOutRsp} KickOutRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickOutRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.KickOutRsp();
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
         * Decodes a KickOutRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.KickOutRsp} KickOutRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickOutRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KickOutRsp message.
         * @function verify
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KickOutRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates a KickOutRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.KickOutRsp} KickOutRsp
         */
        KickOutRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.KickOutRsp)
                return object;
            var message = new $root.gsbase.KickOutRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from a KickOutRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.KickOutRsp
         * @static
         * @param {gsbase.KickOutRsp} message KickOutRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KickOutRsp.toObject = function toObject(message, options) {
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
         * Converts this KickOutRsp to JSON.
         * @function toJSON
         * @memberof gsbase.KickOutRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KickOutRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KickOutRsp;
    })();

    gsbase.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof gsbase
         * @interface IPlayer
         * @property {string|null} [openid] Player openid
         * @property {Object.<string,string>|null} [metadata] Player metadata
         * @property {string|null} [nickname] Player nickname
         * @property {number|null} [type] Player type
         */

        /**
         * Constructs a new Player.
         * @memberof gsbase
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {gsbase.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            this.metadata = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player openid.
         * @member {string} openid
         * @memberof gsbase.Player
         * @instance
         */
        Player.prototype.openid = "";

        /**
         * Player metadata.
         * @member {Object.<string,string>} metadata
         * @memberof gsbase.Player
         * @instance
         */
        Player.prototype.metadata = $util.emptyObject;

        /**
         * Player nickname.
         * @member {string} nickname
         * @memberof gsbase.Player
         * @instance
         */
        Player.prototype.nickname = "";

        /**
         * Player type.
         * @member {number} type
         * @memberof gsbase.Player
         * @instance
         */
        Player.prototype.type = 0;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof gsbase.Player
         * @static
         * @param {gsbase.IPlayer=} [properties] Properties to set
         * @returns {gsbase.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link gsbase.Player.verify|verify} messages.
         * @function encode
         * @memberof gsbase.Player
         * @static
         * @param {gsbase.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
                for (var keys = Object.keys(message.metadata), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.metadata[keys[i]]).ldelim();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link gsbase.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.Player
         * @static
         * @param {gsbase.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.Player(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    if (message.metadata === $util.emptyObject)
                        message.metadata = {};
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
                    message.metadata[key] = value;
                    break;
                case 3:
                    message.nickname = reader.string();
                    break;
                case 4:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof gsbase.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.metadata != null && message.hasOwnProperty("metadata")) {
                if (!$util.isObject(message.metadata))
                    return "metadata: object expected";
                var key = Object.keys(message.metadata);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.metadata[key[i]]))
                        return "metadata: string{k:string} expected";
            }
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.Player)
                return object;
            var message = new $root.gsbase.Player();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.metadata) {
                if (typeof object.metadata !== "object")
                    throw TypeError(".gsbase.Player.metadata: object expected");
                message.metadata = {};
                for (var keys = Object.keys(object.metadata), i = 0; i < keys.length; ++i)
                    message.metadata[keys[i]] = String(object.metadata[keys[i]]);
            }
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.type != null)
                message.type = object.type | 0;
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.Player
         * @static
         * @param {gsbase.Player} message Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.metadata = {};
            if (options.defaults) {
                object.openid = "";
                object.nickname = "";
                object.type = 0;
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            var keys2;
            if (message.metadata && (keys2 = Object.keys(message.metadata)).length) {
                object.metadata = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.metadata[keys2[j]] = message.metadata[keys2[j]];
            }
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof gsbase.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Player;
    })();

    gsbase.RoomInfo = (function() {

        /**
         * Properties of a RoomInfo.
         * @memberof gsbase
         * @interface IRoomInfo
         * @property {string|null} [roomId] RoomInfo roomId
         * @property {string|null} [matchCode] RoomInfo matchCode
         * @property {string|null} [metadata] RoomInfo metadata
         * @property {Array.<gsbase.IPlayer>|null} [players] RoomInfo players
         * @property {string|null} [owner] RoomInfo owner
         * @property {number|Long|null} [createAt] RoomInfo createAt
         * @property {number|null} [minPlayerNum] RoomInfo minPlayerNum
         * @property {number|null} [maxPlayerNum] RoomInfo maxPlayerNum
         * @property {string|null} [gameGid] RoomInfo gameGid
         * @property {string|null} [serverId] RoomInfo serverId
         */

        /**
         * Constructs a new RoomInfo.
         * @memberof gsbase
         * @classdesc Represents a RoomInfo.
         * @implements IRoomInfo
         * @constructor
         * @param {gsbase.IRoomInfo=} [properties] Properties to set
         */
        function RoomInfo(properties) {
            this.players = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomInfo roomId.
         * @member {string} roomId
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomId = "";

        /**
         * RoomInfo matchCode.
         * @member {string} matchCode
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.matchCode = "";

        /**
         * RoomInfo metadata.
         * @member {string} metadata
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.metadata = "";

        /**
         * RoomInfo players.
         * @member {Array.<gsbase.IPlayer>} players
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.players = $util.emptyArray;

        /**
         * RoomInfo owner.
         * @member {string} owner
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.owner = "";

        /**
         * RoomInfo createAt.
         * @member {number|Long} createAt
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.createAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RoomInfo minPlayerNum.
         * @member {number} minPlayerNum
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.minPlayerNum = 0;

        /**
         * RoomInfo maxPlayerNum.
         * @member {number} maxPlayerNum
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.maxPlayerNum = 0;

        /**
         * RoomInfo gameGid.
         * @member {string} gameGid
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.gameGid = "";

        /**
         * RoomInfo serverId.
         * @member {string} serverId
         * @memberof gsbase.RoomInfo
         * @instance
         */
        RoomInfo.prototype.serverId = "";

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @function create
         * @memberof gsbase.RoomInfo
         * @static
         * @param {gsbase.IRoomInfo=} [properties] Properties to set
         * @returns {gsbase.RoomInfo} RoomInfo instance
         */
        RoomInfo.create = function create(properties) {
            return new RoomInfo(properties);
        };

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link gsbase.RoomInfo.verify|verify} messages.
         * @function encode
         * @memberof gsbase.RoomInfo
         * @static
         * @param {gsbase.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.matchCode != null && Object.hasOwnProperty.call(message, "matchCode"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.matchCode);
            if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.metadata);
            if (message.players != null && message.players.length)
                for (var i = 0; i < message.players.length; ++i)
                    $root.gsbase.Player.encode(message.players[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.owner);
            if (message.createAt != null && Object.hasOwnProperty.call(message, "createAt"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.createAt);
            if (message.minPlayerNum != null && Object.hasOwnProperty.call(message, "minPlayerNum"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.minPlayerNum);
            if (message.maxPlayerNum != null && Object.hasOwnProperty.call(message, "maxPlayerNum"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.maxPlayerNum);
            if (message.gameGid != null && Object.hasOwnProperty.call(message, "gameGid"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.gameGid);
            if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.serverId);
            return writer;
        };

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link gsbase.RoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.RoomInfo
         * @static
         * @param {gsbase.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.RoomInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.matchCode = reader.string();
                    break;
                case 3:
                    message.metadata = reader.string();
                    break;
                case 4:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.gsbase.Player.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.owner = reader.string();
                    break;
                case 6:
                    message.createAt = reader.int64();
                    break;
                case 7:
                    message.minPlayerNum = reader.int32();
                    break;
                case 8:
                    message.maxPlayerNum = reader.int32();
                    break;
                case 9:
                    message.gameGid = reader.string();
                    break;
                case 10:
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
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.RoomInfo} RoomInfo
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
         * @memberof gsbase.RoomInfo
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
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                if (!$util.isString(message.matchCode))
                    return "matchCode: string expected";
            if (message.metadata != null && message.hasOwnProperty("metadata"))
                if (!$util.isString(message.metadata))
                    return "metadata: string expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (var i = 0; i < message.players.length; ++i) {
                    var error = $root.gsbase.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.owner != null && message.hasOwnProperty("owner"))
                if (!$util.isString(message.owner))
                    return "owner: string expected";
            if (message.createAt != null && message.hasOwnProperty("createAt"))
                if (!$util.isInteger(message.createAt) && !(message.createAt && $util.isInteger(message.createAt.low) && $util.isInteger(message.createAt.high)))
                    return "createAt: integer|Long expected";
            if (message.minPlayerNum != null && message.hasOwnProperty("minPlayerNum"))
                if (!$util.isInteger(message.minPlayerNum))
                    return "minPlayerNum: integer expected";
            if (message.maxPlayerNum != null && message.hasOwnProperty("maxPlayerNum"))
                if (!$util.isInteger(message.maxPlayerNum))
                    return "maxPlayerNum: integer expected";
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                if (!$util.isString(message.gameGid))
                    return "gameGid: string expected";
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                if (!$util.isString(message.serverId))
                    return "serverId: string expected";
            return null;
        };

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.RoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.RoomInfo} RoomInfo
         */
        RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.RoomInfo)
                return object;
            var message = new $root.gsbase.RoomInfo();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.matchCode != null)
                message.matchCode = String(object.matchCode);
            if (object.metadata != null)
                message.metadata = String(object.metadata);
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".gsbase.RoomInfo.players: array expected");
                message.players = [];
                for (var i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".gsbase.RoomInfo.players: object expected");
                    message.players[i] = $root.gsbase.Player.fromObject(object.players[i]);
                }
            }
            if (object.owner != null)
                message.owner = String(object.owner);
            if (object.createAt != null)
                if ($util.Long)
                    (message.createAt = $util.Long.fromValue(object.createAt)).unsigned = false;
                else if (typeof object.createAt === "string")
                    message.createAt = parseInt(object.createAt, 10);
                else if (typeof object.createAt === "number")
                    message.createAt = object.createAt;
                else if (typeof object.createAt === "object")
                    message.createAt = new $util.LongBits(object.createAt.low >>> 0, object.createAt.high >>> 0).toNumber();
            if (object.minPlayerNum != null)
                message.minPlayerNum = object.minPlayerNum | 0;
            if (object.maxPlayerNum != null)
                message.maxPlayerNum = object.maxPlayerNum | 0;
            if (object.gameGid != null)
                message.gameGid = String(object.gameGid);
            if (object.serverId != null)
                message.serverId = String(object.serverId);
            return message;
        };

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.RoomInfo
         * @static
         * @param {gsbase.RoomInfo} message RoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (options.defaults) {
                object.roomId = "";
                object.matchCode = "";
                object.metadata = "";
                object.owner = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createAt = options.longs === String ? "0" : 0;
                object.minPlayerNum = 0;
                object.maxPlayerNum = 0;
                object.gameGid = "";
                object.serverId = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.matchCode != null && message.hasOwnProperty("matchCode"))
                object.matchCode = message.matchCode;
            if (message.metadata != null && message.hasOwnProperty("metadata"))
                object.metadata = message.metadata;
            if (message.players && message.players.length) {
                object.players = [];
                for (var j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.gsbase.Player.toObject(message.players[j], options);
            }
            if (message.owner != null && message.hasOwnProperty("owner"))
                object.owner = message.owner;
            if (message.createAt != null && message.hasOwnProperty("createAt"))
                if (typeof message.createAt === "number")
                    object.createAt = options.longs === String ? String(message.createAt) : message.createAt;
                else
                    object.createAt = options.longs === String ? $util.Long.prototype.toString.call(message.createAt) : options.longs === Number ? new $util.LongBits(message.createAt.low >>> 0, message.createAt.high >>> 0).toNumber() : message.createAt;
            if (message.minPlayerNum != null && message.hasOwnProperty("minPlayerNum"))
                object.minPlayerNum = message.minPlayerNum;
            if (message.maxPlayerNum != null && message.hasOwnProperty("maxPlayerNum"))
                object.maxPlayerNum = message.maxPlayerNum;
            if (message.gameGid != null && message.hasOwnProperty("gameGid"))
                object.gameGid = message.gameGid;
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                object.serverId = message.serverId;
            return object;
        };

        /**
         * Converts this RoomInfo to JSON.
         * @function toJSON
         * @memberof gsbase.RoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomInfo;
    })();

    gsbase.GsbPingReq = (function() {

        /**
         * Properties of a GsbPingReq.
         * @memberof gsbase
         * @interface IGsbPingReq
         * @property {number|Long|null} [reqTime] GsbPingReq reqTime
         */

        /**
         * Constructs a new GsbPingReq.
         * @memberof gsbase
         * @classdesc Represents a GsbPingReq.
         * @implements IGsbPingReq
         * @constructor
         * @param {gsbase.IGsbPingReq=} [properties] Properties to set
         */
        function GsbPingReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GsbPingReq reqTime.
         * @member {number|Long} reqTime
         * @memberof gsbase.GsbPingReq
         * @instance
         */
        GsbPingReq.prototype.reqTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GsbPingReq instance using the specified properties.
         * @function create
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {gsbase.IGsbPingReq=} [properties] Properties to set
         * @returns {gsbase.GsbPingReq} GsbPingReq instance
         */
        GsbPingReq.create = function create(properties) {
            return new GsbPingReq(properties);
        };

        /**
         * Encodes the specified GsbPingReq message. Does not implicitly {@link gsbase.GsbPingReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {gsbase.IGsbPingReq} message GsbPingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GsbPingReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqTime != null && Object.hasOwnProperty.call(message, "reqTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.reqTime);
            return writer;
        };

        /**
         * Encodes the specified GsbPingReq message, length delimited. Does not implicitly {@link gsbase.GsbPingReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {gsbase.IGsbPingReq} message GsbPingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GsbPingReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GsbPingReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.GsbPingReq} GsbPingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GsbPingReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.GsbPingReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GsbPingReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.GsbPingReq} GsbPingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GsbPingReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GsbPingReq message.
         * @function verify
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GsbPingReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqTime != null && message.hasOwnProperty("reqTime"))
                if (!$util.isInteger(message.reqTime) && !(message.reqTime && $util.isInteger(message.reqTime.low) && $util.isInteger(message.reqTime.high)))
                    return "reqTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a GsbPingReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.GsbPingReq} GsbPingReq
         */
        GsbPingReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.GsbPingReq)
                return object;
            var message = new $root.gsbase.GsbPingReq();
            if (object.reqTime != null)
                if ($util.Long)
                    (message.reqTime = $util.Long.fromValue(object.reqTime)).unsigned = false;
                else if (typeof object.reqTime === "string")
                    message.reqTime = parseInt(object.reqTime, 10);
                else if (typeof object.reqTime === "number")
                    message.reqTime = object.reqTime;
                else if (typeof object.reqTime === "object")
                    message.reqTime = new $util.LongBits(object.reqTime.low >>> 0, object.reqTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GsbPingReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.GsbPingReq
         * @static
         * @param {gsbase.GsbPingReq} message GsbPingReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GsbPingReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.reqTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.reqTime = options.longs === String ? "0" : 0;
            if (message.reqTime != null && message.hasOwnProperty("reqTime"))
                if (typeof message.reqTime === "number")
                    object.reqTime = options.longs === String ? String(message.reqTime) : message.reqTime;
                else
                    object.reqTime = options.longs === String ? $util.Long.prototype.toString.call(message.reqTime) : options.longs === Number ? new $util.LongBits(message.reqTime.low >>> 0, message.reqTime.high >>> 0).toNumber() : message.reqTime;
            return object;
        };

        /**
         * Converts this GsbPingReq to JSON.
         * @function toJSON
         * @memberof gsbase.GsbPingReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GsbPingReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GsbPingReq;
    })();

    gsbase.GsbPingRsp = (function() {

        /**
         * Properties of a GsbPingRsp.
         * @memberof gsbase
         * @interface IGsbPingRsp
         * @property {number|Long|null} [reqTime] GsbPingRsp reqTime
         * @property {number|Long|null} [ackTime] GsbPingRsp ackTime
         */

        /**
         * Constructs a new GsbPingRsp.
         * @memberof gsbase
         * @classdesc Represents a GsbPingRsp.
         * @implements IGsbPingRsp
         * @constructor
         * @param {gsbase.IGsbPingRsp=} [properties] Properties to set
         */
        function GsbPingRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GsbPingRsp reqTime.
         * @member {number|Long} reqTime
         * @memberof gsbase.GsbPingRsp
         * @instance
         */
        GsbPingRsp.prototype.reqTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GsbPingRsp ackTime.
         * @member {number|Long} ackTime
         * @memberof gsbase.GsbPingRsp
         * @instance
         */
        GsbPingRsp.prototype.ackTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GsbPingRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {gsbase.IGsbPingRsp=} [properties] Properties to set
         * @returns {gsbase.GsbPingRsp} GsbPingRsp instance
         */
        GsbPingRsp.create = function create(properties) {
            return new GsbPingRsp(properties);
        };

        /**
         * Encodes the specified GsbPingRsp message. Does not implicitly {@link gsbase.GsbPingRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {gsbase.IGsbPingRsp} message GsbPingRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GsbPingRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqTime != null && Object.hasOwnProperty.call(message, "reqTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.reqTime);
            if (message.ackTime != null && Object.hasOwnProperty.call(message, "ackTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.ackTime);
            return writer;
        };

        /**
         * Encodes the specified GsbPingRsp message, length delimited. Does not implicitly {@link gsbase.GsbPingRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {gsbase.IGsbPingRsp} message GsbPingRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GsbPingRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GsbPingRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.GsbPingRsp} GsbPingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GsbPingRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.GsbPingRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqTime = reader.int64();
                    break;
                case 2:
                    message.ackTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GsbPingRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.GsbPingRsp} GsbPingRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GsbPingRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GsbPingRsp message.
         * @function verify
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GsbPingRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqTime != null && message.hasOwnProperty("reqTime"))
                if (!$util.isInteger(message.reqTime) && !(message.reqTime && $util.isInteger(message.reqTime.low) && $util.isInteger(message.reqTime.high)))
                    return "reqTime: integer|Long expected";
            if (message.ackTime != null && message.hasOwnProperty("ackTime"))
                if (!$util.isInteger(message.ackTime) && !(message.ackTime && $util.isInteger(message.ackTime.low) && $util.isInteger(message.ackTime.high)))
                    return "ackTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a GsbPingRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.GsbPingRsp} GsbPingRsp
         */
        GsbPingRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.GsbPingRsp)
                return object;
            var message = new $root.gsbase.GsbPingRsp();
            if (object.reqTime != null)
                if ($util.Long)
                    (message.reqTime = $util.Long.fromValue(object.reqTime)).unsigned = false;
                else if (typeof object.reqTime === "string")
                    message.reqTime = parseInt(object.reqTime, 10);
                else if (typeof object.reqTime === "number")
                    message.reqTime = object.reqTime;
                else if (typeof object.reqTime === "object")
                    message.reqTime = new $util.LongBits(object.reqTime.low >>> 0, object.reqTime.high >>> 0).toNumber();
            if (object.ackTime != null)
                if ($util.Long)
                    (message.ackTime = $util.Long.fromValue(object.ackTime)).unsigned = false;
                else if (typeof object.ackTime === "string")
                    message.ackTime = parseInt(object.ackTime, 10);
                else if (typeof object.ackTime === "number")
                    message.ackTime = object.ackTime;
                else if (typeof object.ackTime === "object")
                    message.ackTime = new $util.LongBits(object.ackTime.low >>> 0, object.ackTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GsbPingRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.GsbPingRsp
         * @static
         * @param {gsbase.GsbPingRsp} message GsbPingRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GsbPingRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.reqTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.reqTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ackTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ackTime = options.longs === String ? "0" : 0;
            }
            if (message.reqTime != null && message.hasOwnProperty("reqTime"))
                if (typeof message.reqTime === "number")
                    object.reqTime = options.longs === String ? String(message.reqTime) : message.reqTime;
                else
                    object.reqTime = options.longs === String ? $util.Long.prototype.toString.call(message.reqTime) : options.longs === Number ? new $util.LongBits(message.reqTime.low >>> 0, message.reqTime.high >>> 0).toNumber() : message.reqTime;
            if (message.ackTime != null && message.hasOwnProperty("ackTime"))
                if (typeof message.ackTime === "number")
                    object.ackTime = options.longs === String ? String(message.ackTime) : message.ackTime;
                else
                    object.ackTime = options.longs === String ? $util.Long.prototype.toString.call(message.ackTime) : options.longs === Number ? new $util.LongBits(message.ackTime.low >>> 0, message.ackTime.high >>> 0).toNumber() : message.ackTime;
            return object;
        };

        /**
         * Converts this GsbPingRsp to JSON.
         * @function toJSON
         * @memberof gsbase.GsbPingRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GsbPingRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GsbPingRsp;
    })();

    gsbase.RoundStartNot = (function() {

        /**
         * Properties of a RoundStartNot.
         * @memberof gsbase
         * @interface IRoundStartNot
         * @property {string|null} [roundId] RoundStartNot roundId
         * @property {number|null} [curRound] RoundStartNot curRound
         * @property {number|Long|null} [startTime] RoundStartNot startTime
         */

        /**
         * Constructs a new RoundStartNot.
         * @memberof gsbase
         * @classdesc Represents a RoundStartNot.
         * @implements IRoundStartNot
         * @constructor
         * @param {gsbase.IRoundStartNot=} [properties] Properties to set
         */
        function RoundStartNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoundStartNot roundId.
         * @member {string} roundId
         * @memberof gsbase.RoundStartNot
         * @instance
         */
        RoundStartNot.prototype.roundId = "";

        /**
         * RoundStartNot curRound.
         * @member {number} curRound
         * @memberof gsbase.RoundStartNot
         * @instance
         */
        RoundStartNot.prototype.curRound = 0;

        /**
         * RoundStartNot startTime.
         * @member {number|Long} startTime
         * @memberof gsbase.RoundStartNot
         * @instance
         */
        RoundStartNot.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RoundStartNot instance using the specified properties.
         * @function create
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {gsbase.IRoundStartNot=} [properties] Properties to set
         * @returns {gsbase.RoundStartNot} RoundStartNot instance
         */
        RoundStartNot.create = function create(properties) {
            return new RoundStartNot(properties);
        };

        /**
         * Encodes the specified RoundStartNot message. Does not implicitly {@link gsbase.RoundStartNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {gsbase.IRoundStartNot} message RoundStartNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundStartNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roundId != null && Object.hasOwnProperty.call(message, "roundId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roundId);
            if (message.curRound != null && Object.hasOwnProperty.call(message, "curRound"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.curRound);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.startTime);
            return writer;
        };

        /**
         * Encodes the specified RoundStartNot message, length delimited. Does not implicitly {@link gsbase.RoundStartNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {gsbase.IRoundStartNot} message RoundStartNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundStartNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoundStartNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.RoundStartNot} RoundStartNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundStartNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.RoundStartNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roundId = reader.string();
                    break;
                case 2:
                    message.curRound = reader.int32();
                    break;
                case 3:
                    message.startTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoundStartNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.RoundStartNot} RoundStartNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundStartNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoundStartNot message.
         * @function verify
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoundStartNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roundId != null && message.hasOwnProperty("roundId"))
                if (!$util.isString(message.roundId))
                    return "roundId: string expected";
            if (message.curRound != null && message.hasOwnProperty("curRound"))
                if (!$util.isInteger(message.curRound))
                    return "curRound: integer expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a RoundStartNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.RoundStartNot} RoundStartNot
         */
        RoundStartNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.RoundStartNot)
                return object;
            var message = new $root.gsbase.RoundStartNot();
            if (object.roundId != null)
                message.roundId = String(object.roundId);
            if (object.curRound != null)
                message.curRound = object.curRound | 0;
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RoundStartNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.RoundStartNot
         * @static
         * @param {gsbase.RoundStartNot} message RoundStartNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoundStartNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roundId = "";
                object.curRound = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTime = options.longs === String ? "0" : 0;
            }
            if (message.roundId != null && message.hasOwnProperty("roundId"))
                object.roundId = message.roundId;
            if (message.curRound != null && message.hasOwnProperty("curRound"))
                object.curRound = message.curRound;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            return object;
        };

        /**
         * Converts this RoundStartNot to JSON.
         * @function toJSON
         * @memberof gsbase.RoundStartNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoundStartNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoundStartNot;
    })();

    gsbase.RoundEndNot = (function() {

        /**
         * Properties of a RoundEndNot.
         * @memberof gsbase
         * @interface IRoundEndNot
         * @property {string|null} [roundId] RoundEndNot roundId
         * @property {number|null} [curRound] RoundEndNot curRound
         * @property {number|Long|null} [endTime] RoundEndNot endTime
         */

        /**
         * Constructs a new RoundEndNot.
         * @memberof gsbase
         * @classdesc Represents a RoundEndNot.
         * @implements IRoundEndNot
         * @constructor
         * @param {gsbase.IRoundEndNot=} [properties] Properties to set
         */
        function RoundEndNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoundEndNot roundId.
         * @member {string} roundId
         * @memberof gsbase.RoundEndNot
         * @instance
         */
        RoundEndNot.prototype.roundId = "";

        /**
         * RoundEndNot curRound.
         * @member {number} curRound
         * @memberof gsbase.RoundEndNot
         * @instance
         */
        RoundEndNot.prototype.curRound = 0;

        /**
         * RoundEndNot endTime.
         * @member {number|Long} endTime
         * @memberof gsbase.RoundEndNot
         * @instance
         */
        RoundEndNot.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RoundEndNot instance using the specified properties.
         * @function create
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {gsbase.IRoundEndNot=} [properties] Properties to set
         * @returns {gsbase.RoundEndNot} RoundEndNot instance
         */
        RoundEndNot.create = function create(properties) {
            return new RoundEndNot(properties);
        };

        /**
         * Encodes the specified RoundEndNot message. Does not implicitly {@link gsbase.RoundEndNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {gsbase.IRoundEndNot} message RoundEndNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundEndNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roundId != null && Object.hasOwnProperty.call(message, "roundId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roundId);
            if (message.curRound != null && Object.hasOwnProperty.call(message, "curRound"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.curRound);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.endTime);
            return writer;
        };

        /**
         * Encodes the specified RoundEndNot message, length delimited. Does not implicitly {@link gsbase.RoundEndNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {gsbase.IRoundEndNot} message RoundEndNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundEndNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoundEndNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.RoundEndNot} RoundEndNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundEndNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.RoundEndNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roundId = reader.string();
                    break;
                case 2:
                    message.curRound = reader.int32();
                    break;
                case 3:
                    message.endTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoundEndNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.RoundEndNot} RoundEndNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundEndNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoundEndNot message.
         * @function verify
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoundEndNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roundId != null && message.hasOwnProperty("roundId"))
                if (!$util.isString(message.roundId))
                    return "roundId: string expected";
            if (message.curRound != null && message.hasOwnProperty("curRound"))
                if (!$util.isInteger(message.curRound))
                    return "curRound: integer expected";
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high)))
                    return "endTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a RoundEndNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.RoundEndNot} RoundEndNot
         */
        RoundEndNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.RoundEndNot)
                return object;
            var message = new $root.gsbase.RoundEndNot();
            if (object.roundId != null)
                message.roundId = String(object.roundId);
            if (object.curRound != null)
                message.curRound = object.curRound | 0;
            if (object.endTime != null)
                if ($util.Long)
                    (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = false;
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RoundEndNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.RoundEndNot
         * @static
         * @param {gsbase.RoundEndNot} message RoundEndNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoundEndNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roundId = "";
                object.curRound = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTime = options.longs === String ? "0" : 0;
            }
            if (message.roundId != null && message.hasOwnProperty("roundId"))
                object.roundId = message.roundId;
            if (message.curRound != null && message.hasOwnProperty("curRound"))
                object.curRound = message.curRound;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
            return object;
        };

        /**
         * Converts this RoundEndNot to JSON.
         * @function toJSON
         * @memberof gsbase.RoundEndNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoundEndNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoundEndNot;
    })();

    gsbase.EnterRoomNot = (function() {

        /**
         * Properties of an EnterRoomNot.
         * @memberof gsbase
         * @interface IEnterRoomNot
         * @property {string|null} [roomId] EnterRoomNot roomId
         * @property {string|null} [uid] EnterRoomNot uid
         * @property {string|null} [nickname] EnterRoomNot nickname
         * @property {number|Long|null} [money] EnterRoomNot money
         * @property {number|null} [type] EnterRoomNot type
         * @property {number|null} [chairId] EnterRoomNot chairId
         */

        /**
         * Constructs a new EnterRoomNot.
         * @memberof gsbase
         * @classdesc Represents an EnterRoomNot.
         * @implements IEnterRoomNot
         * @constructor
         * @param {gsbase.IEnterRoomNot=} [properties] Properties to set
         */
        function EnterRoomNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterRoomNot roomId.
         * @member {string} roomId
         * @memberof gsbase.EnterRoomNot
         * @instance
         */
        EnterRoomNot.prototype.roomId = "";

        /**
         * EnterRoomNot uid.
         * @member {string} uid
         * @memberof gsbase.EnterRoomNot
         * @instance
         */
        EnterRoomNot.prototype.uid = "";

        /**
         * EnterRoomNot nickname.
         * @member {string} nickname
         * @memberof gsbase.EnterRoomNot
         * @instance
         */
        EnterRoomNot.prototype.nickname = "";

        /**
         * EnterRoomNot money.
         * @member {number|Long} money
         * @memberof gsbase.EnterRoomNot
         * @instance
         */
        EnterRoomNot.prototype.money = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EnterRoomNot type.
         * @member {number} type
         * @memberof gsbase.EnterRoomNot
         * @instance
         */
        EnterRoomNot.prototype.type = 0;

        /**
         * EnterRoomNot chairId.
         * @member {number} chairId
         * @memberof gsbase.EnterRoomNot
         * @instance
         */
        EnterRoomNot.prototype.chairId = 0;

        /**
         * Creates a new EnterRoomNot instance using the specified properties.
         * @function create
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {gsbase.IEnterRoomNot=} [properties] Properties to set
         * @returns {gsbase.EnterRoomNot} EnterRoomNot instance
         */
        EnterRoomNot.create = function create(properties) {
            return new EnterRoomNot(properties);
        };

        /**
         * Encodes the specified EnterRoomNot message. Does not implicitly {@link gsbase.EnterRoomNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {gsbase.IEnterRoomNot} message EnterRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uid);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            if (message.money != null && Object.hasOwnProperty.call(message, "money"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.money);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.type);
            if (message.chairId != null && Object.hasOwnProperty.call(message, "chairId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.chairId);
            return writer;
        };

        /**
         * Encodes the specified EnterRoomNot message, length delimited. Does not implicitly {@link gsbase.EnterRoomNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {gsbase.IEnterRoomNot} message EnterRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterRoomNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.EnterRoomNot} EnterRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.EnterRoomNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    message.uid = reader.string();
                    break;
                case 3:
                    message.nickname = reader.string();
                    break;
                case 4:
                    message.money = reader.int64();
                    break;
                case 5:
                    message.type = reader.int32();
                    break;
                case 6:
                    message.chairId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterRoomNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.EnterRoomNot} EnterRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterRoomNot message.
         * @function verify
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterRoomNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isString(message.uid))
                    return "uid: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.money != null && message.hasOwnProperty("money"))
                if (!$util.isInteger(message.money) && !(message.money && $util.isInteger(message.money.low) && $util.isInteger(message.money.high)))
                    return "money: integer|Long expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.chairId != null && message.hasOwnProperty("chairId"))
                if (!$util.isInteger(message.chairId))
                    return "chairId: integer expected";
            return null;
        };

        /**
         * Creates an EnterRoomNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.EnterRoomNot} EnterRoomNot
         */
        EnterRoomNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.EnterRoomNot)
                return object;
            var message = new $root.gsbase.EnterRoomNot();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.uid != null)
                message.uid = String(object.uid);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.money != null)
                if ($util.Long)
                    (message.money = $util.Long.fromValue(object.money)).unsigned = false;
                else if (typeof object.money === "string")
                    message.money = parseInt(object.money, 10);
                else if (typeof object.money === "number")
                    message.money = object.money;
                else if (typeof object.money === "object")
                    message.money = new $util.LongBits(object.money.low >>> 0, object.money.high >>> 0).toNumber();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.chairId != null)
                message.chairId = object.chairId | 0;
            return message;
        };

        /**
         * Creates a plain object from an EnterRoomNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.EnterRoomNot
         * @static
         * @param {gsbase.EnterRoomNot} message EnterRoomNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterRoomNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roomId = "";
                object.uid = "";
                object.nickname = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.money = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.money = options.longs === String ? "0" : 0;
                object.type = 0;
                object.chairId = 0;
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.money != null && message.hasOwnProperty("money"))
                if (typeof message.money === "number")
                    object.money = options.longs === String ? String(message.money) : message.money;
                else
                    object.money = options.longs === String ? $util.Long.prototype.toString.call(message.money) : options.longs === Number ? new $util.LongBits(message.money.low >>> 0, message.money.high >>> 0).toNumber() : message.money;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.chairId != null && message.hasOwnProperty("chairId"))
                object.chairId = message.chairId;
            return object;
        };

        /**
         * Converts this EnterRoomNot to JSON.
         * @function toJSON
         * @memberof gsbase.EnterRoomNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterRoomNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterRoomNot;
    })();

    gsbase.LeaveRoomNot = (function() {

        /**
         * Properties of a LeaveRoomNot.
         * @memberof gsbase
         * @interface ILeaveRoomNot
         * @property {string|null} [plyId] LeaveRoomNot plyId
         * @property {gsbase.LeaveRoomNot.Type|null} [reason] LeaveRoomNot reason
         */

        /**
         * Constructs a new LeaveRoomNot.
         * @memberof gsbase
         * @classdesc Represents a LeaveRoomNot.
         * @implements ILeaveRoomNot
         * @constructor
         * @param {gsbase.ILeaveRoomNot=} [properties] Properties to set
         */
        function LeaveRoomNot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeaveRoomNot plyId.
         * @member {string} plyId
         * @memberof gsbase.LeaveRoomNot
         * @instance
         */
        LeaveRoomNot.prototype.plyId = "";

        /**
         * LeaveRoomNot reason.
         * @member {gsbase.LeaveRoomNot.Type} reason
         * @memberof gsbase.LeaveRoomNot
         * @instance
         */
        LeaveRoomNot.prototype.reason = 0;

        /**
         * Creates a new LeaveRoomNot instance using the specified properties.
         * @function create
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {gsbase.ILeaveRoomNot=} [properties] Properties to set
         * @returns {gsbase.LeaveRoomNot} LeaveRoomNot instance
         */
        LeaveRoomNot.create = function create(properties) {
            return new LeaveRoomNot(properties);
        };

        /**
         * Encodes the specified LeaveRoomNot message. Does not implicitly {@link gsbase.LeaveRoomNot.verify|verify} messages.
         * @function encode
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {gsbase.ILeaveRoomNot} message LeaveRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomNot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.plyId != null && Object.hasOwnProperty.call(message, "plyId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.plyId);
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reason);
            return writer;
        };

        /**
         * Encodes the specified LeaveRoomNot message, length delimited. Does not implicitly {@link gsbase.LeaveRoomNot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {gsbase.ILeaveRoomNot} message LeaveRoomNot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomNot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveRoomNot message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.LeaveRoomNot} LeaveRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomNot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.LeaveRoomNot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.plyId = reader.string();
                    break;
                case 2:
                    message.reason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LeaveRoomNot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.LeaveRoomNot} LeaveRoomNot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomNot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveRoomNot message.
         * @function verify
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoomNot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.plyId != null && message.hasOwnProperty("plyId"))
                if (!$util.isString(message.plyId))
                    return "plyId: string expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        /**
         * Creates a LeaveRoomNot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.LeaveRoomNot} LeaveRoomNot
         */
        LeaveRoomNot.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.LeaveRoomNot)
                return object;
            var message = new $root.gsbase.LeaveRoomNot();
            if (object.plyId != null)
                message.plyId = String(object.plyId);
            switch (object.reason) {
            case "Leave":
            case 0:
                message.reason = 0;
                break;
            case "Kick":
            case 1:
                message.reason = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a LeaveRoomNot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.LeaveRoomNot
         * @static
         * @param {gsbase.LeaveRoomNot} message LeaveRoomNot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoomNot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.plyId = "";
                object.reason = options.enums === String ? "Leave" : 0;
            }
            if (message.plyId != null && message.hasOwnProperty("plyId"))
                object.plyId = message.plyId;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.gsbase.LeaveRoomNot.Type[message.reason] : message.reason;
            return object;
        };

        /**
         * Converts this LeaveRoomNot to JSON.
         * @function toJSON
         * @memberof gsbase.LeaveRoomNot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoomNot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Type enum.
         * @name gsbase.LeaveRoomNot.Type
         * @enum {number}
         * @property {number} Leave=0 Leave value
         * @property {number} Kick=1 Kick value
         */
        LeaveRoomNot.Type = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Leave"] = 0;
            values[valuesById[1] = "Kick"] = 1;
            return values;
        })();

        return LeaveRoomNot;
    })();

    gsbase.StartGameReq = (function() {

        /**
         * Properties of a StartGameReq.
         * @memberof gsbase
         * @interface IStartGameReq
         */

        /**
         * Constructs a new StartGameReq.
         * @memberof gsbase
         * @classdesc Represents a StartGameReq.
         * @implements IStartGameReq
         * @constructor
         * @param {gsbase.IStartGameReq=} [properties] Properties to set
         */
        function StartGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StartGameReq instance using the specified properties.
         * @function create
         * @memberof gsbase.StartGameReq
         * @static
         * @param {gsbase.IStartGameReq=} [properties] Properties to set
         * @returns {gsbase.StartGameReq} StartGameReq instance
         */
        StartGameReq.create = function create(properties) {
            return new StartGameReq(properties);
        };

        /**
         * Encodes the specified StartGameReq message. Does not implicitly {@link gsbase.StartGameReq.verify|verify} messages.
         * @function encode
         * @memberof gsbase.StartGameReq
         * @static
         * @param {gsbase.IStartGameReq} message StartGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StartGameReq message, length delimited. Does not implicitly {@link gsbase.StartGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.StartGameReq
         * @static
         * @param {gsbase.IStartGameReq} message StartGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.StartGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.StartGameReq} StartGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.StartGameReq();
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
         * Decodes a StartGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.StartGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.StartGameReq} StartGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartGameReq message.
         * @function verify
         * @memberof gsbase.StartGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StartGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.StartGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.StartGameReq} StartGameReq
         */
        StartGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.StartGameReq)
                return object;
            return new $root.gsbase.StartGameReq();
        };

        /**
         * Creates a plain object from a StartGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.StartGameReq
         * @static
         * @param {gsbase.StartGameReq} message StartGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartGameReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StartGameReq to JSON.
         * @function toJSON
         * @memberof gsbase.StartGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartGameReq;
    })();

    gsbase.StartGameRsp = (function() {

        /**
         * Properties of a StartGameRsp.
         * @memberof gsbase
         * @interface IStartGameRsp
         * @property {string|null} [err] StartGameRsp err
         */

        /**
         * Constructs a new StartGameRsp.
         * @memberof gsbase
         * @classdesc Represents a StartGameRsp.
         * @implements IStartGameRsp
         * @constructor
         * @param {gsbase.IStartGameRsp=} [properties] Properties to set
         */
        function StartGameRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StartGameRsp err.
         * @member {string} err
         * @memberof gsbase.StartGameRsp
         * @instance
         */
        StartGameRsp.prototype.err = "";

        /**
         * Creates a new StartGameRsp instance using the specified properties.
         * @function create
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {gsbase.IStartGameRsp=} [properties] Properties to set
         * @returns {gsbase.StartGameRsp} StartGameRsp instance
         */
        StartGameRsp.create = function create(properties) {
            return new StartGameRsp(properties);
        };

        /**
         * Encodes the specified StartGameRsp message. Does not implicitly {@link gsbase.StartGameRsp.verify|verify} messages.
         * @function encode
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {gsbase.IStartGameRsp} message StartGameRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified StartGameRsp message, length delimited. Does not implicitly {@link gsbase.StartGameRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {gsbase.IStartGameRsp} message StartGameRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartGameRsp message from the specified reader or buffer.
         * @function decode
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gsbase.StartGameRsp} StartGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gsbase.StartGameRsp();
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
         * Decodes a StartGameRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gsbase.StartGameRsp} StartGameRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartGameRsp message.
         * @function verify
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartGameRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates a StartGameRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gsbase.StartGameRsp} StartGameRsp
         */
        StartGameRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.gsbase.StartGameRsp)
                return object;
            var message = new $root.gsbase.StartGameRsp();
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from a StartGameRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gsbase.StartGameRsp
         * @static
         * @param {gsbase.StartGameRsp} message StartGameRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartGameRsp.toObject = function toObject(message, options) {
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
         * Converts this StartGameRsp to JSON.
         * @function toJSON
         * @memberof gsbase.StartGameRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartGameRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartGameRsp;
    })();

    return gsbase;
})();

module.exports = $root.gsbase;
