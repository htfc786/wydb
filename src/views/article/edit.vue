<template>
  <a-spin :spinning="loading">
  <div class="article-edit">
    <a-breadcrumb>
      <a-breadcrumb-item><RouterLink :to="{ name: 'index' }">首页</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item><RouterLink :to="{ name: 'collection-index', params: { id: collectionIdRef } }">{{ collectionName }}</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item><RouterLink :to="{ name: 'article-index', params: { id: articleId, collectionId: collectionIdRef }}">{{ articleName }}</RouterLink></a-breadcrumb-item>
      <a-breadcrumb-item>编辑</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 信息部分 -->
    <div class="info">
      <a-row justify="space-between" style="width: 100%; align-items: center;">
        <a-col>
          <a-row justify="space-between" style="width: 100%; align-items: center;">
            <h1>
              <a-typography-paragraph editable :content="articleData.name" 
                @update:content="(val: string)=>{articleData.name = val; debounceSaveMoreInfo()}">
                <template #editableTooltip>编辑：名称</template>
              </a-typography-paragraph>
            </h1>
            <span>
              <a-typography-paragraph editable :content="articleData.source" 
                @update:content="(val: string)=>{articleData.source = val; debounceSaveMoreInfo()}">
                <template #editableTooltip>编辑：选自书籍</template>
              </a-typography-paragraph>
            </span>
          </a-row>
        </a-col>
        <a-col>
          <span>
            <a-typography-paragraph editable :content="articleData.dynasty" 
              @update:content="(val: string)=>{articleData.dynasty = val; debounceSaveMoreInfo()}" >
              <template #editableTooltip>编辑：朝代</template>
            </a-typography-paragraph>
            <a-typography-paragraph editable :content="articleData.writer" 
              @update:content="(val: string)=>{articleData.writer = val; debounceSaveMoreInfo()}" >
              <template #editableTooltip>编辑：作者</template>
            </a-typography-paragraph>
          </span>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0; margin-bottom: 20px;"></a-divider>
    </div>
    <!-- 主页编辑部分 -->
    <div class="main">
      <div class="bar">
        <div class="info">
          <h1 class="title" :style="{ maxWidth: barTitleMaxWidth + 'px' }">{{ articleName }}</h1>
          <a-tag>{{ articleId }}</a-tag>
          <div class="save-info" :class="{ 'save': saveType === 0, 'not-save': saveType === 1, 'loading': saveType === 2}">
            <template v-if="saveType === 0"><CheckCircleOutlined /><span>已保存</span></template>
            <template v-else-if="saveType === 1"><ExclamationCircleOutlined /><span>未保存</span></template>
            <template v-else-if="saveType === 2"><LoadingOutlined /><span>保存中...</span></template>
          </div>
        </div>
        <div class="btn-list">
          <a-button class="save" type="primary" @click="save" :loading="saveType === 2">保存{{ saveType === 2 ? '中...' : ''}}</a-button>
          <a-button class="fresh" type="link" @click="fresh">刷新...</a-button>
          <a-button class="more" type="link" @click="editMoreInfo">修改更多...</a-button>
        </div>
      </div>
      <a-skeleton active :loading="loading">
        <contentEdit ref="contentEditRef" :data="articleContent" />
        <template v-if="articleContent.length === 0">
          <a-empty description="暂无内容！">
            <a-space>
              <a-button type="primary" @click="batchAdd">批量添加</a-button>
              <a-button @click="addOnce">添加一段</a-button>
            </a-space>
          </a-empty>
        </template>
      </a-skeleton>
    </div>
    <!-- 底部, 修改更多文章相关内容 -->
    <div class="option">
      <a-divider></a-divider>
      <h3>文章选项</h3>
      <a-space style="flex-direction: column; align-items: flex-start;">
        <a-button type="primary" @click="editMoreInfo">修改信息</a-button>
        <a-button @click="editCollection">移动文章</a-button>
        <a-button type="primary" danger @click="showDeleteArticle">删除文章</a-button>
      </a-space>
    </div>
  </div>
  </a-spin>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { 
  ExclamationCircleOutlined,
  QuestionCircleOutlined, 
  CheckCircleOutlined, 
  LoadingOutlined 
} from '@ant-design/icons-vue'
import API from '../../api'
import { debounce } from '@/utils/debounce'
import contentEdit from '@/components/views/content/edit/content.vue'
import articleForm from '@/components/views/article/articleForm.vue'
import changeCollection from '@/components/views/article/changeCollection.vue'

const route = useRoute()
const router = useRouter()

/* 预计功能：
多选删除
拼音列表标点处自动添加""
批量添加支持翻译
多选后更改
ctrl+z撤回
json导入导出
优化: 页面可见时在渲染ui
*/
const contentEditRef = ref<typeof contentEdit>();
// 文集
let collectionId = <number>+route.params.collectionId
const collectionName = ref('id:' + collectionId)
const collectionIdRef = ref(collectionId)
watch(collectionIdRef, (val) => { collectionId = val })
// 文章
let articleId = <number>+route.params.id
const articleName = ref('id:' + articleId)
const articleContent = ref<API.WyContent[][]>([])
const articleData = ref<API.ResWyArticleGet>({})
// 保存状态
// 0: 保存成功 1: 未保存 2: 保存中
const saveType = ref(0);
const isSave = () => saveType.value === 0;

const loading = ref(true)
// 获取文章内容信息
const getArticleInfo = () => {
  const hide = message.loading('加载中...', 0);
  loading.value = true
  return API.wyArticle
    .getById({ collectionId, id: articleId })
    .then((res) => {
      if (res.data.code !== 200) {
        message.error('错误：' + res.data.message)
        if (res.data.code === 404) {
          router.push({ name: '404' })
        }
        return
      }
      // 获取新文章id
      if (!res.data.data || !res.data.data.id || !res.data.data.collection) {
        message.error('错误：更新新文章 id 失败')
        return
      }
      // 保存信息
      collectionName.value = res.data.data.collection.name || 'id:' + collectionId
      articleName.value = res.data.data.name || 'id:' + articleId
      articleContent.value = res.data.data.content || []
      articleData.value = res.data.data
      // 默认没有内容显示添加面板
      if (!articleContent.value.length) {
        batchAdd()
      }
    })
    .catch((err) => {
      message.error('错误：' + err.message)
    })
    .finally(() => {
      hide();
      loading.value = false
    })
  saveType.value = 0; // 保存成功
}
//刷新
const fresh = () => {
  getArticleInfo()?.then(() => {
    message.success('刷新成功')
  })
}

let isRunningSave = false;
// 保存
const save = () => {
  if (isRunningSave) {
    message.warning('操作过于频繁！')
    return
  }
  // 检查内容
  if (!articleContent.value.length) {
    message.error('错误：内容不能为空')
    return
  }
  // 格式化json
  const contentString = JSON.stringify(articleContent.value)

  isRunningSave = true
  // 保存文章
  saveType.value = 2; // 保存中
  const hide = message.loading('保存中...', 0);
  return API.wyContent
    .change(
      { collectionId, articleId }, 
      { content: contentString }
    )
    .then((res) => {
      if (res.data.code !== 200) {
        message.error('保存错误：' + res.data.message)
        return
      }
      // 获取新文章id
      if (!res.data.data) {
        message.error('错误：更新错误！');
        return
      }
      articleContent.value = res.data.data || []
      // 保存成功
      saveType.value = 0; // 保存成功
      message.success('保存成功')
    })
    .catch((e)=>{
      message.error('保存错误：' + e.message)
      saveType.value = 1; // 未保存
    })
    .finally(() => {
      hide();
      isRunningSave = false;
    })
}
// 自动保存，10s
const autoSave = debounce(() => {
  if (isRunningSave) {
    return;
  }
  if (isSave()) {
    return;
  }
  save();
}, 1000 * 10)

// 注册自动保存
// 监听内容变化
let isAutoSave = true;
watch(() => articleContent.value, () => {
  // 当使用ajax请求时获取道数据时，会全量更新articleContent，同时触发 deep 和 非deep 的watch监听
  // 当在contentEdit组件内部修改内容时，由于只修改部分数据，所以只触发 带有deep 的watch监听
  // 所以当触发此监听时，通过ajax更新数据，此时不需要自动保存，关闭自动保存
  // 在下面函数发现自动保存关闭后，不执行自动保存，并且重新开启，以便于下次执行
  // watch的执行顺序：先执行非deep的watch，再执行deep的watch
  // ！！！保证 此watch 在 {deep:true}的watch 上方！！！
  // console.log("watch...");
  isAutoSave = false;
})
watch(() => articleContent.value, () => {
  if (!isAutoSave) {
    isAutoSave = true;
    return;
  }
  // console.log("deep watch...");
  saveType.value = 1; // 未保存
  autoSave()
}, { deep: true })

// 保存更多信息
const saveMoreInfo = () => {
  const hide = message.loading('更多信息保存中...', 0);
  return API.wyArticle
    .change(
      { collectionId, id: articleId },
      articleData.value
    )
    .then((res) => {
      if (res.data.code !== 200) {
        message.error('错误：' + res.data.message)
        return
      }
      // 获取新文章id
      if (!res.data.data) {
        message.error('错误：更新错误！');
        return
      }
      const data = res.data.data
      // 保存信息
      articleName.value = data.name || 'id:' + articleId
      articleData.value = {
        ...articleData.value,
        createdAt: data.createdAt,
        dynasty: data.dynasty,
        name: data.name,
        mainIdea: data.mainIdea,
        note: data.note,
        source: data.source,
        writer: data.writer,
      }
      // 保存成功
      message.success('更多信息保存成功!')
    })
    .finally(() => {
      hide()
    })
}
const debounceSaveMoreInfo = debounce(saveMoreInfo, 1000 * 10);
// 修改更多
const editMoreInfo = () => {
  const loading = ref(false);
  const modal = Modal.confirm({
    title: '文章信息',
    icon: null,
    footer: null,
    closable: true,
    width: '500px',
    content: h(articleForm, {
      formData: articleData.value,
      loading: loading.value,
      'onSubmit': () => {
        loading.value = true;
        saveMoreInfo().then(()=>{
          loading.value = false;
          //关闭
          modal.destroy();
        })
      },
    }),
  });
}

// 修改保存位置
const changeCollectionSubmit = (newCollectionId: number) => {
  const hide = message.loading('移动中...', 0);
  return API.wyArticle
    .changeCollection({ id: articleId, collectionId }, { newCollectionId })
    .then((res) => {
      if (res.data.code !== 200 || !res.data.data) {
        message.error('错误：' + res.data.message)
        return;
      }
      if (!res.data.data || !res.data.data?.collection?.id || res.data.data.collection.id !== newCollectionId) {
        message.error('移动失败')
        return;
      } 
      // 更新信息
      collectionIdRef.value = res.data.data.collection.id;
      collectionName.value = res.data.data.collection?.name || 'id:' + collectionIdRef.value;
      // 跳转
      router.replace({
        name: 'article-edit',
        params: { id: articleId, collectionId: collectionIdRef.value },
      })
      message.success('移动成功')
    })
    .catch(e=>{
      message.error('错误：' + e.message)
    })
    .finally(() => {
      hide();
    });
};
// 编辑所在位置
const editCollection = () => {
  const modal = Modal.confirm({
    title: '移动到...',
    icon: null,
    footer: null,
    closable: true,
    content: () => h(changeCollection, {
      articleId: articleId,
      collectionId: collectionId,
      collection: collectionName.value,
      'onSubmit': (newCollectionId: number) => {
        changeCollectionSubmit(newCollectionId).then(()=>{
          modal.destroy();
        })
      },
    }),
  });
}

// 删除文章
const deleteArticle = () => {
  const hide = message.loading('删除中...', 0);
  return API.wyArticle
    .deleteArticle({ collectionId, id: articleId })
    .then(res => {
      if (res.data.code !== 200) {
        message.error('错误：' + res.data.message)
        return
      }
      message.success('删除成功！')
      router.push({
        name: 'collection-index',
        params: { id: collectionId },
      })
    })
    .catch(err => {
      message.error('错误：' + err.message)
    })
    .finally(() => {
      hide()
    })
}
const showDeleteArticle = () => {
  Modal.confirm({
    title: '确定要删除这篇文章吗？',
    icon: h(ExclamationCircleOutlined),
    content: '文章删除后不可恢复',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      return deleteArticle()
    },
  });
}

// 无内容时调用的添加
const batchAdd = () => {
  contentEditRef.value?.add()
}
// 添加一段
const addOnce = () => {
  articleContent.value.push([])
}

// 退出页面前保存
onBeforeRouteLeave((to, from, next: Function) => {
  to; from; // 解决ts报错
  if (isSave()) {
    next();
    return;
  }
  Modal.confirm({
    title: '将要离开当前页面...',
    icon: h(ExclamationCircleOutlined),
    content: '当离开当前页面时，未保存的内容将丢失',
    closable: true,
    okText: '保存并离开',
    cancelText: '不保存',
    onOk() {
      return save()?.then(() => {
        next()
      })
    },
    onCancel() {
      // 多次提示
      Modal.confirm({
        title: '确定要离开？',
        icon: h(QuestionCircleOutlined),
        okText: '离开',
        cancelText: '取消',
        onOk() {
          next()
        },
      });
    },
  });
});
// 退出整个网页时的提示
watch(saveType, () => {
  if (isSave()) {
    window.onbeforeunload = null;
  } else {
    window.onbeforeunload = function() { 
      return "确认离开当前页面吗？未保存的数据将会丢失";
    }
  }
}, { immediate: true })

// bar处标题的最大宽度
const barTitleMaxWidth = ref(document.body.clientWidth - 469);
// 监听窗口大小变化
const _maxWidthChange = () => {
  // 总clientWidth - 最外层padding,24x2,48px - .btn-list,180.953px,181px - .save-info,72px - .a-tag的宽度
  const aTagWidth = (document.querySelector('.a-tag') as HTMLElement)?.clientWidth || 0;// 获取.a-tag的宽度
  const btnListWidth = (document.querySelector('.btn-list') as HTMLElement)?.clientWidth || 0;// 获取.btn-list的宽度
  const saveInfoWidth = (document.querySelector('.save-info') as HTMLElement)?.clientWidth || 0;// 获取.save-info的宽度
  barTitleMaxWidth.value = document.body.clientWidth - aTagWidth - btnListWidth - saveInfoWidth - 48 - 60;// 计算最大宽度
}

// ctrl+s 保存
const handleSave = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault()
    save();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleSave)
  window.addEventListener('resize', _maxWidthChange);
  _maxWidthChange();
  // 初始化数据
  getArticleInfo()
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleSave)
  window.removeEventListener('resize', _maxWidthChange);
  window.onbeforeunload = null;
})

</script>

<style scoped>
.article-edit .info {
  width: 100%;
}

.article-edit .info h1>.ant-typography {
  font-size: 35px;
  margin: 0;
}
.article-edit .info *>.ant-typography:deep()>.ant-typography-edit {
  font-size: 14px;
}
.article-edit .info span {
  display: flex;
  align-items: center;
}
.article-edit .info span>.ant-typography {
  font-size: 20px;
  margin: 0;
  margin-right: 10px;
}

.article-edit .bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 998;
  padding: 6px 0;
  margin: 4px 0;
  height: 44px;
}
.article-edit .bar .info {
  display: flex;
  align-items: center;
}
.article-edit .bar .info .title {
  font-size: 20px;
  margin-bottom: 0;
  margin-right: 8px;
  /* 自动省略号 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.article-edit .bar .info .save-info {
  display: flex;
  align-items: center;
}
.article-edit .bar .info .save-info.save {
  color: green;
}
.article-edit .bar .info .save-info.not-save {
  color: red;
}
.article-edit .bar .info .save-info.loading {
  color: #1677ff;
}
.article-edit .bar .info .save-info>span {
  margin-right: 4px;
}
.article-edit .bar .btn-list {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.article-edit .bar .info .save-info {
  display: flex;
  align-items: center;
  color: red;
}
.article-edit .bar .info .save-info.save {
  color: green;
}
.article-edit .bar .info .save-info>span {
  margin-right: 4px;
}
.article-edit .bar .btn-list {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.article-edit .bar .btn-list .ant-btn.save {
  margin-right: 10px;
}
.article-edit .bar .btn-list .ant-btn.fresh {
  margin-right: -4px;
}
.article-edit .bar .btn-list .ant-btn.more {
  margin-right: -20px;
}
</style>