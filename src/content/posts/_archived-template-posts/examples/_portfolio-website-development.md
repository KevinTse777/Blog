---
title: "我如何开发我的作品集网站和博客"
author: Sat Naing
pubDatetime: 2022-03-25T16:55:12.000+00:00
slug: how-do-i-develop-my-portfolio-and-blog
featured: false
draft: false
tags:
  - NextJS
  - TailwindCSS
  - HeadlessCMS
  - Blog
description: "示例文章：我使用 NextJS 和 Headless CMS 开发第一个作品集网站和博客的经历。"
timezone: "Asia/Yangon"
---

> 本文来源于我的【博文】(https://satnaing.dev/blog/posts/how-do-i-develop-my-portfolio-and-blog)。我写这篇文章是为了演示如何使用 AstroPaper 主题撰写博客文章/文章。

我使用 NextJS 和无头 CMS 开发第一个作品集网站和博客的经验。

![Building portfolio](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg&w=2048&q=75)

## 动机

自从我大学生活以来，我一直在考虑使用我的自定义域名 (**satnaing.dev**) 启动自己的网站。但直到这个项目才发生这种情况。我已经完成了几个有关 Web 应用程序开发的项目和工作，但我并没有为此付出努力。

那么，"博客呢？"你可能会问。是的，博客在我的项目列表中也有一段时间了。我一直想使用一些最新技术制作一个博客项目。然而，我一直忙于我的工作和其他项目，因此博客项目从未启动。

如今，我倾向于开发自己的项目，注重质量而不是数量。项目完成后，我通常会在 GitHub 存储库中放置一个适当的README。但GitHub repo readme只适合技术方面（这只是我的想法）。我想写下我的经历和挑战。因此，我决定创建自己的博客。另外，在这一点上，我已经有了很好的经验和信心来开发这个项目。

## 技术堆栈

对于前端，我想使用[React](https://reactjs.org/"React官网")。但仅靠 React 不足以实现 SEO；而且我确实要考虑很多因素，比如路由、图像优化等。所以，我选择了[NextJS](https://nextjs.org/"NextJS 官方网站")作为我的主要前​​端堆栈。当然还有用于类型检查的 TypeScript。 （据说，当你习惯了 TypeScript 后，你就会爱上它 😉）

对于样式，我使用[TailwindCSS]（https://tailwindcss.com/"Tailwind CSS 官方网站"）。这是因为我喜欢 Tailwind 提供的开发人员体验，并且与 MUI 或 React Bootstrap 等其他组件 UI 库相比，它具有很多灵活性。

该项目的所有内容都驻留在 GitHub 存储库中。我的所有博客文章（包括这篇文章）都是以 Markdown 文件格式编写的，因为我对此非常习惯。但为了轻松地编写 Markdown 及其 frontmatter，我使用了 [Forestry](https://forestry.io/"Forestry 官方网站") 无头 CMS。它是一个基于 git 的 CMS，可以服务 Markdown 和其他内容。因此，我可以使用 Markdown 或所见即所得编辑器来编写内容。此外，用它写前言是一件轻而易举的事。

图片和资源上传并存储在[Cloudinary](https://cloudinary.com/"Cloudinary 官方网站")。我通过 Forestry 连接 Cloudinary 并直接在仪表板中管理它们。

总之，这些是我在这个项目中使用的技术堆栈。

- 前端：NextJS (TypeScript)
- 样式：TailwindCSS
- 动画：GSAP
- CMS：林业无头 CMS
- 部署：Vercel

## 特点

以下是我的投资组合和博客的某些特点

### SEO 友好

整个项目的开发都以 SEO 为重点。我使用了正确的元标记、描述和标题对齐。该网站现已被 Google 索引。

> 您可以使用"sat naing dev"等关键字在 google 上搜索该网站

![searching satnaing.dev on google](https://res.cloudinary.com/noezectz/image/upload/v1648231400/SatNaing/satnaing-on-google_asflq6.png "satnaing.dev is indexed")此外，由于正确使用了元标签，该网站在分享到社交媒体时将得到良好的显示。

![satnaing.dev card layout when shared to Facebook](https://res.cloudinary.com/noezectz/image/upload/v1653106955/SatNaing/satnaing-dev-share-on-facebook_1_zjoehx.png "Card layout when shared to Facebook")

### 动态站点地图

站点地图在 SEO 中起着重要作用。因此，该网站的每个页面都应包含在 sitemap.xml 中。每当我创建新内容、标签或类别时，我都会在网站中制作自动生成的站点地图。

### 浅色和深色主题

由于近年来深色主题的趋势，许多网站现在都包含开箱即用的深色主题。当然，我的网站也支持浅色和深色主题。

### 完全无障碍

该网站是完全可访问的。您只需使用键盘即可进行导航。我采用了所有 a11y 增强最佳实践，例如在所有图像中包含替代文本、不跳过标题、使用语义 HTML 标签、正确使用 aria 属性。

### 搜索框、类别和标签

所有博客内容都可以通过搜索框搜索。此外，内容可以按类别和标签过滤。这样，博客读者就可以搜索和阅读他们真正想要的内容。

### 性能和灯塔得分

由于适当的开发和最佳实践，该网站获得了非常好的性能和灯塔分数。这是该网站的灯塔得分。

![satnaing.dev Lighthouse score](https://user-images.githubusercontent.com/53733092/159957822-7082e459-11e9-4616-8f1e-49d0881f7cbb.png "satnaing.dev Lighthouse score")

### 动画

最初我使用[Framer Motion](https://www.framer.com/motion/"Framer Motion")为本网站添加动画和微交互。然而，当我尝试使用一些复杂的动画和视差效果时，我发现与Framer Motion集成起来很不方便（可能是我不太擅长和习惯使用它）。因此，我决定对我的所有动画使用 [GSAP](https://greensock.com/"GSAP 动画库")。它是最流行的动画库之一，能够制作复杂和高级的动画。您几乎可以在该网站的每个页面上看到动画和微交互。

![animations at satnaing.dev](https://res.cloudinary.com/noezectz/image/upload/v1653108324/SatNaing/ezgif.com-gif-maker_2_hehtlm.gif "satnaing.dev website")

## 尾声

总之，这个项目给了我很多关于开发博客网站（SSG）的经验和信心。现在，我已经了解了基于 git 的 CMS 以及它如何与 NextJS 交互。我还了解了 SEO、动态站点地图生成和 Google 索引程序。未来我会做出更好的项目。所以，敬请期待！ ✌🏻

最后但并非最不重要的一点是，我想对我的朋友 [Swann Fevian Kyaw](https://www.facebook.com/bon.zai.3910"Swann Fevian Kyaw 的 Facebook 帐户")(@[ToonHa](https://www.facebook.com/ToonHa-102639465752883"ToonHa Facebook 页面")) 说"谢谢"，他为我的网站英雄部分绘制了美丽的插图。

## 项目链接

- 网站：[https://satnaing.dev/](https://satnaing.dev/"https://satnaing.dev/")
- 博客：[https://satnaing.dev/blog](https://satnaing.dev/blog"https://satnaing.dev/blog")
- 回购：[https://github.com/satnaing/my-portfolio](https://github.com/satnaing/my-portfolio"https://github.com/satnaing/my-portfolio")
