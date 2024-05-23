import { http } from "@/utils/http";

export interface UserResult extends ResData {
  data: {
    token: string;
  };
}

export interface RefreshTokenResult extends ResData {
  data: {
    /** `token` */
    token: string;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
}

export interface CaptchaImageResult extends ResData {
  data: {
    img: string;
    uuid: string;
  };
}

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/login", { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

/** 获取验证码 */
export const getCaptchaImage = () => {
  return http.request<CaptchaImageResult>("get", "/captchaImage");
};

/** 新增用户 */
export const createUser = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/system/user", { data });
};

/** 修改用户 */
export const modUser = (data?: object) => {
  return http.request<RefreshTokenResult>("put", "/system/user", { data });
};

/** 删除用户 */
export const deleteUser = (ids?: string) => {
  return http.request<RefreshTokenResult>("delete", "/system/user/" + ids);
};

/** 修改用户状态 */
export const changeStatus = (data?: object) => {
  return http.request<RefreshTokenResult>("put", "/system/user/changeStatus", {
    data
  });
};
