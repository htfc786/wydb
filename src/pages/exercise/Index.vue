<template>
  <div class="exercise-index">
    <exercise-board />
  </div>
</template>

<script setup lang="ts">
import exerciseBoard from './components/exerciseBoard.vue';

defineOptions({ // 解决 vue/multi-word-component-names
  name: 'ExerciseIndexPage',
})
</script>

<style scoped></style>
