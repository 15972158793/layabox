//启动页
var Loading = (function (_super) {
    function Loading() {
        Loading.super(this);
        this.init();
    }
    Laya.class(Loading, "src.view.Loading",_super);
    var _proto = Loading.prototype;

    _proto.init = function(){
        //适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        //load
        this.loadNum = 0;
        this.pNum.width = 0;
        this.lab.text = "0%";
        Laya.loader.maxLoader = 50;
        Laya.loader.retryNum = 5;
        
        this.loadStr = ".";
        Laya.timer.loop(1000,this,this.goAni);
        this.time = 0;
        //加载资源的时候请求网络
        this.requestData();
        //资源请求
        App.ResUtil.loadResource(assetsFiles,this,this.loadComplete,this.loadProgress);
    }
    
    //动画
    _proto.goAni = function(){
        if(this.loadStr == ".") {
            this.loadStr = "..";
        }
        else if(this.loadStr == ".."){
            this.loadStr = "...";
        }
        else{
            this.loadStr = ".";
        }
        this.des.text = "正在加载资源" + this.loadStr;

        //
        if(Config.socketServerUrl == ""){
            if(this.time < 5){
               this.time += 1;
            }else{
                this.requestData();
                this.time = 0;
            }
        }
    }
    
    //加载完成  进入大厅
    _proto.loadComplete = function(){
        this.loadNum += 1;
        Laya.timer.once(1000,this,this.goRoom);
    }
    
    //进入大厅前获取一次需要的数据
    _proto.requestData = function(){
        
        //Http.getRequestGame("public/socketIo/socket","",this,this.onHttpComplete);

        this.loadNum += 1;
        this.goRoom();
    }

    _proto.onHttpComplete = function(data){
        
        //配置游戏数据
        if(0 == data.result){
            this.loadNum += 1;
            Config.socketServerUrl = data.data.data;
            Laya.timer.once(1000,this,this.goRoom);
        }else{
            
        }
    }

    _proto.goRoom = function(){
        if(this.loadNum == 2){
            
            var room = new Room();
            Laya.stage.addChild(room);
            Config.room = room;

            Laya.timer.clearAll(this);
            this.destroy();
        }
    }
    
    //进度回调参数  最后一个才是进度
    _proto.loadProgress = function(_num){
        this.pNum.width = 670 * _num;
        this.lab.text = Math.floor(100 * _num) + "%";
    }

    return Loading;
}(LoadingUI));