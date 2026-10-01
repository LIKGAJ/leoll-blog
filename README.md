# LEOLL Blog

LEOLL Blog 是一个纯前端静态个人技术博客，用于记录 Linux、Java、AI、Docker、Red Hat、云计算、DevOps 和项目开发内容，也可以作为个人项目作品集。

第一版不需要服务器、域名、数据库或后端 API。文章数据来自本地 Markdown 文件，适合部署到 GitHub Pages。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Vue Router
- Markdown
- marked
- highlight.js
- 原生 CSS

## 环境要求

- Windows 11 / macOS / Linux 均可
- Node.js 20+
- npm 10+

## 安装依赖

```bash
npm install
```

## 本地开发

```bash
npm run dev
```

启动后访问终端中显示的本地地址，通常是：

```text
http://localhost:5173/
```

## 打包构建

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

## 本地预览

```bash
npm run preview
```

## 添加文章

在 `src/posts/` 下新建 Markdown 文件，例如 `linux-command-notes.md`。

每篇文章需要包含 front matter：

```md
---
title: "Linux 命令学习笔记"
description: "整理常用 Linux 命令和使用场景。"
date: "2026-09-22"
category: "Linux"
tags:
  - Linux
  - Command
---

# Linux 命令学习笔记

正文内容……
```

文件名会成为文章路由，例如：

```text
/posts/linux-command-notes
```

## 添加项目

编辑 `src/data/projects.ts`：

```ts
{
  name: '项目名称',
  description: '项目描述',
  tech: ['Vue 3', 'Vite'],
  github: '真实 GitHub 地址',
  demo: '真实 Demo 地址',
}
```

如果暂时没有 GitHub 或 Demo 地址，可以不填写，对应位置会显示 `Coming Soon`。

## 主题切换

网站默认根据系统偏好选择 Light Mode 或 Dark Mode。用户点击导航栏右侧主题按钮后，会把选择保存到 `localStorage`，刷新页面后仍然保持当前主题。

## GitHub Pages 部署（GitHub Actions 自动化）

当前仓库固定部署到独立仓库 `leoll-blog`，站点地址：

```text
https://likgaj.github.io/leoll-blog/
```

对应 `vite.config.ts` 已配置：

```ts
export default defineConfig({
  plugins: [vue()],
  base: '/leoll-blog/',
})
```

> 如果以后改成部署到用户主页仓库（例如 `USERNAME.github.io`），需要把 `base` 改回 `'/'`，并同步更新 `src/utils/seo.ts`、`scripts/generate-feeds.mjs`、`index.html` 里写死的 `https://likgaj.github.io/leoll-blog` 域名。

部署流程已经用 [.github/workflows/deploy.yml](.github/workflows/deploy.yml) 自动化，**push 到 `main` 分支即可自动构建并发布**，不需要手动上传 `dist/`。

首次启用步骤：

1. 在 GitHub 上创建空仓库 `leoll-blog`（不要初始化 README/.gitignore，避免和本地历史冲突）。
2. 本地 `git push` 到该仓库的 `main` 分支。
3. 进入仓库 `Settings > Pages`，把 **Source** 切换为 **GitHub Actions**。
4. 之后每次 push 到 `main`，Actions 会自动执行 `npm ci && npm run build` 并发布到 Pages，几分钟后即可在 `Settings > Pages` 看到生效的访问地址和部署状态。

## SEO / Feeds

- `npm run build` 前会自动跑 `scripts/generate-feeds.mjs`（`prebuild` 钩子），根据 `src/posts/*.md` 的 front matter 生成：
  - `public/sitemap.xml`（包含所有静态页面和文章链接，供搜索引擎抓取）
  - `public/rss.xml`（文章订阅源，按发布日期倒序）
- `public/robots.txt` 指向了上面的 sitemap。
- 页面标题、描述、Open Graph、canonical 标签统一通过 [src/utils/seo.ts](src/utils/seo.ts) 的 `useSeo()` 在每个视图里设置，新增页面时按已有用法调用即可。

## 评论（Giscus）

评论基于 [Giscus](https://giscus.app)（GitHub Discussions，免费、无需后端），组件在 [src/components/Comments.vue](src/components/Comments.vue)，只在文章详情页展示。已完成配置：Discussions 已开启，Mapping 用 **pathname**，Discussion Category 用 GitHub 默认的 **Announcements** 分类（只有仓库所有者能发起新帖，适合当评论区），对应的 `repo-id` / `category-id` 已经写进 `Comments.vue`。

如果以后要换仓库或重新生成配置，去 https://giscus.app 按同样方式生成，再替换 `Comments.vue` 里的 `GISCUS_REPO_ID` / `GISCUS_CATEGORY_ID` 常量即可。

## 404 页面

访问不存在的路径会展示 [src/views/NotFound.vue](src/views/NotFound.vue)，而不是静默跳转回首页。

## 内容管理后台（Decap CMS）

不想每次加文章都在本地写 Markdown + git 操作的话，可以用网页后台编辑：`https://likgaj.github.io/leoll-blog/admin/`。

后台基于 [Decap CMS](https://decapcms.org)（免费开源，原 Netlify CMS），配置文件在 [public/admin/config.yml](public/admin/config.yml)，登录后直接通过 GitHub API 读写 `src/posts/` 下的 Markdown 文件，点 **Publish** 就会自动 commit + push 到 `master` 分支，触发已有的 GitHub Actions 自动构建部署——和本地手动 push 效果完全一样。

**鉴权说明**：任何人都能打开 `/admin` 尝试登录，但 GitHub API 只认"对该仓库有写权限的账号"，没有写权限的人登录了也保存不了内容，不需要额外做权限控制。

### 一次性启用步骤

纯静态站点没有后端帮你保管 OAuth 密钥，所以需要借用 [Netlify 的免费 OAuth 代理服务](https://decapcms.org/docs/github-backend/)（**不需要**把网站部署到 Netlify，只是借用它的登录转发）：

1. 在 GitHub 创建一个 OAuth App：`Settings > Developer settings > OAuth Apps > New OAuth App`。Homepage URL 填博客地址，**Authorization callback URL 必须填 `https://api.netlify.com/auth/done`**。创建后会拿到一个 Client ID 和 Client Secret。
2. 注册/登录一个免费 Netlify 账号，在团队设置里找到 OAuth 相关设置，把上一步的 Client ID / Client Secret 登记进去。具体菜单位置以 [Decap CMS 官方文档](https://decapcms.org/docs/github-backend/) 为准（Netlify UI 可能会变）。
3. 打开 `https://likgaj.github.io/leoll-blog/admin/`，点 "Login with GitHub"，用有仓库写权限的 GitHub 账号登录即可开始编辑。

> 小提示：CMS 里新建文章时会多一个"路由 Slug"字段，用来生成文件名（例如 `docker-basic`），对应保存后会作为一个额外的 front matter 字段出现在 `.md` 文件里，不影响现有文章解析逻辑，可以忽略。

## 目录结构

```text
.github/workflows/deploy.yml
scripts/
└── generate-feeds.mjs
public/
├── admin/
│   ├── index.html
│   └── config.yml
├── robots.txt
├── sitemap.xml (构建生成)
└── rss.xml (构建生成)
src/
├── components/
├── data/
├── posts/
├── router/
├── utils/
│   ├── posts.ts
│   └── seo.ts
├── views/
├── App.vue
├── main.ts
└── style.css
```
