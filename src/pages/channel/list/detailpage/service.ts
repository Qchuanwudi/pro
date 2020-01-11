import request from '@/utils/request';
// import { selectAppMerchant } from "./data";
export interface selectAppMerchant {
  channelId: string;
}

export async function queryBasicProfile(id: selectAppMerchant) {
  return request('/server/api/channel/app-channel/queryAppChannelById', {
    method: 'POST',

    data: {
      channelId: id,
    },
  });
}
