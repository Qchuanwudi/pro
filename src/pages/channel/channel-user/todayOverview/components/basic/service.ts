import request from '@/utils/request';
import debounce from 'lodash/debounce';

export async function queryBasicProfile(params) {
  debugger;
  return request('/server/api/channel/app-channel/queryAppChannelById', {
    method: 'POST',
    data: params,
  });
}
