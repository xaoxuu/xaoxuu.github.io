---
date: 2017-11-09
updated: 2017-11-10
title: 在 iOS 开发中，如何实现只推迟而不会重复执行的函数
categories: [解决方案]
tags: [GCD, ObjC, Swift]
---

在 iOS 开发中，如果想推迟执行一段代码，使用 `dispatch_after` 函数可以轻易实现，但有时候我们想在它推迟的期间再次推迟，直到最终不再推迟的时候，才真正的被调用一次。这就需要每次先将旧的事件取消，然后重新设置。

<!-- more-->

**自动消失的视图**

例如当用户的某种操作点击一下屏幕就发出一条状态栏消息，消息在2秒后消失，在消失前如果用户又触发了这个条件，理应是在这次触发的2秒后消失，如果简单的使用 `dispatch_after` 函数进行延迟，结果会是在第一次点击的2秒后消失，可能你在1.5秒的时候又点击了一下，但是只过了0.5秒就消失了。

**降低服务器访问次数**

例如：用户修改了信息的30秒后上传至服务器。那么如果用户修改了姓名，然后30秒内又修改了头像，在修改了头像后的30秒内又修改了性别等等。我们希望的并不是每次修改就上传一次，而是在用户最后修改完所有信息之后，看起来似乎不准备继续修改了的时候，再上传至服务器。使用推迟而不重复执行的方法可以在避免多次访问服务器的同时及时地上传用户修改后的信息。

## 便捷的方案：GCD

实现的方法很简单，步骤如下：

1. 获取到函数
2. 取消函数
3. 重新赋值或启动


### 使用 Objective-C

在 Objective-C 中，将要执行的代码保存成 `dispatch_block_t` 的静态类型变量，取出这个静态变量，然后使用 `dispatch_block_cancel()` 取消，然后重新设置它的值，然后调用 `dispatch_after`。

```objc
- (void)delayTest{
    static dispatch_block_t task;
    if (task) {
        dispatch_block_cancel(task);
    }
    task = dispatch_block_create(DISPATCH_BLOCK_BARRIER, ^{
        // 被推迟执行的代码
    });
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(duration * NSEC_PER_SEC)), dispatch_get_main_queue(), task);
}

```

{% grid 也可以使用 AXKit 实现 %}

也可以使用 [AXKit](https://github.com/xaoxuu/AXKit/) 封装好的方法，将要执行的代码保存成 `ax_dispatch_operation_t` 的静态类型变量，使用 `ax_dispatch_cancel_operation()` 取消之前的任务，然后使用 `ax_dispatch_cancellable()` 再次赋值。

```objc
- (void)delayTest2{
    static ax_dispatch_operation_t animationToken;
    ax_dispatch_cancel_operation(animationToken);
    animationToken = ax_dispatch_cancellable(duration, dispatch_get_main_queue(), ^{
        // 被推迟执行的代码
    });
}
```

{% endgrid %}


### 使用 Swift

创建静态变量 `static var task = DispatchWorkItem.init{}`，先取消 `task.cancel()`，再赋值 `DispatchWorkItem`，然后使用 `DispatchQueue.main.asyncAfter(deadline: .now() + duration, execute: task)` 延迟调用。

```swift
internal static var task = DispatchWorkItem.init {}

internal static func hide(duration: TimeInterval) {
    task.cancel()
    task = DispatchWorkItem.init(block: {
        // 被推迟执行的代码
    })
    DispatchQueue.main.asyncAfter(deadline: .now() + duration, execute: task)
}
```

## 更高效的方案：定时器

上述方案存在一定的性能问题，在低频触发时没有问题，但是在每一秒都要触发一次或多次的时候，显然不合适。这时候可以设置一个定时器，通过定时器延迟调用，每次触发的时候只是修改定时器的 fireDate 属性，实现步骤不再赘述。
