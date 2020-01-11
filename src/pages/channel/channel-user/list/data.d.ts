export interface TableListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;

  merchantId?: string;//商户编号
  merchantName?: string;//企业名称
  industryCode?: string;//行业分类
  contact?: string;//联系人
  phone?: string;//联系电话
  account?: string;//登录账号
  channelName?: string;//所属代理名称
  channelId?: string;//所属代理ID
  aliStatus?: string;//支付宝签约状态(1=未开通,2=授权中,3=授权完成,4=签约中,5=已开通)
  wxStatus?: string;//微信签约状态(1=未开通,2=授权中,3=授权完成,4=签约中,5=已开通)
  bankStatus?: string;//银联签约状态(1=未开通,2=授权中,3=授权完成,4=签约中,5=已开通)
  thirdStatus?: string;//第三方签约状态(1=未开通,2=授权中,3=授权完成,4=签约中,5=已开通)
  status?: string;//商户状态(1=正常，2=禁用)

}
