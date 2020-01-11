import request from '@/utils/request';

// 菜单
export async function mockQueryMenus() {
  return request('/api/sys/menu/menus', {
    method: 'GET',
  });
}

// 菜单
export async function queryMenus(): Promise<any> {
  return request('/server/api/upms/sys-permission/menus', {
    method: 'POST',
  });
}

export async function queryMenuById(params) {
  return request('/server/api/upms/sys-permission/detail', {
    method: 'POST',
    data: params,
  });
}

export async function removeMenus(params) {
  return request('/server/api/upms/sys-permission/remove', {
    method: 'POST',
    data: params,
  });
}

export async function addMenu(params) {
  return request('/server/api/upms/sys-permission/save', {
    method: 'POST',
    data: params,
  });
}

export async function updateMenu(params) {
  return request('/server/api/upms/sys-permission/edit', {
    method: 'POST',
    data: params,
  });
}

export async function updateMenuBatch(params) {
  return request('/server/api/upms/sys-permission/edit/batch', {
    method: 'POST',
    data: params,
  });
}
