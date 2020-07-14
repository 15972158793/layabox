/**
 * 提示
 * @class Toast
 * @constructor
 */
var Toast = (function () {

    function Toast() {
        //Toast.__super.call(this);
        Toast.super(this);
        this._msgTF = null;
        this._bg = null;
        this.delay = 1500;
        this.initView();
    }

    Laya.class(Toast, "src.util.Toast", Laya.Sprite);
    var _proto_ = Toast.prototype;

    /**
     * @alias ToastMessage
     * @description 提示框显示
     * @example
     * Toast.show("这是1个提示",2000)
     * @extends {Laya.Sprite}
     * 
     * @param {string} 弹框显示文字
     * @param {number} 延迟的时间
     */
    Toast.show = function(_str,_delay){
        var tip = new Toast();
        tip.showTip(_str);
        if(_delay) tip.delay = _delay;
        setTimeout(tip.close.bind(tip),tip.delay);
    }
    
    /**
     * 显示
     * @param {string} 描述
     */
    _proto_.showTip = function(_str){
        this._msgTF.text = _str;
        /*if(this._msgTF.width > this._bg.width){
            this._bg.width = this._msgTF.width;
        }*/
        var w = this._bg.width;
        var h = this._bg.height;
        this.x = (App.StageUtil.width - w)>>1;
        this.y = (App.StageUtil.height - h)>>1;

        this.zOrder = 999999;
        App.StageUtil.stage.addChild(this);
    }
    
    /**
     * 提示关闭
     */
    _proto_.close = function(){
        App.EftUtil.flowOut(this, 500);
    }
    
    /**
     * 初始化View
     */
    _proto_.initView = function(){
        var self = this;
        self._bg = App.DisUtil.createImage(0, 0, null, self);
        self._bg.skin = "common/toast.png";
        self._bg.height = 64;
        self._bg.sizeGrid = "10,10,10,10";

        self._msgTF = App.DisUtil.createText(0,16,24,self._bg.width,self._bg);
        //self._msgTF.autoSize = true;
    }

    return Toast;
}());