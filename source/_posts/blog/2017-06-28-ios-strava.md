---
date: 2017-06-28
updated: 2017-06-28
title: iOS 接入 Strava 分享模块（下篇：StravaSDK）
categories: [解决方案]
tags: [iOS, StravaSDK]
references:
  - url: https://strava.github.io/api/
  - url: https://github.com/StravaKit/StravaKit/
  - url: https://github.com/xaoxuu/StravaSDK/
---

[StravaKit](https://github.com/StravaKit/StravaKit) 是一个比较新而且代码比较规范的第三方SDK，但是目前还没有上传功能（详见 [todo](https://github.com/StravaKit/StravaKit/blob/master/TODO.md)） 。所以我不得已对 `StravaKit 0.9.5` 增加上传功能，并进行一些简单封装和改编，使之能够植入到公司项目中。由于时间有限，我只增加了上传fit文件的功能，并且使用了第三方框架 `Alamofire`，所以需要在项目中导入 `Alamofire`。


<!-- more -->

## 开始使用

StravaSDK 下载：[StravaSDK.zip](https://github.com/xaoxuu/StravaSDK)


## 配置环境

需要三个参数：`ClientId`、`ClientSecret` 和app的 `URLSchemes`。其中前两个是在 [Strava平台](https://labs.strava.com/developers/) 注册一个app的时候会给出。
示例代码：

```swift
StravaSDK.config(clientId: "18583", clientSecret: "a05fde98a830effde2e0f84cc39d76b040d4d67e", appSchemes: "hitfit")
```



## 授权

获取授权
```swift
StravaSDK.authorize()
```

取消授权
```swift
StravaSDK.deauthorize()
```

查询是否已授权
```swift
StravaSDK.isAuthorized
```


## 上传活动数据（.fit）

```swift
StravaSDK.uploadActivity(path: ".../test.fit", type: "run", name: "Afternoon Run") { (response, error) in

}
```
