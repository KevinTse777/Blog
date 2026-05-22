---
author: Sat Naing
pubDatetime: 2023-01-30T15:57:52.737Z
title: "AstroPaper2.0"
slug: astro-paper-2
featured: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - release
description: "AstroPaper 具有 Astro v2 的增强功能。类型安全的 Markdown 内容、错误修复和更好的开发体验等。"
---

Astro 2.0 已经发布，具有一些很酷的功能、重大更改、DX 改进、更好的错误叠加等等。 AstroPaper 利用了这些很酷的功能，尤其是 Content Collections API。

<!-- ![Introducing AstroPaper 2.0](https://user-images.githubusercontent.com/53733092/215683840-dc2502f5-8c5a-44f0-a26c-4e7180455056.png) -->

![Introducing AstroPaper 2.0](https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png)

## 目录

## 特性和变化

### 类型安全的 Frontmatters 和重新定义的博客架构

得益于 Astro 的内容集合，AstroPaper 2.0 Markdown 内容的 Frontmatter 现在是类型安全的。博客架构在 `src/content/_schemas.ts` 文件内定义。

### 博客内容的新主页

所有博客文章都从`src/contents`移动到`src/content/blog`目录。

### 新的获取 API

现在使用 `getCollection` 函数获取内容。不再需要指定内容的相对路径。

```ts
// old content fetching method
- const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",);

// new content fetching method
+ const postImportResult = await getCollection("blog");
```

### 修改搜索逻辑以获得更好的搜索结果

在旧版本的AstroPaper中，当有人搜索某篇文章时，将搜索的搜索条件键是`title`、`description`和`headings`（标题是指博客文章的所有标题h1~h6）。在 AstroPaper v2 中，当用户输入时，只会搜索 `title` 和 `description`。

### 重命名 Frontmatter 属性

以下 frontmatter 属性已重命名。

| 旧名称   | 新名字      |
| -------- | ----------- |
| datetime | pubDatetime |
| slug     | 帖子Slug    |

### 博客文章的默认标签

如果博客文章没有任何标签（换句话说，未指定 frontmatter 属性 `tags`），则该博客文章将使用默认标签 `others`。但您可以在 `/src/content/_schemas.ts` 文件中设置默认标签。

```ts
// src/contents/_schemas.ts
export const blogSchema = z.object({
  // ---
  // replace "others" with whatever you want
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
});
```

### 新的预定义深色配色方案

AstroPaper v2 有一个新的深色配色方案（高对比度和低对比度），该方案基于 Astro 的深色徽标。查看[此链接](https://astro-paper.pages.dev/posts/predefined-color-schemes#astro-dark)了解更多信息。

![New Predefined Dark Color Scheme](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

### 自动类别排序

AstroPaper 2.0 包含使用 [TailwindCSS Prettier 插件](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) 的自动类别排序

### 更新了文档和README

所有 [#docs](https://astro-paper.pages.dev/tags/docs/) 博客文章和 [README](https://github.com/satnaing/astro-paper#readme) 均已针对此 AstroPaper v2 进行更新。

## 错误修复

- 修复博客文章页面中损坏的标签
- 在标签页中，面包屑的最后一部分现在更新为小写以保持一致性
- 排除标签页中的草稿帖子
- 修复页面重新加载后"onChange 值不更新问题"
