<script setup lang="ts">
import { ref, PropType } from "vue";
import { formRules } from "./utils/rule";
import { DataFormProps } from "./utils/types";

const props = withDefaults(defineProps<DataFormProps>(), {
  formInline: () => ({
    dictType: "",
    dictLabel: "",
    dictValue: "",
    cssClass: "",
    dictSort: 0,
    listClass: "",
    status: "",
    remark: ""
  }),
  status: () => []
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const newStatus = ref(props.status);
// 数据标签回显样式
const listClassOptions = ref([
  { value: "default", label: "默认" },
  { value: "primary", label: "主要" },
  { value: "success", label: "成功" },
  { value: "info", label: "信息" },
  { value: "warning", label: "警告" },
  { value: "danger", label: "危险" }
]);
function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="字典类型" prop="dictType">
      <el-input
        v-model="newFormInline.dictType"
        clearable
        placeholder="请输入字典类型"
        disabled
      />
    </el-form-item>

    <el-form-item label="数据标签" prop="dictLabel">
      <el-input
        v-model="newFormInline.dictLabel"
        clearable
        placeholder="请输入数据标签"
      />
    </el-form-item>

    <el-form-item label="数据键值" prop="dictValue">
      <el-input
        v-model="newFormInline.dictValue"
        clearable
        placeholder="请输入数据键值"
      />
    </el-form-item>

    <el-form-item label="样式属性" prop="cssClass">
      <el-input
        v-model="newFormInline.cssClass"
        clearable
        placeholder="请输入样式属性"
      />
    </el-form-item>

    <el-form-item label="显示排序" prop="dictSort">
      <el-input-number
        v-model="newFormInline.dictSort"
        :min="0"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="回显样式" prop="listClass">
      <el-select v-model="newFormInline.listClass">
        <el-option
          v-for="item in listClassOptions"
          :key="item.value"
          :label="item.label + '(' + item.value + ')'"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="newFormInline.status">
        <el-radio
          v-for="dict in newStatus"
          :key="dict.value"
          :value="dict.value"
          >{{ dict.label }}</el-radio
        >
      </el-radio-group>
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注信息"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
