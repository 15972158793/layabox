/**
 * 显示
 * @class DisUtil
 * @constructor
 */
var DisUtil = (function () {

    function DisUtil() {
        DisUtil.__super.call(this);
    }

    Laya.class(DisUtil, "src.util.DisUtil", BaseClass);
    var _proto_ = DisUtil.prototype;

    /**创建一个Sprite
     * @param {number} xPos x坐标
     * @param {number} yPos y坐标
     * @param {string} url 图片源
     * @param {Sprite} parent 父节点
     * @return {Laya.Sprite}
     * */
    _proto_.createSprite = function (xPos, yPos, url, parent,width,height) {
        (parent === void 0) && (parent = null);
        (width === void 0) && (width = null);
        (height === void 0) && (height = null);
        var sprite = new Laya.Sprite();
        if(width){
            sprite.loadImage(url,xPos,yPos,width,height);
        }else{
            sprite.loadImage(url);
        }
        sprite.pos(xPos,yPos);
        if (parent) {
            parent.addChild(sprite);
        }
        return sprite;
    }

    /**
     * 创建已经加载好的image
     * @param {number} x 
     * @param {number} y
     * @param {string} url
     * @param {Node} parent
     * @param {string} name tag值
     * @return {Image}
     */
    _proto_.createLoadedImage = function(x,y,url,parent,name){
        var image = new Laya.Image(url);
        image.pos(x,y);
        if(parent) parent.addChild(image);
        if(name) image.name = name;
        return image;
    }
    


    /**创建一个文本
     * @param xPos x坐标     {number}
     * @param yPos y坐标     {number}
     * @param size 字号      {number}
     * @param width 文本宽度 {number}
     * @param parent 父容器  {Sprite}
     * @param color 颜色     {string}
     * @param align 字体对齐方式 {string}
     * @return {Laya.Text}
     * */
    _proto_.createText = function (xPos, yPos, size, width, parent, color, align) {

        (width === void 0) && (width = 0);
        (parent === void 0) && (parent = null);
        (color === void 0) && (color = "#ffffff");
        align = align || "center";

        var text = new Laya.Text();
        text.width = width;
        text.height = size;
        text.font = "Ya Hei";
        text.fontSize = size;
        text.x = xPos;
        text.y = yPos;
        text.wordWrap = true;
        text.align = align;
        text.valign = "middle";
        text.color = color;
        text.zOrder = 2;
        if (parent) {
            parent.addChild(text);
        }
        return text;
    }

    /**
     * 给字体添加描边
     * @param lable  文字 {Laya.Lable|Laya.Text}
     * @param color  表示文本的描边颜色 {string}
     * @param size  描边宽度 {number}
     */
    _proto_.addLableStrokeColor = function (lable, color, size) {
        lable.strokeColor = color;
        lable.stroke = size;
    }

    /**
     * 万字的显示
     * @param label {Laya.Lable|Laya.Text}
     * @param num {number}
     */
    _proto_.labelIsOverLenght = function (label, num) {
        var str = null;
        if (num < 10000) {
            str = num + "";
        } else if (num < 10000 * 1000) {
            str = Math.floor(num / 10000).toString() + "万";
        } else {
            str = Math.floor(num / 10000000).toString() + "千万";
        }
        label.text = str;
    };

    /**创建一个位图
     * @param xPos x坐标    {number}
     * @param yPos y坐标    {number}
     * @param textureUrl 纹理地址  {string}
     * @param parent 父容器 {Sprite}
     * @return {Laya.Sprite}
     * */
    _proto_.createBitmap = function (xPos, yPos, textureUrl, parent) {
        (parent === void 0) && (parent = null);
        var image = new Laya.Sprite();
        if (textureUrl) {
            this.imageToTexture(textureUrl, image);
        }
        image.pos(xPos, yPos);
        if (image.texture) {
            image.size(image.texture.sourceWidth, image.texture.sourceHeight);
        }
        if (parent) {
            parent.addChild(image);
        }
        return image;
    }

    /**创建一个ui image
     * @param xPos x坐标          {number}
     * @param yPos y坐标          {number}
     * @param textureUrl 纹理地址 {string}
     * @param parent 父容器       {Sprite}
     * @return {Laya.Image}
     * */
    _proto_.createImage = function (xPos, yPos, textureUrl, parent) {
        (parent === void 0) && (parent = null);
        var image = new Laya.Image();
        if (textureUrl) {
            this.imageToTexture(textureUrl, image);
        }
        image.pos(xPos, yPos);
        if (image.source) {
            image.size(image.source.sourceWidth, image.source.sourceHeight);
        }
        if (parent) {
            parent.addChild(image);
        }
        return image;
    }

    /**创建一个位图文本
     * @param xPos x坐标           {number}
     * @param yPos y坐标           {number}
     * @param fontUrl配置文件      {string}
     * @param fontPngUrl纹理地址   {string}
     * @param fontName   {string}
     * @param parent 父容器        {Sprite}
     * @param width 文本宽度       {number}
     * @param textAlign 对齐方式   {string}
     * @return {Laya.Text}
     * */
    _proto_.createBitmapText = function (xPos, yPos, fontUrl, fontPngUrl, fontName, parent, width, align) {
        (parent === void 0) && (parent = null);
        (width === void 0) && (width = 0);
        (align === void 0) && (align = Laya.Stage.ALIGN_CENTER);
        //注册font字体到Text中
        App.FntUtil.register(fontUrl, fontPngUrl, fontName);
        var tx = new Laya.Text();
        tx.pos(xPos, yPos);
        if (parent) {
            parent.addChild(tx);
        }
        tx.wordWrap = true;
        tx.font = fontName;
        if (width != 0) {
            tx.width = width;
        }
        if (align) {
            tx.align = align;
        }
        return tx;
    }

    /**创建一个带文字的按钮
     * @param xPos x坐标     {number}
     * @param yPos y坐标     {number}
     * @param textureUrl 纹理地址  {string}
     * @param text 文本内容 {string}
     * @param labelSize 文本size  {number}
     * @param width 宽     {number}
     * @param height 高    {number}
     * @param parent 父容器   {Sprite}
     * @return {Laya.Button}
     * */
    _proto_.createButton = function (xPos, yPos, textureUrl, text, labelSize, width, height, parent) {
        (parent === void 0) && (parent = null);
        (height === void 0) && (height = null);
        (width === void 0) && (width = null);
        (labelSize === void 0) && (labelSize = null);
        (text === void 0) && (text = "");
        var btn = new Laya.Button(textureUrl, text);
        (height != null) && (btn.height = height);
        (width != null) && (btn.width = width);
        (labelSize != null) && (btn.labelSize = labelSize);
        btn.label = text;
        btn.pos(xPos, yPos);
        if (parent) {
            parent.addChild(btn);
        }
        return btn;
    }

    /**
     * 创建骨骼动画
     * @param xPos x坐标     {number}
     * @param yPos y坐标     {number}
     * @param png图片集地址
     * @param sk文件地址
     * @param 骨骼类型是否换装：1：换装、0：不换装
     * @param parent 父容器   {Sprite}
     */
    _proto_.createSkeleton = function (xPos, yPos, pngUrl, skUrl, type, parent) {
        var templet = new Laya.Templet();
        var skeleton = new Laya.Skeleton();
        var pngData = Laya.loader.getRes(pngUrl);
        var skData = Laya.loader.getRes(skUrl);
        if (pngData && skData) {
            templet.parseData(pngData, skData);
            skeleton = templet.buildArmature(type);
            skeleton.pos(xPos, yPos);
            if (parent) {
                parent.addChild(skeleton);
            }
            return skeleton;
        }
        else {
            Tool.log("动画资源未提前加载！");
        }
        return null;
    }

    /**
     * 创建骨骼动画
     * @param {string} pngUrl 图片集地址
     * @param {string} skUrl 文件地址
     * @param {number} type 骨骼类型是否换装：1：换装、0：不换装
     * @param {function} callback 回调函数
     * @param {any} thisObj 回调函数this对象
     */
    _proto_.createAsynSkeleton = function (pngUrl, skUrl, type, callback, thisObj) {
        (thisObj === void 0) && (thisObj = null);
        var templet = new Laya.Templet();
        var skeleton = new Laya.Skeleton();
        var pngData = Laya.loader.getRes(pngUrl);
        var skData = Laya.loader.getRes(skUrl);
        if (pngData && skData) {
            compleSk();
        } else {
            var res = [
                { "type": Laya.Loader.BUFFER, "url": skUrl },
                { "type": Laya.Loader.IMAGE, "url": pngUrl }
            ];
            App.ResUtil.loadResource(res, null, compleSk, null);
        }

        function compleSk() {
            pngData = Laya.loader.getRes(pngUrl);
            skData = Laya.loader.getRes(skUrl);
            templet.parseData(pngData, skData);
            skeleton = templet.buildArmature(type);
            (callback) && (callback.apply(thisObj, [skeleton]));
        }
    }

    /**
     * 地址加载纹理图片
     * @param 纹理地址     {string}
     * @param 回调函数     {function}
     * @param 回调函数对象 {any}
     */
    _proto_.imageUrlLoad = function (url, callback, thisObj) {
        var res = [{ "url": url, "type": Laya.Loader.IMAGE }];
        App.ResUtil.loadResource(res, thisObj, callback, null);
    }

    /**
     * 给image赋值纹理
     * @param {string} textureUrl 纹理地址
     * @param {Sprite} image 赋值纹理对象
     */
    _proto_.imageToTexture = function (textureUrl, image) {
        if (image instanceof Laya.Image) {
            image.source = Laya.loader.getRes(textureUrl);
            if (!image.source) {
                this.imageUrlLoad(textureUrl, function () {
                    image.source = Laya.loader.getRes(textureUrl);
                    if (!image.destroyed && image.source) {
                        image.size(image.source.sourceWidth, image.source.sourceHeight);
                    }
                }, null);
            }
        }
        else if (image instanceof Laya.Sprite) {
            image.texture = Laya.loader.getRes(textureUrl);
            if (!image.texture) {
                this.imageUrlLoad(textureUrl, function () {
                    image.texture = Laya.loader.getRes(textureUrl);
                    if (!image.destroyed && image.texture) {
                        image.size(image.texture.sourceWidth, image.texture.sourceHeight);
                    }
                }, null);
            }
        }
    }
    
    /**
     * 渐变色
     */
    _proto_.createGradient = function(){
        var canvas = Laya.Render.canvas;
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if(gl){
            Tool.log(gl);
            var verts = [1,-1,0,
                        -1,-1,0,
                        1,1,0,
                        -1,1,0];
            var vs =   "attribute vec4 coords;\
                        void main() {\
                            gl_Position = coords;\
                            gl_PointSize = 10.0;\
                        }";
            var ps =   "precision mediump float;\
                        uniform float time;\
                        uniform vec2 resolution;\
                        void main() {\
                            vec2 uv = gl_FragCoord.xy / resolution.xy;\
                            gl_FragColor = vec4(uv,0.5+0.5*sin(time),1.0);\
                        }";
            
            /*gl.clearColor(0,0,0,0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.viewport(0,0,canvas.width, canvas.height);

            var vrt_shader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vrt_shader, vs);
            gl.compileShader(vrt_shader);
            
            var fra_shader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fra_shader, ps);
            gl.compileShader(fra_shader);

            var shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vrt_shader);
            gl.attachShader(shaderProgram, fra_shader);

            gl.linkProgram(shaderProgram);
            gl.useProgram(shaderProgram);

            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

            var coords = gl.getAttribLocation(shaderProgram,'coords');
            gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0,0);
            gl.enableVertexAttribArray(coords);

            var time = gl.getUniformLocation(shaderProgram, 'time');
            var resolution = gl.getUniformLocation(shaderProgram, 'resolution');
            gl.uniform2f(resolution, canvas.width, canvas.height);

            //开始绘制
            function animate(timestamp){
                gl.drawArrays(gl.TRIANGLE_STRIP, 0,4);
                gl.uniform1f(time, timestamp * 0.001);
                gl.flush();
                window.requestAnimationFrame(animate);
            }
            animate(0);*/
        }else{
            var ctx = canvas.getContext('2d');
            var my_gradient = ctx.createLinearGradient(0,0,0,App.StageUtil.height); //创建一个线性渐变
            my_gradient.addColorStop(0,"#ff0000");
            my_gradient.addColorStop(1,"#0000ff");
            var sprite = new Laya.Sprite();
            sprite.graphics.drawRect(0,0,App.StageUtil.width,App.StageUtil.height,my_gradient);
            return sprite;
        }
    }

    /**
     * 创建图片验证码
     */
    _proto_.createVerify = function(width,left,top){
        var div = Laya.Browser.createElement("div");
        div.setAttribute("id","verify");
        var css1 = "position:absolute;z-index:10000002;cursor:pointer;width:" + width + "px;height:60px;left:" + left + "px;top:" + top + "px;"; 
            //background-color:transparent;border:0px;outline:none;
        div.setAttribute("style",css1);
        Laya.Browser.window.document.body.appendChild(div);
        var verifyCode = new GVerify("verify");
        return verifyCode;
    }

    /**
     * 关闭图片验证码中的dom
     */
    _proto_.closeVerify = function(){
        var id1 = Laya.Browser.getElementById("verify");
        Laya.Browser.removeElement(id1);
    }

    /** 
     *  <!------------ 例子测试 --------------------------->
     * 
        var htmlDiv = new Laya.HTMLDivElement();
        htmlDiv.width = 620;
        //设置属性
        htmlDiv.style.valign = "middle";
        htmlDiv.style.leading = "30";
        htmlDiv.style.fontSize = 30;
        //加入链接  外部传入参数
        var url = 'http://www.baidu.com';
        var s = "<span color='#ffffff' href='"+ url +"' valign='top' >" + "使用HTMLDivElement创建</span>"+
        "<span color='#d26ae3'>HTML文本</span>";
        console.log(s);
        htmlDiv.innerHTML = s;
        //追加
        //htmlDiv.appendHTML("<br/> BBBBBBBBBBB");
        htmlDiv.pos(100,840);
        this.addChild(htmlDiv);
        //加入链接事件
        htmlDiv.on("link",this,this.onLink);
     */
    /**
     * 创建图文混排对象 HTMLDivElement (图片和文字组合排列)
            {"name":"sss","head":0,"data":1};
        //htmldiv中特殊符号的处理
        >    大于号(>)
        <    小于号(<)
        &#39;      单引号(')
        &amp;     链接符(&)
        &quot;    双引号(")
        &copy;     版权符号，圆下一个C
        &reg;        注册标识，圆下一个R
        &#12288;  占位符，类似&nbsp
     */
    _proto_.createHTMLElement = function (msg) {
        var textfiled = new Laya.HTMLDivElement();
        //文本宽
        textfiled.width = Config.GameWidth;
        textfiled.height = 40;
        //文本颜色样式
        textfiled.style.color = "#10922a";
        //文本字体
        textfiled.style.fontFamily = "黑体";
        //文本字体大小样式
        textfiled.style.fontSize = 40;
        //文本对齐样式
        textfiled.style.valign = "middle";
        textfiled.style.align = "left";
        //设置行高
        textfiled.style.lineHeight = 50;

        //用户名字
        var clientName = "<span style='color:#ffcc00;'>" + msg.name + "：</span>";
        //输入的文字内容 加入描边
        var content = "<span style='color:#ffffff;stroke:2;strokeColor:#ffff00;'>" + msg.text + "</span>";
        //转化用户头像与名字信息
        var clientInfo = "<span style='color:#ff9900;'>【世界】</span>" +
            "<img src='icon/" + msg.head + ".png' style='width:40px;height:40px'></img>" + clientName + content;
        //把消息转化成带表情的html图文混排
        var msgHtml = this.getFaceHtmlText(msg.data);
        //添加聊天内容
        textfiled.innerHTML = clientInfo + msgHtml;
        //聊天内容实际高度
        textfiled.height = textfiled.contextHeight + 10;
        return textfiled;
    }

    /**
     * 获取HTML的实际文本内容
     * @param {Laya.HTMLDivElement} obj
     * @return {string} 返回文本内容
     */
    _proto_.getHtmlContent = function (obj) {
        var s = "";
        var childs = obj._childs;
        for(var k in childs){
            var _obj = childs[k] instanceof Laya.HTMLElement;
            if(_obj && _obj.text){
                s += _obj.text + "@*&";//作为分隔符备用
            }
        }
        return s;
    }

    /**
     * 获取表情的数据
     * @param {any} data
     */
    _proto_.getFaceHtmlText = function (data) {
        var array = ("" + data).split("");
        var numStr = "";
        function getHtmlStr(val) {
            return "<img src='icon/" + val + ".png' style='width:40px; height:40px'></img>";
        }
        for (var k in array) {
            numStr += getHtmlStr(array[k]);
        }
        return numStr;
    }

    /**
     * 开启一个点击复制内容功能
     */
    _proto_.openCopy = function (_str, _left, _top, _w, _h) {
        _left = _left || 100;
        _top = _top || 500;
        _w = _w || 100;
        _h = _h || 26;
        //创建input   关键属性id  value
        var input = Laya.Browser.createElement("input");
        input.setAttribute("id", "copyValue");
        input.setAttribute("value", _str);
        Laya.Browser.window.document.body.appendChild(input);
        //创建button  关键属性class  获取的内容需要来自于input标签
        var button = Laya.Browser.createElement("button");
        button.setAttribute("id", "button");
        button.setAttribute("class", "copybtn");
        button.setAttribute("data-clipboard-action", "copy");
        button.setAttribute("data-clipboard-target", "#copyValue");
        button.style = "z-index:1000;position:absolute;background-color:transparent;border:0px;outline:none;" +
            "left:" + _left + "px;top:" + _top + "px;width:" + _w + "px;height:" + _h + "px;"; //
        Laya.Browser.window.document.body.appendChild(button);
        //创建复制板
        var _clipboard = new ClipboardJS(".copybtn");
        /**   解决移动端的问题
         * {
                text:function(trigger){
                    return trigger.getAttribute('aria-label');
                }
            }
        */
        _clipboard.on("success", function (e) {
            alert("复制成功,内容: "+e.text);
            e.clearSelection();
        });
        _clipboard.on("error", function (e) {
            alert('请选择“拷贝”进行复制!');
        });
        return _clipboard;
    }

    /**
     * 关闭复制功能
     */
    _proto_.closeCopy = function (_clipboard) {
        var input = Laya.Browser.getElementById("copyValue");
        Laya.Browser.removeElement(input);
        var button = Laya.Browser.getElementById("button");
        Laya.Browser.removeElement(button);
        if (_clipboard) _clipboard.destroy();
    }

    /**
     * 创建上传图片功能
     * @param {number} 距离左边多少距离
     * @param {number} 距离顶部多少距离
     * @param {number} 按钮的宽度
     * @param {any} 回调者
     * @param {function} 回调函数
     */
    _proto_.createUpload = function (_left, _top, _width, _call, _callback) {
        var self = _call;
        var input = Laya.Browser.createElement('input');
        input.setAttribute("id","upload");
        input.setAttribute("type","file");
        //微信浏览器加入这个部分机型无响应
        input.setAttribute("accept","image/*");
        //部分android机无法调用相机
        //input.capture = "camera";
        //物理距离转换到像素距离
        var top1 = _top * Laya.Browser.clientHeight / App.StageUtil.height;
        //动态计算宽
        var left1 = _left * Laya.Browser.clientWidth / App.StageUtil.width;
        var cssStr = "z-index:1000000;position:absolute;display:none;left:"
            + left1 + "px;top:" + top1 + "px;width:" + _width + "px;";//display:none;
        input.setAttribute("style",cssStr);
        Laya.Browser.window.document.body.appendChild(input); //
        //相同的图片再次上传不会回调
        input.onchange = function (e) {
            //文件路径
            //filePath = e.target.value;
            //使用//替换掉\
            //filePath = self.filePath.replace(/\\/g,"//");
            //获取base64
            var file = e.target.files[0];
            var fr = new Laya.Browser.window.FileReader();
            fr.onloadend = function (e) {
                var content = e.target.result;
                if (content) {
                    if (_callback) {
                        _callback.apply(self, [content]);
                    }
                } else {
                    Toast.show("上传文件失败");
                }
            }
            fr.readAsDataURL(file);
        };

        //创建input标签,添加点击事件
        var img = Laya.Browser.createElement("div");
        img.setAttribute("id","bb0");
        var css1 = "position:absolute;z-index:10000002;cursor:pointer;width:" + _width + "px;height:26px;left:" + left1 + "px;top:" + top1 + "px;"; 
            //background-color:transparent;border:0px;outline:none;
        img.setAttribute("style",css1);
        //background-repeat: no-repeat;background-size: contain;
        //img.setAttribute("style", "position:absolute;width:" + _width + "px;height:26px;left:" + left1 + "px;top:" + top1 + "px;");
        //+"color:rgba(255, 255, 255, 0.85);border-radius: 0 0 0 50%;line-height: 45px;background-color:rgba(90, 83, 74, 0.24);font-size: 26px;font-family: sans-serif;")
        function goInput(){
            //触发上传点击事件
            var ie = Laya.Browser.window.navigator.appName=="Microsoft Internet Explorer" ? true : false; 
            Toast.show("选择图片中...");

            if(ie){
               window.document.getElementById("upload").click();
            }else{
            var a = Laya.Browser.document.createEvent("MouseEvents");//FF的处理 
        　　　　a.initEvent("click", true, true); 
        　　　　window.document.getElementById("upload").dispatchEvent(a);
            }
        }
        img.addEventListener("click",goInput,false);
        Laya.Browser.window.document.body.appendChild(img); //
    }

    _proto_.addHtmlClick = function(cfg,target,callback,parent){

        var img = Laya.Browser.createElement("div");
        img.setAttribute("id",cfg.id);
        var left = cfg.left;
        var css1 = "position:absolute;z-index:10000002;cursor:pointer;width:" + cfg.width + "px;height:" + cfg.height + "px;left:" + left + "px;top:" + cfg.top + "px;"; 
        img.setAttribute("style",css1);
        function goInput(){
            //触发上传点击事件
            callback && callback.apply(target);
        }
        img.addEventListener("click",goInput,false);
        if(parent){
            parent.addChild(img);
        }else{
            Laya.Browser.window.document.body.appendChild(img);
        }
        return img;
    }

    /**
     * 删除上传标签
     */
    _proto_.closeUpload = function () {
        var input = Laya.Browser.getElementById("upload");
        Laya.Browser.removeElement(input);
        var btn = Laya.Browser.getElementById("bb0");
        Laya.Browser.removeElement(btn);
    }
    
    /**
     * 添加视频播放  ios上测试没问题
     */
    _proto_.showVideo = function(_url){

        var iframe = Laya.Browser.document.createElement("iframe");
        iframe.setAttribute("id","videoframes");
        iframe.setAttribute('frameborder', 0); //没有border
        iframe.setAttribute("allowtransparency",true);
        //全屏
        iframe.setAttribute("allowfullscreen",true);
        iframe.setAttribute("webkitallowfullscreen",true);
        iframe.setAttribute("mozallowfullscreen",true);
        //style
        iframe.style.position = "fixed";//设置布局定位。这个不能少。
        iframe.style.zIndex = "0";//设置层级
        iframe.style.left = "0px";
        iframe.style.top = "0px";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.src = _url + "?rel=0&amp;autoplay=1"; //&rel=0&amp;autoplay=1 //+ "?wmode=opaque"
        Laya.Browser.window.document.body.appendChild(iframe);

        //添加关闭按钮
        var left = "8%";
        var e = document.createElement("div");
        e.setAttribute("id","videoclose");
        var closeStyle = "position:fixed;zIndex:0;background:url(video/images/exit.png);background-repeat:no-repeat;background-size:contain;"+
        "width:30px;height:30px;left:"+ left+";top:10px;"; //
        e.setAttribute("style",closeStyle);
        Laya.Browser.window.document.body.appendChild(e);
        e.addEventListener("click",function(){
            var _id = Laya.Browser.getElementById("videoframes");
            if(_id) Laya.Browser.removeElement(_id);
            Laya.Browser.removeElement(this);
        });

        //监听旋转
        /*window.onorientationchange = function(){
            if(iframe){
                iframe.style.width = Laya.Browser.clientHeight + "px";
                iframe.style.height = Laya.Browser.clientWidth + "px";

                Tool.log(Laya.Browser.clientHeight);

                e.style.left = (Laya.Browser.clientHeight - 40) + "px";
            }
        };*/
        
    }


    /**
     * 在游戏中添加一个展示地址
     */
    _proto_.addViewByUrl = function (_url, _top) {
        _top = _top || 0;
        var dh = Laya.Browser.clientHeight * _top / Laya.stage.height;
        var iframe = Laya.Browser.document.createElement("iframe");
        iframe.setAttribute("id","frames");
        iframe.setAttribute('frameBorder', 0); //没有border
        //style
        iframe.style.position = "absolute";//设置布局定位。这个不能少。
        iframe.style.zIndex = 10000;//设置层级
        iframe.style.left = "0px";
        iframe.style.top = dh + "px";
        iframe.style.width = Laya.Browser.clientWidth + "px";
        iframe.style.height = (Laya.Browser.clientHeight - dh) + "px";
        iframe.src = _url;
        Laya.Browser.window.document.body.appendChild(iframe);
    }

    _proto_.closeView = function(){
        var id = Laya.Browser.getElementById("frames");
        if(id) Laya.Browser.removeElement(id);
    }

    /**
     * 创建视频播放器,可控制
     * @param {string} src 视频播放源
     */
    _proto_.createVideo = function (src) {
        //video
        //test
        src = "http://vjs.zencdn.net/v/oceans.mp4";
        var video = Laya.Browser.document.createElement("video");
        Laya.Browser.window.document.body.appendChild(video);
        video.setAttribute("id", "videoplay");
        video.setAttribute("class", "video-js vjs-big-play-centered vjs-default-skin");//class唯一，配合css
        video.setAttribute("controls", true);
        video.setAttribute("autoplay", true);
        video.setAttribute("loop", true);
        //设置视频未加载完的默认显示
        //video.setAttribute("poster","http://video-js.zencoder.com/oceans-clip.png");
        video.setAttribute("playsinline", true);//ios禁止全屏
        var styles = "width:" + Laya.Browser.clientWidth + "px;height:200px;top:0px;zIndex:10000"; //align:middle;
        video.setAttribute("style", styles);
        //创建source标签
        var source = Laya.Browser.document.createElement("source");
        source.setAttribute("src", src);
        source.setAttribute("type", "video/mp4");
        Laya.Browser.getElementById("videoplay").appendChild(source);

        //控制视频的播放
        var player = videojs(video, {
            width: Laya.Browser.clientWidth,
            height: 300,
        }, function () {
            Tool.log(this);
            this.enterFullWindow();
            this.play();
            window.myPlayer = this;

            player.on("ended",function(){
                Tool.log("播放完成....");
            });

            player.on("firstplay",function(){
                Tool.log("第一次播放....");
            });

            player.on("pause",function(){
                Tool.log("暂停....");
            });

            player.on("play",function(){
                Tool.log("播放....");
            });

            player.on("click",function(){
                 player.dispose();
            });
        });

        //Tool.log(player);
        //player.addChild('Title', { text: '自定义标题组件' });

        //移除
        //player.dispose();

    }

    /**
     * 创建视频弹幕
     * @param {string} src 视频源
     */
    _proto_.createVideoDanmu = function (src) {
        var div = Laya.Browser.createElement("div");
        div.setAttribute("id", "danmp");
        Laya.Browser.window.document.body.appendChild(div);
        $("#danmp").DanmuPlayer({
            src: src,       //视频源
            width: Laya.Browser.clientWidth + "px",	//视频宽度
            height: Laya.Browser.clientHeight + "px"//视频高度
        });
        //"http://vjs.zencdn.net/v/oceans.mp4"
    }

    /**
     * 消息通知弹窗
     * @param {string} content 内容
     * @param {string} btnDes 按钮描述
     * @param {function} callback 回调函数
     * @param {string} title 标题
     */
    _proto_.showNotice = function (content, btnDes, callback, title) {
        //关闭窗口
        function close() {
            Laya.Tween.to(s, {
                scaleX: 0,
                scaleY: 0
            }, 200, Laya.Ease.circOut, Laya.Handler.create(s, function () {
                s.removeSelf(),
                    h.removeSelf()
            }), 10);
        }
        var a = 720 / Laya.stage.width;
        //背景框
        var s = new Laya.Image;
        s.skin = ("dialog/k1.png");
        s.sizeGrid = "10,10,10,10";
        s.height = 300 * a;
        s.width = 600 * a;
        var r = (Laya.stage.width / 2, s.height / 2);
        s.pivot(s.width / 2, s.height / 2),
            s.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        s.zOrder = 99999;
        s.scale(0, 0);
        var l = new Laya.Image;
        l.skin = ("dialog/hd.png");
        l.left = 2 * a;
        l.right = 2 * a;
        l.top = 45 * a;
        l.bottom = 100 * a;
        l.sizeGrid = "3,0,3,0";
        s.addChild(l);
        Laya.stage.addChild(s);
        //遮罩
        var h = new Laya.Sprite;
        Laya.stage.addChild(h);
        h.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        h.size(Laya.stage.width, Laya.stage.height);
        h.zOrder = 99998;
        h.alpha = 0.8;
        //title
        var p = new Laya.Image;
        p.skin = ("dialog/k3.png");
        p.height = 72 * a;
        p.width = 360 * a;
        p.centerX = 0;
        p.top = 38 * -a;
        s.addChild(p);
        var c = new Laya.Label;
        c.color = "#3B3834";
        c.fontSize = 28;
        c.bold = true;
        c.text = title ? title : "公告";
        c.width = s.width;
        c.align = "center";
        c.valign = "middle";
        c.top = 32 * -a;
        c.centerX = 0;
        s.addChild(c);
        //content
        var d = new Laya.Label;
        d.color = "#BAA073";
        d.fontSize = 28;
        d.text = content;
        d.width = 0.9 * s.width;
        d.top = 45 * a;
        d.bottom = 100 * a;
        d.align = "center";
        d.wordWrap = true;
        d.leading = 16;
        d.valign = "middle";
        d.pivotX = d.width / 2;
        d.pos(s.width / 2, 0);
        s.addChild(d);
        //确认
        var m = new Laya.Image;
        m.loadImage("btn/k4.png");
        m.height = 55 * a;
        m.width = 204 * a;
        m.centerX = 0;
        m.bottom = 26 * a;
        s.addChild(m);
        var f = new Laya.Label;
        f.color = "#ffffff";
        f.fontSize = 24;
        f.text = btnDes ? btnDes : "确认";
        f.width = m.width;
        f.height = m.height;
        f.align = "center";
        f.valign = "middle";
        m.addChild(f);
        Laya.Tween.to(s, {
            scaleX: 1,
            scaleY: 1
        }, 400, Laya.Ease.backOut, Laya.Handler.create(s, function () { }), 10);
        //遮罩处直接关闭
        h.on("mousedown", this, function () {
            if (callback) callback();
            close();
        }),
            //点击事件
            m.on("mousedown", this, function () {
                if (callback) callback();
                close();
            }),
            h.mouseEnabled = true;
        s.mouseEnabled = true;
    }

    /**
     * 确认和取消弹窗
     * @param {string} content  内容
     * @param {Array} t 取消和确认标题数组
     * @param {function} callback 回调函数
     * @param {string} title 标题
     */
    _proto_.confirm = function (content, t, callback, title) {

        if(!t) t = ["取消","确认"];
        //关闭窗口
        function close() {
            Laya.Tween.to(s, {
                scaleX: 0,
                scaleY: 0
            }, 200, Laya.Ease.circOut, Laya.Handler.create(s, function () {
                s.removeSelf(),
                    h.removeSelf()
            }), 10);
        }
        var a = 720 / Laya.stage.width;
        //背景框
        var s = new Laya.Image;
        s.skin = ("dialog/k1.png");
        s.sizeGrid = "10,10,10,10";
        s.height = 300 * a;
        s.width = 600 * a;
        var r = (Laya.stage.width / 2, s.height / 2);
        s.pivot(s.width / 2, s.height / 2),
            s.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        s.zOrder = 99999;
        s.scale(0, 0);
        var l = new Laya.Image;
        l.skin = ("dialog/hd.png");
        l.left = 2 * a;
        l.right = 2 * a;
        l.top = 45 * a;
        l.bottom = 100 * a;
        l.sizeGrid = "3,0,3,0";
        s.addChild(l);
        Laya.stage.addChild(s);
        //遮罩
        var h = new Laya.Sprite;
        Laya.stage.addChild(h);
        h.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        h.size(Laya.stage.width, Laya.stage.height);
        h.zOrder = 99998;
        h.alpha = 0.8;
        //title
        var p = new Laya.Image;
        p.skin = ("dialog/k3.png");
        p.height = 72 * a;
        p.width = 360 * a;
        p.centerX = 0;
        p.top = 38 * -a;
        s.addChild(p);
        var c = new Laya.Label;
        c.color = "#3B3834";
        c.fontSize = 28;
        c.bold = true;
        c.text = title ? title : "提示";
        c.width = s.width;
        c.align = "center";
        c.valign = "middle";
        c.top = 32 * -a;
        c.centerX = 0;
        s.addChild(c);
        //content
        var d = new Laya.Label;
        d.color = "#BAA073";
        d.fontSize = 28;
        d.text = content;
        d.width = 0.9 * s.width;
        d.top = 45 * a;
        d.bottom = 100 * a;
        d.align = "center";
        d.wordWrap = true;
        d.leading = 16;
        d.valign = "middle";
        d.pivotX = d.width / 2;
        d.pos(s.width / 2, 0);
        s.addChild(d);
        //取消
        var u = new Laya.Image;
        u.loadImage("btn/k3.png");
        u.height = 55 * a;
        u.width = 204 * a;
        u.left = 35 * a;
        u.bottom = 26 * a;
        s.addChild(u);
        var g = new Laya.Label;
        g.color = "#ffffff";
        g.fontSize = 24;
        g.text = t[0] ? t[0] : "取消";
        g.width = u.width;
        g.height = u.height;
        g.align = "center";
        g.valign = "middle";
        u.addChild(g);
        //确认
        var m = new Laya.Image;
        m.loadImage("btn/k4.png");
        m.height = 55 * a;
        m.width = 204 * a;
        m.right = 35 * a;
        m.bottom = 26 * a;
        s.addChild(m);
        var f = new Laya.Label;
        f.color = "#ffffff";
        f.fontSize = 24;
        f.text = t[1] ? t[1] : "确认";
        f.width = m.width;
        f.height = m.height;
        f.align = "center";
        f.valign = "middle";
        m.addChild(f);
        Laya.Tween.to(s, {
            scaleX: 1,
            scaleY: 1
        }, 400, Laya.Ease.backOut, Laya.Handler.create(s, function () { }), 10);
        //遮罩处直接关闭
        h.on("mousedown", this, function () {
            close();
        }),
            u.on("mousedown", this, function () {
                if (callback) callback(false);
                close();
            }),
            m.on(Laya.Event.CLICK, this, function () {
                if (callback) callback(true);
                close();
            }),
            h.mouseEnabled = true;
        s.mouseEnabled = true;
    }

    /**
     * 从右边弹入动画
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     */
    _proto_.openFromRight = function (caller, callback) {
        var self = caller;
        Laya.timer.callLater(self, function () {
            self.x = Laya.stage.width;
            self.y = 0;
            self.visible = true;
            Laya.Tween.to(self, {
                x: 0,
                y: 0
            }, 500, Laya.Ease.expoOut, Laya.Handler.create(self, function () {
                callback && callback.call(self);
            }));
        });
    }

    /**
     * 从右边退出动画
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     */
    _proto_.closeToRight = function (caller, callback) {
        var self = caller;
        Laya.timer.callLater(self, function () {
            Laya.Tween.to(self, {
                x: Laya.stage.width
            }, 300, Laya.Ease.expoOut, Laya.Handler.create(self, function () {
                self.x = Laya.stage.width;
                callback && callback.call(self);
            }));
        })
    }


    /**
     * 从下面出来
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     */
    _proto_.openToTop = function (caller, callback) {
        var self = caller;
        self.pos(0, App.StageUtil.height);
        Laya.timer.callLater(self, function () {
            Laya.Tween.to(self, {
                x: 0,
                y: 0
            }, 300, Laya.Ease.expoOut, Laya.Handler.create(self, function () {
                callback && callback.call(self);
            }));
        });
    }

    /**
     * 隐藏到底部
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     */
    _proto_.closeToTop = function (caller, callback) {
        var self = caller;
        Laya.timer.callLater(self, function () {
            Laya.Tween.to(self, {
                x: 0,
                y: App.StageUtil.height
            }, 100, Laya.Ease.expoOut, Laya.Handler.create(self, function () {
                callback && callback.call(self);
            }));
        });
    }

    /**
     * 显示请求拦截提示
     */
    _proto_.showIntercept = function () {
        var bg = new Laya.Image("common/black.png"); //
        bg.width = App.StageUtil.width;
        bg.height = App.StageUtil.height;
        bg.centerX = 0;
        bg.centerY = 0;
        bg.mouseEnabled = true;
        bg.alpha = 0.85;
        bg.zOrder = 100000;
        var di = App.DisUtil.createImage(0, 0, null, bg);
        di.skin = "common/toast.png";
        di.height = 64;
        di.sizeGrid = "10,10,10,10";
        di.centerY = 0;
        var lab = App.DisUtil.createText(0, 12, 30, di.width, di);
        lab.color = "#ececa8";
        lab.text = "网络请求中,请稍后...";
        //进度
        var lab1 = App.DisUtil.createText(0, 70, 40, di.width, di);
        lab1.color = "#ffffff";
        lab1.text = "0%";
        return [bg, lab1];
    }

    /**
     * 中奖弹框初始化
     */
    _proto_.initAlertWinMsg = function () {

        var url = "panel/award1.png";
        //底
        var panel = new Laya.Panel();
        panel.zOrder = 999999;
        panel.height = Laya.stage.height;
        panel.width = Laya.stage.width;
        panel.x = 0.5 * Laya.stage.width;
        panel.y = -0.5 * Laya.stage.height;
        panel.pivotY = Laya.stage.height / 2;
        panel.pivotX = Laya.stage.width / 2;
        panel.scaleY = 0;
        //bg
        var h = 138, bg = new Laya.Image(url);
        bg.width = Laya.stage.width;
        bg.height = h;
        bg.centerX = 0;
        bg.centerY = 0;
        panel.addChild(bg);
        //content
        var lab1 = new Laya.Label();
        bg.addChild(lab1);
        lab1.color = "#ffdd3f";
        lab1.fontSize = 22;
        lab1.text = "";
        lab1.bottom = 28;
        lab1.width = Laya.stage.width;
        lab1.height = h;
        lab1.valign = "middle";
        lab1.align = "center";
        lab1.centerX = 0;

        panel.cacheAs = "bitmap";
        panel.mouseEnabled = true;
        Laya.stage.addChild(panel);
        return panel;
    }

    /**
     * 显示中奖弹框
     * @param {string} title 弹框内容
     * @param {function} callback 回调函数
     */
    _proto_.toAlertWinMsg = function (title, callback) {
        var panel = this.initAlertWinMsg();
        var h = 138;
        panel.getChildAt(0).getChildAt(0).getChildAt(0).text = title;
        Laya.Tween.to(panel, {
            y: 0.5 * Laya.stage.height,
            scaleY : 1
        }, 1000, Laya.Ease.expoOut, Laya.Handler.create(panel, function () {
            Laya.timer.once(100, panel, function () {
                Laya.Tween.to(panel, {
                    y: 0.2 * Laya.stage.height,
                    scaleY: 0
                }, 1000, Laya.Ease.expoIn, Laya.Handler.create(panel, function () {
                      panel.destroy();
                      if(callback) callback();
                }));
            })
        }));
    }

    /**
     * 通过SVG创建Sprite
     * @param {any} config
     * @return {Laya.Sprite} 返回SVG创建的Sprite
     */
    _proto_.createSVGSprite = function (config) {
        var svg = new SVGUtil(config);
        var sp = new Laya.Sprite();
        sp.loadImage(svg.data, 0, 0, svg.width, svg.height);
        //设置宽高,loadImage是异步的,防止转base64没有数据
        sp.size(svg.width, svg.height);
        sp.pos(svg.x, svg.y);
        switch (svg.pivot) {
            case 0:
                sp.pivot(svg.width / 2, svg.height / 2);
                break;
            case 1:
                sp.pivot(0, 0);
                break;
            case 2:
                sp.pivot(svg.width / 2, svg.height);
                break;
            case 3:
                sp.pivot(0, svg.height / 2);
                break;
            case 4:
                sp.pivot(svg.width / 2, 0);
                break;
            case 5:
                sp.pivot(svg.width, svg.height / 2);
                break;
        }
        return sp;
    }

    /**
     * 创建二维码信息
     * @param {string} url 地址
     * @param {number} width 宽
     * @param {number} height 高
     * @return {Object} 返回二维码配置信息
     */
    _proto_.createQRCode = function (url, width, height) {
        var div = Laya.Browser.document.createElement("div");
        Laya.Browser.window.document.body.appendChild(div);
        div.id = "qrdiv";
        var qrcode = new Laya.Browser.window.QRCode(div, {
            width: width,
            height: height
        });
        qrcode.makeCode(url);
        return qrcode;
    }

    /**
     * img标签转canvas标签  实现二维码长按
     */
    _proto_.img2canvas = function (image) {
        //创建canvas DOM对象,并设置其宽高和图片一样
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        //坐标(0,0)表示从此处开始绘制,相当于偏移
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas;
    }

    /**
     * img标签转canvas标签
     */
    _proto_.canvas2img = function (canvas) {
        //新Image对象,可以理解为DOM; document.createElement("img");
        var image = new Image();
        //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
        //指定格式jpeg  png格式在微信中可能无法保存
        image.src = canvas.toDataURL("image/jpeg");
        return image;
    }

    /**
     * 二维码转Sprite  在微信中支持长按识别
     * @param {Object} code
     * @param {number} x
     * @param {number} y
     * @param {Laya.Sprite} parent
     */
    _proto_.qrcode2Sprire = function (code, x, y, parent) {
        Laya.timer.frameOnce(3, this, function (code, x, y, parent) {
            var picUrl = code._oDrawing._elImage.src;
            var w = code._htOption.width;
            var h = code._htOption.height;
            var sp = this.base64ToSprite(picUrl, x, y, w, h);
            parent.addChild(sp);
        }, [code, x, y, parent]);
    }

    /**
     * dom长按识别
     * @param {string} id dom的id
     * @param {function} 回调函数
     */
    _proto_.domLongPress = function (id, func) {

        var timeOutEvent = null;
        var element = Laya.Browser.getElementById(id);
        //document.querySelector('#' + id)
        //触摸开始
        element.addEventListener('touchstart', function (e) {
            // 开启定时器前先清除定时器，防止重复触发
            clearTimeout(timeOutEvent);
            // 开启延时定时器
            timeOutEvent = setTimeout(function () {
                // 调用长按之后的逻辑函数func
                func();
            },2000);  //长按时间为300ms，可以自己设置
        });

        element.addEventListener('touchmove', function (e) {
            // 长按过程中，手指是不能移动的，若移动则清除定时器，中断长按逻辑
            clearTimeout(timeOutEvent);
            /* e.preventDefault() --> 若阻止默认事件，则在长按元素上滑动时，页面是不滚动的，按需求设置吧 */
        });

        element.addEventListener('touchend', function (e) {
            // 若手指离开屏幕时，时间小于我们设置的长按时间，则为点击事件，清除定时器，结束长按逻辑
            clearTimeout(timeOutEvent);
        });
    }

    /**
     * Base64转Sprite
     * @param {string} base64
     * @return {Laya.Sprite} 返回Sprite
     */
    _proto_.base64ToSprite = function (base64, x, y, width, height) {
        var sp = new Laya.Sprite();
        sp.loadImage(base64, x, y, width, height);
        return sp;
    }

    /**
     * sprite转base64 也就是截屏功能
     * @param {Laya.Sprite} sp
     */
    _proto_.sprite2Base64 = function (sp, _w, _h,_x,_y) {
        _x = _x || 0;
        _y = _y || 0;
        var w = sp.width;
        var h = sp.height;
        if (_w) w = _w;
        if (_h) h = _h;
        var htmlCanvas = sp.drawToCanvas(w, h, _x, _y);
        var canvas1 = htmlCanvas.getCanvas();
        var url = canvas1.toDataURL("image/jpeg",0.8);
        return url;
    }
    
    /**
     * 图片转base64
     */
    _proto_.img2Base64 = function(url,callback){
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.crossOrigin = "anonymous",
        img.onload = function() {
            canvas.height = img.height,
            canvas.width = img.width,
            ctx.drawImage(img, 0, 0);
            var e = canvas.toDataURL("image/jpeg");
            if(callback) callback(e);
            canvas = null;
        }
        img.src = url;
    }

    /**
     * base64压缩
     * @param {string} base64 数据源
     * @param {number} w 图片的宽度
     */
	_proto_.compressBase64 = function(base64,w,callback,caller){
        var newImage = new Image();
        var quality = 0.8;    //压缩系数0-1之间
        newImage.src = base64;
        newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
        var imgWidth, imgHeight;
        //加载完成的回调中拿到数据
        newImage.onload = function(){
            imgWidth = this.width;
            imgHeight = this.height;
            var canvas = Laya.Browser.createElement("canvas");
            var ctx = canvas.getContext("2d");
            if (Math.max(imgWidth,imgHeight) > w){
                if (imgWidth > imgHeight) {
                    canvas.width = w;
                    canvas.height = w * imgHeight / imgWidth;
                } else {
                    canvas.height = w;
                    canvas.width = w * imgWidth / imgHeight;
                }
            } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                quality = 0.8;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
            /*//确保图片压缩到自己想要的尺寸,如要求在200-400kb之间，请加以下语句，quality初始值根据情况自定
            while (base64.length / 1024 > 400) {
                quality -= 0.01;
                base64 = canvas.toDataURL("image/jpeg", quality);
            }
            // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
            while (base64.length / 1024 < 200) {
                quality += 0.001;
                base64 = canvas.toDataURL("image/jpeg", quality);
            }*/
            if(callback)callback.apply(caller,[base64,caller]);//必须通过回调函数返回值
        }
    }

    /**
     * 图片保存到相册
     * @param {string} url 图片地址 可以是链接,也可以是base64
     */
    _proto_.savePic = function (url) {
        //文件名
        var n = Math.floor(Math.random() * 1000 + 1);
        var s = App.DateUtil.format("yyyy-mm-dd");
        var filename = 'share_' + s + "_" + n + '.' + "jpeg";
        //a标签下载
        var save_link = Laya.Browser.window.document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = url;
        save_link.download = filename;
        var event = Laya.Browser.window.document.createEvent('MouseEvents');
        event.initMouseEvent('click',true,false,Laya.Browser.window,0,0,0,0,0,false,false,false,false,0,null);
        save_link.dispatchEvent(event);
    }

    /**
     * 视频保存到相册
     * @param {string} url 视频地址
     */
    _proto_.saveVideo = function (url) {

        var n = Math.floor(Math.random() * 1000 + 1);
        var s = App.DateUtil.format("yyyy-mm-dd");
        var type = "mp4";
        if(url.indexOf(".ogg") != -1) type = "ogg";
        else if(url.indexOf(".webm") != -1) type = "webm";
        var filename = 'video_' + s + "_" + n + '.' + type;
        Laya.Browser.window.download(url,filename,"video/"+type);
        /*
        //a标签下载
        var save_link = Laya.Browser.window.document.createElement('a');
        save_link.href = url;
        save_link.download = filename;
        save_link.style.display = "none";
        var event = Laya.Browser.window.document.createEvent('MouseEvents');
        event.initMouseEvent('click',true,false,Laya.Browser.window,0,0,0,0,0,false,false,false,false,0,null);
        save_link.dispatchEvent(event);*/
    }
    
    /**
     * 保存base64图片到相册
     */
    _proto_.saveBase64Pic = function(base64){
        //文件名
        var n = Math.floor(Math.random() * 1000 + 1);
        var s = App.DateUtil.format("yyyy-mm-dd");
        var fileName = 'share_' + s + "_" + n + '.' + "jpeg";

        var base64ToBlob = function(code) {
            var parts = code.split(';base64,');
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);
            for(var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], {
                type: contentType
            });
        };
        //a标签
        var aLink = document.createElement('a');
        var blob = base64ToBlob(base64); //new Blob([content]);
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
    }


    /**
     * 获取玩法描述
     * @param {number} playWay
     * @return {string} 返回玩法描述
     */
    _proto_.getPlayDes = function (playWay) {
        var des = "";
        playWay = parseInt(playWay);
        switch (Config.gameID) {
            case 1:
            case 2:
                switch (playWay) {
                    case 1:
                        des = "大小";
                        break;
                    case 2:
                        des = "单双";
                        break;
                    case 3:
                        des = "定位";
                        break;
                    case 4:
                        des = "不定";
                        break;
                    case 5:
                        des = "其他";
                        break;
                }
                break;
            case 3:
            case 4:
                switch (playWay) {
                    case 1:
                        des = "大小";
                        break;
                    case 2:
                        des = "单双";
                        break;
                    case 6:
                        des = "排名";
                        break;
                    case 7:
                        des = "龙虎";
                        break;
                }
                break;
            case 5:
                switch (playWay) {
                    case 8:
                        des = "号码";
                        break;
                    case 9:
                        des = "生肖";
                        break;
                    case 10:
                        des = "连码";
                        break;
                    case 11:
                        des = "两面";
                        break;
                    case 12:
                        des = "不中";
                        break;
                }
                break;
            case 6:
                switch (playWay) {
                    case 12:
                        des = "大小";
                        break;
                    case 13:
                        des = "单双";
                        break;
                    case 14:
                        des = "波色";
                        break;
                    case 15:
                        des = "号码";
                        break;
                    case 16:
                        des = "生肖";
                        break;
                }
                break;
        }
        return des;
    }

    /**
     * h5标签允许触摸滑动
     * @param {HTMLElement} e
     */
    _proto_.allowMove = function(e){
        e.isSCROLL = true;
    }

    /**
     * h5标签触摸不允许滑动
     * @param {HTMLElement} e
     */
    _proto_.disAllowMove = function(e){
        e.isSCROLL = false;
    }

    /**
     * 获取下注的名称
     * @param {number} playType 游戏类型
     * @param {string} playWay 下注类型
     * @param {string} value 下注信息
     * @return {string} 返回下注的描述信息
     */
    _proto_.getBetName = function(playType,playWay,value){
        
        //playType += "";
        playWay += "";
        value += "";
        var result = "";
        switch(playType){
            case 1:
            case 2:
                if(playWay.indexOf("4-") != -1){
                    result = "不定";
                }else if(playWay.indexOf("5-") != -1){
                    result = "其他";
                }else if(playWay.indexOf("3") != -1){
                    result = "定位";
                }else if(playWay.indexOf("2") != -1){
                    if(value.indexOf("-3") != -1) result = "单";
                    else result = "双";
                }else{
                    if(value.indexOf("-1") != -1) result =  "大";
                    else result = "小";
                }
                break;
            case 3:
            case 4:
                var s = "";
                if(value.indexOf("0-") != -1) s = "冠军";
                else if(value.indexOf("1-") != -1) s = "亚军";
                else s = "季军";
                if(playWay.indexOf("6") != -1){
                    result = (s + "排名");
                }else if(playWay.indexOf("1") != -1){
                    if(value.indexOf("-1") != -1) result = (s+"大");
                    else result = (s+"小");
                }else if(playWay.indexOf("2") != -1){
                    if(value.indexOf("-1") != -1) result = (s+"双");
                    else result = (s+"单");
                }else{
                    if(value.indexOf("-1") != -1) result = (s+"龙");
                    else result = (s+"虎");
                }
                break;
            case 5:
                if(playWay.indexOf("8") != -1){
                    if(value.indexOf("0-") != -1) result = "平码";
                    else result = "特码";
                }else if(playWay.indexOf("9") != -1){
                    if(value.indexOf("0-") != -1) result = "平特一肖";
                    else if(value.indexOf("1-") != -1) result = "平码生肖";
                    else if(value.indexOf("13-") != -1) result = "特码生肖";
                    else result = "特码合肖";
                }else if(playWay.indexOf("10") != -1){
                    result = "连码";
                }else if(playWay.indexOf("11") != -1){
                    result = "两面";
                }else{
                    if(value.indexOf("0-") != -1) result = "五不中";
                    else if(value.indexOf("1-") != -1) result = "六不中";
                    else if(value.indexOf("2-") != -1) result = "七不中";
                    else if(value.indexOf("3-") != -1) result = "八不中";
                    else if(value.indexOf("4-") != -1) result = "九不中";
                    else if(value.indexOf("5-") != -1) result = "十不中";
                    else if(value.indexOf("6-") != -1) result = "十一不中";
                    else result = "十二不中";
                }
                break;
            case 6:
                if(playWay.indexOf("12") != -1){
                    if(value.indexOf("28") != -1) result = "大";
                    else result = "小";
                }else if(playWay.indexOf("13") != -1){
                    if(value.indexOf("33") != -1) result = "单";
                    else result = "双";
                }else if(playWay.indexOf("14") != -1){
                    if(value.indexOf("30") != -1) result = "红";
                    else if(value.indexOf("31") != -1) result = "蓝";
                    else result = "绿";
                }else if(playWay.indexOf("15") != -1){
                    result = "号码";
                }else{
                    result = "生肖";
                }
                break;
        }
        if(value == "") return "";
        return result;
    }

    /**
     * 获取生肖的描述
     * @param {number} type
     */
    _proto_.getSxDes = function (type) {
        type = parseInt("" + type) || 0;
        var des = ["", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        return des[type];
    }

    /**
     * 获取一到十的中文
     * @param {number} num  1-10
     * @return {string} 返回字符串   
     */
    _proto_.getNumCN = function (num) {
        var s = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        return s[num - 1];
    }

    /**
     * 生成通用链接
     * @param {string} url 是链接还是scheme
     * @param {any} options 可选参数
     */
    _proto_.createScheme = function(url,options,isLink){
        var urlScheme = url;
        var len1 = url.length;
        for(var item in options){
            urlScheme = urlScheme + item + '=' + encodeURIComponent(options[item]) + "&";
        }
        var len2 = urlScheme.length;
        if(len1 != len2) urlScheme = urlScheme.substring(0, urlScheme.length - 1);
        return isLink ? urlScheme : encodeURIComponent(urlScheme);
    }
    
    /**通过展示打开App 
     * 
    */
    _proto_.openApp=function(url,options,isLink,downUrl){
        //生成你的scheme你也可以选择外部传入
        var localUrl = this.createScheme(url,options,isLink);
        var iframe = Laya.Browser.document.createElement('iframe');
        iframe.style.display = 'none';
        Laya.Browser.document.body.appendChild(iframe);
        if(Tool.isIos()){
            //ios9拥有universal link
            if(Tool.isIOS9()){
                localUrl = this.createScheme(isLink,{type:1,id:"sdsdewe2122"},true);
                Laya.Browser.window.location.href = localUrl;
                return;
            }
            //跳转链接
            Laya.Browser.window.location.href = localUrl;
            var loadDateTime = Date.now();
            Laya.timer.once(25,null,function(loadDateTime,downUrl){
                var timeOutDateTime = Date.now();
                if (timeOutDateTime - loadDateTime < 1000) {
                    Laya.Browser.window.location.href = downUrl;
                }
            },[loadDateTime,downUrl]);
        }else if(Tool.isAndroid()){
            if (Tool.isChrome()) {
                Laya.Browser.window.location.href = localUrl;
            } else {
                iframe.src = localUrl;
            }
            Laya.timer.once(500,null,function(downUrl){
                Laya.Browser.window.location.href = downUrl;
            },[downUrl]);
        }else{
            iframe.src = localUrl;
            Laya.timer.once(500,null,function(downUrl){
                Laya.Browser.window.location.href = downUrl;
            },[downUrl]);
        }
    }

    _proto_.downloadFile = function(src){
        
        /*var iframe = document.createElement('iframe');
        iframe.id = "download";
        iframe.style.display = 'none';
        iframe.src = "javascript: '<script>location.href=\"" + src + "\"<\/script>'";
        document.getElementsByTagName('body')[0].appendChild(iframe);*/

        /*var form = document.createElement('form');
        form.action = src;
        document.getElementsByTagName('body')[0].appendChild(form);
        form.submit();*/

        //var date = new Date().getMilliseconds();
        //window.saveAs(src,date + ".mp4");

        //window.open(src);

        //window.download(src,"test.mp4","video/mp4");

        /*var x=new XMLHttpRequest();
        x.open("GET", src, true);
        x.responseType = 'blob';
        x.onload=function(e){
            Tool.log(x.response);
            download(x.response, "test.mp4", "video/mp4" );
        }
        x.send();*/
        


    }
    
    return DisUtil;
}());