export enum SCMJ_EVENT {
    INIT_USER_DATA = "scmj_init_user_data",
    ENTER_SCMJ = "scmj_enter_scmj",
    ENTER_ACK = "scmj_enter_ack",
    ENTER_NOTI = "scmj_enter_noti",
    EXIT_NOTI = "scmj_exit_noti",
    READY_REQ = "scmj_ready_req",
    READY_RSP = "scmj_ready_rsp",
    READY_NOTI = "scmj_ready_noti",
    BEGIN_GAME_NOTI = "scmj_begin_game_noti",
    SET_BANKER_NOTI = "scmj_set_banker_noti",
    UPDATE_CARDS_NOTI = "scmj_update_cards_noti",
    OPERATE_NOTI = "scmj_operate_noti",
    OPERATE_REQ = "scmj_operate_req",
    OPERATE_RSP = "scmj_operate_rsp",
    CLIENT_TIMER_NOTI = "scmj_client_timer_noti",
    RESULT_NOTI = "scmj_result_noti",
    LACK_REQ = "scmj_lack_req",
    LACK_RSP = "scmj_lack_rsp",
    LACK_NOTI = "scmj_lack_noti",
    MJ_PLAY_MARK_NOTI = "scmj_mj_play_mark_noti",
    BILL_REQ = "scmj_bill_req",
    BILL_RSP = "scmj_bill_rsp",
    SCORE_CHANGE_NOTI = "scmj_score_change_noti",
    COMPLETE_REQ = "scmj_complete_req",
    COMPLETE_NOTI = "scmj_complete_noti",
    AUTO_REQ = "scmj_auto_req",
    AUTO_NOTI = "scmj_auto_noti",
    TING_TIP_REQ = "scmj_ting_tip_req",
    EXCHANGE_REQ = "exchange_req",
    EXCHANGE_RSP = "exchange_rsp",
    EXCHANGE_NOTI = "exchange_noti",
    EXCHANGE_CONFIRM_NOTI = "exchange_confirm_noti",
    EXCHANGE_COMPLETE_NOTI = "exchange_complete_noti",
    AI_REQ = "ai_req",
    REFRESH_AI = "refresh_ai",
    CHAT_REQ = "chat_req",
    CHAT_NOTI = "chat_noti",

    STATE_NONE = "scmj_state_none",
    RESET_USER_DATA = "scmj_reset_user_data",
    ROOM_EXIT_REQ = "room_exit_req",
    ROUND_START_NOTI = "round_start_noti",
    ROUND_END_NOTI = "round_end_noti",

    DISMISS_ROOM_REQ = "dismiss_room_req",
    KICKOUT_REQ = "kickout_req",

    
    GUI_NOTI = "gdmj_gui_noti",

    MAI_MA_NOTI = "mai_ma_noti",


    // main使用
    EXIT_ROOM = "SCMJ_EXIT_ROOM",
    SHOW_TING_TIP = "SCMJ_SHOW_TING_TIP",
    SHOW_AUTO_HU = "SCMJ_SHOW_AUTO_HU",
    SHOW_MATCHING = "SCMJ_SHOW_MATCHING",
    SHOW_BTN_READY = "SCMJ_SHOW_BTN_READY",
    CHANEG_STATE = "SCMJ_CHANEG_STATE",
    CHECK_STATE = "SCMJ_CHECK_STATE",
    HIDE_UI = "HIDE_UI",
    MAIN_TOP_AREA_BTN_EXIT = "MAIN_TOP_AREA_BTN_EXIT",
    CHANGE_AUTO_STATE = "CHANGE_AUTO_STATE",
    GET_PLAYERS_DATA = "GET_PLAYERS_DATA",
    PLAY_LACK_TIP = "PLAY_LACK_TIP",
    WAIT_YOU_TIP = "WAIT_YOU_TIP",
    UPDATE_MaiMa = "update_maima",

    // 头像使用
    UPDATE_HEAD_READY = "SCMJ_UPDATE_HEAD_READY",
    UPDATE_HEAD_BANKER = "SCMJ_UPDATE_HEAD_BANKER",
    UPDATE_HEAD_SCORE = "SCMJ_UPDATE_HEAD_SCORE",
    UPDATE_HEAD_LACK = "SCMJ_UPDATE_HEAD_LACK",
    SHOW_HEAD = "SCMJ_SHOW_HEAD",
    UPDATE_NO_LOSE = "SCMJ_UPDATE_NO_LOSE",
    SHOW_PLAYER_INFO = "SCMJ_SHOW_PLAYER_INFO",
    UPDATE_HEAD_ANI = "UPDATE_HEAD_ANI",
    SHOW_FANG_ZHU = "SHOW_FANG_ZHU",
    SHOW_CONNECT = "SHOW_CONNECT",
    GET_LACK = "GET_LACK",

    // mjlayer使用
    UPDATE_MJLAYER_CARDS = "SCMJ_UPDATE_MJLAYER_CARDS",
    UPDATE_MJPLAY_MARK = "SCMJ_UPDATE_MJPLAY_MARK",
    UPDATE_LACK_CARDS = "SCMJ_UPDATE_LACK_CARDS",
    UPDATE_TING_MARKS = "SCMJ_UPDATE_TING_MARKS",
    TING_NOTI = "TING_NOTI",
    GET_LEFTCARDS = "GET_LEFTCARDS",
    GET_HANDCARDS_AND_CURCARD = "GET_HANDCARDS_AND_CURCARD",
    HIDE_EXCHANGE_CARDS = "HIDE_EXCHANGE_CARDS",
    GET_SELF_CARDS = "GET_SELF_CARDS",

    // 动画使用
    ANI_PLAY_CARD = "SCMJ_ANI_PLAY_CARD",
    ANI_MOPAI = "SCMJ_ANI_MOPAI",
    ANI_SCORE_CHANGE = "SCMJ_ANI_SCORE_CHANGE",
    ANI_CPGH = "SCMJ_ANI_CPGH",
    SHOW_LOSE = "SCMJ_SHOW_LOSE",
    SHOW_WIN = "SCMJ_SHOW_WIN",
    ANI_FIRE = "ANI_FIRE",

    ANI_LUODI = "ANI_LUODI",

    // touch使用
    ENABLE_PLAY_CARD = "SCMJ_ENABLE_PLAY_CARD",

    // operate使用
    OP_PLAY = "SCMJ_OP_PLAY",
    OP_CPGH = "SCMJ_OP_CPGH",
    OP_HIDE = "SCMJ_OP_HIDE",
    OP_LACK = "SCMJ_OP_LACK",
    OP_AUTO = "SCMJ_OP_AUTO",
    OP_CHANGE = "SCMJ_OP_CHANGE",

    // timer使用
    UPDATE_TIMER = "SCMJ_UPDATE_TIMER",
    UPDATE_EAST = "SCMJ_UPDATE_EAST",
    STOP_TIMER = "STOP_TIMER",

    // 账单使用
    UPDATE_BILL = "SCMJ_UPDATE_BILL",

    // 结算使用
    UPDATE_RESULT = "SCMJ_UPDATE_RESULT",

    // 新手引导使用
    GUIDE_HIDE = "SCMJ_GUIDE_HIDE",
    GUIDE_LACK = "SCMJ_GUIDE_LACK",
    GUIDE_PLAY = "SCMJ_GUIDE_PLAY",
    GUIDE_GANG = "SCMJ_GUIDE_GANG",
    GUIDE_HU = "SCMJ_GUIDE_HU",
    GUIDE_HU2 = "SCMJ_GUIDE_HU2",

    SOUND_TOGGLE = "sound_toggle",
    MUSIC_TOGGLE = "music_toggle",

    GAME_PING_TIMEOUT = "GAME_PING_TIMEOUT",

    SET_RECONNECT_VIEW = "SET_RECONNECT_VIEW",

    SHOW_RECHARGE = "show_recharge",
    RECHARGE_REQ = "recharge_req",
    RECHARGE_NOTI = "recharge_noti",
    RECHARGE_RSP = "recharge_rsp",
    REFRESH_NO_LOSE = "refresh_no_lose",
    TOUCH_CARD_INDEX = "touch_card_index",
    CAP_MULTIPLE_REQ = "cap_multiple_req",
    CAP_MULTIPLE_NOTI = "cap_multiple_noti",
    CAP_MULTIPLE_RSP = "cap_multiple_rsp",
    SHOW_CAP_MULTIPLE = "show_cap_multiple",
    UPDATE_CAP_MULTIPLE = "update_cap_multiple",

    ROUNT_COUNT_NOTI = "rount_count_noti",
    PAUSE_GAME_NOTI = "pause_game_noti",
    PRIVATE_ROOM_RESULT_REQ = "PRIVATE_ROOM_RESULT_REQ",
    PRIVATE_ROOM_RESULT_RSP = "private_room_result_rsp",
    PRIVATE_ROOM_RESULT_NOTI = "private_room_result_noti",
    SHOW_PRIVATE_ROOM_RESULT = "show_private_room_result",
    UPDATE_PRIVATE_ROOM_RESULT = "update_private_room_result",
    CLOSE_PRIVATE_ROOM_INFO = "close_private_room_info",
    START_PRIVATE_ROOM_TIP_TIMER = "START_PRIVATE_ROOM_TIP_TIMER",
    STOP_PRIVATE_ROOM_TIP_TIMER = "stop_private_room_tip_timer",
    PRIVATE_UPDATE_GAME_INFO = "PRIVATE_UPDATE_GAME_INFO",
    UPDATE_PRIVATE_TIP = "UPDATE_PRIVATE_TIP",
    REFRESH_PRIVATE_ROOM_TIP_TIMER = "REFRESH_PRIVATE_ROOM_TIP_TIMER",
    INIT_PRIVATE_ROOM = "INIT_PRIVATE_ROOM",

    SHOW_FOKA_TIP1 = "SHOW_FOKA_TIP1",
    SHOW_FOKA_TIP2 = "SHOW_FOKA_TIP2",
    SHOW_FOKA_TIP_CLOSE = "SHOW_FOKA_TIP_CLOSE",

    SHOW_Introduce = "SHOW_Introduce"
}