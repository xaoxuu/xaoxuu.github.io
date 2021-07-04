---
layout: wiki
wiki: SmartLamp
title: 蓝牙智能灯毕业设计项目
---

{% swiper %}
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/smartlamp/screenshot01.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/smartlamp/screenshot02.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/smartlamp/screenshot03.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/smartlamp/screenshot04.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/smartlamp/screenshot05.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/smartlamp/screenshot06.png)
{% endswiper %}

<!-- more -->

## 特性

**调节亮度、颜色、定时关闭**

主页是核心功能，实现一键连接蓝牙灯、自由调节颜色、亮度、设置定时关灯等功能。
情景页是保存用户设置的情景模式，可以根据使用场景不同快速切换至对应的工作模式。
设备页可以管理多台蓝牙灯。
发现页提供一些智能家居相关资讯。


##   技术点

### ATTitleBar

- 支持横向滑动切换tab，并具有点击涟漪效果。
- titlebar是在app中广泛应用的一种tab设计。我写的这个小框架模仿Google的Material Design设计，涟漪效果代码由MaterialControls框架改写。
- 页面较多时采用类似tableview的懒加载模式，只加载需要显示的几页，减少内存占用，提高流畅度。

### ReactiveCocoa

- 本项目大量使用了ReactiveCocoa框架进行响应式编程，大幅简化代码、提高可读性。
- RAC的订阅机制使得一对多传值有了新的选择，如蓝牙中心设备。
- RAC的信号监听机制使得我更容易根据需要定制个性化控件。如带翻转、旋转效果的tabbar、带缩放和回弹效果的slider等，使app的界面栩栩如生。

### CBCentralManager

- CBCentralManager是蓝牙类app的核心，本项目在编写这部分代码时使用了链式语法进行封装，外界调用起来十分方便。

### ATCarouselView

- 轮播图也是在app中广泛存在的一种自定义控件，我将这部分代码封装至ATKit中，以Pods导入方式使用，便于维护和扩展，同时也使得本项目代码更加简洁。
- 部分app的轮播图可以根据下方列表的滑动而改变高度或者添加蒙版效果，我目前实现了改变高度的功能。
