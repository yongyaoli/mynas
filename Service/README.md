# linjubang

#### 介绍
邻居梦APP

#### 软件架构
Thinkphp + ThinkCMF + MySql + 前端采用APICloud

#### doc 地址
https://www.thinkcmf.com/doc5_1.html

#### API
- API访问地址:
http://域名:88/api.php/模块/控制器/方法/参数名/参数值/参数名1/参数值1
eg:

1. 登录:
http://localhost:88/api.php/admin/public/login/username/admin/password/admin888
需要在 header 中添加: {key:XX-Device-Type,value:web}(mobile,android,iphone,ipad,web,pc,mac,wxapp)
2. 调用需要登录的接口需要在header中添加:{key:XX-Token,value:token}
3. API版本参数,在header添加:{key:XX-Api-Version,value:1.0.0}

