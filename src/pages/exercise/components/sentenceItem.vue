<template>
  <div class="sentenceItem">
    <!-- 原文行 -->
    <div class="line original" ref="original">
      <span class="word" v-for="word in originalWords" :key="word.text">
        {{ word.text }}
      </span>
    </div>
    <!-- 分割线 -->
    <div class="divider"></div>
    <!-- 翻译行 -->
    <div class="line translation" ref="translation">
      <span class="word" v-for="word in translationWords" :key="word.text">
        {{ word.text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from "vue";
import type { wySentence } from "../../../types";

const sentenceData = ref(<wySentence>[
  { o: "子", t: "孔子" },
  { o: "曰aaa", t: "说" },
  { o: "：“", t: "：“" },
  { o: "以", t: "因为" },
  { o: "吾一日", t: "我年纪比你们" },
  { o: "长乎尔", t: "大一点" },
  { o: "", t: "（你们）" },
  { o: "毋吾", t: "不要因为我（年长）" },
  { o: "", t: "就" },
  { o: "以", t: "不敢说话" },
  { o: "也。”", t: "了。”" },
])

const originalWords = computed(() => sentenceData.value.map(item => {
  return {
    text: item.o,
  }
}))

const translationWords = computed(() => sentenceData.value.map(item => {
  return {
    text: item.t,
  }
}))

const original = useTemplateRef<HTMLElement>("original")
const translation = useTemplateRef<HTMLElement>("translation")
// 使用margin-left对齐
const alignWords = () => {
  if (!original.value || !translation.value) return
  const originalWords = original.value.querySelectorAll(".word")
  const translationWords = translation.value.querySelectorAll(".word")
  for (let i = 0; i < originalWords.length; i++) {
    const originalWord = originalWords[i] as HTMLElement
    const translationWord = translationWords[i] as HTMLElement
    const originalWidth = originalWord.offsetWidth
    const translationWidth = translationWord.offsetWidth
    if (originalWidth > translationWidth) {
      translationWord.style.marginLeft = `${(originalWidth - translationWidth)}px`
    } else {
      originalWord.style.marginLeft = `${(translationWidth - originalWidth)}px`
    }
  }
}

onMounted(() => {
  setTimeout(alignWords, 0)
})

</script>

<style scoped>
/* 分割线 */
.divider {
  height: 1px;
  background-color: #ccc;
  margin: 2px 0;
}

/* 单行 */
.line {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.original {
  color: #333;
}

.translation {
  color: #666;
}

/* 单词 */
.word {
  display: inline;
  white-space: nowrap;
}
</style>
