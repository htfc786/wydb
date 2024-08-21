<template>
  <div class="sentence">
    <a-row>
      <!-- 句子内容 -->
      <p class="content">
        <!-- 展示内容状态 -->
        <template v-if="!editContent">
          <template v-if="data?.pinyin?.length == data?.content?.length">
            <!-- 拼音完整 -->
            <ruby>
              <template v-for="(c, i) in data.content">
                {{ c }}<rp>(</rp><rt>{{ (data.pinyin || [])[i] }}</rt><rp>)</rp>
              </template>
            </ruby>
          </template>
          <template v-else>
            <!-- 拼音不全 -->
            {{ data.content }}
          </template>

          <!-- 按钮区 -->
          <a-tooltip title="编辑"><a-button type="link" :icon="h(EditOutlined)" @click="openContentEdit()"/></a-tooltip>
          <a-tooltip title="拼音编辑"><a-button type="link" :icon="h(ItalicOutlined)" @click="editPinyin()"/></a-tooltip>
          <a-tooltip title="删除"><a-button type="link" danger :icon="h(DeleteOutlined)" @click="$emit('content:remove')"/></a-tooltip>
          <a-tooltip title="在上方添加"><a-button type="link" :icon="h(PlusOutlined)" @click="$emit('content:add')"/></a-tooltip>
          <a-tooltip title="上移"><a-button type="link" :icon="h(UpOutlined)" @click="$emit('content:move', 'up')" /></a-tooltip>
          <a-tooltip title="下移"><a-button type="link" :icon="h(DownOutlined)" @click="$emit('content:move', 'down')"/></a-tooltip>
        </template>
        <!-- 编辑内容状态 -->
        <template v-else>
          <div class="ant-typography ant-typography-edit-content ant-typography-div css-dev-only-do-not-override-19iuou">
            <textarea class="ant-input css-dev-only-do-not-override-19iuou" style="height: 32px; resize: none" rows="1"
              :value="data.content"
              @blur="closeContentEdit($event)"
              @keyup.esc="($event.target as HTMLElement).blur()"
              @keyup.enter="($event.target as HTMLElement).blur()"
              ref="contentTextarea"
            ></textarea>
            <span class="anticon anticon-enter ant-typography-edit-content-confirm" role="img"><EnterOutlined/></span>
          </div>
        </template>
      </p>
    </a-row>
    <div class="details">
      <!-- 其他注释等信息写在这里 -->
      <!-- 翻译 -->
      <span class="translation">
        <a-typography-paragraph v-model:content="data.translation" editable>
          <template #editableTooltip>编辑</template>
        </a-typography-paragraph>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { h, nextTick, ref } from 'vue'
import {
  EditOutlined,
  EnterOutlined,
  DeleteOutlined,
  PlusOutlined,
  UpOutlined,
  DownOutlined,
  ItalicOutlined,
} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import pinyinEdit from './pinyinEdit.vue'
import { splitPinyin } from '@/utils/pinyin'
import { splitSentence } from '@/utils/sentence'

const props = defineProps({
  data: { type: Object as PropType<API.WyContent>, default: () => {} },
  index: { type: Number, required: true },
});

const emit = defineEmits(['content:remove', 'content:add', 'content:addNext', 'content:move']);

// 内容编辑
const editContent = ref(false);
const contentTextarea = ref();
const openContentEdit = () => {
  editContent.value = true;
  nextTick(() => {
    contentTextarea.value.focus();
  });
};
const closeContentEdit = (e: any) => {
  editContent.value = false;
  // 修改后的内容
  let contentStr = e.target.value || "";
  contentStr = contentStr.replace(/[\n\s]/g, '');
  // 分割句子
  const sentenceList = splitSentence(contentStr);
  // 读取第一项
  const {content, pinyin} = splitPinyin(sentenceList[0]);
  props.data.content = content;
  if (pinyin.length > 0) {
    props.data.pinyin = pinyin;
  }
  // 剩下的倒着循环，遍历
  for (let i = sentenceList.length - 1; i > 0; i--) {
    const {content, pinyin} = splitPinyin(sentenceList[i]);
    emit('content:addNext', {content, pinyin});
  }
};

// 编辑拼音
const editPinyin = () => {
  Modal.confirm({
    title: '拼音编辑',
    icon: null,
    footer: null,
    closable: true,
    width: '500px',
    content: h(pinyinEdit, {
      data: props.data,
    }),
  });
};
</script>

<style scoped>
.sentence {
  width: 100%;
}
.sentence .ant-row {
  flex-wrap: nowrap;
  align-items: flex-end;
}
/* 内容正文 */
.sentence .content {
  margin-bottom: 0;
  display: block;
  width: 100%;
  font-size: 20px;
}
/* 拼音 */
.sentence .content.pinyin ruby > rt {
  font-size: 75%;
}
/* details */
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
.sentence .translation .ant-typography {
  margin-bottom: 0;
}
</style>
