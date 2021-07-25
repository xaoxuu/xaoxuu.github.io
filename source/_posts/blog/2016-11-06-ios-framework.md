---
date: 2016-11-06
updated: 2016-11-06
title: 如何封装自己的 iOS Framework 静态库
categories: [解决方案]
tags: [iOS, Framework]
cover: xcode,framework
references:
  - title: iOS开发——创建你自己的Framework
    url: http://www.cocoachina.com/articles/11022
---

像工作中使用的第三方SDK基本上都是闭源的，因为公司不能把自己的机密泄露出去。所以当需要给别人提供SDK但不让他们知道代码的实现时就需要封装成静态库。

<!-- more -->

## 步骤

1. 创建工程，最好是起名为 `xxxDemo` 例如 `AXKitDemo`，然后新建一个 target 名为 `AXKit`，并把原来的工程改名为 `AXKit`。（为了方便在 demo 中调试静态库）
2. 新建一个 target ，选择类型为 `framework`。
3. 在 `framework` 中创建需要封装的类，写好代码。
4. 在 `Build Setting` 里更改参数，`Math-O Type` 为 `Static Library`。
5. 在 `Build Phases -> Headers` 里将需要暴露出来的头文件从 `Project` 移动到 `Public`。
6. 添加一个 `Aggregate` 的 target，并添加运行脚本。目的是把编译出来的真机版和模拟器版的 `framework` 合并。
7. 模拟器编译一下，真机编译一下，然后 `Aggregate` 编译一下，然后在项目的 `Products` 文件夹里就有了最终生成的静态库。

## 自动合成脚本

`Aggregate` 的 Run Script 脚本：

```
if [ "${ACTION}" = "build" ]
then
INSTALL_DIR=${SRCROOT}/Products/${PROJECT_NAME}.framework

DEVICE_DIR=${BUILD_ROOT}/${CONFIGURATION}-iphoneos/${PROJECT_NAME}.framework

SIMULATOR_DIR=${BUILD_ROOT}/${CONFIGURATION}-iphonesimulator/${PROJECT_NAME}.framework


if [ -d "${INSTALL_DIR}" ]
then
rm -rf "${INSTALL_DIR}"
fi

mkdir -p "${INSTALL_DIR}"

cp -R "${DEVICE_DIR}/" "${INSTALL_DIR}/"
#ditto "${DEVICE_DIR}/Headers" "${INSTALL_DIR}/Headers"

lipo -create "${DEVICE_DIR}/${PROJECT_NAME}" "${SIMULATOR_DIR}/${PROJECT_NAME}" -output "${INSTALL_DIR}/${PROJECT_NAME}"

#open "${DEVICE_DIR}"
#open "${SRCROOT}/Products"
fi
```
