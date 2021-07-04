---
layout: wiki
seo_title: 「AXKit」综合型ObjC开发工具包
wiki: AXKit
---

<!-- more -->

## 特性

### 沙盒文件

- 使用链式语法快速存取沙盒文件

### .toJson()

- `.toJson()` 快速将字典、数组与 json 进行转换以及非空判断

### Blocks

* 构造方法的 block 支持
* EventTarget 的 block 支持
* 给视图添加手势的 block 支持（Runtime）

### Cooldown

* 代码冷却机制（基于 GCD 实现）

### Date+

* NSDate 的链式封装（日期的格式化和操作）


## 开始使用

```ruby 在 Podfile 中添加：
pod 'AXKit'
```

```sh 然后执行：
pod install
```

## 示例

### 沙盒文件与ToJson

保存

```ObjC
NSDictionary *dict = @{@"name": @"Alex"};
@"File.json".docPath.saveJson(dict);
```

读取和转换

```ObjC
id read = @"File.json".docPath.readJson();
NSDictionary *readDict = NSDictionary.safe(read);
NSArray *readArr = NSArray.safe(read);
```
转换
```ObjC
NSUserDefaults.setObjectForKey(@23, @"age");
NSUserDefaults.numberForKey(@"age");
NSUserDefaults.setObjectForKey(@"23", @"age");
NSUserDefaults.numberForKey(@"age");
// 以上两种情况都可以正常读取到值，因为内部做了自动转换
```

### Cooldown

```ObjC
// 10秒内即使多次调用也不会重复执行
ax_dispatch_cooldown(0, 10, "cool", dispatch_get_main_queue(), ^{
    // do something
}, ^{
    NSLog(@"正在冷却，请稍后")
});
```

### Date+

```ObjC
NSDate *date = NSDate.initWithFormat(@"yyyyMMdd", @"20160802");
date = date.addDays(1).addhours(-1).addWeeks(-2).addMinutes(20);
NSString *str = date.stringWithFormat(@"yyyyMMdd");
```

### Blocks

手势

```ObjC
[view ax_addTapGestureHandler:^(UITapGestureRecognizer * sender) {
    // 点击事件
}];
[view ax_addPanGesture:nil handler:^(UIPanGestureRecognizer * sender) {
    // 拖拽
}];
[view ax_addLongPressGesture:^(UILongPressGestureRecognizer * sender) {
    sender.minimumPressDuration = 5;
} handler:^(UILongPressGestureRecognizer * sender) {
    // 长按
}];
...
```

事件

```ObjC
UIButton *button;
[button ax_addTouchUpInsideHandler:^(UIButton * sender) {
    // 点击
}];

UISlider *slider;
[slider ax_addEventHandler:^(UISlider * sender) {
    // 事件
} forControlEvents:UIControlEventValueChanged];
...
```
