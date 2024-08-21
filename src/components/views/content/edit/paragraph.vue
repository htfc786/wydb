<template>
  <div class="paragraph">
    <a-list size="small" item-layout="horizontal" bordered :data-source="data">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <editSentence
            :data="item" :index="index"
            @content:add="addContent(index, $event)"
            @content:addNext="addContent(index + 1, $event)"
            @content:remove="removeContent(index)"
            @content:move="moveContent(index, $event)"
          />
        </a-list-item>
      </template>
      <template #footer>
        <a-space>
          <a-button type="link" size="small" :icon="h(PlusOutlined)" @click="addContent(data.length)"
            >添加句子</a-button
          >
        </a-space>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { h, createVNode } from 'vue'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import editSentence from './sentence.vue'

const props = defineProps({
  data: { type: Array as PropType<API.WyContent[]>, required: true },
})
const emits = defineEmits(['content:moveAcross'])

// 添加句子
const addContent = (index: number, content?: API.WyContent) => {
  if (!content) {
    content = {};
  }
  // 向数组指定位置插入
  props.data.splice(index, 0, content)
  message.success('添加成功！')
}
// 删除句子
const removeContent = (index: number) => {
  Modal.confirm({
    title: '确定要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '删除操作不可撤回',
    okType: 'danger',
    okText: '删除',
    cancelText: '取消',
    onOk() {
      // 删除数组指定位置
      props.data.splice(index, 1)
      message.success('删除成功！')
    },
    onCancel() {
      message.success('已取消操作...')
    },
  })
}
// 移动句子
const moveContent = (index: number, direction: 'up' | 'down') => {
  if (direction === 'up') {
    if (index === 0) {
      emits('content:moveAcross', {index, direction})
      return
    }
    // 交换位置
    [props.data[index], props.data[index - 1]] = [props.data[index - 1], props.data[index]]
  } else {
    if (index === props.data.length - 1) {
      emits('content:moveAcross', {index, direction})
      return
    }
    // 交换位置
    [props.data[index], props.data[index + 1]] = [props.data[index + 1], props.data[index]]
  }
  message.success('移动成功！')
}
</script>

<style scoped></style>
