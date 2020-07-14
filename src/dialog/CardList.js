/**
 * 银行卡列表
 */
var CardList = function(_super) {
    function CardList(_callback) {
        CardList.super(this);

        this.callback = _callback;
        this.init();
    }
    Laya.class(CardList, "src.dialog.CardList", _super);

    var _proto = CardList.prototype;
    _proto.init = function() {

        this.popupEffect = null;
        this.closeEffect = null;
        //view适配
        this.height = App.StageUtil.height;
        //this.bg.height = App.StageUtil.height;
        
        this.contentPanel.vScrollBar.visible = false;
        for(var k = 0;k < this.contentPanel.numChildren;k++){
           var item = this.contentPanel.getChildByName("item"+k);
           item.on("mousedown",this,this.onSelect,[k]);
        }
    }

    /**
     * 选择银行卡
     */
    _proto.onSelect = function(i){
        this.callback(i);
        this.closeDlg();
    }

    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }

    //弹出
    _proto.closeDlg = function() {
        this.close();
    }
    
    return CardList;
}(CardListUI)