#安装生成器
> npm install express-generator -g

#生成项目
> express -e blog

#进入生成目录并安装依赖的模块
> cd blog && npm install

#设置环境变量并启动服务
> SET DEBUG=blog:* & npm start

#安装bower
> npm install bower -g

#初始化bower
> bower init

#安装bootstrap
> bower install bootstrap@3 -S

#安装数据库
> npm install mongoose -S

#安装会话中间件
> npm install express-session connect-mongo -S

