import request from '@/utils/request';
import { TableListParams } from './data.d';
import debounce from 'lodash/debounce';

export async function queryCategory(params?: TableListParams) {
  return request('/server/api/bn/channel/app-channel-type/list', {
    method: 'POST',
    data: params,
  });
}

export async function removeCategory(params) { 
  return request('/server/api/bn/channel/app-channel-type/remove', {
    method: 'POST',
    data: params,
    
  });
}


export async function addAppCategory(params: TableListParams) {
  return request('/server/api/bn/channel/app-channel-type/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCategory(params) {
  debugger;
  return request('/server/api/bn/channel/app-channel-type/edit', {
    method: 'POST',
    data: params,
  });
}

export async function queryCategoryById(params) {
  return request('/server/api/bn/channel/app-channel-type/detail', {
    method: 'POST',
    data: params,
  });
}
