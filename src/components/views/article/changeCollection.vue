<template>
  <Spin :spinning="loading" tip="Loading...">
    <div class="change-collection">
      <Select
        ref="select"
        v-model:value="value"
        style="width: 100%"
        :loading="loading"
        @focus="focus"
      >
        <SelectOption v-for="item in collectionList" :key="item.id" :value="item.name">
          {{ item.name }}
        </SelectOption>
      </Select>
      <Space>
        <Button type="primary" @click="submit(value)">提交</Button>
      </Space>
    </div>
  </Spin>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message, Select, Spin, SelectOption, Space, Button } from 'ant-design-vue';
import API from "@/api"

const props = defineProps(['articleId', 'collectionId', 'collection'])
const emit = defineEmits(['submit'])

const collectionId = props.collectionId;

const value = ref(props.collection);
const loading = ref(false);
const collectionList = ref<API.WyCollectionList[]>([]);

// 获取collection列表
let isLoad = false;
const getCollectionList = () => {
  loading.value = true;
  return API.wyCollection
    .getList()
    .then((res) => {
      if (res.data.code !== 200 || !res.data.data) {
        message.error('错误：' + res.data.message)
        return;
      }
      collectionList.value = res.data.data;
    })
    .catch(e=>{
      message.error('错误：' + e.message)
    })
    .finally(() => {
      loading.value = false;
    });
};
const focus = () => {
  if (isLoad) return;
  getCollectionList().then(() => {
    isLoad = true;
  });
};

const submit = (newCollectionName: string) => {
  const newCollectionId = collectionList.value.find((item) => item.name === newCollectionName)?.id;
  if (!newCollectionId) {
    message.error('请选择正确的收藏夹')
    return;
  }
  if (collectionId === newCollectionId) {
    message.error('请选择不同的收藏夹')
    return;
  }
  emit('submit', newCollectionId)
}

</script>

<style scoped>
.change-collection {
  display: flex;
  flex-direction: column;
}
.ant-space {
  margin-top: 16px;
  justify-content: flex-end;
}
</style>