import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/server/api/merchant/app-merchant/save', {
    method: 'POST',
    data: params,
  });
}

// export async function updataimg(params: any) {
//   return request('/server/api/file/upload', {
//     method: 'POST',
//     data: formData,
//   });
// }
