<template>
  <div class="article-new">
    ArticleNew
    {{collectionId}}
    <router-link :to="{ name: 'collection-index' }">返回</router-link>
    <articleForm :form-data="{}"></articleForm>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import API from '../../api';
import articleForm from '../../components/views/article/articleForm.vue';

const route = useRoute();
const router = useRouter();

// 文集id
const collectionId = <number>+route.params.id;

</script>

<style scoped></style>