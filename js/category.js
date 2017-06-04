$(function () {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcategorytitle',
        success: function (data) {
            console.log(data);
            var str = template('template-title', data);
            $('.category-title').html(str);
            $('ul.category-title').children('li').click(function () {
                var titleid = $(this).attr('titleId');
                var $this = $(this);
                // console.log(titleid);
                $.ajax({
                    url: "http://139.199.192.48:9090/api/getcategory",
                    data: 'titleid=' + titleid,
                    success: function (data) {
                        console.log(data);
                        var str1 = template('template-content', data);
                        // console.log($this);
                        // console.log($this.attr('titleid'));
                        $this.siblings('li').children('ul').html("");
                        $this.children('ul').html(str1);
                    }
                })
            });
        }
    })
    //点击回到顶部
    $('.foot-top').children('#to-Top').click(function () {
        $('body').scrollTop(0);
    })
})