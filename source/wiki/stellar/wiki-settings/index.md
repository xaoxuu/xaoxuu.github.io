---
layout: wiki
wiki: Stellar
order: 201
title: 如何使用半自动化的文档系统
---

自动意味着 Stellar 可以自动找到一个项目的所有文档分页，生成一个目录树，半自动意味着您可以手动指定顺序、标题、分组，而非依赖文件路径、文件名来排序和显示。

## 创建一个项目

在 `blog/source/` 文件夹中创建一个 `wiki` 文件夹，在其中放入各个项目的文档。以 Stellar 项目为例：

```
blog/source/wiki/stellar/index.md
```

设置布局模板和项目名称：

```yaml blog/source/wiki/stellar/index.md
---
layout: wiki  # 使用wiki布局模板
wiki: Stellar # 这是项目名
title: 这是分页标题
---
```

建议用这个文件作为项目的主页，并在文件夹内创建其它分页。Stellar 会把同一个项目的所有分页中 `order` 最小的一页作为项目的主页（其默认值为0）。

## 完善项目信息

在数据文件中创建项目文件，以 Stellar 为例：

```yaml blog/source/_data/projects.yml
Stellar:
  title: Stellar
  subtitle: 每个人的独立博客
  tags: 博客主题
  cover: true
  logo:
    src: https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/icon.svg
    small: 112px
    large: 240px
  description: Stellar 是一个内置 wiki 系统的 hexo 主题，适合综合型站点使用。同时也拥有简约而精美的视觉设计和丰富的标签插件，帮助您简单从容地应对各种场合。
  repo: xaoxuu/hexo-theme-stellar
  comment_title: '评论区仅供交流，有问题请提 [issue](https://github.com/xaoxuu/hexo-theme-stellar/issues) 反馈。'
  beaudar:
    repo: xaoxuu/hexo-theme-stellar
    'issue-term': 'Q & A'
```


### 是否显示封面

项目可以显示一个全屏封面，封面占据一个屏幕的高度，会居中依次显示项目的 logo、标题、描述。开启项目封面方法如下：

```yaml blog/source/_data/projects.yml
Stellar:
  cover: true
  logo:
    src: https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/icon.svg
    small: 120px
    large: 240px
```

如果 logo 中已经包含了项目标题，可以这样设置不显示项目标题：

```yaml blog/source/_data/projects.yml
Stellar:
  cover: [logo, description]
```

### 项目文档标签

如果您有很多项目，有些项目是有相关性的，可以相同的 `tags` 值：

```yaml blog/source/_data/projects.yml
Stellar:
  tags: 博客主题
```

也可以设置多个 `tags` 值：

```yaml blog/source/_data/projects.yml
Stellar:
  tags: [博客主题, 开源项目]
```


### 项目的 GitHub 仓库信息

设置了 `repo` 值就会在侧边栏显示项目仓库的相关链接：

```yaml blog/source/_data/projects.yml
Stellar:
  repo: xaoxuu/hexo-theme-stellar
```

### 项目评论设置

如果希望项目的所有分页使用相同的评论数据，可以在这里覆盖评论配置：

```yaml blog/source/_data/projects.yml
Stellar:
  comment_title: '评论区仅供交流，有问题请提 [issue](https://github.com/xaoxuu/hexo-theme-stellar/issues) 反馈。'
  beaudar:
    repo: xaoxuu/hexo-theme-stellar
    'issue-term': 'Q & A'
```

> 目前支持覆盖 beaudar/utterances，其它评论系统可以通过设置 `comment_id` 来实现。

### 是否索引

如果您有些项目希望在项目列表中隐藏，可以设置 `index` 值：

```yaml blog/source/_data/projects.yml
Stellar:
  index: false
```

## 文档排序

一个项目文档的多个分页之间以 `order` 的值作为排序依据，数字越小越靠前，最小的是项目主页。

## 侧边栏设置

### 侧边栏组件

如果您希望自定义某个项目的侧边栏组件，可以设置 `sidebar` 值：

```yaml blog/source/_data/projects.yml
Notes:
  sidebar: [toc]
```

### 对目录树进行分组

如果您的项目文档分页较多，可以对目录树进行分组：

```yaml blog/source/_data/projects.yml
Stellar:
  ...
  sections:
    '快速开始': [0, 99]
    '基本使用': [100, 199]
    '文档系统': [200, 299]
    '进阶设定': [900, 999]
```

左边是显示的标题，右边是 `order` 的区间，例如某页文档的 `order` 是 `150`，那么这页文档将会显示在「日常问题解决方案」这个组中。



## 修改 wiki 路径

在根目录中添加 `wiki_dir` 指定 Wiki 主页的路径：

```yaml blog/_config.yml
wiki_dir: wiki
```

例如书籍类的“项目”可以改为：

```yaml blog/_config.yml
wiki_dir: books
```

例如商品/产品类的“项目”可以改为：

```yaml blog/_config.yml
wiki_dir: products
```
