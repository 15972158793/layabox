/**
 * 数学类
 * @class MathUtil
 * @constructor
 */
var MathUtil = (function () {

    function MathUtil() {
        MathUtil.__super.call(this);
    }

    Laya.class(MathUtil, "src.util.MathUtil", BaseClass);
    var _proto_ = MathUtil.prototype;

    /**
     * 弧度制转换为角度值
     * @param radian {number}
     * @returns {number}
     */
    _proto_.getAngle = function(radian) {
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制
     * @param angle {number}
     */
    _proto_.getRadian = function(angle) {
        return angle / 180 * Math.PI;
    }

    /**
     * 获取两点间弧度
     * @param p1 {Point}
     * @param p2 {Point}
     * @returns {number}
     */
    _proto_.getRadianTwoPoint = function(p1, p2) {
        var xdis = p2.x - p1.x;
        var ydis = p2.y - p1.y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间旋转角度（顺时针）
     * @param p1 {Point}
     * @param p2 {Point}
     * @returns {number}
     */
    _proto_.getAngleTwoPoint = function(p1, p2){
        var vy = p2.y - p1.y;
        var vx = p2.x - p1.x;
        var ang;

        if(vy == 0){
            if(vx < 0){
                return 180;
            }
            return 0;
        }
        
        if(vx == 0){ //正切是vy/vx所以vx==0排除
            if(vy > 0){
                ang = 90;
            }else if(vy < 0){
                ang = 270;
            }
            return ang;
        }

        ang = this.getAngle( Math.atan( Math.abs(vy)/Math.abs(vx) ) );
        if(vx > 0){
            if(vy < 0){
                ang = 360 - ang;
            }
        }else{
            if(vy > 0){
                ang = 180 - ang;
            }else{
                ang = 180 + ang;
            }
        }
        return ang;
    }

    /**
     * 获取两点间距离
     * @param p1 {Point}
     * @param p2 {Point}
     * @returns {number}
     */
    _proto_.getDistance = function(p1, p2) {
        var disX = p2.x - p1.x;
        var disY = p2.y - p1.y;
        var disQ = Math.pow(disX, 2) + Math.pow(disY, 2);
        return Math.sqrt(disQ);
    }

    /**
     * 精确到小数点后多少位（舍尾）
     * @param 精确值    {number}
     * @param 精确位数  {number}
     * */
    _proto_.exactCount = function (exactValue, count) {
        (count === void 0) && (count = 0);
        var num = Math.pow(10, count);
        var value = (exactValue * num) | 0;
        return value / num;
    };

    /**
     * [0-1]区间获取二次贝塞尔曲线点切线角度
     * @param p0起点      {Point}
     * @param p1控制点    {Point}
     * @param p2终点      {Point}
     * @param [0-1]区间   {number}
     * */
    _proto_.getBezierCutAngle = function (p0, p1, p2, t) {
        var _x = 2 * (p0.x * (t - 1) + p1.x * (1 - 2 * t) + p2.x * t);
        var _y = 2 * (p0.y * (t - 1) + p1.y * (1 - 2 * t) + p2.y * t);
        var angle = this.getAngle( Math.atan2(_y, _x) );
        return angle;
    };

    /**
     * [0-1]区间获取二次贝塞尔曲线上某点坐标
     * @param p0起点      {Point}
     * @param p1控制点    {Point}
     * @param p2终点      {Point}
     * @param [0-1]区间   {number}
     * @param 缓存的点对象，如不存在则生成新的点对象 {Point}
     * */
    _proto_.getBezierPoint = function (p0, p1, p2, t, point) {
        (point === void 0) && (point = new Laya.Point);
        point.x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
        point.y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
        return point;
    };

    /**
     * 四舍五入 保留2位小数,不足0补充
     * @param {number} num
     * @return {number} 返回2位小数的数
     */
    _proto_.keepDecimalNum = function(num) {
        var result = parseFloat(num);
        if (isNaN(result)){
            return num;
        }
        result = Math.round(num * 100) / 100;
        //转字符串处理
        var s_x = result.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
        pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return (s_x);
    }

    /**
     * 计算n的阶乘
     * @param {number} n
     */
    _proto_.calFactorNum = function(n){
        
        //计算提升
        var memo = {0:1,1:1};
        var shell = function(n){
            if(memo[n] == null){
                memo[n] = n * shell(n-1);
            }
            return memo[n];
        }
        return shell(n);
        /*if(n < 2){
            return 1;
        }else{
            return n * this.calFactorNum(n-1);
        }*/
    }

    /**
     * 斐波那契数列
     */
    _proto_.fibonacci = function(n){

        //提升计算
        var memo = {0:0,1:1};
        var shell = function(n){
            if(memo[n] == null){
                memo[n] = shell(n-1) + shell(n-2);
            }
            return memo[n];
        }
        return shell(n);
        //低性能的递归崩溃
        /*if(n < 2){
            return n;
        }else{
            return this.fibonacci(n -1)+ this.fibonacci(n -2);
        }*/
    }
   
    /**
     * 计算C10取2
     * @param {number} m
     * @param {number} k
     */
    _proto_.calCombNum = function(m,k){
        if(m < k){
           return 0;
        }else{
           return this.calFactorNum(m) / (this.calFactorNum(k) * this.calFactorNum(m-k));
        }
    }

    /**
     * 计算A n m的数组
     * @param {Array} arr  数组基数
     * @param {number} size  选取的个数
     * @param {Array} 返回排列的数组
     */
    _proto_.calFactorList = function(arr,size){
        if(size > arr.length){ return;}
        var allResult = [];
        (function(arr, size, result){
            if(result.length == size){
                allResult.push(result);
            }else{
                for(var i = 0 ,len = arr.length;i < len; i++){
                    var newArr = [].concat(arr),
                        curItem = newArr.splice(i,1);
                    arguments.callee(newArr, size, [].concat(result,curItem));
                }
            }
        })(arr, size, []);
        return allResult;
    }

    /**
     * 计算C n m的数组
     * @param {Array} arr  数组基数
     * @param {number} size  选取的个数
     * @param {Array} 返回组合的数组
     */
    _proto_.calCombList = function(arr,size){  
        var allResult = [];
        (function(arr, size, result){
            var arrLen = arr.length;
            if(size > arrLen)return;
            if(size == arrLen){
                allResult.push([].concat(result, arr));
            }else{
                for(var i =0 ; i < arrLen; i++){
                    var newResult = [].concat(result);
                    newResult.push(arr[i]);
                    if(size == 1){
                        allResult.push(newResult);
                    }else{
                        var newArr = [].concat(arr);
                        newArr.splice(0, i +　1);
                        arguments.callee(newArr, size - 1, newResult);
                    }
                }
            }
        })(arr, size, []);
        return allResult;
    }

    /**
     *C n m获取组合 基本算法
     * @param {Array}  _selfs  当前的组合[] 数组个数m
     * @param {Array}  _arr     所有组合的基值[] 数组个数n
     * @param {number} _indexs  当前的组合对应的基值的索引[]
     * @param {number} _where    当前排列组合循环的位置
     * @param {Array}  result    排列组合结果
     */
    _proto_.calNormalCombList = function(_selfs, _arr, _indexs,_where,result) {
        if (_selfs != null && _arr.length >= _selfs.length) {
            if (_where < _selfs.length - 1) { //非末位
                var index = _indexs[_where];
                if (index == _arr.length) { //非末位末尾
                    --_where;
                    if (_where == -1) { //首位超出
                        return;
                    } else {
                        _indexs[_where] = _indexs[_where] + 1;
                        for (var i = _where + 1; i < _selfs.length; i++) {
                            _indexs[i] = _indexs[i - 1] + 1;
                        }
                        this.calComb(_selfs, _arr, _indexs,_where,result);
                    }
                } else {
                    _selfs[_where] = _arr[index];
                    this.calComb(_selfs, _arr, _indexs,++_where,result);
                }
            } else { //末位
                var index = _indexs[_where];
                if (index == _arr.length) {  //直接末位末尾
                    --_where;
                    if (_where == -1) { //末位超出即 单关
                        return;
                    }
                    _indexs[_where] = _indexs[_where] + 1;
                    for (var i = _where + 1; i < _selfs.length; i++) {
                        _indexs[i] = _indexs[i - 1] + 1;
                    }
                    this.calComb(_selfs, _arr, _indexs,_where,result);
                } else {
                    _selfs[_where] = _arr[index];
                    //深拷贝
                    result.push(App.ComUtil.copy(_selfs));
                    var _nextIndex = _indexs[_where] + 1;
                    if (_nextIndex < _arr.length) {
                        _indexs[_where] = _nextIndex;
                        this.calComb(_selfs, _arr, _indexs,_where,result);
                    } else { //下一个末位末尾
                        --_where;
                        if (_where == -1) {
                            return;
                        }
                        _indexs[_where] = _indexs[_where] + 1;
                        for (var i = _where + 1; i < _selfs.length; i++) {
                            _indexs[i] = _indexs[i - 1] + 1;
                        }
                        this.calComb(_selfs, _arr, _indexs,_where,result);
                    }
                }
            }
        }
    }
    
    /**
     * 多个数组的所有组合
     * @param {Array} arr [arr1,arr2,arr3,...]
     * @return {Array} 返回一维数组的所有组合
     */
    _proto_.calArrComb = function(arr){
        var len = arr.length;
        // 当数组大于等于2个的时候
        if(len >= 2){
            // 第一个数组的长度
            var len1 = arr[0].length;
            // 第二个数组的长度
            var len2 = arr[1].length;
            // 2个数组产生的组合数
            var lenBoth = len1 * len2;
            //  申明一个新数组,做数据暂存
            var items = new Array(lenBoth);
            // 申明新数组的索引
            var index = 0;
            // 2层嵌套循环,将组合放到新数组中
            for(var i=0; i<len1; i++){
                for(var j=0; j<len2; j++){
                    items[index] = (arr[0][i] +","+ arr[1][j]).split(",");
                    index++;
                }
            }
            // 将新组合的数组并到原数组中
            var newArr = new Array(len-1);
            newArr[0] = items;
            for(var i=2;i<arr.length;i++) newArr[i-1] = arr[i];
            // 执行回调
            return this.calArrComb(newArr);
        }else{
            return arr[0];
        }
    }

    return MathUtil;
}());