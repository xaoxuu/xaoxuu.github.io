---
layout: wiki
wiki: Git
title: 认识 Git
references:
  - title: RUNOOB：Git 教程
    url: https://www.runoob.com/git/git-tutorial.html
  - title: 廖雪峰的官方网站：Git 教程
    url: https://www.liaoxuefeng.com/
---

<!-- more -->

## 什么是 Git ？

Git 是目前世界上最先进的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

### Git 与 SVN 区别点

1. Git 是分布式的，SVN 不是。这是 Git 和其它非分布式的版本控制系统如 SVN，CVS 等最核心的区别。
2. Git 把内容按元数据方式存储，而 SVN 是按文件。
3. Git 分支和 SVN 的分支不同：分支在 SVN 中一点都不特别，其实它就是版本库中的另外一个目录。
4. Git 没有一个全局的版本号，而 SVN 有。目前为止这是跟 SVN 相比 Git 缺少的最大的一个特征。
5. Git 的内容完整性要优于 SVN。Git 的内容存储使用的是 SHA-1 哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/git/svn-git.jpg width:400px 图片来源于 RUNOOB  %}

## Git 工作区、暂存区和版本库

- 工作区：就是你在电脑里能看到的目录。
- 暂存区：英文叫stage, 或index。一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- 版本库：工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
