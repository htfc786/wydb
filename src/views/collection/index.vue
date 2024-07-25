<template>
  <div class="collection-index">
    <a-spin :spinning="loading" tip="Loading...">
      <a-breadcrumb>
        <a-breadcrumb-item><RouterLink :to="{ name: 'index' }">首页</RouterLink></a-breadcrumb-item>
        <a-breadcrumb-item>{{ collectionName }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="content">
        <!--页面头部-->
        <a-row class="header" type="flex" align="middle" justify="space-between">
          <a-col flex="auto"><h2>{{ collectionName }}</h2></a-col>
          <a-col><a-button @click="goEdit">编辑</a-button></a-col>
        </a-row>
        <a-divider></a-divider>
        <!--页面内容-->
        <RouterLink :to="{ name: 'article-new' }"><a-button type="primary">添加文章</a-button></RouterLink>
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import API from '../../api';

const route = useRoute();
const router = useRouter();

// 文集id
const collectionId = <number>+route.params.id;
// 文集名字
const collectionName = ref<String>('id:' + collectionId);
// 数据
const collectionData = ref<API.WyCollection>({});
// 加载中
const loading = ref<boolean>(false);

// 获取数据
onMounted(async () => {
  loading.value = true;
  // 获取文集信息
  const res = await API.wyCollection.getById({
    id: collectionId,
  });
  loading.value = false;
  // 如果请求失败，则不更新数据
  if (res.data.code !== 200) {
    if (res.data.code === 404 || res.data.code === 400) {
      message.error(res.data.message);
      router.push({ name: '404' });
      return;
    }
    message.error('错误：' + res.data.message);
    return;
  }
  // 更新数据
  collectionName.value = res.data.data.name;
  collectionData.value = res.data.data;
});

const goEdit = () => {
  router.push({
    name: 'collection-edit',
    params: { id: collectionId }
  });
};

</script>

<style scoped>
.content {
  margin: 24px;
}
.header h2 {
  margin: 0 auto;
}
</style>