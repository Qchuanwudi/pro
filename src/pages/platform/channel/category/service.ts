import request from '@/utils/request';

export async function queryAppChannelTypeList(params: any) {
    return request('/server/api/bn/channel/app-channel-type/list', {
      method: 'POST',
      data: params,
    });
}

export async function addAppChannelType(params: any) {
  return request('/server/api/bn/channel/app-channel-type/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteAppChannelType(params: any) {
  return request('/server/api/bn/channel/app-channel-type/remove', {
    method: 'POST',
    data: params,
  });
}

export async function updateAppChannelType(params: any) {
  return request('/server/api/bn/channel/app-channel-type/edit', {
    method: 'POST',
    data: params,
  });
}