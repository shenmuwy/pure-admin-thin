import { useDictStore } from "@/store/modules/dict";
import { getDicts } from "@/api/system";
import { ref, toRefs } from "vue";

/**
 * 获取字典数据
 */
// 使用方法
// const { $useDict } = useGlobal<GlobalPropertiesApi>();
// const { sys_normal_disable } = $useDict('sys_normal_disable')
export function useDict(...args: any[]) {
  const res = ref({});
  return (() => {
    args.forEach(dictType => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        getDicts(dictType).then(resp => {
          res.value[dictType] = resp.data.map(p => ({
            label: p.dictLabel,
            value: p.dictValue,
            elTagType: p.listClass,
            elTagClass: p.cssClass
          }));
          useDictStore().setDict(dictType, res.value[dictType]);
        });
      }
    });
    return toRefs(res.value);
  })();
}
