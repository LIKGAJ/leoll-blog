---
title: "Java 学习记录"
description: "从语法、集合、异常和面向对象角度整理 Java 学习重点。"
date: "2026-09-15"
category: "Java"
tags:
  - Java
  - Programming
---

# Java 学习记录

## 简介

Java 是一门适合构建长期维护项目的语言。它的语法相对稳定，生态完善，在后端服务、企业应用、工具开发和 Android 领域都有大量实践。

学习 Java 可以先从基础语法开始，再逐步理解面向对象、集合框架、异常处理、泛型、IO 和并发。

## 面向对象基础

Java 中常见的类定义如下：

```java
public class User {
    private final String name;

    public User(String name) {
        this.name = name;
    }

    public String greeting() {
        return "Hello, " + name;
    }
}
```

面向对象的重点不是把所有东西都写成类，而是通过封装让代码职责更清晰。字段尽量保持私有，通过方法表达对象行为。

## 集合框架

`List`、`Set` 和 `Map` 是日常使用频率最高的集合类型：

```java
import java.util.List;
import java.util.Map;

List<String> tags = List.of("Java", "Programming");
Map<String, Integer> scores = Map.of("Linux", 90, "Java", 95);
```

选择集合时可以按语义判断：

1. 需要有序列表时使用 `List`。
2. 需要去重时使用 `Set`。
3. 需要键值映射时使用 `Map`。

## 异常处理

异常处理应该帮助定位问题，而不是吞掉问题：

```java
try {
    String content = readConfig();
    System.out.println(content);
} catch (ConfigException ex) {
    System.err.println("读取配置失败: " + ex.getMessage());
}
```

不要在不处理的情况下写空 `catch`。如果当前层无法恢复，可以向上抛出，让更合适的位置处理。

## 学习建议

先写小程序熟悉语法，再阅读标准库源码和优秀项目。遇到框架时不要只记注解，还要理解框架解决了什么问题，例如依赖管理、请求处理、数据访问和事务边界。

## 总结

Java 的学习路线适合稳扎稳打。基础语法、集合、异常和面向对象是第一阶段重点。后续可以继续学习 JVM、并发、网络编程和常见后端框架。
