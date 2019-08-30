## 项目介绍

此项目为第一次尝试使用koa2进行RESTful风格的API设计应用，服务于轻量级信发后台管理系统，主要实现登录、用户管理、资源上传、节目数据存储等功能。

为此，写了一份笔记来记录开发的过程以及所遇到的问题。点击阅读

## 安装

1. `git clone https://github.com/gorkys/koa-demo.git`

2. 安装`FFMpeg`，具体请看文章中的`获取视频缩略图`章节

3. `npm install`

4. 导入`sql`文件到数据库

5.  配置数据库用户名与密码到`.env`文件里

   ```text
   # 数据库地址
   DB_HOST = 127.0.0.1
   # 数据库账号
   DB_USER = root
   # 数据库密码
   DB_PASS = 123456
   # 服务器地址，用于资源上传
   SERVER_URL = http://192.168.1.66:3000/
   ```

   

## 运行

`npm run server` && `npm run start`(热启动)

## API接口

#### 登录管理

- 登录

  接口地址：http://localhost:3000/api/login

  请求方式：`POST`

  请求参数：

  | 字段     | 类型   | 说明   |
  | -------- | ------ | ------ |
  | username | string | 用户名 |
  | password | string | 密码   |

- 获取用户权限及信息

  接口地址：http://localhost:3000/api/user/info

  请求方式：`GET`

  | 字段  | 类型   | 说明  |
  | ----- | ------ | ----- |
  | token | string | token |

#### 用户管理

- 查询用户

  接口地址：http://localhost:3000/api/user

  请求方式：`GET`
  | 字段     | 类型   | 说明   |
  | -------- | ------ | ------ |
  | pageNo   | number | 页码 |
  | pageSize | number | 每页数量   |
  
- 增加用户

  接口地址：http://localhost:3000/api/user

  请求方式：`POST`
  | 字段     | 类型   | 说明   |
  | -------- | ------ | ------ |
  | username | string | 用户名 |
  | nickname | string | 昵称   |
  | password | string | 密码   |

- 编辑用户

  接口地址：http://localhost:3000/api/user

  请求方式：`PUT`
  | 字段     | 类型   | 说明   |
  | -------- | ------ | ------ |
  | username | string | 用户名 |
  | nickname | string | 昵称   |
  | password | string | 密码   |

- 删除用户

  接口地址：http://localhost:3000/api/user

  请求方式：`DELETE`
  | 字段 | 类型   | 说明   |
  | ---- | ------ | ------ |
  | id   | number | 用户ID |

#### 图片管理

- 上传图片

  接口地址：http://localhost:3000/api/upload/image

  请求方式：`POST`
  | 字段 | 类型 | 说明 |
  | ---- | ---- | ---- |
  | file | file | 文件 |
  
- 查询图片

  接口地址：http://localhost:3000/api/resource/image

  请求方式：`GET`
  | 字段     | 类型   | 说明   |
  | -------- | ------ | ------ |
  | pageNo   | number | 页码 |
  | pageSize | number | 每页数量   |

- 删除图片

  接口地址：http://localhost:3000/api/resource/image

  请求方式：`DELETE`
  | 字段 | 类型   | 说明   |
  | ---- | ------ | ------ |
  | id   | number | 资源ID |

#### 视频管理

- 上传视频

  接口地址：http://localhost:3000/api/upload/video

  | 字段 | 类型 | 说明 |
  | ---- | ---- | ---- |
  | file | file | 文件 |

- 查询视频

  接口地址：http://localhost:3000/api/resource/video

  请求方式：`GET`
  | 字段     | 类型   | 说明   |
  | -------- | ------ | ------ |
  | pageNo   | number | 页码 |
  | pageSize | number | 每页数量   |

- 删除视频

  接口地址：http://localhost:3000/api/resource/video

  请求方式：`DELETE`
  | 字段 | 类型   | 说明   |
  | ---- | ------ | ------ |
  | id   | number | 资源ID |

#### 模板管理

- 模板查询

  接口地址：http://localhost:3000/api/template

  请求方式：`GET`
  | 字段     | 类型   | 说明   |
  | -------- | ------ | ------ |
  | pageNo   | number | 页码 |
  | pageSize | number | 每页数量   |

- 增加模板

  接口地址：http://localhost:3000/api/template

  请求方式：`POST`
  | 字段         | 类型   | 说明           |
  | :----------- | ------ | -------------- |
  | htumbnail    | string | 缩略图(base64) |
  | width        | number | 模板宽         |
  | height       | number | 模板高         |
  | name         | string | 模板名称       |
  | proTime      | number | 模板时长       |
  | resolution   | string | 模板分辨率     |
  | terminalType | string | 终端类型       |
  | elements     | object | 元素数组       |

- 删除模板

  接口地址：http://localhost:3000/api/template

  请求方式：`DELETE`
  | 字段 | 类型   | 说明   |
  | ---- | ------ | ------ |
  | id   | number | 资源ID |