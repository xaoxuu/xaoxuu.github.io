---
layout: wiki
wiki: Stellar
order: -202102
seo_title: 一个实用简约主义的 Hexo 主题
title: 快速开始您的博客之旅
cover: true
logo:
  src: https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/icon.svg
  small: 112px
  large: 240px
description: Stellar 是一个内置 wiki 系统的 hexo 主题，适合综合型站点使用。同时也拥有简约而精美的视觉设计和丰富的标签插件，帮助您简单从容地应对各种场合。
comment_id: 'Q & A'
utterances:
  repo: xaoxuu/hexo-theme-stellar
---

Stellar 是一个内置 wiki 系统的 hexo 主题，适合综合型站点使用。同时也拥有简约而精美的视觉设计和丰富的标签插件，帮助您简单从容地应对各种场合。

Stellar 意为恒星，致力于为大家提供稳定强大且易于上手的博客使用体验。相比前作，Stellar 更加简洁和高效，并同时拥有强大的 wiki 系统和丰富的内置标签，更加追求简约实用主义的设计风格。

因此，推荐内容创作者使用 Stellar 开始您全新的博客之旅。

{% folding Stellar 的核心设计风格：实用简约主义 %}

简约不等于简单，而是在实现复杂功能的前提下进行视觉减负设计。人的注意力是有限的，要提高有效信息的醒目程度，就必须降低不重要信息醒目程度，删除所有无效信息。

**降低视觉密度**

- 增加留白，增加间距。
- 减少颜色丰富度，大面积出现的是中性色，彩色必须有其特殊意义，意义相同的元素使用同一种颜色。

**提高有效信息优先级**

- 标题是最大的，对比度最高的
- 不可交互的不重要的小标题（如侧边栏某个插件的标题）降低对比度
- 与文章相关的不重要的小标题，使用小号字体

**删掉无效信息**

- 文章标签、字数、阅读量、评论数
- 网站访问量、字数、搭建时间
- 全局播放器（除了特殊文章）

{% endfolding %}

## 开始前的准备工作

尽管我们致力于降低使用门槛，但是自建独立博客仍然需要一定的相关知识，[markdown](https://www.runoob.com/markdown/md-tutorial.html) 常用语法是必须要掌握的，除此之外，您还需要知道 `yaml` 文件格式、简单的 `git` 知识，最最重要的是，遇到问题知道该如何高效地寻找答案：

{% checkbox checked:true 翻阅和搜索文档 %}
{% checkbox checked:true 搜索 issues 中是否已经有解决办法 %}
{% checkbox checked:true 如果没有，新建 issue 并按照要求进行操作，详尽地描述您遇到的问题 %}

如果您没有使用过 Hexo 也不要着急，可以先通读一遍 [Hexo](https://hexo.io/zh-cn/docs/) 中文文档。此外，如果您从旧版本更新或着其它主题迁移，请确保环境版本不要太低，否则会产生兼容性问题：

```yaml
Hexo: 5.4.0
hexo-cli: 4.2.0
node.js: 14.15.4 LTS # 选 LTS 就行，过高的版本 hexo 还没有进行兼容。
npm: 6.14.10 LTS
```

## 下载与安装

{% tabs install %}
<!-- tab 稳定版 -->
在终端中输入：
{% copy npm i hexo-theme-stellar %}
<!-- endtab -->

<!-- tab 最新版 -->
把 Stellar 添加为子模块
{% copy git submodule add https://github.com/xaoxuu/hexo-theme-stellar.git themes/stellar %}
<!-- endtab -->

<!-- tab DIY -->
1. 把 Stellar [fork](https://github.com/xaoxuu/hexo-theme-stellar) 到您的 GitHub
2. 把您 fork 的 Stellar 添加为子模块
```
git submodule add https://github.com/#yourname#/hexo-theme-stellar.git themes/stellar
```
<!-- endtab -->
{% endtabs %}

在 `blog/_config.yml` 文件中找到并修改：

{% copy theme: stellar %}


## 示例博客

{% sites repo:xaoxuu/hexo-theme-stellar-examples %}

{% note 小提示 如果您也使用了 Stellar 并希望显示在这里，可以在 [hexo-theme-stellar-examples](https://github.com/xaoxuu/hexo-theme-stellar-examples/issues) 中提交 issue 告知您的站点信息，在您提交后的大约 3 分钟内生效。 %}

## Todo

{% checkbox 搜索 %}
{% checkbox 横向滚动的 gallery 标签 %}
{% checkbox 支持 fancybox 的 gallery 标签 %}
{% checkbox 更多实用标签 %}
{% checkbox 更多评论插件 %}
{% checkbox 笔记页面布局模板 %}
