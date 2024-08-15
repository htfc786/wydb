<template>
  <div class="paragraph">
    <a-list size="small" item-layout="horizontal" bordered :data-source="data" v-if="!!data.length">
      <template #renderItem="{ item }">
        <a-list-item>
          <sentence :data="item" :pinyin="pinyin" />
        </a-list-item>
      </template>
    </a-list>
    <div v-else class="empty"> ( 空 ) </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import sentence from "./sentence.vue";

defineProps({
  data: { type: Array as PropType<API.WyContent[]>, required: true },
  pinyin: { type: Boolean, default: false },
})

</script>

<style scoped>
.paragraph .empty {
  text-align: center;
}
</style>