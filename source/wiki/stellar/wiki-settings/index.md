---
layout: wiki
wiki: Stellar
order: 4
title: 如何使用半自动化的文档系统
comment_id: 'Q & A'
utterances:
  repo: xaoxuu/hexo-theme-stellar
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

建议用这个文件作为项目的主页，并在文件夹内创建其它分页。

## 项目主页

Stellar 会把具有 `description` 的项目识别为项目主页。例如：

```yaml blog/source/wiki/stellar/index.md
---
layout: wiki
wiki: Stellar
order: -202102
seo_title: 一个实用简约主义的 Hexo 主题
title: 快速开始您的博客之旅
description: 这是一个全新的主题，拥有精心设计的样式和强大的功能。目前还没开发完毕，旧的文章正在逐步迁移至新主题。
---
```

### 是否显示封面

项目可以显示一个全屏封面，封面占据一个屏幕的高度，会居中依次显示项目的 logo、标题、描述。开启项目封面方法如下：

```yaml blog/source/_data/projects.yml
项目:
  cover: true
  logo:
    src: https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/icon.svg
    small: 120px
    large: 240px
```

如果 logo 中已经包含了项目标题，可以这样设置不显示项目标题：

```yaml blog/source/_data/projects.yml
cover: [logo, description]
```

## 项目文档排序

多个项目之间、一个项目的多个文档分页之间都以 `order` 的值作为排序依据，数字越小越靠前。

## 项目文档分类

如果您有很多项目，有些项目是属于同一个分组的，可以创建一个文件来描述它们的关系，文件要使用 `index` 布局模板：

```yaml blog/wiki/categories/hexo-themes.md
---
layout: index
title: 博客主题
order: 3
wiki: [Stellar, Volantis]
---
```

有了这个文件，项目文档就可以像文章一样进行分类筛选浏览。

## 修改 wiki 路径

在根目录中添加 `wiki_dir` 指定 Wiki 主页的路径：

```yaml blog/_config.yml
wiki_dir: wiki
```
