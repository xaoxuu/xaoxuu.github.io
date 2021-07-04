---
layout: wiki
title: 一个方便发布podspec的脚本
wiki: podspec.sh
---


## 开始使用

let `path` = 你的项目的 `podspec` 所在的路径

打开终端，cd 到 `path` ，输入下面这条命令下载脚本到当前文件夹：

{% copy width:max curl -s https://xaoxuu.com/install | sh -s podspec.sh %}

如需安装指定版本，在后面加上版本号即可，例如：

{% copy width:max curl -s https://xaoxuu.com/install | sh -s podspec.sh 1.2.1 %}

需要发布 podspec 到时候，在终端中输入：

{% copy width:max . podspec.sh %}

就会自动开始执行发布流程。

## 发布流程

- 如果目录下有一个 podspec 文件，直接询问版本号，然后打包验证、询问是否发布。
- 如果目录下有多个 podspec 文件，遍历每一个 podspec 文件，询问版本号，然后打包验证、询问是否发布。

## 脚本运行权限

如果提示没有权限，就输入以下命令修改 `podspec.sh` 的权限

{% copy width:max chmod 777 podspec.sh %}
