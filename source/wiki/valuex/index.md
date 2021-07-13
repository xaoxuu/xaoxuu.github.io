---
layout: wiki
wiki: ValueX
title: 实用的ObjC安全对象类型转换库
---

## 特性

- 有效避免后台返回数据类型异常导致程序崩溃
- 快速由已知对象得到期望的对象类型

## 开始使用

```ruby 在 Podfile 中添加：
pod 'ValueX'
```

```sh 然后执行：
pod install
```

### 确保类型正确

以字符串为例，通过 `NSSafeString(obj)` 拿到的值如果不为空，则其类型一定是 `NSString`，不会是 `NSNumber` 或者 `NSNull`。


{% folding child:codeblock open:true 测试代码 %}
```ObjC
- (void)test01 {
    NSDictionary *d1 = @{@"name": @"Mr. Xu", @"info": @"{\n    \"age\" : \"23\",\n    \"userId\" : \"123123123\",\n    \"deviceId\" : \"<null>\"\n}"};
    NSLog(@"\nd1: %@", d1);
    NSDictionary *d11 = NSSafeDictionary([d1 dictionaryForKey:@"name"]);
    NSDictionary *d12 = NSSafeDictionary([d1 dictionaryForKey:@"info"]);
    NSLog(@"\n d11: %@,\n d12: %@", d11, d12);

    NSDictionary *d2 = @{@"age": @23, @"userId": @"123123123", @"deviceId": @"<null>"};
    NSLog(@"\nd2: %@", d2);
    NSNumber *d21 = [d2 numberForKey:@"userId"];
    NSString *d22 = [d2 stringForKey:@"userId"];
    NSNumber *d23 = [d2 numberForKey:@"age"];
    NSString *d24 = [d2 stringForKey:@"age"];
    NSNumber *d25 = [d2 numberForKey:@"deviceId"];
    NSString *d26 = [d2 stringForKey:@"deviceId"];
    NSLog(@"\n d21: %@,\n d22: %@,\n d23: %@,\n d24: %@,\n d25: %@,\n d26: %@", d21, d22, d23, d24, d25, d26);
}
```
{% endfolding %}


### 安全地获取字典值

字典中的值存在很多不确定性，例如 `age` 可能是 `NSNumber`，也可能是 `NSNull` 的实例对象。

通过 `[dict numberForKey:@"age"]` 得到的值，如果不为空，则一定是 `NSNumber` 的实例对象。

{% folding child:codeblock open:true 测试代码 %}
```ObjC
/**
 测试: 从后台接收到字典

 @param value 后台返回的字典数据
 */
- (void)test1:(NSDictionary *)value {
    NSLog(@"value: %@", value);
    // 真实类型并不一定是NSDictionary，要确保拿来用的时候一定是NSDictionary
    VXObject *vx = ValueX(value);
    NSDictionary *dict = ValueX(value).dictionaryValue;
    NSLog(@"ValueX(value).dictionaryValue: %@", dict);
    // 获取其中的某个值
    NSNumber *deviceId = [dict numberForKey:@"deviceId"];
    NSString *userId = [dict stringForKey:@"userId"];
    NSNumber *age = [dict numberForKey:@"age"];
    NSLog(@"deviceId: %@, userId: %@, age: %@", deviceId, userId, age);
    NSString *str = vx.stringValue;
    NSLog(@"ValueX(value).stringValue: %@", str);
}
```
{% endfolding %}

### 数据类型转换

如果我们已知一个字典，想要得到它的Json字符串，只需要通过 `ValueX(dict).stringValue` 获取。

同理，只要是能互相转换的值均能通过类似的格式一行代码获取，如果不能转换，得到的值是 `nil`。

{% folding child:codeblock open:true 测试代码 %}
```ObjC
- (void)test2:(NSDictionary *)value {
    NSLog(@"value: %@", value);
    // 真实类型并不一定是NSDictionary，要确保拿来用的时候一定是NSDictionary
    NSDictionary *dict = ValueX(value).dictionaryValue;
    NSLog(@"ValueX(value).dictionaryValue: %@", dict);
    // 获取其中的某个值
    NSDictionary *info = [dict dictionaryForKey:@"info"];
    NSLog(@"info: %@", info);
}
```
{% endfolding %}
