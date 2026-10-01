---
title: "我的 AI 项目实践"
description: "整理 AI 应用项目中的需求拆解、提示词、接口调用和结果评估。"
date: "2026-09-12"
category: "AI"
tags:
  - AI
  - LLM
  - Project
---

# 我的 AI 项目实践

## 简介

AI 应用开发不只是调用模型接口。一个真正可用的 AI 项目通常需要清晰的输入输出设计、稳定的提示词、错误处理、结果评估和用户体验优化。

无论是学习助手、文档问答还是语音翻译，第一步都应该明确场景边界：用户输入什么、系统处理什么、最终返回什么。

## 需求拆解

可以把 AI 项目拆成几个层次：

1. 输入层：文本、语音、文件或图片。
2. 处理层：清洗、分段、检索、调用模型。
3. 输出层：摘要、翻译、问答、结构化 JSON。
4. 评估层：准确性、稳定性、响应速度和成本。

对于学习助手，常见输出可以设计为 JSON，方便前端渲染：

```json
{
  "summary": "本节主要介绍 Linux 文件权限。",
  "keywords": ["Linux", "chmod", "permission"],
  "questions": ["chmod 755 的含义是什么？"]
}
```

## 提示词设计

提示词应该清楚描述角色、任务、输入和输出格式：

```text
你是一个技术学习助手。
请根据用户提供的笔记生成摘要、关键词和复习问题。
输出必须是 JSON，不要添加额外解释。
```

当输出要被程序继续处理时，格式稳定性非常重要。可以在后端或前端加入 JSON 解析失败时的兜底提示。

## 接口调用示例

前端可以把请求封装成独立函数，避免调用逻辑散落在组件中：

```ts
export async function createSummary(content: string) {
  const response = await fetch('/api/summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('生成摘要失败')
  }

  return response.json()
}
```

这个示例只展示结构。静态博客第一版不需要后端 API。

## 总结

AI 项目实践的重点是把模型能力产品化。稳定输入、稳定输出、可恢复错误和可评估效果，比单次演示更重要。后续可以继续探索 RAG、语音识别、向量检索和多模态能力。
