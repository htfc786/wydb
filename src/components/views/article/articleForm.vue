<template>
  <a-form 
    :model="formData"
    name="collection-form"
    ref="formRef"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onSubmit"
    @finishFailed="onFailed"
  >
    <a-form-item label="文章名称" name="name" :rules="[{ max: 255, message: '文章名称长度不能超过255个字符' }]">
      <a-input v-model:value="formData.name" />
    </a-form-item>
    <a-form-item label="作者" name="writer" :rules="[{ max: 255, message: '作者名长度不能超过255个字符' }]">
      <a-input v-model:value="formData.writer" />
    </a-form-item>
    <a-form-item label="写作朝代(年份)" name="dynasty" :rules="[{ max: 255, message: '朝代不能超过255个字符' }]">
      <a-input v-model:value="formData.dynasty" />
    </a-form-item>
    <a-form-item label="选自书籍" name="source" :rules="[{ max: 255, message: '书籍名长度不能超过255个字符' }]">
      <a-input v-model:value="formData.source" />
    </a-form-item>
    <a-form-item label="文章主旨" name="mainIdea">
      <a-textarea v-model:value="formData.mainIdea" :rows="4" />
    </a-form-item>
    <a-form-item label="备注信息" name="note">
      <a-textarea v-model:value="formData.note" :rows="4" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { FormInstance, message } from 'ant-design-vue';

const props = defineProps({
  formData: { type: Object as any, required: true },
  loading:  { type: Boolean, default: false },
});

const emit = defineEmits(['submit']);

const formRef = ref<FormInstance>({} as FormInstance);

const onSubmit = () => {
  emit('submit');
};

const onFailed = (errorInfo: any) => {
  message.error(errorInfo.errorFields[0].errors[0]);
};

const resetForm = () => {
  formRef.value.resetFields();
  // 恢复数据
  Object.keys(backupData.value).forEach((key) => {
    props.formData[key] = backupData.value[key];
  });
};

// 备份数据
const backupData = ref({} as any);
const backupForm = () => {
  backupData.value = { ...props.formData };
};
//导出函数
defineExpose({
  backupForm,
});
</script>

<style scoped></style>