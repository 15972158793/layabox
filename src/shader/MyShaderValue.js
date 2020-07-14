var MyShaderValue = (function(_super){

    function MyShaderValue(){
        MyShaderValue.__super.call(this,0,0);
        var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        this.position = [2,Laya.WebGLContext.FLOAT,false,_vlen,0];
        this.texcoord = [2,Laya.WebGLContext.FLOAT,false,_vlen,2*Laya.CONST3D2D.BYTES_PE];
        this.color = [4,Laya.WebGLContext.FLOAT,false,_vlen,4*Laya.CONST3D2D.BYTES_PE];
        
        this.init();
    }
    Laya.class(MyShaderValue, "src.shader.MyShaderValue",_super);
	var _proto_ = MyShaderValue.prototype;

    _proto_.init = function(){
        
        
    }

    return MyShaderValue;
}(Laya.Value2D));