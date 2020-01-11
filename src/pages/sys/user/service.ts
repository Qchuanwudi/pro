import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryUserById(params) {
  return request('/server/api/upms/sys-user/detail', {
    method: 'POST',
    data: params,
  });
}

export async function queryUser(params?: TableListParams) {
  return request('/server/api/upms/sys-user/list', {
    method: 'POST',
    data: params,
  });
}

export async function removeUser(params) {
  return request('/server/api/upms/sys-user/remove', {
    method: 'POST',
    data: params,
  });
}

export async function addUser(params: TableListParams) {
  return request('/server/api/upms/sys-user/save', {
    method: 'POST',
    data: params,
  });
}

export async function updateUser(params: TableListParams) {
  return request('/server/api/upms/sys-user/edit', {
    method: 'POST',
    data: params,
  });
}

export async function updateUserBatch(params) {
  return request('/server/api/upms/sys-user/edit/batch', {
    method: 'POST',
    data: params,
  });
}

export async function queryUserRoles() {
  return request('/server/api/upms/sys-role/list', {
    method: 'POST',
    data: { size: 1000 },
  });
}
