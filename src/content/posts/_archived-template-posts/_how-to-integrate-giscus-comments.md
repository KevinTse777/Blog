---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2025-03-12T12:28:53Z
title: "如何将 Giscus 注释集成到 AstroPaper 中"
slug: how-to-integrate-giscus-comments
featured: false
draft: false
tags:
  - astro
  - blog
  - docs
description: "使用 Giscus 在 GitHub Pages 上托管的静态博客上发表评论功能。"
---
在 [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) 这样的平台上托管一个瘦静态博客有很多优点，但也失去了一些交互性。幸运的是，[Giscus](https://giscus.app/) 存在并提供了一种在静态网站上嵌入用户评论的方法。

## 目录

## _Giscus_ 的工作原理

[Giscus 使用 GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works) 读取 _GitHub_ 用户发表的评论并将其存储在与存储库关联的 `Discussions` 中。

在您的站点上嵌入 _Giscus_ 客户端脚本包，使用正确的存储库 URL 配置它，用户可以查看和编写评论（登录到 _GitHub_ 时）。

该方法是无服务器的，因为评论存储在 _GitHub_ 上并从客户端动态加载，因此非常适合静态博客，例如 _AstroPaper_。

## 设置_Giscus_

_Giscus_ 可以在 [giscus.app](https://giscus.app/) 上轻松设置，但我将很快概述该过程。

### 先决条件

_Giscus_ 工作的先决条件是

- 存储库是[公共](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)
- [Giscus 应用程序](https://github.com/apps/giscus) 已安装
- 为您的存储库启用了[讨论](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository)功能

不幸的是，如果由于任何原因无法满足这些条件中的任何一个，_Giscus_ 就无法集成。

### 配置_Giscus_

接下来，需要配置_Giscus_。在大多数情况下，预选的默认值是合适的，只有在有特定原因并且知道自己在做什么的情况下才应该修改它们。不要太担心做出错误的选择；您以后可以随时调整配置。

然而你需要

- 为用户界面选择正确的语言
- 指定您要连接的 _GitHub_ 存储库，通常是包含 _GitHub Pages_ 上静态托管的 _AstroPaper_ 博客的存储库
- 如果您想确保没有人可以直接在 _GitHub_ 上创建随机评论，请在 _GitHub_ 上创建并设置 `Announcement` 类型讨论
- 定义配色方案

配置设置后，_Giscus_ 会为您提供生成的 `<script>` 标签，您在后续步骤中将需要该标签。

## 简单的脚本标签

您现在应该有一个如下所示的脚本标签：
```html
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```
只需将其添加到网站的源代码中即可。最有可能的是，如果您使用 _AstroPaper_ 并希望在帖子上启用评论，请导航至 `PostDetails.astro` 并将其粘贴到您希望显示评论的所需位置，可能位于 `Share this post on:` 按钮下方。
```astro file=src/layouts/PostDetails.astro
<Layout {...layoutProps}>
  <main>
    <ShareLinks />

    <!-- [!code ++:6] -->
    <script
      src="https://giscus.app/client.js"
      data-repo="[ENTER REPO HERE]"
      data-repo-id="[ENTER REPO ID HERE]"
      data-category="[ENTER CATEGORY NAME HERE]"
      data-category-id="[ENTER CATEGORY ID HERE]"></script>
  </main>
  <Footer />
</Layout>
```
完成了！您已成功在_AstroPaper_中集成评论！

## React 组件具有浅色/深色主题

布局中嵌入的脚本标签是相当静态的，_Giscus_ 配置（包括 `theme`）硬编码到布局中。鉴于 _AstroPaper_ 具有浅色/深色主题切换功能，因此评论能够与网站的其他部分一起在浅色和深色主题之间无缝转换会很好。为了实现这一点，需要一种更复杂的方法来嵌入 _Giscus_。

首先，我们要为_Giscus_安装[React组件](https://www.npmjs.com/package/@giscus/react)：
```bash
npm i @giscus/react && npx astro add react
```
然后我们在`src/components`中创建一个新的`Comments.tsx`React组件：
```tsx file=src/components/Comments.tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```
这个 _React_ 组件不仅包装了原生 _Giscus_ 组件，还引入了额外的 props，即 `lightTheme` 和 `darkTheme`。利用两个事件侦听器，_Giscus_ 评论将与网站的主题保持一致，每当网站或浏览器主题发生更改时，就会在深色和浅色主题之间动态切换。

我们还需要定义 `GISCUS` 配置，其最佳位置位于 `constants.ts`：
```ts file=src/constants.ts
import type { GiscusProps } from "@giscus/react";

...

export const GISCUS: GiscusProps = {
  repo: "[ENTER REPO HERE]",
  repoId: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  categoryId: "[ENTER CATEGORY ID HERE]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
```
请注意，此处指定 `theme` 将覆盖 `lightTheme` 和 `darkTheme` 属性，从而产生静态主题设置，类似于之前使用 `<script>` 标签嵌入 _Giscus_ 的方法。

要完成此过程，请将新的 Comments 组件添加到 `PostDetails.astro`（替换上一步中的 `script` 标签）。
```jsx file=src/layouts/PostDetails.astro
// [!code ++:1]
import Comments from "@/components/Comments";

<ShareLinks />

// [!code ++:1]
<Comments client:only="react" />

<hr class="my-6 border-dashed" />

<Footer />
```
就是这样！