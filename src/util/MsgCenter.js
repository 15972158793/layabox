/**
 * 消息中心
 * @class MsgCenter
 * @constructor
 */
var MsgCenter = (function () {

    function MsgCenter() {
        MsgCenter.__super.call(this);
        this.dict = {};
    }

    Laya.class(MsgCenter, "src.util.MsgCenter", BaseClass);
    var _proto_ = MsgCenter.prototype;


    /**
     * 清理监听
     */
    _proto_.clear = function() {
        this.dict = {};
    }

    /**
     * 添加消息监听
     * @param {string} cmd 消息唯一标识
     * @param {function} listener 侦听函数
     * @param {any} listenerObj 侦听函数所属对象
     */
    _proto_.addListener = function(cmd, listener, listenerObj) {
        var arr = this.dict[cmd];
        if (!arr) {
            arr = [];
            this.dict[cmd] = arr;
        }
        //检测是否已经存在
        var isExist = false;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                isExist = true;
            }
        }
        if(isExist) return;
        arr.push([listener, listenerObj]);
    }

    /**
     * 移除消息监听
     * @param {string} cmd 消息唯一标识
     * @param {function} listener 侦听函数
     * @param {any} listenerObj 侦听函数所属对象
     */
    _proto_.removeListener = function(cmd, listener, listenerObj) {
        var arr = this.dict[cmd];
        if (!arr) {
            return;
        }

        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }

        if (arr.length == 0) {
            this.dict[cmd] = null;
            delete this.dict[cmd];
        }
    }

    /**
     * 触发消息
     * @param {string} cmd 消息唯一标识
     * @param {any} param 消息参数
     */
    _proto_.send = function(cmd, param) {
        if (!this.dict[cmd]) { return; }
        var vo = new MessageVo(cmd,param);
        this.dealMsg(vo);
    }

    /**
     * 处理一条消息
     * @param msgVo {MessageVo}
     */
    _proto_.dealMsg = function(msgVo) {
        var cmd = msgVo.cmd;
        var param = App.ComUtil.copy(msgVo.param);
        var listeners = this.dict[cmd];
        if (!listeners) { return; }

        for (var i = 0, len = listeners.length; i < len; i++) {
            var listener = listeners[i];
            listener[0].apply(listener[1], [param]);
        }
        msgVo.destroy();
    }

    return MsgCenter;
}());


/**
 * 消息VO(值对象) 不包含逻辑，只有数据
 * @class MessageVo
 * @constructor
 */
var MessageVo = (function(){

    function MessageVo(_cmd,_param){
        this.cmd = _cmd;
        this.param = _param
    }

    Laya.class(MessageVo, "MessageVo");
    var _proto_ = MessageVo.prototype;

    _proto_.destroy = function(){
        this.cmd = null;
        this.param = null;
    }

    return MessageVo;
}())
