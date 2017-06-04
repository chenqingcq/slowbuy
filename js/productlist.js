$(function () {
    function getUrlParam(key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }
    //获取到的每一页商品的名称和ID
    var lisName = getUrlParam("category");
    var goodsId = getUrlParam("categoryid");




    $('.classify').html(lisName);
    // 三级菜单
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcategorybyid',
        data: {
            categoryid: goodsId
        },
        success: function (data) {
            var category = data.result[0].category
            var navStr = '';
            navStr += '<a href="index.html">首页&gt;</a>'
            navStr += '<a href="category.html">全部分类&gt;</a>'
            navStr += '<a class="classify" href="#">' + category + '</a>'
            $('.product-title').html(navStr);
        }
    })

    var pageid = 1;
    getData(pageid);

    //封装ajax
    function getData(pageid) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getproductlist',
            data: {
                //传入的商品分类ID和商品分类名称，页数不传默认第一页
                categoryid: goodsId,
                pageid: pageid
            },
            success: function (data) {
                var ee = template('templateTv', data);
                $('.product-list>ul').html(ee);
                //获取商品总数和当前页面显示的数量
                var totalCount = data.totalCount;
                var pagesize = data.pagesize;
                //总数除以当前页面显示数量，得到总页数
                var pageTotal = Math.ceil(totalCount / pagesize);
                //拼接字符串动态创建option的个数
                var strSelect = '';
                for (var i = 1; i <= pageTotal; i++) {
                    if (i == 1) {
                        strSelect += "<option value='" + i + "' selected>" + i + "/" + pageTotal +
                            "</option>";
                    } else {
                        strSelect += "<option value='" + i + "'>" + i + "/" + pageTotal +
                            "</option>";
                    }
                }
                //把拼接好的标签放到容器里
                $('#page').html(strSelect);
                //默认显示第一个
                $('.paging2>select>option').eq(pageid-1).attr('selected','selected');
                //判断pageid的值，等于1就禁用上一页的点击事件，移除下一页的禁用，等于3禁用下一页，移除上一页的禁用 
                if(pageid == 1){
                    $('.paging1').attr('disabled','disabled');
                    $('.paging3').removeAttr('disabled');
                }else if(pageid == 3){
                    $('.paging3').attr('disabled','disabled');
                    $('.paging1').removeAttr('disabled');
                }
            }
        })
    }

    $('.paging3').click(function(){
        pageid++;
        getData(pageid);
    })

    $('.paging1').click(function(){
        pageid--;
        getData(pageid);
    })

    
    $('.paging2>select').change(function(){
        pageid = $(this).val();
        getData(pageid);
    })
})