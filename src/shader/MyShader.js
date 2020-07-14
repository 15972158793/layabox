var MyShader = (function(_super){

    function MyShader(){

        //顶点着色器程序
        var vs =   "attribute vec2 position;\
                    attribute vec2 texcoord;\
                    attribute vec4 color;\
                    uniform vec2 size;\
                    uniform mat4 mmat;\
                    varying vec2 v_texcoord;\
                    varying vec4 v_color;\
                    void main(){\
                        vec4 pos = mmat*vec4(position.x,position.y,0,1);\
                        gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);\
                        v_color = color;v_texcoord = texcoord;\
                    }";
        //片元着色器程序
        var ps = "precision mediump float;\
                  varying vec2 v_texcoord;\
                  varying vec4 v_color;\
                  uniform sampler2D texture;\
                  void main(){\
                      vec4 t_color = texture2D(texture, v_texcoord);\
                      gl_FragColor = t_color.rgba * v_color.rgba;\
                  }";

        /*var vs =   "attribute vec4 coords;\
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
                    }";*/
        
        MyShader.__super.call(this,vs, ps, "MyShader");
        this.init();
    }

    Laya.class(MyShader, "src.shader.MyShader",_super);
    var _proto_ = MyShader.prototype;
    _proto_.init = function(){
        
    }

    return MyShader;
}(Laya.Shader));