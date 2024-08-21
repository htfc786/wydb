<template>
  <div class="content">
    <div class="content-item" :class="{ close: isClose[index] }" v-for="(item, index) in data">
      <div class="title">
        <a-button type="text" shape="circle" :icon="h(CaretDownOutlined)" @click="toggleContent(index)"/>
        <h4>第{{ index + 1 }}段</h4>
        <p v-if="item.length == 0">(空)</p>
        <a-button type="link" danger :icon="h(DeleteOutlined)" @click="delContent(index)">删除</a-button>
        <a-button type="link" :icon="h(UpOutlined)" @click="moveContent(index, 'up')">上移</a-button>
        <a-button type="link" :icon="h(DownOutlined)" @click="moveContent(index, 'down')">下移</a-button>
      </div>
      <div class="content-show" ref="contentShowRef">
        <editParagraph 
          :data="item"
          @content:moveAcross="moveAcross(index, $event.direction)"
        />
      </div>
      <div class="edit-new" style="margin-top: 2px">
        <a-space>
          <a-button type="link" :icon="h(PlusOutlined)" @click="addContent(index)">添加段落</a-button>
          <a-button type="link" :icon="h(ImportOutlined)" @click="batchAdd(index)">批量添加</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { h, ref, createVNode } from 'vue'
import {
  CaretDownOutlined,
  PlusOutlined,
  ImportOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons-vue'
import { message, Modal, Textarea } from 'ant-design-vue'
import editParagraph from './paragraph.vue'
import { batchAddSplitSentence } from "@/utils/sentence";

const props = defineProps({
  data: { type: Array as PropType<API.WyContent[][]>, default: () => [] },
})

const isClose = ref<boolean[]>([])

const contentShowRef = ref<HTMLElement[]>([])
const toggleContent = (index: number) => {
  isClose.value[index] = !isClose.value[index]
  console.log('toggleContent', isClose.value[index])
  const contentShow = contentShowRef.value[index]
  if (contentShow) {
    if (isClose.value[index]) {
      contentShow.addEventListener(
        'transitionend',
        () => {
          contentShow.classList.add('closeDisplayNone')
        },
        { once: true }
      )
    } else {
      contentShow.classList.remove('closeDisplayNone')
    }
  }
}

// 添加段落
const addContent = (index: number) => {
  // 向数组指定位置插入
  props.data.splice(index + 1, 0, [])
  message.success('添加成功！')
}
// 删除段落
const delContent = (index: number) => {
  Modal.confirm({
    title: `确定要删除第${index + 1}段吗?`,
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
// 移动
const moveContent = (index: number, type: 'up' | 'down') => {
  if (type === 'up') {
    if (index === 0) {
      message.warning('已经是第一段了！')
      return
    }
    // 交换位置
    [props.data[index], props.data[index - 1]] = [props.data[index - 1], props.data[index]]
  } else {
    if (index === props.data.length - 1) {
      message.warning('已经是最后一段了！')
      return
    }
    // 交换位置
    [props.data[index], props.data[index + 1]] = [props.data[index + 1], props.data[index]]
  }
  message.success('移动成功！')
}
// 批量添加
const batchAdd = (index: number) => {
  const content = ref<string>('');
  Modal.confirm({
    title: '批量添加',
    icon: null,
    content: h(Textarea, {
      value: content.value,
      "onUpdate:value": ($event: string) => content.value = $event,
      rows: 10
    }),
    okText: '确定',
    cancelText: '取消',
    onOk() {
      const hide = message.loading('添加中...', 0);

      const paraList = batchAddSplitSentence(content.value);
      // 添加列表 addAll
      for (let i = 0; i < paraList.length; i++) {
        props.data.splice(index + 1 + i, 0, paraList[i]);
      }

      hide();
      message.success('添加成功！');
    },
    onCancel() {
      content.value = '';
    },
  });
};
// 跨段移动
const moveAcross = (index: number, type: 'up' | 'down') => {
  if (type === 'up') {
    if (index === 0) {
      message.warning('已经是最顶部了！')
      return
    }
    // 在上段列表添加
    props.data[index - 1].push(props.data[index][0])
    // 删除本段中的内容
    // 删除第一向
    props.data[index].splice(0, 1)
  } else {
    if (index === props.data.length - 1) {
      message.warning('已经是最底部了！')
      return
    }
    // 在下段列表添加
    props.data[index + 1].unshift(props.data[index][props.data[index].length - 1])
    // 删除本段中的内容
    // 删除最后一个
    props.data[index].splice(props.data[index].length - 1, 1)
  }
  message.success('移动成功！')
}

// 导出函数：批量添加
const exposeAdd = (index: number) => {
  if (index === void 0) {
    index = props.data.length
  }
  batchAdd(index)
}
defineExpose({
  add: exposeAdd, 
})
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
