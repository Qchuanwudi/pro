import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/server/api/upms/sys-user/currentUser', {
    method: 'POST',
  });
}

// 菜单
export async function queryMenus(): Promise<any> {
  return request('/server/api/upms/sys-permission/menus', {
    method: 'POST',
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
