import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryCategory(params?: TableListParams) {
  return request('/server/api/bn/channel/app-channel-type/list', {
    method: 'POST',
    data: params,
  });
}

export async function removeCategory(params: { key: number[] }) {
  return request('/server/api/bn/channel/app-channel-type/remove', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addAppCategory(params: TableListParams) {
  return request('/server/api/bn/channel/app-channel-type/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCategory(params: TableListParams) {
  return request('/server/api/bn/channel/app-channel-type/edit', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
