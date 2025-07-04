<template>
  <a-layout id="basicLayout">
    <a-layout-header class="header" ref="header">
      <globalHeader />
    </a-layout-header>
    <a-layout-content class="content" ref="content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer" ref="footer">
      <span><a href="https://github.com/htfc786/wydb" target="_blank">wydb</a> by htfc786</span>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import globalHeader from '../gloabal/globalHeader.vue';

// 使中间容器铺满
const changeContentMinHeight = () => {
  const header = document.querySelector("#basicLayout .header") as HTMLElement;
  const footer = document.querySelector("#basicLayout .footer") as HTMLElement;
  const content = document.querySelector("#basicLayout .content") as HTMLElement;
  const contentMinHeight = window.innerHeight - header.offsetHeight - footer.offsetHeight;
  // 自定义属性
  const { marginTop: mt, marginBottom: mb } = window.getComputedStyle(content);
  const allMargin = parseInt(mt, 10) + parseInt(mb, 10);
  content.style.setProperty('--content-min-height', (contentMinHeight - allMargin) + "px");
};

onMounted(() => {
  changeContentMinHeight();
  window.addEventListener("resize", changeContentMinHeight);
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", changeContentMinHeight);
})

</script>

<style scoped>
#basicLayout>.header {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
}

#basicLayout>.content {
  padding: 24px;
  --content-min-height: 0px;
  min-height: var(--content-min-height);
}

#basicLayout>.footer {
  padding: 12px;
  text-align: center;
  background: #efefef;
  font-size: 14px;
}

#basicLayout>.footer span {
  display: block;
  margin: 0;
}
</style>
