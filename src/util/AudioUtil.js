/**
 * 音频类
 * @class AudioUtil
 * @constructor
 */

var AudioUtil = (function () {

    function AudioUtil() {
        AudioUtil.__super.call(this);

        this._isMute = false;
        this._isMuteBg = false;
        this._isMuteEffect = false;
        this._volumeBg = 1;
        this._volumeEffect = 1;

        this.initData();
        this.save();
    }

    Laya.class(AudioUtil, "src.util.AudioUtil", BaseClass);
    var _proto_ = AudioUtil.prototype;
    var _getset_ = Laya.getset;

    /**
     * 初始化数据
     */
    _proto_.initData = function(){
        
        /*var isMuteBg = Laya.LocalStorage.getItem("isMuteBg");
        this._isMuteBg = isMuteBg === "true" ? true : false;

        var isMuteEffect = Laya.LocalStorage.getItem("isMuteEffect");
        this._isMuteEffect = isMuteEffect === "true" ? true : false;

        var isMute = Laya.LocalStorage.getItem("isMute");
        this._isMute = isMute === "true" ? true : false;

        //音乐静音
        Laya.SoundManager.musicMuted = this.isMuteBg;
        //音效静音
        Laya.SoundManager.soundMuted = this.isMuteEffect;
        //都静音
        Laya.SoundManager.muted = this.isMute;*/

        var volumeBg = Laya.LocalStorage.getItem("volumeBg");
        this.volumeBg = volumeBg ? parseFloat(volumeBg) : 1;
        var volumeEffect = Laya.LocalStorage.getItem("volumeEffect");
        this.volumeEffect = volumeEffect ? parseFloat(volumeEffect) : 1;
        //声音
        Laya.SoundManager.musicVolume = this.volumeBg;
        Laya.SoundManager.soundVolume = this.volumeEffect;
        
        //监听音乐
        this.addMusicListener();
    }
     
    /**
     * 音乐监听,前后台切换
     */
    _proto_.addMusicListener = function(){
       
        var self = this;
        Laya.Browser.window.addEventListener("pause", function() {
            Config.isAppPause = true;
            //Laya.stage.renderingEnabled = false;
            self.stopAll();
            self.stopAllSound();
            self.save();
        });
        Laya.Browser.window.addEventListener("resume", function() {
            //Config.isAppPause = false;
            //Laya.stage.renderingEnabled = true;
            self.playMusic();
            self.save();
        });
    }

    /**
     * 播放音乐
     * @param {string} url 资源
     * @param {number} loops 次数
     * @param {function} complete 播放完成的回调函数
     * @param {number} startTime 起始时间(默认0)
     */
    _proto_.playMusic = function(url, loops, complete, startTime){
        
        url = "music/" + url + ".mp3";
        (loops === void 0) && (loops = 0);
        (complete === void 0) && (complete = null);
        (startTime === void 0) && (startTime = 0);
        Laya.SoundManager.playMusic(url, loops, complete, startTime);
    }
    
    /**
     * 播放音效
     * @param {string} url 资源
     * @param {number} loops 次数
     * @param {function} complete 播放完成的回调函数
     * @param {Object} soundClass 音效类对象
     * @param {number} startTime 起始时间(默认0)
     */
    _proto_.playSound = function(url, loops, complete, soundClass, startTime){
        if(this.volumeEffect == 0) return;
        if(Tool.isAndroid()) return;
        url = "music/" + url + ".mp3";
        (loops === void 0) && (loops = 1);
        (complete === void 0) && (complete = null);
        (soundClass === void 0) && (soundClass = null);
        (startTime === void 0) && (startTime = 0);
        Laya.SoundManager.playSound(url, loops, complete, soundClass, startTime);
    }

    /**
     * 关闭音乐
     */
    _proto_.closeMusic = function(_close){
        if(_close == 1){
            this.volumeBg = 0;
            //this.isMuteBg = true;
        }else{
            this.volumeBg = 1;
            //this.isMuteBg = false;
        }
        Laya.SoundManager.musicVolume = this.volumeBg;
        this.setMusicVolume(this.volumeBg);
        this.save();
    }

    /**
     * 关闭音效
     */
    _proto_.closeEffect = function(_close){
        if(_close == 1){
            this.volumeEffect = 0;
            //this.isMuteEffect = true;
        }else{
            this.volumeEffect = 1;
            //this.isMuteEffect = false;
        }
        Laya.SoundManager.soundVolume = this.volumeEffect;
        this.setSoundVolume(this.volumeEffect);
        this.save();
    }
    
    /**
     * 本地存储
     */
    _proto_.save = function(){
        //Laya.LocalStorage.setItem("isMute", this.isMute);
        //Laya.LocalStorage.setItem("isMuteBg", this.isMuteBg);
        //Laya.LocalStorage.setItem("isMuteEffect", this.isMuteEffect);
        Laya.LocalStorage.setItem("volumeBg", this.volumeBg);
        Laya.LocalStorage.setItem("volumeEffect", this.volumeEffect);
    }
    
    //设置
    _proto_.setMusicVolume = function(volume){
        Laya.SoundManager.setMusicVolume(volume);
    }
    _proto_.setSoundVolume = function(volume){
        Laya.SoundManager.setSoundVolume(volume);
    }
    _proto_.stopAll = function(){
        Laya.SoundManager.stopAll();
    }
    _proto_.stopAllSound = function(){
        Laya.SoundManager.stopAllSound();
    }
    _proto_.stopMusic = function(){
        Laya.SoundManager.stopMusic();
    }
    _proto_.stopSound = function(url){
        Laya.SoundManager.stopSound(url);
    }

    return AudioUtil;
}());
