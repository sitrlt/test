<template>
  <el-dropdown>
    <span class="dropdown-trigger">{{ getSelectedText() }}</span>
    <template #dropdown>
      <el-dropdown-menu class="transparent-bg">
        <el-dropdown-item v-for="(option, index) in selectOptions" :key="index" @click="handleSelect(option.value)">
          {{ option.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue';

// 定义选择项
const selectOptions = [
  { label: '不限', value: '' },
  { label: '一区', value: '1' },
  { label: '二区', value: '2' },
  { label: '三区', value: '3' },
  { label: '四区', value: '4' }
];

// 选中的值
const section = ref('');

// 按钮透明度状态
const buttonTransparency = ref(false);


// 获取选中项的文本
const getSelectedText = () => {
  const selectedOption = selectOptions.find(option => option.value === section.value);
  return selectedOption? selectedOption.label : '';
};

// 处理选择事件
const handleSelect = (value) => {
  section.value = value;
  console.log('选中的值:', value);
};
</script>

<style scoped>
/* 样式部分 */
.dropdown-trigger {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.transparent-bg {
  /* 可以在这里设置下拉菜单的样式 */
}
</style>