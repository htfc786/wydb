<template>
  <div class="article-index">
    <a-breadcrumb>
      <a-breadcrumb-item><RouterLink :to="{ name: 'index' }">首页</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item><RouterLink :to="{ name: 'collection-index', params: { id: collectionId } }">{{ collectionName }}</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item>{{ articleName }}</a-breadcrumb-item>
    </a-breadcrumb>
    <router-link :to="{ name: 'article-edit' }">编辑</router-link>
    <div class="article-content">
      <content :data="articleContent" pinyin />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import API from '../../api';
import content from '@/components/views/content/content.vue';

const route = useRoute();
// 文集
const collectionId = <number>+route.params.collectionId;
const collectionName = ref("id:"+collectionId);
// 文章
const articleId = <number>+route.params.id;
const articleName = ref("id:"+articleId);
const articleContent = ref<API.WyContent[][]>([])
const articleData = ref<API.ResWyArticleGet>({})

// 获取文章内容信息
const getArticleInfo = () => {
  API.wyArticle.getById({ 
    collectionId, 
    id: articleId,
  }).then(res => {
    if (res.data.code !== 200) {
      message.error('错误：' + res.data.message);
      return;
    }
    // 获取新文章id
    if (!res.data.data || !res.data.data.id || !res.data.data.collection) {
      return;
    }
    // 保存信息
    collectionName.value = res.data.data.collection.name || ("id:"+collectionId);
    articleName.value = res.data.data.name || ("id:"+articleId);
    articleContent.value = res.data.data.content || [];
    articleData.value = res.data.data;
  }).catch(err => {
    message.error('错误：' + err.message);
  });
};

onMounted(() => {
  getArticleInfo();
});

</script>

<style scoped>
.article-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>