---
layout: wiki
wiki: ProHUD
order: 120
seo_title: Toast - 通知横幅组件
title: 通知横幅组件
---

Toast 是用于顶部通知横幅的组件，它的层级最高，只接受一个点击事件，可以预先对不同的场景配置不同的默认值（图标、持续时间）。当多个 Toast 同时存在时，它们从上往下平铺。

{% frame iphone11 img:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/toast-loading@2x.jpg video:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/toast-loading@2x.mov focus:top %}

默认提供的场景有：`default, loading, success, warning, error`。

示例1：发布一个警告

```swift
Toast.push(scene: .warning, title: "设备电量过低", message: "请及时对设备进行充电，以免影响使用。")
```

示例2：发布一个警告并设置其他属性

```swift
Toast.push(scene: .warning, title: "设备电量过低", message: "请及时对设备进行充电，以免影响使用。") { (toast) in
    // 设置identifier
    toast.identifier = "这是唯一标识"
    // 禁止通过手势将其移出屏幕
    toast.isRemovable = false
    // 监听点击事件
    toast.didTapped {
        debugPrint("点击了这条横幅")
    }
}
```

## 如何避免重叠

示例：发布一个横幅或者弹窗，如果已经有了就更新标题。

```swift
Toast.find("aaa", last: { (t) in
    t.update() { (vm) in
        vm.title = "已经存在了"
    }
}) {
    Toast.push(title: "这是一条id为aaa的横幅", message: "避免重复发布同一条信息") { (t) in
        t.identifier = "aaa"
        t.update { (vm) in
            vm.scene = .warning
            vm.duration = 0
        }
    }
}
```
