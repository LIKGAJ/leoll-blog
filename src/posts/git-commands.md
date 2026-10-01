---
title: "Git 常用命令整理"
description: "整理 Git 日常开发中常用的状态查看、提交、分支和远程协作命令。"
date: "2026-09-10"
category: "DevOps"
tags:
  - Git
  - DevOps
---

# Git 常用命令整理

## 简介

Git 是日常开发中最重要的版本控制工具之一。它可以记录项目变化、管理分支、协助多人协作，也能在出错时帮助回到可追踪的历史状态。

刚开始学习 Git 时，不需要一次掌握所有高级命令。先熟悉状态、暂存、提交、分支和远程仓库即可。

## 查看状态

最常用的命令是：

```bash
git status
```

查看提交历史：

```bash
git log --oneline --graph --decorate
```

查看某个文件的改动：

```bash
git diff src/main.ts
```

## 提交代码

基本流程：

```bash
git add .
git commit -m "Add blog homepage"
```

如果只想添加某个文件：

```bash
git add README.md
```

提交信息建议写清楚动词和对象，例如 `Fix post search filter`，比 `update` 更容易理解。

## 分支操作

创建并切换分支：

```bash
git switch -c feature/blog-search
```

切换已有分支：

```bash
git switch main
```

合并分支：

```bash
git merge feature/blog-search
```

## 远程仓库

添加远程仓库：

```bash
git remote add origin https://github.com/USERNAME/leoll-blog.git
```

推送到远程：

```bash
git push -u origin main
```

拉取远程更新：

```bash
git pull
```

## 总结

Git 的重点是保持小步提交和清晰历史。日常开发中多使用 `status` 和 `diff` 检查自己的改动，再提交到仓库。熟悉基础流程后，可以继续学习 rebase、stash、tag 和 pull request 协作。
