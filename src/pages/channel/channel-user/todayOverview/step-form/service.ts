import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/server/api/channel/app-channel/save', {
    method: 'POST',
    data: params,
  });
}
