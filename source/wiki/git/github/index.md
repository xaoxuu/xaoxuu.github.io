---
layout: wiki
wiki: Git
title: 使用 GitHub
order: 4
---

## fork & pull request

- fork 操作相当于把别人的 git 仓库克隆到自己账号中。
- pull request 则可以将自己 fork 过来的仓库中的修改合并到原仓库中，实现团队协作。

## 静态页面持续集成

### 1. 生成 SSH Key

打开 terminal 输入下面的命令生成 `id_rsa` 和 `id_rsa.pub` 文件：

```bash
ssh-keygen -t rsa -C me@xxx.com
```

其中 `me@xxx.com` 就是 GitHub 账号的邮箱。

### 2. 填写 Deploy Keys 和 Secrets

{% timeline %}

<!-- node 打开源码仓库，在设置中找到「Secrets」 -->

第 1/3 步：添加 `DEPLOY_KEY` 内容是 `id_rsa` 文件的全部内容。
第 2/3 步：添加 `EMAIL` 内容是 GitHub 邮箱。
第 3/3 步：添加 `NAME` 内容是 GitHub 账号名。

<!-- node 打开 deploy 目标仓库，在设置中找到「Deploy Keys」 -->

第 1/1 步：添加 `deploy_key.pub` 内容是 `id_rsa.pub` 文件的全部内容。

{% endtimeline %}

### 3. 在 GitHub 上添加 Actions

在 GitHub 上添加 Actions 内容为：

```yaml .github/workflows/auto-deploy.yml
name: auto deploy # workflow name

on:
  [push] # 触发事件

jobs:
  build: # job1 id
    runs-on: ubuntu-latest # 运行环境为最新版 Ubuntu
    name: A job to deploy blog.
    steps:
    - name: Checkout # step1 获取源码
      uses: actions/checkout@v1 # 使用 actions/checkout@v1
      with: # 条件
        submodules: true # Checkout private submodules(themes or something else). 当有子模块时切换分支？

    # Caching dependencies to speed up workflows. (GitHub will remove any cache entries that have not been accessed in over 7 days.) 缓存压缩 node_modules，不用每次下载，使用时解压，可以加快工作流的执行过程，超过 7 天没有使用将删除压缩包。
    - name: Cache node modules # step2
      uses: actions/cache@v1
      id: cache
      with:
        path: node_modules
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-
    - name: Install Dependencies # step3 name
      if: steps.cache.outputs.cache-hit != 'true' # 如果变量 cache-hit 不等于 true
      run: npm install # 安装 node modules 相关依赖

    # Deploy hexo blog website.
    - name: Deploy # step4
      id: deploy
      uses: sma11black/hexo-action@v1.0.0
      with:
        deploy_key: ${{ secrets.DEPLOY_KEY }}
        user_name: ${{ secrets.NAME }}
        user_email: ${{ secrets.EMAIL }}
```

### 4. 大功告成

您可以尝试修改一下源码库，看是否能够成功运行 Actions 。


## GitHub API

https://docs.github.com/en/graphql

{% note 未完待续 %}
