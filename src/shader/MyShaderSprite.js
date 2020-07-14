var MyShaderSprite = (function(_super){

    function MyShaderSprite(){
        MyShaderSprite.super(this);
        this.init();
    }
    Laya.class(MyShaderSprite, "src.shader.MyShaderSprite",_super);
	var _proto_ = MyShaderSprite.prototype;

    _proto_.init = function(){

        this.myShader = new MyShader();
        this.shaderValue = new MyShaderValue();

        /** 顶点缓冲区 */
        this.vBuffer = null;
        /** 片元缓冲区。      */
        this.iBuffer = null;
        this.vbData = null;
        this.ibData = null;
        this.iNum = 0;
    }

    _proto_.initTexture = function(texture,vertexBuffer,indexBuffer){

        this.vBuffer = Laya.VertexBuffer2D.create();
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array([]);
        var vbArray = [];
        var ibArray = [];
        if (vertexBuffer) {
            vbArray = vertexBuffer;
        }else {
            vbArray = [];
            var texWidth = texture.width;
            var texHeight = texture.height;
            //定义颜色值，取值范围0~1浮点
            var red = 1;
            var greed = 1;
            var blue = 1;
            var alpha = 1;
            //在顶点数组中放入4个顶点
            //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
            vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
            vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
        }


        if(indexBuffer){
            ibArray = indexBuffer;
        }else{
            ibArray = [];
            //在顶点索引数组中放入组成三角形的顶点索引
            //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
            ibArray.push(0,1,3);//从第一个三角形的顶点索引
            //ibArray.push(3,1,2);第二个三角形的顶点索引
        }

        this.iNum = ibArray.length;
        this.vbData = new Float32Array(vbArray);
        this.ibData = new Uint16Array(ibArray);
        this.vBuffer.append(this.vbData);
        this.iBuffer.append(this.ibData);
        //value
        this.shaderValue.textureHost = texture;
        this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
    }

    //重写渲染函数
    _proto_.customRender = function(context,x,y){
        //console.log("11122222222222222222222222");
        context.ctx.setIBVB(x,y,this.iBuffer,this.vBuffer,this.iNum,null,this.myShader,this.shaderValue,0,0);
    }

    _proto_.clearShader = function(){
        
        this.myShader.destroy();
        this.shaderValue.destroy();
    }

    return MyShaderSprite;
}(Laya.Sprite));