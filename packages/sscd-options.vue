<template>
    <!-- <div class="need-disabel" v-if="needDisabel"></div> -->
    <div class="sscd-options-block loading" v-if="options.length === 0">
        <div class="box">
            <img :src="loadingImg" />
            <div> 加载中</div>
        </div>
    </div>

    <div class="sscd-options-block" v-for="(soBlock, sbIndex) in options" :key="sbIndex" v-else>
        <div
            class="sscd-option"
            v-for="(item, itemIndex) in soBlock"
            :key="item[props.fieldNames.value]"
            @click="syncOptions(item, itemIndex, sbIndex)"
        >
            <span v-show="item.active" style="color:#40a9ff">{{ item[props.fieldNames.label] }}</span>
            <span v-show="!item.active">{{ item[props.fieldNames.label] }}</span>
            <span v-if="item.loading">
                <img :src="loadingImg" class="opt-loading" />
            </span>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';
import { loadingImg } from './utils/image';


const props = defineProps({
    selected: {
        type: Object,
        default: null,
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
const needDisabel = ref(0);// 加载中
// 初始化或者懒加载下来列表
const syncOptions = async (item, itemIndex, sbIndex) => {
    // 点击的时候 要切换右侧子面板，并且设置active
    if (item[props.fieldNames.value] !== "0") {
        const currentBlock = options.value[sbIndex]; // 当前点击的面板
        options.value = options.value.slice(0, sbIndex + 1);
        for (let index = 0; index < currentBlock.length; index++) {
            const element = currentBlock[index];
            element.active = false;
        }
        currentBlock[itemIndex].active = true;
    }

    // 如果后端返回的有isLast这个属性，则直接默认是选中是这一级
    if(item.isLast){
        emit("onChange", item);
        return false;
    }


    // loadingList.value.push(item[props.fieldNames.value]);
    item.loading = true;
    needDisabel.value++;
    const { data } = await axios.get(props.api, { data: { [props.fieldNames.value]: item[props.fieldNames.value] } });
    item.loading = false;
    needDisabel.value--;
    console.log(data);
    if(needDisabel.value !==0){
        return false;
    }
    if (data[props.fieldNames.children]?.length > 0) {
        if (props.selected && props.selected[props.fieldNames.fullPath].length > 0) {
            // 搜索到选中后，再次点开懒加载的option，也要高亮
            data[props.fieldNames.children].forEach(element => {
                const checked = props.selected[props.fieldNames.fullPath].some((item) => (element[props.fieldNames.value] === item[props.fieldNames.value]));
                element.active = checked;
            });
        }
        options.value = [...options.value, data[props.fieldNames.children]];
    } else { // 如果拿不到结果，则默认是最后一级
        emit("onChange", item);
    }
}

onMounted(() => {
    syncOptions({ [props.fieldNames.value]: "0" });
})

</script>
<style scoped lang="less">
@import url(./style.less);
</style>