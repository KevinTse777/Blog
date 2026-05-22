---
title: "如何使用 React 开发我的终端投资组合网站"
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
slug: how-do-i-develop-my-terminal-portfolio-website-with-react
featured: false
draft: false
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description: "示例文章：使用 ReactJS、TypeScript 和 Styled-Components 开发类似终端的网站。"
timezone: "Asia/Yangon"
---

> 本文来源于我的【博文】(https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react)。我写这篇文章是为了演示如何使用 AstroPaper 主题撰写博客文章/文章。

使用 ReactJS、TypeScript 和 Styled-Components 开发一个类似终端的网站。包括自动完成、多个主题、命令提示等功能。

![Sat Naing's Terminal Portfolio](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## 目录

## 简介

最近，我开发并发布了我的作品集+博客。我很高兴得到了一些好的反馈。今天，我想介绍我的新的类似终端的投资组合网站。它是使用ReactJS、TypeScript开发的。我从 CodePen 和 YouTube 得到了这个想法。

## 技术堆栈

该项目是一个前端项目，没有任何后端代码。 UI/UX部分是在Figma中设计的。对于前端用户界面，我选择了 React，而不是痛苦的 JavaScript 和 NextJS。为什么？

- 首先，我想编写声明性代码。使用 JavaScript 命令式管理 HTML DOM 确实很乏味。
- 其次，因为它是React！！！它快速、可靠。
- 最后，我不需要 NextJS 提供的太多 SEO 功能、路由和图像优化。

当然还有用于类型检查的 TypeScript。

对于造型，我采取了与通常不同的方法。我没有选择纯 CSS、Sass 或像 TailwindCSS 这样的实用 CSS 框架，而是选择了 CSS-in-JS 方式（Styled-Components）。虽然我了解 Styled-Components 一段时间了，但我从未尝试过。所以，这个项目中Styled-Components的写作风格和结构可能不是很有条理或者很好。

这个项目不需要非常复杂的状态管理。我只是在这个项目中使用 ContextAPI 来实现多个主题并避免道具钻探。

这是技术堆栈的快速回顾。

- 前端：[ReactJS](https://reactjs.org/"React 网站")、[TypeScript](https://www.typescriptlang.org/"TypeScript 网站")
- 样式：[样式组件](https://styled-components.com/"样式组件网站")
- UI/UX：[Figma](https://figma.com/"Figma 网站")
- 状态管理：[ContextAPI](https://reactjs.org/docs/context.html"React ContextAPI")
- 部署：[Netlify](https://www.netlify.com/"Netlify 网站")

## 特点

以下是该项目的一些特点。

### 多个主题

用户可以更改多个主题。在撰写本文时，有 5 个主题；将来可能会添加更多主题。所选主题保存在本地存储中，以便页面刷新时主题不会更改。

![Setting different theme](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### 命令行完成

为了使外观和感觉尽可能接近实际终端，我设置了命令行完成功能，只需按"Tab"或"Ctrl + i"即可自动填充部分键入的命令。

![Demonstrating command-line completion](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### 之前的命令

用户可以返回到以前的命令或通过按向上和向下箭头导航以前键入的命令。

![Going back to previous commands with UP Arrow](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### 查看/清除命令历史记录

可以通过在命令行中输入"history"来查看以前输入的命令。通过输入"clear"或按"Ctrl + l"可以清除所有命令历史记录和终端屏幕。

![Clearing the terminal with 'clear' or 'Ctrl + L' command](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## 尾声

这是一个非常有趣的项目，这个项目的一个特殊部分是我必须关注逻辑而不是用户界面（即使这是一个前端项目）。

## 项目链接

- 网站：[https://terminal.satnaing.dev/](https://terminal.satnaing.dev/"https://terminal.satnaing.dev/")
- 回购：[https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio"https://github.com/satnaing/terminal-portfolio")
