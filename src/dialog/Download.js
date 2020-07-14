/**
 * 视频下载说明
 * @class Download
 */
var Download = (function (_super) {
    function Download(_url) {
        Download.super(this);

        this.url = _url;
        this.init();
    }
    Laya.class(Download, "src.dialog.Download",_super);
    var _proto = Download.prototype;

    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //高度
        this.height = App.StageUtil.height;
        this.movePanel.vScrollBar.visible = false;
        //关闭
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.backBtn.on("mousedown",this,this.closeDlg);
        this.go.on("mousedown",this,this.goDierct);
        if(Tool.isIos()){
            this.tip.skin = "sm/ios.jpg";
        }else{
            this.tip.visible = false;
        }
        this.openDlg();
    }

    _proto.goDierct = function(){
        Laya.Browser.window.location.href = Config.downIosUrl;
    }

    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function(){
        this.close();
    }

    return Download;
}(DownloadDlgUI));