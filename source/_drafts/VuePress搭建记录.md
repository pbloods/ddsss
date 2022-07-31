---
title: VuePress 搭建记录
date: 2022-03-11 06:36:02
---

>[VuePress](https://vuepress.vuejs.org/zh/)是[Vue](https://staging-cn.vuejs.org/)驱动的静态网站生成器，界面十分简洁，非常适合搭建文档站

# 安装

先安装好以下依赖：
- [Nodejs](https://nodejs.org/zh-cn/) 自带[npm 包管理工具](posts/3476997871/)
- [Git](https://git-scm.com/downloads)
- [yarn](https://yarnpkg.cn/)（可选）`npm install -g yarn`

1. 创建并进入一个新目录
```shell
mkdir vuepress && cd vuepress
```

2. 使用你喜欢的包管理器进行初始化(创建 package.json 基本信息)
```shell
yarn init # npm init
# 顺便把git也初始化了
git init
```

3. 在当前目录安装 VuePress 依赖
```shell
yarn add -D vuepress@next # npm install -D vuepress@next
```

4. 创建你主页
```shell
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

5. 在`package.json`中添加一些`scripts`
```js
{
  "scripts": {
    "s": "vuepress dev docs",
    "g": "vuepress build docs"
  }
}
```

6. 在本地启动服务器来开发你的文档网站
```shell
yarn s  # npm run s
```
VuePress 会在<http://localhost:8080>启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。

现在，你应该已经有了一个只有单页内容的 VuePress 文档网站，当然这是不可用的，我们需要进一步配置

# 项目结构
```shell
├─ docs
│  ├─ .vuepress
│  |  └─ public # 静态资源目录
│  |     └─ images
│  |        └─ hero.png  # <- Logo 文件
│  │  └─ config.ts  # 主题配置文件
│  └─ README.md # 主页
├─ .gitignore # git 忽略文件
└─ package.json # 包管理配置文件，记录项目信息和依赖名称及版本
```

# 修改配置

### 首页配置
修改`docs/README.md`文件，[参考](https://v2.vuepress.vuejs.org/zh/reference/default-theme/frontmatter.html#%E9%A6%96%E9%A1%B5)
```md
---
home: true
heroImage: /images/hero.png
heroText: Pbloodの收藏夹
tagline: 各种黑科技资源与技术导航
actions:
  - text: 寻找资源
    link: /nav/
footer: MIT Licensed | Copyright © 2022-Pbloodの收藏夹
---
```

### 站点和主题配置
>默认站点配置文件和主题配置文件都是`docs/.vuepress/config.ts`,需要也可以分开

示例：
```ts
//依赖
import { defineUserConfig } from 'vuepress';
import { defaultTheme } from 'vuepress';

//站点配置
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Pbloodの收藏夹',
  description: '各种黑科技资源与技术导航',

  //默认主题配置
  theme: defaultTheme({
    //导航栏
    navbar: [
        {
          text: '常用推荐',
          link: '/nav/recommend.md',
        },
        {
            text: '技术博客',
            link: '/foo/',
        },
        {
            text: '综合导航',
            link: '/nav/',
        },
        {
          text: '科学上网',
          children: [
            {
                text: 'v2ray',
                link: '/foo/',
            },
            {
                text: 'clash',
                link: '/foo/',
            },
            ],
        },
      ],

  }),
})
```

这样配置以后就和官网差不多了，后续自行发挥，懒得折腾了

还有上传到代码仓库时记得把不必要的文件忽略掉
```shell
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```