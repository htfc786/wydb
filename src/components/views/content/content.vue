<template>
  <div class="content">
    <div class="content-item" :class="{ 'close': isClose[index] }" v-for="item,index in data">
      <div class="title">
        <a-button type="text" shape="circle" :icon="h(CaretDownOutlined)" @click="toggleContent(index)" />
        <h4>第{{ index + 1 }}段</h4>
        <p v-if="item.length == 0">(空)</p>
      </div>
      <div class="content-show" ref="contentShowRef">
        <paragraph :data="item" :pinyin="pinyin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { h, ref } from 'vue';
import { CaretDownOutlined } from '@ant-design/icons-vue';
import paragraph from "./paragraph.vue";

defineProps({
  data: { type: Array as PropType<API.WyContent[][]>, default: () => [] },
  pinyin: { type: Boolean, default: false },
})

const isClose = ref<boolean[]>([]);


const contentShowRef = ref<HTMLElement[]>([]);
const toggleContent = (index: number) => {
  isClose.value[index] = !isClose.value[index];
  console.log("toggleContent",isClose.value[index]);
  const contentShow = contentShowRef.value[index];
  if (contentShow) {
    if (isClose.value[index]) {
      contentShow.addEventListener('transitionend', () => {
        contentShow.classList.add("closeDisplayNone");
      }, { once: true });
    } else {
      contentShow.classList.remove("closeDisplayNone");
    }
  }
};

</script>

<style scoped>
.content .title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.content .title .ant-btn {
  margin-right: 0.5em;
}
.content .title h4 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.content .title p {
  margin-left: 4px;
  margin-bottom: 0;
}
.content .title .ant-btn .anticon:deep() svg {
  transition: transform 0.3s;
}
.content .close .title .ant-btn .anticon:deep() svg {
  transform: rotate(-90deg);
}
.content .content-show {
  /* 缩放动画 */
  transform-origin: center top;
  transform: scaleY(1);
  opacity: 1;
  transition: 0.3s;
}
.content .close .content-show {
  transform: scaleY(0);
  opacity: 0;
}
.content .close .content-show.closeDisplayNone {
  display: none;
}
</style>