import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryChannel(params?: TableListParams) {
  return request('/server/api/merchant/app-merchant/list', {
    method: 'POST',
    data: params,
  });
}

export async function removeChannel(params: { key: number[] }) {
  return request('/server/api/upms/sys-user/remove', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addChannel(params: TableListParams) {
  return request('/server/api/upms/sys-user/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateChannel(params: TableListParams) {
  return request('/server/api/upms/sys-user/edit', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
