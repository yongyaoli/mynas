/**

 @Name：layuiAdmin 主页控制台
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：GPL-2

 */


layui.define(function (exports) {

    /*
      下面通过 layui.use 分段加载不同的模块，实现不同区域的同时渲染，从而保证视图的快速呈现
    */


    //区块轮播切换
    layui.use(['admin', 'carousel', 'laypage'], function () {
        var $ = layui.$
            , admin = layui.admin
            , carousel = layui.carousel
            , element = layui.element
            , laypage = layui.laypage
            , device = layui.device();

        var user = JSON.parse($("#user").val());
        //alert(JSON.stringify(user.langId));
        //执行一个laypage实例

        getajax(1);
        getFAQ(1);
        //公告AJAX
        function getajax(data){
            $("#gonggao").empty(); //清空数据
            $.ajax({
                url: '/affiliate/article_list_data?limit=4&page='+data+'&type=1',
                type: 'get',
                //data: formdata,
                dataType: 'json',
                success: function (res) {
                    //alert(JSON.stringify(res));
                    if (res.code == 0) {
                        var  gonggao = res.data;
                        var lists='';
                        //循环
                        for (var i=0; i<gonggao.length;i++){
                            if (user.langId == 26){
                                lists += '<div class="layui-colla-item">\n' +
                                    '    <h2 class="layui-colla-title">'+gonggao[i].title+'</h2>\n' +
                                    '    <div class="layui-colla-content">'+gonggao[i].content+'</div>\n' +
                                    '  </div>';
                            }else {
                                lists += '<div class="layui-colla-item">\n' +
                                    '    <h2 class="layui-colla-title">'+gonggao[i].title_en+'</h2>\n' +
                                    '    <div class="layui-colla-content">'+gonggao[i].content_en+'</div>\n' +
                                    '  </div>';
                            }

                        }
                        $("#gonggao").append(lists);  //遍历国家下拉框
                        element.render('collapse');
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'demo2' //注意，这里的 test1 是 ID，不用加 # 号
                            ,count: res.count //数据总数，从服务端得到
                            ,theme: '#1E9FFF'
                            ,curr: data || 1
                            ,groups:5
                            ,prev:'Last'
                            ,next:'Next'
                            ,limit:4
                            ,jump: function(obj,first) {
                                //obj包含了当前分页的所有参数，比如：
                                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                console.log(obj.limit); //得到每页显示的条数
                                //alert(JSON.stringify(obj));

                                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                    getajax(obj.curr);
                                }

                            }
                        });
                    }
                },
                error: function (res) {

                }

            });
        }

        //公告AJAX
        function getFAQ(data){
            $("#FAQlist").empty(); //清空数据
            $.ajax({
                url: '/affiliate/article_list_data?limit=6&page='+data+'&type=2',
                type: 'get',
                //data: formdata,
                dataType: 'json',
                success: function (res) {
                    //alert(JSON.stringify(res));
                    if (res.code == 0) {
                        var faq = res.data;
                        var faqlists='';
                        //循环
                        for (var i=0; i<faq.length;i++){
                            if (user.langId == 26){
                                faqlists += '<div class="layui-colla-item">\n' +
                                    '    <h2 class="layui-colla-title">'+faq[i].title+'</h2>\n' +
                                    '    <div class="layui-colla-content">'+faq[i].content+'</div>\n' +
                                    '  </div>';
                            }else {
                                faqlists += '<div class="layui-colla-item">\n' +
                                    '    <h2 class="layui-colla-title">'+faq[i].title_en+'</h2>\n' +
                                    '    <div class="layui-colla-content">'+faq[i].content_en+'</div>\n' +
                                    '  </div>';
                            }

                        }
                        //alert(JSON.stringify(faqlists));
                        $("#FAQlist").append(faqlists);  //遍历国家下拉框
                        element.render('collapse');
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'demo1' //注意，这里的 test1 是 ID，不用加 # 号
                            ,count: res.count //数据总数，从服务端得到
                            ,theme: '#1E9FFF'
                            ,curr: data || 1
                            ,groups:5
                            ,prev:'Last'
                            ,next:'Next'
                            ,limit:6
                            ,jump: function(obj,first) {
                                //obj包含了当前分页的所有参数，比如：
                                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                console.log(obj.limit); //得到每页显示的条数
                                //alert(JSON.stringify(obj));

                                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                    getFAQ(obj.curr);
                                }

                            }
                        });
                    }
                },
                error: function (res) {

                }

            });
        }

        //轮播切换
        $('.layadmin-carousel').each(function () {
            var othis = $(this);
            carousel.render({
                elem: this
                , width: '100%'
                , arrow: 'none'
                , interval: othis.data('interval')
                , autoplay: othis.data('autoplay') === true
                , trigger: (device.ios || device.android) ? 'click' : 'hover'
                , anim: othis.data('anim')
            });
        });

        element.render('progress');



    });

    //数据概览
    layui.use(['admin', 'carousel', 'echarts'], function () {
        var $ = layui.$
            , admin = layui.admin
            , carousel = layui.carousel
            , echarts = layui.echarts;

        $.ajax({
            url: '/affiliate/console_chart',
            type: 'get',
            // 设置的是请求参数
            // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
            dataType: 'json',
            success: function (res) {
                //alert(JSON.stringify(res));
                if (res) {
                    var echartsApp = [],
                        options = [
                            //今日流量趋势
                            {
                                title: {
                                    text: "Traffic trend of the month",
                                    x: 'center',
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data: ['', '']
                                },
                                xAxis: [{
                                    type: 'category',
                                    boundaryGap: false,
                                    data: res.dates
                                }],
                                yAxis: [{
                                    type: 'value'
                                }],
                                series: [{
                                    name: "Click",
                                    type: 'line',
                                    smooth: true,
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    data: res.clicks
                                }, {
                                    name: "Complete",
                                    type: 'line',
                                    smooth: true,
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    data: res.completes
                                }]
                            }
                        ]
                        , elemDataView = $('#LAY-index-dataview').children('div')
                        , renderDataView = function (index) {
                            echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
                            echartsApp[index].setOption(options[index]);
                            //window.onresize = echartsApp[index].resize;
                            echartsApp[index].resize();
                        };


                    //没找到DOM，终止执行
                    if (!elemDataView[0]) return;
                    renderDataView(0);
                } else {

                }
            },
            error: function (res) {

            }

        });

        //监听侧边伸缩
        layui.admin.on('side', function () {
            setTimeout(function () {
                renderDataView(carouselIndex);
            }, 300);
        });

        //监听路由
        layui.admin.on('hash(tab)', function () {
            layui.router().path.join('') || renderDataView(carouselIndex);
        });
    });


    exports('console', {})
});
