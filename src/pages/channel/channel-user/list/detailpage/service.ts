import request from '@/utils/request';
// import { selectAppMerchant } from "./data";
export interface selectAppMerchant {
  merchantId: string;
}

export async function queryBasicProfile(params: selectAppMerchant) {
  return request('/server/api/merchant/app-merchant/selectAppMerchant', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
