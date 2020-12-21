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
use cmf\lib\Upload;

//https://www.kancloud.cn/thinkcmf/doc5_1/957911

class IndexController extends RestBaseController
{
    public function index()
    {
        $this->success('请求成功!', ['test'=>'test']);
    }

    public function read($id){
        //$id = $id;
        $this->success('read1!', ['read'=>'read','id'=>$id]);
    }

    public function edit($id){
        $this->success('edit1', ['action'=>'edit','id'=>$id]);
    }

    public function create(){
        $this->success('create1',['action'=>'create']);
    }

    public function save(){
        $this->success('save1',['action'=>'save']);
    }

    public function one(){
        if($this->request->isPost()){
            $uploader = new Upload();

            $result = $uploader->upload();
    
            if ($result === false) {
                $this->error($uploader->getError());
            } else {
                $result['preview_url'] = cmf_get_image_preview_url($result["filepath"]);
                $result['url']         = cmf_get_image_url($result["filepath"]);
                $result['filename']    = $result["name"];
                $this->success('上传成功!', $result);
            }
        }else{
            $this->error('error');
        }
    }
}
