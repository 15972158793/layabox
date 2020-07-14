/**
 * html地址弹窗
 * @class FrameDlg
 */
var FrameDlg = (function (_super) {
    function FrameDlg(_url) {
        FrameDlg.super(this);

        this.url = _url;
        this.init();
    }
    Laya.class(FrameDlg, "src.dialog.FrameDlg",_super);
    var _proto = FrameDlg.prototype;

    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //背景适配
        this.height = App.StageUtil.height;
        //关闭
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.backBtn.on("mousedown",this,this.closeDlg);

        App.DisUtil.addViewByUrl(this.url,72);
        this.openDlg();
    }

    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function(){
        App.DisUtil.closeView();
        this.close();
    }

    return FrameDlg;
}(FrameDlgUI));