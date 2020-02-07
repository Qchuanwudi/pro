import request from '@/utils/request';

export async function queryAppMerchantList(params: any) {
    return request('/server/api/merchant/app-merchant/list', {
      method: 'POST',
      data: params,
    });
}

export async function addAppMerchant(params: any) {
  return request('/server/api/merchant/app-merchant/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteAppMerchant(params: any) {
  return request('/server/api/merchant/app-merchant/remove', {
    method: 'POST',
    data: params,
  });
}

export async function updateAppMerchant(params: any) {
  return request('/server/api/merchant/app-merchant/edit', {
    method: 'POST',
    data: params,
  });
}