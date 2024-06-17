import type { optionsProps } from "@/components/DictTag/type";
// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 字典名称 */
  dictName: string;
  /** 角色编号 */
  dictType: string;
  // 状态
  status: string;
  /** 备注 */
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

interface DataFormItemProps {
  dictSort: number;
  dictLabel: string;
  dictValue: string;
  dictType: string;
  cssClass?: string;
  listClass?: string;
  status?: string;
  remark?: string;
}

interface DataFormProps {
  formInline: DataFormItemProps;
  status: optionsProps[];
}
export type { FormItemProps, FormProps, DataFormItemProps, DataFormProps };
