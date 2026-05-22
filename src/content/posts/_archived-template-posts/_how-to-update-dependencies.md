---
title: "如何更新AstroPaper的依赖项"
author: Sat Naing
pubDatetime: 2023-07-20T15:33:05.569Z
slug: how-to-update-dependencies
featured: false
draft: false
ogImage: ../../assets/images/forrest-gump-quote.png
tags:
  - FAQ
description: "如何更新项目依赖项和 AstroPaper 模板。"
---
更新项目的依赖项可能很乏味。然而，忽略更新项目依赖项也不是一个好主意。在这篇文章中，我将分享我通常如何更新我的项目，重点以 AstroPaper 为例。尽管如此，这些步骤也可以应用于其他 js/node 项目。

![Forrest Gump Fake Quote](@/assets/images/forrest-gump-quote.png)

## 目录

## 更新包依赖项

更新依赖关系的方法有多种，我尝试了多种方法来找到最简单的路径。一种方法是使用 `npm install package-name@latest` 手动更新每个包。此方法是最直接的更新方法。然而，它可能不是最有效的选择。

我推荐的更新依赖项的方法是使用 [npm-check-updates 包](https://www.npmjs.com/package/npm-check-updates)。 freeCodeCamp 有一篇关于此的很好的[文章](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/)，所以我不会解释它是什么以及如何使用该包的详细信息。相反，我将向您展示我的典型方法。

首先，全局安装`npm-check-updates`包。
```bash
npm install -g npm-check-updates
```
在进行任何更新之前，最好检查所有可以更新的新依赖项。
```bash
ncu
```
大多数时候，补丁依赖项的更新完全不会影响项目。因此，我通常通过运行 `ncu -i --target patch` 或 `ncu -u --target patch` 来更新补丁依赖项。不同之处在于 `ncu -u --target patch` 将更新所有补丁，而 `ncu -i --target patch` 将提供切换要更新哪个包的选项。由您决定采取哪种方法。

下一部分涉及更新次要依赖项。较小的软件包更新通常不会破坏项目，但检查各个软件包的发行说明总是好的。这些小的更新通常包括一些可以应用于我们的项目的很酷的功能。
```bash
ncu -i --target minor
```
最后但并非最不重要的一点是，依赖项中可能有一些主要的包更新。因此，通过运行检查其余的依赖项更新
```bash
ncu -i
```
如果有任何重大更新（或您仍然需要进行的某些更新），上述命令将输出那些剩余的软件包。如果该包是主要版本更新，您必须非常小心，因为这可能会破坏整个项目。因此，请仔细阅读相应的发行说明（或）文档并进行相应的更改。

如果您运行 `ncu -i` 并发现没有更多软件包需要更新，_**恭喜!!!**_ 您已成功更新项目中的所有依赖项。

## 更新 AstroPaper 模板

与其他开源项目一样，AstroPaper 也随着错误修复、功能更新等不断发展。因此，如果您使用 AstroPaper 作为模板，您可能还想在新版本发布时更新模板。

问题是，您可能已经根据您的喜好更新了模板。因此，我无法准确地展示 **"一刀切的完美方式"** 将模板更新到最新版本。但是，这里有一些在不破坏存储库的情况下更新模板的提示。请记住，大多数时候，更新包依赖项可能就足够了。

### 要记住的文件和目录

在大多数情况下，您可能不想覆盖的文件和目录（因为您可能已经更新了这些文件）是 `src/content/blog/`、`src/config.ts`、`src/pages/about.md` 以及其他资源和样式，例如 `public/` 和 `src/styles/base.css`。

如果您只更新了最低限度的模板，那么将除上述文件和目录之外的所有内容替换为最新的 AstroPaper 应该没问题。它就像纯 Android 操作系统和其他特定于供应商的操作系统（例如 OneUI）。对基础的修改越少，需要更新的就越少。

您可以手动一一替换每个文件，也可以使用 git 的魔力来更新所有内容。我不会向您展示手动更换过程，因为它非常简单。如果您对这种简单且低效的方法不感兴趣，请耐心等待🐻。

### 使用 Git 更新 AstroPaper

**重要！！！**

> 仅当您知道如何解决合并冲突时才执行以下操作。否则，您最好手动替换文件或仅更新依赖项。

首先，将 astro-paper 添加为项目中的遥控器。
```bash
git remote add astro-paper https://github.com/satnaing/astro-paper.git
```
签出到新分支以更新模板。如果您知道自己在做什么并且对自己的 git 技能充满信心，则可以省略此步骤。
```bash
git checkout -b build/update-astro-paper
```
然后，通过运行从 astro-paper 中提取更改
```bash
git pull astro-paper main
```
如果遇到 `fatal: refusing to merge unrelated histories` 错误，可以通过运行以下命令来解决该问题
```bash
git pull astro-paper main --allow-unrelated-histories
```
运行上述命令后，您的项目中可能会遇到冲突。您需要手动解决这些冲突并根据您的需要进行必要的调整。

解决冲突后，彻底测试您的博客以确保一切按预期运行。检查您的文章、组件以及您所做的任何自定义。

一旦您对结果感到满意，就可以将更新分支合并到主分支中（仅当您在另一个分支中更新模板时）。恭喜！您已成功将模板更新到最新版本。您的博客现已更新并准备大放异彩！ 🎉

## 结论

在本文中，我分享了一些更新依赖项和 AstroPaper 模板的见解和流程。我真诚地希望这篇文章有价值，并帮助您更有效地管理您的项目。

如果您有任何替代或改进的方法来更新依赖项/AstroPaper，我很乐意听取您的意见。因此，请随时在存储库中开始讨论、给我发电子邮件或提出问题。非常感谢您的意见和想法！

请理解，我这几天的日程比较忙，可能无法快速回复。不过，我保证会尽快回复您。 😬

感谢您花时间阅读本文，祝您的项目一切顺利！