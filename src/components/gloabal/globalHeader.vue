<template>
  <a-row class="header" type="flex" align="middle" :wrap="false">
    <a-col flex="100px" style="margin: 0 auto">
      <RouterLink to="/">
        <a-row align="middle">
          <img src="/favicon.ico" alt="logo" />
          <span class="title">百文斩</span>
        </a-row>
      </RouterLink>
    </a-col>
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="selectedKeys" @click="doClickMenu">
        <a-menu-item v-for="item in showMenu" :key="item.path">
          {{ item.meta?.title }}
        </a-menu-item>
        <a-menu-item>
          <a href="https://github.com/htfc786/wydb" target="_blank">
            <github-outlined /> 代码开源
          </a>
        </a-menu-item>
      </a-menu>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GithubOutlined } from '@ant-design/icons-vue';
import routes from '@/configs/routes';

const route = useRoute();
const router = useRouter();

const showMenu = routes.filter((item) => {
  if (!item.meta?.showInMenu) {
    return false;
  }
  return true;
});

// 显示蓝条url
const selectedKeys = computed(() => {
  return ["/" + route.path.split("/")[1]];
});

/**
 * 点击菜单跳转
 * @param key
 */
const doClickMenu = ({ key } = { key: "/" }) => {
  if (key) {
    router.push({
      path: key,
    });
  }
};
</script>

<style scoped>
.header .title {
  margin-left: 8px;
  font-size: 20px;
  color: #000;
}

.header .ant-menu {
  line-height: 64px;
  border-bottom: none !important;
}
</style>
