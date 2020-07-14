/**
 * 选择二维码
 */
var CodeSelect = function(_super) {
    function CodeSelect(_callback) {
        CodeSelect.super(this);

        this.callback = _callback;
        this.init();
    }
    Laya.class(CodeSelect, "src.dialog.CodeSelect", _super);

    var _proto = CodeSelect.prototype;
    _proto.init = function() {

        this.popupEffect = null;
        this.closeEffect = null;
        //view适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;

        this.closeBtn.on("mousedown",this,this.closeDlg);
        //获取到的配置数据
        this.cfg = {
            id:"",
            url:""
        };
        this.di.on("mousedown",this,this.onSelect);
        this.okBtn.on("mousedown",this,this.onSelect);
        //获取二维码选择列表
        this.selectInfo = ["","",""];
        this.getCodeList();

        if("h5" == Config.platform){
            this.tips.changeText("");
        }else{
            this.tips.changeText("App用户请通过微信上传二维码。");
        }
    }
    
    /**
     * 获取二维码列表
     */
    _proto.getCodeList = function(){
        Http.getRequestGame("rest/upload/qrcodeSearch/",Config.userID,this,this.onHttpComplete,"Select");
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            if("Select" == data.tag){
                //生成二维码列表
                var info = data.data.data;
                if(info.length == 0) return;
                this.selectInfo[0] = info[0];
                //Tool.log(this.selectInfo);
                var p = this.di.getChildByName("icon");
                if(this.selectInfo[0] == ""){
                    p.visible = false;
                }else{
                    p.visible = true;
                    //加载某一张图片
                    var url = this.selectInfo[0].showUrl;
                    this.cfg.url = url + "?time=" + (Math.floor(Math.random() * 10000) + 10);
                    p.skin = url;
                    p.scaleX = 464 / p.width;
                    p.scaleY = 493 / p.height;
                    p.width = 464;
                    p.height = 493;
                }

                //二维码ID
                if(this.selectInfo[0] != ""){
                    this.cfg.id = this.selectInfo[0].id;
                    this.tipsLab.changeText("替换收款码");
                }
            }else if("UP" == data.tag){
                Toast.show("上传成功,请选择二维码提现。",2000);
                //获取二维码选择列表
                this.getCodeList();
            }
        }
    }

    /**
     * 确认收款码
     */
    _proto.onSelect = function(){
        var self = this;
        if(self.cfg.id == ""){
            Toast.show("请先添加收款码");
            return;
        }
        self.callback(self.cfg);
        self.closeDlg();
    }

    _proto.onPhoto = function(){
        
        Toast.show("暂不支持,请通过微信上传二维码。",3000);
    }

    //数据发送到服务端
    _proto.rpData = function(e){
        Tool.log(e);
        Toast.show("正在上传中,请稍候...");
        //提交二维码到选择框中
        var index = e.indexOf(",");
        e = e.substr(index+1,e.length) + "";
        var model = "rest/upload/qrcodeUpload/" + ("-"+Config.userID) + "/" + Config.userID;
        var data = {};
        data.file = e;
        Http.postRequestGame(model,JSON.stringify(data),this,this.onHttpComplete,null,"UP");
        //图片预览功能
        /*var sp = App.DisUtil.base64ToSprite(e,0,0,App.StageUtil.width,App.StageUtil.height);
        var scale = (App.StageUtil.height - this.dis - 300) / App.StageUtil.height;
        sp.scaleX = scale;
        sp.scaleY = scale;
        sp.y = App.StageUtil.height - this.dis - 300;
        App.StageUtil.stage.addChild(sp);
        sp.zOrder = 10000000;*/
    }

    //弹入
    _proto.openDlg = function(){
        if("h5" == Config.platform){
            App.DisUtil.createUpload(120,844,90,this,this.rpData);
        }else{
            this.addBtn.on("mousedown",this,this.onPhoto);
        }
        this.popup(false);
    }

    //弹出
    _proto.closeDlg = function() {
        if("h5" == Config.platform){
           App.DisUtil.closeUpload();
        }else{

        }
        this.close();
    }
    
    return CodeSelect;
}(CodeSelectUI)