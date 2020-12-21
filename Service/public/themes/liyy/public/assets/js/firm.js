/**

 @Name: layuiNetCompany - 澶ф皵椋庢牸鐨勭綉缁滃叕鍙镐紒涓氭ā鐗�
 @Author: xuxingyu
 @Copyright: layui.com

 */

layui.define(['jquery', 'element', 'carousel', 'laypage', 'form'], function (exports) {
    var $ = layui.jquery
        , element = layui.element
        , carousel = layui.carousel
        , form = layui.form
        , laypage = layui.laypage;

    //杞挱娓叉煋
    carousel.render({
        elem: '#banner'
        , width: '100%'
        , height: '858px'
        , arrow: 'always'
    });

    //婊氬姩鐩戝惉
    $(window).scroll(function () {
        var scr = $(document).scrollTop();
        scr > 0 ? $(".nav").addClass('scroll') : $(".nav").removeClass('scroll');
    });

    //杞挱鏂囧瓧
    $(function () {
        $('.banner').children('.title').addClass('active');
    })

    //瀵艰埅鍒囨崲
    var btn = $('.nav').find('.nav-list').children('button')
        , spa = btn.children('span')
        , ul = $('.nav').find('.nav-list').children('.layui-nav');
    btn.on('click', function () {
        if (!$(spa[0]).hasClass('spa1')) {
            spa[0].className = 'spa1';
            spa[1].style.display = 'none';
            spa[2].className = 'spa3';
            $('.nav')[0].style.height = 90 + ul[0].offsetHeight + 'px';
        } else {
            spa[0].className = '';
            spa[1].style.display = 'block';
            spa[2].className = '';
            $('.nav')[0].style.height = 80 + 'px';
        }
    });

    //鍏充簬鍐呭
    $('.main-about').find('.aboutab').children('li').each(function (index) {
        $(this).on('click', function () {
            $(this).addClass('layui-this').siblings().removeClass('layui-this');
            $('.aboutab').siblings().fadeOut("fast");
            $('.aboutab').siblings().eq(index).fadeIn("");
        });
    });

    //鍔ㄦ€佸垎椤�
    laypage.render({
        elem: 'newsPage'
        , count: 50
        , theme: '#2db5a3'
        , layout: ['page', 'next']
    });

    //妗堜緥鍒嗛〉
    laypage.render({
        elem: 'casePage'
        , count: 50
        , theme: '#2db5a3'
        , layout: ['page', 'next']
    });

    //鏂伴椈瀛楁鎴彇
    $(function () {
        $(".main-news").find(".content").each(function () {
            var span = $(this).find(".detail").children("span")
                , spanTxt = span.html();
            if (document.body.clientWidth > 463) {
                span.html(spanTxt);
            } else {
                span.html(span.html().substring(0, 42) + '...')
            }
            ;
            $(window).resize(function () {
                if (document.body.clientWidth > 463) {
                    span.html(spanTxt);
                } else {
                    span.html(span.html().substring(0, 42) + '...')
                }
                ;
            });
        });
    });

    exports('firm', {});
});