import request from '@/utils/request';

/**
 * 系统用户模块
 */
export async function queryUserById(params) {
  return request('/server/api/upms/sys-user/detail', {
    method: 'POST',
    data: params,
  });
}

export async function queryUser(params) {
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

export async function addUser(params) {
  return request('/server/api/upms/sys-user/save', {
    method: 'POST',
    data: params,
  });
}

export async function updateUser(params) {
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
    data: {
      size: 1000,
    },
  });
}

export async function addPerissminAssignment(params) {
  return request('/server/api/upms/sys-role/permission/assignment', {
    method: 'POST',
    data: params,
  });
}

/**
 * 系统角色模块
 */
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
export async function queryMenusAndPermissions(params) {
  return request('/server/api/upms/sys-role/menusAndPermissions', {
    method: 'POST',
    data: params,
  });
}

/**
 * 系统菜单模块
 */
// 菜单
export async function mockQueryMenus() {
  return request('/api/sys/menu/menus', {
    method: 'GET',
  });
}

// 菜单
export async function queryMenus() {
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
