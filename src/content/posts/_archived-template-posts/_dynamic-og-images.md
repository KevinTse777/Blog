---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2026-05-04T00:00:00Z
title: "AstroPaper 博客文章中的动态 OG 图像生成"
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: "AstroPaper v1.4.0 中的新功能，为博客文章引入动态 OG 图像生成。"
---

AstroPaper v1.4.0 中的新功能，为博客文章引入动态 OG 图像生成。

![Dynamic OG image generation in AstroPaper blog posts](/posts/dynamic-og-image-generation-in-astropaper-blog-posts/index.png)

## 目录

## 简介

OG 图像（又名社交图像）在社交媒体互动中发挥着重要作用。如果您不知道 OG 图片是什么意思，它是每当我们在 Facebook、Discord 等社交媒体上分享我们的网站 URL 时显示的图片。

> Twitter 使用的社交图像从技术上讲并不称为 OG 图像。然而，在这篇文章中，我将使用术语 OG 图像来表示所有类型的社交图像。

## 默认/静态 OG 图像（旧方法）

AstroPaper 已经提供了一种将 OG 图像添加到博客文章中的方法。作者可以在frontmatter`ogImage`中指定OG图像。即使作者没有在 frontmatter 中定义 OG 图像，默认的 OG 图像也将用作后备（在本例中为 `public/default-og.jpg`）。但问题是默认的 OG 图像是静态的，这意味着每一篇在 frontmatter 中不包含 OG 图像的博客文章将始终使用相同的默认 OG 图像，尽管每个帖子的标题/内容都与其他帖子不同。

## 动态 OG 图像

为每篇博文生成动态 OG 图像可以让作者避免为每一篇博客文章指定 OG 图像。此外，这将防止后备 OG 图像与所有博客文章相同。

在AstroPaper v1.4.0中，Vercel的[Satori](https://github.com/vercel/satori)包用于动态OG图像生成。

在 AstroPaper v6+ 中，仍然保留了相同的想法（Satori 渲染 SVG，然后通过 [Sharp](https://sharp.pixelplumbing.com/) 生成 PNG），但字体源自 Astro 的 **Fonts** 配置并通过 [`experimental_getFontFileURL()`](https://astro.build/blog/astro-620/) 加载，因此 OG 生成可以重用与站点相同的字体管道。

动态 OG 图像将在构建时为博客文章生成：

- 不要在 frontmatter 中包含 OG 图片
- 未标记为草稿。

## AstroPaper 动态 OG 图像剖析

动态 OG 图像包括*博客文章标题*、*作者姓名*和*网站标题*。作者姓名和网站标题是从 `astro-paper.config.ts` 中的`site.author` 和 `site.title` 检索的。标题是从博客文章 frontmatter `title` 生成的。

![Example Dynamic OG Image link](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非拉丁字符问题

带有非拉丁字符的标题将无法正确显示。在 AstroPaper v6 中，动态 OG 图像从 Astro 的 **Fonts** 配置 (`astro.config.ts`) 加载字体文件，并将其注册到 Satori。

要修复缺失的字形，请将 Google 字体系列切换为涵盖您的书写系统的字体系列，并确保同时包含 \*\*`400` 和 `700` 权重（Satori 对常规 + 粗体使用单独的缓冲区）。

```ts file="astro.config.ts"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      // Example: Japanese coverage (pick what you need for your audience)
      name: "Noto Sans JP",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [400, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
});
```

如果更改 `cssVariable`，还要更新以下中的匹配键：

- `src/pages/og.png.ts`
- `src/pages/posts/[...slug]/index.png.ts`

> 查看[此 PR](https://github.com/satnaing/astro-paper/pull/318) 了解更多信息。

## 权衡

虽然这是一个很好的功能，但仍然需要权衡：AstroPaper 在构建时为每个符合条件的帖子生成一个 PNG（当在 frontmatter 中未指定 og 图像时），因此总构建时间随着内容量的增加而增长。

在 AstroPaper v6 中，OG 图像生成速度明显快于早期实现（PR [#632](https://github.com/satnaing/astro-paper/pull/632)），因此实际中每个图像的开销要低得多。如果您仍然想最大程度地减少非常大的站点上的构建时间，可以通过在 `astro-paper.config.ts` 中设置 `features.dynamicOgImage: false` 来禁用它（并提供每个帖子 `ogImage` 文件）。

## 限制

在撰写本文时，[Satori](https://github.com/vercel/satori) 还相当新，尚未发布主要版本。因此，这种动态OG图像特征仍然存在一些限制。

- 尚不支持 RTL 语言。
- 标题中的[使用表情符号](https://github.com/vercel/satori#emojis)可能有点棘手。
