/**
 * 代理团队
 */
var AgentTeam = (function (_super) {
    function AgentTeam(_data) {
        AgentTeam.super(this);
        
        this.setInfo(_data);
        this.init();
    }
    Laya.class(AgentTeam, "src.dialog.AgentTeam",_super);

    var _proto = AgentTeam.prototype;
    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //背景适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;

        //关闭公告
        Config.room.isNotice = false;

        //计算高度
        this.panel.height = App.StageUtil.height - this.panel.top;
        //
        this.tipBox.visible = false;
        //list适配
        this.hisList.height = this.panel.height;
        this.hisList.vScrollBarSkin = "";
        //页数
        this.pages = 1;
        this.pageIndex = 1;
        this.pageNum.text = this.pageIndex;
        this.pageLen.text = "共 " + this.pages + " 页";
        //event
        this.back.on("mousedown",this,this.closeDlg);
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.preBtn.on("mousedown",this,this.goLeft);
        this.nextBtn.on("mousedown",this,this.goRight);

        //分页信息
        this.pageInfo = {
            userId:Config.userID,
            page:this.pageIndex,
            limit:20
        };

        //获取120条历史数据
        this.hisList.visible = false;
        this.hisList.renderHandler = new Laya.Handler(this, this.updateHisItem);
        this.requestData();
    }

    _proto.setInfo = function(data){
        for(var k = 0;k < 4;k++){
            var item = this.info.getChildByName("item"+k);
            if(k == 0) item.text = data.teamTotal+"人";
            else item.text = data.myTeam[k-1]+"人";
        }
    }
    
    //代理分享
    _proto.goShare = function(){
        var _agentCode = new AgentCode();
        _agentCode.showInfo({url:"http://www.baidu.com"});
        this.closeDlg();
    }

    _proto.requestData = function(){
        //post的json请求
        this.pageInfo.page = this.pageIndex;
        Http.postRequestGame("vivianrest/agent/agentTear",JSON.stringify(this.pageInfo),this,this.onHttpComplete);
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            var info = data.data.data;
            //Tool.log(info);
            //总页数
            this.pages = Math.floor((info.total-0.1) / 20) + 1;
            this.pageNum.text = this.pageIndex;
            this.pageLen.text = "共 " + this.pages + " 页";
            //更新数据
            var dataArray = info.rows;
            var arrItems = [];
            for(var i = 0;i < dataArray.length;i++){
                var cf = dataArray[i];
                var _arr = {};
                _arr.level = App.DisUtil.getNumCN(cf.agentGrade)+"级";
                //_arr.num1 = (cf.profitAmount >= 0 ? "+" + cf.profitAmount : cf.profitAmount)+"元";
                _arr.num2 = (cf.rechargeAmount >= 0 ? "+" + cf.rechargeAmount : cf.rechargeAmount)+"元";
                _arr.num3 = (cf.consumeAmount >= 0 ? "+" + cf.consumeAmount : cf.consumeAmount)+"元";
                //_arr.num3 = (cf.withDrawCashAmount >= 0 ? "+" + cf.withDrawCashAmount : cf.withDrawCashAmount)+"元";
                //_arr.num4 = (cf.betAmount >= 0 ? "+" + cf.betAmount : cf.betAmount)+"元";
                //_arr.num5 = (cf.wonAmount >= 0 ? "+" + cf.wonAmount : cf.wonAmount)+"元";
                arrItems.push(_arr);
            }
            //
            if(arrItems.length == 0){
               this.tipBox.visible = true;
               //this.shareLab.on("mousedown",this,this.goShare);
               return;
            }else{
                this.tipBox.visible = false;
                this.hisList.visible = true;
                this.hisList.dataSource = arrItems;
                this.hisList.scrollTo(0);
            }
        }else{
            Toast.show("网络异常,请稍后重试...");
        }
    }

    _proto.goLeft = function(){
        if(this.pageIndex > 1){
           this.pageIndex -= 1;
           if(this.pageIndex == 1){
               this.preBtn.gray = true;
           }else{
               this.preBtn.gray = false;
           }
           if(this.pageIndex == this.pages){
               this.nextBtn.gray = true;
           }else{
               this.nextBtn.gray = false;
           }
           this.requestData();
        }else{
           Toast.show("已经是第一页");
           return;
        }
    }

    _proto.goRight = function(){
        if(this.pageIndex < this.pages){
           this.pageIndex += 1;
           this.pageNum.text = this.pageIndex;
           if(this.pageIndex == this.pages){
               this.nextBtn.gray = true;
           }else{
               this.nextBtn.gray = false;
           }

           if(this.pageIndex == 1){
               this.preBtn.gray = true;
           }else{
               this.preBtn.gray = false;
           }
           this.requestData();
        }else{
           Toast.show("已经是最后一页");
           return;
        }
    }
    
   _proto.updateHisItem = function(cell, index){
        cell.getChildByName("lab1").text = cell.dataSource.level;
        //cell.getChildByName("lab2").text = cell.dataSource.num1;
        cell.getChildByName("lab3").text = cell.dataSource.num2;
        //cell.getChildByName("lab4").text = cell.dataSource.num3;
        cell.getChildByName("lab5").text = cell.dataSource.num3;
        //cell.getChildByName("lab6").text = cell.dataSource.num5;
    }
    
    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function(){
        //打开公告
        Config.room.isNotice = true;
        this.close();
    }

    return AgentTeam;
}(AgentTeamUI));