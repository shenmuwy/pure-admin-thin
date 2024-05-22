<script setup lang="ts">
import { defineProps, ref } from "vue";
import { QuestionFilled, EditPen, Star } from "@element-plus/icons-vue";
import { projectDataType } from "../../types";
const { tableData } = defineProps({
  tableData: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
const tableData1 = ref(tableData);
const pNameInput = ref("");
const pStatusText = (status: number, flag = "text") => {
  let text = null;
  let color = null;
  switch (status) {
    case 0:
      text = "未开始";
      color = "#0064ff";
      break;

    case 1:
      text = "进行中";
      color = "#f59300";
      break;

    case 2:
      text = "已完成";
      color = "#00a865";
      break;
    default:
      text = "未开始";
      break;
  }
  if (flag === "color") {
    return color;
  }
  return text;
};
const convertToHex = str => {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i).toString(16);
    hex += code.length === 1 ? "0" + code : code;
  }
  return "#" + hex.slice(0, 6);
};
const remainder = (scoped): number => {
  return Number(
    ((scoped.row.taskCountDone / scoped.row.taskCount) * 100).toFixed(0)
  );
};
const handlEdit = scoped => {
  console.log(scoped.row);
  tableData1.value.map((item: projectDataType) => {
    console.log(item.pID, scoped.row.pID);
    if (item.pID === scoped.row.pID) {
      item.pNameShow = true;
      pNameInput.value = item.pName;
    } else {
      item.pNameShow = false;
    }
  });
};
const pNameBlur = scoped => {
  tableData1.value.map((item: projectDataType) => {
    console.log(item.pID, scoped.row.pID);
    if (item.pID === scoped.row.pID) {
      item.pNameShow = false;
      pNameInput.value = item.pName;
    }
  });
};
</script>

<template>
  <div>
    <el-table
      :data="tableData1"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#F7F8FA', color: '#2D2D2E' }"
      border
    >
      <el-table-column prop="pName" label="项目名称" width="300" class="test">
        <template #default="scoped">
          <div v-if="!scoped.row.pNameShow" class="pName flex justify-between">
            <span
              >{{ scoped.row.pName
              }}<el-icon class="ml-1 edit" @click="handlEdit(scoped)"
                ><EditPen /></el-icon
            ></span>
            <span class="collect"
              ><el-icon><Star /></el-icon
            ></span>
          </div>
          <div v-else>
            <el-input
              v-model="pNameInput"
              v-focus
              style="height: 24px"
              @blur="pNameBlur(scoped)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pStatus" label="项目状态" width="100">
        <template #default="scoped">
          <div
            class="rounded-full border text-center"
            :style="{
              borderColor: pStatusText(scoped.row.pStatus, 'color'),
              color: pStatusText(scoped.row.pStatus, 'color')
            }"
          >
            <span>{{ pStatusText(scoped.row.pStatus) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pPrincipal" label="项目负责人" width="100">
        <template #default="scoped">
          <div class="flex items-center">
            <div
              class="rounded-full pPrincipal_prefix"
              :style="{ background: convertToHex(scoped.row.pPrincipal) }"
            >
              <span>{{ scoped.row.pPrincipal.slice(0, 1) }}</span>
            </div>
            <span class="ml-1">{{ scoped.row.pPrincipal }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="taskCountDone" label="项目完成度" width="180">
        <template #header>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="根据已完成工作项和全部工作项的数量，来预估项目的完成情况。"
            placement="top"
          >
            <span class="flex items-center"
              >工作项完成度<el-icon class="ml-1"><QuestionFilled /></el-icon
            ></span>
          </el-tooltip>
        </template>
        <template #default="scoped">
          <div class="flex justify-between taskCountDone">
            <div>
              <span v-if="scoped.row.taskCountDone !== 0">{{
                remainder(scoped)
              }}</span>
              <span v-else>0</span>%
            </div>
            <div class="flex items-center progress_bar">
              <div
                class="complete"
                :style="{ width: remainder(scoped) + 'px' }"
              />
              <div
                class="unfinished"
                :style="{ width: 100 - remainder(scoped) + 'px' }"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sprintCount" label="迭代数量" width="100" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.pName {
  .edit,
  .collect {
    display: none;
  }

  &:hover .edit,
  &:hover .collect {
    display: inline-flex;
  }
}

.pPrincipal_prefix {
  width: 15px;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  color: #fff;
  text-align: center;
}

.taskCountDone {
  .progress_bar {
    width: 114px;

    div {
      height: 6px;
    }

    .complete {
      background-color: #00a865;
      border-radius: 4px 0 0 4px;
    }

    .unfinished {
      background-color: #dfe1e5;
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
