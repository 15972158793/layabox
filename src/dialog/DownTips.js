/**
 * 安装提示
 */
var DownTip = function(_super) {
    function DownTip() {
        DownTip.super(this);

        this.init();
    }
    Laya.class(DownTip, "src.dialog.DownTip", _super);

    var _proto = DownTip.prototype;
    _proto.init = function() {
        
        this.popupEffect = null;
        this.closeEffect = null;
        //view适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
         
        this.cancel.on("mousedown",this,this.closeDlg);
        this.sure.on("mousedown",this,this.go);
        this.title.changeText("下载");
        var s = "点击确认前往App下载";
        this.tips1.changeText(s);
    }

    _proto.go = function(){
        this.close();
        Laya.Browser.window.location.href = Config.downApkUrl;
    }

    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function() {
        this.close();
    }
    
    return DownTip;
}(DownTipsUI)