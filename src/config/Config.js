var Config = {
    
	ipType:"develop", //develop不走微信登录  public上线版本
	platform:"h5", //h5 mobile
	debug:false,
	isLog:true,
	userID:"2251459", //
	gameGold:0,
	//loginServerUrl:"/",
	//gameServerUrl:"/",
	loginServerUrl:"http://xyz.ou888m.cn/",
    gameServerUrl:"http://xyz.ou888m.cn/",
	//loginServerUrl:"http://192.168.0.223/",
    //gameServerUrl:"http://192.168.0.223/",
	GameWidth : 720,
	GameHeight : 1280,
	version : "1.1.0",
	versionCode : 0,
	payRate:0,
	room:null,
	gameToken:"",
	agentUrl:"",
	agentID:"",
	isMobileLogin:false,
	isGaming:false,
	mobileNum:"",
	numMoney:[10, 20, 50, 100,200,300,400,500,600]
};

//银行信息配置
var bankInfo = {
    0: {
		code: "gsyh",
		name: "工商银行",
	},
	1: {
		code: "nyyh",
		name: "农业银行",
	},
	2: {
		code: "jsyh",
		name: "建设银行",
	},
	3: {
		code: "jtyh",
		name: "交通银行",
	},
	4: {
		code: "yzcxyh",
		name: "邮政储蓄银行",
	},
	5: {
		code: "xyyh",
		name: "兴业银行",
	},
	6: {
		code: "msyh",
		name: "民生银行",
	},
	7: {
		code: "pfyh",
		name: "浦发银行",
	},
	8: {
		code: "zsyh",
		name: "招商银行",
	},
	9: {
		code: "gfyh",
		name: "广发银行",
	},
	10: {
		code: "zgyh",
		name: "中国银行",
	},
	11: {
		code: "gdyh",
		name: "光大银行",
	}
};