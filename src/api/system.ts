import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  rows?: Array<any>;
  total?: number;
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (params?: object) => {
  return http.request<ResultTable>("get", "/system/user/list", { params });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get", "/list-all-role");
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", "/list-role-ids", { data });
};

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("get", "/system/role/list", { data });
};

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<Result>("get", "/system/menu/list", { data });
};

/** 获取系统管理-部门管理列表 */
export const getUserDeptTree = (data?: object) => {
  return http.request<Result>("get", "/system/user/deptTree", { data });
};

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>("get", "/system/dept/list", { data });
};

/** 获取系统监控-在线用户列表 */
export const getOnlineLogsList = (data?: object) => {
  return http.request<ResultTable>("get", "/monitor/online/list", { data });
};

/** 获取系统监控-在线用户列表 */
export const getMonitorOnline = (token?: string) => {
  return http.request<ResultTable>("delete", `/monitor/online/${token}`);
};

/** 获取系统监控-登录日志列表 */
export const getLoginLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/login-logs", { data });
};

/** 获取系统监控-操作日志列表 */
export const getOperationLogsList = (data?: object) => {
  return http.request<ResultTable>("get", "/monitor/operlog/list", { data });
};

/** 获取系统监控-清空日志列表 */
export const deleteOperationClean = (data?: object) => {
  return http.request<ResultTable>("delete", "/monitor/operlog/clean", {
    data
  });
};

/** 获取系统监控-批量清空日志列表 */
export const deleteOperation = (ids?: string) => {
  return http.request<ResultTable>("delete", `/monitor/operlog/${ids}`);
};

/** 获取系统监控-系统日志列表 */
export const getSystemLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/system-logs", { data });
};

/** 获取系统监控-系统日志-根据 id 查日志详情 */
export const getSystemLogsDetail = (data?: object) => {
  return http.request<Result>("post", "/system-logs-detail", { data });
};

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<Result>("post", "/role-menu", { data });
};

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>("post", "/role-menu-ids", { data });
};
