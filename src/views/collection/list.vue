<template>
  <div class="collection-list">
    <a-breadcrumb>
      <a-breadcrumb-item><RouterLink :to="{ name: 'index' }">首页</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item>文集</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="header">
      <h2>文集列表</h2>
      <a-divider></a-divider>
    </div>
    <collection-list :data="data" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import API from '../../api';
import collectionList from '../../components/views/collection/collectionList.vue';

// 文集数据
const data = ref([] as API.WyCollection[]);
// loading状态
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  // 获取文集列表
  const res = await API.wyCollection.getAll();
  loading.value = false;
  // 如果请求失败，则不更新数据
  if (res.data.code !== 200) {
    message.error('错误：' + res.data.message);
    return;
  }
  data.value = res.data.data;
});

</script>

<style scoped>
.header {
  margin: 24px;
  margin-bottom: 0;
}
</style>