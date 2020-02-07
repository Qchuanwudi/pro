import request from '@/utils/request';
import { async } from 'q';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}


export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/server/api/upms/login', {
    method: 'POST',
    data: params,
  });
}

export async function redirectUrl() {
  return request('/server/api/upms/sys-permission/redirect', {
    method: 'POST',
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


export async function verificationcode(code,key) {
  debugger
  return request('/server/api/upms/captcha',{
    method: 'POST',
    data: {
      key,
      code
      
    }
  })
  
}