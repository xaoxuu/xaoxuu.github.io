---
layout: wiki
wiki: Git
title: 安装与配置
order: 1
---

## 安装

{% tabs %}

<!-- tab Linux -->
{% link https://git-scm.com/download/linux 下载地址 %}

安装指定系统的依赖包：

{% codeblock Centos/RedHat %}
$ yum install curl-devel expat-devel gettext-devel \
  openssl-devel zlib-devel
{% endcodeblock %}
{% codeblock Debian/Ubuntu %}
$ apt-get install libcurl4-gnutls-dev libexpat1-dev gettext \
  libz-dev libssl-dev
{% endcodeblock %}

解压安装下载的源码包：

{% codeblock %}
$ tar -zxf git-1.7.2.2.tar.gz
$ cd git-1.7.2.2
$ make prefix=/usr/local all
$ sudo make prefix=/usr/local install
{% endcodeblock %}

{% folding 使用终端指令安装 %}

**Debian/Ubuntu**

{% codeblock %}
$ apt-get install libcurl4-gnutls-dev libexpat1-dev gettext \
  libz-dev libssl-dev

$ apt-get install git

$ git --version
git version 1.8.1.2
{% endcodeblock %}

**CentOS/RedHat**

{% codeblock %}
$ yum install curl-devel expat-devel gettext-devel \
  openssl-devel zlib-devel

$ yum -y install git-core

$ git --version
git version 1.7.1
{% endcodeblock %}

{% endfolding %}

<!-- tab Windows -->
{% link https://gitforwindows.org/ 下载地址 %}

完成安装之后，就可以使用命令行的 git 工具（已经自带了 ssh 客户端）了，另外还有一个图形界面的 Git 项目管理工具。

在开始菜单里找到 <kbd>Git</kbd> -> <kbd>Git Bash</kbd>，会弹出 Git 命令窗口，你可以在该窗口进行 Git 操作。

<!-- tab Mac -->
{% link https://git-scm.com/download/mac 下载地址 %}

Mac 自带 git 并且随着系统版本的更新，自带的 git 也会升级到最新，一般无需手动安装。

{% endtabs %}

## 配置

Git 提供了一个叫做 `git config` 的工具，专门用来配置或读取相应的工作环境变量。这些环境变量，决定了 Git 在各个环节的具体工作方式和行为。这些变量可以存放在以下三个不同的地方：

- `/etc/gitconfig` 文件：系统中对所有用户都普遍适用的配置。若使用 `git config` 时用 `--system` 选项，读写的就是这个文件。
- `~/.gitconfig` 文件：用户目录下的配置文件只适用于该用户。若使用 `git config` 时用 `--global` 选项，读写的就是这个文件。
- 当前项目的 Git 目录中的配置文件（也就是工作目录中的 `.git/config` 文件）：这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，所以 `.git/config` 里的配置会覆盖 `/etc/gitconfig` 中的同名变量。

### 用户信息

```bash
$ git config --global user.name xaoxuu
$ git config --global user.email git@xaoxuu.com
```

- 如果用了 `--global` 选项，那么更改的配置文件就是位于你用户主目录下的那个，以后你所有的项目都会默认使用这里配置的用户信息。
- 如果要在某个特定的项目中使用其他名字或者电邮，只要去掉 `--global` 选项重新配置即可，新的设定保存在当前项目的 `.git/config` 文件里。

### 查看配置信息

```bash
$ git config --list
http.postbuffer=2M
user.name=xaoxuu
user.email=git@xaoxuu.com
```


## git-ssh

```
ssh-keygen -t rsa -C user@example.com
```

其中 `user@example.com` 对应的是你的 Git 邮箱。

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/git/ssh-keys1.png width:400px %}


ssh-agent 是一种控制用来保存公钥身份验证所使用的私钥的程序，其实 ssh-agent 就是一个密钥管理器，运行 ssh-agent 以后，使用 ssh-add 将私钥交给 ssh-agent 保管，其他程序需要身份验证的时候可以将验证申请交给 ssh-agent 来完成整个认证过程。

```
eval "$(ssh-agent -s)"
```

添加生成的 SSH key 到 ssh-agent：
```
ssh-add ~/.ssh/id_rsa
```

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/git/ssh-keys2.jpg width:400px %}

登陆 Github，添加 ssh：

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/git/ssh-keys3.jpg width:400px %}


把 id_rsa.pub 文件里的内容复制到这里：

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/git/ssh-keys4.jpg width:400px %}
