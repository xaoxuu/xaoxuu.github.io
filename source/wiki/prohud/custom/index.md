---
layout: wiki
wiki: ProHUD
order: 210
title: 自定义样式

---

## 微调样式

你可以在 AppDelegate 中配置好颜色、字体、间距等

```swift
ProHUD.config { (cfg) in
    cfg.rootViewController = window!.rootViewController
    cfg.primaryLabelColor = .black // 标题颜色
    cfg.secondaryLabelColor = .darkGray // 正文颜色
    cfg.alert { (a) in
        a.titleFont = .bold(22)
        a.bodyFont = .regular(17)
        a.boldTextFont = .bold(18)
        a.buttonFont = .bold(18)
        a.forceQuitTimer = 3
        a.iconSize = .init(width: 48, height: 48)
        a.margin = 8
        a.padding = 16
    }
    cfg.toast { (t) in
        t.titleFont = .bold(18)
        t.bodyFont = .regular(16)
    }
    cfg.guard { (g) in
        g.titleFont = .bold(22)
        g.subTitleFont = .bold(20)
        g.bodyFont = .regular(17)
        g.buttonFont = .bold(18)
    }
}
```

## 完全自定义布局

```swift
ProHUD.config { (cfg) in
    cfg.alert { (config) in
        config.reloadData { (vc) in
            // 这是数据模型
            vc.vm
            // 这是要弹出的vc
            vc
            // 你可以在这里完全自由布局
        }
    }
}
```
