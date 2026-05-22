---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: "如何使用 Git Hooks 设置创建和修改日期"
featured: false
draft: false
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: "如何使用 Git Hooks 在 AstroPaper 上设置创建和修改日期"
---

在这篇文章中，我将解释如何使用预提交 Git 钩子来自动输入 AstroPaper 博客主题 frontmatter 中创建的 (`pubDatetime`) 和修改的 (`modDatetime`)

## 目录

## 让它们无处不在

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 非常适合自动化任务，例如[添加](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea) 或[检查](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e) 提交消息的分支名称或[阻止您提交纯文本机密](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000)。它们最大的缺陷是客户端挂钩是每台机器的。

您可以通过拥有一个 `hooks` 目录并手动将它们复制到 `.git/hooks` 目录或设置符号链接来解决这个问题，但这一切都需要您记住设置它，而这不是我擅长做的事情。

由于这个项目使用了 npm，我们可以利用一个名为 [Husky](https://typicode.github.io/husky/) 的包（它已经安装在 AstroPaper 中）来自动为我们安装钩子。

> 更新！在 AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0) 中，预提交挂钩已被删除，以支持 GitHub Actions。不过，您可以自己轻松地[安装Husky](https://typicode.github.io/husky/get-started.html)。

## 钩子

由于我们希望在提交代码来更新日期时运行此挂钩，然后将其作为更改的一部分，因此我们将使用 `pre-commit` 挂钩。 AstroPaper 项目已经设置了该设置，但如果没有设置，您将运行 `npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`。

导航到 `hooks/pre-commit` 文件，我们将添加以下一个或两个片段。

### 编辑文件时更新修改日期

---

更新：

此部分已更新为更智能的新版本挂钩。现在，在帖子发布之前，它不会增加 `modDatetime`。第一次发布时，将草稿状态设置为`first`，然后观看奇迹的发生。

---

````shell
# Modified files, update the modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
`
```git diff --cached --name-status` 从 git 获取已暂存以供提交的文件。输出看起来像：
```shell
A       src/content/blog/setting-dates-via-git-hooks.md
````

开头的字母表示已采取的操作，在上面的示例中已添加文件。修改的文件有`M`

我们将该输出传输到 grep 命令中，在其中查看每一行以查找已修改的内容。该行需要以 `M` (`^(M)`) 开头，之后可以有任意数量的字符 (`.*`)，并以 `.md` 文件扩展名 (`.(md)$`) 结尾。这将过滤掉未修改的 Markdown 文件 `egrep -i "^(M).*\.(md)$"` 的行。

---

#### 改进 - 更明确

可以添加此选项以仅查找我们在 `blog` 目录中标记的文件，因为这些是唯一具有正确 frontmatter 的文件

---

正则表达式将捕获两个部分：字母和文件路径。我们将把这个列表通过管道传输到一个 while 循环中，以迭代匹配的行，并将字母分配给 `a` 并将路径分配给 `b`。我们暂时忽略`a`。

要了解文件的草稿状态，我们需要它的 frontmatter。在下面的代码中，我们使用`cat`获取文件的内容，然后使用`awk`在frontmatter分隔符（`---`）上分割文件并获取第二个块（fonmtmatter，`---`之间的位）。从这里开始，我们再次使用 `awk` 来查找草稿键并打印值。

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

现在我们有了 `draft` 的值，我们将执行 3 件事中的 1 件事，将 modDatetime 设置为现在（当草稿为 false `if [ "$draft" = "false" ]; then` 时），清除 modDatetime 并将草稿设置为 false（当草稿设置为第一个 `if [ "$draft" = "first" ]; then` 时），或者什么也不做（在任何其他情况下）。

sed 命令的下一部分对我来说有点神奇，因为我不经常使用它，它是从[另一篇关于做类似事情的博客文章]（https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/）复制的。本质上，它是在文件的 frontmatter 标签 (`---`) 内部查找 `pubDatetime:` 键，获取整行并再次用 `pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/"` 相同键替换它，并且当前datetime格式正确。

此替换是在整个文件的上下文中，因此我们将其放入临时文件 (`> tmp`) 中，然后将新文件移动 (`mv`) 到旧文件的位置，覆盖它。然后将其添加到 git 中，准备提交，就像我们自己进行更改一样。

---

#### 注意

为了使 `sed` 工作，frontmatter 需要在 frontmatter 中已经有 `modDatetime` 键。您还需要进行一些其他更改才能使用空白日期构建应用程序，请参阅[进一步向下](#empty-moddatetime-changes)

---

### 添加新文件的日期

添加新文件的日期与上面的过程相同，但这次我们要查找已添加的行 (`A`)，并且我们将替换 `pubDatetime` 值。

````shell
# New files, add/update the pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```---

#### 改进 - 仅循环一次

我们可以使用 `a` 变量在循环内部进行切换，并在一个循环中更新 `modDatetime` 或添加 `pubDatetime`。

---

## 填充 frontmatter

如果您的 IDE 支持代码片段，则可以选择创建自定义代码片段来填充 frontmatter。[在 AstroPaper v4 中，默认情况下会为 VSCode 附带一个代码片段。](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## 空`modDatetime`变化

为了让 Astro 编译 markdown 并完成它的工作，它需要知道 frontmatter 中的预期内容。它通过 `src/content/config.ts` 中的配置来完成此操作

为了让键不带任何值，我们需要编辑第 10 行以添加 `.nullable()` 函数。
```ts
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(), // [!code --]
      modDatetime: z.date().optional().nullable(), // [!code ++]
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
````

为了阻止 IDE 在博客引擎文件中抱怨，我还执行了以下操作：

1. 将`| null`添加到`src/layouts/Layout.astro`中的第15行，使其看起来像

```typescript
export interface Props {
  title?: string;
  author?: string;
  description?: string;
  ogImage?: string;
  canonicalURL?: string;
  pubDatetime?: Date;
  modDatetime?: Date | null;
}
```

2. 将`| null`添加到`src/components/Datetime.tsx`中的第5行，使其看起来像

```typescript
interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}
```
