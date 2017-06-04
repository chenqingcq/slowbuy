$(function () {
    //获取键值对
    function getUrlParam(key) {
        // 获取参数
        var url = window.location.search;
        console.log("/" + url + "/");
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }
    var id = getUrlParam('categoryid');
    var item = getUrlParam('category');
    console.log(item);
    $('.sec1 nav div.left').children('a.list-title3').html(item);
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getproductlist',
        data: 'categoryid=' + id,
        success: function (data) {
            console.log(data);
            var pagesize = data.pagesize;
            var totalCount = data.totalCount;
            var pageTotal = Math.ceil(totalCount / pagesize);
            console.log('一共' + pageTotal + '页');
            //调用模板 渲染内容部分
            var str = template('template-category-content', data);
            $('ul.product-content').html(str);
            //选者框的option个数
            var strSelect = '';
            for (var i = 1; i <= pageTotal; i++) {
                if (i == 1) {
                    strSelect += '<option value="" selected>' + i + '/' + pageTotal + '</option>';
                } else {
                    strSelect += '<option value="">' + i + '/' + pageTotal + '</option>';
                }
            }
            console.log(strSelect);
            $('#select-page').html(strSelect);
            //默认设置首页，点击下页翻转下页 currentPage++ 页面全部展示不能再点击跳转;
            //点击上页翻转上页 ，到第一页不能再点击 currentPage--；
            //设置初始页
            var currentPage = 1;

            //点击切换下页
            $('.select-page').children('span.right').click(function () {
                // console.log('下一页');
                if (currentPage < pageTotal) {
                    currentPage++;
                    console.log(currentPage);
                    $.ajax({
                        url: 'http://139.199.192.48:9090/api/getproductlist',
                        data: 'pageid=' + currentPage + '&&' + 'categoryid=' + id,
                        success: function (data) {
                            console.log('下一页的数据');
                            console.log(data);
                            var selectArr = template('template-category-content', data);
                            $('ul.product-content').html(selectArr);
                            //select的表单的内容跟着变动
                            $('#select-page').html('');
                            for (var i = 1; i <= pageTotal; i++) {
                                if (i == currentPage) {
                                    $('<option value=' + currentPage + '/' + pageTotal + ' selected>' + currentPage + '/' + pageTotal + '</option>').appendTo($(
                                        '#select-page'));
                                } else {
                                    $('<option value=' + i + '/' + pageTotal + '>' + i + '/' + pageTotal + '</option>').appendTo($(
                                        '#select-page'));
                                }
                            }
                        }
                    })
                } else {
                    currentPage == pageTotal;
                }
            });

            //点击切换上页
            $('.select-page').children('span.left').click(function () {
                // console.log('下一页');
                if (currentPage > 1) {
                    currentPage--;
                    console.log(currentPage);
                    $.ajax({
                        url: 'http://139.199.192.48:9090/api/getproductlist',
                        data: 'pageid=' + currentPage + '&&' + 'categoryid=' + id,
                        success: function (data) {
                            console.log('上一页的数据');
                            console.log(data);
                            var selectArr = template('template-category-content', data);
                            $('ul.product-content').html(selectArr);
                            //select的表单的内容跟着变动
                            $('#select-page').html('');
                            for (var i = 1; i <= pageTotal; i++) {
                                if (i == currentPage) {
                                    $('<option value=' + currentPage + '/' + pageTotal + ' selected>' + currentPage + '/' + pageTotal + '</option>').appendTo(
                                        '#select-page');
                                } else {
                                    $('<option value=' + i + '/' + pageTotal + '>' + i + '/' + pageTotal + '</option>').appendTo($(
                                        '#select-page'));
                                }
                            }
                        }
                    })
                } else {
                    currentPage == 1;
                }
            });
            //切换表单元素获取selected属性发送Ajax请求页面跟着改变
            $('#select-page').change(function () {
                pageid = $(this).children('option:selected').html();
                console.log(pageid);
                pageid.toString();
                // console.log(pageid);
                pageid = pageid.split('/');
                currentPage= Number(pageid[0]);
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getproductlist',
                    data: 'pageid=' + currentPage+ '&&' + 'categoryid=' + id,
                    success: function (data) {
                        console.log(data);
                        var currentArr = template('template-category-content',data);
                        // console.info(currentArr);
                        $('.product-content').html(currentArr);
                    }
                })
            })
        }
    })
    //点击回到顶部
    $('.foot-top').children('#to-Top').click(function () {
        $('body').scrollTop(0);
    })
})