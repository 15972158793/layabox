/*
* 游戏大厅
*/
var Room = (function (_super) {
    function Room() {
        Room.super(this);

        this.dataList = [];
        this.init();
    }
    Laya.class(Room, "src.view.Room",_super);
    var _proto = Room.prototype;

    _proto.init = function(){
        
        //适配
        this.resize();
        //检查登录
        this.checkLogin();
        //底部操作
        this.selNO = 0;
        this.isMove = false;
        this.panelPos = [0,-720,-1440,-2160,-2880];
        this.addClick();
        
        this.loadOtherInfo();
        this.goHall();
        
    }

    _proto.addClick = function(){

        this.btn0.on("mousedown",this,this.onSelect,[0]);
        this.btn1.on("mousedown",this,this.onSelect,[1]);
        this.btn2.on("mousedown",this,this.onSelect,[2]);
        this.btn3.on("mousedown",this,this.onSelect,[3]);
        this.btn4.on("mousedown",this,this.onSelect,[4]);

        this.changeBtn.on("mousedown",this,this.goEx);
    }
    
    /**
     * 兑换
     */
    _proto.goEx = function(){
        var cash = new CashOutCenter();
        cash.openDlg();
    }

    //登录状态更新
    _proto.checkLogin = function(){
        if(Config.userID == ""){
            this.accountLab.text = "点击登录";
            this.moneyLab.text = "余额: 0.00";
        }else{
            this.accountLab.text = "会员ID: " + Config.userID;
            this.moneyLab.text = "余额: " + App.MathUtil.keepDecimalNum(Config.gameGold);
        }
    }
    
    /**
     * 获取大厅数据
     */
    _proto.goHall = function(){
        Http.getRequestGame("public/bighall/get/disc","",this,this.onHttpComplete,"Room");
    }

    /**
     * 网络请求
     */
    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            if("Room" == data.tag){
                /*****加载游戏中的无关资源****** 
                 * android中记载资源会导致http请求阻塞
                */
                this.loadOtherRes();
                //大厅数据
                var data = data.data.data;
                this.viewHall.configData(data);
                //登录
                if(Config.userID == ""){
                   Laya.timer.frameOnce(5,this,this.goLogin);
                }
                Config.isGaming = true;
            }else if("Count" == data.tag){
                //折扣数据
                var info = data.data.data;
                Config.payRate = parseInt(info.paramValue);
                this.goHall();
            }else if("Apk" == data.tag){
                //
                var info = data.data.data;
                Tool.log(info);
                Laya.Browser.window.location.href = info;
            }else{
                
            }
        }else{
            //网络异常
        }
    }
     
    /**
     * 加载其他不需要即时的数据
     */
    _proto.loadOtherRes = function(){
        Laya.loader.load(gameLoadRes, Laya.Handler.create(this,this.loadResFinish));
    }
    
    /**
     * 其他资源加载完成的回调
     */
    _proto.loadResFinish = function(){
        
    }
    
    // TODO
    _proto.onSelect = function(i){
         
        var self = this;
        if(self.isMove) return;

        if(Config.userID == ""){
            self.goLogin();
            return;
        }
        if(self.selNO != i){
            self.btmPic.getChildByName("item"+self.selNO).getChildByName("p").visible = false;
            self.btmPic.getChildByName("item"+i).getChildByName("p").visible = true;

            self.selectBox.getChildByName("item"+i).visible = true;
            self.isMove = true;
             
            if(i == 0){
                this.viewHall.controlSelf(1)
            }else{
                this.viewHall.controlSelf(0);
                if(i == 1){
                    self.viewDraw.setData();
                }else if(i == 3){
                    self.viewYJ.setData();
                }else{

                }
            }
            
            Laya.Tween.to(self.selectBox, {
                x: self.panelPos[i]
            }, 300, Laya.Ease.expoOut, Laya.Handler.create(i, function() {
                self.selectBox.getChildByName("item"+self.selNO).visible = false;
                self.selNO = i;
                self.isMove = false;
            }));
        }else{
            //不处理
            
        }
    }

    /**
     * 监听浏览器唤醒
     */
    _proto.onPage = function(){
        //各种浏览器兼容
        var hidden = "";
        var state = "";
        var visibilityChange = "";
        if (Laya.Browser.document.hidden !== undefined && Laya.Browser.document.hidden !== null) {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
            state = "visibilityState";
        } else if (Laya.Browser.document.mozHidden !== undefined && Laya.Browser.document.mozHidden !== null) {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
            state = "mozVisibilityState";
        } else if (Laya.Browser.document.msHidden !== undefined && Laya.Browser.document.msHidden !== null) {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
            state = "msVisibilityState";
        } else if (Laya.Browser.document.webkitHidden !== undefined && Laya.Browser.document.webkitHidden !== null) {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
            state = "webkitVisibilityState";
        }else{
            
        }
        
        var self = this;
        Laya.Browser.window.document.addEventListener(visibilityChange, function() { //visibilitychange
            if(window.document[state] == hidden){
                //Laya.stage.renderingEnabled = false;
                Config.isAppPause = true;
            }else{
                //Laya.stage.renderingEnabled = true;
                //Config.isAppPause = false;
                Config.isUpdateData = true;
                Toast.show("屏幕唤醒!");
            }
        });
    }

    /**
     * 监听微信浏览器
     */
    _proto.onWxListener = function(){
        
        /**
         * 顶部返回事件的监听
         * 导致底部出现历史状态栏
        */
        if(Tool.isWx()){
            function pushHistory() {
                var state = {
                    title: "返回",
                    url: "#"};
                Laya.Browser.window.history.pushState(state, "title", "#");
            };
            pushHistory();
            Laya.Browser.document.addEventListener("popstate", function(e) { 
                WeixinJSBridge.invoke('closeWindow',{},function(res){ });
            }, false);
        }
        
        /**
         * 整体滑动的问题
         */
        document.body.addEventListener('touchmove',function(e){
            if(!e.isSCROLL){
                e.preventDefault(); //阻止默认事件(上下滑动)
            }else{
                //需要滑动的区域
                /*var top = el.scrollTop; //对象最顶端和窗口最顶端之间的距离 
                var scrollH = el.scrollHeight; //含滚动内容的元素大小
                var offsetH = el.offsetHeight; //网页可见区域高
                var cScroll = top + offsetH; //当前滚动的距离
                //被滑动到最上方和最下方的时候
                if(top == 0){
                    top = 1; //0～1之间的小数会被当成0
                }else if(cScroll === scrollH){
                    el.scrollTop = top - 0.1;
                }*/
            }
        }, {passive: false}) //passive防止阻止默认事件不生效
    }

    //处理其他信息
    _proto.loadOtherInfo = function(){

        //前后台监听
        this.onPage();
        /**监听微信浏览器*/
        this.onWxListener();
        
        //添加监听
        App.MsgCenter.addListener("money",this.onMoney,this);
        
        //1 抽奖
        this.viewHall = new Hall();
        this.hallPanel.addChild(this.viewHall);
        this.viewHall.height = this.roomPanel.height;
        //2提现
        this.viewDraw = new Draw();
        this.drawPanel.addChild(this.viewDraw);
        this.viewDraw.height = this.roomPanel.height;
        //3 代理
        this.viewAgent = new Agent();
        this.agentPanel.addChild(this.viewAgent);
        this.viewAgent.height = this.roomPanel.height;
        //4 佣金
        this.viewYJ = new Yongjin();
        this.yjPanel.addChild(this.viewYJ);
        this.viewYJ.height = this.roomPanel.height;
        //5 充值
        this.viewPay = new Charge();
        this.payPanel.addChild(this.viewPay);
        this.viewPay.width = App.StageUtil.width;
        this.viewPay.height = this.roomPanel.height;
        var scale = this.roomPanel.height / this.viewPay.height;
        this.viewPay.resize(scale);

    }
    
    /**
     * 适配浏览器
     */
    _proto.resize = function(){

        this.height = App.StageUtil.height;
        this.bgPic.height = App.StageUtil.height;
        this.topPic.top = 0;
        this.btmPic.bottom = 0;
        this.roomPanel.top = 80;
        this.roomPanel.bottom = 120;
        //真实的高度
        this.roomPanel.height = Laya.stage.height - this.roomPanel.top - this.roomPanel.bottom;
        for (var t = 0; t < this.selectBox._childs.length; t++)
            this.selectBox._childs[t].height = this.roomPanel.height;
    }
    
    //监听大厅隐藏
    _proto.onView = function(_visible){
        Config.room.visible = _visible;
        //返回到大厅的回调
        if(_visible){
            this.checkLogin();
        }else{
            
        }
    }
    
    //登录
    _proto.goLogin = function(){
        if(Config.userID == ""){
            var self = this;
            var login = new MobileLogin(function(){
                if(Config.userID != ""){
                    //大厅的顶部数据更新
                    self.checkLogin();
                }
            });
            login.openDlg();
        }
    }

    /**
     * 监听金币的变化
     */
    _proto.onMoney = function(){
        if(Config.userID != ""){
            this.checkLogin();
        }
    }
    
    /**
     * 客服
     */
     _proto.goKefu = function(){
        var kefuDg = new Kefu();
        kefuDg.openDlg();
    }

    return Room;
}(RoomUI));