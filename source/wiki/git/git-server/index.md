---
layout: wiki
wiki: Git
title: 搭建 Git 服务器
order: 3
---

网上相关教程挺多，但是步骤略繁琐，本文将借助 Gitblit 开源工具使用最简单的方式搭建和维护 Git 服务器，支持 Linux、Windows、Mac 平台。

<!-- more -->

## 服务器搭建

### 安装 JDK

下载并安装 JDK：https://www.oracle.com/java/technologies/javase-downloads.html

### 安装并配置 Gitblit

- 下载 Gitblit：https://github.com/gitblit/gitblit
- 解压 Gitblit，进入目录 `~/gitblit-1.8.0/data/defaults.properties`
- 用编辑器打开 `defaults.properties`
```
git.repositoriesFolder = /Users/用户名/gitserver/gitRepository
server.httpPort = 7070
```


### 启动服务

在终端中执行 `gitblit.sh` 脚本即可启动服务：
```bash
./gitblit.sh
```

{% folding 建议设置开机自启动 %}
通过 Mac 的自动化工具，将启动指令写成脚本，系统启动后自动运行脚本即可。
Windows 平台可以添加到启动计划任务中。
{% endfolding %}

## 客户端访问

用服务器 IP + 端口号来访问。例如我的电脑的 IP 是 `10.8.12.200`，那么在局域网内另外一台电脑访问 `http://10.8.12.200:7070` 就可以看到管理页面了：

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/git/gitblit01.jpg width:500px %}

网页操作和使用 GitHub、Coding 等平台相似，非常简单。
