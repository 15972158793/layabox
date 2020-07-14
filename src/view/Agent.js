/*
* 代理
*/
var Agent = (function (_super) {
    function Agent() {
        Agent.super(this);
        
        this.isOpenSm = true;
        this.init();
    }
    Laya.class(Agent,"src.view.Agent",_super)
    var _proto = Agent.prototype;

    _proto.init = function(){
         
        //外部适配
        this.isLoaded = false;
        
        this.codeBtn.on("mousedown",this,this.goCode);
        this.smBtn.on("mousedown",this,this.openSM);

    }
    
    _proto.setData = function(){

        //this.isLoaded = false;
        //Http.getRequestGame("vivianrest/agent/agentSum","/"+Config.userID,this,this.onHttpComplete,"Agent_1");
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            if("Agent_1" == data.tag){

                this.isLoaded = true;
                var info = data.data.data;
                this.updateInfo(info);
                this.cfgData = info;

                //用户相关
                Config.agentID = info.agentCode || "";
                Config.agentUrl = info.agentCodeUrl || "";
                
                if(Config.agentUrl == ""){
                    this.okTitle.text = "生成二维码";
                }else{
                    this.okTitle.text = "查看二维码";
                }

                //每次新进游戏默认打开一次
                if(this.isOpenSm){
                   Laya.timer.frameOnce(5,this,this.openSM);
                   this.isOpenSm = false;
                }
            }else if("Agent_3" == data.tag){
                //Toast.show("成功生成代理!");
                if(data.data.data){
                    var url = data.data.data;
                    Config.agentUrl = url;
                    var _agentCode = new AgentCode();
                    _agentCode.showInfo({title:"代理二维码",url:Config.agentUrl});
                }else{
                    Toast.show("代理二维码失效,重新生成!");
                    var _bind = new MobileBind(1,function(_cfg){
                        var _agentCode = new AgentCode();
                        _agentCode.showInfo({title:"代理二维码",url:_cfg.url});
                    });
                    _bind.openDlg();
                }
            }else{
                
            }
        }else{
            Toast.show("数据异常,请稍后尝试!");
        }
    }
    
    //说明
    _proto.openSM = function(){
        var _dlg = new AgentSM();
        _dlg.openDlg();
    }

    /**
     * 生成二维码
     */
    _proto.goCode = function(){
        
        //test
        Config.agentUrl = "agent/qrcode.png";
        var _agentCode = new AgentCode();
        _agentCode.showInfo({title:"代理二维码",url:Config.agentUrl});

        /*if(!this.isLoaded) return;
        Http.getRequestGame("vivianrest/agent/promote/",Config.userID,this,this.onHttpComplete,"Agent_3");
        Toast.show("代理获取中...");*/

    }

    return Agent;
}(AgentUI));