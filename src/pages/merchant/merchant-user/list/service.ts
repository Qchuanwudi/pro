import request from '@/utils/request';
import { TableListParams } from './data.d';

export interface Merchant {
  merchantId: string;
  orderNo: string;
}

export async function merchantsBillsDetails(params?: TableListParams) {
  return request('/server/api/order/app-order/list', {
    method: 'POST',
    data: params,
  });
}

export async function merchantRefundOrder(params?: Merchant) {
  return request('/server/api/order/app-order/refund', {
  // return request('http://10.119.28.76:8080/pay/api/order/refundOrder', {
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
