import request from '@/utils/request';

export async function queryAppChannelList(params: any) {
    return request('/server/api/bn/channel/app-channel/list', {
      method: 'POST',
      data: params,
    });
}

export async function addAppChannel(params: any) {
  return request('/server/api/bn/channel/app-channel/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteAppChannel(params: any) {
  return request('/server/api/bn/channel/app-channel/remove', {
    method: 'POST',
    data: params,
  });
}

export async function updateAppChannel(params: any) {
  return request('/server/api/bn/channel/app-channel/edit', {
    method: 'POST',
    data: params,
  });
}