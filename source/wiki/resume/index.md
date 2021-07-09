---
layout: wiki
wiki: Resume
title: 一个简约的在线简历主题
---

{% link https://resume.js.org/zh-cn/ 在线演示 %}
{% link https://github.com/xaoxuu/hexo-theme-resume 主题源码 %}

<!-- more -->

## 如何使用

### 方式一

1. 下载 [示例源码](https://github.com/xaoxuu/resume-docs) 的整个仓库代码。
```sh
git clone https://github.com/xaoxuu/resume-docs
```

2. 然后安装必要的依赖包
```sh
npm i
```


### 方式二

创建全新的博客，通过 `npm` 命令安装：

```bash
npm i hexo-theme-resume
```

然后删除多余的依赖包（重要），打开 `package.json` 复制并全部替换为以下内容：

```json
{
  "name": "hexo-site",
  "private": true,
  "hexo": {
    "version": "5.0.0"
  },
  "scripts": {
    "start": "hexo server",
    "build": "node pre-deploy.js && hexo clean && hexo generate",
    "deploy": "npm run build && hexo deploy"
  },
  "engines": {
    "node": ">=8.9.0"
  },
  "dependencies": {
    "hexo": "^5.0.0",
    "hexo-all-minifier": "^0.5.3",
    "hexo-autonofollow": "^1.0.1",
    "hexo-deployer-git": "^2.1.0",
    "hexo-fs": "^3.1.0",
    "hexo-lazyload-image": "^1.0.9",
    "hexo-offline": "^1.0.0",
    "hexo-renderer-ejs": "^1.0.0",
    "hexo-renderer-marked": "^3.0.0",
    "hexo-renderer-stylus": "^1.1.0",
    "hexo-server": "^1.0.0"
  }
}
```

然后输入 `npm i` 安装依赖包。


## 编写简历

打开 `index.md` 文件：
```
resume-docs/src/index.md
```

按照示例中的提示语将信息修改为自己的。

## 部署

打开站点配置文件：
```yaml resume-docs/_config.yaml
deploy:
  - type: git
    repo: # 项目路径
    branch: master
    message: update pages
```

Hexo官方教程： https://hexo.io/zh-cn/docs/one-command-deployment

{% noteblock 小提示 %}

图标从这里找：https://fontawesome.com/
如果需要更多DIY，请自行修改源码。
简历主题不支持评论，如果需要，请自行集成。

{% endnoteblock %}
