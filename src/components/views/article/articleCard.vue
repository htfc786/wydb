<template>
  <div class="article-card">
    <a-card hoverable style="width: 250px; height: 200px;" @click="openArticle">
      <template #cover>
        <div class="cover">
          <p v-html="contentHtml" :class="{ 'poem': isPoem }"></p>
        </div>
      </template>
      <a-card-meta :title="title?title:'[暂无名称]'">
        <template #description>{{ writer?(`${dynasty?`[${dynasty}]`:""} ${writer}`):(dynasty?dynasty:"") }}</template>
      </a-card-meta>
      <div class="tag-list">
        <a-tag v-for="tag in tags" :key="tag">{{ tag }}</a-tag>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router';

const props = defineProps({
  collectionId: { type: Number, required: true },
  id: { type: Number, required: true },
  title: { type: String, default: '' },
  writer: { type: String, default: '' },
  dynasty: { type: String, default: '' },
  content: { type: String, default: '' },
  tags: { type: Array, default: () => []},
})

// 判断是否为古诗
const isPoem = computed(() => {
  // 如果是古诗，则对仗工整，以 \n 分割，前后字数相等或仅相差1字符，
  // 且每行字数在5到16之间
  // 最小： 五言绝句-5 XXXXX
  // 预计最大： 七言绝句-16 XXXXXXX，XXXXXXX。
  const lines = props.content.split("\n");
  if (lines.length < 2) { // 两句不到，不是古诗
    return false;
  }
  // 遍历数组，判断长度
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // 每行字数在5到16之间
    if (line.length < 5 || line.length > 16) {
      return false;
    }
    // 前后字数相等或仅相差1字符 
    // 仅判断到 lines.length - 1 即可，无需判断最后一项
    if (i < lines.length - 1) {
      const nextLine = lines[i + 1];
      // 相差字符大于1，不是古诗
      if (Math.abs(line.length - nextLine.length) > 1) {
        return false;
      }
    }
  }
  return true;
});

// html版内容
const contentHtml = computed(() => {
  // html字符集：https://blog.csdn.net/m0_37158404/article/details/105080544
  if (isPoem.value) {
    return props.content.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\n/g, "<br/>");
  } else {
    return "&emsp;&ensp;" + props.content.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\n/g, "<br/>&emsp;&ensp;").replace(/\s/g, "&nbsp;");
  }
});

const router = useRouter();

// 打开文章
const openArticle = () => {
  // 跳转到文章详情页
  router.push({
    name: 'article-index',
    params: { collectionId: props.collectionId, id: props.id },
  });
}
</script>

<style scoped>
.article-card .cover p {
  margin: 0;
  padding: 12px;
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.article-card .cover p.poem {
  text-align: center !important;
  align-content: center;
}
.article-card:deep() .ant-card-body {
  padding: 20px;
  padding-top: 10px;
}
.article-card:deep() .ant-card-body .ant-card-meta-title {
  margin-bottom: 2px;
  height: 25.141px;
}
.article-card:deep() .ant-card-body .ant-card-meta-description {
  margin-bottom: 2px;
  height: 22px;
}
.article-card .tag-list {
  margin-top: 10px;
  height: 23px;
  overflow: hidden; /* 防止内容超出 */
}
/* 底部逐渐变模糊 */
.article-card .cover {
  position: relative;
}
.article-card .cover::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 99%;
  height: 50px;
  margin-left: 1px;
  background: linear-gradient(transparent, rgb(255, 255, 255));
}
</style>