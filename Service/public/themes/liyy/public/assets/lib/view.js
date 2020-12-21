/**

 @Name锛歭ayuiAdmin 瑙嗗浘妯″潡
 @Author锛氳搐蹇�
 @Site锛歨ttp://www.layui.com/admin/
 @License锛歀PPL

 */

layui.define(['laytpl', 'layer'], function(exports){
    var $ = layui.jquery
        ,laytpl = layui.laytpl
        ,layer = layui.layer
        ,setter = layui.setter
        ,device = layui.device()
        ,hint = layui.hint()

        //瀵瑰鎺ュ彛
        ,view = function(id){
            return new Class(id);
        }

        ,SHOW = 'layui-show', LAY_BODY = 'LAY_app_body'

        //鏋勯€犲櫒
        ,Class = function(id){
            this.id = id;
            this.container = $('#'+(id || LAY_BODY));
        };

    //鍔犺浇涓�
    view.loading = function(elem){
        elem.append(
            this.elemLoad = $('<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon layui-icon-loading layadmin-loading"></i>')
        );
    };

    //绉婚櫎鍔犺浇
    view.removeLoad = function(){
        this.elemLoad && this.elemLoad.remove();
    };

    //娓呴櫎 token锛屽苟璺宠浆鍒扮櫥鍏ラ〉
    view.exit = function(callback){
        //娓呯┖鏈湴璁板綍鐨� token
        layui.data(setter.tableName, {
            key: setter.request.tokenName
            ,remove: true
        });

        //璺宠浆鍒扮櫥鍏ラ〉
        //location.hash = '/user/login';
        callback && callback();
    };

    //Ajax璇锋眰
    view.req = function(options){
        var that = this
            ,success = options.success
            ,error = options.error
            ,request = setter.request
            ,response = setter.response
            ,debug = function(){
            return setter.debug
                ? '<br><cite>URL锛�</cite>' + options.url
                : '';
        };

        options.data = options.data || {};
        options.headers = options.headers || {};

        if(request.tokenName){
            var sendData = typeof options.data === 'string'
                ? JSON.parse(options.data)
                : options.data;

            //鑷姩缁欏弬鏁颁紶鍏ラ粯璁� token
            options.data[request.tokenName] = request.tokenName in sendData
                ?  options.data[request.tokenName]
                : (layui.data(setter.tableName)[request.tokenName] || '');

            //鑷姩缁� Request Headers 浼犲叆 token
            options.headers[request.tokenName] = request.tokenName in options.headers
                ?  options.headers[request.tokenName]
                : (layui.data(setter.tableName)[request.tokenName] || '');
        }

        delete options.success;
        delete options.error;

        return $.ajax($.extend({
            type: 'get'
            ,dataType: 'json'
            ,success: function(res){
                var statusCode = response.statusCode;

                //鍙湁 response 鐨� code 涓€鍒囨甯告墠鎵ц done
                if(res[response.statusName] == statusCode.ok) {
                    typeof options.done === 'function' && options.done(res);
                }

                //鐧诲綍鐘舵€佸け鏁堬紝娓呴櫎鏈湴 access_token锛屽苟寮哄埗璺宠浆鍒扮櫥鍏ラ〉
                else if(res[response.statusName] == statusCode.logout){
                    view.exit();
                }

                //鍏跺畠寮傚父
                else {
                    var errorText = [
                        '<cite>Error锛�</cite> ' + (res[response.msgName] || '杩斿洖鐘舵€佺爜寮傚父')
                        ,debug()
                    ].join('');
                    view.error(errorText);
                }

                //鍙 http 鐘舵€佺爜姝ｅ父锛屾棤璁� response 鐨� code 鏄惁姝ｅ父閮芥墽琛� success
                typeof success === 'function' && success(res);
            }
            ,error: function(e, code){
                var errorText = [
                    '璇锋眰寮傚父锛岃閲嶈瘯<br><cite>閿欒淇℃伅锛�</cite>'+ code
                    ,debug()
                ].join('');
                view.error(errorText);

                typeof error === 'function' && error(res);
            }
        }, options));
    };

    //寮圭獥
    view.popup = function(options){
        var success = options.success
            ,skin = options.skin;

        delete options.success;
        delete options.skin;

        return layer.open($.extend({
            type: 1
            ,title: '鎻愮ず'
            ,content: ''
            ,id: 'LAY-system-view-popup'
            ,skin: 'layui-layer-admin' + (skin ? ' ' + skin : '')
            ,shadeClose: true
            ,closeBtn: false
            ,success: function(layero, index){
                var elemClose = $('<i class="layui-icon" close>&#x1006;</i>');
                layero.append(elemClose);
                elemClose.on('click', function(){
                    layer.close(index);
                });
                typeof success === 'function' && success.apply(this, arguments);
            }
        }, options))
    };

    //寮傚父鎻愮ず
    view.error = function(content, options){
        return view.popup($.extend({
            content: content
            ,maxWidth: 300
            //,shade: 0.01
            ,offset: 't'
            ,anim: 6
            ,id: 'LAY_adminError'
        }, options))
    };


    //璇锋眰妯℃澘鏂囦欢娓叉煋
    Class.prototype.render = function(views, params){
        var that = this, router = layui.router();
        views = setter.views + views + setter.engine;

        $('#'+ LAY_BODY).children('.layadmin-loading').remove();
        view.loading(that.container); //loading

        //璇锋眰妯℃澘
        $.ajax({
            url: views
            ,type: 'get'
            ,dataType: 'html'
            ,data: {
                v: layui.cache.version
            }
            ,success: function(html){
                html = '<div>' + html + '</div>';

                var elemTitle = $(html).find('title')
                    ,title = elemTitle.text() || (html.match(/\<title\>([\s\S]*)\<\/title>/)||[])[1];

                var res = {
                    title: title
                    ,body: html
                };

                elemTitle.remove();
                that.params = params || {}; //鑾峰彇鍙傛暟

                if(that.then){
                    that.then(res);
                    delete that.then;
                }

                that.parse(html);
                view.removeLoad();

                if(that.done){
                    that.done(res);
                    delete that.done;
                }

            }
            ,error: function(e){
                view.removeLoad();

                if(that.render.isError){
                    return view.error('璇锋眰瑙嗗浘鏂囦欢寮傚父锛岀姸鎬侊細'+ e.status);
                };

                if(e.status === 404){
                    that.render('template/tips/404');
                } else {
                    that.render('template/tips/error');
                }

                that.render.isError = true;
            }
        });
        return that;
    };

    //瑙ｆ瀽妯℃澘
    Class.prototype.parse = function(html, refresh, callback){
        var that = this
            ,isScriptTpl = typeof html === 'object' //鏄惁妯℃澘鍏冪礌
            ,elem = isScriptTpl ? html : $(html)
            ,elemTemp = isScriptTpl ? html : elem.find('*[template]')
            ,fn = function(options){
            var tpl = laytpl(options.dataElem.html())
                ,res = $.extend({
                params: router.params
            }, options.res);

            options.dataElem.after(tpl.render(res));
            typeof callback === 'function' && callback();

            try {
                options.done && new Function('d', options.done)(res);
            } catch(e){
                console.error(options.dataElem[0], '\n瀛樺湪閿欒鍥炶皟鑴氭湰\n\n', e)
            }
        }
            ,router = layui.router();

        elem.find('title').remove();
        that.container[refresh ? 'after' : 'html'](elem.children());

        router.params = that.params || {};

        //閬嶅巻妯℃澘鍖哄潡
        for(var i = elemTemp.length; i > 0; i--){
            (function(){
                var dataElem = elemTemp.eq(i - 1)
                    ,layDone = dataElem.attr('lay-done') || dataElem.attr('lay-then') //鑾峰彇鍥炶皟
                    ,url = laytpl(dataElem.attr('lay-url')|| '').render(router) //鎺ュ彛 url
                    ,data = laytpl(dataElem.attr('lay-data')|| '').render(router) //鎺ュ彛鍙傛暟
                    ,headers = laytpl(dataElem.attr('lay-headers')|| '').render(router); //鎺ュ彛璇锋眰鐨勫ご淇℃伅

                try {
                    data = new Function('return '+ data + ';')();
                } catch(e) {
                    hint.error('lay-data: ' + e.message);
                    data = {};
                };

                try {
                    headers = new Function('return '+ headers + ';')();
                } catch(e) {
                    hint.error('lay-headers: ' + e.message);
                    headers = headers || {}
                };

                if(url){
                    view.req({
                        type: dataElem.attr('lay-type') || 'get'
                        ,url: url
                        ,data: data
                        ,dataType: 'json'
                        ,headers: headers
                        ,success: function(res){
                            fn({
                                dataElem: dataElem
                                ,res: res
                                ,done: layDone
                            });
                        }
                    });
                } else {
                    fn({
                        dataElem: dataElem
                        ,done: layDone
                    });
                }
            }());
        }

        return that;
    };

    //鑷姩娓叉煋鏁版嵁妯℃澘
    Class.prototype.autoRender = function(id, callback){
        var that = this;
        $(id || 'body').find('*[template]').each(function(index, item){
            var othis = $(this);
            that.container = othis;
            that.parse(othis, 'refresh');
        });
    };

    //鐩存帴娓叉煋瀛楃
    Class.prototype.send = function(views, data){
        var tpl = laytpl(views || this.container.html()).render(data || {});
        this.container.html(tpl);
        return this;
    };

    //灞€閮ㄥ埛鏂版ā鏉�
    Class.prototype.refresh = function(callback){
        var that = this
            ,next = that.container.next()
            ,templateid = next.attr('lay-templateid');

        if(that.id != templateid) return that;

        that.parse(that.container, 'refresh', function(){
            that.container.siblings('[lay-templateid="'+ that.id +'"]:last').remove();
            typeof callback === 'function' && callback();
        });

        return that;
    };

    //瑙嗗浘璇锋眰鎴愬姛鍚庣殑鍥炶皟
    Class.prototype.then = function(callback){
        this.then = callback;
        return this;
    };

    //瑙嗗浘娓叉煋瀹屾瘯鍚庣殑鍥炶皟
    Class.prototype.done = function(callback){
        this.done = callback;
        return this;
    };

    //瀵瑰鎺ュ彛
    exports('view', view);
});