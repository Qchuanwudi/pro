import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/server/api/merchant/app-merchant/save', {
    method: 'POST',
    data: params,
  });
}

export async function queryFakeList(params: any) {
  return request('/server/api/dict/app-dict-bank-info/list', {
    method: 'POST',
    data: params,
  });
}
export async function updataimg(params: any) {
  return request('/server/api/file/upload', {
    method: 'POST',
    data: params,
  });
}



export async function cityCode(params: any) {
  return request('/server/api/dict/app-dict-city-code/list', {
    method: 'POST',
    data: params,
  });
}
