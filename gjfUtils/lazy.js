function lazyLoad(defaultImg) {
    var imgs = document.querySelectorAll("[data-lazy]");
    imgs = Array.from(imgs);
    setDefault();

    loadImgs();

    //滚动条事件
    var timer;
    function onChange() {
        //防抖
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            loadImgs();
        }, 500);
    }
    document.body.onscroll = function () {
        //防抖
        onChange();
    }

    window.onresize = function(){
        onChange();
    }

    /**
     * 设置默认图片
     */
    function setDefault() {
        if (!defaultImg) {
            return;
        }
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            img.src = defaultImg;
        }
    }

    /**
     * 加载图片
     */
    function loadImgs() {
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (loadOneImg(img)) {
                i--; // ?因为下边切割了imgs数组，所以没有加载的图片少了一个，故i--
            }
        }
    }

    function loadOneImg(img) {
        // img.getBoundingClientRect();//返回dom对象的矩形区域，获取top，就是图片顶部距离窗口顶部的距离其实就是offsetTop
        //垂直方向上，图片是否在可见区域
        var imgTop = img.offsetTop; //图片垂直偏移量
        //滚动距离
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var offsetY = imgTop - scrollTop;//相对于视口的偏移量
        var height = parseInt(document.defaultView.getComputedStyle(img, null).height);//document.defaultView就是window对象，得到当前图片的高度
        if (isNaN(height)) {
            // parseInt(undefined) === NaN;
            height = 0;
        }
        if (offsetY + height <= 0) {
            // 在可视区的上边，不加载（top值加上自身高度值还在可视区上边，说明整个图片都不在可视区域内）
            // 或者可以计算图片的底部还在视口的上边（即小于等于0）
            return false;
        }
        if (offsetY >= window.innerHeight) {
            // 在可视区的下边，不加载（top高度比屏幕高度还大，说明完全看不见也不在可视区域内）
            return false;
        }
        var index = imgs.lastIndexOf(img);//?获取该img在整个图片dom数组集合中的下标.
        // MDN:lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
        imgs.splice(index, 1);//加载一个，数组里边切割掉一个。被加载过后的划√了
        //加载图片，把data-src给了src即可
        img.src = img.dataset.src;
        img.onload = function(){
            
            if(img.dataset.original){//？对于超大图片，先设置为小图片data-src的值，再更改为大图、即：data-original的数据
                setTimeout(() => {
                    img.src = img.dataset.original;
                    img.onload = null;
                }, 2000);
            }
        }

        return true;
    }
}