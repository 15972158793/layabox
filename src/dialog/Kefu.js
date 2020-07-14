/**
 * 客服
 */
    var Kefu = function(_super) {
    function Kefu() {
        Kefu.super(this);

        this.init();
    }
    Laya.class(Kefu, "src.dialog.Kefu", _super);
    var _proto = Kefu.prototype;
    
    _proto.init = function() {
        
        this.height = App.StageUtil.height;
        this.width = App.StageUtil.width;
        this.popupEffect = null;
        this.closeEffect = null;

        this.backBtn.on("mousedown",this,this.onClose);
        this.closeBtn.on("mousedown",this,this.onClose);
        Http.getRequestGame("vivianrest/index/customer/qrcode/show","",this,this.onHttpComplete);
        
        /*this.dom = Laya.Browser.window.document;
        this.iframe = this.dom.getElementById("kefuIframe");
        if(!this.iframe) {
            this.iframe = this.dom.createElement("iframe");
            this.iframe.setAttribute("id", "kefuIframe");
            this.iframe.setAttribute("style", "display:none;margin-top:50px;border:0;width:100%;height:" + (Laya.Browser.clientHeight - 50) + "px;position:relative;z-index:1000;"),
            this.iframe.setAttribute("src", "https://static.meiqia.com/dist/standalone.html?eid=51392");
            var Kefu = this.dom.getElementsByTagName("body")[0];
            Kefu.appendChild(this.iframe);
        }
        this.on("SHOWKEFU", this, function() {
            this.iframe.style.display = "block";
        });

        this.on("HIDEKEFU", this, function() {
            this.iframe.style.display = "none";
        });*/
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            //动态加载网络图片
            var url = data.data.data.showUrl;
            if(url){
               var self = this;
               //url = "http://test.8jsou.cn/qrcodeShow/promote/1000032.jpg";
               //url = "http://test.usfb4.cn/qrcodeShow/customer/customer.jpg";
               url += ("?time=" + Math.floor(Math.random() * 100000));
               Laya.loader.load(url,Laya.Handler.create(self,function(){
                   if(Config.platform == "h5"){
                       self.showHtmlCode(url);
                   }else{
                       self.showCode(url);
                   }
               }));
            }else{
               Toast.show("暂无客服");
            }
            this.desLab.text = data.data.data.desc;
        }else{
            
        }
    }

    _proto.showHtmlCode = function(url){
        var img = Laya.Browser.createElement("img");
        img.setAttribute("id","kefu");
        //物理距离转换到像素距离
        var w = 552 / App.StageUtil.width * Laya.Browser.clientWidth;
        var h = 580 / App.StageUtil.height * Laya.Browser.clientHeight;
        //动态计算宽
        var top1 = 207 / App.StageUtil.height * Laya.Browser.clientHeight;
        var left1 = (Laya.Browser.clientWidth - 550 / App.StageUtil.width * Laya.Browser.clientWidth) / 2;
        var cssStr = "position:absolute;width:" + w + "px;height:" + h + "px;left:"
            + left1 + "px;top:" + top1 + "px;";//display:none; z-index:100000000;
        img.setAttribute("style",cssStr);
        img.setAttribute("src",url);
        Laya.Browser.window.document.body.appendChild(img);
    }

    _proto.showCode = function(url){
        var pic = App.DisUtil.createSprite(45,30,url,this.di);
        pic.scaleX = 550 / pic.width;
        pic.scaleY = 580 / pic.height;
        pic.width = 550;
        pic.height = 580;
        pic.left = 45;
        pic.top = 30;
    }

    _proto.openDlg = function(){
        this.popup(false);
    }
    
    _proto.onClose = function(){
        var kefu = Laya.Browser.getElementById("kefu");
        if(kefu)Laya.Browser.removeElement(kefu);
        this.close();
    }

    return Kefu;
}(KefuDlgUI)