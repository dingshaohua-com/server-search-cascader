<template>
  <div class="app">
    <server-search-cascader
      api="/getTeachers"
      v-model="sscValue"
      :field-names="fieldNames"
      @change="onChange"
    />
    <div>
      拿到结果：
      <code>{{ JSON.stringify(sscValue) }}</code>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onBeforeMount } from "vue";

// 可以给默认值
// const sscValue = ref({
//   id: "org1-part2-qianyi",
//   name: "钱一",
//   fullPath: [{ "id": "org1", "name": "机构1" }, { "id": "org1-part2", "name": "机构1-部门2" }, { "id": "org1-part2-qianyi", "name": "钱一" }]
// });

const sscValue = ref(null);
const fieldNames = { label: 'name', value: 'id', children: 'children', fullPath: 'fullPath' };
const onChange = (item) => {
  console.log("拿到结果", item);
}
</script>
<style scoped>
.app {
  margin: auto;
  width: 960px;
}
</style>
