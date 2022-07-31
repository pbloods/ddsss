---
title: hope主题搭建记录
date: 2022-07-11 06:36:02
---

# 安装

## 主题安装
```shell
npm init vuepress-theme-hope@next [dir]
```
或者
```shell
pnpm create vuepress-theme-hope@next [dir]
```

## 插件安装
### markdown-it-disable-url-encode
使vuepress支持中文名文件的编译，方便管理文件
```shell
npm i markdown-it-disable-url-encode
```

# 配置

## 侧边栏
修改`.vuepress\sidebar.ts`
```ts
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [     
  "",
  // note 目录侧边栏配置
  {
    text: "笔记",
    icon: "note", // 目录图标
    prefix: "note/",  // 目录所在位置
    children: [
      "linux/", // 子目录
      "nginx/",
    ],
  },
  ],

  "/note/": "structure",
});
```

navbar.ts
```ts
import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/home",
  { text: "笔记", icon: "note", link: "/note/" },
]);

```

guide目录结构
```shell
.
├── get-started
│   ├── README.md # （可选）目录说明文件
│   ├── install.md # （标题必需）内容文件
│   ├── intro.md # （标题必需）内容文件
│   └── markdown.md # （标题必需）内容文件
└── README.md # （可选）目录说明文件
```

