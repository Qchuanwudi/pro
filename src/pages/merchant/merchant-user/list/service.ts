import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function merchantsBillsDetails(params?: TableListParams) {
  return request('/server/api/merchant/merchantUser/merchantsBillsDetails', {
    method: 'POST',
    data: params,
  });
}

export async function refund(params?: TableListParams) {
  return request('/server/api/merchant/merchantUser/merchantsBillsDetails', {
    method: 'POST',
    data: params,
  });
}

