---
title: Vue笔记
categories:
  - 代码手册
tags:
  - vue
top_img: false
abbrlink: 182410313
date: 2022-10-01 11:20:30
---

## 快速开始
安装@vue/cli
```shell
# npm
npm install @vue/cli
# yarn
yarn gloable add @vue/cli
```
创建第一个项目
```shell
vue create demo
```

## 基础

### 过滤器

全局过滤器
```js
// 全局过滤器定义
Vue.filter("reverse", (val, s) => {
  return val.split("").reverse().join(s)
})
```

局部过滤器
```vue
<script>
export default {
  // 局部过滤器定义(只能在当前vue文件内使用)
  filters: {
    toUp (val) {
      return val.toUpperCase()
    }
  }
}
</script>
```

使用
```vue
<template>
  <div>
    <p>使用翻转过滤器: {{ msg | reverse }}</p>
    <p :title="msg | toUp">鼠标长停</p>
  </div>
</template>
```

### 计算属性
有缓存功能，多次调用从缓存取值
```vue
<template>
  <div>
      <div>
          <span>姓名:</span>
          <input type="text" v-model="full">
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      a: 10,
      b: 20
    }
  },
  // 计算属性:
  computed: {
      full: {
          // 给full赋值触发set方法
          set(val){
              console.log(val)
          },
          // 使用full的值触发get方法
          get(){
              return "无名氏"
          }
      }
  }
}
</script>

<style>

</style>
```

### 侦听器

### 组件基础


