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
  userId: string;//userID
  channelAttribute: string; //代理类型(1=个人，2=公司)
  channelId: string; //所属代理
  channelName: string; //企业名称
  channelType: string; //代理类型
  commissionType: string;//返佣类型
  commissionRatio: string;//返佣比例
  referrer: string; //推荐人
  status: number;
  legalIdNumber: string; //证件号码
  contact: string; //联系人
  phone: string; //联系电话
  address: string; //联系地址
  aliCommissionAccount: string; //支付号佣账号
  wxCommissionAccount: string; //微信佣账号
  bankCommissionAccount: string; //银行佣账号
  thirdCommissionAccount: string; //第三方佣账号
  commissionRatio: string;//返佣比例
  loginId: string; //账号
  loginPwd: string; //密码

  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
