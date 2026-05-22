---
author: Sat Naing
pubDatetime: 2024-01-04T09:30:41.816Z
title: "AstroPaper4.0"
slug: "astro-paper-v4"
featured: false
ogImage: ../../../assets/images/AstroPaper-v4.png
tags:
  - release
description: "AstroPaper v4：确保更流畅、功能更丰富的博客体验。"
---

大家好！祝您新年快乐🎉，2024年一切顺利！我们很高兴地宣布发布 AstroPaper v4，这是一次重大更新，引入了一系列新功能、改进和错误修复，以提升您的博客体验。非常感谢所有贡献者为使版本 4 成为可能而做出的宝贵贡献和努力！

![AstroPaper v4](@/assets/images/AstroPaper-v4.png)

## 目录

## 主要变化

### 升级到 Astro v4 [#202](https://github.com/satnaing/astro-paper/pull/202)

AstroPaper 现在利用 Astro v4 的强大功能。然而，这是一个微妙的升级，不会让大多数 Astro 用户失望。

![Astro v4](https://astro.build/_astro/header-astro-4.YunweN9V_OmV0l.webp)

### 将 `postSlug` 替换为 Astro 内容 `slug` [#197](https://github.com/satnaing/astro-paper/pull/197)

博客内容架构中的 `postSlug` 在 AstroPaper v4 中不再可用。最初 Astro 没有 `slug` 机制，因此我们必须自己解决。从 Astro v3 开始，它支持内容收集和 slug 功能。现在，我们相信是时候采用 Astro 开箱即用的 `slug` 功能了。

**_文件：src/content/blog/astro-paper-4.md_**

````bash
---
author: Sat Naing
pubDatetime: 2024-01-01T04:35:33.428Z
title: AstroPaper 4.0
slug: "astro-paper-v4" # if slug is not specified, it will be 'astro-paper-4' (file name).
# slug: "" ❌ cannot be an empty string
---
`
```slug` 的行为现在略有不同。在 AstroPaper 的早期版本中，如果在博客文章（markdown 文件）中未指定 `postSlug`，则该博客文章的标题将被 slugified 并用作 `slug`。但是，在 AstroPaper v4 中，如果未指定 `slug` 字段，则将使用 markdown 文件名作为 `slug`。要记住的一件事是，`slug`字段可以省略，但它不能是空字符串（slug：""❌）。

如果您要将 AstroPaper 从 v3 升级到 v4，请确保将 `src/content/blog/*.md` 文件中的 `postSlug` 替换为 `slug`。

## 新功能

### 添加用于内容创建的代码片段 [#206](https://github.com/satnaing/astro-paper/pull/206)

AstroPaper 现在包含新博客文章的 VSCode 片段，无需手动复制/粘贴前言和内容结构（目录、标题、摘录等）。

阅读有关 VSCode 片段的更多信息 [此处](https://code.visualstudio.com/docs/editor/userdefinedsnippets#:~:text=In%20Visual%20Studio%20Code%2C%20snippets,Snippet%20in%20the%20Command%20Palette)。

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/136f1903-bade-40a2-b6bb-285a3c726350" type="video/mp4">
</video>

### 在博客文章中添加修改的datetime [#195](https://github.com/satnaing/astro-paper/pull/195)

通过在博客文章中显示修改后的datetime，让读者了解最新更新。这不仅让用户相信文章的新鲜度，还有助于改善博客的搜索引擎优化。

![Last Modified Date feature in AstroPaper](https://github.com/satnaing/astro-paper/assets/53733092/cc89585e-148e-444d-9da1-0d496e867175)

如果您进行了修改，可以在博客文章中添加 `modDatetime`。现在，帖子的排序行为略有不同。所有帖子均按`pubDatetime`和`modDatetime`排序。如果帖子同时具有`pubDatetime`和`modDatetime`，则其排序位置将由`modDatetime`决定。如果不是，则仅考虑`pubDatetime`来确定帖子的排序顺序。

### 实现返回顶部按钮 [#188](https://github.com/satnaing/astro-paper/pull/188)

使用新实现的返回顶部按钮增强博客详细信息帖子上的用户导航。

![Back to top button in AstroPaper](https://github.com/satnaing/astro-paper/assets/53733092/79854957-7877-4f19-936e-ad994b772074)

### 在标签帖子中添加分页 [#201](https://github.com/satnaing/astro-paper/pull/201)

通过在标签帖子中添加分页来改进内容组织和导航，使用户更轻松地探索相关内容。这确保了如果一个标签有很多帖子，读者不会被所有与标签相关的帖子淹没。

<video autoplay loop="loop" muted="muted" plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/9bad87f5-dcf5-4b79-b67a-d6c7244cd616" type="video/mp4">
</video>

### 动态生成robots.txt [#130](https://github.com/satnaing/astro-paper/pull/130)

AstroPaper v4 现在动态生成 robots.txt 文件，让您可以更好地控制搜索引擎索引和网络爬行。此外，站点地图 URL 也会添加到 `robot.txt` 文件中。

### 添加 Docker-Compose 文件 [#174](https://github.com/satnaing/astro-paper/pull/174)

通过添加 Docker-Compose 文件，管理 AstroPaper 环境现在比以往更加容易，从而简化了部署和配置。

## 重构和错误修复

### 将 Slugified 标题替换为 Unslugified 标签名称 [#198](https://github.com/satnaing/astro-paper/pull/198)

为了提高清晰度、用户体验和搜索引擎优化，标签页面中的标题 (`Tag: some-tag`) 不再被标记 (`Tag: Some Tag`)。

![Unslugified Tag Names](https://github.com/satnaing/astro-paper/assets/53733092/2fe90d6e-ec52-467b-9c44-95009b3ae0b7)

### 实现最小高度 100svh ([79d569d](https://github.com/satnaing/astro-paper/commit/79d569d053036f2113519f41b0d257523d035b76))

我们已将主体的最小高度更新为 100svh，为移动用户提供更好的用户体验。

### 更新站点 URL 作为单一事实来源 [#143](https://github.com/satnaing/astro-paper/pull/143)

站点 URL 现在是单一事实来源，简化了配置并避免了不一致。请阅读此 [PR](https://github.com/satnaing/astro-paper/pull/143) 及其相关问题了解更多信息。

### 解决 Light 模式下不可见文本代码块问题 [#163](https://github.com/satnaing/astro-paper/pull/163)

我们修复了浅色模式下不可见的文本代码块问题。

### 解码面包屑中的 Unicode 标签字符 [#175](https://github.com/satnaing/astro-paper/pull/175)面包屑中标签的最后部分现已解码，使非英语 Unicode 字符显示得更好。

### 更新 LOCALE 配置以覆盖整体区域设置 ([cd02b04](https://github.com/satnaing/astro-paper/commit/cd02b047d2b5e3b4a2940c0ff30568cdebcec0b8))

LOCALE 配置已更新，涵盖更广泛的区域设置，迎合更多样化的受众。

## 结束语

我们相信这些更新将显着提升您的 AstroPaper 体验。感谢所有为 AstroPaper 做出贡献、解决问题并给予星星的人。我们期待看到您使用 AstroPaper v4 创建的精彩内容！

博客快乐！

[周六奈](https://satnaing.dev)<br/>
AstroPaper 的创建者
````
