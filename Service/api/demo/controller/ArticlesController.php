<?php
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2017 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: pl125 <xskjs888@163.com>
// +----------------------------------------------------------------------

namespace api\demo\controller;

use cmf\controller\RestBaseController;

class ArticlesController extends RestBaseController
{
    public function index()
    {
        // $articles = [
        //     ['title' => 'article title1'],
        //     ['title' => 'article title2'],
        // ];
        // $this->success('请求成功!', ['articles' => $articles]);

        $this->success('请求成功!', ['test'=>'test']);
        
    }


    public function read($id){
        //$id = $id;
        $this->success('read!', ['read'=>'read','id'=>$id]);
    }

    public function edit($id){
        $this->success('edit', ['action'=>'edit','id'=>$id]);
    }

    public function create(){
        $this->success('create',['action'=>'create']);
    }

    public function save(){
        $this->success('save',['action'=>'save']);
    }
 
}
