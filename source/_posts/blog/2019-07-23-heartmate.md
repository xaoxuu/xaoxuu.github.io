---
date: 2019-07-23
title: 心率管家的设计与开发之路（上篇：整体流程）
categories: [设计开发]
tags: [iOS, Swift, 心率]
keywords: 测量心率,心率管家,HeartMate,Swift,iOS开发
cover: https://7.dusays.com/2021/02/17/b1ceb7fe07147.webp
comment_title: 经常有限免活动哦～
---

近期开发并上架了新版心率管家 App（仅 iOS 端），专业版不定期限免，欢迎下载体验。本文将从设计、开发、上架等每个步骤和细节进行分享，也包含部分模块源码。


<!-- more -->

{% link https://apps.apple.com/cn/app/heart-mate-lite-hrm-utility/id1475747930?ls=1 心率管家 %}

## 立项

### 确定需求

立项的初衷是满足随时测心率的需求（没有智能手环手表的人群），App 核心功能就是测量心率，围绕这个功能展开的是测量时更多细节的记录、对已有数据的筛选。再往深度挖掘的是数据分析、健康预测。

### 市场考察

虽然 AppStore 已有，但是无一例外都特别丑，要么收费要么有广告，所以不如自己做一个。

### 测量原理

**光电容积脉搏波描记法（PPG）**

是追踪可见光（通常为绿光）在人体组织中的反射。它具备一个可见光光源来照射皮肤，再使用光电传感器采集被皮肤反射回来的光线。PPG 有两种模式，透射式和反射式，像一般的手环手表这样，光源和传感器在同一侧的，就是反射式；而医院中常见的夹在指尖上的通常是透射式的，即光源和传感器在不同侧。 皮肤本身对光线的反射能力是相对稳定的，但是心脏泵血使得血管容积周期性地变化，导致反射光也呈现出周期性的波动值，特别是在指尖这种毛细血管非常丰富的部位，这种周期性的波动很容易被观察到。

Wikipedia: [#Photoplethysmogram](https://en.wikipedia.org/wiki/Photoplethysmogram)

对应到 App 上就是通过分析摄像头每一帧画面的色值，计算出颜色波动的频率，即为近似心率。

### 定价策略

- 付费版：价格波动，通过降价和限免吸引爬虫收录。
- 免费版：限制了部分个性化功能，核心功能不受影响，没有任何广告。


### 技术方案

语言：Swift5
设计模式：MVC
路由方案：JLRoutes
主题和UI管理：Inspire
缓存方案：SQLite
数据同步方案：暂定AppleHealth

## 设计

初期使用 Sketch 制作效果图，在后期直接在项目中进行调整，没有再更新到 Sketch 中。下面这是最终发布到 AppStore 的应用截图：

{% swiper width:min %}
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot01.jpg)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot02.jpg)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot03.jpg)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot04.jpg)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot05.jpg)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot06.jpg)
{% endswiper %}

## 开发

### 心率测量组件

心率测量功能开发为一个私有库，具体实现稍后补充。。。

### 可定制UI

使用 [Inspire](https://xaoxuu.com/wiki/inspire/) 作为主题管理器，目前暂未支持主题切换，后续更新会加入。

### 快捷指令

使用 JLRoutes 路由方案，目前支持 URLSchemes 启动并开始测量，可接受两个参数：

```swift
// 直接启动
heartmatepro://record
// 自定义补光灯亮度（亮度值 l 为浮点数，取值范围是0~1）
heartmatepro://record?l=0.3
// 自定义补光灯亮度和测量样本容器大小（样本容器大小 c 为正整数，取值范围是1~20）
heartmatepro://record?l=0.1&c=10
```

免费版限制了自定义亮度，但是你依然可以通过这种方式来自定义。

### ProHUD

使用 [ProHUD](https://xaoxuu.com/wiki/prohud/) 来负责弹窗和操作表，包括隐私政策页面。

{% swiper width:min %}
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot21.png)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot22.png)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot23.png)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot24.png)
![](https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/proj/heartmate/screenshot25.png)
{% endswiper %}

## 上架

新建应用，填写名称、BundleId 等资料，然后在 App 页面填写描述、网址、隐私政策链接、上传截图、确定分级……

待应用通过 testflight 测试无误后，打包上传。然后过几分钟 appstoreconnect 页面就可以选中刚才上传的包了，然后提交审核，第二天就审核通过。（现在 AppStore 新应用审核也太快了）

{% link https://appstoreconnect.apple.com App&nbsp;Store&nbsp;Connect %}

## 迭代

### 数据价值

后续迭代中会在测量详情页面下方的留白处加上【标签】、【备注】、【数据分析】模块，前两者利于检索数据，数据分析目前没有能力独自完成，计划使用第三方服务。


### 细节

**图标**
这是一次彻底重做，所以也可以算是初版。很多细节还比较粗糙，例如图标没有经过打磨，设置列表连图标都没有。

**占位图**
很多页面在没有数据的时候也没有占位的图片，这个也会慢慢完善。

**心率区间**
心率卡片的颜色、心率卡片右上角以及归档页面心率的底部的彩色长条代表的是当前所处的心率区间，App 中并没有说明，后续迭代中也会完善这里。并且心率区间的划分需要年龄和性别，这个也会在后期进行完善。

## 附：开源库

App 不开源，但是 App 使用的很多模块是开源的，自己开发的模块也上传至 GitHub 了。（App 的关于页面可以看到）

{% ghcard xaoxuu/ProHUD %} {% ghcard xaoxuu/Inspire %}

**第三方库：**


| 第三方库       | 功能             |
| :------------- | :---------------- |
| RxSwift       | 响应式编程框架   |
| JLRoutes      | 路由             |
| SnapKit       | 自动布局         |
| SQLite.swift  | SQLite数据库管理 |
| STDPickerView | 选择器控件       |
| Bugly         | BUG追踪          |


**第三方服务：**

| 第三方服务        | 功能             |
| :------------- | :---------------- |
| [Unsplash](https://unsplash.com/)       | 免费图片   |
