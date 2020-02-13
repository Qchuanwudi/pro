import request from '@/utils/request';
import { async } from 'q';
// import { selectAppMerchant } from "./data";
export interface selectAppMerchant {
  merchantId: string;
}


export async function queryBasicProfile(params: selectAppMerchant) {
  return request(`/server/api/merchant/app-merchant/detail`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function queryimg(params:selectAppMerchant) {
  return request('/server/api/merchant/app-merchant/auth/qrcode/{merchantId}', {
    method:'GET',
    data: {
    ...params,
  }
})
}



export async function querysignacontractlist(params:selectAppMerchant) {
  return request('/server/api/merchant/app-merchant-device/list', {
    method:'POST',
    data: {
    ...params,
  }
})
}
