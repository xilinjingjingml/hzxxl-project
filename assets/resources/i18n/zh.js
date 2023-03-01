'use strict';

if (!window.i18n) {
    window.i18n = {};
}

if (!window.i18n.languages) {
    window.i18n.languages = {};
}

window.i18n.languages['zh'] = {
    // write your key value pairs here
    OptionsDialog: {
        setting: '设置',
        sound: '声音',
        vibrate: '振动',
        music: '音乐',
        skin: '皮肤',
    },
    RankDialog: {
        title: '排行榜',
        maxScore: '最高得分',
        curRank: '当前排名',
        historyMax: '历史最高',
    },
    TetrisScene: {
        welcome: '欢迎',
        welcomeTip: '点击 "开始" 游戏',
        score: '得分',
        levels: '等级',
        speed: '速度',
        next: '下一个',

        up: '快速',
        down: '下',
        left: '左',
        right: '右',
        rotate: '旋转\n方向',
        
        startOrPause: '开始\n暂停',
        sound: '声音',
        music: '音乐',
        options: '选项',
        rankList: '排行榜',
        pause:'暂停中',
        time:'时间',
        hold:'暂存',
        result:'结  算',
        rule:'比 赛 规 则',
        left:'剩余',

        quickplay:'快速游戏',
        gametime:'游戏时间',
        clearlines:'消除行数',
        endgame:'退出比赛',
        endtips:'您确定提前退出比赛吗？',
        cancel:'取消',
        end:'退出',
        
        drops:'放置分',
        lines:'消除分',
        eliminate:'连消分',
        times:'时间分',
        total:'总得分',
        submit: '提交分数',
        abandon: '放弃',
        useritem: '使用道具',
        bomb: '炸弹',
        loading: '预加载资源',

        new0: '<color=#1c1c1c>欢迎来到</c><color=#f05e17> 方块竞技大作战 </color><color=#1c1c1c>！\n开始前，让我们一起熟悉下游戏操作吧。</c>',
        new6: '<color=#1c1c1c>使用道具<color=#f05e17> 炸弹 </color>。\n即可立即清除底部<color=#f05e17> 3行 </color>的方块</c>',
        new7: '<color=#1c1c1c>太棒了，现在你已经学会所有的\n基本操作啦，继续你的第一局游戏吧！</c>',

        tips: '<color=#1c1c1c>使用道具需要看广告哦！</c>',

        gb: 'G币',
        lottery: '奖券',
        medal: '奖章',
    }
};