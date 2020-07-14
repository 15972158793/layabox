/**
 * 控制中心
 */
var App = (function () {

    function App() {

    }
    Laya.class(App, "src.core.App");
    var _proto_ = App.prototype;
    var _getset_ = Laya.getset;
    
    /**
     * 数组
     */
    _getset_(1, App, "ArrayUtil",
        function(){
            return ArrayUtil.getInstance();
        }
    );

    /**
     * 声音
     */
    _getset_(1, App, "AudioUtil",
        function(){
            return AudioUtil.getInstance();
        }
    );

    /**
     * Base64转换工具
     */
    _getset_(1,App,"Base64Util",
        function(){
            return Base64Util.getInstance();
        }
    );
    
    /**
     * 通用
     */
    _getset_(1, App, "ComUtil",
        function(){
            return ComUtil.getInstance();
        }
    );

    /**
     * 获取时间
     */
    _getset_(1,App,"DateUtil",
        function(){
            return DateUtil.getInstance();
        }
    );

    /**
     * 显示
     */
    _getset_(1, App, "DisUtil",
        function(){
            return DisUtil.getInstance();
        }
    );

    
    /**
     * 动作
     */
    _getset_(1, App, "EftUtil",
        function(){
            return EffectUtil.getInstance();
        }
    );

    /**
     * 字体库
     */
    _getset_(1,App,"FntUtil",function(){
        return FntUtil.getInstance();
    });

    /**
     * 点击事件
     */
    _getset_(1,App,"HitEvent",function(){
        return HitEvent.getInstance();
    });
    

    /**
     * 数学
     */
    _getset_(1, App, "MathUtil",
        function(){
            return MathUtil.getInstance();
        }
    );

    /**
     * 消息中心
     */
    _getset_(1, App, "MsgCenter",
        function(){
            return MsgCenter.getInstance();
        }
    );
    
    /**
     * 网络请求动画
     */
    _getset_(1, App, "NetLoading",
        function(){
            return NetLoading.getInstance();
        }
    );

    /**
     * 平台接口
     */
    _getset_(1,App,"Platform",
        function(){
            return Platform.getInstance();
        }
    );

    /**
     * 资源加载
     */
    _getset_(1, App, "ResUtil",
    function(){
        return ResUtil.getInstance();
    });

    /**
     * Socket通信
     */
    _getset_(1,App,"Socket",function(){
        return Socket.getInstance();
    });

    /**
     * Laya的Socket通信
     */
    _getset_(1,App,"LSocket",function(){
        return SocketLaya.getInstance();
    });

    /**
     * 单例获取舞台工具类（包含：舞台初始化、舞台宽高获取等）
     */
    _getset_(1, App, "StageUtil",function(){
        return StageUtil.getInstance();
    });

    /**
     * 字符串处理
     */
    _getset_(1, App, "StrUtil",function(){
        return StrUtil.getInstance();
    });

    

    return App;
}());