<template>
    <div class="sscd-options-block">
        <div v-if="loading" class="sscd-loading">
            <img :src="loadingImg" />
            <div>加载中...</div>
        </div>
        <template v-else>
            <template v-if="options?.length > 0">
                <div
                    class="sscd-option"
                    v-for="item in options"
                    :key="item[props.fieldNames.value]"
                    @click="onClick(item)"
                >
                    <span
                        v-for="(it, index) in item[props.fieldNames.fullPath]"
                        :key="it[props.fieldNames.value]"
                    >{{ it[props.fieldNames.label] }} {{ index < item[props.fieldNames.fullPath].length - 1 ? '>' : '' }}</span>
                </div>
            </template>
            <div v-else class="sscd-nodate">
                <img :src="noDateImg" />
                <div>暂无数据</div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from 'axios';
import _ from 'lodash';
import { noDateImg, loadingImg } from './utils/image';


const props = defineProps({
    sscInput: {
        type: String,
        default: '',
    },
    api: {
        type: String,
    },
    fieldNames: {
        type: Object
    }
})


const emit = defineEmits(["onChange"]);
const options = ref([]);
const loading = ref(false);
// 初始化或者懒加载下来列表
const syncOptions = _.throttle(async () => {
    loading.value = true;
    const { data } = await axios.get(props.api, { data: { [props.fieldNames.label]: props.sscInput } });
    loading.value = false;
    options.value = data;
    console.log(data);
}, 1000)

const onClick = (item) => {
    emit("onChange", item);
}



watch(
    () => props.sscInput,
    (newValue, oldValue) => {
        syncOptions();
    }, { immediate: true }
)

</script>
<style scoped lang="less">
@import url(./style.less);
</style>