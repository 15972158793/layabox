/**
 * 舞台
 * @class StageUtil
 * @constructor
 */
var StageUtil = (function () {

    function StageUtil() {
        StageUtil.__super.call(this);

        this.offH = 0;
    }

    Laya.class(StageUtil, "src.util.StageUtil", BaseClass);
    var _proto_ = StageUtil.prototype;
    var _getset_ = Laya.getset;

    /**
     * 初始化舞台
     * @param {boolean} isWebGL 
     * @param {boolean} isDebug 
     * @param {number} width   
     * @param {number} height
     * @param {string} color
     */
    _proto_.init = function(isWebGL,width, height,isDebug,color){
        (isWebGL === void 0) && (isWebGL = true);
        (isDebug === void 0) && (isDebug = Config.debug);
        (width === void 0) && (width = 720);
        (height === void 0) && (height = 1280);
        (color === void 0) && (color = "#808080");
        //游戏舞台初始化渲染方式：WebGL和canvas（默认canvas）
        if (isWebGL) {
            Laya.init(width, height, Laya.WebGL);
        }else {
            Laya.init(width, height);
        }
        
        //debug显示
        ( isDebug ) && ( Laya.Stat.show() );
        //( isDebug ) && ( Laya.alertGlobalError = true );
        //自动计算计算量较大，对性能有一定影响,默认为false
        Laya.stage.autoSize = false;
        //帧率类型，支持三种模式：fast-60帧(默认)，slow-30帧，mouse-30帧，但鼠标活动后会自动加速到60，鼠标不动2秒后降低为30帧，以节省消耗
        Laya.stage.frameRate = "fast";
        //游戏舞台区域对齐方式
        Laya.stage.alignV = "middle";
        Laya.stage.alignH = "center";
        Laya.stage.screenMode = "vertical";
        Laya.stage.scaleMode = "fixedwidth";
        Laya.stage.bgColor = "#ffffff";
        //关闭多点触控
        Laya.MouseManager.multiTouchEnabled = false;
        //加载策略
        //Laya.WorkerLoader.workerPath = "libs/worker.js";
        //Laya.WorkerLoader.enable = true;
        //dialog背景修正
        UIConfig.popupBgAlpha = 0;
        UIConfig.popupBgColor = "#000000";
        //iphonex等适配(大屏适配)
        var cWidth = Laya.Browser.clientWidth;
        var cHeight = Laya.Browser.clientHeight;
        var baseRate = Config.GameHeight / Config.GameWidth;
        var curRate = cHeight / cWidth;
        if(curRate > baseRate){
            this.offH = curRate * Config.GameWidth - Config.GameHeight;
        }
    }

    /**
     * get stage
     */
    _getset_(0, _proto_, "stage",
        function(){
            return Laya.stage;
        }
    );

    /**
     * get stage width
     */
    _getset_(0, _proto_, "width",
        function(){
            return Laya.stage.width;
        }
    );

    /**
     * get stage height
     */
    _getset_(0, _proto_, "height",
        function(){
            return Laya.stage.height;
        }
    );

    /**
     * get window height
     */
    _getset_(0, _proto_, "windowHeight",
        function(){
            return Laya.stage.height+this.offH;
        }
    );

    return StageUtil;
}());