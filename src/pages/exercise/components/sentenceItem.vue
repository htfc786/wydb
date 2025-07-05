<template>
  <div class="sentenceItem">

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { exerciseSentence } from "../../../types";

const sentenceData = ref(<exerciseSentence>{
  original: {
    tokens: [
      { id: 'p1-0-233', c: '子' },
      { id: 'p1-1-189', c: '曰' },
      { id: 'p1-2-201', c: '：' },
      { id: 'p1-3-055', c: '“' },
      { id: 'p1-4-122', c: '以' },
      { id: 'p1-5-078', c: '吾' },
      { id: 'p1-6-045', c: '一' },
      { id: 'p1-7-156', c: '日' },
      { id: 'p1-8-211', c: '长' },
      { id: 'p1-9-087', c: '乎' },
      { id: 'p1-10-134', c: '尔' },
      { id: 'p1-11-177', c: '，' },
      { id: 'p1-12-098', c: '毋' },
      { id: 'p1-13-078', c: '吾' },
      { id: 'p1-14-122', c: '以' },
      { id: 'p1-15-066', c: '也' },
      { id: 'p1-16-199', c: '。' },
    ],
  },
  translation: {
    tokens: [
      { id: 'tr1', c: '孔子' },
      { id: 'tr2', c: '说' },
      { id: 'tr3', c: '：' },
      { id: 'tr4', c: '“' },
      { id: 'tr5', c: '因为' },
      { id: 'tr6', c: '我' },
      { id: 'tr7', c: '年纪' },
      { id: 'tr8', c: '比' },
      { id: 'tr9', c: '你们' },
      { id: 'tr10', c: '大一点' },
      { id: 'tr11', c: '，' },
      { id: 'tr12', c: '（' },
      { id: 'tr13', c: '你们' },
      { id: 'tr14', c: '）' },
      { id: 'tr15', c: '不要' },
      { id: 'tr16', c: '因为' },
      { id: 'tr17', c: '我' },
      { id: 'tr18', c: '（' },
      { id: 'tr19', c: '年长' },
      { id: 'tr20', c: '）' },
      { id: 'tr21', c: '就' },
      { id: 'tr22', c: '不' },
      { id: 'tr23', c: '说话' },
      { id: 'tr24', c: '了' },
      { id: 'tr25', c: '。' },
      { id: 'tr26', c: '”' },
    ],
  },
  connections: [
  ],
})
</script>

<style scoped></style>
