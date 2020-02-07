export interface BasicGood {
  id?: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface AccountInfo {
  password?: string;
  storeId?: string;
  username?: string;
}

export interface AppChannelCommission {
  channelId?: string;
  commissionAccount?: int;
  commissionChannel?: int;
  commissionRatio?: number;
  commissionType?: int;
  agentMoney?: string;
}
export interface AppChannelType{

  agentMoney?: string;
		channelType?: string;
		commissionRatio?: string;
		commissionType?: int;
		createBy?: string;
		createTime?: string;
		isDeleted?: string;
		name?: string;
}

export interface AppChannel {
  channelId?: string;
  address?: string;
  channelAttribute?: string;
  channelCode?: string;
  channelName?: string;
  channelType?: string;
  contact?: string;
  createBy?: string;
  createTime?: Date;
  email?: string;
  accountInfo?: AccountInfo;
  basicGood?: BasicGood;
  appChannelCommissionList?: AppChannelCommission;
  legalIdNumber?: string;
  merchantCount?: string;
  phone?: string;
  referrer?: string;
  status?: string;
  sysUserId?: string;
}

export interface BasicProgress {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface BasicProfileDataType {
  basicGoods: BasicGood[];
  basicProgress: BasicProgress[];
  accountInfo: AccountInfo;
  appChannelCommission: AppChannelCommission[];
  appChannel: AppChannel;
  appChannelType: AppChannelType;
}
