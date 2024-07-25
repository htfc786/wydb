<template>
  <a-list 
    :grid="{ gutter: 0 }" 
    :data-source="inData" 
    :loading="loading" 
    :pagination="false"
    :locale="{ emptyText: '暂无数据' }"
  >
    <template #renderItem="{ item }">
      <!-- 新建 -->
      <template v-if="item.isNew">
        <a-list-item style="padding: 0 4px" class="new">
          <RouterLink :to="{ name: 'collection-new' }">
            <a-card hoverable style="width: 300px; height: 150px;">
              <a-row type="flex" align="middle">
                <a-col class="icon"><PlusCircleOutlined /></a-col>
                <a-col class="text">新建文集</a-col>
              </a-row>
            </a-card>
          </RouterLink>
        </a-list-item>
      </template>
      <!-- 列表 -->
      <template v-else>
        <a-list-item style="padding: 0 4px;">
          <collection-card :item="item"/>
        </a-list-item>
      </template>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { watchEffect, reactive, PropType } from 'vue';
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import collectionCard from './collectionCard.vue';

interface isNewItem {
  isNew: boolean;
}
interface props {
  data: API.WyCollection[];
}

const props = <props>defineProps({
  data: { type: Array as PropType<API.WyCollection[]>, required: true },
  loading: { type: Boolean, default: false },
});

const inData = reactive<Array<null|API.WyCollection|isNewItem>>([]);

watchEffect(() => {
  inData.length = 0;
  for (let i = 0; i < props.data.length; i++) {
    inData.push(props.data[i]);
  }
  inData.push({ isNew: true });
});

</script>

<style scoped>
.new .ant-card:deep() .ant-card-body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.new .ant-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #1890ff;
}
.new .icon:deep() svg {
  font-size: 40px;
  width: 60px;
  height: 60px;
  margin-right: 8px;
}
.new .text {
  font-size: 25px;
  margin-bottom: 8px;
}
</style>