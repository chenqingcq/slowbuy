//
$.noConflict();
jQuery(document).ready(function ($) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getindexmenu',
        success: function (data) {
            // console.log(data);
            // console.log(data.result[0].img);
            var str1 = template('banner-template', data);
            // console.log(str);
            $('nav > ul').html(str1);
            $('nav > ul').children('li.more').click(function () {
                console.log(1);
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getindexmenu',
                    success: function (data) {
                        console.log(data);
                        var str3 = template('banner-more-template', data);
                        console.log(str3);
                        var resStr = "";
                        resStr += str1;
                        resStr += str3;
                        $('nav>ul').html(resStr);
                        var count = 1;
                        $('nav > ul').children('li.more').click(function () {
                            console.log(1);
                            count++;
                            if (count % 2) {
                                $('nav > ul').children('li.click-more').stop().show();
                            } else {
                                $('nav > ul').children('li.click-more').stop().hide();
                            }
                            // $('nav > ul').children('li.more').nextAll('li').toggleClass('click-more');
                        })
                    }
                })
            })
        }
    })
    // 首页折扣列表

    $.ajax({
        url: 'http://139.199.192.48:9090/api/getmoneyctrl',
        success: function (data) {
            // console.log(data);
            var str2 = template('template-coudanping', data);
            // console.log(str2);
            $('ul.banner').html(str2);
        }
    })
    //点击回到顶部
    $('.foot-top').children('#to-Top').click(function () {
        $('body').scrollTop(0);
    })
})