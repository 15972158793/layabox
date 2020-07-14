/*
* 提现
*/
var Draw = (function (_super) {
    function Draw() {
        Draw.super(this);

        this.init();
    }
    Laya.class(Draw,"src.view.Draw",_super)
    var _proto = Draw.prototype;

    _proto.init = function(){

        this.addClick();

        
    }
    
    /**
     * 点击事件
     */
    _proto.addClick = function(){
        //提现情况
        this.record.on("mousedown",this,this.goSee);
        //更多游戏
        for(var k = 0;k < 2;k++){
           var okBtn = this.gameBox.getChildByName("box"+k).getChildByName("ok");
           okBtn.on("mousedown",this,this.goGame,[k]); 
        }
    }
      
    /**
     * 外部获取数据
     */
    _proto.setData = function(){
        Toast.show("外部获取提现数据...");
    }

    /**
     * 更多游戏
     */
    _proto.goGame = function(i){
        Tool.log("game: " + i);
    }

    /*
     * 查看消费情况
    */
    _proto.goSee = function(){
        Tool.log("info ...");
        /*var _dlg = new CostInfo();
        _dlg.openDlg();*/
    }

    return Draw;
}(DrawUI));