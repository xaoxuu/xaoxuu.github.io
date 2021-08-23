---
date: 2017-12-25
updated: 2017-12-25
title: 如何整理 iOS 老项目中混乱不堪的多语言翻译？
categories: [解决方案]
tags: [Code, iOS]
---


linksmart 项目截止目前已经支持了 17 个国家的语言，从诞生到现在也已经经历了很多程序员的修改和维护，代码已经变得十分混乱。因为公司一直在接新的定制项目，所以也没有时间进行一次彻底的重构，只能在维护某方面的 BUG 的时候，对相关代码进行局部重构。


<!-- more -->

现在的情况是：

- 同一个文本有些语言有翻译，有些语言没有翻译。
- 有些需要使用缩进的地方，由于某种原因，并没有使用 `UIEdgeInsets` 进行缩进，而是在文本前后加空格。(⊙﹏⊙)b


## 整理思路

首先必须得找出一种合适的方法维护这些 Localizable.strings，在 Excel 里做一个总表，增加语言的时候，可以直接把英文的一列发给客户进行翻译。最大的优势是：随时可以用脚本把 Excel 里的所有语言导出成项目支持的 Localizable.strings 文件，极大提高效率。


## 1. 补全

使用 `genstrings` 命令将所有 `.m` 文件中的 LocalizedString 文本生成 Localizable.strings。
打开终端，进入需要检测的文件夹，执行以下命令：

```
find ./ -name "*.m" -print0 | xargs -0 genstrings -o ./
```

生成的这一份文件只包含所有 `.m` 文件中的国际化字符串，并不包含 plist 和 xib 中的字符串。接下来只要把这一份和原来的所有翻译合并起来去重，就得到一份最全的 key。

如果也需要检测 xib、.h 文件，则执行以下命令：

```
 find . -name '*.xib' -o -name '*.[mh]' -print0 | xargs -0 genstrings -o ./
```

生成的文件会存在当前目录。


## 2. 合并去重

我尝试过直接读取 Localizable.strings 文件，但提示编码错误，就暂时 copy 到 txt 文件中进行处理。

> 合并的Demo：[https://github.com/xaoxuu/LocalizedTool-iOS](https://github.com/xaoxuu/LocalizedTool-iOS)



## 3. 导入Excel

接下来的步骤工作量有点大，就是重新把那些翻译导入 Excel 中，补全缺少的那些翻译。


### 1. 下载，解压

下载工具：[https://github.com/CatchZeng/Localizable.strings2Excel](https://github.com/CatchZeng/Localizable.strings2Excel) 。


解压开之后把里面的两个zip也解压开

### 2. 安装工具

#### pyexcelerator

打开命令行工具，cd到 `.../Localizable.strings2Excel-master/pyexcelerator-0.6.4.1` 文件夹，执行：
```sh
sudo python setup.py install
```
#### xld

cd到 `.../Localizable.strings2Excel-master/xlrd-1.0.0` 文件夹，执行：
```sh
sudo python setup.py install
```


### 3. 使用脚本

cd到 `.../Localizable.strings2Excel-master/python` 文件夹

如需将Excel表格转换成Localizable.strings或者strings.xml文件，执行：
```sh
python LocalizableBack.py -f xxx/xxx.xls -t xxx/xxx
```

如需将Localizable.strings或者strings.xml文件转换成Excel表格，执行：
```sh
python Localizable.py -f xxx/ -t xxx/
```


> 工具的链接在：[GitHub/CatchZeng](https://github.com/CatchZeng/Localizable.strings2Excel) 感谢作者编写了如此方便的工具！
> 更多详细使用脚本请阅读[官方README文件](https://github.com/CatchZeng/Localizable.strings2Excel) 。


## 附：检测中文字符串

如果项目的默认语言是中文，而且前期没有用多语言写法，可以使用 Xcode 的替换功能，将中文字符串替换成多语言的写法：

搜索：
```
(@"[^"]*[\u4E00-\u9FA5]+[^"\n]*?")
```

替换为：
```
NSLocalizedStringFromTable($0, @"Localizable", nil)
```
