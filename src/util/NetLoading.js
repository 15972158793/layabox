/**
 * 网络请求动画
 * @class NetLoading
 * @constructor
 */
var NetLoading = (function () {

    function NetLoading() {
        NetLoading.__super.call(this);
        this._content = null;
        this._uiImageContainer = null;
        //this._uiIconContainer = null;
        this.isShow = false;
        //不使用加载动画
        this.useAni = true;
    }

    Laya.class(NetLoading, "src.util.NetLoading", BaseClass);
    var _proto_ = NetLoading.prototype;
    
    /**
     * 初始化View
     */
    _proto_.initView = function() {

        var self = this;
        self._content = new Laya.Sprite();
        self._content.mouseEnabled = true;
        self._content.alpha = 0.65;
        self._content.zOrder = 2999;
        //auto ui
        self._uiImageContainer = new Laya.Sprite();
        self._content.addChild(self._uiImageContainer);
        var res1 = "loading/ld1.png";
        var img = new Laya.Sprite();
		self._uiImageContainer.addChild(img);
		img.loadImage(res1);
        img.pivot(img.width>>1, img.height>>1);
        //胜
        /*self._uiIconContainer = new Laya.Sprite();
        self._content.addChild(self._uiIconContainer);
        var res2 = "loading/ld2.png";
        var img2 = new Laya.Sprite();
		self._uiIconContainer.addChild(img2);
		img2.loadImage(res2);
        img2.pivot(img2.width>>1, img2.height>>1);*/
        //
        App.StageUtil.stage.addChild(self._content);
    }

    /**
     * 更新背景黑色
     */
    _proto_.initBG = function() {
        this._content.graphics.clear();
        this._content.graphics.drawRect(0, 0, App.StageUtil.width, App.StageUtil.height, "#000000");
        this._content.size(App.StageUtil.width, App.StageUtil.height);
    }

    /**
     * 显示加载旋转界面
     */
    _proto_.show = function() {
        if(!this.useAni) return;
        //this._content.visible = true;
        if(!this.isShow){
            this.initView();
            this.onResize();
            Laya.timer.clear(this,this.enterFrame.bind(this));
            Laya.timer.loop(200,this,this.enterFrame.bind(this));
            App.StageUtil.stage.on(Laya.Event.RESIZE, this, this.onResize);
            this.isShow = true;
        }
    }

     /**
     * 关闭加载旋转界面
     */
    _proto_.close = function() {
        if(!this.useAni) return;
        
        if(this.isShow){
            App.StageUtil.stage.off(Laya.Event.RESIZE, this, this.onResize);
            if (this._content) {
                this._content.graphics.clear();
                this._content.removeSelf();
                this._uiImageContainer.rotation = 0;
            }
            Laya.timer.clear(this,this.enterFrame.bind(this));
            this.isShow = false;
        }
    }

    /**
     * 旋转
     */
    _proto_.enterFrame = function() {
        var rota = this._uiImageContainer.rotation + 50;
        rota = rota % 360;
        this._uiImageContainer.rotation = rota;
    }

    /**
     * 适配
     */
    _proto_.onResize = function() {
        this.initBG();
        this._uiImageContainer.pos(this._content.width>>1, this._content.height>>1);
        //this._uiIconContainer.pos(this._content.width>>1, this._content.height>>1);
    }

    return NetLoading;
}());