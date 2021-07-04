---
layout: wiki
wiki: Inspire
seo_title: 「Inspire」基于主题的Swift开发工具包
---


## 特性

### 可缓存的

- App 的样式参数（颜色、字体、布局）存储于 json 文件中。

### 可配置的

- 可由用户修改主题参数并保存或者分享。

### 提供便利

- 便捷的方式获取屏幕布局参数、如各边安全区域尺寸，便于机型适配。


## 开始使用

```ruby 在 Podfile 中添加：
pod 'Inspire'
```

```sh 然后执行：
pod install
```

## 用法示例



### 颜色

```swift
view.backgroundColor = .background
view.tintColor = .accent
```

### 字体

```swift
let lb = UILabel()
lb.font = .regular(15)
lb.font = .bold(20, for: .title)
lb.font = .regular(14, for: .code)
```

### 边距


```swift
let topMargin = layout.topBarHeight(for: self)
let bottomMargin = layout.bottomBarHeight(for: self)
let safeArea = layout.safeAreaInsets(for: self)
let safeArea2 = Inspire.shared.screen.safeAreaInsets
```

```swift
let layout = Inspire.shared.layout
view.frame.size.height = layout.rowHeight
view.layer.cornerRadius = layout.cornerRadius.large
```

### 缓存

```swift
// 保存
Inspire.shared.cache()
Inspire.shared.cache(named: "myTheme")
// 读取
let ipr = Inspire.init("myTheme")
```
