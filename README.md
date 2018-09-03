#安装生成器
> npm install express-generator -g

#生成项目
> express -e blog

#进入生成目录并安装依赖的模块
> cd blog && npm install

#设置环境变量并启动服务
> SET DEBUG=blog:* & npm start