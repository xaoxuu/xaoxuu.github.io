---
layout: wiki
wiki: tag.sh
title: 「tag.sh」一个方便发布git版本的脚本
---


## 安装脚本

打开终端，输入并执行这一行命令即可：

{% copy width:max curl -s https://xaoxuu.com/install | sh -s tag.sh %}

## 发布版本

当您需要进行版本发布时，在 git 仓库中打开终端，输入：

```sh
tag 版本号 描述
```

然后稍等片刻即可完成发布。


## 删除版本

```sh
tag del 版本号
```
