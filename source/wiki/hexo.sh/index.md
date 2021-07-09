---
layout: wiki
wiki: hexo.sh
title: 一个方便管理与发布hexo博客的脚本
h1: 开始使用
---


```sh 例如，`cs`相当于：
hexo clean
hexo s
```
```sh `cgd`相当于：
hexo clean
hexo g
hexo d
git add --all
git commit -am "update all"
git push origin
```

## 下载并安装脚本

打开终端，输入这行命令：

{% copy width:max curl -s https://xaoxuu.com/install | sh -s hexo.sh %}

如需安装指定版本，在后面加上版本号即可，例如：

{% copy width:max curl -s https://xaoxuu.com/install | sh -s hexo.sh 2.1.0 %}

## 启动脚本

在终端输入如下命令即可打开脚本：

```sh
hexo.sh
```



## 使用方法

在终端输入如下命令即可查看脚本所有支持的指令：

```sh
hexo.sh help
```
如果是脚本已经启动（可以看到脚本菜单，处于待输入指令的状态），则只需要输入 `help`，下文其它情景同理。

下面是一些常见使用场景：

### A. 使用脚本快速搭建博客

let `path` = 你想把博客放在哪里，打开终端 **`cd` 到 `path`** 。

在终端输入如下命令自动检查并安装所有需要的环境，然后搭建并启动博客：

```sh
hexo.sh init
```

脚本会依次执行以下这些操作：
1. 检测node.js环境，如果没有就安装。
2. 检测hexo环境，如果没有就安装。
3. 输入自定义博客名，在当前目录执行初始化。
4. 安装Material X主题。
5. 安装所有依赖包。

{% note color:yellow 注意 安装 node.js 或者 hexo 的时候需要输入一次**本机密码**，别忘了哦。搭建博客的时候你需要输入**博客名**，其他时间就可以坐和放宽了。 %}

### B. 使用脚本快速更新博客

let `path` = 你的博客路径，打开终端 `cd` 到 `path` 。

在终端输入如下命令启动博客：

```sh
hexo.sh s
```

然后修改你的文章、博客主题，如果修改了 `_config.yml` 是需要重新启动博客的，有些参数甚至需要 `clean` 之后重启才能生效，这时候你只需要在终端脚本【请输入指令】后面输入：

```sh
cs
```

就执行 `hexo clean`，然后执行 `hexo server` 了。

如果你已经修改完毕，需要发布更新，可以在终端脚本【请输入指令】后面输入：

```sh
cgd
```

脚本就会执行 `hexo clean`、`hexo generate`、`hexo deploy`，然后执行一系列的git命令把源码的更新提交至远程仓库。


## 所有支持的命令

这是 `2.1.0` 版本中的所有命令，可能未必准确，以脚本中的帮助信息为准。

```plain
常用:
  c (clean) 	 执行 hexo clean
  s (server) 	 执行 hexo server
  g (generate) 	 执行 hexo generate
  d (deploy) 	 执行 hexo deploy
  cs  		 执行 c, s 的组合
  cg  		 执行 c, g 的组合
  cgd  		 执行 c, g, d 的组合，然后提交代码

安装:
  i (install) 	 用于安装的命令，下面是install命令的参数:
  		 n (node)       安装node.js环境
  		 h (hexo)       安装hexo环境(npm install hexo-cli -g)
  		 b (blog)       搭建博客(hexo init, npm install)
  		 d (dependency) 安装依赖包(npm install)
  		 v (volantis)   下载并应用「Volantis」主题

自动:
  init 		 自动检查并安装所有需要的环境，然后搭建并启动博客。👍🏼
  vut 		 下载并运行「Volantis」主题的单元测试。

脚本:
  cd + `path` 	 选择路径
  docs  	 查看文档(https://xaoxuu.com/wiki/hexo.sh)
  gh (github) 	 GitHub页面(https://github.com/xaoxuu/hexo.sh)
  u (update) 	 更新脚本文件(当前版本：2.1.0)
```
