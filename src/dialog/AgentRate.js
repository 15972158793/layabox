/**
 * 代理详细收益
 */
var AgentRate = (function (_super) {
    function AgentRate(_data) {
        AgentRate.super(this);
        
        this.setInfo(_data);
        this.init();
    }
    Laya.class(AgentRate, "src.dialog.AgentRate",_super);

    var _proto = AgentRate.prototype;
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
        //获取120条历史数据
        this.hisList.visible = false;
        this.hisList.renderHandler = new Laya.Handler(this, this.updateHisItem);
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
            limit:60
        };
        this.requestData();
    }

    _proto.setInfo = function(data){
        
        this.info.getChildByName("item").text = data.profitTotal+"元";
        for(var k = 1;k < 4;k++){
            var item = this.info.getChildByName("item"+k);
            item.text = data.myTeam[k-1]+"人";
            var item1 = this.info.getChildByName("lab"+k);
            item1.text = data.myProfit[k-1]+"元";
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
        Http.postRequestGame("vivianrest/agent/agentProfit",JSON.stringify(this.pageInfo),this,this.onHttpComplete);
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            var info = data.data.data;
            //Tool.log(info);
            //总页数
            this.pages = Math.floor((info.total-0.1) / 60) + 1;
            this.pageNum.text = this.pageIndex;
            this.pageLen.text = "共 " + this.pages + " 页";
            //更新数据
            var dataArray = info.rows;
            var arrItems = [];
            for(var i = 0;i < dataArray.length;i++){
                var cf = dataArray[i];
                var _arr = {};
                _arr.title = App.DisUtil.getNumCN(cf.agentGrade)+"级用户 消费:" + cf.consumeAmount + "元";
                _arr.mark = cf.consumeInfo;
                _arr.num = cf.profitAmount > 0 ? "+"+cf.profitAmount : cf.profitAmount;
                _arr.skin = "agent/t2.png";
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
            Tool.log(info);
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
        cell.getChildByName("title").text = cell.dataSource.title;
        cell.getChildByName("mark").text = cell.dataSource.mark;
        cell.getChildByName("num").text = cell.dataSource.num;
        cell.getChildByName("icon").skin = cell.dataSource.skin;
    }

    _proto.configData = function(id){
        var s = ["重庆时时彩","加纳1.5分彩","北京赛车","幸运飞艇","香港六合彩","泰国分分彩"];
        return s[id-1];
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

    return AgentRate;
}(AgentRateUI));