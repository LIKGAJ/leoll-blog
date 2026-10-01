---
title: "Docker 入门学习笔记"
description: "整理 Docker 镜像、容器、数据卷和常用命令的基础知识。"
date: "2026-09-18"
category: "Docker"
tags:
  - Docker
  - Linux
---

# Docker 入门学习笔记

## 简介

Docker 用容器的方式打包应用和运行环境。它可以让应用在不同机器上保持相对一致的运行结果，适合开发、测试和部署流程中的环境管理。

学习 Docker 时建议先理解三个概念：镜像、容器和数据卷。镜像是模板，容器是运行中的实例，数据卷用于保存需要持久化的数据。

## 镜像与容器

拉取镜像：

```bash
docker pull nginx
```

启动一个 Nginx 容器：

```bash
docker run --name demo-nginx -p 8080:80 -d nginx
```

查看正在运行的容器：

```bash
docker ps
```

停止并删除容器：

```bash
docker stop demo-nginx
docker rm demo-nginx
```

## Dockerfile 示例

一个简单的前端项目可以先构建静态文件，再使用 Nginx 提供访问：

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
```

构建镜像：

```bash
docker build -t leoll-blog-demo .
```

## 数据卷

容器删除后，容器内部文件也可能丢失。需要持久化的数据应该放在 volume 中：

```bash
docker volume create blog-data
docker run -v blog-data:/data alpine ls /data
```

绑定宿主机目录也很常见：

```bash
docker run -v /host/logs:/app/logs alpine
```

## 常用命令表

| 命令 | 作用 |
| --- | --- |
| `docker images` | 查看镜像 |
| `docker ps -a` | 查看所有容器 |
| `docker logs` | 查看日志 |
| `docker exec` | 进入运行中的容器 |
| `docker compose up` | 启动编排服务 |

## 总结

Docker 的入门重点不是背命令，而是理解镜像如何构建、容器如何运行、数据如何保存。掌握这些基础后，再学习 Docker Compose、网络和镜像优化会更顺畅。
