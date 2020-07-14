/**
 * 选择银行卡
 */
var CardSelect = function(_super) {
    function CardSelect(_callback) {
        CardSelect.super(this);

        this.callback = _callback;
        this.init();
    }
    Laya.class(CardSelect, "src.dialog.CardSelect", _super);

    var _proto = CardSelect.prototype;
    _proto.init = function() {

        this.popupEffect = null;
        this.closeEffect = null;
        //view适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.addBtn.on("mousedown",this,this.addCard);
        this.contentPanel.vScrollBar.visible = false;
        //获取到的配置数据
        this.cfg = {};
        for(var k = 0;k < this.selectBox.numChildren;k++){
           var item = this.selectBox.getChildByName("item"+k);
           item.on("mousedown",this,this.onSelect,[k]);
        }
        this.selectInfo = ["","",""];
        this.num = 0;
        //获取已添加的银行卡列表
        this.getCardList();
    }

    _proto.getCardList = function(){
        Http.postRequestPanel("rest/withdraw/list",{},this,this.onHttpComplete,null,"Select");
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            if("Select" == data.tag){
                var info = data.data.data;
                this.num = info.total;
                var array = info.rows;
                var num1 = array.length;
                for(var k = 0;k < this.selectBox.numChildren;k++){
                    var item = this.selectBox.getChildByName("item"+k);
                    if(k < num1){
                        item.getChildByName("lab").visible = false;
                        item.getChildByName("di").visible = true;
                        item.getChildByName("icon").visible = true;
                        var type = this.getRankID(array[k].bankType);
                        item.getChildByName("icon").skin = "bank/" + (type+1) + ".jpg";
                        this.selectInfo[k] = array[k];
                    }else{
                        item.getChildByName("lab").visible = true;
                        item.getChildByName("di").visible = false;
                        item.getChildByName("icon").visible = false;
                        this.selectInfo[k] = "";
                    }
                }
            }else if("Delete" == data.tag){
                Toast.show("删除成功");
                this.getCardList();
            }
        }
    }

    _proto.getRankID = function(name){
        var s = ["gsyh","nyyh","jsyh","jtyh","yzcxyh","xyyh","msyh","pfyh","zsyh","gfyh","zgyh","gdyh"];
        for(var k = 0;k < s.length;k++){
           if(name == s[k]) return k;
        }
        return 0;
    }

    /**
     * 选择银行卡
     */
    _proto.onSelect = function(i){
        
        var self = this;
        var info = self.selectInfo[i];
        if(info == ""){
           Toast.show("请添加银行卡");
           return;
        }
        var type = self.getRankID(info.bankType);
        self.cfg.type = type;
        self.cfg.id = info.id;
        self.cfg.no = info.bankNo;

        if(self.num == 3){
            App.DisUtil.confirm("请选择\n【删除绑定】/【确认提现】的银行卡？", ["删除绑定", "确认提现"], function(_sure) {
                if(_sure){
                    self.callback(self.cfg);
                    self.closeDlg();
                }else{
                    self.goDelete(self.cfg.id);
                }
            },"银行卡");
        }else{
            var des = "您确认选择【" + bankInfo[type].name + "】提现吗？";
            App.DisUtil.confirm(des, ["取消", "确认"], function(_sure) {
                if(_sure){
                    self.callback(self.cfg);
                    self.closeDlg();
                }else{
                    //取消
                }
            },"银行卡");
        }
    }

    _proto.goDelete = function(id){
        Http.getRequestGame("rest/withdraw/delete","/"+id,this,this.onHttpComplete,"Delete");
    }

    /**
     * 添加银行卡
     */
    _proto.addCard = function(){
        var self = this;
        if(self.num == 3){
           Toast.show("最多可以添加3张银行卡。");
           return;
        }
        var dlg = new CardBind(function(){
            self.getCardList();
        });
        dlg.openDlg();
    }

    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }

    //弹出
    _proto.closeDlg = function() {
        this.close();
    }
    
    return CardSelect;
}(CardSelectUI)