import projectIcon from "@/assets/svg/project_menu.svg";
export default {
  path: "/project",
  meta: {
    title: "项目管理",
    icon: projectIcon
  },
  redirect: "/project/view/index",
  children: [
    {
      path: "/project/view/index",
      name: "Project",
      component: () => import("@/views/project/view/index.vue"),
      meta: {
        title: "项目"
      }
    }
  ]
};
