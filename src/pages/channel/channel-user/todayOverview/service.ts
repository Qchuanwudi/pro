import request from '@/utils/request';
import { ListItemDataType } from './data.d';

export async function queryFake() {
  return request('/server/api/analysis/channel/overview', {
    method: 'POST',
  });
}
