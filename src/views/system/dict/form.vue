<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    dictName: "",
    dictType: "",
    status: "",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

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
    <el-form-item label="字典名称" prop="roleName">
      <el-input
        v-model="newFormInline.dictName"
        clearable
        placeholder="请输入字典名称"
      />
    </el-form-item>

    <el-form-item label="字典类型" prop="dictType">
      <el-input
        v-model="newFormInline.dictType"
        clearable
        placeholder="请输入字典类型"
      />
    </el-form-item>

    <el-form-item label="状态" prop="dictType">
      <el-switch
        v-model="newFormInline.status"
        inline-prompt
        :active-value="'0'"
        :inactive-value="'1'"
        active-text="启用"
        inactive-text="停用"
      />
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
