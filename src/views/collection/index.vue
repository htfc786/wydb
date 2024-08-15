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
          <a-col flex="auto"><h2 class="title">{{ collectionName }}</h2></a-col>
          <a-col>
            <a-button type="primary" @click="openNewArticle">新建文章</a-button>
            <a-button style="margin-left:10px;" @click="goEdit">编辑</a-button>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <!--页面内容-->
        <article-card-list :collectionId="collectionId" :data="articleList" />
      </div>
    </a-spin>

    <!-- 新建文章窗口 -->
    <a-modal v-model:open="isOpenNewArticle" title="新建文章" class="new-article-modal">
      <a-form :model="newArticleForm">
        <a-form-item label="名称" name="name">
          <a-input v-model:value="newArticleForm.name" placeholder="文章名称（选填）" />
        </a-form-item>
        <a-row :gutter="2">
          <a-col v-show="1" :span="10">
            <a-form-item name="dynasty" label="(朝代)作者">
              <a-input v-model:value="newArticleForm.dynasty" placeholder="朝代"></a-input>
            </a-form-item>
          </a-col>
          <a-col v-show="2" :span="30">
            <a-form-item name="writer">
              <a-input v-model:value="newArticleForm.writer" placeholder="作者"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <a-button key="back" @click="closeNewArticle">取消</a-button>
        <a-button key="submit" type="primary" :loading="newArticleLoading" @click="newArticle">新建文章</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import API from '@/api';
import articleCardList from '@/components/views/article/articleList.vue';

const route = useRoute();
const router = useRouter();

// 文集id
const collectionId = <number>+route.params.id;
// 文集名字
const collectionName = ref<String>('id:' + collectionId);
// 数据
const collectionData = ref<API.WyCollection>({});
// 文章列表
const articleList = ref<API.WyArticle[]>([]);
// 加载中
const loading = ref<boolean>(false);

// 获取数据
const getData = async () => {
  loading.value = true;
  // 获取文言文列表信息
  const res = await API.wyArticle.getByCollectionId({
    collectionId: collectionId,
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
  // 判断数据
  if (!res.data.data || !res.data.data.collection) {
    message.error('错误：文集 id:'+collectionId+' 不存在');
    router.push({ name: '404' });
    return;
  }
  // 更新文集数据
  collectionName.value = res.data.data.collection?.name || "";
  collectionData.value = res.data.data.collection;
  // 更新文章列表
  articleList.value = res.data.data?.articleList || [];
}
onMounted(getData);

// 去编辑页
const goEdit = () => {
  router.push({
    name: 'collection-edit',
    params: { id: collectionId }
  });
};

//  ==> 新建文章 <==
// 新建文章相关变量
const isOpenNewArticle = ref<boolean>(false);
const newArticleLoading = ref<boolean>(false);
// 新建文章表单
const newArticleForm = ref<API.WyArticle>({
  name: '',
  writer: '',
  dynasty: '',
});
// 打开面板
const openNewArticle = () => {
  isOpenNewArticle.value = true;
};
// 关闭面板
const closeNewArticle = () => {
  isOpenNewArticle.value = false;
  // 清空表单
  newArticleForm.value = {
    name: '',
    writer: '',
    dynasty: '',
  };
};
// 新建文章
const newArticle = () => {
  newArticleLoading.value = true;
  // 发送请求
  API.wyArticle.add({
    collectionId: collectionId,
  }, newArticleForm.value).then(res => {
    if (res.data.code !== 200) {
      message.error('错误：' + res.data.message);
      return;
    }
    // 获取新文章id
    if (!res.data.data || !res.data.data.id) {
      message.error('错误：更新新文章 id 失败');
      return;
    }
    const newArticleId = res.data.data.id;
    message.success('新建成功');
    // 跳转到编辑页
    router.push({
      name: 'article-edit',
      params: { collectionId, id: newArticleId }
    });
  }).catch(err => {
    message.error('错误：' + err.message);
  }).finally(() => {
    newArticleLoading.value = false;
    // 关闭面板
    closeNewArticle();
  });
};

</script>

<style scoped>
.content {
  margin: 24px;
}
.header .title {
  margin: 0 auto;
  margin-bottom: 4px;
}
.new-article-modal .ant-form {
  width: 75%;
  margin: 0 auto;
}
</style>