---
date: 2016-09-12
updated: 2016-10-20
title: ObjC 使用链式语法更优雅地管理沙盒文件
categories: [设计开发]
tags: [iOS, 链式语法, 沙盒, 缓存]
banner: https://fastly.jsdelivr.net/gh/cdn-x/xaoxuu@1.0.1/blog/2016-0912a@1x.svg
---

假如你需要把一个字典或者别的什么东西保存到沙盒里，你准备怎么做？也许你已经条件反射的想到了操作步骤……其实，你可以不必每次都那么老老实实的把每一步写出来，一行代码就可以了：【路径+保存文件】两个关键点，组成一条链式语法。

<!-- more -->

```objc
@"文件名".cachePath.save(要保存的内容);
```


## 接入AXKit

如果你的项目里还没有AXKit，可以在pod文件里添加一条 `pod 'AXKit'` 进行接入，也可移步至 [AXKit在线文档](https://xaoxuu.com/wiki/axkit) 查看详细的安装和使用方法。



## 路径

我封装了几个常用的沙盒路径，如下：

```objc
- (nullable NSString *)mainBundlePath; // mainBundlePath就是主工程项目里的文件路径
- (NSString *)docPath; // 文档，iTunes会备份，适合保存重要的数据
- (NSString *)cachePath; // 缓存，iTunes不会备份，适合保存不太重要的较大的数据
- (NSString *)tempPath; // 临时文件，iTunes不会备份，系统空闲时会自动删除，设备重启时也会删除
```

除此之外，还提供了所有的路径，通过枚举的方式获取：

```objc
- (NSString *(^)(NSSearchPathDirectory))path; // 传入NSSearchPathDirectory枚举就可得到路径
```

### 示例

在沙盒的文档路径里有个叫 `abc.plist` 的文件，它的描述就是：

```objc
@"abc.plist".docPath;
```



### 路径的拼接

任何一个字符串都可以使用 `.append()` 进行拼接。





## 保存

保存的方法目前提供有四个：

```objc
- (BOOL(^)(id))savePlist;
- (BOOL(^)(NSObject<NSCoding> *))saveArchivedPlist;
- (BOOL(^)(NSObject<NSCoding> *))saveArchivedObject;
- (BOOL(^)(id <NSCoding>))save;
```

### 示例

1. 在doc路径下保存一个名为"arr.plist"的文件：

  ```objc
  NSArray *arr = [NSArray array];
  BOOL result = @"arr".docPath.savePlist(arr);
  ```

2. 在cache路径下归档一个名为"myfile.plist"的文件：

   ```objc
   MyProfiles *myfile = [[MyProfiles alloc] init];
   // MyProfiles类需实现NSCoding协议
   BOOL result = @"myfile".cachePath.saveArchivedPlist(myfile);
   ```

   ​



## 读取

读取的方法目前提供了七个：

```objc
- (nullable __kindof NSArray *)readArray;
- (nullable __kindof NSDictionary *)readDictionary;
- (nullable id)readArchivedPlist;
- (nullable id)readJson;
- (nullable NSString *)readTxt;
- (nullable id)readArchivedFile;
- (nullable id)readArchivedObject;
```

### 示例

1. 在doc路径下读取一个名为"arr.plist"的文件：

   ```objc
   NSArray *arr = @"arr".docPath.readArray;
   ```

2. 在cache路径下解档一个名为"myfile.plist"的文件：

   ```objc
   MyProfiles *myfile = @"myfile".cachePath.readArchivedPlist;
   ```

   ​

## 查询

遍历路径下所有文件

```objc
// 获取doc/myDir 路径下所有的扩展名为"plist"文件路径
NSArray *paths = @"myDir".docPath.subpaths(@"plist");
// 如果传入值为空，则不区分扩展名获取所有文件路径
NSArray *paths2 = @"myDir".docPath.subpaths(@"");
// paths里面装的是doc/myDir路径下的所有文件完整路径
```



## 删除

结构：【路径+删除】

```objc
- (BOOL)removePlist;
- (BOOL)removeJson;
- (BOOL)removeTxt;
- (BOOL)remove;
```

### 示例

1. 在doc路径下删除一个名为"arr.plist"的文件：

   ```objc
   BOOL result = @"arr.plist".docPath.remove;
   ```

2. 在cache路径下删除一个名为"myfile.plist"的文件：

   ```objc
   MyProfiles *myfile = @"myfile.plist".cachePath.remove;
   ```



## 详细文档

{% link /wiki/axkit/ AXKit %}
