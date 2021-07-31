---
layout: wiki
wiki: Stellar
order: 100
title: 基本信息配置
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

## 选择一个评论插件

{% tabs %}

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


## 头部标签自定义

### Open Graph

默认生成 Open Graph 标签，如果您不希望生成它，可以在主题配置文件中关闭：

```yaml blog/_config.stellar.yml
open_graph:
  enable: true
  twitter_id: # for open_graph meta
```
