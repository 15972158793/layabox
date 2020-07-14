/**
 * 用户的消费数据
 */
var CostInfo = (function (_super) {
    function CostInfo() {
        CostInfo.super(this);

        this.id = 0;
        this.title = "";
        this.init();
    }
    Laya.class(CostInfo, "src.dialog.CostInfo",_super);

    var _proto = CostInfo.prototype;
    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //背景适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        //计算高度
        this.select2.height = App.StageUtil.height - this.select2.top - this.select2.bottom;
        //关闭公告
        Config.room.isNotice = false;
        //
        this.moneyLab.text = Config.gameGold;
        this.selectIndex = 0;
        for(var i = 0;i < 3;i++){
           var item = this.select.getChildByName("item"+i);
           item.on("mousedown", this, this.onSelectedTabItem, [i]);
        }
        //list适配
        this.hisList.height = this.select2.height;
        this.hisList.vScrollBarSkin = "";
        //获取120条历史数据
        /*var openHisData = [];
        for(var i = 0;i < 120;i++){
            openHisData.push({time : "----",num:"0",des:"----"});
        }
        this.hisList.dataSource = openHisData;*/
        this.hisList.renderHandler = new Laya.Handler(this, this.updateHisItem);
        this.hisList.visible = false;
        //页数
        this.pages = 1;
        this.pageIndex = 1;
        this.pageNum.text = this.pageIndex;
        this.pageLen.text = "共 " + this.pages + " 页";
        //event
        this.backBtn.on("mousedown",this,this.closeDlg);
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.preBtn.on("mousedown",this,this.goLeft);
        this.nextBtn.on("mousedown",this,this.goRight);
        //分页信息
        this.status = 1;
        this.rows = 120;
        this.requestData();
    }
    
    // TODO
    _proto.onSelectedTabItem = function(_index){
        if(this.selectIndex != _index){
            var preBtn = this.select.getChildByName("item" + this.selectIndex);
            preBtn.skin = "page/di1.png";
            preBtn.getChildByName("typelab").color = "#26251f";
        }
        var nextBtn = this.select.getChildByName("item" + _index);
        nextBtn.skin = "page/di2.png";
        nextBtn.getChildByName("typelab").color = "#c0a574";
        this.selectIndex = _index;
        //请求接口
        this.status = this.selectIndex + 1;
        this.pageIndex = 1;
        this.requestData();
    }
    
    //数据请求
    _proto.requestData = function(){
        var s = this.status + "/" + Config.userID + "/" + this.rows + "/" + this.pageIndex;
        Http.getRequestGame("vivianrest/consume/get/",s,this,this.onHttpComplete);
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            var info = data.data.data;
            Tool.log(info);
            //总页数
            if(info.length == 0){
                this.pages = 1;
            }else{
                this.pages = Math.floor((info[0].totalPages-0.1) / 120) + 1;
            }
            this.pageNum.text = this.pageIndex;
            this.pageLen.text = "共 " + this.pages + " 页";
            //更新数据
            var dataArray = info;
            var arrItems = [];
            for(var i = 0;i < dataArray.length;i++){
                var _arr = {};
                //yyyy-mm-dd
                _arr.time = dataArray[i].time.split(" ")[0];
                //数量
                _arr.num = dataArray[i].money || 0;
                //状态
                var state = dataArray[i].recordStatus;
                if(this.status == 1){
                    if(state == 1){
                        _arr.des = "充值成功";
                    }else if(state == 2){
                        _arr.des = "充值异常";
                    }else if(state == -1){
                        _arr.des = "充值失败";
                    }else if(state == -2){
                        _arr.des = "充值超时";
                    }else if(state == 0){
                        _arr.des = "充值中";
                    }else{
                        _arr.des = "";
                    }
                }else if(this.status == 2){
                    if(state == 1){
                        _arr.des = "提现成功";
                    }else if(state == 0){
                        _arr.des = "提现中";
                    }else if(state == -1){
                        _arr.des = dataArray[i].remark || "拒绝提现";
                    }else{
                        _arr.des = "";
                    }
                }else if(this.status == 3){
                    if(state == 1){
                        _arr.des = "购买成功";
                    }else if(state == 0){
                        _arr.des = "购买中";
                    }else if(state == -1){
                        _arr.des = "购买失败";
                    }else if(state == 2){
                        _arr.des = "购买费用返还";
                    }else{
                        _arr.des = "";
                    }
                }else{
                    _arr.des = "";
                }
                arrItems.push(_arr);
            }
            this.hisList.dataSource = arrItems;
            this.hisList.refresh();
            this.hisList.scrollTo(0);
            if(arrItems.length == 0){
                this.hisList.visible = false;
                this.tip.visible = true;
            }else{
                this.hisList.visible = true;
                this.tip.visible = false;
            }
        }else{
            Toast.show("网络异常,请稍后重试...");
        }
    }
    
    /**
     * 更新显示
     */
    _proto.updateHisItem = function(cell, index){
        cell.getChildByName("day").text = cell.dataSource.time;
        cell.getChildByName("date").text = cell.dataSource.num;
        cell.getChildByName("num0").text = cell.dataSource.des;
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

    _proto.configData = function(){
        switch(Config.gameID){
            case 1:
                 this.id = 1;
                 this.title = "重庆时时彩";
                 break;
            case 2:
                 this.id = 2;
                 this.title = "加纳1.5分彩";
                 break;
            case 3:
                 this.id = 3;
                 this.title = "北京赛车";
                 break;
            case 4:
                 this.id = 4;
                 this.title = "幸运飞艇";
                 break;
            case 5:
                 this.id = 5;
                 this.title = "香港六合彩";
                 break;
            case 6:
                 this.id = 6;
                 this.title = "泰国分分彩";
                 break;
        }
    }
    
    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function(){
        //关闭公告
        Config.room.isNotice = true;
        this.close();
    }

    return CostInfo;
}(CostInfoDlgUI));