<template>
  <a-list 
    :grid="{ gutter: 0 }" 
    :data-source="data" 
    :loading="loading" 
    :pagination="false"
    :locale="{ emptyText: '暂无数据' }"
  >
    <template #renderItem="{ item }">
      <!-- 列表 -->
      <a-list-item style="padding: 0 4px;">
        <article-card :collectionId="collectionId" :id="item.id" :title="item.name" :dynasty="item.dynasty" :writer="item.writer"/>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import articleCard from './articleCard.vue';

defineProps({
  collectionId: { type: Number, required: true },
  data: { type: Array as any, required: true },
  loading: { type: Boolean, default: false },
});

</script>

<style scoped></style>