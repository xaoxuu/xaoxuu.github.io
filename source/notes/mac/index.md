---
robots: noindex,nofollow
sitemap: false
menu_id: notes
layout: wiki
wiki: Notes
title: Mac 相关问题
order: 101
---


{% folding 提示 “安装包已损坏” 怎么办？ %}

{% copy sudo spctl --master-disable %}

{% endfolding %}

{% folding child:codeblock 清理 Mac 的 DNS 缓存 %}

```
sudo killall -HUP mDNSResponder
sudo killall mDNSResponderHelper
sudo dscacheutil -flushcache
```

{% endfolding %}


{% folding TNT 团队的应用无法使用怎么办？ %}

TNT 的证书签署的软件在 2019年7月12日 后都不能运行了，临时的解决办法，就是自己签名。

**1. 安装 Xcode**

安装 Xcode，你可以在 App Store 中下载安装，并且至少运行一次。

**2. 安装 Command Line Tools 工具**

打开终端工具输入如下命令：

{% copy xcode-select --install %}

弹出后选择继续安装。

**3. 为应用签名**

打开终端工具输入并执行如下命令：

```
codesign --force --deep --sign - /Applications/name.app
```

注意后面的文件路径，你可以打开访达找到应用程序，找到要签名的软件，直接拖入「终端」界面，即可自动生成路径。


{% endfolding %}


{% folding 显示隐藏文件 %}

{% tabs active:1 align:left %}

<!-- tab 显示 -->

{% copy defaults write com.apple.finder _FXShowPosixPathInTitle -bool TRUE; killall Finder %}

<!-- tab 隐藏 -->

{% copy defaults delete com.apple.finder _FXShowPosixPathInTitle; killall Finder %}

{% endtabs %}

{% endfolding %}

{% folding 外置磁盘路径 %}

```
/volume/磁盘路径/~~~
```
例如一个名称为 "Files" 的磁盘里的文件夹 "Projects" 路径是:
```
/Volumes/Files/Projects/
```

{% endfolding %}

{% folding 使用终端将 json 文件转为 plist 文件 %}

```
plutil -convert xml1 data.json -o data.plist
```

其中 `data.json`、`data.plist` 分别对应转换前后的文件路径。

{% endfolding %}

{% folding sudo 依然没有权限的解决办法 %}

{% tabs active:1 %}

<!-- tab 查询 SIP 状态 -->

{% copy csrutil status %}

如果输出以下信息，说明 SIP 开启，需要暂时将 SIP 关闭。

{% codeblock %}
System Integrity Protection status: enabled.
{% endcodeblock %}

<!-- tab 关闭 SIP -->

重启 Mac，按住 {% kbd command %} + {% kbd R %} 直到出现开机 logo，此时会进入 Recovery 模式，选择「实用工具」->「Terminal」并输入以下命令：

{% copy csrutil disable %}

然后重新启动电脑即可关闭 SIP。

<!-- tab 开启 SIP -->

重启 Mac，按住 {% kbd command %} + {% kbd R %} 直到出现开机 logo，此时会进入 Recovery 模式，选择「实用工具」->「Terminal」并输入以下命令：

{% copy csrutil enable %}

然后重新启动电脑即可开启 SIP。

{% endtabs %}

{% endfolding %}


{% folding 搭载 Intel 芯片的 Mac 启动组合键 %}

- **Command (⌘)-R**：从内建的 macOS 恢复系统启动。或者，您也可以使用 Option-Command-R 或 Shift-Option-Command-R 以通过互联网从 macOS 恢复功能启动。macOS 恢复功能可以安装不同版本的 macOS，具体取决于您在电脑启动时使用的组合键。如果您的 Mac 使用了固件密码，系统将提示您输入这个密码。

- **Option (⌥) 或 Alt**：启动进入“启动管理器”，您可以从中选取其他可用的启动磁盘或宗卷。如果您的 Mac 使用了固件密码，系统将提示您输入这个密码。

- **Option-Command-P-R**：重置 NVRAM 或 PRAM。如果您的 Mac 使用了固件密码，电脑会忽略这个组合键或从 macOS 恢复功能启动。

- **Shift (⇧)** ：以安全模式启动。如果使用了固件密码，这个组合键将被停用。

- **D**：启动进入“Apple 诊断”实用工具。也可以使用 Option-D 通过互联网启动进入这个实用工具。如果使用了固件密码，这个组合键将被停用。

- **N**：从 NetBoot 服务器启动，前提是您的 Mac 支持网络启动宗卷。要使用服务器上默认的引导映像，请按住 Option-N。如果使用了固件密码，这个组合键将被停用。

- **Command-S**：以单用户模式启动。如果运行的是 macOS Mojave 或更高版本，或者使用了固件密码，这个组合键会被停用。

- **T**：以目标磁盘模式启动。如果使用了固件密码，这个组合键将被停用。

- **Command-V**：以详细模式启动。如果使用了固件密码，这个组合键将被停用。

- **推出键 (⏏)、F12**、鼠标按钮或触控板按钮：推出可移动介质，例如光盘。如果使用了固件密码，这个组合键将被停用。

{% endfolding %}
