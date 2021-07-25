---
layout: wiki
wiki: Stellar
order: 2
title: 个性化您的主题
---

## 站点信息

Stellar 会读取站点根目录下的 `_config.yml` 文件中的一些信息来生成您的网站，所以您需要修改以下值：

```yaml blog/_config.yml
title: 您的网站名称
avatar: 您的头像链接
# 多语言
language:
  - zh-CN
  - en
```

### 多语言设置

主题中的默认文案都支持多语言，以简体中文为例，您可以在 `themes/stellar/languages/zh-CN.yml` 中修改文案。

更改网站优先语言，需要在站点根目录下的配置文件中进行修改：

```yaml blog/_config.yml
language:
  - zh-CN
  - en
  - zh-TW
```

## 创建主题配置文件

在博客根目录的 `_config.yml` 文件旁边新建一个文件： `_config.stellar.yml` ，在这个文件中的配置信息优先级高于主题文件夹中的配置文件。

## 侧边栏配置

### Logo

左上角的 logo 和标题取自站点根目录的配置文件：

```yaml blog/_config.yml
title: 网站名称
avatar: 头像
```

如果您想用一个图片作为 logo，可以直接在主题配置文件 sidebar.logo.title 中设置：

```yaml blog/_config.stellar.yml
sidebar:
  logo:
    title: '[<img no-lazy height="32px" src="xxx"/>](/)'
```

### 主导航栏

```yaml blog/_config.stellar.yml
sidebar:
  menu:
    post: '[btn.blog](/)'
    wiki: '[btn.wiki](/wiki/)'
    notes: '[笔记](/notes/)'
    more: '[更多](/more/)'
```

侧边栏宽度有限，如何在不影响观感的情况下设置更多的主导航栏按钮呢？建议设置一个「更多」按钮，然后在「更多」页面的侧边栏放上列表组件。

### 侧边栏组件

Stellar 和 Volantis 同样支持强大的自定义组件功能，默认提供的组件在主题配置文件中已经列出：

```yaml
# Sidebar widgets
widgets:
  # Recent update
  recent:
    layout: recent
    rss: /atom.xml # npm i hexo-generator-feed
    limit: 5 # Count of posts
  # TOC (valid only in layout:post/wiki)
  toc:
    layout: toc
    list_number: false
    min_depth: 2
    max_depth: 5
  # welcome
  welcome:
    layout: markdown
    title: 欢迎
    content:
      - 欢迎光临小站，这是一个全新的主题，拥有精心设计的样式，保留了 Volantis 的自定义侧边栏，可以写一些公告。
      - 本站主题还没开发完毕，旧的文章正在逐步迁移至新主题。
```

在 `front-matter` 中写上它们的名字，侧边栏就会按顺序显示这些小组件：

```yaml blog/source/xxx.md
sidebar: [welcome, toc]
```

和 Volantis 一样，您可以使用模板创建任何组件，在任何页面的侧边栏显示。推荐将自己的组件配置写在数据文件中：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎欢迎
  content:
    - 这里写的内容会覆盖主题配置文件中的
```

目前支持的布局模板有：`markdown`，后续将会加入列表、网格等布局模板。

{% noteblock Q & A %}

Q: 如果不想显示默认的 welcome 组件怎么办？
A: 删掉它就可以啦。

Q: 如果想在 welcome 那个位置显示成其它布局的组件？
A: 把 welcome 组件的属性都改成你想要的那个组件的就可以啦。

{% endnoteblock %}



## 选择一个评论插件

{% tabs comments %}

<!-- tab Beaudar  -->

Beaudar 是 Utterances 的中文版本，相比 Utterances 有更多的体验优化，可以按时间倒序排序。

{% codeblock blog/_config.stellar.yml lang:yaml %}
comments:
  service: beaudar
  beaudar:
    repo: xaoxuu/blog-comments
{% endcodeblock %}

[Beaudar](https://beaudar.lipk.org) 的配置方法很简单，创建一个仓库，在仓库中创建一个[域名白名单文件](https://github.com/xaoxuu/blog-comments/blob/main/beaudar.json) ，然后在[此处](https://github.com/apps/beaudar)授权安装即可。

<!-- tab utterances  -->

A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and more!

{% codeblock blog/_config.stellar.yml lang:yaml %}
comments:
  service: utterances
  utterances:
    repo: xaoxuu/blog-comments
{% endcodeblock %}

[utterances](https://utteranc.es) 的配置方法很简单，创建一个仓库，在仓库中创建一个[域名白名单文件](https://github.com/xaoxuu/blog-comments/blob/main/utterances.json) ，然后在[此处](https://github.com/apps/utterances)授权安装即可。

<!-- tab Twikoo  -->

{% codeblock blog/_config.stellar.yml lang:yaml %}
comments:
  service: twikoo
  twikoo:
    envId: https://xxx # vercel函数
{% endcodeblock %}

<!-- tab Valine  -->

{% codeblock blog/_config.stellar.yml lang:yaml %}
comments:
  service: valine
  valine:
    appId: # your appId
    appKey: # your appKey
{% endcodeblock %}

{% endtabs %}

### 共用评论数据

如果您有多个页面需要共用评论数据，可以把它们的 `comment_id` 设为相同的值，例如：

```yaml blog/source/about/index.md
title: 关于
comment_id: '留言板'
```

```yaml blog/source/friends/index.md
title: 友链
comment_id: '留言板'
```

### 使用其它评论数据

如果您有多个页面需要另外一个数据库的评论数据，以 Beaudar 为例，您可以这样：

```yaml blog/source/wiki/stellar/index.md
title: 快速开始您的博客之旅
beaudar:
  repo: xaoxuu/hexo-theme-stellar
  'issue-term': 'Q & A'
```



## 头部标签自定义

### Open Graph

默认生成 Open Graph 标签，如果您不希望生成它，可以在主题配置文件中关闭：

```yaml blog/_config.stellar.yml
open_graph:
  enable: true
  twitter_id: # for open_graph meta
```

## 文章自定义

### 是否自动生成封面

根据 `tags` 作为关键词为每一篇文章在线搜索封面：

```yaml blog/_config.stellar.yml
article:
  auto_cover: true
```

### 是否自动生成摘要

建议您通过 `description` 或者 `excerpt` 方式生成摘要，但如果您希望自动从文章内容截取一定字数的文字作为摘要，可以这样设置：

```yaml blog/_config.stellar.yml
article:
  auto_excerpt: 200
```

### 相关文章推荐

要实现相关文章推荐功能，您需要安装插件：

{% copy npm i hexo-related-popular-posts %}

然后在主题配置文件中开启：

```yaml blog/_config.stellar.yml
article:
  # npm i hexo-related-popular-posts
  related_posts:
    enable: true
    title: 您可能感兴趣的文章
```

## 自定义样式

如果要修改样式，您需要删掉主题的样式文件的 CDN 链接，使用本地文件，然后在 `themes/stellar/source/css/_custom.styl` 中进行修改。

## 外部文件注入

在站点根目录下的配置文件中进行修改 `inject.head` 以在 `<head>` 标签末尾处注入代码，修改 `inject.script` 以在 `<body>` 标签末尾处注入代码。

```yaml blog/_config.yml
inject:
  head:
    - <meta name="msapplication-TileColor" content="#2d89ef">
    - <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml">
    - <meta name="theme-color" content="#ffffff">
  script:
    - https://cdn.jsdelivr.net/npm/jquery@3.5/dist/jquery.min.js
```
