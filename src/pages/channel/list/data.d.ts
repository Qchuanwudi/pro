export interface TableListItem {

  userId: string;//userID
  channelAttribute: string; //代理类型(1=个人，2=公司)
  channelId: string; //所属代理
  channelName: string; //企业名称
  channelType: string; //代理类型
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
  commissionType: string;//返佣类型
  commissionRatio: string;//返佣比例
  loginId: string; //账号
  loginPwd: string; //密码

  
  // registeredAddress: string; //注册地址
  // storeAddress: string; //店铺地址
  // aliCommissionAccount: string; //支付宝签约账号
  // wxCommissionAccount: string; //微信签约账号
  // legalName: string; //法人姓名
  // legalIdType: string; //证件类型1身份证2护照3港澳台
  // legalIdNumber: string; //证件号码
  // openBank: string; //开户银行
  // openCity: string; //开户城市
  // openBankAccount: string; //开户支行
  // companyBankAccount: string; //公司银行账号
  
  // loginId: string; //账号
  // loginPwd: string; //密码

  // channelId: string;
  // channelName?: string;
  // channelTypeName?: string;
  // contact?: string;
  // phone?: string;
  // loginId?: number;
  // merchantNumber?: number;
  
  // key?: string;
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
}
