---
date: 2020-11-19
title: 苹果设计开发加速器《为 iPhone 和 iPad 搭建灵活适配的用户界面》线上活动
categories: [技术加油站]
tags: [iOS, 设计开发加速器]
cover: https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu@1.0.1/blog/2020-1119a@1x.svg
references:
  - title: 'Apple Developer: Human Interface Guidelines'
    url: https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/launching/
  - title: 设计开发加速器（上海）
    url: https://developer.apple.com/cn/accelerator/
---

受疫情影响，今年设计开发加速器活动改为线上形式，本次参与的活动课题是《为 iPhone 和 iPad 搭建灵活适配的用户界面》，新出的几款 iPhone 和 iPad 设备尺寸和旧设备都不同，造成适配成本增加，本次活动目的是向开发者分享高效而灵活的适配方案。

<!-- more -->

## 避免屏幕分辨率硬编码

常见陷阱：对硬件设备型号做特殊判断

## 适配方面

- 启动屏
- 安全区和布局边框
- 尺寸类
- 动态字体


### 启动屏

用 Storyboard 启动屏，不建议用图片作为启动页。

> 详见 [Human Interface Guidelines -> Launch Screen](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/launching/)


### 安全区和布局边框

**安全区**

UIScreen & UIWindow 获得布局尺寸进行排版不适用于 iPhone X 以及以后机型

要使用安全区来进行布局（安全区是动态的，不同设备、横竖屏、子视图都不相同）

```
.safeAreaInsets
.safeAreaLayoutGuide
```

还可以根据需要定制安全区（例如定制工具栏）

```
.additionalSafeAreaInsets
```

安全区发生变化时：

```
.viewSafeAreaInsetsDidChange()
```



**布局边框**

```
.layoutMargins
.directionalLayoutMargins
.layoutMarginsGuide
.layoutMarginsDidChange()
```

与安全区配合使用

子视图传递

布局边框会根据设备宽度、动态字体而自动调整，能够自动适配。



### 尺寸类

```
sizeClasses
```

- C 紧凑型（iPhone竖屏，iPad分屏）
- R 常规型（iPad竖屏，12.9‘iPad等宽分屏）



### 动态字体

```
.large
.title1
...

label.font = UIFont.preferred...
```

**自定义字体**

```
metrics = UIFontMetrics(...)
```

> more at WWDC2017

## 后记

{% timeline %}

<!-- node 2021年1月4日 -->

今天收到 Apple 的邮件，设计开发加速器活动现在已经开放申请啦，感兴趣的朋友们可以去 [官网](https://developer.apple.com/cn/accelerator/) 申请。

<!-- node 2021年2月1日 -->

今天无意中发现又关闭申请入口了。

<!-- node 2021年4月9日 -->

今天经同事提醒发现又开放申请了。

{% endtimeline %}
