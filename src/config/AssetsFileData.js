/**
 * 游戏资源管理;
 */
//进入游戏前加载的
var assetsFiles = [
    
    //atlas
    {url:"res/atlas/agent.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/bank.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/btn.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/charge.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/common.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/dialog.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/draw.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/page.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/room.atlas",type:Laya.Loader.ATLAS},
    {url:"res/atlas/panel.atlas",type:Laya.Loader.ATLAS},

    //png
    {url:"common/toast.png",type:Laya.Loader.IMAGE},

    {url:"charge/fenge_line.png",type:Laya.Loader.IMAGE},
    {url:"charge/shense_bg.jpg",type:Laya.Loader.IMAGE},
    {url:"charge/sure.png",type:Laya.Loader.IMAGE},

    {url:"panel/award1.png",type:Laya.Loader.IMAGE},

    {url:"room/bg.png",type:Laya.Loader.IMAGE},
    {url:"room/di.png",type:Laya.Loader.IMAGE},

    //img
    {url:"agent/bg.jpg",type:Laya.Loader.IMAGE},
    {url:"agent/kk1.png",type:Laya.Loader.IMAGE},

    {url:"bank/baidi.png",type:Laya.Loader.IMAGE},

    {url:"dialog/hd.png",type:Laya.Loader.IMAGE},
    {url:"dialog/k2.png",type:Laya.Loader.IMAGE},
    {url:"dialog/k6.png",type:Laya.Loader.IMAGE},
    {url:"dialog/k7.png",type:Laya.Loader.IMAGE},
    {url:"dialog/kk.png",type:Laya.Loader.IMAGE},
    {url:"dialog/kk2.png",type:Laya.Loader.IMAGE},
    {url:"dialog/qs.png",type:Laya.Loader.IMAGE},
    {url:"dialog/ss.png",type:Laya.Loader.IMAGE},
    {url:"dialog/tbg.png",type:Laya.Loader.IMAGE},

    {url:"page/jk.png",type:Laya.Loader.IMAGE}
    
];

//启动页加载的
var loadFiles = [
    {url:"loading/di1.png",type:Laya.Loader.IMAGE},
    {url:"loading/di2.png",type:Laya.Loader.IMAGE},
    {url:"loading/ld1.png",type:Laya.Loader.IMAGE},
    {url:"loading/black.png",type:Laya.Loader.IMAGE}
];

//启动加载完成后卸载的资源
var unLoadingFiles = [
    "loading/di1.png",
    "loading/di2.png",
];

var gameLoadRes = [
    //music
    {url: "music/click.mp3",type: Laya.Loader.SOUND},
    {url: "music/select.mp3",type: Laya.Loader.SOUND},
    {url: "music/unselect.mp3",type: Laya.Loader.SOUND}

];