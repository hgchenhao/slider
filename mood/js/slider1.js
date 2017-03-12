/**
 * Created by Administrator on 2017/3/2.
 */

function Slider(o) {
    var i = 0;
    var timer = null;
    var pre = o.pre;   //上一张
    var next = o.next;  //下一张
    var img = o.img;
    var imgImg = o.imgImg;
    var imgWrap = o.imgLi; //图片里面的Li
    var num = o.num;//  圆点的容器
    var numLi;// 原点的Li元素
    var picNum = o.picNum;//下标的数字
    var bNum = o.bNum;//下标总数字
    for (var j = 0; j < imgWrap.length; j++) {  //创建圆点
        num.append('<li></li>')
    }
    numLi = num.find("li");
    bNum.html(imgWrap.length);
    numLi.first().addClass('active'); //给第一个圆点添加样式
    var firstimg = imgWrap.first().clone(); //复制第一张图片
    img.append(firstimg).width((imgWrap.length + 1) * (imgImg.width())); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度
    //判断左右滑动切换
    img.on("touchstart", function (e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX;
//                            e.stopPropagation();
        return false;
    });
    img.on("touchend", function (e) {
//                            e.preventDefault();
//                            e.stopPropagation();
        moveEndX = e.originalEvent.changedTouches[0].pageX,
            X = moveEndX - startX;
        if (X > 0) {
            clearInterval(timer);
            fn2(); //向右滚动了
        }
        else if (X < 0) {
            clearInterval(timer);
            fn()
        }
        return false;
    });


    //定时器自动播放
    timer = setInterval(function () {
        fn()
    }, 3000);
    pre.click(function () {
        fn2()
    });
    next.click(function () {
        fn()
    });
    function fn() {    //向右滚动了
        i++;
        if (i == imgWrap.length + 1) {
            i = 1;
            img.css({left: 0});
        }
        img.stop().animate({left: -i * imgImg.width()}, 300);
        if (i == imgWrap.length) {   //设置小圆点指示
            numLi.eq(0).addClass('active').siblings().removeClass('active');
            picNum.html(1)
        } else {
            numLi.eq(i).addClass('active').siblings().removeClass('active');
            picNum.html(i + 1)
        }
    }
    function fn2() {   //向左滚动了
        i--;
        if (i == -1) {
            img.css({left: -(imgWrap.length) * imgImg.width()});
            i = imgWrap.length - 1;
        }
        img.stop().animate({left: -i * imgImg.width()}, 300);
        numLi.eq(i).addClass('active').siblings().removeClass('active');
        picNum.html(i + 1)
    }
};

