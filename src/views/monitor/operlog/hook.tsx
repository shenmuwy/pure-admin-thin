import dayjs from "dayjs";
import { message } from "@/utils/message";
import { getKeyList } from "@pureadmin/utils";
import {
  getOperationLogsList,
  deleteOperationClean,
  deleteOperation
} from "@/api/system";
import { usePublicHooks } from "@/views/system/hooks";
import type { PaginationProps } from "@pureadmin/table";
import { type Ref, reactive, ref, onMounted, toRaw } from "vue";

export function useRole(tableRef: Ref) {
  const form = reactive({
    module: "",
    status: "",
    operatingTime: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const selectedNum = ref(0);
  const { tagStyle } = usePublicHooks();

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "序号",
      prop: "operId",
      minWidth: 90
    },
    {
      label: "操作人员",
      prop: "operName",
      minWidth: 100
    },
    {
      label: "所属模块",
      prop: "title",
      minWidth: 140
    },
    {
      label: "操作概要",
      prop: "summary",
      minWidth: 140
    },
    {
      label: "操作 IP",
      prop: "operIp",
      minWidth: 100
    },
    {
      label: "操作地点",
      prop: "operLocation",
      minWidth: 140
    },
    // {
    //   label: "操作系统",
    //   prop: "system",
    //   minWidth: 100
    // },
    {
      label: "浏览器类型",
      prop: "browser",
      minWidth: 100
    },
    {
      label: "操作状态",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status === 0 ? "成功" : "失败"}
        </el-tag>
      )
    },
    {
      label: "操作时间",
      prop: "operatingTime",
      minWidth: 180,
      formatter: ({ operatingTime }) =>
        dayjs(operatingTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ];

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  async function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    const operIds = getKeyList(curSelected, "operId");
    const { code } = await deleteOperation(operIds);
    if (code === 200) {
      message(`已删除序号为 ${operIds} 的数据`, {
        type: "success"
      });
      tableRef.value.getTableRef().clearSelection();
      onSearch();
    } else {
      message("删除日志数据失败", {
        type: "error"
      });
    }
  }

  /** 清空日志 */
  async function clearAll() {
    // 根据实际业务，调用接口删除所有日志数据
    const { code } = await deleteOperationClean();
    if (code === 200) {
      message("已删除所有日志数据", {
        type: "success"
      });
      onSearch();
    } else {
      message("删除日志数据失败", {
        type: "error"
      });
    }
  }

  async function onSearch() {
    loading.value = true;
    const { total, rows } = await getOperationLogsList(toRaw(form));
    dataList.value = rows;
    pagination.total = total;
    pagination.pageSize = 10;
    pagination.currentPage = 1;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    selectedNum,
    onSearch,
    clearAll,
    resetForm,
    onbatchDel,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
