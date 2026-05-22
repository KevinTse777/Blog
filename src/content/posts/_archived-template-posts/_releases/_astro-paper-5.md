---
pubDatetime: 2025-03-08T08:18:19.693Z
title: "AstroPaper5.0"
slug: astro-paper-v5
featured: false
ogImage: ../../../assets/images/AstroPaper-v5.png
tags:
  - release
description: "AstroPaper v5：保持干净的外观，在引擎盖下进行更新。"
---

期待已久的 AstroPaper v5 终于来了。 AstroPaper v5 保持了相同的简约和干净的外观，但在引擎盖下进行了重大更新。

![AstroPaper v5](@/assets/images/AstroPaper-v5.png)

## 目录

## 主要变化

### 升级到 Astro v5 [#455](https://github.com/satnaing/astro-paper/pull/455)

AstroPaper 现在附带 Astro v5，带来了随之而来的所有新功能和改进。

### Tailwind v4

AstroPaper 已升级到 Tailwind v4，其中包括许多底层样式更改。 `tailwind.config.js` 文件已被删除，现在所有配置都位于 `src/styles/global.css` 文件中。与版式相关的样式已被提取并移至`src/styles/typography.css`。

由于 TailwindCSS v4 中的新行为，组件内 `<style>` 块内的样式已被删除并替换为内联 Tailwind 类。

此外，用户界面的调色板也已更新。新调色板现在仅包含五种颜色：

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
```

### 删除 React + Fuse.js 以支持 Pagefind 搜索

在之前的版本中，React.js 和 Fuse.js 用于搜索功能和 OG 图像生成。在 AstroPaper v5 中，React.js 已被删除，并替换为静态站点搜索工具 [Pagefind](https://pagefind.app/)。

搜索体验几乎与以前的版本相同，但现在所有内容（不仅仅是标题和描述）都被索引和可搜索，这要归功于 Pagefind。

在开发模式下使用 Pagefind 的想法是受到[这篇博文](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)的启发。

### 更新了导入别名

导入别名已从 `@directory` 更新为 `@/directory`，这意味着您现在必须像这样导入：

```astro
---
import { slugifyStr } from "@/utils/slugify";
import IconHash from "@/assets/icons/IconHash.svg";
---
```

### 移动到`pnpm`

AstroPaper 已从 `npm` 切换到 `pnpm`，提供更快、更高效的包管理。

### 用 Astro 的 Svg 组件替换 icon/svg

AstroPaper v5 用 Astro 的实验性 [SVG 组件](https://docs.astro.build/en/reference/experimental-flags/svg/) 取代了内联 SVG。此更新减少了对 `socialIcons` 对象中预定义 SVG 代码的需求，使代码库更干净且更易于维护。

### 分离常量和配置

项目结构已重组。 `src/config.ts` 文件现在仅包含 `SITE` 对象，该对象保存项目的主要配置。所有常量，例如 `LOCALE`、`SOCIALS` 和 `SHARE_LINKS`，均已移至 `src/constants.ts` 文件。

## 其他值得注意的变化

- 博客文章目录已从`src/content/blog/`更新为`src/data/blog/`。
- 集合定义文件 (`src/content/config.ts`) 现在替换为`src/content.config.ts`。
- 各种依赖项已升级，以提高性能和安全性。
- 删除了`IBM Plex Mono`字体并切换为默认的系统单色字体。
- `Go back`按钮逻辑已更新。现在，AstroPaper v5 使用浏览器会话来临时存储返回 URL，而不是触发浏览器的历史记录 API。如果会话中不存在返回 URL，则会重定向到主页。
- 还有一些小的样式和布局更改。

## 结束语

AstroPaper v5 带来了许多变化，但核心体验保持不变。享受更流畅、更高效的博客平台，同时保持 AstroPaper 闻名的干净和简约设计！

请随意探索这些变化并分享您的想法。一如既往，感谢您的支持！

如果您喜欢这个主题，请考虑为该存储库加注星标。您还可以通过 GitHub Sponsors 支持我，或者如果您愿意，也可以请我喝杯咖啡。然而，当然，这些操作完全是可选的，而不是必需的。

享受！

[周六奈](https://satnaing.dev/)
