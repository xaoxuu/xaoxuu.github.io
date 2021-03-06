---
date: 2016-09-14
updated: 2016-10-20
title: 如何从 UIImageView 指定的坐标点取色？
categories: [解决方案]
tags: [iOS, 开源库]
references:
  - title: Simple way to read pixel color values from an PNG image on the iPhone?
    url: https://stackoverflow.com/questions/3773245/simple-way-to-read-pixel-color-values-from-an-png-image-on-the-iphone
---

开发中有时候会遇到这样的需求，要给用户一个取色板，让用户从中自由地选取颜色，用来改变主题或者控制灯具的颜色等。这时候我们就需要获取一个视图的指定坐标的颜色值。

<!-- more -->

有时候我们可能会需要一个取色器，例如我的蓝牙灯项目，让用户从一个取色器中随意取色：

```objc
#import <CoreGraphics/CoreGraphics.h>

#import "UIImage+ColorAtPixel.h"

@implementation UIImage (ColorAtPixel)

- (UIColor *)colorAtPixel:(CGPoint)point {
    // Cancel if point is outside image coordinates
    if (!CGRectContainsPoint(CGRectMake(0.0f, 0.0f, self.size.width, self.size.height), point)) {
        return nil;
    }


    // Create a 1x1 pixel byte array and bitmap context to draw the pixel into.
    // Reference: http://stackoverflow.com/questions/1042830/retrieving-a-pixel-alpha-value-for-a-uiimage
    NSInteger pointX = trunc(point.x);
    NSInteger pointY = trunc(point.y);
    CGImageRef cgImage = self.CGImage;
    NSUInteger width = CGImageGetWidth(cgImage);
    NSUInteger height = CGImageGetHeight(cgImage);
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    int bytesPerPixel = 4;
    int bytesPerRow = bytesPerPixel * 1;
    NSUInteger bitsPerComponent = 8;
    unsigned char pixelData[4] = { 0, 0, 0, 0 };
    CGContextRef context = CGBitmapContextCreate(pixelData,
                                                 1,
                                                 1,
                                                 bitsPerComponent,
                                                 bytesPerRow,
                                                 colorSpace,
                                                 kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
    CGColorSpaceRelease(colorSpace);
    CGContextSetBlendMode(context, kCGBlendModeCopy);

    // Draw the pixel we are interested in onto the bitmap context
    CGContextTranslateCTM(context, -pointX, -pointY);
    CGContextDrawImage(context, CGRectMake(0.0f, 0.0f, (CGFloat)width, (CGFloat)height), cgImage);
    CGContextRelease(context);

    // Convert color values [0..255] to floats [0.0..1.0]
    CGFloat red   = (CGFloat)pixelData[0] / 255.0f;
    CGFloat green = (CGFloat)pixelData[1] / 255.0f;
    CGFloat blue  = (CGFloat)pixelData[2] / 255.0f;
    CGFloat alpha = (CGFloat)pixelData[3] / 255.0f;
    return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
}

@end
```

## 开始优化

```objc
/**
 从圆形范围内的指定点获取UIColor对象，并在block中执行操作

 @param point      指定坐标点
 @param completion 取色完成后执行的block
 */
- (void)ax_getColorFromCircleWithPoint:(CGPoint)point completion:(void (^)(UIColor *color))completion;
```

调用起来应该是这样的：

```objc
// 已知imageView、point
[imageView ax_getColorFromCircleWithPoint:point completion:^(UIColor *color){
  // 在这里直接用color
}];
```

因为取色板一般是圆形的，如果坐标点超出了圆形但依然在imageView的frame内，可能会返回一些用户不期望的结果，用block巧妙地解决了这一问题，超出范围就不再有回调。如果你认为我的封装使用起来更加方便，可以继续阅读下面详细内容。



## 开始使用

推荐CocoaPods方式，在podfile中添加一行：

```sh
pod 'AXKit'
```
然后在终端中执行 `pod install` 即可完成安装。

AXKit的全局头文件是：

```objc
// 通过CocoaPods或静态库方式安装
#import <AXKit/AXKit.h>
// 通过手动方式
#import "AXKit.h"
```



## 接口声明

### 从指定点获取RGBA值

```objc
- (void)ax_getRed:(nullable CGFloat *)red green:(nullable CGFloat *)green blue:(nullable CGFloat *)blue alpha:(nullable CGFloat *)alpha withPoint:(CGPoint)point;

// 调用起来是这样的：
// 已知imageView、point
CGFloat r,g,b,a;
[imageView ax_getRed:&r green:&g blue:&b alpha:&a withPoint:point];
// 然后r/g/b/a就有了值
```

需要自己创建变量，然后把地址传进去，然后才能用，不推荐直接使用。

### 从指定点获取RGBA值，并在block中执行操作

加了一个block，调用起来就方便许多：

```objc
- (void)ax_getRGBAWithPoint:(CGPoint)point completion:(void(^)(CGFloat red,CGFloat green,CGFloat blue,CGFloat alpha))completion;

// 调用起来是这样的：
// 已知imageView、point
[imageView ax_getRGBAWithPoint:point completion:^(CGFloat red,CGFloat green,CGFloat blue,CGFloat alpha){
  // 在这里直接用red/green/blue/alpha
}];
```

优点是不需要自己创建变量，直接调用方法，在block回调里直接获得red/green/blue/alpha值。


> 但是，很多时候，我们用的取色器是圆形的，就需要再进行一点封装。


### 从圆形范围内的指定点获取RGBA值，并在block中执行操作

```objc
- (void)ax_getRGBAFromCircleWithPoint:(CGPoint)point completion:(void (^)(CGFloat red,CGFloat green,CGFloat blue,CGFloat alpha))completion;

// 调用起来是这样的：
// 已知imageView、point
[imageView ax_getRGBAFromCircleWithPoint:point completion:^(CGFloat red,CGFloat green,CGFloat blue,CGFloat alpha){
  // 在这里直接用red/green/blue/alpha
}];
```

跟第2种调用方法一模一样，但是区别是超出圆形范围之后就不再执行block回调了，这是一种**安全**的做法。如果不用block方式，那么即使超出了圆形范围，也一定会返回对应的rgba值，会造成不想要的后果。

> block的回调机制巧妙地解决了这个问题。

如果我想直接获得一个UIColor对象呢，跟获取RGBA一样有三种方法。

### 从指定点获取UIColor对象

```objc
- (nullable UIColor *)ax_getColorWithPoint:(CGPoint)point;

// 调用起来是这样的：
// 已知imageView、point
UIColor *color = [imageView ax_getColorWithPoint:point];
// 获得UIColor对象
```

由声明可以看出来，返回的值是一个可空类型，因此这跟第一种方法一样是**不安全**的。

### 从指定点获取UIColor对象，并在block中执行操作

```objc
- (void)ax_getColorWithPoint:(CGPoint)point completion:(void(^)(UIColor *color))completion;

// 调用起来是这样的：
// 已知imageView、point
[imageView ax_getColorWithPoint:point completion:^(UIColor *color){
  // 在这里直接用color
}];
```

这种方法比第4种要方便一些，如果超出UIImageView的时候就不执行block里的代码。

### 从圆形范围内的指定点获取UIColor对象，并在block中执行操作

```objc
- (void)ax_getColorFromCircleWithPoint:(CGPoint)point completion:(void (^)(UIColor *color))completion;

// 调用起来是这样的：
// 已知imageView、point
[imageView ax_getColorFromCircleWithPoint:point completion:^(UIColor *color){
  // 在这里直接用color
}];
```

引言中的Demo用的就是这一种方法，在圆形取色器中取色，既方便又安全。
