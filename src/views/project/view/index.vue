<script setup lang="ts">
import { Plus, Search } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import ProjectMore from "@/assets/svg/project_more.svg";
import ProjectTable from "./components/table/index.vue";
import { projectDataType } from "./types";
defineOptions({
  name: "Project"
});
const state = ref("");
const layout = ref("");
const group = ref("");
const groupInput = ref("");
const projectgroups2 = ref([]);
const popvoerVisible = ref(false);
const projectState = ref([
  {
    value: "state1",
    label: "全部项目"
  },
  {
    value: "state2",
    label: "未开始"
  },
  {
    value: "state3",
    label: "进行中"
  },
  {
    value: "state4",
    label: "已完成"
  },
  {
    value: "state5",
    label: "已归档"
  }
]);
const projectLayouts = ref([
  {
    value: "layout1",
    label: "表格"
  },
  {
    value: "layout2",
    label: "卡片"
  }
]);
const projectgroups = ref([
  {
    value: "group1",
    label: "不分组"
  },
  {
    value: "group2",
    label: "状态类型"
  },
  {
    value: "group3",
    label: "项目状态"
  },
  {
    value: "group4",
    label: "项目负责人"
  },
  {
    value: "group5",
    label: "项目创建者"
  },
  {
    value: "group6",
    label: "项目名称"
  },
  {
    value: "group7",
    label: "demo"
  }
]);

const tableData: Array<projectDataType> = [
  {
    pID: 1,
    pName: "【示例】瀑布流研发管理",
    pStatus: 1,
    pPrincipal: "Alex",
    taskCountDone: 9,
    taskCount: 21,
    sprintCount: 2
  },
  {
    pID: 2,
    pName: "【示例】敏捷式研发管理",
    pStatus: 1,
    pPrincipal: "Alex",
    taskCountDone: 9,
    taskCount: 21,
    sprintCount: 2
  },
  {
    pID: 3,
    pName: "项目测试",
    pStatus: 0,
    pPrincipal: "神目",
    taskCountDone: 0,
    taskCount: 0,
    sprintCount: 1
  },
  {
    pID: 4,
    pName: "统一身份认证中心",
    pStatus: 0,
    pPrincipal: "Alex",
    taskCountDone: 0,
    taskCount: 0,
    sprintCount: 0
  }
];

const onGroupInput = () => {
  if (groupInput.value) {
    projectgroups2.value = projectgroups.value.filter(
      item => item.label.search(groupInput.value) !== -1
    );
  } else {
    projectgroups2.value = projectgroups.value;
  }
};
const groupInputClear = () => {
  projectgroups2.value = projectgroups.value;
};

const offPopver = () => {
  window.addEventListener("click", event => {
    if (!hasClass(event.target, "derive_xls") && popvoerVisible.value) {
      popvoerVisible.value = false;
    }
  });
};
const hasClass = (element, cls) => {
  return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
};

onMounted(() => {
  projectgroups2.value = projectgroups.value;
  offPopver();
});
</script>

<template>
  <div class="project bg-bg_color">
    <div class="project_search">
      <div class="project_search_new">
        <el-button type="primary" :icon="Plus">新建项目</el-button>
        <span>共 4 个</span>
      </div>
      <div class="project_search_state flex">
        <div class="flex items-center w-[200px]">
          <span>状态</span>
          <el-select v-model="state">
            <el-option
              v-for="item in projectState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex items-center w-[200px]">
          <span>布局</span>
          <el-select v-model="layout">
            <el-option
              v-for="item in projectLayouts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex items-center w-[200px]">
          <span>分组</span>
          <el-select v-model="group">
            <template #header>
              <el-input
                v-model="groupInput"
                v-optimize:debounce="{
                  event: 'input',
                  fn: onGroupInput,
                  immediate: false,
                  timeout: 1000
                }"
                style="width: 240px"
                placeholder="搜索项目属性"
                :prefix-icon="Search"
                clearable
                @clear="groupInputClear"
              />
            </template>
            <el-option
              v-for="item in projectgroups2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex items-center w-[280px]">
          <el-input
            v-model="groupInput"
            v-optimize:debounce="{
              event: 'input',
              fn: onGroupInput,
              immediate: false,
              timeout: 1000
            }"
            class="ml-4"
            placeholder="搜索项目名称、状态、负责人"
            :prefix-icon="Search"
            clearable
            @clear="groupInputClear"
          />
        </div>
        <el-popover :visible="popvoerVisible" placement="top">
          <el-button>导出项目列表</el-button>
          <template #reference>
            <el-button
              class="ml-4 derive_xls"
              @click="popvoerVisible = !popvoerVisible"
            >
              <ProjectMore class="icon" />
            </el-button>
          </template>
        </el-popover>
      </div>
    </div>
    <div>
      <ProjectTable :tableData="tableData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project_search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 15px;
  border: 1px solid #f5f5f5;

  &_new {
    span {
      margin-left: 15px;
      font-size: 14px;
      color: #a5a4a4;
    }
  }

  &_state {
    span {
      width: 50px;
      padding-right: 6px;
      margin-left: 15px;
    }
  }
}
</style>
