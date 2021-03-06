---
robots: noindex,nofollow
sitemap: false
menu_id: notes
layout: wiki
wiki: Notes
seo_title: Mac
order: 10
---

## 安装应用相关的问题

### 提示 “安装包已损坏”

{% copy sudo spctl --master-disable %}

### TNT团队的应用无法使用怎么办

TNT的证书签署的软件在2019年7月12日后都不能运行了，临时的解决办法，就是自己签名。

#### 1. 安装 Xcode

安装 Xcode，你可以在 App Store 中下载安装，并且至少运行一次。

#### 2. 安装 Command Line Tools 工具

打开终端工具输入如下命令：

{% copy xcode-select --install %}

弹出后选择继续安装。

#### 3. 为应用签名

打开终端工具输入并执行如下命令：

```
codesign --force --deep --sign - /Applications/name.app
```

注意后面的文件路径，你可以打开访达找到应用程序，找到要签名的软件，直接拖入「终端」界面，即可自动生成路径。

## Mac 常用终端命令


### 显示隐藏文件

{% copy defaults write com.apple.finder _FXShowPosixPathInTitle -bool TRUE; killall Finder %}

### 不显示隐藏文件

{% copy defaults delete com.apple.finder _FXShowPosixPathInTitle; killall Finder %}

### 外置磁盘路径

```
/volume/磁盘路径/~~~
```
例如一个名称为 "Files" 的磁盘里的文件夹 "Projects" 路径是:
```
/Volumes/Files/Projects/
```


### 使用终端将 json 文件转为 plist 文件

```
plutil -convert xml1 data.json -o data.plist
```

其中 `data.json`、`data.plist` 分别对应转换前后的文件路径。


### sudo 依然没有权限的解决办法

#### 查询 SIP 状态

{% copy csrutil status %}

如果输出以下信息，说明 SIP 开启，需要暂时将 SIP 关闭。

```
System Integrity Protection status: enabled.
```


#### 关闭 SIP


重启 Mac，按住 {% kbd command %} + {% kbd R %} 直到出现开机 logo，此时会进入 Recovery 模式，选择「实用工具」->「Terminal」并输入以下命令：

{% copy csrutil disable %}

然后重新启动电脑即可关闭 SIP。


#### 开启 SIP

重启 Mac，按住 {% kbd command %} + {% kbd R %} 直到出现开机 logo，此时会进入 Recovery 模式，选择「实用工具」->「Terminal」并输入以下命令：

{% copy csrutil enable %}

然后重新启动电脑即可开启 SIP。
