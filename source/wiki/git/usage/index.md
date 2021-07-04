---
layout: wiki
wiki: Git
title: 基本操作入门
order: 2
---

## 基本操作流程

1. 在对代码进行了一些修改之后，使用：`git add --all` 将本地所有新增文件和修改内容添加到暂存区。
2. 使用：`git commit -m 备注` 将代码提交到本地版本库。（备注内容没有空格的话不需要加引号）
3. 使用：`git pull origin` 从服务器拉取代码，更新本地版本库。
4. 使用：`git push origin` 将本地版本库推送到服务器。


<!-- more -->


## 克隆与配置

### 克隆版本库

```
git clone https://github.com/xaoxuu/AXKit.git
# 或者
git clone https://github.com/xaoxuu/AXKit.git AXKit
```

### 配置版本库

要忽略某些文件的改动需要配置 `.gitignore` 文件：

```
# 这是macOS文件夹属性的隐藏文件，不需要同步到git
.DS_Store

# 某个文件夹不想要同步到git
/public
/node_modules

# 某个文件不想要同步到git
test.txt

# 通配符
._*
```


## 基本操作指令

### 创建与切换分支

```sh 创建并切换 branch
git checkout -b 分支名
```

```sh 仅仅切换 branch
git checkout 分支名
```

```sh 创建 tag
git tag 标签名
```

```sh 创建 tag 并备注
git tag -a 标签名 -m 备注信息
```

```sh 创建 PGP tag 并备注
git tag -s 标签名 -m 备注信息
```


### 查看分支和标签


```sh 查看本地 tag
git tag
```

```sh 查看某个本地 tag 详情
git show 标签名
```

```sh 查看本地 branch list
git branch 分支名
```

```sh 查看远程 branch list
git branch -r 分支名
```

```sh 查看所有 branch list
git branch -a 分支名
```


### 删除分支和标签

```sh 删除本地 branch / tag
git branch -d 分支名或标签名
```

```sh 删除所有未推送的本地 branch
git fetch -p
```

```sh 仅仅删除某个远程 branch / tag
git push origin :分支名或标签名
# 或者
git push origin --delete 分支名或标签名
```

### 推送分支和标签

```sh 推送某个 branch / tag
git push origin 分支名或标签名
```

```sh 推送所有 branch
git push --all origin
```

```sh 推送所有 tag
git push --tags
```



### 重命名分支

重命名本地分支：

```sh
git branch -m 旧分支名 新分支名
```

重命名远程分支：

1. 删除远程分支
2. 重命名本地分支
3. 推送本地分支




## 拉取、合并分支

### 拉取某个远程标签

```sh
git fetch origin tag 远程标签名
```

### 合并某本地分支到当前分支

```sh
git merge 分支名
```

### 合并某远程分支到当前分支

```sh
git pull origin 远程分支名
```

## 代码冲突

我一般使用 Tower 客户端操作，pull 之后有冲突的文件会列出来。建议使用一个比较好的编辑器如 [Atom](https://atom.io) ，有冲突的部分会用两种颜色高亮。

{% note 未完待续 %}


## 代码回退

如果冲突文件没有妥善解决就提交到版本库导致严重后果，这是需要查看某个历史时刻的代码，使用：

```
git log
# 查看提交记录
```

然后 copy 某个 commit id 进行回退，回退的类型有两种：

### soft

这是默认的回退方式，版本库的 HEAD 回滚到某个 commit 但本地代码不变，处于未 commit 的状态。

```sh
git reset [commit id]
# 或者
git reset --soft [commit id]
```

### hard

HEAD 和本地代码都回到某个 commit，后面的更改将会被丢弃。（如同时光穿梭）

```sh
git reset --hard [commit id]
```


## 版本迭代

查看本地所有标签

```
git tag
```

把当前 HEAD 打个标签（名为：1.0）

```
git tag 1.0
# 也可以添加备注信息，如同commit
git tag 1.0 -m 'message'
```

切换到某个标签（1.0）

```
git checkout 1.0
```

把标签 push 到远程

```bash push指定的tag
git push origin 1.0
```
```bash push所有未push的tag
git push --tags
```

删除标签（1.0）

```
# 删除本地tag
git tag -d 1.0

# 删除远程tag
# 方法一：将空白tag覆盖到远程tag
git push origin :1.0
# 方法二：执行删除命令
git push origin --delete 1.0
```


## 客户端操作

### Stash

- save：将当前未 commit 的代码保存到 stash，并且回到上次 commit 的状态。
- apply：应用某个 stash 的代码。

### Git-Flow

自动化管理功能，例如：

- 准备开发新版本的时候：点击 Start Release，客户端会自动新建一个 release 分支。
- 准备增加一个新特性的时候：点击 Start Feature，客户端会新建一个 feature 分支。
- 需要修复 bug 的时候：点击 Start Hotfix，客户端会新建一个 fix 分支。
- 当修复完 bug，点击 Finish Hotfix 的时候，客户端会自动把 fix 分支合并到创建它的分支，并且创建一个 tag。
- 当一个新特性开发完成，点击 Finish Feature 的时候，客户端会自动把 feature 分支合并到创建它的分支，并且创建一个 tag。
- 当一个新版本开发完成，点击 Finish Release 的时候，客户端会自动把 release 分支合并到创建它的分支，并且创建一个 tag。
