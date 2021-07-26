---
layout: wiki
wiki: Stellar
order: 900
title: 探索个性化选项
---

## 侧边栏组件

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

## 评论


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
