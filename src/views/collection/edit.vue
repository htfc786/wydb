<template>
  <div class="collection-edit">
    <a-spin :spinning="loading" tip="Loading...">
      <a-breadcrumb>
        <a-breadcrumb-item><RouterLink :to="{ name: 'index' }">首页</RouterLink></a-breadcrumb-item>
        <a-breadcrumb-item><RouterLink :to="{ name: 'collection-index' }">{{ collectionName }}</RouterLink></a-breadcrumb-item>
        <a-breadcrumb-item>编辑设置</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="content">
        <!--页面头部-->
        <h2>{{ collectionName }}</h2>
        <a-divider></a-divider>
        <!--页面内容-->
        <collectionForm ref="formRef" :formData="collectionData" @submit="onSubmit"></collectionForm>
        <!--删除页面-->
        <h3>删除选项</h3>
        <a-divider></a-divider>
        <a-button type="primary" danger @click="onDelete">删除文集</a-button>
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, createVNode } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import API from '../../api';
import collectionForm from '../../components/views/collection/collectionForm.vue'

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
// ref
const formRef = ref<any>({});

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
  // 设置备份
  nextTick(() => {
    formRef.value?.backupForm();
  });
});

let isSubmitting:boolean = false;
// 提交
const onSubmit = () => {
  // 防止重复提交
  if (isSubmitting) {
    message.warning('正在提交，请稍候...');
    return;
  }
  // 提交
  const hide = message.loading('提交中...', 0)
  // 禁用提交
  isSubmitting = true;
  // 提交数据
  API.wyCollection.change({
    id: collectionId
  }, collectionData.value)
    .then((res) => {
      hide();
      // 判断是否成功
      if (res.data.code !== 200) {
        message.error('错误：' + res.data.message);
        return;
      }
      // 修改成功的情况
      message.success('修改成功！');
      // 跳转到列表页
      router.push({ name: 'collection-index' });
    }).catch((err: Error) => {
      // 错误
      hide();
      message.error('错误：' + err.message);
    }).finally(() => {
      // 解除禁用
      isSubmitting = false;
    });
};

const onDelete = () => {
  Modal.confirm({
    title: '将要删除文集：'+collectionName.value,
    icon: createVNode(ExclamationCircleOutlined),
    content: '删除后不可恢复',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      const hide = message.loading('删除中...', 0)
      // 开始删除
      API.wyCollection.deleteCollection({
        id: collectionId,
      }).then(() => {
        message.success('删除成功！');
        // 跳转到列表页
        router.push({ name: 'collection' });
      }).catch((err) => {
        message.error('错误：' + err.message);
      }).finally(() => {
        hide();
      });
    },
    onCancel() {},
  });
};

</script>

<style scoped>
.content {
  margin: 24px;
}
</style>