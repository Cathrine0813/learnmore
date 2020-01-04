#!/usr/bin/env bash

npm config get registry # 检查仓库镜像库（一般我们都是使用淘宝镜像）
npm config set registry=http://registry.npmjs.org # 切换镜像
echo '请进⾏登录相关操作：'
npm login # 登陆
echo "-------publishing-------"
npm publish # 发布(最重要的)
npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
echo "发布完成"
exit


# 用git bash的那个窗口运行 chmod +x publish.sh，作用是给执行权限