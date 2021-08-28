---
layout: wiki
wiki: Stellar
order: 105
title: 使用标签插件增强阅读体验
---

新版标签插件和 Hexo 官方的标签插件统一使用空格分隔，所以如果参数内容中需要出现的空格被意外分隔开了的时候，请使用 `&nbsp;` 代替。为了方便理解，本文档语法格式中的可选参数用方括号括起来，键值对参数用冒号分隔开，例如：

```
{% image src description [download:bool/string] %}
```
就表明第一个参数是图片链接，第二个参数是图片描述，而 `download` 是可选参数，并且值是布尔或字符串类型。


{% folding 了解参数解析规则 %}

以图片标签为例，使用空格分隔开之后得到一个数组，如果图片描述文字中有空格，多分出来的这些「参数」被合并到最后一个「非键值对参数」中，什么是「非键值对参数」呢？举个例子您就明白了：

```
{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip %}
```

这个例子中，`download:https://xxxx` 是有冒号分隔开的，`download` 为键，后面的网址为值，所以叫做「键值对参数」；与此相对的，没有冒号分隔的就叫做「非键值对参数」。键值对参数可以放在任何位置，我可以通过匹配键来解析，而非键值对参数则只能通过顺序解析，所以它们必须和文档中要求的前后顺序一致。

一般核心的、重要的参数会设置成非键值对参数，而可选参数设置成键值对参数。

{% endfolding %}

## 修饰文本标签

- 支持多彩标记标签，包括：{% mark 默认 %}{% mark 红 color:red %}{% mark 橙 color:orange %}{% mark 黄 color:yellow %}{% mark 绿 color:green %}{% mark 青 color:cyan %}{% mark 蓝 color:blue %}{% mark 紫 color:purple %}{% mark 浅 color:light %}{% mark 深 color:dark %} 一共 10 种颜色。
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}

```md 写法如下
- 支持多彩标记标签，包括：{% mark 默认 %}{% mark 红 color:red %}{% mark 橙 color:orange %}{% mark 黄 color:yellow %}{% mark 绿 color:green %}{% mark 青 color:cyan %}{% mark 蓝 color:blue %}{% mark 紫 color:purple %}{% mark 浅 color:light %}{% mark 深 color:dark %} 一共 10 种颜色。
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}
```

## 表情标签

内置了可配置的表情标签{% emoji 爱你 %}使用方法如下：

```
{% emoji 爱你 %}
```

语法格式：

```
{% emoji [source] name [height:1.75em] %}
```

其中 `source` 可省略，默认为配置中的第一个 `source`：

```yaml blog/_config.stellar.yml
tag_plugins:
  ...
  emoji:
    default: https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/qq/%s.gif
    twemoji: https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/%s.svg
    qq: https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/qq/%s.gif
    aru: https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/aru-l/%s.gif
    tieba: https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/tieba/%s.png
```

{% noteblock %}
在配置文件中，文件名用 `%s` 代替。这种集成方式虽然不那么优雅，但也能用，主要是配置起来比较灵活。 {% emoji aru 0180 %}
如果对高度有特别要求，可以指定高度，例如：{% emoji aru 5150 height:3em %}
```
{% emoji aru 5150 height:3em %}
```
{% endnoteblock %}

> 表情速查表：[stellar表情标签索引](https://www.hermitlsr.top/2021-08-02/36b0e529.html)

## 复制标签

对于单行内容，可以使用 `copy` 标签来实现复制功能：

{% copy curl -s https://xaoxuu.com/install | sh %}

您可以设置 `git:https` 或者 `git:ssh` 或者 `git:gh` 来快速放置一个 git 仓库链接：
{% copy git:https xaoxuu.com/hexo-theme-stellar %}


```md 写法如下
{% copy curl -s https://xaoxuu.com/install | sh %}
{% copy width:max curl -s https://xaoxuu.com/install | sh %}
{% copy git:https xaoxuu.com/hexo-theme-stellar %}
{% copy git:ssh xaoxuu.com/hexo-theme-stellar %}
{% copy git:gh xaoxuu.com/hexo-theme-stellar %}
```

## 图片标签

图片标签是一个精心设计的应对各种尺寸插图的标签，对于大图，可以放置一个「下载」按钮，语法格式如下：

```
{% image src [description] [download:bool/string] [width:px] [padding:px] [bg:hex] %}
```

```yaml 参数说明
src: 图片地址
description: 图片描述
download: href # 下载地址，设置此值后鼠标放在图片上会显示下载地址，如果下载地址为图片地址，可以设置为 true
width: 200px # 图片宽度
padding: 16px # 图片四周填充宽度
bg: '#ffffff' # 图片区域背景颜色，16进制
```

### 大尺寸图片

无论在什么宽度的设备上都希望横向铺满的图片，一般不需要额外操作。可以在链接后面写上图片描述，如有必要，可以通过设置 `download:true` 使其显示一个「下载」按钮链接指向图片地址，如果下载链接与显示的图片地址不同，可以 `download:下载链接` 来使其能够下载原图。

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip %}
{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/photos/bc7bda18328da.jpg 来自澳大利亚的 Pieter de Vries 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone_pieter_de_vries_011221.zip %}

```md 写法如下
{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip %}
{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/photos/bc7bda18328da.jpg 来自澳大利亚的 Pieter de Vries 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone_pieter_de_vries_011221.zip %}
```

### 小尺寸图片优化

宽度较小而高度较大的图片，可以设置宽、高、填充间距、背景色等对其布局进行优化，使得它在不同宽度的屏幕下都能获得不错的视觉体验：

有底色的图片，可以填充图片底色：

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:200px padding:16px bg:white %}

```md 写法如下
{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:200px padding:16px bg:white %}
```

没有底色的图片，可以填充 `bg:var(--card)` 动态颜色，能够适配暗黑模式：

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/icon.svg bg:var(--card) padding:16px width:100px %}

```md 写法如下
{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/icon.svg bg:var(--card) padding:16px %}
```

{% folding 如果不进行约束，在宽屏设备上阅读体验很糟糕（为不影响阅读体验，已为您折叠过长的内容） %}
{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png %}
{% endfolding %}




## 备注标签

```md note
{% note [title] content [color:color] %}
```

```md noteblock
{% noteblock [title] [color:color] [codeblock:bool] %}
...
{% endnoteblock %}
```

```yaml 参数说明
title: 标题（可选）
content: 内容
color: red/orange/yellow/green/cyan/blue/purple/light/dark
```

### 彩色备注标签

备注标签相较于旧版进行了增强，可以实现更多种颜色， note 标签可以用空格隔开标题和内容。 noteblock 标签适用于应对更复杂的场合。

{% note 直接写备注内容，默认是和代码块一样的样式，如果内容中需要显示空格，请使用&nbsp;代替。 %}


```md 写法如下
{% note 直接写备注内容，默认是和代码块一样的样式，如果内容中需要显示空格，请使用&nbsp;代替。 %}
```

{% folding 更多颜色 %}

{% note color:red 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:orange 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:yellow 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:green 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:cyan 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:blue 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:purple 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:light 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:dark 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}

```md 写法如下
{% note color:cyan 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
```

{% endfolding %}

### 具有标题的备注标签

#### 使用 note 标签

{% note 这是标题 这是正文 哈哈。 %}

```md 写法如下
{% note 这是标题 这是正文 哈哈。 %}
```

#### 使用 noteblock 标签

{% noteblock 这是标题 %}
这是正文 哈哈。
{% endnoteblock %}

```md 代替 note 标签的写法
{% noteblock 这是标题 %}
这是正文 哈哈。
{% endnoteblock %}
```

### 复杂备注标签

如果备注标签内容不只有文字，请使用 noteblock 代替。

{% noteblock child:tabs %}
{% tabs %}
<!-- tab 图文示例 -->
{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0627a@2x.jpg 个人电脑作为办公设备时，我们该如何保护隐私？ download:true %}

公司一般都会强制安装安防软件，这些软件要求开机自启动，要求有屏幕录制权限、完全的磁盘访问权限包括相册图库。因此如果使用自己的 MacBook 作为办公设备，必须要把生活区和工作区完全独立开，安装在两个磁盘分区，并且对磁盘分区进行加密。

<!-- tab 代码示例 -->
{% codeblock 建议的版本 lang:yaml %}
Hexo: 5.4.0
hexo-cli: 4.2.0
node.js: 14.15.4 LTS # 建议使用LTS版本
npm: 6.14.10 LTS
{% endcodeblock %}
{% endtabs %}
{% endnoteblock %}

```md 写法如下
{% noteblock %}
{% tabs %}
<!-- tab 图文示例 -->
{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0627a@2x.jpg 个人电脑作为办公设备时，我们该如何保护隐私？ download:true %}
公司一般都会强制安装安防软件，这些软件要求开机自启动，要求有屏幕录制权限、完全的磁盘访问权限包括相册图库。因此如果使用自己的 MacBook 作为办公设备，必须要把生活区和工作区完全独立开，安装在两个磁盘分区，并且对磁盘分区进行加密。
<!-- tab 代码示例 -->
{% codeblock 建议的版本 lang:yaml %}
Hexo: 5.4.0
hexo-cli: 4.2.0
node.js: 14.15.4 LTS # 建议使用LTS版本
npm: 6.14.10 LTS
{% endcodeblock %}
{% endtabs %}
{% endnoteblock %}
```

### 彩色代码块

**设置 `child:codeblock` 并设置 `color:颜色枚举` 可以实现10种颜色的代码块**

正确的例子：

{% noteblock child:codeblock color:green %}
```swift
func test() {
    // ...
}
```
{% endnoteblock %}

错误的例子：

{% noteblock child:codeblock color:red %}
```swift
func test() -> Void {
    // ...
}
// 或者
func test() -> () {
    // ...
}
```
{% endnoteblock %}

```md 写法如下
正确的例子：

{% noteblock child:codeblock color:green %}
\```swift
func test() {
    // ...
}
\```
{% endnoteblock %}

错误的例子：

{% noteblock child:codeblock color:red %}
\```swift
func test() -> Void {
    // ...
}
// 或者
func test() -> () {
    // ...
}
\```
{% endnoteblock %}
```

## 折叠标签

折叠标签的语法格式为：

```
{% folding title [codeblock:bool] [open:bool] [color:color] %}
content
{% endfolding %}
```

```yaml 参数说明
codeblock: true/false
open: true/false
color: red/orange/yellow/green/cyan/blue/purple/light/dark
```

### 彩色可折叠代码块

备注标签相较于旧版进行了增强，可以实现更多种颜色，还可以通过设置 `child:codeblock` 来实现可折叠的代码块。以下是一个默认打开的代码折叠框：

{% folding child:codeblock open:true color:yellow 默认打开的代码折叠框 %}
```swift
func test() {
  print("hello world")
}
```
{% endfolding %}

代码如下：

```
{% folding child:codeblock open:true color:yellow 默认打开的代码折叠框 %}
代码块
{% endfolding %}
```

{% folding color:yellow 危险，请不要打开这个 %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding color:orange 警告，真的很危险 %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding color:red 最后一次警告，千万不要打开这个 %}
不要说我们没有警告过你，Windows 10 不是為所有人設計，而是為每個人設計。
{% endfolding %}
{% endfolding %}
{% endfolding %}

## 外链卡片标签

外链卡片标签的语法格式为：

```
{% link href title [description] [img:src] %}
```

```yaml 参数说明
href: 链接
title: 标题
description: 可选，副标题，不填写时默认值为链接
img: 可选，缩略图
```

例如：

{% link https://github.com/xaoxuu github@xaoxuu github.com/xaoxuu img:https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/favicon/android-chrome-192x192.png %}

## 单选/复选样式标签

单选框是 radio，复选框是 checkbox，它们都支持这些参数：

```yaml
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
```

### 单选框样式标签

{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}

### 复选框样式标签

复选框还额外支持三种符号：

```yaml
symbol: plus/minus/times
```

{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}

{% note color:yellow 由于没有提交表单的需要，所以这个标签只是样式标签，不具有真实的单选/复选功能。 %}

## 时间线标签

目前的时间线只支持静态的，后续有望通过 API 实现动态时间线插件。

{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg width:300px %}
<!-- node 2021 年 2 月 11 日 -->
今天除夕，也是生日，一个人在外地过年+过生日，熬夜开发新主题，尽量在假期结束前放出公测版。
{% endtimeline %}

```md 写法如下
{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg width:300px %}
<!-- node 2021 年 2 月 11 日 -->
今天除夕，也是生日，一个人在外地过年+过生日，熬夜开发新主题，尽量在假期结束前放出公测版。
{% endtimeline %}
```

## 友链标签

您可以在任何位置插入友链，支持静态数据和动态数据，静态数据需要写在数据文件中：

```yaml blog/source/_data/friends.yml
group1:
  title: 海内存知己 天涯若比邻
  description: 感谢人生旅途中的每一份真挚的友谊，按结识先后顺序：
  items:
    - title: 某某某
      ...
group2:
  title: 特别感谢的开源大佬
  description: 感谢开源大佬们的无私奉献，按结识先后顺序：
  items:
    - title: 某某某
      ...
group3:
  title: 来自 GitHub 的朋友
  description: '以下友链通过 [GitHub Issue](https://github.com/xaoxuu/friends/issues/) 提交，按 issue 最后更新时间排序：'
  api: https://issues-api.vercel.app
  repo: xaoxuu/friends
```

标题和描述都支持 md 格式，需要写在引号中。如果指定了 `api` 和 `repo` 字段，则从 issues 中取第一个 `json` 代码块数据作为友链。

```md 写法如下
{% friends %}
```

### 数据按组筛选

友链支持分组（白名单模式和黑名单模式）显示：

```md 写法如下
// 显示 group1
{% friends only:group1 %}

// 显示 group1 和 group2
{% friends only:group1,group2 %}

// 除了 group2 别的都显示
{% friends not:group2 %}
```

{% folding friends only:group2 %}
{% friends only:group2 %}
{% endfolding %}

### 实现动态友链

可以加载来自 issues 的友链数据，除了需要在 `_data/friends.yml` 中指定 `api` 和 `repo` 外，还需要做一下几件事：

从 [xaoxuu/issues-api](https://github.com/xaoxuu/issues-api) 作为模板克隆或者 fork 仓库，然后提交一个 issue 进行测试，不出意外的话，仓库中已经配置好了 issue 模板，只需要在模板中指定的位置填写信息就可以了。

提交完 issue 一分钟左右，如果仓库中出现了 `output` 分支提交，可以点击查看一下文件内容是否已经包含了刚刚提交的 issue 中的数据，如果包含，那么再次回到前端页面刷新就可以看到来自 issue 的友链数据了。

{% note 关于自建&nbsp;Vercel&nbsp;API 如果您想使用自己的 api，请把您刚创建的仓库导入到 Vercel 项目，详见 [小冰博客](https://zfe.space/post/python-issues-api.html) 的教程。 %}

{% note color:green 特别感谢 特别感谢小冰博客通过 Vercel 进行加速的方案，解决了原本直接请求 GitHub API 速度过慢的问题。 %}

### 只显示动态数据

如果您不想创建 `friends.yml` 来设置任何静态数据，可以在标签中设置 `repo` 来只显示动态数据：

```
{% friends repo:xaoxuu/friends %}
```

当然，如果您自己部署了 API 接口，可以指定：

```
{% friends repo:xaoxuu/friends api:https://issues-api.vercel.app %}
```

## 网站卡片标签

网站卡片可以显示网站截图、logo、标题、描述，使用方法和友链标签一模一样，唯一的区别是数据文件名称为 `sites.yml`，可以和友链数据混用，通过分组过滤实现不一样的效果。

```md 示例写法
{% sites only:mac %}
```

{% folding sites only:mac %}
{% sites only:mac %}
{% endfolding %}

## GitHub Card

{% ghcard xaoxuu %}

{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}

```md 写法如下
{% ghcard xaoxuu %}
{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}
```

{% link https://github.com/anuraghazra/github-readme-stats GitHub&nbsp;Card&nbsp;API github-readme-stats %}

## 导航栏标签

文章内也可以插入一个导航栏：

```md
{% navbar [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}
```


## 关于标签

方便在关于页面显示一段图文信息：

```
{% about avatar:https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/avatar/rect-256@2x.png height:80px %}

<img height="32px" alt="XAOXUU" src="https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/logo/180x30@2x.png">

**如果宇宙中真有什么终极的逻辑，那就是我们终有一天会在舰桥上重逢，直到生命终结。**

XAOXUU 目前是一个 iOS 开发者，代表作品有：ProHUD、ValueX 等。在业余时间也开发了 Stellar 博客主题，更多的作品可以去项目主页查看，希望大家喜欢～

{% navbar [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}

{% endabout %}
```

## 设备框架标签

{% frame iphone11 img:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/toast-loading@2x.jpg video:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/toast-loading@2x.mov focus:top %}

```md 示例写法
{% frame iphone11 img:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/toast-loading@2x.jpg video:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/toast-loading@2x.mov focus:top %}
```

目前仅支持 iphone11 如果您有 iPhone12、iPad、Mac 等设备模型的 svg 图片，可以发给我进行适配。

## 分栏标签

这个标签移植自 [NexT](https://theme-next.js.org/docs/tag-plugins/tabs.html) 主题，但做了以下修改：

- 支持设置 `align:center` 来使内容居中
- 设置默认激活的标签方式为 `active:1` 而非 `, 1`（使用默认格式降低学习成本，且显式声明可读性更强）
- 不需要 `<!-- endtab -->` 来作为结束标识（因为 Stellar 会自动判断）
- 不需要 `tabs id` 来保证唯一性（因为 Stellar 会设置唯一标识）
- 不支持 `@icon` 方式设置图标（因为 Stellar 不再内置 `fontawesome` 图标库）
- 暂时不支持 `md` 格式的代码块，这是技术问题，有待解决。

{% tabs active:2 align:center %}

<!-- tab 图片 -->
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg width:300px %}

<!-- tab 代码块 -->
{% codeblock lang:swift %}
let x = 123
print("hello world")
{% endcodeblock %}

<!-- tab 表格 -->
| a | b | c |
| --- | --- | --- |
| a1 | b1 | c1 |
| a2 | b2 | c2 |

{% endtabs %}

```md 写法如下
{% tabs active:2 align:center %}

<!-- tab 图片 -->
{% image https://cdn.jsdelivr.net/gh/volantis-x/cdn-wallpaper-minimalist/2020/025.jpg width:300px %}

<!-- tab 代码块 -->
{% codeblock lang:swift %}
let x = 123
print("hello world")
{% endcodeblock %}

<!-- tab 表格 -->
| a | b | c |
| --- | --- | --- |
| a1 | b1 | c1 |
| a2 | b2 | c2 |

{% endtabs %}
```

## 轮播标签

默认一张图片是 50% 宽度，通过设置 `width:min` 设置为 25% 宽度，`width:max` 设置为 100% 宽度。

### 最大图片宽度

{% swiper width:max %}
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot11.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot12.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot13.png)
{% endswiper %}

```md 写法如下
{% swiper width:max %}
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot11.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot12.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot13.png)
{% endswiper %}
```

### 最小图片宽度

{% swiper width:min %}
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot01.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot02.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot03.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot04.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot05.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot06.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot07.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot08.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot09.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot10.png)
{% endswiper %}

```md 写法如下
{% swiper width:min %}
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot01.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot02.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot03.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot04.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot05.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot06.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot07.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot08.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot09.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot10.png)
{% endswiper %}
```
