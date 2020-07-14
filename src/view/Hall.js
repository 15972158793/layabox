/*
* name;
*/
var Hall = (function (_super) {
    function Hall(_super) {
        Hall.super(this);

        this.init();
    }
    Laya.class(Hall, "src.view.Hall",_super);
    var _proto = Hall.prototype;

    _proto.init = function(){
         
        //选择盘型
        this.isMove = false;
        this.selectIndex = 0;
        this.panelPos = [0,-720,-1440];
        //单次中奖金额
        this.awardNum = 0;
        /**************     处理转盘的变量             *******/
        this.step = -1;  //步骤
        this.waitFrame = 0;  //当前匀速旋转的帧数
        this.maxWaitFrame = 120; //匀速旋转的最大帧数
        this.accAngle = 0; //角速度
        this.maxAccAngle = 35; //最大的角速度
        this.targetAngle = 0;//旋转的目标度数【0-360】
        this.leftAngle = 0;//减速总需要转的角度
        this.moveAngle = 0;//减速移动累加的角度
        
        //下注类型
        this.selectNO = 0;
        this.selectNums = [2,5,10,30,100,300,1000,2000];
        //基础赔率
        this.baseOdds = [];
        //中奖位置
        this.awardPos = -1;
        //添加公告
        this.loadNoice = true;
        this.noticeTime = 0;
        this.noticeObj = new Notice();
        this.noticeObj.pos(13,20);
        this.itemBox.addChild(this.noticeObj);
        this.noticeObj.set("欢迎光临神龙，祝君盆满钵盈，财运亨通！");
        //3个箭头
        this.arrow1 = this.smallPanel.getChildByName("arrow");
        this.arrow2 = this.middlePanel.getChildByName("arrow");
        this.arrow3 = this.largePanel.getChildByName("arrow");
        this.arrows = [this.arrow1,this.arrow2,this.arrow3]

        this.di1 = this.smallPanel.getChildByName("di");
        this.di2 = this.middlePanel.getChildByName("di");
        this.di3 = this.largePanel.getChildByName("di");

        //3个道具列表
        this.itemInfo1 = this.di1.getChildByName("item");
        this.itemInfo2 = this.di2.getChildByName("item");
        this.itemInfo3 = this.di3.getChildByName("item");
        //开启倒计时
        Laya.timer.loop(1000,this,this.daojishi);
        Laya.timer.frameLoop(1,this,this.startPanel);
        //
        this.addClick();
    }

    _proto.getNotice = function(){
        Http.getRequestGame("public/bighall/notice","",this,this.onHttpComplete,"Notice");
    }
    
    /**
     * 控制自我
     * @param {number} _state 0停止某些 1开启某些
     */
    _proto.controlSelf = function(_state){
        this.loadNoice = _state == 0 ? false : true;
    }
    
    /**
     * 转盘结束
     */
    _proto.endPanel = function(){
        this.accAngle = 0;
        this.step = -1;
        this.waitFrame = 0;
        this.moveAngle = 0;
        this.arrows[this.selectIndex].rotation = this.targetAngle;
        //中奖提示
        App.DisUtil.toAlertWinMsg("恭喜您中奖" + this.awardNum + "元");
        //更新用户数据
        Http.getUserInfo(this,this.onHttpComplete);
    }

    /**
     * 转盘的转动
     */
    _proto.startPanel = function(){

        if(this.step > -1){
            if(0 == this.step){
                if(this.accAngle < 3) {
                    this.accAngle += 0.1;
                }else if(this.accAngle < 10){
                    this.accAngle += 0.3;
                }else{
                    if(this.accAngle < this.maxAccAngle){
                        this.accAngle += 1;
                    }else{
                        this.accAngle = this.maxAccAngle;
                        this.waitFrame = 0;
                        this.step = 1;
                    }
                }
            }else if(1 == this.step){
                if(this.waitFrame < this.maxWaitFrame){
                    //等待时间
                    this.waitFrame += 1;
                }else if(this.waitFrame == this.maxWaitFrame){
                    //计算当前的角度
                    var curAngle = this.arrows[this.selectIndex].rotation > 360 ? 
                    (this.arrows[this.selectIndex].rotation - 360) : this.arrows[this.selectIndex].rotation;
                    this.leftAngle = 360 * 3 + this.targetAngle - curAngle; //0 - 720
                    //下一步
                    this.step = 2;
                    //Tool.log("target: " + this.targetAngle);
                    //Tool.log("cur: " + curAngle);
                    //Tool.log("left: " + this.leftAngle);
                }else{
                    
                }
            }else{
                //减速过程
                if(this.moveAngle < this.leftAngle * 0.1){
                    this.accAngle = this.maxAccAngle;
                }else if(this.moveAngle < this.leftAngle * 0.25){
                    this.accAngle = 25;
                }else if(this.moveAngle < this.leftAngle * 0.4){
                    this.accAngle = 20;
                }else if(this.moveAngle < this.leftAngle * 0.55){
                    this.accAngle = 15;
                }else if(this.moveAngle < this.leftAngle * 0.7){
                    this.accAngle = 10;
                }else if(this.moveAngle < this.leftAngle * 0.8){
                    this.accAngle = 7;
                }else if(this.moveAngle < this.leftAngle * 0.9){
                    this.accAngle = 4;
                }else{
                    if(this.accAngle > 1) this.accAngle -= 1;
                }
                this.moveAngle += this.accAngle;
                //置前执行
                this.arrows[this.selectIndex].rotation += this.accAngle;
                if(this.arrows[this.selectIndex].rotation > 360) this.arrows[this.selectIndex].rotation -= 360;
                //结束
                if(this.moveAngle >= this.leftAngle){
                    //Tool.log("final: " + this.arrows[this.selectIndex].rotation);
                    this.endPanel();
                    return;
                }
            }

            if(2 != this.step){
                this.arrows[this.selectIndex].rotation += this.accAngle;
                if(this.arrows[this.selectIndex].rotation > 360) this.arrows[this.selectIndex].rotation -= 360;
            }
        }
    }

    _proto.daojishi = function(){
        

        //公告定时获取
        if(!this.loadNoice) return;
        if(this.noticeTime < 10){
            this.noticeTime += 1;
        }else{
            this.noticeTime = 0;
            this.getNotice();
        }
    }
    
    /**
     * 根据外部数据
     */
    _proto.configData = function(data){
        
        //配置下注额度
        for(var k = 0;k < this.selectNums.length;k++){
            this.selectNums[k] = parseFloat(data.betNumbers[k]);
            this.itemBox.getChildByName("item"+k).getChildByName("lab").changeText(this.selectNums[k]);
        }

        this.baseOdds = [];
        this.baseOdds.push(data.discOdds[1]);
        this.baseOdds.push(data.discOdds[2]);
        this.baseOdds.push(data.discOdds[3]);

        this.updateItemInfo();
    }

    _proto.updateItemInfo = function(){
        if(0 == this.selectIndex){
            for(var k = 0;k < 2;k++){
                var item = this.itemInfo1.getChildByName("item"+k).getChildByName("lab");
                item.text = this.selectNums[this.selectNO] * this.baseOdds[this.selectIndex][k] + "\n金币";
            }
        }else if(1 == this.selectIndex){
            for(var k = 0;k < 4;k++){
                var item = this.itemInfo2.getChildByName("item"+k).getChildByName("lab");
                item.text = this.selectNums[this.selectNO] * this.baseOdds[this.selectIndex][k] + "\n金币";
            }
        }else{
            for(var k = 0;k < 12;k++){
                var item = this.itemInfo3.getChildByName("item"+k).getChildByName("lab");
                item.text = this.selectNums[this.selectNO] * this.baseOdds[this.selectIndex][k] + "\n金币";
            }
        }
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            if("Buy" == data.tag){
                var info = data.data.data;
                //解锁
                this.unlockVideo();
                //更新用户数据
                Http.getUserInfo(this,this.onHttpComplete);
            }else if("USER" == data.tag){

                this.controlSelf(1);
                //用户的数据
                var info = data.data.data;
                Config.gameGold = info.userLastTotalMoney;
                //监听大厅货币的变化
                App.MsgCenter.send("money");
            }else if("Notice" == data.tag){
                var des = data.data.data;
                this.noticeObj.normalDes = des;
                this.noticeObj.set(des);
                this.loadNoice = true;
            }else if("Bet" == data.tag){
                
                Config.gameGold -= this.selectNums[this.selectNO];
                App.MsgCenter.send("money");
                var s = "成功【下注" + this.selectNums[this.selectNO] + "元】";
                Toast.show(s);
                //解析数据
                var key = data.data.data;
                //获取中奖信息
                Http.getRequestGame("rest/discBet/getByUUID/",key,this,this.onHttpComplete,"BetResult");
            }else if("BetResult" == data.tag){

                //Tool.log(data.data.data);
                this.awardPos = data.data.data.resultIndex;
                //中奖的角度
                this.targetAngle = (this.awardPos - 1) * 30 + Math.floor(Math.random() * 5 + 20); //5-25
                //计算等待时间
                if(0 == this.selectIndex) this.maxWaitFrame = Math.floor(120 + Math.random() * 50);
                else if(1 == this.selectIndex) this.maxWaitFrame = Math.floor(170 + Math.random() * 50);
                else this.maxWaitFrame = Math.floor(220 + Math.random() * 50);
                //中奖的额度
                this.awardNum = data.data.data.profitAmount;
                //开始转动
                this.controlSelf(0);
                this.step = 0;
            }
        }
    }

    /**
     * 点击事件
     */
    _proto.addClick = function(){

        //小 中 大盘
        for(var k = 0;k < this.clickBox.numChildren;k++){
            var p = this.clickBox.getChildByName("item"+k);
            var lab = p.getChildByName("lab");
            p.on("mousedown",this,this.onSelect,[k,p,lab]);
        }
        
        //3个转盘的点击
        this.arrows[0].on("mousedown",this,this.onPanel);
        this.arrows[1].on("mousedown",this,this.onPanel);
        this.arrows[2].on("mousedown",this,this.onPanel);

        //下注金额
        for(var k = 0;k < 8;k++){
            var p = this.itemBox.getChildByName("item"+k);
            var lab = p.getChildByName("lab");
            p.on("mousedown",this,this.onPress,[k,p,lab]);
        }
    }

    /**
     * 转盘动
     */
    _proto.onPanel = function(){

        if(this.step > -1){
           Toast.show("正在抽奖中,请稍等...");
           return;
        }
        var num1 = parseFloat(Config.gameGold);
        if(num1 < this.selectNums[this.selectNO]){
            //余额不足
            Config.room.onSelect(4);
            return;
        }

        //开始请求接口
        var s = {
            "betNum":this.selectNums[this.selectNO],
            "discType":(this.selectIndex+1),
            "userId":Config.userID
        };
        //Tool.log(s);
        //到时候换带签名的
        Http.postRequestGame("public/discBet/add",JSON.stringify(s),this,this.onHttpComplete,null,"Bet");
    }

    /**
     * 选择下注类型
     */
    _proto.onPress = function(k,p,lab){
          
        var self = this;
        if(self.selectNO != k){
            var p1 = self.itemBox.getChildByName("item"+self.selectNO);
            var lab1 = p1.getChildByName("lab");
            p1.skin = "btn/ok1.png";
            lab1.color = "#f5ecc7";
            
            p.skin = "btn/ok2.png";
            lab.color = "#26251f";
            self.selectNO = k;
            
            //更新内容
            self.updateItemInfo();
        }
    }
    
    /**
     * 选择盘类型
     */
    _proto.onSelect = function(k,p,lab){

        var self = this;
        if(self.step > -1){
           Toast.show("正在抽奖中,请稍等...");
           return;
        }

        if(self.isMove) return;
        if(self.selectIndex != k){
            var p1 = self.clickBox.getChildByName("item"+self.selectIndex);
            var lab1 = p1.getChildByName("lab");
            p1.skin = "btn/ok3.png";
            //lab1.color = "#f5ecc7";
            p.skin = "btn/ok4.png";
            //lab.color = "#26251f";
            self.isMove = true;

            self.viewBox.getChildByName("item"+k).visible = true;
            Laya.Tween.to(self.viewBox, {
                x: self.panelPos[k]
            }, 300, Laya.Ease.expoOut, Laya.Handler.create(self, function() {
                self.viewBox.getChildByName("item"+self.selectIndex).visible = false;
                self.selectIndex = k;
                self.isMove = false;

                self.updateItemInfo();
            }));
        }
    }

    //调整view的适配
    _proto.resize = function(scale){
        
    }

    return Hall;
}(HallUI));