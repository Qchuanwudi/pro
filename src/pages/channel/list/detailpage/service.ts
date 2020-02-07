import request from '@/utils/request';

export interface channel {
  channelId: string;
}
export  function queryBasicProfile(params: channel) {
  return request(`/server/api/bn/channel/app-channel/detail/all`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export  function channelType(params: channel) {
  // debugger;
  let appChannelCommissionList = [];
      if (params.aliCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: params.aliCommissionAccount,
          commissionChannel: '1',
          channelId: params.channelId,
        });
      }
      if (params.wxCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: params.wxCommissionAccount,
          commissionChannel: '2',
          channelId: params.channelId,
        });
      }
      if (params.bankCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: params.bankCommissionAccount,
          commissionChannel: '3',
          channelId: params.channelId,
        });
      }
      if (params.thirdCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: params.thirdCommissionAccount,
          commissionChannel: '4',
          channelId: params.channelId,
        });
      }
      params.appChannelCommissionList = appChannelCommissionList;
      // debugger;
  return request(`/server/api/bn/channel/app-channel/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateChannel(params: any) {
  return request('/server/api/bn/channel/app-channel/edit', {
    method: 'POST',
    data: params,
  });
}

export async function queryType(params: any) {
  return request('/server/api/bn/channel/app-channel-type/list', {
    method: 'POST',
    data: params,
  });
}

