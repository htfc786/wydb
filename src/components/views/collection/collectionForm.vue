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
    <a-form-item
      label="文集名"
      name="name"
      :rules="[{ required: true, message: '必须填写文集名！' }]"
    >
      <a-input v-model:value="formData.name" />
    </a-form-item>
    <a-form-item label="文集描述" name="description">
      <a-textarea v-model:value="formData.description" :rows="6" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { FormInstance, message } from 'ant-design-vue';
import { defineProps, ref } from 'vue';

const props = defineProps({
  formData: { type: Object as any, required: true },
  loading:  { type: Boolean, default: false },
});

const emit = defineEmits(['submit']);

const formRef = ref<FormInstance>({} as FormInstance);

const onSubmit = () => {
  // 判断是否修改了内容
  if (
    props.formData.name === backupData.value.name &&
    props.formData.description === backupData.value.description
  ) {
    message.error('没有修改任何内容！');
    return;
  }
  // 返回结果
  emit('submit');
};

const onFailed = (errorInfo: any) => {
  message.error(errorInfo.errorFields[0].errors[0]);
};

const resetForm = () => {
  formRef.value.resetFields();
  props.formData.name = backupData.value.name;
  props.formData.description = backupData.value.description;
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