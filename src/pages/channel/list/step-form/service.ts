import request from '@/utils/request';


export interface AppChannelType {
  channelType: string;
}
export async function fakeSubmitForm(params: any) {
  return request('/server/api/bn/channel/app-channel/save', {
    method: 'POST',
    data: params,
  });
}
export async function queryChannel(params?: any) {
  return request('/server/api/bn/channel/app-channel/list', {
    method: 'POST',
    data: params,
  });
}

// export async function queryChanneList(params: any) {
//   return request('/server/api/bn/channel/app-channel/list', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function queryType(params: any) {
  return request('/server/api/bn/channel/app-channel-type/list', {
    method: 'POST',
    data: params,
  });
}

export async function queryTypeById(channelType: AppChannelType) {
  return request('/server/api/bn/channel/app-channel-type/detail', {
    method: 'POST',
    data: {channelType: channelType},
  });
}

export async function queryUserById(loginId: string) {
  return request('/server/api/upms/sys-user/list', {
    method: 'POST',
    data: {query: {loginId:loginId}},
  });
}