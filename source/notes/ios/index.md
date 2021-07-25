---
robots: noindex,nofollow
sitemap: false
menu_id: notes
layout: wiki
wiki: Notes
seo_title: iOS 相关问题
order: 210
references:
  - title: 'Apple Developer: Human Interface Guidelines'
    url: https://developer.apple.com/design/human-interface-guidelines/watchos/overview/getting-started/
---

## 最新版 CocoaPods 的安装流程

1. （首次安装）移除现有Ruby默认源
{% copy gem sources --remove https://rubygems.org/ %}

2. （首次安装）使用新的源
{% copy gem sources -a https://gems.ruby-china.com %}

3. （首次安装）验证新源是否替换成功
{% copy gem sources -l %}

4. （可选）更新 gem
{% copy sudo gem update --system %}

5. 安装 CocoaPods
{% copy sudo gem install -n /usr/local/bin cocoapods && pod setup %}


## Podfile 文件中的一些写法

{% link https://guides.cocoapods.org/using/the-podfile.html CocoaPods&nbsp;Guides&nbsp;-&nbsp;The&nbsp;Podfile %}

```ruby
# 设置镜像源
source 'https://cdn.cocoapods.org/'
# 忽略警告
inhibit_all_warnings!
```

## 如何发布开源库到 CocoaPods

说实在话，类似的教程网上很多，基本可以满足大多数人零基础发布 CocoaPods，但是其中可能会遇到一些问题，只有亲自尝试过才知道。

### 准备工作

#### 1. clone 远程仓库到本地

```sh
git clone 你的仓库链接
```


#### 2. 注册 trunk

注册的命令

```sh
pod trunk register 你的邮箱 你的用户名
```

记得去邮箱里验证，然后可以输入以下命令查看个人信息

```sh
pod trunk me
```


### 步骤

#### 1. 创建 `.podspec`

```sh
pod spec create AXKit
```

#### 2. 修改 `.podspec` 并验证

有很多类似的教程，可以参考。

> 一个小技巧：你可以去GItHub搜索一些热门的第三方库，然后点击查看这些大牛的 `.podspec` 是怎么写的。
> 传送门：[YYKit的podspec](https://github.com/ibireme/YYKit/blob/master/YYKit.podspec)、[ReactiveObjC的podspec](https://github.com/ReactiveCocoa/ReactiveObjC/blob/master/ReactiveObjC.podspec)、[BlocksKit的podspec](https://github.com/BlocksKit/BlocksKit/blob/master/BlocksKit.podspec)


最容易出错的地方就是资源路径

```ruby
s.source_files = "AXKit/**/*.{h,m}"
```

常见写法

```ruby
"Directory1/*"  表示匹配所有文件
"Directory1/Directory2/*.{h,m}"  表示匹配所有以.h和.m结尾的文件
"Directory1/**/*.h"  表示匹配所有子目录
```

s.source 常见写法

```ruby
# 推荐写法：与版本号绑定
s.source = { :git => "https://github.com/TeaseTian/HTQRCode.git", :tag => "#{s.version}" }
# 与commit id 绑定
s.source = { :git => "https://github.com/TeaseTian/HTQRCode.git", :commit => "68defea" }
```

tag => s.version 表示将这个 Pod 版本与 Git 仓库中相同版本的 comit 绑定

{% noteblock %}

**注意**

如果仓库中对应的tag是 `“v1.0.0”` 这样以字母开头的，可以在 `#{s.version}` 前面加上对应的字母。commit => "68defea" 表示将这个 Pod 版本与 Git 仓库中某个 commit 绑定

{% endnoteblock %}


**验证**

```sh
pod spec lint AXKit.podspec
```

#### 3. 上传到远程仓库

修改 `.podspec` 时指定的版本号，如 `0.0.1`。那么远程仓库中必须始终存在这个版本的 `branch` 或 `tag` 才能够下载。建议使用 tag。`s.source` 中的 tag 需要与远程仓库中的 tag 对应起来。

```ruby
s.version = "0.0.1"
s.source  = { :git => "https://github.com/xaoxuu/AXKit.git", :tag => "v#{s.version}" }
```

这里指向的是 `"v0.0.1"` 这个分支，因为分支我们用完之后习惯把它删掉，所以这里也可以指向 tag，也就是说打一个 `"v0.0.1"` 的 tag 并推送到远程就可以了。

```
git tag v0.0.1
git push --tags
```

这样做的好处就是删掉当前分支不影响 CocoaPods 中指向的仓库源码。


#### 4. 发布到 CocoaPods

```
pod trunk push AXKit.podspec
```



#### n. 删除一个 podspec 版本

删除的命令是：

```
pod trunk delete 项目名 版本号
```

官方建议使用 `deprecate` 来弃用

```
pod trunk deprecate 项目名
```

这两种方法执行完有很大几率会出现一串很长很长的错误，不要着急，这实际上这是一个 html。把它保存到一个 html 文件中，打开，是个404错误页，原因众所周知。


> 删除之后立即搜索还是能搜到的，因为有一定的延迟，可能要半个小时才能更新。



#### pod trunk 命令

在终端输入

```
pod trunk --help
```

可以查看帮助



### 使用脚本

没必要每次都重复每个步骤，如果你已经发布过一个，可以省去注册的步骤，直接把已经发不过的 podspec 复制一份，改一下仓库模块名，验证通过就可以发布了。

我写了一个便于发布更新的脚本，把脚本放在与 podspec 同级目录下，当你更新了项目之后，如果需要更新到 cocoapods，可以执行此脚本。流程是：

```
输入版本号 -> commit、push tag -> pod spec lint -> 询问是否发布(y/n) -> 发布(y)
```

{% link https://github.com/xaoxuu/podspec.sh 脚本的项目 %}


## 应用上传失败

原因可能有很多，有关于 Transporter 的问题可以尝试删除缓存：

### 删除缓存

{% copy open ~/Library/Caches/com.apple.amp.itmstransporter/ %}

### 重新下载缓存

{% copy /Applications/Xcode.app/Contents/SharedFrameworks/ContentDeliveryServices.framework/itms/bin/iTMSTransporter %}

> 这个缓存有 60MB （2020年7月份下载实测）

## 素材规格

### iPhone 各代屏幕尺寸与分辨率

| iPhone | 对角线 | 缩放 | 逻辑分辨率     | 物理分辨率       | ppi |
| :---- | :--- | :--- | :-------- | :---------- | :---------- |
| 1、3G、3GS | 3.5  | @2x  | 320 x 480 | 320 x 480   | 163 |
| 4、4s | 3.5  | @2x  | 320 x 480 | 640 x 960   | 326 |
| 5、5s、SE | 4    | @2x  | 320 x 568 | 640 x 1136  | 326 |
| 6、6s、7、8、SE(2020) | 4.7  | @2x  | 375 x 667 | 750 x 1334  | 326 |
| 6 Plus、6s Plus、7 Plus、8 Plus | 5.5  | @3x  | 414 x 736 | 1242 x 2208 | 401 |
| X、XS、11 Pro | 5.8  | @3x  | 375 x 812 | 1125 x 2436 | 458 |
| XR、11 | 6.1  | @2x  | 414 x 896 | 828 x 1792 | 326 |
| XS Max、11 Pro Max | 6.5  | @3x  | 414 x 896 | 1242 x 2688 | 458 |
| 12 mini | 5.4 | @3x | 375 x 812 | 1080 x 2340 | 476 |
| 12 | 6.1 | @3x | 390 x 844 | 1170 x 2532 | 460 |
| 12 Pro | 6.1 | @3x | 390 x 844 | 1170 x 2532 | 460 |
| 12 Pro Max | 6.7 | @3x | 428 x 926 | 1284 x 2778 | 458 |


### iPad 各代屏幕尺寸与分辨率

| iPad | 对角线 | 缩放 | 逻辑分辨率     | 物理分辨率       | ppi |
| :---- | :--- | :--- | :-------- | :---------- | :---------- |
| 1、2 | 9.7  | @1x  | 768 x 1024 | 768 x 1024   | 132 |
| mini 1 | 7.9  | @1x  | 768 x 1024 | 768 x 1024   | 163 |
| mini 2/3/4 | 7.9  | @2x  | 768 x 1024 | 1536 x 2048   | 326 |
| Air 1/2 | 9.7  | @2x  | 768 x 1024 | 1536 x 2048   | 264 |
| Pro (9.7) | 9.7  | @2x  | 768 x 1024 | 1536 x 2048   | 264 |
| Pro (10.5) | 10.5  | @2x  | 834 x 1112 | 1668 x 2224   | 264 |
| Pro (12.9) | 10.5  | @2x  | 1024 x 1366 | 2048 x 2732   | 264 |
| Pro (11' 2018) | 11  | @2x  | 834 x 1194 | 1668 x 2388   | 264 |
| Pro (12.9' 2018) | 11  | @2x  | 1024 x 1366 | 2048 x 2732   | 264 |


### Logo & 启动图

UI 只需要提供一张 `1024*1024` 尺寸的图即可，开发使用 [IconKit](https://img.vim-cn.com/24/a42106ba9e592869dc2293da2c04b11bf7657d.zip) 工具可以直接生成开发需要的各种尺寸的图片及其 json 配置文件，直接拖进 Xcode 工程中就可以使用了。使用传统方式不同尺寸一张一张的切图不仅浪费 UI 的时间，开发也需要一张图一张图往对应位置拖，双方都很麻烦。


如果使用 LaunchImage 方式，需要切各个尺寸的图片，参考 [iPhone 各代屏幕尺寸与分辨率](#iPhone-各代屏幕尺寸与分辨率) 表，如果需要兼容 iPhone 4、4s 机型，则需要提供一共7种尺寸的图片，如果最低兼容 iPhone5 的话，就只需要提供6种尺寸的图片。

> 注意：iOS 并不需要 `1920*1080` 这种尺寸的图片。

### icon 素材

iOS 端的切图需要同时提供 @2x 和 @3x 两种尺寸的图片，例如某个名为 “imagename” 的图片需要提供两个文件分别命名为：

```
imagename@2x.png
imagename@3x.png
```

素材名（imagename）命名可以根据公司或团队规范而异，但是两种尺寸的文件的素材名部分要保持一致，唯一的不同就是 `@2x` 和 `@3x`。
