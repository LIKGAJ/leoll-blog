---
title: "SELinux 实战笔记"
description: "记录 RHEL 系统中 SELinux 的常见配置方法。"
date: "2026-09-20"
category: "Linux"
tags:
  - Linux
  - SELinux
  - Red Hat
---

# SELinux 实战笔记

## 简介

SELinux 是 Linux 系统中的强制访问控制机制。在 Red Hat 系列发行版中，它常用于限制进程可以访问的文件、端口和系统资源。它不是传统权限的替代品，而是在用户、用户组和文件权限之外再加一层策略判断。

初学时最容易遇到的问题是服务配置看起来正确，但仍然无法访问某个目录或端口。这个时候不要急着关闭 SELinux，更推荐先查看状态、审计日志和安全上下文。

## 查看状态

常用命令如下：

```bash
getenforce
sestatus
```

`getenforce` 会返回 `Enforcing`、`Permissive` 或 `Disabled`。学习和排查阶段可以短暂使用 `Permissive`，让系统记录违规行为但不阻止访问。

```bash
sudo setenforce 0
sudo setenforce 1
```

## 文件上下文

如果 Web 服务无法读取某个目录，可能是文件安全上下文不匹配。可以先查看上下文：

```bash
ls -Z /var/www/html
```

为目录恢复默认上下文：

```bash
sudo restorecon -Rv /var/www/html
```

如果目录不在默认路径，例如 `/data/site`，可以添加规则：

```bash
sudo semanage fcontext -a -t httpd_sys_content_t "/data/site(/.*)?"
sudo restorecon -Rv /data/site
```

## 配置端口

服务监听非默认端口时，也可能被 SELinux 拦截。比如让 HTTP 服务监听 `8088`：

```bash
sudo semanage port -a -t http_port_t -p tcp 8088
sudo semanage port -l | grep http
```

如果规则已经存在，需要使用 `-m` 修改：

```bash
sudo semanage port -m -t http_port_t -p tcp 8088
```

## 常见排查思路

1. 先确认服务本身配置正确。
2. 使用 `getenforce` 查看 SELinux 状态。
3. 使用 `journalctl` 或审计日志定位拒绝原因。
4. 优先修复上下文或策略，不直接关闭 SELinux。

```bash
sudo ausearch -m avc -ts recent
sudo journalctl -t setroubleshoot
```

## 总结

SELinux 的核心是让服务只做它应该做的事情。学习它时可以从状态、上下文、端口和日志四个方向入手。遇到问题时，先判断是文件上下文、端口类型还是布尔值配置导致，再决定具体修复方式。
