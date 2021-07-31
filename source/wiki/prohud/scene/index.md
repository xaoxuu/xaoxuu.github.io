---
layout: wiki
wiki: ProHUD
order: 200
title: 场景及其扩展

---

你可以在一个文件中扩展场景，例如：

```swift
extension ProHUD.Scene {
    static var confirm: ProHUD.Scene {
        var scene = ProHUD.Scene(identifier: "confirm")
        scene.image = UIImage(named: "ProHUDMessage")
        return scene
    }
    static var delete: ProHUD.Scene {
        var scene = ProHUD.Scene(identifier: "delete")
        scene.image = UIImage(named: "ProHUDTrash")
        scene.title = "确认删除"
        scene.message = "此操作不可撤销"
        return scene
    }
    static var buy: ProHUD.Scene {
        var scene = ProHUD.Scene(identifier: "buy")
        scene.image = UIImage(named: "ProHUDBuy")
        scene.title = "确认付款"
        scene.message = "一旦购买拒不退款"
        return scene
    }
}
```

这样你在发布横幅或者弹窗的时候，scene 参数就可以填写 `.confirm, .delete, .buy` 这三种了。例如：

```swift
Alert.push(scene: .delete) { (a) in
    a.update() { (vm) in
        vm.add(action: .destructive, title: "删除") { [weak a] in
            // 删除操作
            a?.pop()
        }
        vm.add(action: .cancel, title: "取消", handler: nil)
    }
}
```

这样就可以弹出一个预先配置好的确认删除样式的弹窗。
