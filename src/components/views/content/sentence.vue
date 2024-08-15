<template>
  <div class="sentence" :class="{ 'close': isClose }">
    <a-row>
      <a-button type="text" size="small" shape="circle" :icon="h(DownOutlined)" @click="isClose = !isClose" />
      <!-- 句子内容 -->
      <p class="content" :class="{ pinyin: pinyin }">
        <!-- 拼音 -->
        <template v-for="c,i in data.content" v-if="pinyin">
          <ruby>{{ c }}<rp>(</rp><rt>{{ (data.pinyin||[])[i] }}</rt><rp>)</rp></ruby>
        </template>
        <!-- 只有内容 -->
        <template v-else>
          {{ data.content }}
        </template>
      </p>
    </a-row>
    <div class="details">
      <!-- 其他注释等信息写在这里 -->
      <!-- 翻译 -->
      <span class="translation" v-if="data.translation">
        {{ data.translation }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { h, ref } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';

defineProps({
  data: { type: Object as PropType<API.WyContent>, default: () => {} },
  pinyin: { type: Boolean, default: false },
})

const isClose = ref<boolean>();

</script>

<style scoped>
.sentence {
  width: 100%;
}
.sentence .ant-row {
  flex-wrap: nowrap;
  align-items: flex-end;
}
/* 关闭按钮 */
.sentence .ant-btn {
  font-size: 8px;
  margin-left: -20px;
  margin-right: -4px;
}
.sentence .ant-btn .anticon:deep() svg {
  transition: transform 0.3s;
}
.sentence.close .ant-btn .anticon:deep() svg {
  transform: rotate(-90deg);
}
/* 内容正文 */
.sentence .content {
  font-size: 20px;
  display: block;
  margin-bottom: 0;
}
/* 拼音 */
.sentence .content.pinyin ruby > rt {
  font-size: 60%;
}
.sentence .content.pinyin.pinyin-big ruby > rt {
  font-size: 75%;
}
/* details */
.sentence.close .details {
  display: none;
}
/* 其他内容css样式写在这 */
/* 翻译 */
.sentence .translation {
  width: 100%;
  display: block;
  background: #f5f5f5;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 5px -5px 0 -5px;
}
</style>