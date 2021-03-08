---
layout: wiki
wiki: ProHUD
order: 130
seo_title: Alert - 弹窗组件
title: 弹窗组件
---

Alert 是用于弹窗的组件，可以预先对不同的场景配置不同的默认值（图标、持续时间）。由于 ProHUD 对每个实例记录了 ID ，您可以对已发布的实例进行文本和按钮的更新，包括新增、修改、删除文本和按钮，可以避免重叠。当不得不有多个弹窗同时出现时，它们呈现出景深效果。如果您不慎忘了处理超时情况，ProHUD 的弹窗也不会永远无法关闭，它默认会在一定时间后出现「强制退出」按钮以防止页面卡死。

## 简单的例子

### 写法1（缩放）

{% frame iphone11 video:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/alert01.mp4 %}

```swift
Alert.push(title: "正在同步")
```

如果您定义了「场景」模板，则可以这样：

```swift
Alert.push("loading", scene: .sync2) { (vc) in
    vc.update { (vm) in
        vm.title = "正在同步"
    }
}
```

为了与另一种写法进行对比，使用的 sync2 是一个没有默认标题的场景模板：

```swift
static var sync2: ProHUD.Scene {
    var scene = ProHUD.Scene.init(identifier: "sync.rotate")
    scene.image = UIImage(named: "prohud.rainbow.circle")
    scene.alertDuration = 0
    scene.toastDuration = 0
    return scene
}
```

### 写法2（缩放展开）

{% frame iphone11 video:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/alert02.mp4 %}

```swift
Alert.push("loading", scene: .sync2)
Alert.find("loading") { (vc) in
    vc.update { (vm) in
        vm.title = "正在同步"
    }
}
```

与「写法2」唯一的区别就是调整了顺序，先 push 出去，再 update 。

为了与另一种写法进行对比，使用的 sync2 是一个没有默认标题的场景模板：

```swift
static var sync2: ProHUD.Scene {
    var scene = ProHUD.Scene.init(identifier: "sync.rotate")
    scene.image = UIImage(named: "prohud.rainbow.circle")
    scene.alertDuration = 0
    scene.toastDuration = 0
    return scene
}
```


## 更新已有实例

示例：获取刚才弹出的 Loading，把它更新为加载成功。

```swift
Alert.find("loading", last: { (a) in
    a.update { (vm) in
        vm.scene = .success
        vm.title = "同步成功"
        vm.message = nil
    }
})
```

## 如何避免重叠

示例：发布一个横幅或者弹窗，如果已经有了就更新标题。

```swift
Alert.find("aaa", last: { (t) in
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
