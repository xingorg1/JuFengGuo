(function() {

    function Dropdown(options) {
        // 下拉列表要插入的位置
        this.wrap = options.wrap;
        // 下拉列表默认展示的按钮
        this.title = options.title;
        // 展示按钮点击跳转的地址
        this.titleHref = options.href || "";
        // 下拉列表数据
        this.menuList = options.menuList;
        // dl的宽度
        this.width = options.width;
        // 下拉列表的方向
        this.direction = options.direction || 'y';
        // 创建dom结构
        this.createDom();
        // 初始化样式
        this.initCss();
        // 绑定事件
        this.bindEvent();
    }

    Dropdown.prototype.createDom = function () {
        // 下拉列表的元素
        var dropDownDiv = $('<div class="dropdown"></div>');
        // 下拉列表添加class类名 用于样式设置
        if (this.direction == 'x') {
            dropDownDiv.addClass('direction-x');
        }
        // 添加每一个二级导航下面的dom结构
        for (var i = 0; i < this.menuList.length; i++) {
            // 二级分块
            var dl = $('<dl></dl>');
            // 添加标题
            if (this.menuList[i].title) {
                dl.append($('<dt>' + this.menuList[i].title +'</dt>'))
            }
            // 三级导航 dom结构
            var items = this.menuList[i].items;
            items.forEach(function(item) {
                dl.append($('<dd>' + item.name +'</dd>'))
            });
            dropDownDiv.append(dl);
        }
        // 插入到页面
        $(this.wrap).append($('<a class="my-drop-btn" href="' + this.titleHref +'">' + this.title +'</a>'))
                    .append(dropDownDiv);
    }
    // 初始化样式
    Dropdown.prototype.initCss = function () {
        $('.dropdown', $(this.wrap)).css({
            display: 'none',
        });
        $('.dropdown dl', this.wrap).css({
            width: (this.width + 10) * 2,
        })
        $('.dropdown > dl > dd', $(this.wrap)).css({
            width: this.width
        });
        $('.dropdown > dl > dt', $(this.wrap)).css({
            fontWeight: 700,
            color: '#666',
        });
        // 如果是横向排列的下拉列表则改变相应的样式
        if (this.direction == 'x') {
            console.log($(this.wrap).offset())
            $('.dropdown.direction-x', this.wrap).css({
                width: 1188,
                right: -80,
            });
            var self = this;
            $('.dropdown.direction-x > dl', this.wrap).each(function(i) {
                $(this).css({
                    width: self.menuList[i].width,
                    borderRight: '1px solid #eee',
                    margin: 10,
                    borderBottom: 'none',
                    float: 'left'
                }).find('dd').css({
                    width: self.menuList[i].itemWidth
                })
            })

        }
    }
    Dropdown.prototype.bindEvent = function() {
        // hover到指定按钮的时候显示当前下拉菜单 背景颜色修改
        $('.my-drop-btn').hover(function() {
            $(this).css({
                backgroundColor: '#fff',
                borderColor: '#eee',
                borderBottomColor: '#fff',
                position: 'relative',
                zIndex: 10
            });
            $(this).next('.dropdown').show();
        });
        // 鼠标移出的时候下拉菜单隐藏并且背景颜色变化
        $(this.wrap).hover(function(){

        }, function() {
            $(this).find('.dropdown').hide();
            $(this).find('.my-drop-btn').css({
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderBottomColor: 'transparent',
                position: 'relative',
                zIndex: 10
            });
        });
        // 鼠标移入三级导航时hover上去文字变色
        $('.dropdown', this.wrap).find('dd').hover(function() {
            $(this).css({
                color: 'red'
            });
        }, function() {
            $(this).css({
                color: '#999'
            })
        })
    }

    $.fn.extend({
        dropdown: function(options) {
            options.wrap = this;
            new Dropdown(options);
        } 
    })

} ())