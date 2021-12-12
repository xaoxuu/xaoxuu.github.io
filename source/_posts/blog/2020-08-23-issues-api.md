---
date: 2020-08-23
title: 静态博客使用 Issues API 来实现动态发布友链、书签
categories: [瞎折腾]
tags: [博客, GitHub]
banner: https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu@1.0.1/blog/2020-0823a@2x.jpg
repo: xaoxuu/issues-api
---

由于发布 issue 的成本远远低于发布一次博客更新（即便是使用了持续集成），可以用 issue 来简化每个独立博客都必备的友链系统，也可以通过 issue 来快速发布动态资讯，弥补静态博客必须更新静态文件才能更新内容的缺点。此功能已经集成到了主题中，使用非常方便。

<!-- more -->

## 实现思路

如标题所说，例如 Issues API 来实现，把请求到的结果进行解析，然后生成 HTML 标签，添加到页面中。为了获取到需要的信息，创建 Issue 需要遵循一定的格式，例如「网站卡片」就需要截图、网站标题、网站链接、网站描述、头像。可以设置 [Issues 模版](https://github.com/volantis-x/examples/issues/new/choose) 来简化步骤。

通过 issue 方式发布内容可以支持 `script` 脚本，为了安全起见，最好设置一个限制，例如用标签来激活 `labels=active` 或者只对自己发布的有效，可以在解析数据的时候过滤掉 `script` 标签。


## 如何在主题中使用？

在 GitHub 或者 Gitee 创建仓库，仿照下面的示例，把 api 中的用户名和仓库名改成自己的。Issue 内容中需要有一段满足 JSON 格式的代码块：

```json
{
    "title": "",
    "description": "",
    "screenshot": "",
    "url": "",
    "avatar": "",
    "version": "版本：^4.0"
}
```

示例代码：

```
{% issues sites api:https://api.github.com/repos/xaoxuu/friends/issues?sort=updated&state=open&page=1&per_page=100&labels=active %}
```

上述示例对应的仓库链接：

{% link https://github.com/xaoxuu/friends/issues GitHub:&nbsp;xaoxuu/friends %}

## 在线演示效果

见本站友链

{% link /friends/ 友链 %}
