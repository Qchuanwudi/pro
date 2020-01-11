import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function merchantsBillsDetails(params?: TableListParams) {
  return request('/server/api/merchant/app-merchantBills/merchantsBillsDetails', {
    method: 'POST',
    data: params,
  });
}

