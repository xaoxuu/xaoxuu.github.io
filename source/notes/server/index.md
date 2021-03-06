---
robots: noindex,nofollow
sitemap: false
menu_id: notes
layout: wiki
wiki: Notes
seo_title: Server
order: 110
---

这个相对来说是比较靠谱的：

{% link https://zhuanlan.zhihu.com/p/58654392 Hexo 从 GitHub 到阿里云 %}


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

ssh 每次都要输密码，不知道是哪里没设置好。


## 安装了 GitLab

{% link http://47.242.34.183:8099 GitLab %}

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
