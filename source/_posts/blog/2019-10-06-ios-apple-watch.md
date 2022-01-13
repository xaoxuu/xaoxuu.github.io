---
date: 2019-10-06
title: 苹果设计开发加速器《创建卓越的 Apple Watch 体验》活动现场体验
categories: [技术加油站]
tags: [iOS, 设计开发加速器]
cover: https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2019-1006a@2x.jpg
cover_info:
  meta: 活动现场
  title: 苹果设计开发加速器现场体验
banner: https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2019-1006a@2x.jpg
references:
  - title: 'Apple Documentation: WatchKit - Creating Independent watchOS Apps'
    url: https://developer.apple.com/documentation/watchkit/creating_independent_watchos_apps#3226960
  - title: 'Apple Developer: Human Interface Guidelines'
    url: https://developer.apple.com/design/human-interface-guidelines/watchos/overview/getting-started/
---

9月26号收到了苹果的一活动邀请邮件《创建卓越的 Apple Watch 体验》，活动地点是：Design and Development Accelerator，这是苹果今年7月份在上海设立的设计开发加速器，为开发者提供有关应用设计与开发的专业培训和资源。

<!-- more -->

{% folding 什么是「设计开发加速器」？ %}

- 苹果官网：[设计开发加速器](https://developer.apple.com/cn/accelerator/)
- 视频体验：[搞机零距离：中国开发者的大好事？苹果工程师一对一授课，让人开了又开？](https://www.bilibili.com/video/av58500736/?spm_id_from=333.788.videocard.7)
- 媒体资讯：[苹果设计开发加速器正式启动，每年计划为 5000 名国内开发者提供支持](https://sspai.com/post/55613)

{% endfolding %}

## watchOS 6

构建面向 watchOS 的 app，让用户随时随地及时掌握信息并轻松完成快速操作。开放了更多种全新的 API，可以构建完全独立的 watchOS app，甚至是不带有 iOS 版的 watchOS app。现在，用户可以直接在 Apple Watch 上的 App Store 中查找并安装 app。

## 独立的 App

在 watchOS 6 中，可以构建完全独立的 Watch App。“Sign in with Apple” 让用户远离手机时也能在 Apple Watch 上登录 app。

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/mirror/apple/documentation/watchkit/af79db6d-02b1-4df0-9f46-6c3c9db12d76.png width:500px bg:white padding:16px 选择应用模板 %}

- **Watch-only app**
  创建只有 Apple Watch 且没有相关 iOS 应用程序。

- **watchOS app with an iOS app**
  当您拥有 iOS 应用并想要提供可提供相似或相关体验的 watchOS 应用。

在创建 watchOS Target 时，指定要构建的 watchOS 项目的类型。此外，如果将 watchOS 应用程序与 iOS 应用程序捆绑在一起，则必须指定 watchOS 应用程序如何与其配套的 iOS 应用互动。

- **Independent Apps** （独立应用）不需要 iOS 配套应用即可正常运行。用户可以选择安装 iOS 应用、watchOS 应用或同时安装两者。
- **Dependent Apps** （从属应用）依靠 iOS 配套应用才能正常运行；仅在 watchOS 应用需要与 iOS 应用互动时才创建从属应用。用户必须使用其 iOS 应用购买并安装从属的 watchOS 应用。

> 在 watchOS 5 和更低版本中，所有 watchOS 应用程序都是从属应用。

## Apple Watch 上的 App Store

watchOS 6 上提供适用于 Apple Watch 的 App Store，让用户可以直接在 Apple Watch 上轻松探索、浏览、搜索和安装 watchOS app。使用 Siri、听写或涂写进行搜索，或者通过轻点产品页面链接，直接进入产品页面。

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:180px bg:white padding:16px %}

系统会为独立和从属应用直接将 watchOS 应用程序下载并安装到 Apple Watch。

## Apple Watch 人机界面指南

Apple Watch 设计为可穿戴，因此用户界面适合穿戴者使用，并为他们带来轻巧，反应灵敏且高度个性化的体验。人们经常使用 watchOS 应用程序的相关体验（例如复杂功能、通知和 Siri 交互），而不是使用应用程序本身。创造出色的 watchOS 体验意味着既要设计应用程序，又要设计快速，信息丰富的元素，使人们能够以适合自己的方式访问您的内容。最有用的应用通常：

- 使用复杂功能可以在表盘上提供少量可能动态的信息，使人们可以一目了然地查看信息
- 使用通知传递及时的高价值信息并采取重要行动
- 帮助人们使用 Siri 获取信息并执行任务
- 如有必要，请在应用程序体验中提供更多详细信息和功能


{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/mirror/apple/design/human-interface-guidelines/watchos/watchOS-hero.svg width:320px bg:white padding:16px %}

<br>

{% note color:blue 图片来源声明 本文挖了坑但是许久没有填上，直到 watchOS 7 都要发布了，最后决定放弃填坑，文章封面和文中的部分插图来源于苹果官方文档。 %}

{% folding 附：议程安排 %}

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2019-1006b@2x.jpg width:400px bg:#F3F2F7 padding:16px %}

苹果上海设计开发加速器地点在源深体育中心地铁站4出口处，三座非常低调没有任何招牌的建筑，绕着走了一圈才找到A座二楼入口的门。内部环境如媒体图片一样，室内禁止私自拍照，只有这张门票留作纪念喽。

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2019-1006c@2x.jpg width:400px bg:#857E74 padding:16px %}

{% endfolding %}
