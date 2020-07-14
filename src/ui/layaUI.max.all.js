var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var AgentCodeUI=(function(_super){
		function AgentCodeUI(){
			
		    this.bg=null;
		    this.di=null;

			AgentCodeUI.__super.call(this);
		}

		CLASS$(AgentCodeUI,'ui.dialog.AgentCodeUI',_super);
		var __proto__=AgentCodeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AgentCodeUI.uiView);

		}

		AgentCodeUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"x":0,"width":720,"var":"bg","top":0,"skin":"common/black.png","bottom":0}},{"type":"Image","props":{"y":0,"width":720,"var":"di","skin":"agent/bg.jpg","height":1280,"centerX":0}}]};
		return AgentCodeUI;
	})(Dialog);
var AgentRateUI=(function(_super){
		function AgentRateUI(){
			
		    this.bg=null;
		    this.topdi=null;
		    this.back=null;
		    this.closeBtn=null;
		    this.info=null;
		    this.panel=null;
		    this.hisList=null;
		    this.tipBox=null;
		    this.btmBox=null;
		    this.preBtn=null;
		    this.nextBtn=null;
		    this.pageNum=null;
		    this.pageLen=null;

			AgentRateUI.__super.call(this);
		}

		CLASS$(AgentRateUI,'ui.dialog.AgentRateUI',_super);
		var __proto__=AgentRateUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AgentRateUI.uiView);

		}

		AgentRateUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"width":720,"var":"bg","staticCache":true,"skin":"dialog/ss.png","height":1280,"cacheAsBitmap":true,"cacheAs":"bitmap"}},{"type":"Image","props":{"width":720,"var":"topdi","skin":"dialog/tbg.png","cacheAsBitmap":true,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"back","skin":"btn/back.png"}},{"type":"Image","props":{"y":0,"var":"closeBtn","skin":"btn/close.png","right":0}},{"type":"Label","props":{"y":26,"x":253,"width":213,"valign":"middle","text":"代理推广收益","fontSize":33,"color":"#f4cf8d","align":"center"}},{"type":"Image","props":{"y":106,"x":130,"var":"info","skin":"agent/di4.png"},"child":[{"type":"Label","props":{"y":12,"x":20,"width":93,"valign":"middle","text":"总收益","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":56,"x":20,"width":93,"valign":"middle","text":"一级收益","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":100,"x":20,"width":93,"valign":"middle","text":"二级收益","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":143,"x":20,"width":93,"valign":"middle","text":"三级收益","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":12,"x":196,"width":185,"valign":"middle","text":"0.000","name":"item","height":21,"fontSize":21,"color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":56,"x":143,"width":93,"valign":"middle","text":"0人","name":"item1","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":100,"x":143,"width":93,"valign":"middle","text":"0人","name":"item2","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":143,"x":143,"width":93,"valign":"middle","text":"0人","name":"item3","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":56,"x":254,"width":200,"valign":"middle","text":"0.00元","name":"lab1","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":100,"x":254,"width":200,"valign":"middle","text":"0.00元","name":"lab2","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":143,"x":254,"width":200,"valign":"middle","text":"0.00元","name":"lab3","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"x":0,"top":250,"skin":"page/jk.png","cacheAsBitmap":true,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":60,"x":150,"width":420,"valign":"middle","text":"收益明细(仅展示三天内数据)","strokeColor":"#26251f","stroke":1,"height":64,"fontSize":28,"color":"#26251f","bold":true,"align":"center"}}]}]},{"type":"Panel","props":{"x":0,"width":720,"var":"panel","top":370,"cacheAs":"bitmap","bottom":74},"child":[{"type":"List","props":{"y":0,"x":0,"width":720,"var":"hisList","vScrollBarSkin":"common/vscroll.png","top":0,"repeatX":1,"cacheAsBitmap":true,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":0,"x":0,"width":720,"name":"render","height":60},"child":[{"type":"Image","props":{"width":720,"skin":"dialog/line1.png","height":42,"bottom":0}},{"type":"Label","props":{"y":0,"x":20,"width":400,"valign":"middle","text":"二级用户   购买:1000元","name":"title","height":32,"fontSize":26,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":29,"x":20,"width":400,"valign":"middle","text":"[重庆时时彩]2017-01-01 第1000期","name":"mark","height":31,"fontSize":21,"color":"#7f6a55","align":"center"}},{"type":"Label","props":{"y":10,"width":175,"valign":"middle","text":"+500元","right":90,"name":"num","height":40,"fontSize":22,"color":"#f6110d","align":"right"}},{"type":"Image","props":{"y":10,"skin":"agent/t2.png","right":30,"name":"icon"}}]}]},{"type":"Box","props":{"width":608,"visible":false,"var":"tipBox","height":176,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":42,"skin":"page/zanwu.png","left":50}},{"type":"Label","props":{"y":65,"x":166,"text":"您暂无下级视频用户","leading":7,"fontSize":36,"color":"#8a8a8a"}}]}]},{"type":"Box","props":{"width":720,"var":"btmBox","height":80,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"skin":"dialog/qs.png","height":80}},{"type":"Image","props":{"y":40,"x":543,"var":"preBtn","skin":"page/right.png","scaleX":-1,"pivotY":28,"pivotX":28,"gray":true}},{"type":"Image","props":{"y":40,"x":678,"var":"nextBtn","skin":"page/right.png","pivotY":28,"pivotX":28}},{"type":"Label","props":{"y":8,"x":571,"width":80,"var":"pageNum","valign":"middle","text":"0","height":64,"fontSize":30,"color":"#f4cf8d","align":"center"}},{"type":"Label","props":{"y":14,"x":25,"width":280,"var":"pageLen","valign":"middle","text":"共 1 页","height":52,"fontSize":30,"color":"#f4cf8d","align":"left"}}]}]};
		return AgentRateUI;
	})(Dialog);
var AgentSMUI=(function(_super){
		function AgentSMUI(){
			
		    this.bg=null;
		    this.closeBtn=null;

			AgentSMUI.__super.call(this);
		}

		CLASS$(AgentSMUI,'ui.dialog.AgentSMUI',_super);
		var __proto__=AgentSMUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AgentSMUI.uiView);

		}

		AgentSMUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"bg","height":1280}},{"type":"Box","props":{"centerY":0,"centerX":0,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"x":0,"width":720,"skin":"draw/di1.png","height":800,"centerY":0,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"width":520,"skin":"draw/conent.png","height":640,"centerY":12,"centerX":-2}},{"type":"Label","props":{"y":37,"width":100,"valign":"middle","text":"佣金说明","height":35,"fontSize":21,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Image","props":{"y":18,"x":602,"var":"closeBtn","skin":"dialog/close.png"}},{"type":"Box","props":{"width":500,"top":80,"centerX":0,"cacheAs":"bitmap","bottom":60},"child":[{"type":"Panel","props":{"y":19,"width":352,"height":133,"centerX":0},"child":[{"type":"Image","props":{"y":-44,"x":0,"skin":"agent/di3.png"},"child":[{"type":"Label","props":{"y":50,"x":23,"width":84,"valign":"middle","text":"一级用户","height":33,"fontSize":21,"color":"#912c11","align":"center"}},{"type":"Label","props":{"y":93,"x":23,"width":84,"valign":"middle","text":"二级用户","height":33,"fontSize":21,"color":"#912c11","align":"center"}},{"type":"Label","props":{"y":138,"x":23,"width":84,"valign":"middle","text":"三级用户","height":33,"fontSize":21,"color":"#912c11","align":"center"}},{"type":"Label","props":{"y":50,"x":149,"width":140,"valign":"middle","text":"游戏下注金额*","height":33,"fontSize":19,"color":"#912c11","align":"center"}},{"type":"Label","props":{"y":93,"x":149,"width":140,"valign":"middle","text":"游戏下注金额*","height":33,"fontSize":19,"color":"#912c11","align":"center"}},{"type":"Label","props":{"y":138,"x":149,"width":140,"valign":"middle","text":"游戏下注金额*","height":33,"fontSize":19,"color":"#912c11","align":"center"}},{"type":"Label","props":{"y":50,"x":280,"width":70,"valign":"middle","text":"5%","height":33,"fontSize":19,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":93,"x":280,"width":70,"valign":"middle","text":"3%","height":33,"fontSize":19,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":138,"x":280,"width":70,"valign":"middle","text":"1%","height":33,"fontSize":19,"color":"#ffffff","align":"left"}}]}]},{"type":"Label","props":{"y":170,"wordWrap":true,"width":440,"text":"佣金方案全面升级！不仅是您邀请的用户(一级用户)，您还能从这些用户的下级用户的订单中赚取佣金！佣金最多可叠加三级！","leading":12,"fontSize":21,"color":"#DBA75A","centerX":0,"align":"center"}},{"type":"Label","props":{"y":270,"wordWrap":true,"width":460,"text":"例：您邀请30位用户，这些用户各自再邀请30位用户为您的二级用户，二级用户再邀请30位用户为您的三级用户，每人消费10元。","leading":12,"fontSize":21,"color":"#DBA75A","centerX":0,"align":"center"}},{"type":"Label","props":{"y":370,"x":32,"text":"您可获取佣金：","fontSize":21,"color":"#DBA75A","align":"center"}},{"type":"Image","props":{"y":400,"width":520,"skin":"room/di3.png","height":40,"centerX":-2},"child":[{"type":"Label","props":{"x":18,"valign":"middle","text":"30*10*40%+30²*10*20%+30³*10*10%=28920元","height":30,"fontSize":21,"color":"#ffffff","centerY":0,"centerX":0,"align":"center"}}]},{"type":"Label","props":{"y":460,"valign":"middle","text":"佣金提现","height":30,"fontSize":24,"color":"#b34f33","centerX":0,"bold":true,"align":"center"}},{"type":"Label","props":{"y":510,"wordWrap":true,"width":370,"valign":"middle","text":"点击“提现”----\"兑换记录\"即可查看您的佣金。佣金实时到您的游戏余额，可随时提现。","leading":8,"height":51,"fontSize":18,"color":"#b34f33","centerX":0,"align":"center"}}]}]}]}]};
		return AgentSMUI;
	})(Dialog);
var AgentTeamUI=(function(_super){
		function AgentTeamUI(){
			
		    this.bg=null;
		    this.back=null;
		    this.closeBtn=null;
		    this.info=null;
		    this.panel=null;
		    this.hisList=null;
		    this.infoBox=null;
		    this.tipBox=null;
		    this.btmBox=null;
		    this.preBtn=null;
		    this.nextBtn=null;
		    this.pageNum=null;
		    this.pageLen=null;

			AgentTeamUI.__super.call(this);
		}

		CLASS$(AgentTeamUI,'ui.dialog.AgentTeamUI',_super);
		var __proto__=AgentTeamUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AgentTeamUI.uiView);

		}

		AgentTeamUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"width":720,"var":"bg","skin":"dialog/ss.png","height":1280,"cacheAsBitmap":true,"cacheAs":"bitmap"}},{"type":"Image","props":{"width":720,"staticCache":true,"skin":"dialog/tbg.png","cacheAsBitmap":true,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"back","skin":"btn/back.png"}},{"type":"Image","props":{"y":0,"var":"closeBtn","skin":"btn/close.png","right":0}},{"type":"Label","props":{"y":26,"x":253,"width":213,"valign":"middle","text":"我的团队","fontSize":33,"color":"#f4cf8d","align":"center"}},{"type":"Image","props":{"y":106,"x":130,"var":"info","skin":"agent/di3.png"},"child":[{"type":"Label","props":{"y":12,"x":20,"width":93,"valign":"middle","text":"总人数","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":56,"x":20,"width":93,"valign":"middle","text":"一级用户","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":100,"x":20,"width":93,"valign":"middle","text":"二级用户","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":143,"x":20,"width":93,"valign":"middle","text":"三级用户","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":12,"x":249,"width":93,"valign":"middle","text":"0人","name":"item0","height":21,"fontSize":21,"color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":56,"x":249,"width":93,"valign":"middle","text":"0人","name":"item1","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":100,"x":249,"width":93,"valign":"middle","text":"0人","name":"item2","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}},{"type":"Label","props":{"y":143,"x":249,"width":93,"valign":"middle","text":"0人","name":"item3","height":21,"fontSize":21,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"x":0,"top":250,"skin":"page/jk.png","cacheAsBitmap":true,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":60,"x":150,"width":420,"valign":"middle","text":"团队明细","strokeColor":"#26251f","stroke":1,"height":64,"fontSize":28,"color":"#26251f","bold":true,"align":"center"}}]}]},{"type":"Panel","props":{"x":0,"width":720,"var":"panel","top":370,"cacheAsBitmap":true,"cacheAs":"bitmap","bottom":74},"child":[{"type":"List","props":{"y":0,"x":0,"width":720,"var":"hisList","vScrollBarSkin":"common/vscroll.png","top":0,"repeatX":1,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":0,"x":0,"width":720,"var":"infoBox","name":"render","height":150},"child":[{"type":"Image","props":{"width":720,"skin":"dialog/line1.png","height":42,"bottom":0}},{"type":"Label","props":{"y":0,"x":33,"valign":"middle","text":"用户等级：","height":69,"fontSize":26,"color":"#E1D7B9","align":"right"}},{"type":"Label","props":{"y":0,"x":115,"width":233,"valign":"middle","text":"一级","name":"lab1","height":69,"fontSize":26,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":0,"x":395,"width":77,"valign":"middle","text":"充值：","height":69,"fontSize":26,"color":"#E1D7B9","align":"center"}},{"type":"Label","props":{"y":0,"x":453,"width":233,"valign":"middle","text":"+0.00元","name":"lab3","height":69,"fontSize":26,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":70,"x":35,"width":77,"valign":"middle","text":"消费：","height":69,"fontSize":26,"color":"#E1D7B9","align":"center"}},{"type":"Label","props":{"y":70,"x":115,"width":233,"valign":"middle","text":"+0.00元","name":"lab5","height":69,"fontSize":26,"color":"#ffffff","align":"right"}}]}]},{"type":"Box","props":{"width":608,"visible":false,"var":"tipBox","height":176,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":42,"skin":"page/zanwu.png","left":50}},{"type":"Label","props":{"y":68,"x":166,"text":"您暂无下级视频用户","leading":7,"fontSize":36,"color":"#8a8a8a"}}]}]},{"type":"Box","props":{"width":720,"var":"btmBox","height":80,"cacheAsBitmap":true,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"skin":"dialog/qs.png","height":80}},{"type":"Image","props":{"y":40,"x":543,"var":"preBtn","skin":"page/right.png","scaleX":-1,"pivotY":28,"pivotX":28,"gray":true}},{"type":"Image","props":{"y":40,"x":678,"var":"nextBtn","skin":"page/right.png","pivotY":28,"pivotX":28}},{"type":"Label","props":{"y":8,"x":571,"width":80,"var":"pageNum","valign":"middle","text":"0","height":64,"fontSize":30,"color":"#f4cf8d","align":"center"}},{"type":"Label","props":{"y":14,"x":25,"width":280,"var":"pageLen","valign":"middle","text":"共 1 页","height":52,"fontSize":30,"color":"#f4cf8d","align":"left"}}]}]};
		return AgentTeamUI;
	})(Dialog);
var CardBindUI=(function(_super){
		function CardBindUI(){
			
		    this.bg=null;
		    this.closeBtn=null;
		    this.backBtn=null;
		    this.selectBtn=null;
		    this.input1=null;
		    this.input2=null;
		    this.input3=null;
		    this.input4=null;
		    this.submitBtn=null;

			CardBindUI.__super.call(this);
		}

		CLASS$(CardBindUI,'ui.dialog.CardBindUI',_super);
		var __proto__=CardBindUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CardBindUI.uiView);

		}

		CardBindUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"var":"bg","top":0,"skin":"dialog/ss.png","right":0,"left":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"top":0,"skin":"dialog/tbg.png"},"child":[{"type":"Image","props":{"var":"closeBtn","top":0,"skin":"btn/back.png","left":0}},{"type":"Image","props":{"var":"backBtn","top":0,"skin":"btn/close.png","right":0}},{"type":"Label","props":{"x":253,"width":213,"valign":"middle","top":6,"text":"绑定银行卡","height":72,"fontSize":33,"color":"#F4CF8D","align":"center"}}]},{"type":"Image","props":{"y":200,"x":0,"width":720,"top":120,"skin":"dialog/k7.png","cacheAs":"bitmap"}},{"type":"Image","props":{"width":720,"top":200,"skin":"charge/shense_bg.jpg","height":120},"child":[{"type":"Image","props":{"y":25,"x":240,"width":440,"var":"selectBtn","skin":"dialog/k5.png","right":40,"height":70},"child":[{"type":"Label","props":{"width":440,"var":"input1","valign":"middle","text":"选择开户银行","height":70,"fontSize":30,"color":"#ffffff","centerY":0,"centerX":0,"align":"left"}}]},{"type":"Image","props":{"skin":"charge/fenge_line.png","bottom":0}},{"type":"Label","props":{"y":26,"valign":"middle","text":"开户银行","left":50,"height":68,"fontSize":28,"color":"#AB9069","align":"center"}}]},{"type":"Image","props":{"width":720,"top":320,"skin":"charge/shense_bg.jpg","height":120},"child":[{"type":"Image","props":{"y":25,"x":240,"width":440,"skin":"dialog/k5.png","right":40,"height":70},"child":[{"type":"TextInput","props":{"y":0,"x":65,"width":440,"var":"input2","valign":"middle","promptColor":"#4a4139","prompt":"填写开户网点","overflow":"hidden","height":70,"fontSize":30,"color":"#ab9069","centerY":0,"centerX":0,"align":"left"}}]},{"type":"Image","props":{"skin":"charge/fenge_line.png","bottom":0}},{"type":"Label","props":{"y":26,"x":50,"valign":"middle","text":"开户网点","left":50,"height":68,"fontSize":28,"color":"#AB9069","align":"center"}}]},{"type":"Image","props":{"width":720,"top":440,"skin":"charge/shense_bg.jpg","height":120},"child":[{"type":"Image","props":{"y":25,"x":240,"width":440,"skin":"dialog/k5.png","right":40,"height":70},"child":[{"type":"TextInput","props":{"y":0,"x":65,"width":440,"var":"input3","valign":"middle","type":"number","promptColor":"#4a4139","prompt":"填写银行卡号","overflow":"hidden","height":70,"fontSize":30,"color":"#ab9069","centerY":0,"centerX":0,"align":"left"}}]},{"type":"Image","props":{"skin":"charge/fenge_line.png","bottom":0}},{"type":"Label","props":{"y":26,"x":50,"valign":"middle","text":"银行卡号","left":50,"height":68,"fontSize":28,"color":"#AB9069","align":"center"}}]},{"type":"Image","props":{"width":720,"top":560,"skin":"charge/shense_bg.jpg","height":120},"child":[{"type":"Image","props":{"y":25,"x":240,"width":440,"skin":"dialog/k5.png","right":40,"height":70},"child":[{"type":"TextInput","props":{"y":0,"x":65,"width":440,"var":"input4","valign":"middle","promptColor":"#4a4139","prompt":"填写真实名称","overflow":"hidden","height":70,"fontSize":30,"color":"#ab9069","centerY":0,"centerX":0,"align":"left"}}]},{"type":"Image","props":{"skin":"charge/fenge_line.png","bottom":0}},{"type":"Label","props":{"y":26,"x":50,"valign":"middle","text":"开户名称","left":50,"height":68,"fontSize":28,"color":"#AB9069","align":"center"}}]},{"type":"Image","props":{"width":720,"top":680,"skin":"charge/shense_bg.jpg","height":240},"child":[{"type":"Box","props":{"width":720,"height":240},"child":[{"type":"Label","props":{"top":20,"text":"注意：","left":50,"fontSize":22,"color":"#ff7474"}},{"type":"Label","props":{"wordWrap":true,"width":635,"top":60,"text":"1、为保障您的提现能正常到账，绑定时请输入正确的真实姓名，一旦提交，不可更改，后续添加的银行卡姓名不能编辑，以首次绑定的银行卡姓名为准；","overflow":"hidden","left":50,"leading":10,"height":99,"fontSize":22,"color":"#d2d2d2","align":"left"}},{"type":"Label","props":{"wordWrap":true,"width":635,"top":160,"text":"2、每个用户最多可绑定三张银行卡，绑定后不可更改，如遇到特殊情况请联系客服。","overflow":"hidden","left":50,"leading":10,"height":64,"fontSize":22,"color":"#d2d2d2","align":"left"}}]}]},{"type":"Image","props":{"var":"submitBtn","top":950,"skin":"btn/k4.png","height":60,"centerX":0},"child":[{"type":"Label","props":{"y":14,"x":38,"text":"保存提交","fontSize":32,"color":"#ffffff"}}]}]}]};
		return CardBindUI;
	})(Dialog);
var CardListUI=(function(_super){
		function CardListUI(){
			
		    this.bg=null;
		    this.contentPanel=null;

			CardListUI.__super.call(this);
		}

		CLASS$(CardListUI,'ui.dialog.CardListUI',_super);
		var __proto__=CardListUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CardListUI.uiView);

		}

		CardListUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"x":0,"width":720,"var":"bg","top":0,"skin":"common/black.png","bottom":0,"alpha":0.85}},{"type":"Image","props":{"width":680,"skin":"dialog/k1.png","height":717,"centerY":0,"centerX":0,"cacheAs":"bitmap","sizeGrid":"24,20,22,22"},"child":[{"type":"Panel","props":{"x":10,"width":660,"var":"contentPanel","vScrollBarSkin":"common/vscroll.png","top":15,"cacheAs":"bitmap","bottom":20},"child":[{"type":"Box","props":{"y":902,"x":50,"width":560,"name":"item11","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/12.jpg"}}]},{"type":"Box","props":{"y":820,"x":50,"width":560,"name":"item10","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/11.jpg"}}]},{"type":"Box","props":{"y":738,"x":50,"width":560,"name":"item9","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/10.jpg"}}]},{"type":"Box","props":{"y":656,"x":50,"width":560,"name":"item8","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/9.jpg"}}]},{"type":"Box","props":{"y":574,"x":50,"width":560,"name":"item7","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/8.jpg"}}]},{"type":"Box","props":{"y":492,"x":50,"width":560,"name":"item6","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/7.jpg"}}]},{"type":"Box","props":{"y":410,"x":50,"width":560,"name":"item5","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/6.jpg"}}]},{"type":"Box","props":{"y":328,"x":50,"width":560,"name":"item4","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/5.jpg"}}]},{"type":"Box","props":{"y":246,"x":50,"width":560,"name":"item3","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/4.jpg"}}]},{"type":"Box","props":{"y":164,"x":50,"width":560,"name":"item2","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/3.jpg"}}]},{"type":"Box","props":{"y":82,"x":50,"width":560,"name":"item1","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/2.jpg"}}]},{"type":"Box","props":{"y":2,"x":50,"width":560,"name":"item0","height":63},"child":[{"type":"Image","props":{"y":0,"x":5,"skin":"bank/baidi.png"}},{"type":"Image","props":{"y":0,"x":159,"skin":"bank/1.jpg"}}]}]},{"type":"Image","props":{"x":10,"width":660,"skin":"dialog/line1.png","bottom":10}}]}]};
		return CardListUI;
	})(Dialog);
var CardSelectUI=(function(_super){
		function CardSelectUI(){
			
		    this.bg=null;
		    this.contentPanel=null;
		    this.selectBox=null;
		    this.closeBtn=null;
		    this.addBtn=null;

			CardSelectUI.__super.call(this);
		}

		CLASS$(CardSelectUI,'ui.dialog.CardSelectUI',_super);
		var __proto__=CardSelectUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CardSelectUI.uiView);

		}

		CardSelectUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"bg","skin":"common/black.png","height":1280,"alpha":0.85}},{"type":"Image","props":{"width":680,"skin":"dialog/k1.png","height":717,"centerY":0,"centerX":0,"cacheAs":"bitmap","sizeGrid":"24,20,22,22"},"child":[{"type":"Image","props":{"x":10,"width":660,"top":20,"skin":"dialog/line1.png"},"child":[{"type":"Image","props":{"y":0,"x":510,"width":82,"skin":"dialog/tt.png","scaleX":-1,"height":20}},{"type":"Image","props":{"y":0,"x":150,"skin":"dialog/tt.png"}},{"type":"Label","props":{"y":-3,"valign":"middle","text":"选择您的银行卡","fontSize":24,"color":"#998564","centerX":0,"align":"center"}}]},{"type":"Panel","props":{"x":10,"width":660,"var":"contentPanel","vScrollBarSkin":"common/vscroll.png","top":66,"cacheAsBitmap":true,"cacheAs":"bitmap","bottom":80},"child":[{"type":"VBox","props":{"y":16,"x":0,"var":"selectBox","space":10},"child":[{"type":"Box","props":{"y":0,"x":0,"width":660,"name":"item0","height":80},"child":[{"type":"Label","props":{"y":10,"x":55,"width":550,"valign":"middle","text":"银行卡(一)","name":"lab","height":60,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":8,"x":55,"visible":false,"skin":"bank/baidi.png","name":"di"}},{"type":"Image","props":{"y":9,"x":209,"visible":false,"skin":"bank/1.jpg","name":"icon"}}]},{"type":"Box","props":{"y":80,"x":0,"width":660,"name":"item1","height":80},"child":[{"type":"Label","props":{"y":10,"x":55,"width":550,"valign":"middle","text":"银行卡(二)","name":"lab","height":60,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":8,"x":55,"visible":false,"skin":"bank/baidi.png","name":"di"}},{"type":"Image","props":{"y":9,"x":209,"visible":false,"skin":"bank/1.jpg","name":"icon"}}]},{"type":"Box","props":{"y":160,"x":0,"width":660,"name":"item2","height":80},"child":[{"type":"Label","props":{"y":10,"x":55,"width":550,"valign":"middle","text":"银行卡(三)","name":"lab","height":60,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":8,"x":55,"visible":false,"skin":"bank/baidi.png","name":"di"}},{"type":"Image","props":{"y":9,"x":209,"visible":false,"skin":"bank/1.jpg","name":"icon"}}]}]}]},{"type":"Image","props":{"y":595,"x":10,"width":660,"skin":"dialog/line1.png"}},{"type":"Image","props":{"y":646,"var":"closeBtn","skin":"btn/k3.png","left":100},"child":[{"type":"Label","props":{"y":13,"x":74,"valign":"middle","text":"取消","strokeColor":"#3e2e16","stroke":1,"fontSize":28,"color":"#3e2e16","align":"center"}}]},{"type":"Image","props":{"y":647,"var":"addBtn","skin":"btn/k4.png","right":100},"child":[{"type":"Label","props":{"y":13,"x":32,"valign":"middle","text":"添加银行卡","fontSize":28,"color":"#ffffff","align":"center"}}]}]}]};
		return CardSelectUI;
	})(Dialog);
var CashOutUI=(function(_super){
		function CashOutUI(){
			
		    this.bg=null;
		    this.closeBtn=null;
		    this.backBtn=null;
		    this.moneyLab=null;
		    this.allBtn=null;
		    this.moneyInput=null;
		    this.submit=null;
		    this.userBox=null;
		    this.tips1=null;
		    this.tips2=null;
		    this.arrow=null;
		    this.infoBox=null;

			CashOutUI.__super.call(this);
		}

		CLASS$(CashOutUI,'ui.dialog.CashOutUI',_super);
		var __proto__=CashOutUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CashOutUI.uiView);

		}

		CashOutUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"var":"bg","top":0,"skin":"dialog/ss.png","right":0,"left":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"top":0,"skin":"dialog/tbg.png"},"child":[{"type":"Image","props":{"var":"closeBtn","top":0,"skin":"btn/back.png","left":0}},{"type":"Image","props":{"var":"backBtn","top":0,"skin":"btn/cancel.png","right":0}},{"type":"Label","props":{"x":253,"width":213,"valign":"middle","top":6,"text":"客户提现","height":72,"fontSize":33,"color":"#F4CF8D","align":"center"}}]},{"type":"Box","props":{"y":80,"width":720,"top":80,"height":120,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":0,"x":0,"width":720,"var":"moneyLab","valign":"middle","text":"0.00","height":60,"fontSize":60,"color":"#DEAA5D","bold":true,"align":"center"}},{"type":"Label","props":{"x":0,"width":720,"valign":"middle","text":"我的余额(元)","height":40,"fontSize":24,"color":"#E1D7B9","bottom":10,"bold":true,"align":"center"}},{"type":"Image","props":{"x":0,"width":720,"top":40,"skin":"dialog/k7.png","cacheAs":"bitmap"}},{"type":"Image","props":{"x":560,"var":"allBtn","skin":"charge/btn2.png","bottom":20},"child":[{"type":"Label","props":{"y":12,"x":10,"width":103,"valign":"middle","text":"全部","height":30,"fontSize":20,"color":"#3a342f","bold":true,"align":"center"}}]}]},{"type":"Image","props":{"x":0,"width":720,"top":200,"skin":"charge/shense_bg.jpg","height":80},"child":[{"type":"Image","props":{"x":59,"width":400,"skin":"dialog/k5.png","height":70,"bottom":0},"child":[{"type":"TextInput","props":{"y":0,"x":65,"width":400,"var":"moneyInput","valign":"middle","type":"number","restrict":"0123456789.","promptColor":"#4a4139","prompt":"请输入提现金额","overflow":"hidden","maxChars":11,"height":70,"fontSize":30,"color":"#ab9069","centerY":0,"centerX":0,"align":"center"}}]},{"type":"Image","props":{"x":490,"var":"submit","skin":"btn/ok2.png","cacheAs":"bitmap","bottom":3},"child":[{"type":"Label","props":{"y":10,"x":13,"width":143,"valign":"middle","text":"立即提现","height":47,"fontSize":20,"color":"#FBD593","align":"center"}}]}]},{"type":"Box","props":{"x":0,"width":720,"var":"userBox","top":280,"height":270},"child":[{"type":"Image","props":{"x":0,"width":720,"skin":"charge/baidi.png","name":"item0","height":60},"child":[{"type":"Image","props":{"x":0,"width":700,"skin":"charge/fenge_line.png","bottom":0}},{"type":"Image","props":{"y":20,"skin":"dialog/tt.png","left":180}},{"type":"Image","props":{"y":20,"skin":"dialog/tt.png","scaleX":-1,"right":260}},{"type":"Label","props":{"y":14,"x":296,"valign":"middle","text":"提现方式","fontSize":32,"color":"#998564","align":"center"}}]},{"type":"Image","props":{"y":60,"width":720,"skin":"charge/baidi.png","name":"item1","height":90},"child":[{"type":"Image","props":{"x":0,"width":700,"skin":"charge/fenge_line.png","bottom":0}},{"type":"Image","props":{"y":30,"x":44,"skin":"charge/q1.png","scaleY":0.6,"scaleX":0.6}},{"type":"Image","props":{"y":30,"x":81,"skin":"charge/q2.png","scaleY":0.6,"scaleX":0.6}},{"type":"Label","props":{"y":10,"x":144,"valign":"middle","text":"提现至收款码：","fontSize":32,"color":"#998564","align":"center"}},{"type":"Label","props":{"y":57,"x":146,"valign":"middle","text":"请选择微信或支付宝收款码","fontSize":22,"color":"#998564","align":"left"}},{"type":"Label","props":{"y":19,"x":358,"var":"tips1","valign":"middle","text":"单笔提现低于10元；今日剩余10次","fontSize":22,"color":"#998564","align":"left"}}]},{"type":"Image","props":{"y":150,"width":720,"skin":"charge/baidi.png","name":"item2"},"child":[{"type":"Image","props":{"x":0,"width":700,"skin":"charge/fenge_line.png","bottom":0}},{"type":"Image","props":{"y":22,"x":40,"skin":"charge/q3.png"}},{"type":"Label","props":{"y":8,"x":144,"valign":"middle","text":"提现至银行卡：","fontSize":32,"color":"#998564","align":"center"}},{"type":"Label","props":{"y":57,"x":146,"valign":"middle","text":"请点击选择或者添加银行卡信息","fontSize":22,"color":"#998564","align":"left"}},{"type":"Label","props":{"y":19,"x":358,"var":"tips2","valign":"middle","text":"提现大于或等于1000元，不限次数。","fontSize":22,"color":"#998564","align":"left"}}]},{"type":"Image","props":{"y":115,"x":700,"visible":false,"var":"arrow","skin":"dialog/right.png","rotation":90}}]},{"type":"Image","props":{"top":536,"skin":"dialog/tt.png","left":180}},{"type":"Image","props":{"top":536,"skin":"dialog/tt.png","scaleX":-1,"right":260}},{"type":"Label","props":{"valign":"middle","top":530,"text":"详细信息","fontSize":32,"color":"#998564","centerX":0,"align":"center"}},{"type":"Box","props":{"width":720,"var":"infoBox","top":570,"bottom":80},"child":[{"type":"Image","props":{"visible":false,"skin":"charge/k2.png","name":"item0","centerX":0},"child":[{"type":"Image","props":{"width":342,"top":18,"name":"icon","left":30,"height":342}}]},{"type":"Image","props":{"width":550,"visible":false,"top":20,"skin":"bank/baidi.png","name":"item1","centerX":0},"child":[{"type":"Image","props":{"y":0,"x":154,"skin":"bank/1.jpg","name":"icon","centerX":0}},{"type":"Label","props":{"y":83,"width":550,"valign":"middle","text":"银行卡卡号：111111111111111111","name":"lab1","height":51,"fontSize":30,"color":"#998564","centerX":0,"align":"center"}}]}]}]},{"type":"Image","props":{"x":0,"width":720,"staticCache":true,"skin":"dialog/line1.png","cacheAs":"bitmap","bottom":60},"child":[{"type":"Label","props":{"y":50,"x":0,"width":720,"valign":"middle","text":"提现统一收取1%的手续费","height":40,"fontSize":24,"color":"#DBD7B9","align":"center"}}]}]};
		return CashOutUI;
	})(Dialog);
var ChargeCodeUI=(function(_super){
		function ChargeCodeUI(){
			
		    this.bg=null;
		    this.di=null;
		    this.closeBtn=null;
		    this.backBtn=null;
		    this.title=null;
		    this.timeLab=null;
		    this.desLab=null;

			ChargeCodeUI.__super.call(this);
		}

		CLASS$(ChargeCodeUI,'ui.dialog.ChargeCodeUI',_super);
		var __proto__=ChargeCodeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ChargeCodeUI.uiView);

		}

		ChargeCodeUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"width":720,"var":"bg","top":0,"skin":"dialog/ss.png","left":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":500,"var":"di","top":360,"skin":"charge/k2.png","height":500,"centerX":0}}]},{"type":"Image","props":{"y":0,"x":0,"width":720,"top":0,"skin":"dialog/tbg.png","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"var":"closeBtn","top":0,"skin":"btn/back.png","left":0}},{"type":"Image","props":{"var":"backBtn","top":0,"skin":"btn/cancel.png","right":0}},{"type":"Label","props":{"x":253,"width":213,"var":"title","valign":"middle","top":6,"text":"充值二维码","height":72,"fontSize":33,"color":"#F4CF8D","align":"center"}}]},{"type":"Box","props":{"y":100,"x":0,"width":720,"top":100,"bottom":100},"child":[{"type":"Label","props":{"x":398,"wordWrap":true,"width":345,"var":"timeLab","valign":"middle","top":100,"text":"00:00","strokeColor":"#ffffff","leading":14,"height":76,"fontSize":40,"color":"#ff0000","bold":true,"align":"left"}},{"type":"Label","props":{"x":58,"wordWrap":true,"width":345,"valign":"middle","top":100,"text":"有效时间: ","strokeColor":"#ffffff","leading":14,"height":76,"fontSize":40,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Label","props":{"x":0,"wordWrap":true,"width":720,"var":"desLab","valign":"middle","top":170,"text":"长按或截屏识别二维码，使用微信扫码。","strokeColor":"#ffffff","leading":14,"height":76,"fontSize":30,"color":"#00ff00","bold":true,"align":"center"}}]}]};
		return ChargeCodeUI;
	})(Dialog);
var CodeSelectUI=(function(_super){
		function CodeSelectUI(){
			
		    this.bg=null;
		    this.closeBtn=null;
		    this.di=null;
		    this.addBtn=null;
		    this.tipsLab=null;
		    this.okBtn=null;
		    this.tips=null;

			CodeSelectUI.__super.call(this);
		}

		CLASS$(CodeSelectUI,'ui.dialog.CodeSelectUI',_super);
		var __proto__=CodeSelectUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CodeSelectUI.uiView);

		}

		CodeSelectUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"bg","skin":"common/black.png","height":1280,"alpha":0.85}},{"type":"Image","props":{"width":680,"top":200,"skin":"dialog/k1.png","height":717,"centerX":0,"cacheAs":"bitmap","sizeGrid":"24,20,22,22"},"child":[{"type":"Image","props":{"y":-26,"x":611,"var":"closeBtn","skin":"dialog/close.png"}},{"type":"Image","props":{"x":10,"width":660,"top":20,"skin":"dialog/line1.png"},"child":[{"type":"Image","props":{"y":0,"x":510,"width":82,"skin":"dialog/tt.png","scaleX":-1,"height":20}},{"type":"Image","props":{"y":0,"x":150,"skin":"dialog/tt.png"}},{"type":"Label","props":{"y":-3,"valign":"middle","text":"选择您的收款码","fontSize":24,"color":"#998564","centerX":0,"align":"center"}}]},{"type":"Image","props":{"y":595,"x":10,"width":660,"skin":"dialog/line1.png"}},{"type":"Image","props":{"y":80,"width":540,"var":"di","skin":"charge/k2.png","height":540,"centerX":0},"child":[{"type":"Label","props":{"y":230,"x":110,"valign":"middle","text":"上传收款码可提现","height":80,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":23,"x":39,"width":464,"visible":false,"name":"icon","height":493}}]},{"type":"Image","props":{"y":646,"var":"addBtn","skin":"btn/k3.png","left":100},"child":[{"type":"Label","props":{"y":13,"x":32,"var":"tipsLab","valign":"middle","text":"添加收款码","strokeColor":"#3e2e16","stroke":1,"fontSize":28,"color":"#3e2e16","align":"center"}}]},{"type":"Image","props":{"y":647,"var":"okBtn","skin":"btn/k4.png","right":100},"child":[{"type":"Label","props":{"y":13,"x":74,"valign":"middle","text":"确认","fontSize":28,"color":"#ffffff","align":"center"}}]}]},{"type":"Label","props":{"width":720,"var":"tips","valign":"middle","top":930,"leading":6,"height":100,"fontSize":24,"color":"#ff0000","bold":true,"align":"center"}}]};
		return CodeSelectUI;
	})(Dialog);
var CostInfoDlgUI=(function(_super){
		function CostInfoDlgUI(){
			
		    this.bg=null;
		    this.closeBtn=null;
		    this.backBtn=null;
		    this.select=null;
		    this.moneyLab=null;
		    this.select2=null;
		    this.hisList=null;
		    this.btmBox=null;
		    this.preBtn=null;
		    this.nextBtn=null;
		    this.pageNum=null;
		    this.pageLen=null;
		    this.tip=null;

			CostInfoDlgUI.__super.call(this);
		}

		CLASS$(CostInfoDlgUI,'ui.dialog.CostInfoDlgUI',_super);
		var __proto__=CostInfoDlgUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CostInfoDlgUI.uiView);

		}

		CostInfoDlgUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"var":"bg","top":0,"skin":"dialog/ss.png","right":0,"left":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"top":0,"skin":"dialog/tbg.png"},"child":[{"type":"Image","props":{"var":"closeBtn","top":0,"skin":"btn/back.png","left":0}},{"type":"Image","props":{"var":"backBtn","top":0,"skin":"btn/cancel.png","right":0}},{"type":"Label","props":{"x":253,"width":213,"valign":"middle","top":6,"text":"账目明细","height":72,"fontSize":33,"color":"#F4CF8D","align":"center"}}]},{"type":"Box","props":{"y":80,"width":720,"top":80,"height":200,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"x":0,"width":720,"skin":"page/jk.png","cacheAs":"bitmap","bottom":0},"child":[{"type":"Box","props":{"y":60,"x":40,"width":640,"var":"select","height":62},"child":[{"type":"Image","props":{"y":3,"skin":"page/di2.png","name":"item0","left":100},"child":[{"type":"Label","props":{"y":0,"x":15,"width":75,"valign":"middle","text":"充值","name":"typelab","height":56,"fontSize":21,"color":"#c0a574","align":"center"}}]},{"type":"Image","props":{"y":3,"skin":"page/di1.png","name":"item1","centerX":0},"child":[{"type":"Label","props":{"y":0,"x":15,"width":75,"valign":"middle","text":"提现","name":"typelab","height":56,"fontSize":21,"color":"#26251f","align":"center"}}]},{"type":"Image","props":{"y":3,"skin":"page/di1.png","right":100,"name":"item2"},"child":[{"type":"Label","props":{"y":0,"x":15,"width":75,"valign":"middle","text":"购买","name":"typelab","height":56,"fontSize":21,"color":"#26251f","align":"center"}}]}]}]},{"type":"Label","props":{"y":12,"x":0,"width":720,"var":"moneyLab","valign":"middle","text":"0.00","height":76,"fontSize":76,"color":"#DEAA5D","bold":true,"align":"center"}},{"type":"Label","props":{"y":76,"x":0,"width":720,"valign":"middle","text":"我的余额","height":76,"fontSize":24,"color":"#E1D7B9","bold":true,"align":"center"}}]},{"type":"Panel","props":{"x":0,"width":720,"var":"select2","top":280,"cacheAsBitmap":true,"cacheAs":"bitmap","bottom":80},"child":[{"type":"List","props":{"x":0,"width":720,"var":"hisList","vScrollBarSkin":"common/vscroll.png","top":0,"repeatX":1,"cacheAsBitmap":true,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":720,"name":"render","height":42},"child":[{"type":"Image","props":{"width":720,"skin":"dialog/line1.png","height":42}},{"type":"Label","props":{"y":0,"x":50,"width":166,"valign":"middle","text":"第100000期","name":"day","height":42,"fontSize":24,"color":"#f4cf8d","align":"center"}},{"type":"Label","props":{"y":0,"x":265,"width":166,"valign":"middle","text":"2017-03-21","name":"date","height":42,"fontSize":20,"color":"#dbd7b9","align":"center"}},{"type":"Label","props":{"y":0,"x":416,"width":311,"valign":"middle","text":"5 - 8 - 4 - 2 - 7","name":"num0","height":42,"fontSize":24,"color":"#f4cf8d","align":"center"}}]}]}]},{"type":"Box","props":{"y":1200,"width":720,"var":"btmBox","height":80,"cacheAsBitmap":true,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"skin":"dialog/qs.png","height":80}},{"type":"Image","props":{"y":40,"x":543,"var":"preBtn","skin":"page/right.png","scaleX":-1,"pivotY":28,"pivotX":28,"gray":true}},{"type":"Image","props":{"y":40,"x":678,"var":"nextBtn","skin":"page/right.png","pivotY":28,"pivotX":28}},{"type":"Label","props":{"y":8,"x":571,"width":80,"var":"pageNum","valign":"middle","text":"0","height":64,"fontSize":30,"color":"#f4cf8d","align":"center"}},{"type":"Label","props":{"y":14,"x":25,"width":280,"var":"pageLen","valign":"middle","text":"共 1 页","height":52,"fontSize":30,"color":"#f4cf8d","align":"left"}}]},{"type":"Box","props":{"width":400,"visible":false,"var":"tip","height":200,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"top":0,"skin":"page/zanwu.png","centerX":0}},{"type":"Label","props":{"y":101,"width":320,"valign":"middle","text":"暂无历史记录!","height":71,"fontSize":30,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}}]}]}]};
		return CostInfoDlgUI;
	})(Dialog);
var KefuDlgUI=(function(_super){
		function KefuDlgUI(){
			
		    this.bg=null;
		    this.closeBtn=null;
		    this.backBtn=null;
		    this.di=null;
		    this.desLab=null;

			KefuDlgUI.__super.call(this);
		}

		CLASS$(KefuDlgUI,'ui.dialog.KefuDlgUI',_super);
		var __proto__=KefuDlgUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(KefuDlgUI.uiView);

		}

		KefuDlgUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"var":"bg","top":0,"skin":"dialog/ss.png","right":0,"left":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"top":0,"skin":"dialog/tbg.png"},"child":[{"type":"Image","props":{"var":"closeBtn","top":0,"skin":"btn/back.png","left":0}},{"type":"Image","props":{"var":"backBtn","top":0,"skin":"btn/cancel.png","right":0}},{"type":"Label","props":{"x":253,"width":213,"valign":"middle","top":6,"text":"客服","height":72,"fontSize":33,"color":"#F4CF8D","align":"center"}}]},{"type":"Box","props":{"x":0,"width":720,"top":100,"bottom":100},"child":[{"type":"Image","props":{"width":640,"var":"di","top":80,"skin":"charge/k2.png","height":640,"centerX":0}},{"type":"Label","props":{"x":0,"wordWrap":true,"width":720,"var":"desLab","valign":"middle","top":720,"text":"请截屏保存二维码后联系客服！","strokeColor":"#ffffff","leading":14,"height":76,"fontSize":26,"color":"#d9cccc","bold":true,"align":"center"}}]}]}]};
		return KefuDlgUI;
	})(Dialog);
var LoginDlgUI=(function(_super){
		function LoginDlgUI(){
			
		    this.bg=null;
		    this.kuang=null;
		    this.codeBtn=null;
		    this.timeDes=null;
		    this.mobile=null;
		    this.code=null;
		    this.login=null;
		    this.closeBtn=null;

			LoginDlgUI.__super.call(this);
		}

		CLASS$(LoginDlgUI,'ui.dialog.LoginDlgUI',_super);
		var __proto__=LoginDlgUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoginDlgUI.uiView);

		}

		LoginDlgUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"bg","skin":"common/black.png","height":1280}},{"type":"Box","props":{"width":720,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"x":30,"width":660,"var":"kuang","top":0,"skin":"dialog/kk.png","height":500,"cacheAs":"bitmap","sizeGrid":"81,21,30,21"},"child":[{"type":"Label","props":{"y":103,"width":400,"valign":"middle","text":"请记住手动输入的密码","strokeColor":"#ff0000","stroke":1,"height":60,"fontSize":40,"color":"#ff0000","centerX":8,"bold":true,"align":"center"}},{"type":"Label","props":{"y":4,"x":287,"valign":"middle","text":"用户登录","height":40,"fontSize":24,"color":"#3a342f","bold":true,"align":"center"}},{"type":"Image","props":{"x":2,"width":656,"top":66,"skin":"dialog/kk2.png","bottom":128,"sizeGrid":"37,41,4,41"}},{"type":"Image","props":{"y":176,"x":26,"width":602,"skin":"dialog/k5.png","height":70},"child":[{"type":"Label","props":{"y":20,"x":20,"text":"手机号","fontSize":24,"color":"#ab9069"}}]},{"type":"Image","props":{"y":277,"x":438,"visible":false,"var":"codeBtn","skin":"dialog/kk3.png"},"child":[{"type":"Label","props":{"y":18,"x":37,"width":122,"var":"timeDes","valign":"middle","text":"获取验证码","height":40,"fontSize":24,"color":"#3a342f","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":278,"x":32,"width":392,"skin":"dialog/k5.png","height":70},"child":[{"type":"Label","props":{"y":20,"x":20,"text":"密码","fontSize":24,"color":"#ab9069"}}]},{"type":"TextInput","props":{"y":175,"width":471,"var":"mobile","type":"number","restrict":"0123456789+","promptColor":"#4a4139","prompt":"请输入手机号","maxChars":20,"left":157,"italic":true,"height":70,"fontSize":24,"color":"#ab9069"}},{"type":"TextInput","props":{"y":278,"width":266,"var":"code","type":"text","promptColor":"#4a4139","prompt":"请输入密码","left":157,"italic":true,"height":70,"fontSize":24,"color":"#ab9069"}},{"type":"Image","props":{"y":403,"var":"login","skin":"btn/k4.png","centerX":0},"child":[{"type":"Label","props":{"y":12,"x":40,"text":"立即登录","fontSize":30,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":7,"x":573,"var":"closeBtn","skin":"dialog/close.png"}}]}]}]};
		return LoginDlgUI;
	})(Dialog);
var MobileBindUI=(function(_super){
		function MobileBindUI(){
			
		    this.bg=null;
		    this.closeBtn=null;
		    this.backBtn=null;
		    this.title=null;
		    this.input1=null;
		    this.input2=null;
		    this.nextBtn=null;
		    this.nextLab=null;

			MobileBindUI.__super.call(this);
		}

		CLASS$(MobileBindUI,'ui.dialog.MobileBindUI',_super);
		var __proto__=MobileBindUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MobileBindUI.uiView);

		}

		MobileBindUI.uiView={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"var":"bg","top":0,"skin":"dialog/ss.png","right":0,"left":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"width":720,"top":0,"skin":"dialog/tbg.png"},"child":[{"type":"Image","props":{"var":"closeBtn","top":0,"skin":"btn/back.png","left":0}},{"type":"Image","props":{"var":"backBtn","top":0,"skin":"btn/close.png","right":0}},{"type":"Label","props":{"x":253,"width":213,"var":"title","valign":"middle","top":6,"text":"账号绑定","height":72,"fontSize":33,"color":"#F4CF8D","align":"center"}}]},{"type":"Image","props":{"y":200,"x":0,"width":720,"top":120,"skin":"dialog/k7.png","cacheAs":"bitmap"}},{"type":"Box","props":{"width":720,"top":200,"height":400},"child":[{"type":"Label","props":{"y":-145,"x":42,"width":147,"valign":"middle","top":55,"text":"手机号码","height":40,"fontSize":30,"color":"#AB9069","align":"right"}},{"type":"Image","props":{"y":-160,"x":201,"width":408,"top":40,"skin":"dialog/k5.png","height":70},"child":[{"type":"TextInput","props":{"y":0,"var":"input1","valign":"middle","type":"number","right":0,"restrict":"0123456789.","promptColor":"#4a4139","prompt":"请输入手机号","overflow":"hidden","maxChars":11,"left":50,"height":70,"fontSize":30,"color":"#ab9069","align":"left"}}]},{"type":"Image","props":{"x":0,"width":720,"top":100,"skin":"dialog/line1.png"}},{"type":"Label","props":{"x":42,"width":147,"valign":"middle","top":195,"text":"登录密码","height":40,"fontSize":30,"color":"#AB9069","align":"right"}},{"type":"Image","props":{"x":201,"width":285,"top":180,"skin":"dialog/k5.png","height":70},"child":[{"type":"TextInput","props":{"y":0,"var":"input2","valign":"middle","type":"text","right":0,"promptColor":"#4a4139","prompt":"输入密码","overflow":"hidden","left":50,"height":70,"fontSize":30,"color":"#ab9069","align":"left"}}]},{"type":"Image","props":{"x":10,"width":720,"top":240,"skin":"dialog/line1.png"}},{"type":"Label","props":{"width":400,"valign":"middle","top":305,"text":"请记住手动输入的密码","height":40,"fontSize":30,"color":"#AB9069","centerX":0,"align":"center"}}]},{"type":"Image","props":{"x":258,"var":"nextBtn","skin":"btn/k4.png","bottom":100},"child":[{"type":"Label","props":{"y":-9,"x":24,"width":155,"var":"nextLab","valign":"middle","text":"下一步","strokeColor":"#564f4f","stroke":1,"height":72,"fontSize":32,"color":"#ffffff","align":"center"}}]}]}]};
		return MobileBindUI;
	})(Dialog);
var AgentUI=(function(_super){
		function AgentUI(){
			
		    this.smBtn=null;
		    this.codeBtn=null;

			AgentUI.__super.call(this);
		}

		CLASS$(AgentUI,'ui.view.AgentUI',_super);
		var __proto__=AgentUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AgentUI.uiView);

		}

		AgentUI.uiView={"type":"View","props":{"width":720,"height":1054},"child":[{"type":"Box","props":{"width":720,"top":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"y":249,"x":178,"var":"smBtn","skin":"btn/ok7.png","centerX":0},"child":[{"type":"Label","props":{"y":14,"x":65,"width":235,"valign":"middle","text":"佣金说明","height":72,"fontSize":30,"color":"#ffe5a4","align":"center"}}]},{"type":"Image","props":{"y":698,"x":178,"var":"codeBtn","skin":"btn/ok7.png","centerX":0},"child":[{"type":"Label","props":{"y":14,"x":65,"width":235,"valign":"middle","text":"生成二维码","height":72,"fontSize":30,"color":"#ffe5a4","align":"center"}}]},{"type":"Label","props":{"wordWrap":true,"width":500,"valign":"middle","text":"生成二维码后长按图片保存到手机并分享给好友获取佣金","leading":15,"fontSize":32,"color":"#e3e2e1","centerY":0,"centerX":0,"align":"center"}}]}]};
		return AgentUI;
	})(View);
var ChargeUI=(function(_super){
		function ChargeUI(){
			
		    this.select1=null;
		    this.moveBox=null;
		    this.select2=null;
		    this.submit=null;

			ChargeUI.__super.call(this);
		}

		CLASS$(ChargeUI,'ui.view.ChargeUI',_super);
		var __proto__=ChargeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ChargeUI.uiView);

		}

		ChargeUI.uiView={"type":"View","props":{"width":720,"height":1000},"child":[{"type":"Box","props":{"x":0,"width":720,"var":"select1","top":0,"height":150,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"top":20,"skin":"charge/di.png","name":"item0","left":30},"child":[{"type":"Image","props":{"y":31,"x":31,"skin":"charge/q1.png"}},{"type":"Label","props":{"y":80,"x":17,"width":85,"valign":"middle","text":"微信充值","height":26,"fontSize":14,"color":"#FBD593","align":"center"}}]},{"type":"Image","props":{"visible":false,"top":20,"skin":"charge/di.png","name":"item1","left":190},"child":[{"type":"Image","props":{"y":31,"x":38,"skin":"charge/q2.png"}},{"type":"Label","props":{"y":80,"x":17,"width":85,"valign":"middle","text":"支付宝充值","height":26,"fontSize":14,"color":"#FBD593","align":"center"}}]},{"type":"Box","props":{"width":136,"var":"moveBox","top":58,"left":22,"height":86},"child":[{"type":"Image","props":{"skin":"charge/L.png","left":0}},{"type":"Image","props":{"y":0,"skin":"charge/R.png","right":0}}]}]},{"type":"Image","props":{"x":0,"width":720,"var":"select2","top":130,"skin":"dialog/kk2.png","cacheAs":"bitmap","bottom":90,"sizeGrid":"37,41,4,41"},"child":[{"type":"Image","props":{"top":40,"skin":"charge/m1.png","name":"item0","left":20},"child":[{"type":"Image","props":{"y":40,"x":66,"skin":"charge/icon1.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":40,"skin":"charge/m1.png","name":"item1","centerX":0},"child":[{"type":"Image","props":{"y":29,"x":46,"skin":"charge/icon2.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":40,"skin":"charge/m1.png","right":20,"name":"item2"},"child":[{"type":"Image","props":{"y":29,"x":46,"skin":"charge/icon2.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":220,"skin":"charge/m1.png","name":"item3","left":20},"child":[{"type":"Image","props":{"y":29,"x":55,"skin":"charge/icon3.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":220,"skin":"charge/m1.png","name":"item4","centerX":0},"child":[{"type":"Image","props":{"y":29,"x":55,"skin":"charge/icon3.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":220,"skin":"charge/m1.png","right":20,"name":"item5"},"child":[{"type":"Image","props":{"y":29,"x":45,"skin":"charge/icon4.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":400,"skin":"charge/m1.png","name":"item6","left":20},"child":[{"type":"Image","props":{"y":29,"x":45,"skin":"charge/icon4.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":400,"skin":"charge/m1.png","name":"item7","centerX":0},"child":[{"type":"Image","props":{"y":19,"x":45,"skin":"charge/icon5.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]},{"type":"Image","props":{"top":400,"skin":"charge/m1.png","right":20,"name":"item8"},"child":[{"type":"Image","props":{"y":9,"x":50,"skin":"charge/icon6.png"}},{"type":"Label","props":{"y":120,"x":39,"width":132,"valign":"middle","text":"10","name":"txt","height":38,"fontSize":25,"color":"#DBD7B9","align":"center"}}]}]},{"type":"Image","props":{"x":0,"width":720,"skin":"charge/sure.png","bottom":0},"child":[{"type":"Image","props":{"width":360,"var":"submit","height":100,"centerX":0,"bottom":0}}]}]};
		return ChargeUI;
	})(View);
var DrawUI=(function(_super){
		function DrawUI(){
			
		    this.record=null;
		    this.labBox=null;
		    this.gameBox=null;

			DrawUI.__super.call(this);
		}

		CLASS$(DrawUI,'ui.view.DrawUI',_super);
		var __proto__=DrawUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DrawUI.uiView);

		}

		DrawUI.uiView={"type":"View","props":{"width":720,"height":1054},"child":[{"type":"Box","props":{"width":720,"top":0,"centerX":0,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"y":118,"x":6,"width":700,"skin":"draw/di1.png","height":800,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":500,"skin":"draw/conent.png","height":640,"centerY":11,"centerX":-2}}]},{"type":"Label","props":{"y":162,"width":200,"valign":"middle","text":"提现记录","height":40,"fontSize":30,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Image","props":{"y":257,"width":220,"var":"record","skin":"btn/ok5.png","height":78,"centerX":0},"child":[{"type":"Label","props":{"width":119,"valign":"middle","text":"兑换记录","height":48,"fontSize":24,"color":"#c06741","centerY":0,"centerX":0,"bold":true,"align":"center"}}]},{"type":"Box","props":{"y":366,"width":400,"var":"labBox","height":140,"centerX":0},"child":[{"type":"Label","props":{"y":0,"x":0,"width":350,"valign":"middle","text":"一级用户：100人","name":"item0","height":40,"fontSize":24,"color":"#c06741","align":"center"}},{"type":"Label","props":{"y":50,"width":350,"valign":"middle","text":"二级用户：100人","name":"item1","height":40,"fontSize":24,"color":"#c06741","align":"center"}},{"type":"Label","props":{"y":100,"width":350,"valign":"middle","text":"三级用户：100人","name":"item2","height":40,"fontSize":24,"color":"#c06741","align":"center"}}]},{"type":"Label","props":{"y":580,"x":260,"width":200,"valign":"middle","text":"更多游戏","height":40,"fontSize":24,"color":"#c06741","centerX":0,"bold":true,"align":"center"}},{"type":"Box","props":{"y":641,"width":440,"var":"gameBox","height":200,"centerX":0},"child":[{"type":"Box","props":{"y":0,"width":440,"name":"box0","height":100},"child":[{"type":"Label","props":{"width":200,"valign":"middle","text":"重庆时时彩","name":"lab","height":40,"fontSize":20,"color":"#c06741","centerY":0,"bold":true,"align":"center"}},{"type":"Image","props":{"x":260,"width":161,"skin":"btn/ok6.png","name":"ok","height":57,"centerY":0},"child":[{"type":"Label","props":{"width":100,"valign":"middle","text":"马上玩","height":40,"fontSize":20,"color":"#c06741","centerY":0,"centerX":0,"bold":true,"align":"center"}}]}]},{"type":"Box","props":{"y":100,"width":440,"name":"box1","height":100},"child":[{"type":"Label","props":{"width":200,"valign":"middle","text":"埃及分分彩","name":"lab","height":40,"fontSize":20,"color":"#c06741","centerY":0,"bold":true,"align":"center"}},{"type":"Image","props":{"x":260,"width":161,"skin":"btn/ok6.png","name":"ok","height":57,"centerY":0},"child":[{"type":"Label","props":{"width":100,"valign":"middle","text":"马上玩","height":40,"fontSize":20,"color":"#c06741","centerY":0,"centerX":0,"bold":true,"align":"center"}}]}]}]}]}]};
		return DrawUI;
	})(View);
var HallUI=(function(_super){
		function HallUI(){
			
		    this.clickBox=null;
		    this.viewBox=null;
		    this.smallPanel=null;
		    this.middlePanel=null;
		    this.largePanel=null;
		    this.itemBox=null;

			HallUI.__super.call(this);
		}

		CLASS$(HallUI,'ui.view.HallUI',_super);
		var __proto__=HallUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HallUI.uiView);

		}

		HallUI.uiView={"type":"View","props":{"width":720,"height":1110},"child":[{"type":"Box","props":{"width":720,"var":"clickBox","top":20,"height":100,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"skin":"btn/ok4.png","name":"item0","left":40,"centerY":0},"child":[{"type":"Label","props":{"y":19,"x":54,"width":92,"valign":"middle","text":"小盘","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"skin":"btn/ok3.png","name":"item1","centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":20,"x":54,"width":92,"valign":"middle","text":"中盘","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"skin":"btn/ok3.png","right":40,"name":"item2","centerY":0},"child":[{"type":"Label","props":{"y":20,"x":54,"width":92,"valign":"middle","text":"大盘","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]}]},{"type":"HBox","props":{"x":0,"width":2160,"var":"viewBox","top":140,"bottom":300},"child":[{"type":"Panel","props":{"x":0,"width":720,"var":"smallPanel","top":0,"name":"item0","bottom":0},"child":[{"type":"Image","props":{"y":335,"x":360,"width":630,"skin":"panel/di.png","name":"di","height":630,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":315,"x":315,"width":536,"skin":"panel/p1.png","name":"item","height":537,"centerY":0,"centerX":0,"cacheAs":"bitmap","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":269,"x":109,"width":150,"skin":"panel/di3.png","rotation":-90,"name":"item1","centerY":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":74,"width":81,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":88,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":269,"x":431,"width":150,"skin":"panel/di3.png","rotation":90,"name":"item0","centerY":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":75,"width":81,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":88,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]}]},{"type":"Image","props":{"y":335,"x":581,"skin":"panel/di.png","scaleY":0.3,"scaleX":0.3,"rotation":0,"pivotY":315,"pivotX":315,"name":"arrow","centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":-44,"x":71,"skin":"panel/arrow.png","scaleY":2.5,"scaleX":2.5,"rotation":0}}]}]},{"type":"Panel","props":{"x":720,"width":720,"var":"middlePanel","top":0,"name":"item1","bottom":0},"child":[{"type":"Image","props":{"y":335,"x":360,"width":630,"skin":"panel/di.png","name":"di","height":630,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":315,"x":315,"width":541,"skin":"panel/p2.png","name":"item","centerY":0,"centerX":0,"cacheAs":"bitmap","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":150,"x":388,"width":150,"skin":"panel/di3.png","rotation":45,"name":"item0","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":74,"width":81,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":88,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":390,"x":386,"width":150,"skin":"panel/di3.png","rotation":135,"name":"item1","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":75,"width":81,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":88,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":390,"x":152,"width":150,"skin":"panel/di3.png","rotation":-135,"name":"item2","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":74,"width":81,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":88,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":150,"x":158,"width":150,"skin":"panel/di3.png","rotation":-45,"name":"item3","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":75,"width":81,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":88,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]}]},{"type":"Image","props":{"y":335,"skin":"panel/di.png","scaleY":0.3,"scaleX":0.3,"name":"arrow","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-40,"skin":"panel/arrow.png","scaleY":2.5,"scaleX":2.5,"rotation":0,"centerX":0}}]}]},{"type":"Panel","props":{"x":1440,"width":720,"var":"largePanel","top":0,"name":"item2","bottom":0},"child":[{"type":"Image","props":{"y":335,"x":360,"width":630,"skin":"panel/di.png","name":"di","height":630,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":47,"x":47,"width":537,"skin":"panel/p3.png","name":"item","height":538,"centerY":0,"centerX":0,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":55,"x":328,"width":100,"skin":"panel/di1.png","rotation":15,"name":"item0","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":105,"x":429,"width":100,"skin":"panel/di1.png","rotation":45,"name":"item1","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":213,"x":482,"width":100,"skin":"panel/di1.png","rotation":75,"name":"item2","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":329,"x":478,"width":100,"skin":"panel/di1.png","rotation":105,"name":"item3","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":425,"x":419,"width":100,"skin":"panel/di1.png","rotation":135,"name":"item4","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":482,"x":323,"width":100,"skin":"panel/di1.png","rotation":165,"name":"item5","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":483,"x":206,"width":100,"skin":"panel/di1.png","rotation":-165,"name":"item6","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":431,"x":101,"width":100,"skin":"panel/di1.png","rotation":-135,"name":"item7","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":325,"x":43,"width":100,"skin":"panel/di1.png","rotation":-105,"name":"item8","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":206,"x":44,"width":100,"skin":"panel/di1.png","rotation":-75,"name":"item9","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":104,"x":106,"width":100,"skin":"panel/di1.png","rotation":-45,"name":"item10","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":50,"x":211,"width":100,"skin":"panel/di1.png","rotation":-15,"name":"item11","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":80,"valign":"middle","text":"10\\n金币","name":"lab","leading":5,"height":80,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]}]},{"type":"Image","props":{"width":195,"skin":"panel/arrow.png","pivotY":141.5,"pivotX":97.5,"name":"arrow","height":239,"centerY":-22,"centerX":2}}]}]},{"type":"Box","props":{"width":720,"var":"itemBox","height":280,"bottom":0},"child":[{"type":"Image","props":{"y":110,"skin":"btn/ok2.png","name":"item0","left":15,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":38,"width":92,"valign":"middle","text":"2","name":"lab","height":40,"fontSize":32,"color":"#26251F","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":110,"x":190,"skin":"btn/ok1.png","name":"item1","cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":38,"width":92,"valign":"middle","text":"5","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":110,"x":365,"skin":"btn/ok1.png","name":"item2","cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":38,"width":92,"valign":"middle","text":"10","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":110,"skin":"btn/ok1.png","right":15,"name":"item3","cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":38,"width":92,"valign":"middle","text":"30","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":190,"skin":"btn/ok1.png","name":"item4","left":15,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":38,"width":92,"valign":"middle","text":"100","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":190,"x":190,"skin":"btn/ok1.png","name":"item5","cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":38,"width":92,"valign":"middle","text":"200","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":190,"x":365,"skin":"btn/ok1.png","name":"item6","cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":38,"width":92,"valign":"middle","text":"1000","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":190,"skin":"btn/ok1.png","right":15,"name":"item7","cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":14,"x":29,"width":109,"valign":"middle","text":"2000","name":"lab","height":40,"fontSize":32,"color":"#F5ECC7","bold":true,"align":"center"}}]}]}]};
		return HallUI;
	})(View);
var LoadingUI=(function(_super){
		function LoadingUI(){
			
		    this.bg=null;
		    this.box=null;
		    this.pNum=null;
		    this.des=null;
		    this.lab=null;

			LoadingUI.__super.call(this);
		}

		CLASS$(LoadingUI,'ui.view.LoadingUI',_super);
		var __proto__=LoadingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoadingUI.uiView);

		}

		LoadingUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"width":720,"var":"bg","top":0,"skin":"loading/black.png","bottom":0}},{"type":"Box","props":{"width":670,"var":"box","height":300,"centerY":0,"centerX":0,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"top":125,"skin":"loading/di1.png","centerX":0,"anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"x":0,"width":670,"var":"pNum","top":151,"skin":"loading/di2.png","height":20,"anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"x":285,"width":100,"valign":"middle","top":109,"text":"加载中","height":40,"fontSize":30,"color":"#b2ad4e","bold":true,"align":"center"}},{"type":"Label","props":{"x":85,"width":500,"var":"des","valign":"middle","top":200,"text":"正在加载游戏资源","height":40,"fontSize":22,"color":"#dedcb3","bold":true,"align":"center"}},{"type":"Label","props":{"x":285,"width":100,"var":"lab","valign":"middle","top":170,"text":"100%","height":40,"fontSize":22,"color":"#dedcb3","bold":true,"align":"center"}}]}]};
		return LoadingUI;
	})(View);
var RoomUI=(function(_super){
		function RoomUI(){
			
		    this.bgPic=null;
		    this.topPic=null;
		    this.accountLab=null;
		    this.moneyLab=null;
		    this.changeBtn=null;
		    this.roomPanel=null;
		    this.selectBox=null;
		    this.hallPanel=null;
		    this.drawPanel=null;
		    this.agentPanel=null;
		    this.yjPanel=null;
		    this.payPanel=null;
		    this.btmPic=null;
		    this.btn0=null;
		    this.btn1=null;
		    this.btn2=null;
		    this.btn3=null;
		    this.btn4=null;

			RoomUI.__super.call(this);
		}

		CLASS$(RoomUI,'ui.view.RoomUI',_super);
		var __proto__=RoomUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RoomUI.uiView);

		}

		RoomUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"width":720,"var":"bgPic","top":0,"skin":"room/bg.png","height":1280}},{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"topPic","top":0,"skin":"room/di.png","height":80,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"width":200,"var":"accountLab","valign":"middle","text":"会员ID:00000000","height":48,"fontSize":20,"color":"#cfc199","centerY":0,"centerX":-230,"align":"left"}},{"type":"Image","props":{"x":240,"width":317,"skin":"room/di1.png","height":54,"centerY":0},"child":[{"type":"Label","props":{"width":280,"var":"moneyLab","valign":"middle","text":"余额：0","height":48,"fontSize":24,"color":"#cfc199","centerY":-2,"centerX":0,"align":"left"}}]},{"type":"Image","props":{"x":570,"width":134,"var":"changeBtn","skin":"room/di2.png","centerY":0},"child":[{"type":"Label","props":{"y":8,"width":100,"valign":"middle","text":"兑换","height":36,"fontSize":24,"color":"#cfc199","centerX":0,"align":"center"}}]}]},{"type":"Panel","props":{"x":0,"width":720,"var":"roomPanel","top":80,"bottom":120},"child":[{"type":"HBox","props":{"var":"selectBox","top":0,"bottom":0},"child":[{"type":"Panel","props":{"width":720,"var":"hallPanel","top":0,"name":"item0","height":1100,"cacheAs":"bitmap"}},{"type":"Panel","props":{"x":720,"width":720,"visible":false,"var":"drawPanel","top":0,"name":"item1","height":1100}},{"type":"Panel","props":{"x":1440,"width":720,"visible":false,"var":"agentPanel","name":"item2","height":1100}},{"type":"Panel","props":{"x":2160,"width":720,"visible":false,"var":"yjPanel","name":"item3","height":1100}},{"type":"Panel","props":{"y":10,"x":2170,"width":720,"visible":false,"var":"payPanel","name":"item4","height":1100}}]}]},{"type":"Image","props":{"x":0,"width":720,"var":"btmPic","skin":"room/di3.png","height":120,"cacheAs":"bitmap","bottom":0},"child":[{"type":"Image","props":{"x":0,"width":144,"var":"btn0","name":"item0","height":120,"bottom":0},"child":[{"type":"Image","props":{"width":144,"skin":"room/di4.png","name":"p","height":120,"centerY":0,"centerX":0,"alpha":0.5}},{"type":"Image","props":{"y":19,"x":41,"skin":"room/icon1.png","centerY":-10,"centerX":0}},{"type":"Label","props":{"y":76,"width":60,"valign":"middle","text":"抽奖","height":30,"fontSize":20,"color":"#c8a87f","centerX":0,"bold":true,"align":"center"}}]},{"type":"Image","props":{"x":144,"width":144,"var":"btn1","name":"item1","height":120,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":144,"width":144,"visible":false,"skin":"room/di4.png","name":"p","height":120,"centerY":0,"centerX":0,"alpha":0.5}},{"type":"Image","props":{"skin":"room/icon2.png","centerY":-10,"centerX":0}},{"type":"Label","props":{"y":76,"width":60,"valign":"middle","text":"提现","height":30,"fontSize":20,"color":"#c8a87f","centerX":0,"bold":true,"align":"center"}}]},{"type":"Image","props":{"x":288,"width":144,"var":"btn2","name":"item2","height":120,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":144,"visible":false,"skin":"room/di4.png","name":"p","height":120,"centerY":0,"centerX":0,"alpha":0.5}},{"type":"Image","props":{"skin":"room/icon3.png","centerY":-10,"centerX":0}},{"type":"Label","props":{"y":76,"width":116,"valign":"middle","text":"代理赚钱","height":30,"fontSize":20,"color":"#c8a87f","centerX":0,"bold":true,"align":"center"}}]},{"type":"Image","props":{"x":432,"width":144,"var":"btn3","name":"item3","height":120,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":144,"visible":false,"skin":"room/di4.png","name":"p","height":120,"centerY":0,"centerX":0,"alpha":0.5}},{"type":"Image","props":{"skin":"room/icon4.png","pivotY":44,"pivotX":72,"centerY":-10,"centerX":0}},{"type":"Label","props":{"y":76,"width":60,"valign":"middle","text":"佣金","height":30,"fontSize":20,"color":"#c8a87f","centerX":0,"bold":true,"align":"center"}}]},{"type":"Image","props":{"x":576,"width":144,"var":"btn4","name":"item4","height":120,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":144,"visible":false,"skin":"room/di4.png","name":"p","height":120,"centerY":0,"centerX":0,"alpha":0.5}},{"type":"Image","props":{"skin":"room/icon5.png","centerY":-10,"centerX":0}},{"type":"Label","props":{"y":76,"width":60,"valign":"middle","text":"充值","height":30,"fontSize":20,"color":"#c8a87f","centerX":0,"bold":true,"align":"center"}}]}]}]};
		return RoomUI;
	})(View);
var YongjinUI=(function(_super){
		function YongjinUI(){
			
		    this.numLab=null;
		    this.linqu=null;
		    this.contentPanel=null;
		    this.contentBox=null;

			YongjinUI.__super.call(this);
		}

		CLASS$(YongjinUI,'ui.view.YongjinUI',_super);
		var __proto__=YongjinUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(YongjinUI.uiView);

		}

		YongjinUI.uiView={"type":"View","props":{"width":720,"height":1054},"child":[{"type":"Box","props":{"width":720,"top":0,"centerX":0,"bottom":0},"child":[{"type":"Image","props":{"y":118,"x":6,"width":700,"skin":"draw/di1.png","height":800,"centerY":0,"centerX":0,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"width":500,"skin":"draw/conent.png","height":300,"centerY":-151,"centerX":-2}},{"type":"Image","props":{"width":500,"skin":"draw/conent.png","height":300,"centerY":172,"centerX":-2}},{"type":"Label","props":{"y":35,"x":250,"width":200,"valign":"middle","text":"佣金信息","height":40,"fontSize":30,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Label","props":{"y":129,"width":281,"var":"numLab","valign":"middle","text":"您目前的佣金：100金币","height":40,"fontSize":24,"color":"#c06741","centerX":4,"bold":true,"align":"center"}},{"type":"Image","props":{"y":191,"width":365,"var":"linqu","skin":"btn/ok8.png","centerX":0}},{"type":"Label","props":{"y":326,"width":281,"valign":"middle","text":"分享二维码可获取佣金","height":40,"fontSize":24,"color":"#c06741","centerX":0,"bold":true,"align":"center"}},{"type":"Label","props":{"y":441,"width":200,"valign":"middle","text":"佣金领取记录","height":40,"fontSize":30,"color":"#c06741","centerX":0,"bold":true,"align":"center"}},{"type":"Panel","props":{"y":492,"width":460,"var":"contentPanel","vScrollBarSkin":"common/vscroll.png","height":225,"centerX":0,"cacheAs":"bitmap"},"child":[{"type":"VBox","props":{"width":460,"var":"contentBox","space":5}}]}]}]}]};
		return YongjinUI;
	})(View);