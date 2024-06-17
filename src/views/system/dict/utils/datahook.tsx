import dayjs from "dayjs";
import editForm from "../dataForm.vue";
// import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
import { addDialog } from "@/components/ReDialog";
import type { DataFormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection, isEmpty, useGlobal } from "@pureadmin/utils";
import {
  getDictDataList,
  optionselect as getDictOptionselect,
  getType,
  putDicts
} from "@/api/system";
import {
  type Ref,
  reactive,
  ref,
  onMounted,
  h,
  toRaw,
  watch,
  toValue
} from "vue";
import { useRoute } from "vue-router";

export function useRole(treeRef: Ref) {
  const { $useDict } = useGlobal<GlobalPropertiesApi>();
  const { sys_normal_disable } = $useDict("sys_normal_disable");
  const route = useRoute();
  const getParameter = isEmpty(route.params) ? route.query : route.params;
  const form = reactive({
    pageNum: 1,
    pageSize: 10,
    dictType: "",
    dictName: undefined,
    dictLabel: undefined,
    status: undefined
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const treeIds = ref([]);
  const treeData = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const treeSearchValue = ref();
  // const switchLoadMap = ref({});
  const isExpandAll = ref(false);
  const isSelectAll = ref(false);
  const typeOptions = ref([]);
  const treeProps = {
    value: "id",
    label: "title",
    children: "children"
  };
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "字典编号",
      prop: "dictCode"
    },
    {
      label: "字典标签",
      prop: "dictLabel"
    },
    {
      label: "字典键值",
      prop: "dictValue"
    },
    {
      label: "字典排序",
      prop: "dictSort"
    },
    {
      label: "状态",
      cellRenderer: scope => (
        <dict-tag
          options={toValue(sys_normal_disable)}
          value={scope.row.status}
        />
      ),
      minWidth: 90
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 160
    },
    {
      label: "创建时间",
      prop: "createTime",
      minWidth: 160,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  // function onChange({ row, index }) {
  //   ElMessageBox.confirm(
  //     `确认要<strong>${row.status === 0 ? "停用" : "启用"
  //     }</strong><strong style='color:var(--el-color-primary)'>${row.dictName
  //     }</strong>吗?`,
  //     "系统提示",
  //     {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning",
  //       dangerouslyUseHTMLString: true,
  //       draggable: true
  //     }
  //   )
  //     .then(() => {
  //       switchLoadMap.value[index] = Object.assign(
  //         {},
  //         switchLoadMap.value[index],
  //         {
  //           loading: true
  //         }
  //       );
  //       setTimeout(() => {
  //         switchLoadMap.value[index] = Object.assign(
  //           {},
  //           switchLoadMap.value[index],
  //           {
  //             loading: false
  //           }
  //         );
  //         message(`已${row.status === 0 ? "停用" : "启用"}${row.dictName}`, {
  //           type: "success"
  //         });
  //       }, 300);
  //     })
  //     .catch(() => {
  //       row.status === "0" ? (row.status = "1") : (row.status = "0");
  //     });
  // }

  function handleDelete(row) {
    message(`您删除了字典名称为${row.dictName}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { total, rows } = await getDictDataList(toRaw(form));
    dataList.value = rows;
    pagination.total = total;
    pagination.pageSize = 10;
    pagination.currentPage = 1;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function getTypeList() {
    getDictOptionselect().then(response => {
      typeOptions.value = response.data;
    });
  }

  async function getTypes(dictId: string) {
    await getType(dictId).then(response => {
      const { dictType } = response.data;
      form.dictType = dictType;
    });
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    form.dictLabel = undefined;
    onSearch();
  };

  function openDialog(title = "新增", row?: DataFormItemProps) {
    addDialog({
      title: `${title}字典`,
      props: {
        formInline: {
          dictType: row?.dictType ?? form.dictType,
          dictLabel: row?.dictLabel ?? "",
          dictValue: row?.dictValue ?? "",
          cssClass: row?.cssClass ?? "",
          dictSort: row?.dictSort ?? 0,
          listClass: row?.listClass ?? "",
          status: row?.status ?? "0",
          remark: row?.remark ?? ""
        },
        status: toValue(sys_normal_disable)
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as DataFormItemProps;
        function chores() {
          message(`您${title}了字典名称为${curData.dictLabel}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const { code } = await putDicts(curData);
              if (code === 200) {
                chores();
              }
            }
          }
        });
      }
    });
  }

  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query);
  };

  const filterMethod = (query: string, node) => {
    return node.title!.includes(query);
  };

  onMounted(async () => {
    await getTypes(getParameter.dictId.toString());
    await onSearch();
    getTypeList();
  });

  watch(isExpandAll, val => {
    val
      ? treeRef.value.setExpandedKeys(treeIds.value)
      : treeRef.value.setExpandedKeys([]);
  });

  watch(isSelectAll, val => {
    val
      ? treeRef.value.setCheckedKeys(treeIds.value)
      : treeRef.value.setCheckedKeys([]);
  });

  return {
    form,
    isShow,
    curRow,
    loading,
    columns,
    dataList,
    treeData,
    treeProps,
    isLinkage,
    pagination,
    isExpandAll,
    isSelectAll,
    typeOptions,
    treeSearchValue,
    sys_normal_disable,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    filterMethod,
    onQueryChanged,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
