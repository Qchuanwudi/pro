import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryChannel(params?: TableListParams) {
  return request('/server/api/bn/channel/app-channel/list', {
    method: 'POST',
    data: params,
  });
}

export async function queryAppChannelById(channelId: TableListParams) {
  return request('/server/api/bn/channel/app-channel/detail', {
    method: 'POST',
    data: {
      channelId: channelId,
      // ...params,
      // method: 'update',
    },
  });
}

export async function removeChannel(params) {
  return request('/server/api/bn/channel/app-channel/remove', {
    method: 'POST',
    data: params,
  });
}

export async function save(params: TableListParams) {
  return request('/server/api/bn/channel/app-channel/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateChannel(channelId: string, status: number) {
  return request('/server/api/bn/channel/app-channel/edit', {
    method: 'POST',
    data: {
      // params,
      channelId: channelId,
      status: status,
    },
  });
}
// export async function updateChannel(channelId: TableListParams) {
//   return request('/server/api/bn/channel/app-channel/edit', {
//     method: 'POST',
//     data: {
//       // params,
//       channelId: channelId,
//       status: 2,
//     },
//   });
// }

export async function updateAppChannelPassword(channelId: TableListParams) {
  return request('/server/api/channel/app-channel/updateAppChannelPassword', {
    method: 'POST',
    data: {
      channelId: channelId,
    },
  });
}
