<template>
  <div class="server-search-cascader">
    <input
      class="ssc-input"
      type="text"
      v-model="sscInput"
      @input="onSscInput.input"
      @focus="onSscInput.focus"
      :placeholder="sscIptPlaceholder"
    />
    <div class="ssc-dropdown" v-show="shwoSscDropdown">
      <sscd-seacher v-if="sscInput" :sscInput="sscInput" @onChange="onChange" :fieldNames="props.fieldNames" :api="props.api" />
      <sscd-options v-else @onChange="onChange" :selected="selected" :fieldNames="props.fieldNames" :api="props.api"/>
    </div>
    <img :src="closeImg"  alt="closeImg" class="closeImg" v-if="sscIptPlaceholder" @click="onClear"/>
    <img :src="arrowImg"  alt="arrowImg" class="arrowImg"  :class="{arrowImgActive:shwoSscDropdown}" v-else/>
    
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount } from 'vue'
export default defineComponent({
  name: 'ServerSearchCascader'
})
</script>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import SscdOptions from './sscd-options';
import SscdSeacher from './sscd-seacher';
import {arrowImg, closeImg} from './utils/image';
import _ from "lodash";

const props = defineProps({
  api: {
    type: String,
    default: null,
  },
  modelValue: {
    type: Object,
    default: null,
  },
  fieldNames: {
    type: Object,
    default: {
      label: 'label',
      value: 'value',
      children: 'children',
      fullPath: 'fullPath'
    },
  }
})

const emit = defineEmits(["update:modelValue", "change"]);


// 输入框中的值
const sscInput = ref("");
// 输入框中的值
const sscIptPlaceholder = ref("");
// 选中的值,主要针对搜索到的 需要高亮（格式是fullPath）
const selected = ref(null);

// ssc-dropdown是否显示
const shwoSscDropdown = ref(false);

// 输入框原生事件
const onSscInput = {
  focus() {
    // 只要是触发聚焦，ssc-dropdown必显示
    shwoSscDropdown.value = true;
  },
  input(e) {
    const { value } = e.target;
  },
};

// 输入框可控组件的回显
const onChange = (item) => {
  if (item === 'clear') {
    sscIptPlaceholder.value = '';
    emit('update:modelValue', null);
  } else {
    sscInput.value = '';
    sscIptPlaceholder.value = item[props.fieldNames.fullPath].map(it=>(it[props.fieldNames.label])).join("/");
    shwoSscDropdown.value = false;
    selected.value = item;
    const res = _.cloneDeep(item);
    delete res.loading;
    delete res.active; // 最终选中项不需要active属性
    emit('update:modelValue', res);
  }

  emit('change', item)

}

const onClear = ()=>{
  sscIptPlaceholder.value = '';
  emit('update:modelValue', null);
}

const onClickBody = (e) => {
  // 是否点击ssc-dropdown 或者 输入框本身,除此之外下拉框消失
  if (!shwoSscDropdown.value) { return false }
  const sscDropdown = document.querySelector('.ssc-dropdown');
  const isClickSscDropdown = sscDropdown.contains(e.target);
  const sscInput = document.querySelector('.ssc-input');
  const isClickSscInput = e.target === sscInput;
  if (!(isClickSscInput || isClickSscDropdown)) {
    shwoSscDropdown.value = false;
  }
}


// 设置默认的v-model初始化值
watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (newValue) {
      selected.value = newValue;
      sscInput.value = '';
      sscIptPlaceholder.value = newValue[props.fieldNames.fullPath].map(it=>(it[props.fieldNames.label])).join("/");
    } else {
      selected.value = null;
      sscInput.value = '';
      sscIptPlaceholder.value = '';
    }
  }, { immediate: true }
)

onMounted(() => {
  window.addEventListener("click", onClickBody)
})

onBeforeUnmount(() => {
  window.removeEventListener(onClickBody);
})
</script>
<style scoped lang="less">
@import url(./style.less);
</style>
