/**
 * 代理说明
 */
    var AgentSM = function(_super) {
    function AgentSM() {
        AgentSM.super(this);
        
        this.init();
    }
    Laya.class(AgentSM, "src.dialog.AgentSM", _super);

    var _proto = AgentSM.prototype;
    _proto.init = function() {
        
        this.popupEffect = null;
        this.closeEffect = null;
        //view适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        this.bg.on("mousedown",this,this.closeDlg);
        this.closeBtn.on("mousedown",this,this.closeDlg);
    }

    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function() {
        this.close();
    }
    
    return AgentSM;
}(AgentSMUI)