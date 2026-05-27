#!/usr/bin/env node
/* eslint-disable no-console */
import { writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const title = process.argv[2];
if (!title) {
  console.error("用法: pnpm new-post <文章标题>");
  process.exit(1);
}

const now = new Date();
const pubDatetime = now.toISOString().replace(/\.\d{3}Z$/, "+08:00");
const slug = title
  .toLowerCase()
  .replace(/[^\w一-龥]+/g, "-")
  .replace(/^-|-$/g, "");

const content = `---
title: "${title}"
author: "Kevin Tse"
pubDatetime: ${pubDatetime}
featured: false
draft: false
tags:
  - 随笔
description: ""
---

`;

const filename = `${slug}.md`;
const filepath = join(__dirname, "..", "src", "content", "posts", filename);

writeFileSync(filepath, content);
console.log(`✅ 创建成功: src/content/posts/${filename}`);
