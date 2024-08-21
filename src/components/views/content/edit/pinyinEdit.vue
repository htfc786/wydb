<template>
  <div class="pinyin-edit">
    <Alert
      message="当前拼音无法显示！"
      description="拼音的个数必须与内容文字个数相同哦。"
      type="warning"
      show-icon
      margin-bottom="8px"
      v-if="data?.pinyin?.length !== data?.content?.length"
    />
    <template v-for="i in iMax" :key="i">
      <div class="pinyin-item">
        <p>{{ (data.content||'').charAt(i - 1) }}</p>

        <template v-if="isPunctuation((data.content||'').charAt(i - 1))">
          <span>{{ (data.pinyin||[])[i - 1] }}</span>
        </template>
        <template v-else>
          <Input v-model:value="(data.pinyin||[])[i - 1]" size="small" placeholder="拼音" />
          <RadioGroup size="small" 
            :value="getTone((data.pinyin||[])[i - 1])"
            @update:value="v => (data.pinyin||[])[i - 1] = changeTone((data.pinyin||[])[i - 1], v)"
          >
            <RadioButton :value="0">轻</RadioButton>
            <RadioButton :value="1">一</RadioButton>
            <RadioButton :value="2">二</RadioButton>
            <RadioButton :value="3">三</RadioButton>
            <RadioButton :value="4">四</RadioButton>
          </RadioGroup>
        </template>

        <Button type="link" :icon="h(UpOutlined)" @click="move(i - 1, 'up')" :disabled="i === 1" />
        <Button type="link" :icon="h(DownOutlined)"  @click="move(i - 1, 'down')" :disabled="i === iMax" />
        <Button type="link" :icon="h(PlusOutlined)"  @click="add(i - 1)" />
        <Button type="link" danger :icon="h(DeleteOutlined)"  @click="remove(i - 1)" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { h, computed, type PropType } from 'vue'
import { message, Alert, Input, RadioGroup, RadioButton, Button } from 'ant-design-vue'
import { UpOutlined, DownOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { isPunctuation } from '@/utils/sentence'
import { getTone, changeTone } from '@/utils/pinyin'

const props = defineProps({
  data: { type: Object as PropType<API.WyContent>, default: () => {} },
});
// 最大index
const iMax = computed(() => Math.max((props.data.pinyin||[]).length, (props.data.content||'').length))
// 拼音初始化
if (!props.data.pinyin) {
  props.data.pinyin = []
  while (props.data.pinyin.length < iMax.value) {
    props.data.pinyin.push('')
  }
}

// 上移下移
const move = (index: number, type: 'up' | 'down') => {
  if (!props.data || !props.data.pinyin || props.data.pinyin.length === 0) { message.warning("拼音为空！"); return; }
  if (type === 'up') {
    if (index === 0) { message.warning("已经是最顶部了！"); return; }
    [props.data.pinyin[index], props.data.pinyin[index - 1]] = [props.data.pinyin[index - 1], props.data.pinyin[index]]
  } else {
    if (index === iMax.value - 1) { message.warning("已经是最底部了！"); return; }
    [props.data.pinyin[index], props.data.pinyin[index + 1]] = [props.data.pinyin[index + 1], props.data.pinyin[index]]
  }
}
// 添加
const add = (index: number) => {
  if (!props.data || !props.data.pinyin || props.data.pinyin.length === 0) { message.warning("拼音为空！"); return; }
  props.data.pinyin.splice(index, 0, '')
}
// 删除
const remove = (index: number) => {
  if (!props.data || !props.data.pinyin || props.data.pinyin.length === 0) { message.warning("拼音为空！"); return; }
  props.data.pinyin.splice(index, 1)
}
</script>

<style scoped>
.pinyin-edit {
  width: 100%;
}
.pinyin-edit .pinyin-item {
  display: flex;
  align-items: center;
}
.pinyin-edit .pinyin-item > p {
  font-size: 20px;
  font-weight: bold;
  color: #000;
  width: 30px;
  margin-bottom: 0;
}
.pinyin-edit .pinyin-item .ant-input {
  width: 100px;
}
.pinyin-edit .pinyin-item .ant-radio-group {
  width: 150px;
}
.pinyin-edit .pinyin-item > span {
  width: 250px;
}
</style>