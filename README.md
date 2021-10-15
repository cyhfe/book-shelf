# book-shelf

## 项目简介:

项目思路来源:

[Epic React](https://epicreact.dev/) 

[kentcdodds/bookshelf](https://github.com/kentcdodds/bookshelf)

前端:

- 组件: react hook
- 样式: emotion
- 组件库：reach ui
- 路由: react-router
- 请求、缓存: fetch + react query
- 状态管理: useReducer + context

后端:

- express
- mongoose

部署：

- heroku

实现功能

- 登录注册鉴权


## 01 项目搭建

### 使用cra搭建项目

```bash
npx create-react-app client
```

添加.env环境变量, build到server下的public

client/.env

```
BUILD_PATH=../server/public
```

### express提供静态服务

server/src/app.js

```javascript
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});
```

### 开发环境准备

dotenv 保存环境变量

server/.env.development

```
MONGO_URL=mongodb://localhost:27017/todo
PORT=3000
JWT_SECRETS=jwt123
```

cross-env 设置环境变量（解决不同操作系统下的环境变量设置问题）

server/package.json
```json
  "scripts": {
    "start": "cross-env NODE_ENV=development nodemon src/index.js",
    "start:prod": "cross-env NODE_ENV=production node src/index.js"
  },
```

使用对应环境变量

server/src/index.js
```JavaScript
const NODE_ENV = process.env.NODE_ENV || "development"
require('dotenv').config({ path: `.env.${NODE_ENV}` })
```

### 部署

注意事项:
1. 不能同时有yarn.lock和package-lock.json
2. 监听端口不能为固定端口，使用 process.env.PORT

在server下添加Procfile文件

Procfile

```
web: npm run start:prod
```

```bash
# 直接登录有时候会出现IP错误（可能是因为代理）， 这里用账号密码登录可以解决
heroku login -i

# 创建heroku remote
heroku create cyh-bookshelf

# 因为我们的server是在子目录下， git subtree可以解决这个问题
git subtree push --prefix server heroku main
```



