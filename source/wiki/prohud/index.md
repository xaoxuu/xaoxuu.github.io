---
layout: wiki
wiki: ProHUD
title: 为什么选择 ProHUD
---


## 易于上手

您可以用相似的接口调用 Toast、Alert、Guard，发布一则通知或者弹窗可以简单到一行代码：

```swift
Toast.push(title: "Hello World", message: "This is a test message from ProHUD.")
```


{% frame iphone11 img:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/toast-helloword@2x.jpg focus:top %}

您可能好奇上方的图标从何而来，别着急，后面的「场景及其扩展」章节将会告诉您如何自定义一个实例的默认效果。


## 功能强大

ProHUD 对每个实例记录 ID ，您只需要知道它的 ID 就可以随时修改它，例如把「正在加载」修改为「加载成功」。ProHUD 改善了传统弹窗类控件重叠的糟糕体验，如果您无法保证业务上万无一失，那么能够优雅处理极端场景的 ProHUD 就能够帮助您避免意外，关于这部分，详见「[如何避免重叠](/wiki/prohud/alert/#如何避免重叠)」。此外，ProHUD 容器对横屏和 iPad 也做了优化，使得您的应用能够适应多种场景。

## 样式与逻辑分离

在程序初始化时配置样式，调用的地方只需要专注于业务逻辑。ProHUD 提供了「场景」模板特性，可以更加统一高效地规划这些控件的样式。ProHUD 的 UI 与逻辑分离，这就意味着您可以自由的在 ProHUD 容器中设计您的 UI 样式而无需处理控件逻辑问题。如果您不打算重新设计 UI ，使用默认提供的样式也可以轻松调整字体、颜色、边距等细节，新增「场景」模板。

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

对横屏也进行了适配：

{% swiper width:max %}
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot11.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot12.png)
![](https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/prohud/screenshot13.png)
{% endswiper %}
