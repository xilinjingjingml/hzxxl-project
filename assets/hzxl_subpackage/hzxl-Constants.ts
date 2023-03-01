export enum LackType {
    None = -1,
    CRAK = 0,
    BAM = 1,
    DOT = 2,
    WIND = 3,
    DRAGON = 4,
}

export enum CardIndex {
    CrakStart = 1,
    CrakEnd = 9,
    BamStart = 11,
    BamEnd = 19,
    DotStart = 21,
    DotEnd = 29
}

export enum CardArea {
    LeftCard = 1,
    HandCard,
    DisplayCard,
    HuCard,
    CurCard,
    PutCard,
}

export enum OperatorCode {
    OP_GIVEUP = 256,
    OP_MOPAI = 321,
    OP_PLAY = 360,
    OP_CHOW = 65928,
    OP_PONG = 65960,
    OP_KONG = 65992,//                          点杠
    OP_HU_DIANPAO = 66024,//                    点炮胡--别人出牌
    OP_HU_AFTER_KONG_TURN = 262704,//           抢补杠胡
    OP_KONG_TURN_RECOVER_TO_PONG = 262736,//    被抢杠胡，杠恢复成碰
    OP_KONG_DARK = 524945,//                    暗杠
    OP_KONG_TURN = 524977,//                    弯杠/补杠
    OP_HU_ZIMO = 525009,//                      自摸胡
    
    OP_MAIMA = 9999,//                      买马
}


export enum CheckType {
    CheckTypeNone = 0,
    // 查花猪
    ChaHuaZhu,
    // 查大叫
    ChaDaJiao,
    // 查听退税
    ChaTingTuiShui,
    // 呼叫转移
    GangShangPaoTuiGang,
    //杠分返还
    GangFenFanHuan,
    GenZhuang,
    //跟庄退费
	GenZhuangTuiFei,
	//跟庄退费
	MaGenGang
}

export enum GameState {
    // 初始状态
    None = 0,
    // 正常准备请求状态
    NormalReadyReq,
    // 换牌准备请求状态
    ChangeReadyReq,
    // 准备状态
    Ready,
    // 游戏状态
    Game,
    // 结算状态
    Result
}

export enum AdPos {
    Shop = 1,
    SignDouble = 2,
    Signreplenish = 3,
    NewerGift = 4,
    Vip = 5,
    Wheel = 6,
    ChangeStartGame = 7,
    LoseFree = 8,
    HaiDiLaoYue = 9,
    BrokenRelief = 10,
    LackMoney = 11,
    BaiCaiShen = 12,
}

export enum AdState {
    OrderInit,     // 初始化
    OrderCancel,   // 中途取消广告
    OrderFinish,   // 已看完广告
    OrderComplete, // 已领奖
}

export enum AdPlugin {
    AdsTTAds = 1, // 穿山甲广告
    AdsQQAds,     // 腾讯广告
    AdsWechat,    // 微信广告 
}

export enum AD_EVENT {
    GET_AD_SPOT_REQ = "get_ad_spot_req",
    GET_AD_SPOT_ACK = "get_ad_spot_ack",
    INIT_AD_ORDER_REQ = "init_ad_order_req",
    INIT_AD_ORDER_ACK = "init_ad_order_ack",
    UPDATE_AD_ORDER_REQ = "update_ad_order_req",
    UPDATE_AD_ORDER_ACK = "update_ad_order_ack",
    GET_AD_AWARDS_REQ = "get_ad_awards_req",
    GET_AD_AWARDS_ACK = "get_ad_awards_ack",
    AD_SPOT_DISP_NOTI = "ad_spot_disp_noti",

    SHOW_AD_ON_SPOT = "show_ad_on_spot",
    POP_AD_LACK_MONEY = "pop_ad_lack_money",
    POP_AD_LOSE_FREE = "pop_ad_lose_free",
}


export enum EventName {
    // 游戏初始化
    GAME_UPDATE_PROGRESS = "game_update_progress",
    GAME_PAUSE_PROGRESS = "game_pause_progress",
    GAME_RESUME_PROGRESS = "game_resume_progress",
    GAME_CLOSE_LOADING = "game_close_loading",

    // BACKGROUND = "on_background",
    // FOREGROUND = "on_foreground",

    // // SOCKET
    // SOCKET_CONNECT = "SOCKET_CONNECT",
    // SOCKET_RECONNECT = "SOCKET_RECONNECT",
    // SOCKET_CLOSE = "SOCKET_CLOSE",
    // SOCKET_DISCONNECT = "SOCKET_DISCONNECT",    

    // 账号
    ACCOUNT_CHECK_ACCOUNT = "account_check_account",
    ACCOUNT_WEB_AUTH = "account_web_auth",
    ACCOUNT_PHONE_AUTH = "account_phone_auth",
    ACCOUNT_ON_LOGIN = "account_on_login",
    ACCOUNT_AUTH_FAIL = "account_auth_fail",
    ACCOUNT_SOCKET_PEM = "accountz_socket_pem",
    SWITCH_PHONE = "switch_phone",
    SWITCH_GUEST = "switch_guest",
    // 快手回调
    // KUAISHOU_CALLBACK = "kuaishou_callback",

    // 大厅
    LOBBY_SHOW_MAIN = "lobby_show_main",
    LOBBY_SHOW_GUIDE = "lobby_show_guide",
    GET_PLAYER_INFO = "get_player_info",

    // 通用
    COMMON_DIALOG = "common_dialog",
    COMMON_ERR_INFO = "common_err_info",
    QUICK_START_GAME = "quick_start_game",
    // NO_FIT_SERVER = "no_fit_server",

    // 房间
    ROOM_ENTER_FROM_LOBBY = "room_enter_from_lobby",
    ROOM_READY_TO_GAME = "room_ready_to_game",
    ROOM_READY_SUCC = "room_ready_succ",
    ROOM_CANCEL_GAME = "room_cancel_game",
    ROOM_CONFIRM_REQ = "room_confirm_req",
    ROOM_ENTER_REQ = "room_enter_req",
    ROOM_ENTER_GAME = "room_enter_game",
    ROOM_EXIT_REQ = "room_exit_req",
    ROOM_EXIT_GAME = "room_exit_game",

    ROOM_ENTER_NOT = "room_enter_not",
    ROOM_LEAVE_NOT = "room_leave_not",

    ROOM_LIST_REQ = "room_list_req",
    ROOM_LIST_RSP = "room_list_rsp",

    // 服务器列表相关
    SERVER_LIST_REQ = "server_list_req",
    SERVER_LIST_RSP = "server_list_rsp",
    SERVER_UPDATE = "server_update",


    // 任务
    TASK_SHOW_MAIN = "task_show_main",

    // Vip
    VIP_SHOW_MAIN = "vip_show_main",
    SEND_VIP_SHOW_MAIN = "send_vip_show_main",

    // 四川麻将
    SCMJ_SHOW_MAIN = "scmj_show_main",

    // 签到
    SIGN_SHOW_MAIN = "sign_show_main",

    // 个人信息
    PERSONAL_SHOW_MAIN = "personal_show_main",
    GET_ITEM_NUM_REQ = "get_item_num_req",
    GET_ITEM_NUM_RSP = "get_item_num_rsp",

    // 活动
    ACTIVITY_SHOW_MAIN = "activity_show_main",
    ACTIVITY_SHOW_BCS = "activity_show_bcs",

    // 手机登录
    PHONE_SHOW_MAIN = "phone_show_main",

    // 商城
    SHOP_SHOW_MAIN = "shop_show_main",

    // 迎新礼
    WELCOME_GIFT_SHOW_MAIN = "welcome_gift_show_main",

    // 幸运转盘
    LOTTERY_SHOW_MAIN = "lottery_show_main",
    LOTTERY_CLOSE_MAIN = "lottery_close_main",

    // 排行榜
    RANK_SHOW_MAIN = "rank_show_main",

    // 救济金
    DISP_BROKEN_RELIEF_DIALOG = "disp_broken_relief_dialog",
    GET_RELIEF_INFO_REQ = "get_relief_info_req",
    UPT_RELIEF_AD_STATE_REQ = "upt_relief_ad_state_req",
    GET_RELIEF_AWARDS_REQ = "get_relief_awards_req",

    // 插件
    PLUGIN_ADS_CALLBACK = "PluginAdsCallBack",

    PRE_LOAD_SCMJ_PIC = "PreLoadScmjPic",
    BLOCK_UI = "blockUI",
    UN_BLOCK_UI = "unBlockUI",
    SHOW_AWARDS = "showAwards",
    SHOW_TIPS = "showTips",
    SHOW_SMALL_TIPS = "showSmallTips",
    SHOW_KEFU = "showKefu",
    SHOW_SETTING = "showSetting",
    CLOSE_SETTING = "closeSetting",
    SHOW_RULE = "showRule",
    DRAW_ICON_BY_ID = "drawIconById",

    REFRESH_ITEM_JINBI = "refresh_item_jinbi", // 刷新金币
    REFRESH_ITEM_DIAMOND = "refresh_item_diamond", // 刷新钻石
    REFRESH_ITEM_VIP_EXP = "refresh_item_vip_exp", // 刷新vip经验
    REFRESH_ITEM_LEVEL_EXP = "refresh_item_level_exp", // 刷新level经验
    REFRESH_ITEM_LEVEL = "refresh_item_level", // 刷新level等级
    REFRESH_ITEM_VIP = "refresh_item_vip", // 刷新vip等级
    REFRESH_ITEM_HEAD = "refresh_item_head", // 刷新vip等级
    REFRESH_ITEM_HEADFRAME = "refresh_item_headframe", // 刷新vip等级

    REFRESH_BIND_PHONE = "refresh_bind_phone", // 刷新绑定手机
    REFRESH_BTN_YXL = "refresh_btn_yxl", // 刷新迎新礼按钮

    PRE_LOAD_ACTIVITY_PIC = "pre_load_activity_pic", // 预加载活动资源
    PRE_LOAD_GIFT_PIC = "pre_load_gift_pic", // 预加载迎新礼资源
    PRE_LOAD_LOTTERY_PIC = "pre_load_lottery_pic", // 预加载转盘资源
    PRE_LOAD_PERSONAL_PIC = "pre_load_personal_pic", // 预加载个人信息资源
    PRE_LOAD_SIGN_PIC = "pre_load_sign_pic", // 预加载签到资源
    PRE_LOAD_TASK_PIC = "pre_load_task_pic", // 预加载任务资源
    PRE_LOAD_VIP_PIC = "pre_load_vip_pic", // 预加载vip资源
}

export enum ITEM_INDEX {
    ITEM_HEAD = 1005,       // 头像
    ITEM_HEAD_FRAME = 1006, // 头像框
    ITEM_VIP = 1007,    	// vip
}

export enum CHAT_TAG {
    VIP = '<D┃┃',
    FREE = '<A┃┃',
    TEXT = '<B┃┃',
    INPUT = '<C┃┃',
    GIFT = '<E┃┃',
}
