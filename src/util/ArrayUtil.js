/**
 * 数组
 * @class ArrayUtil
 * @constructor
 */
var ArrayUtil = (function () {

    function ArrayUtil() {
        ArrayUtil.__super.call(this);
    }

    /**
     * []可以toString()转字符串,也就可以转number,即可参与比较
     * {}无法直接转字符串,所以无法参与比较
     */

    Laya.class(ArrayUtil, "src.util.ArrayUtil", BaseClass);
    var _proto_ = ArrayUtil.prototype;

    /**
     * 遍历操作，目前浏览器基本上支持es6 数组自带forEach方法
     * @param arr  {Array}
     * @param callback {function}
     * @param thisObj {any}
     */
    _proto_.forEach = function(arr, callback, thisObj) {
        for (var i = 0, len = arr.length; i < len; i++) {
            callback.apply(thisObj, [arr[i], i]);
        }
    }

    /**
     * 打乱数组中的元素
     * @param {Array} arr
     */
    _proto_.upset = function(arr){
        var len = arr.length;
        var index;
        var tmp;
        for(var i=len-1; i >= 0; i--) {
            index = (Math.random() * i)|0;
            tmp = arr[i];
            arr[i] = arr[index];
            arr[index] = tmp;
        }
    }

    /**
     * 判断是否有重复
     * @param {Array} arr 数组
     * @return {boolean} 是否有重复
     */
    _proto_.isRepeat = function (arr) {
        //存储之前的key值
        var hash = {};
        for(var i in arr) {
            if(hash[arr[i]]) {
                return true;
            }
            hash[arr[i]] = true;
        }
        return false;
    }

    /**
     * 判断2个数组是否值相等
     * @param {Array} arr1
     * @param {Array} arr2
     * @return {boolean} 判断值相等
     */
    _proto_.isEqualArr = function(arr1,arr2){
        return arr1.sort().toString() == arr2.sort().toString();
    }

    /**
     * string数组转number数组
     */
    _proto_.str2NumArr = function(_strArr){
        for(var k = 0;k < _strArr.length;k++){
            _strArr[k] = parseInt(_strArr[k]);
        }
        return _strArr;
    }

    /**
     * 挑选出所有大于某个数的数组
     * @param {Array} arr 数组源
     * @param {number} num 目标值
     * @return {Array}
     */
    _proto_.getNewArray = function(arr,num){
        var newArr = [];
        for(var k = 0;k < arr.length;k++){
            if(arr[k] > num){
                newArr.push(arr[k]);
            }
        }
        return newArr;
    }

    /**
     * 根据数组排序计算原始索引  大到小
     * @param {Array} 数组源
     */
    _proto_.getOrignIndexs = function(_arr){
        //1.根据数组构建新的数据结构
        var s = [];
        for(var k = 0;k < _arr.length;k++){
            s.push({
                "index":k,
                "v":_arr[k]
            });
        }
        //2.排序
        s.sort(function(obj1,obj2){
            if(obj1.v < obj2.v){
               return -1;
            }else{
               return 1;
            }
        });
        //3.取出排名后对应的原始索引0-9
        var arr1 = [];
        for(var k = 0;k < s.length;k++){
           arr1.push(s[k].index);
        }
        return arr1;
    }

    /**
     * 构建升序堆
     * @for ComUtil
     * @param {Array} arr
     * @param {number} pos
     * @param {number} len
     */
    _proto_.adjustHeap = function(arr, pos, len){
        //保存当前节点
        var swap = arr[pos];      
        //定位到当前节点的左边的子节点
        var child = pos * 2 + 1;
        //递归遍历所有的子节点  
        while(child < len){       
            //判断当前节点是否有右节点，若右节点较大，就采用右节点和当前节点进行比较
            if(child + 1 < len && arr[child] < arr[child + 1]){
                child += 1;
            }
            //比较当前节点和最大的子节点，小于就交换，交换后将当前节点定位到子节点上
            if(arr[pos] < arr[child]){
                arr[pos] = arr[child];
                pos = child;
                child = pos * 2 + 1;
            }
            else{
                break;
            }
            arr[pos] = swap;
        }
    }

    /* 构建堆：
    * 满足：树中任一非叶子结点的关键字均不大于（或不小于）其左右孩子结点的关键字。
    * 实现：从最后一个拥有子节点的节点开始，将该节点和其他节点进行比较，将最大的数交换给该节点，
    *      交换后再依次向前节点进行相同的交换处理，直到构建出大顶堆。
    */
    /**
     * 堆的构建
     * @param {Array} arr
     */
    _proto_.buildHeap = function(arr){
        for(var i = Math.floor(arr.length/2)-1; i>=0; i--){  //构建大顶堆
            this.adjustHeap(arr, i, arr.length);
        }
    }

    /**
     * 堆排序
     * @param {Array} arr
     * @return {Array} 返回升序数组
     */
    _proto_.heapSort = function(arr){
        //构建堆
        this.buildHeap(arr);
        //从数组的尾部进行调整
        for(var i=arr.length-1; i > 0; i--){   
            //堆顶永远是最大的元素,将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
            var swap = arr[i];
            arr[i] = arr[0];
            arr[0] = swap;
            this.adjustHeap(arr, 0, i); //将最大的元素进行调整，将最大的元素调整到堆顶
        }
        return arr;
    }

    return ArrayUtil;
}());