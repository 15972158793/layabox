/**
 * 公告
 * @class Notice
 * @constructor
 */
var Notice = (function () {
    function Notice() {
        Notice.super(this);
        this.content = [
           /*{id:1, __content:"ccccc11111111111111111"},
           {id:2, __content:"ccccc22222222222222222222"},
           {id:3, __content:"ccccc333333333333333333333"},*/
        ];
        this.notices = [];
        this.isShow = true;
        this.isMoveEnd = true;
        this.normalDes = "";

        this.di = null;
        this.panel = null;
        this.box = null;
        this.init();
    }
    Laya.class(Notice, "src.util.Notice",Laya.Sprite);
    var _proto = Notice.prototype;
    
    /**
     * 初始化View
     */
    _proto.init = function(){
        var di = this.getChildByName("noticeBox");
        if (!di) {
            di = new Laya.Image("common/notice.png");
            di.sizeGrid = "1,1,1,1";
            di.name = "noticeBox";
            di.height = 63;
            di.width = 694;
            di.centerX = 347;
            di.zOrder = 2998;
            di.visible = false;
            this.addChild(di);
            //this.size(di.width,di.height);
            this.di = di;
            //
            var panel = new Laya.Panel();
            di.addChild(panel);
            panel.name = "noticePanel";
            panel.height = 63;
            panel.width = 540;
            this.panel = panel;
            panel.x = 77;
            //
            this.box = new Laya.HBox();
            this.box.cacheAs = "bitmap";
            this.box.name = "noticeHBox";
            this.box.y = 0;
            this.box.x = 0;
            this.box.width = 540;
            this.box.height = 63;
            panel.addChild(this.box);
        }
    }
    
    /**
     * 插入一条数据
     * @param {string} key 键值
     * @param {string} str 描述
     */
    _proto.addLoopContent = function(key,str) {
        if(this.content.length == 0){
            var val = {};
            val.id = key;
            val.__content = str;
            this.content.push(val);
            this.goToLoop();
        }
    }
    /**
     * 删除第一条数据
     */
    _proto.removeLoopContent = function() {
        this.content.shift();
    }
    
    /**
     * 外部插入一条数据
     * @param {string} _str 内容
     */
    _proto.set = function(_str) {
        this.notices.push(_str);
        this.di.zOrder = 1;
        this.di.visible = true;
        this.goToLoop();
    }
    
    /**
     * 准备好数据
     */
    _proto.goToLoop = function() {
        
        if(!this.isShow) return;
        if(!this.isMoveEnd) return;
        this.isMoveEnd = false;
        if (0 == this.notices.length) {
            var str = "";
            for (var i = 0; i < this.content.length;i++){
                var _ct = this.content[i].__content;
                if(_ct){
                    if(i == 0){
                        str = _ct;
                    }else{
                        str += ";  " + _ct;
                    }
                }
            }
            this.content.length = 0;
            this.content = [];
            if(str == "") str = this.normalDes;
            this.movement(str);
        } else{
            this.movement(this.notices[0]);
        }
        this.notices.shift();
        if(this.notices.length > 8) this.notices = [];
    }
    
    /**
     * 移动一条数据
     * @param {string} _str
     */
    _proto.movement = function(_str) {
        var lab = new Laya.Label();
        lab.text = _str;
        lab.fontSize = 21;
        lab.color = "#C0B29B";
        lab.height = this.box.height;
        lab.valign = "left";
        lab.pos(5,20);
        this.box.x = App.StageUtil.width;
        this.box.width = lab.wdith;
        this.box.addChild(lab);
        //注意判断下长度
        var w = this.box.width;
        if(w < App.StageUtil.width) w = App.StageUtil.width;
        Laya.Tween.to(this.box,{
            x:-1 * w
        },5000,null,Laya.Handler.create(this,this.moveEnd,[lab]));
    }
    
    /**
     * 移动结束
     * @param {Laya.Label} lab
     */
    _proto.moveEnd = function(lab){
        this.box.x = App.StageUtil.width;
        lab.removeSelf();
        this.isMoveEnd = true;
        this.goToLoop();
    }

    return Notice;
}());