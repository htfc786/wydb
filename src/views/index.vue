<template>
  <div class="index">
    <h1>首页</h1>
    <a-divider></a-divider>
    <collection-list :data="data" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import API from '../api';
import collectionList from '../components/views/collectionList.vue';

// 文集数据
const data = ref([] as API.WyCollection[]);
// loading状态
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  // 获取文集列表
  const res = await API.wyCollection.getUsingGet();
  loading.value = false;
  // 如果请求失败，则不更新数据
  if (res.data.code !== 200) {
    message.error('错误：' + res.data.message);
    return;
  }
  data.value = res.data.data;
});

</script>

<style scoped></style>
  