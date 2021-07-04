---
layout: wiki
wiki: vim-cn.sh
title: 一个快速批量上传图片的脚本
---

<!-- more -->

## 直接使用

打开终端，`cd` 到存放图片的文件夹，输入这行命令就开始上传图片：

{% copy width:max curl -s https://cdn.jsdelivr.net/gh/xaoxuu/vim-cn.sh@2.1/upload.sh | sh %}

{% note color:cyan 为了简化指令，建议下载安装后使用。 %}

## 安装脚本

打开终端，输入这行命令：

{% copy width:max curl -s https://xaoxuu.com/install | sh -s vim-cn.sh %}

如需安装指定版本，在后面加上版本号即可，例如：

{% copy width:max curl -s https://xaoxuu.com/install | sh -s vim-cn.sh 2.1.0 %}

然后就会开始下载脚本并安装到 `usr/local/bin` 路径，可能需要输入电脑密码以授权。

## 上传文件

需要上传图片到时候，打开终端，`cd` 到存放图片的文件夹，输入 `upload` 就可以了。当然，还可以传递参数：

```sh
upload [扩展名] [操作]
```

| 扩展名                             | 含义               |
| :---------------------------------- | :------------------ |
| `all` 或者不传任何参数  | 上传所有格式的文件   |
| `png`、`jpg`、`ico` 等具体的某个扩展名 | 上传指定格式的文件 |

| 操作            | 含义               |
| :--------------- | :------------------ |
| `open` | 上传成功后打开链接 |


{% folding 常见的用法示例 %}

上传当前文件夹中的所有文件

```sh
upload
```

上传当前文件夹中的所有文件，并打开链接

```sh
upload all open
```

上传当前文件夹中的所有png格式的图片

```sh
upload png
```
{% endfolding %}


## 支持的文件格式


经测试，可以上传的格式有：png、jpg、ico、gif、svg、tiff、webp、pdf、mp3、mp4、zip等。

支持的文件大小大概在 50MB 以内。

## 请勿滥用

{% note color:yellow 注意 为了大家都能愉快使用，请不要上传一些奇奇怪怪的图片。 %}
