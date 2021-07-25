---
robots: noindex,nofollow
sitemap: false
menu_id: notes
layout: wiki
wiki: Notes
title: 服务器相关问题
order: 360
---

## GitHub Action + Hexo 部署到服务器

### 在本地电脑生成 ssh key

{% copy ssh-keygen -t rsa %}

### 创建 git 用户

{% copy adduser git %}

### 设置 ssh

把本机的 `id_isa.pub` 内容复制到这里：

```
/home/git/.ssh/authorized_keys
```

### 如果通过 ssh 登录仍需要密码的解决方法

找到并修改 `/etc/ssh/sshd_config` 文件：

```
#禁用root账户登录，如果是用root用户登录请开启
PermitRootLogin yes

# 是否让 sshd 去检查用户家目录或相关档案的权限数据，
# 这是为了担心使用者将某些重要档案的权限设错，可能会导致一些问题所致。
# 例如使用者的 ~.ssh/ 权限设错时，某些特殊情况下会不许用户登入
StrictModes no

# 是否允许用户自行使用成对的密钥系统进行登入行为，仅针对 version 2。
# 至于自制的公钥数据就放置于用户家目录下的 .ssh/authorized_keys 内
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# 有了证书登录了，就禁用密码登录。
PasswordAuthentication no
```

然后重启 `sshd` 服务

{% copy /bin/systemctl restart sshd.service %}

### 网站路径

创建网站，以 `/www/wwwroot/xaoxuu.github.io` 为例，`/www/wwwroot/xaoxuu.github.io` 的权限要改成 777 并且所有者为 www 才可以访问。

### GitHub Action

```
name: auto deploy # workflow name

on:
  [push] # 触发事件

jobs:
  build: # job1 id
    runs-on: ubuntu-latest # 运行环境为最新版 Ubuntu
    name: auto deploy
    steps:
    - name: Checkout # step1 获取源码
      uses: actions/checkout@v1 # 使用 actions/checkout@v1
      with: # 条件
        submodules: true # Checkout private submodules(themes or something else). 当有子模块时切换分支？
    - name: Setup Node.js 10.x
      uses: actions/setup-node@master
      with:
        node-version: "10.x"
    - name: Generate Public Files
      run: |
        npm i
        npm install hexo-cli -g
        hexo clean && hexo generate
    # Deploy to GitHub Pages
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        deploy_key: ${{ secrets.DEPLOY_KEY }}
        external_repository: xaoxuu/xaoxuu.github.io
        publish_branch: gh-pages
        publish_dir: ./public
        commit_message: ${{ github.event.head_commit.message }}
        user_name: 'github-actions[bot]'
        user_email: 'github-actions[bot]@users.noreply.github.com'
    # Deploy to Server
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@v2
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
        ARGS: "-rltgoDzvO --delete"
        SOURCE: public/
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: ${{ secrets.TARGET }}
```

在 Settings -> Secrets 中填写对应的值：

```yaml
SERVER_SSH_KEY: 第一步本机生成的 id_isa 文件内容
REMOTE_HOST: 服务器地址
REMOTE_USER: 用户名，例如 "git"
TARGET: 生成的文件路径，例如 "/www/wwwroot/xaoxuu.github.io/"
```

## 设置 webhook

```bash post-receive
#!/bin/bash
WEBROOT=/www/wwwroot/xaoxuu.github.io
git --work-tree=$WEBROOT checkout -f master
```

把上述的 post-receive 文件放在这里：

```
/home/git/xxx.git/hooks/post-receive
```

> `/www/wwwroot/xaoxuu.github.io` 的权限要改成 777 才行


{% link https://zhuanlan.zhihu.com/p/58654392 Hexo 从 GitHub 到阿里云 %}

## GitLab

{% link http://42.192.89.158:8099 GitLab %}

把上述的 post-receive 文件放在这里：

```
/var/opt/gitlab/git-data/repositories/root/xxx.git/custom_hooks/post-receive
```

GitLab 的 ssh 能记住密钥， hook 也正常，缺点就是每个月多花10块钱满足 GitLab 最低配置要求。

## 404

打开 nginx 配置文件，拉到最后，看到：
```
include /www/server/panel/vhost/nginx/*.conf;
```

然后根据这个路径找到自定义的配置文件：
```
/www/server/panel/vhost/nginx/xaoxuu.com.conf
```

在其中添加如下代码就可以了：
```
server
{
    ...
    fastcgi_intercept_errors on;
    error_page 404 /404.html;
    location = /404.html {
        root /www/wwwroot/xaoxuu.github.io;
    }
    ...
}
```
