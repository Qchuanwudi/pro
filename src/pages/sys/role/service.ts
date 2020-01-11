import request from '@/utils/request';

export async function queryRoleById(params) {
  return request('/server/api/upms/sys-role/detail', {
    method: 'POST',
    data: params,
  });
}

export async function queryRole(params) {
  return request('/server/api/upms/sys-role/list', {
    method: 'POST',
    data: params,
  });
}

export async function removeRole(params) {
  return request('/server/api/upms/sys-role/remove', {
    method: 'POST',
    data: params,
  });
}

export async function addRole(params) {
  return request('/server/api/upms/sys-role/save', {
    method: 'POST',
    data: params,
  });
}

export async function updateRole(params) {
  return request('/server/api/upms/sys-role/edit', {
    method: 'POST',
    data: params,
  });
}

export async function updateRoleBatch(params) {
  return request('/server/api/upms/sys-role/edit/batch', {
    method: 'POST',
    data: params,
  });
}
