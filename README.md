# server-search-cascader
## 描述
vue3版本的级联选择器，支持懒加载和服务端搜索   
如果您用的是react，原理一样，看代码修改即可   

The cascade selector of vue3 supports lazy loading and server-side search.
If you use react, the principle is the same. Just look at the code modification

## 安装(install)

```
yarn install server-search-cascader
```

## 使用(use)

main.js

```javascript
import ServerSearchCascader from "server-search-cascader";
createApp(App).use(ServerSearchCascader).mount("#app");
```

app.vue

```html
<template>
  <div class="app">
    <server-search-cascader
      api="/getTeachers"
      v-model="sscValue"
      :field-names="fieldNames"
      @change="onChange"
    />
  </div>
</template>
<script setup>
  import axios from "axios";
  import { ref, onBeforeMount } from "vue";
  const sscValue = ref(null);
  const fieldNames = {
    label: "name",
    value: "id",
    children: "children",
    fullPath: "fullPath",
  };
  const onChange = (item) => {
    console.log("拿到结果", item);
  };
</script>
```

## 参数(options)

| 参数/描述  | 表头           |
| ---------- | -------------- |
| api        | 请求数据的接口 |
| fieldNames | 别名           |
| change     | 选择事件       |

## 后端(server)
需要返回如下的数据结构

```javascript
{
    "id": "org3",
    "name": "机构3", // 显示名称
    "children": [ // 子节点
        {
            "id": "org3-part1",
            "name": "机构3-部门1",
            "fullPath": [
                {
                    "id": "org3",
                    "name": "机构3"
                },
                {
                    "id": "org3-part1",
                    "name": "机构3-部门1"
                }
            ]
        },
        {
            "id": "org3-part2",
            "name": "机构3-部门2",
            "fullPath": [
                {
                    "id": "org3",
                    "name": "机构3"
                },
                {
                    "id": "org3-part2",
                    "name": "机构3-部门2"
                }
            ]
        }
    ],
    "fullPath": [ // 完整路径
        {
            "id": "org3",
            "name": "机构3"
        }
    ]
}
```

## 效果(preview)
![preview](https://github.com/dshvv/server-search-cascader/blob/main/preview.gif)
