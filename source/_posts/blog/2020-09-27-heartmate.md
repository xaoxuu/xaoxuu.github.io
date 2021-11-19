---
date: 2020-09-27
title: 心率管家的设计与开发（下篇：信号处理）
categories: [设计开发]
tags: [iOS, Swift, 心率]
cover: https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927a@1x.svg
references:
  - title: '心跳之旅—💗—iOS用手机摄像头检测心率(PPG)'
    url: https://punmy.cn/2016/07/28/15231176397746.html
  - title: 'PPG光电容积脉搏波描记法技术概况'
    url: https://www.jianshu.com/p/695c131abfa5
  - title: '数字信号处理公式变程序（四）——巴特沃斯滤波器（下）'
    url: https://blog.csdn.net/shengzhadon/article/details/46803401
  - title: 'iOS手机摄像头测心率'
    url: https://www.jianshu.com/p/9f678e0bdf9b
  - title: '各种智能手表/智能手环的心率监测功能精准度怎么样？都有哪些技术在里面？'
    url: https://www.zhihu.com/question/27391584
  - title: '通过手机摄像头获取心率值'
    url: https://github.com/WuXiaoTu/HeartRate
  - title: 'LaTeX公式编辑器'
    url: https://www.latexlive.com
---

作为一名开发者，如何使用手机摄像头测量心率呢？在心率管家默默无闻地上线了一年多之后，现在终于打算来好好聊聊关于手机摄像头测量心率的那些事。本文参考了很多前辈的文章，将在文末列出。

<!-- more -->

{% frame iphone11 img:https://cdn.jsdelivr.net/gh/cdn-x/wiki/heartmate/docs/usage01.jpg video:https://cdn.jsdelivr.net/gh/cdn-x/wiki/heartmate/docs/usage01.mp4 focus:top %}

## 光电容积脉搏波描记法

目前市面上大部分便携心率检测设备都是基于光电容积脉搏波描记法来测量的。由于心跳引起动脉周期性变化，动脉内血液的容积发生周期性变化，因而对光线的吸收也会呈现同样的周期性变化，这个周期性变化的频率就是脉率，脉率大部分情况都和心率一致。

打开相机，把手指指尖覆盖在摄像头上，观察屏幕上的取景框，就可以发现每心跳一次，屏幕中的红色都会变暗一次。对每一帧画面提取 RGB 均值，并转换到 HSV 色彩空间，把色相 H 作为特征值，得到时域信号。

## 信号处理

我使用简单的时域分析法计算脉率，关键点就是计算采样时间内的波峰个数。把色相信号绘制波形图如下：

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927b@2x.jpg width:300px bg:#fff padding:8px %}

由于覆盖力度不稳定导致色相会整体偏移因而产生低频噪声，再加原本就存在的高频噪声影响，波形显得很杂乱无章，所以使用带通递归滤波器进行滤波：

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927c@1x.svg bg:#fff padding:16px %}

公式展开为：

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927d@1x.svg bg:#fff padding:16px %}

用 Swift 语言实现这个滤波器的算法（10阶）为：

```swift
private struct BandpassFilter {
    private var x = [CGFloat].init(repeating: 0, count: 11)
    private var y = [CGFloat].init(repeating: 0, count: 11)
    @discardableResult mutating func filted(_ value: CGFloat) -> CGFloat {
        guard x.count > 10, y.count > 10 else {
            return 0
        }
        for i in 0 ..< 10 {
            x[i] = x[i+1]
            y[i] = y[i+1]
        }
        x[10] = value / 1.894427025e+01
        y[10] = x[10] - x[0] + 5 * (x[2] - x[8]) + 10 * (x[6] - x[4])
        y[10] += (-0.0000000000 * y[0]) + (0.0357796363 * y[1])
        y[10] += (-0.1476158522 * y[2]) + (0.3992561394 * y[3])
        y[10] += (-1.1743136181 * y[4]) + (2.4692165842 * y[5])
        y[10] += (-3.3820859632 * y[6]) + (3.9628972812 * y[7])
        y[10] += (-4.3832594900 * y[8]) + (3.2101976096 * y[9])
        return y[10]
    }
}
```

> 这个算法是从 [WuXiaoTu/HeartRate](https://github.com/WuXiaoTu/HeartRate) 这个开源库中翻译来的，由于滤波效果已经满足需求了，我就没有去修改滤波参数。

经过滤波之后就能看到波形图呈现锯齿状，由于这是由摄像头捕捉到的色相的波形图，所以看起来并不会像心电图那样：

{% image https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927e@2x.jpg width:300px bg:#fff padding:8px %}

有了干净的波形图，就可以数出一段时间内的波峰个数，从而计算出频率。例如数5秒内有多少个波峰，然后乘以12就是每分钟脉搏跳动次数，也就是这5秒内的平均脉率。现在 GitHub 上的很多同类的开源项目也都是这种方案。由于连续测量的时间越长，发生中断的可能性就越大，测量成功率就越低，再考虑到心率本身就是变化的，时间跨度太长也会使得数据变得没有意义，测量时间太短又很容易被个别误差数据影响。

网络上现有方案都是先确定测量时长，时间结束后计算结果：

- 如果测量时间短：成功率高，准确性低。
- 如果测量时间中等：成功率低，准确性高。
- 如果测量时间长：成功率很低，准确性很高，但是数据意义不大。

我想出了一种新的方案，就是每探测到一个有效脉冲，就记录下这个脉冲与上一个有效脉冲之间的间隔，两个连续的有效脉冲计算出来的频率就是100%正确的瞬时脉率。所以改进后的方案是：开始测量后，始终记录脉冲，随时可以计算瞬时脉率、最后若干秒的平均脉率。

- 成功率：100%（不存在测量中断而失败的情况）
- 准确性的情况如下：
  - 如果脉冲计数都是由脉搏跳动引起的，测量结果就是完全准确的
  - 如果脉搏跳动了而脉冲计数没有增加，不会影响结果，因为计算时只会把有效脉冲的周期进行累加
  - 如果在脉搏跳动间隙额外增加了脉冲计数，那么数据就会失真

如果不故意快速抖动手指，数据失真的情况就不会发生，因为手指不离开摄像头并在两次脉搏跳动中间产生一次色相饱和度明度都以假乱真的脉冲信号是很难的。



### 脉冲探测器

经过滤波后的数值是围绕0上下波动的，分别记录大于0的值和小于0的值，各自保存到数组中，然后求出它们的平均值：

```swift
if filted > 0 {
    upVals.append(filted)
    if upVals.count > 20 {
        upVals.removeFirst(upVals.count - 20)
    }
} else if filted < 0 {
    downVals.append(filted)
    if downVals.count > 20 {
        downVals.removeFirst(downVals.count - 20)
    }
}
let avgUp = upVals.reduce(0, +) / CGFloat(upVals.count)
let avgDown = downVals.reduce(0, +) / CGFloat(downVals.count)
```

如果新的值高于 `avgUp` 的一半，就标记 `flag = true` ，低于 `avgDown` 的一半且 `flag = true` 就标记 `flag = true`，触发一次脉冲，记录下这个脉冲的时间戳。如果两个脉冲之间的时间间隔符合正常心率的范围，就认为是有效脉冲。

```swift
if filted > 0.5 * avgUp  {
    flag = true
}
if filted < 0.5 * avgDown && flag == true {
    flag = false
    let time = CACurrentMediaTime()
    let period = time - periodStart
    // 与上一个周期间隔时间满足正常周期范围
    if period < MAX_PERIOD && period > MIN_PERIOD {
        // 记录这次脉冲与上次脉冲的时间间隔
        periods.append(period)
        // 捕获到脉冲
        delegate?.pulseDetector(detector: self, capture: periods)
    }
    periodStart = time
}
return filted
```

上文「正常心率的范围」如何界定？心率如果低到 40bpm 此时周期达到最大值，如果心率高达 255bpm 则周期达到最小值。

```swift
MAX_PERIOD = CFTimeInterval(60.0 / 40)
MIN_PERIOD = CFTimeInterval(60.0 / 255)
```



### 计算脉率

上一步记录下了每个脉冲的周期，取出最后 N 个要计算的脉冲，把它们的周期相加就是总时长，用 `个数 / 时长` 计算的值就是频率，频率乘以 `60` 就是每分钟的脉冲数，也就是脉率。

```swift
func calcFrequency(count: Int) -> CGFloat? {
    guard (0 ... periods.count).contains(count) else {
        return nil
    }
    let duration = periods.dropFirst(periods.count - count).reduce(0, +)
    return CGFloat(count) / CGFloat(duration)
}
```

{% frame iphone11 img:https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/blog/2020-0927f@2x.jpg %}

## 准确性与参考价值

由于心率是动态变化的，即使测量的脉搏跳动都是准确的，也就是说测量阶段实现了零误差，但是计算方式不一样也会产生不同的结果。因此直接拿结果去和小米手环或者 Apple Watch 上显示的数值去进行对比是不严谨的。正确地方法是在一个时间段内用多种方式测量的同时亲自用手测量脉搏跳动次数，可以借助本文的 demo 计算瞬时或者平均脉率，如果一段时间的脉冲计数完全正确，那么 demo 计算的结果就是完全准确的，瞬时脉率、最后 N 秒的平均脉率一般都不会相同。因此即使戴在一只手上同一时间进行测量，不同产品显示的心率不同也并不能说明它们谁更准，只能说谁的结果更具有参考价值。

对此，我优化后的心率管家测量方案可以选择测量时长，也可以随时结束测量，运动后心率变化快的时候适合取短时间内例如5s平均脉率，心平气和的时候可以取适当长一点的例如10s或者20s的平均脉率。



## 脉率和心率

脉率是每分钟脉搏的次数，心率是每分钟心跳次数，健康情况下脉率与心率一致，但是如果出现心律失常，心脏有一些跳动不能有效将血液泵至全身，因此会出现脉搏缺失，导致脉率显著低于心率。如果用来判断心脏功能状态，误差很大。对于心动过速、低血压症和休克病人，即使是心率规则，由于脉压差很小，脉搏也会很弱，此时往往不能够准确测量脉率。

另外，脉搏随肢体移动会形成伪迹波动，也会影响脉率的测量。而心率不受心律失常、心动过速、休克、肢体活动的影响，所以在临床上，医生判断心跳活动不是看脉率，而是看心率，摸脉搏只是一个辅助操作。

因此，通过手环、手表、app 测量的“心率”并不是一个完全可靠的数据。

## 后记

非常感谢 [@JustinYang](https://lifestyle1.cn/) 大佬在滤波算法方面给予的援助。也十分感谢 [@Punmy](https://punmy.cn/)、[@WuXiaoTu](https://github.com/WuXiaoTu) 等作者的文章，使得后人能够少走很多弯路。

{% link /blog/2019-07-23-heartmate/ 心率管家的设计与开发（上篇：整体流程） 近期开发并上架了新版心率管家 App（仅 iOS 端），专业版不定期限免，欢迎下载体验。本文将从设计、开发、上架等每个步骤和细节进行分享，也包含部分模块源码。 %}
