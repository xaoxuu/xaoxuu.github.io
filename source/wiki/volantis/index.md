---
layout: wiki
wiki: Volantis
title: Volantis for Hexo
---

Volantis 是一个高度模块化的 Hexo 主题，拥有丰富的内置标签和第三方插件支持，拥有庞大的开发者团队和年轻活跃的社区文化。得益于其强大的模块化特性，您可以轻松搭建一个极简风格的轻博客，也可以仿照社区主页搭建一个多人协作的、包含 wiki 的综合型站点。

Volantis（瓦兰提斯）取名自《冰与火之歌》，寓意为自由。Volantis X 是 Volantis 社区文化的符号。在过去的 3 年里，30 余名开发者为其贡献了 1600+ commits，数以千计的用户为瓦兰提斯点亮了星星，50 余名来自各行各业的热情的小伙伴们参与了社区建设，因为大家的参与，Volantis 变得越来越强大和富有生命力。

{% link https://volantis.js.org Volantis&nbsp;中文社区 %}

## 开始之前

尽管我们致力于降低使用门槛，但是自建独立博客仍然需要一定的相关知识，[markdown](https://www.runoob.com/markdown/md-tutorial.html) 常用语法是必须要掌握的，除此之外，您还需要知道 `yaml` 文件格式、简单的 `git` 知识，最最重要的是，遇到问题知道该如何高效地寻找答案：

1. 翻阅和搜索文档
2. 搜索 issues 中是否已经有解决办法
3. 如果没有，新建 issue 并按照要求进行操作，详尽地描述您遇到的问题

如果您没有使用过 Hexo 也不要着急，可以先通读一遍 [Hexo](https://hexo.io/zh-cn/docs/) 中文文档，要想使用地得心应手，最好参照团队提供的开源项目的源码进行搭建：

[Demo 源码](https://github.com/volantis-x/demo) ｜ [官网源码](https://github.com/volantis-x/community)

如果您从旧版本更新或着其它主题迁移，请确保环境版本不要太低，否则会产生兼容性问题。

```yaml
Hexo: 5.3.0
hexo-cli: 4.2.0
node.js: 14.15.4 LTS # 选 LTS 就行，过高的版本 hexo 还没有进行兼容。
npm: 6.14.10 LTS
```

## 快速体验

如果您已经具备环境配置条件，可以在终端中输入下面这行代码，稍等片刻就可以看到示例站点已经运行起来了：

{% copy git clone https://github.com/volantis-x/demo.git && cd demo && npm i && hexo s %}

## 下载与安装

- 如果您是 Mac 用户，可以在博客路径打开终端，下载安装并应用主题：
{% copy curl -s https://volantis.js.org/start | bash %}

- 如果您是内容创作者，推荐使用 npm 稳定版本：
{% copy npm i hexo-theme-volantis %}

- 如果您需要定制主题，请 [fork](https://github.com/volantis-x/hexo-theme-volantis/) 主题，然后添加为子模块，详细教程如下：
{% link https://github.com/volantis-x/hexo-theme-volantis/issues/459#issuecomment-679465906 如何正确地更新主题（Fork篇） %}
{% note color:orange 温馨提示 请一定不要直接下载源码并进行修改使用，因为这样会导致**失去版本管理系统**且**无法获得更新**。 %}

## 配置与使用

完整而详细的文档请移步瓦兰提斯社区查看：

{% link https://volantis.js.org/v4/site-settings/ 配置与使用 %}
