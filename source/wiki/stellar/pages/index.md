---
layout: wiki
wiki: Stellar
order: 103
title: 编写文章以及独立页面
---

## 文章摘要卡片

### 封面图片

在文章列表页面或者其他位置显示的文章摘要卡片上面的图片称之为「文章封面」，设置方法如下：

在文章的 `front-matter` 中写上 `cover: xxx` 即可。例如：

```yaml blog/source/xxx.md
---
cover: https://fastly.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927a@1x.svg
---
```

如果您想使用 Unsplash 搜索图片作为封面，可以在 `cover` 设置搜索关键词（用英文逗号隔开）：

```yaml blog/source/xxx.md
---
cover: workout,strava
---
```

### 内容摘要

一篇文章开头一段文字描述就是摘要，摘要和正文用 `<!-- more -->` 隔开，前后一定要有空行。例如：

```yaml blog/source/xxx.md
---
cover: https://fastly.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927a@1x.svg
---

在心率管家默默无闻地上线了一年多之后，现在终于打算来好好聊聊关于手机摄像头测量心率的那些事。本文参考了很多前辈的文章，将在文末列出。

<!-- more -->

后面是正文部分，在主页看不到。
```


## 文章页

### 横幅图片

文章页面顶部区域可以显示长长的横幅图片，设置方法如下：

```yaml blog/source/xxx.md
banner: https://fastly.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927a@1x.svg
```

如果您想使用 Unsplash 搜索图片作为横幅，可以在 `banner` 中设置搜索关键词（用英文逗号隔开）：

```yaml blog/source/xxx.md
---
banner: workout,strava
---
```

### 指定一级标题

默认的一级标题是文章的 `title`，如果希望使用别的文字作为一级标题，可以指定 `h1`，例如：

```yaml blog/source/xxx.md
---
h1: 快速开始
---
```

## 文章索引与推荐

文章如果有分类和标签就会自动在主页出现「分类」、「标签」选项卡实现分类浏览，不需要手动添加页面。

### 文章分类

在文章列表页面会显示文章所属的第一级分类，例如：

```yaml blog/source/xxx.md
---
categories: [设计开发, iOS开发]
---
```

这样写就只会显示「设计开发」一级分类，而在文章页面顶部则会显示完整的面包屑导航。

### 文章标签

文章标签目前不可见，用于关键词、搜索、按标签检索、相关文章推荐等功能，例如：

```yaml blog/source/xxx.md
---
tags: [iOS, 心率]
---
```

## 更多的独立页面

Stellar 同时具有博客和 Wiki 两个大模块，为了能够正确进行导航栏高亮，引入了 `menu_id` 来进行区分，通常情况下，`layout: post` 和 `layout: wiki` 两种布局模板可以自动为 `sidebar.menu.post` 和 `sidebar.menu.wiki` 的导航栏按钮高亮。自己创建的独立页面也可以在 `front-matter` 中指定 `menu_id` 来使某个按钮处于选中状态。

例如您有关于、友链两个页面，都希望高亮「更多」按钮：

```yaml blog/source/about/index.md
---
menu_id: more
title: 关于
---
```

```yaml blog/source/friends/index.md
---
menu_id: more
title: 友链
---
```

在主题配置文件中设置导航栏：

```yaml blog/_config.stellar.yml
sidebar:
  menu:
    ...
    more: '[更多](/more/)'
```

## 友链页面

友链被设计成标签，您可以在任何页面任何位置插入友链，详见：

{% link /wiki/stellar/tag-plugins/#友链标签 友链标签 %}

## 关于页面

没有单独的关于页面布局，您可以自由组合丰富的标签来实现个性化的关于页面，例如：`about`、`tabs`、`navbar`、`quot`、`timeline`标签。

