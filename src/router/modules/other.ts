export default {
  path: "/system",
  meta: {
    icon: "ri:bookmark-2-line",
    title: "字典数据",
    rank: 0
  },
  children: [
    {
      path: "/system/dict-data/index/:dictId(\\d+)",
      component: () => import("@/views/system/dict/data.vue"),
      name: "TabParamsDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/tabs/index"
      }
    }
  ]
};
