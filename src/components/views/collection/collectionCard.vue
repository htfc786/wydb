<template>
  <RouterLink :to="{ name: 'collection-index', params: {id: item.id} }">
    <a-card hoverable style="width: 300px">
      <p class="name">{{ item.name }}</p>
      <p class="desc">{{ item.description ? item.description : item.name }}</p>
      <p class="time">{{ formattedTime }}</p>
    </a-card>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  item: { type: Object, required: true },
});

// 计算属性来格式化时间
const formattedTime = computed(() => {
  return dayjs(props.item.createdAt).format('YYYY-MM-DD HH:mm:ss');
});

</script>

<style scoped>
.ant-card .name {
  font-size: 24px; 
  font-weight: bold; 
  margin-bottom: 8px;
}
.ant-card .desc {
  font-size: 16px; 
  margin-bottom: 8px;
}
.ant-card .time {
  font-size: 14px; 
  color: #999; 
  margin-bottom: 0;
}
</style>