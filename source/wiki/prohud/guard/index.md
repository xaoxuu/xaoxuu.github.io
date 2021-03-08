---
layout: wiki
wiki: ProHUD
order: 140
seo_title: Guard - 操作表组件
title: 操作表组件

---

Guard 是一个操作表控件，如同守卫一样，它可以用于某些功能或者页面的准入判断，与弹窗不同的是，它更容易返回，可以放置更多丰富的组件。典型的应用场景是：升级至专业版、阅读隐私协议等。

{% frame iphone11 img:https://cdn.jsdelivr.net/gh/cdn-x/wiki/prohud/docs/guard-upgrade@2x.jpg focus:bottom %}

## 简单的例子

`Guard` 控件使用更加灵活：

```swift
Guard.push { (g) in
    g.update { (vm) in
        vm.add(title: "大标题")
        vm.add(subTitle: "副标题")
        vm.add(message: "正文")
        vm.add(action: .default, title: "确定") {
            // do something
        }
        vm.add(action: .destructive, title: "删除") {
            // do something
        }
        vm.add(action: .cancel, title: "取消") {

        }
    }
}
```

示例1：弹出一个删除的操作表

```swift
Guard.push() { (g) in
    g.update { (vm) in
        // 添加一个删除按钮
        vm.add(action: .destructive, title: "删除") { [weak g] in
            // 确认弹窗
            Alert.push(scene: .delete, title: "确认删除", message: "此操作不可撤销") { (a) in
                a.update { (vm) in
                    vm.add(action: .destructive, title: "删除") { [weak a] in
                        // 删除操作
                        a?.pop()
                    }
                    vm.add(action: .cancel, title: "取消", handler: nil)
                }
            }
            g?.pop()
        }
        // 添加一个取消按钮
        vm.add(action: .cancel, title: "取消", handler: nil)
    }
}
```

示例2：弹出一个全屏的隐私政策页面

```swift
Guard.push() { (vc) in
    vc.isFullScreen = true
    vc.update { (vm) in
        let titleLabel = vm.add(title: "隐私协议")
        titleLabel.snp.makeConstraints { (mk) in
            mk.height.equalTo(44)
        }
        let tv = UITextView()
        tv.backgroundColor = .white
        tv.isEditable = false
        vc.textStack.addArrangedSubview(tv)
        tv.text = "这里可以插入一个webView"
        vm.add(message: "请认真阅读以上内容，当您阅读完毕并同意协议内容时点击接受按钮。")
        vm.add(action: .default, title: "接受") { [weak vc] in
            vc?.pop()
        }
    }  
}
```
