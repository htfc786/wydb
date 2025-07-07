<template>
  <div class="exercise-board">
    训练场主页<br />
    <sentenceItem />
  </div>
</template>

<script setup lang="ts">
import sentenceItem from './sentenceItem.vue';
// const documentData = {
//   title: '论语·先进',
//   paragraphs: [
//     {
//       id: 'para1',
//       original: {
//         tokens: [
//           { id: 'p1-0-233', char: '子', position: 0 },
//           { id: 'p1-1-189', char: '曰', position: 1 },
//           { id: 'p1-2-201', char: '：', position: 2 },
//           { id: 'p1-3-055', char: '“', position: 3 },
//           { id: 'p1-4-122', char: '以', position: 4 },
//           { id: 'p1-5-078', char: '吾', position: 5 },
//           { id: 'p1-6-045', char: '一', position: 6 },
//           { id: 'p1-7-156', char: '日', position: 7 },
//           { id: 'p1-8-211', char: '长', position: 8 },
//           { id: 'p1-9-087', char: '乎', position: 9 },
//           { id: 'p1-10-134', char: '尔', position: 10 },
//           { id: 'p1-11-177', char: '，', position: 11 },
//           { id: 'p1-12-098', char: '毋', position: 12 },
//           { id: 'p1-13-078', char: '吾', position: 13 },
//           { id: 'p1-14-122', char: '以', position: 14 },
//           { id: 'p1-15-066', char: '也', position: 15 },
//           { id: 'p1-16-199', char: '。', position: 16 },
//         ],
//       },
//       translation: {
//         tokens: [
//           { id: 'tr1', char: '孔子', ref: ['p1-0-233'] },
//           { id: 'tr2', char: '说', ref: ['p1-1-189'] },
//           { id: 'tr3', char: '：', ref: ['p1-2-201'] },
//           { id: 'tr4', char: '“', ref: ['p1-3-055'] },
//           { id: 'tr5', char: '因为', ref: ['p1-4-122'] },
//           { id: 'tr6', char: '我', ref: ['p1-5-078'] },
//           { id: 'tr7', char: '年纪', ref: [] },
//           { id: 'tr8', char: '比', ref: [] },
//           { id: 'tr9', char: '你们', ref: ['p1-10-134'] },
//           { id: 'tr10', char: '大一点', ref: ['p1-8-211'] },
//           { id: 'tr11', char: '，', ref: ['p1-11-177'] },
//           { id: 'tr12', char: '（', ref: [] },
//           { id: 'tr13', char: '你们', ref: [] },
//           { id: 'tr14', char: '）', ref: [] },
//           { id: 'tr15', char: '不要', ref: ['p1-12-098'] },
//           { id: 'tr16', char: '因为', ref: [] },
//           { id: 'tr17', char: '我', ref: ['p1-13-078'] },
//           { id: 'tr18', char: '（', ref: [] },
//           { id: 'tr19', char: '年长', ref: [] },
//           { id: 'tr20', char: '）', ref: [] },
//           { id: 'tr21', char: '就', ref: [] },
//           { id: 'tr22', char: '不', ref: ['p1-14-122'] },
//           { id: 'tr23', char: '说话', ref: [] },
//           { id: 'tr24', char: '了', ref: ['p1-15-066'] },
//           { id: 'tr25', char: '。', ref: ['p1-16-199'] },
//           { id: 'tr26', char: '”', ref: [] },
//         ],
//         connections: [
//           {
//             from: ['p1-5-078', 'p1-6-045', 'p1-7-156'],
//             to: ['tr6', 'tr7', 'tr8', 'tr9'],
//             type: 'combine',
//           },
//           {
//             from: ['p1-14-122'],
//             to: ['tr22'],
//             type: 'reverse',
//             marker: {
//               tokenId: 'p1-14-122',
//               position: 'top',
//             },
//           },
//         ],
//       },
//     },
//   ],
// }


</script>

<style scoped>
.exercise-board {
  background-color: white;
}
</style>
