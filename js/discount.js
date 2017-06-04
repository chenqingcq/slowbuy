$(function () {
    $('#to-Top').on('click', function () {
        $('.sec1-swiper-container').scrollTop(0);
    })

    var sec1Swiper = new Swiper('.sec1-swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        autoHeight: true,
    })
    //发ajax渲染Tab切换栏
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
        success: function (data) {
            console.log(data);
            //获取tab栏内容
            var rootpanigationArr = [];

            function getSlideAjax(index, pageid) {
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct?titleid=' + data.result[index].titleId,
                    success: function (data) {
                        console.log(data);
                        var disArr = template('discount-template', data);
                        // console.log(disArr);
                        $(pageid).html(disArr);
                    }
                });
            }
            for (var i = 0; i < data.result.length; i++) {
                rootpanigationArr.push(data.result[i].title)
                resArr = '';
                resArr += '<div class="swiper-slide">' +
                    '<ul id="page-' + (i + 1) + '></ul>' +
                    '</div>';
                $('.sec1-swiper-container >.swiper-wrapper ').html(resArr);
                getSlideAjax(i, "#page-" + (i + 1));
            }
            console.log(rootpanigationArr);
            //吊模板渲染页面

            var rootSwiper = new Swiper('.root-swiper-container', {
                // 如果需要分页器
                pagination: '#root-swiper-pagination',
                //分页点击换页
                paginationClickable: true,
                paginationBulletRender: function (swiper, index, className) {
                    return '<span class="' + className + '">' + "<a href='#'>" + rootpanigationArr[
                        index] + "</a>" + '</span>';
                },
                onSlideChangeEnd: function (swiper) {
                    rootSwiper.onResize();
                    console.info(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide;
                    // getAjax(swiper.activeIndex,$(this).)
                }
            });
        }
    })
})