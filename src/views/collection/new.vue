<template>
  <div class="collection-new">
    <a-breadcrumb>
      <a-breadcrumb-item><RouterLink :to="{ name: 'index' }">首页</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item><RouterLink :to="{ name: 'collection' }">文集</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item>新建文集</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content">
      <h2>新建文集</h2>
      <a-divider></a-divider>
      <collectionForm :formData="formState" @submit="onSubmit"></collectionForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import API from '../../api';
import collectionForm from '../../components/views/collection/collectionForm.vue'

const router = useRouter();

const formState: Ref<API.WyCollection> = ref({
  name: '',
  description: '',
});

const isSubmitting: Ref<boolean> = ref(false);

const onSubmit = () => {
  // 防止重复提交
  if (isSubmitting.value) {
    message.warning('正在提交，请稍候...');
    return;
  }
  // 提交
  const hide = message.loading('提交中...', 0)
  // 禁用提交
  isSubmitting.value = true;
  // 提交数据
  API.wyCollection.add(formState.value)
    .then((res) => {
      hide();
      // 判断是否成功
      if (res.data.code !== 200) {
        message.error('错误：' + res.data.message);
        return;
      }
      // 修改成功的情况
      message.success('新建成功！');
      // 清除表单数据
      formState.value.name = '';
      formState.value.description = '';
      // 获取新的文集的id
      const id = res.data.data.id;
      // 跳转到列表页
      router.push({ name: 'collection-index', params: { id } });
    }).catch((err) => {
      // 错误
      hide();
      message.error('错误：' + err.message);
    }).finally(() => {
      // 解除禁用
      isSubmitting.value = false;
    });
};

</script>

<style scoped>
.content {
  margin: 24px;
}
</style>