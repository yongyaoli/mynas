<?php /*a:2:{s:87:"D:\phpstudy_pro\WWW\linjumeng\public/themes/admin_simpleboot3/portal\admin_tag\add.html";i:1605252377;s:80:"D:\phpstudy_pro\WWW\linjumeng\public/themes/admin_simpleboot3/public\header.html";i:1605252377;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- HTML5 shim for IE8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <![endif]-->


    <link href="/themes/admin_simpleboot3/public/assets/themes/<?php echo cmf_get_admin_style(); ?>/bootstrap.min.css" rel="stylesheet">
    <link href="/themes/admin_simpleboot3/public/assets/simpleboot3/css/simplebootadmin.css" rel="stylesheet">
    <link href="/static/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
        form .input-order {
            margin-bottom: 0px;
            padding: 0 2px;
            width: 42px;
            font-size: 12px;
        }

        form .input-order:focus {
            outline: none;
        }

        .table-actions {
            margin-top: 5px;
            margin-bottom: 5px;
            padding: 0px;
        }

        .table-list {
            margin-bottom: 0px;
        }

        .form-required {
            color: red;
        }
    </style>
    <script type="text/javascript">
        //全局变量
        var GV = {
            ROOT: "/",
            WEB_ROOT: "/",
            JS_ROOT: "static/js/",
            APP: '<?php echo app('request')->module(); ?>'/*当前应用名*/
        };
    </script>
    <script src="/themes/admin_simpleboot3/public/assets/js/jquery-1.10.2.min.js"></script>
    <script src="/static/js/wind.js"></script>
    <script src="/themes/admin_simpleboot3/public/assets/js/bootstrap.min.js"></script>
    <script>
        Wind.css('artDialog');
        Wind.css('layer');
        $(function () {
            $("[data-toggle='tooltip']").tooltip({
                container:'body',
                html:true,
            });
            $("li.dropdown").hover(function () {
                $(this).addClass("open");
            }, function () {
                $(this).removeClass("open");
            });
        });
    </script>
    <?php if(APP_DEBUG): ?>
        <style>
            #think_page_trace_open {
                z-index: 9999;
            }
        </style>
    <?php endif; ?>
</head>
<body>
<div class="wrap js-check-wrap">
	<ul class="nav nav-tabs">
		<li><a href="<?php echo url('AdminTag/index'); ?>"><?php echo lang('ADMIN_TAG_INDEX'); ?></a></li>
		<li class="active"><a href="<?php echo url('AdminTag/add'); ?>"><?php echo lang('ADMIN_TAG_ADD'); ?></a></li>
		<!--<li><a  href="<?php echo url('nav/edit'); ?>" ><?php echo lang('ADMIN_NAV_EDIT'); ?></a></li>-->
	</ul>
	<form method="post" class="form-horizontal js-ajax-form margin-top-20" action="<?php echo url('AdminTag/addPost'); ?>">

		<div class="form-group">
			<label class="col-sm-2 control-label"><span class="form-required">*</span>标签名称:</label>
			<div class="col-md-6 col-sm-10">
				<input type="text" class="form-control" name="name" value="">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">状态:</label>
			<div class="col-md-6 col-sm-10">
				<select name="status" class="form-control">
					<?php if(is_array($arrStatus) || $arrStatus instanceof \think\Collection || $arrStatus instanceof \think\Paginator): if( count($arrStatus)==0 ) : echo "" ;else: foreach($arrStatus as $k=>$vo): ?>
						<option value="<?php echo $k; ?>" ><?php echo $vo; ?></option>
					<?php endforeach; endif; else: echo "" ;endif; ?>
				</select>
			</div>
		</div>
		<div class="col-sm-offset-2 col-sm-10">
			<button type="submit" class="btn btn-primary js-ajax-submit"><?php echo lang("SAVE"); ?></button>
			<a class="btn btn-default" href="__URL__">返回</a>
		</div>
	</form>

</div>
<script src="/static/js/admin.js"></script>
</body>
</html>