export interface BasicGood {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
  businessLicenseNo: '123';
  channelId?: string | number;
  xuhao: string;
  // companyBankAccount?:string
  // contact?:string
  // createBy?: string | number;
  // createTime?: string | number;
  // industryCode?: string;
  // isDeleted?: Boolean
  // legalIdNumber?: string;
  // legalIdType?: string;
  // legalName?: string;
  // merchantCode?: string | number;
  // merchantId?: string | number;
  // merchantName?: string | number;
  // openBank?: string | number;
  // openBankAccount?: string | number;
  // openCity?: string | number;
  // phone?: string | number;
  // registeredAddress?: string | number;
  // status?: string | number;
  // storeAbbreviation?: string | number;
  // storeAddress?: string | number;
}

export interface appMerchantSignedList {
  createBy: string;
  createTime: string;
  isDeleted: boolean;
  merchantId: string;
  signedRatio: number;
  signedType: int;
  status: int;
}

export interface AccountInfo {
  username?: string;
}
export interface listparticulars {
  merchantCode?: string;
  merchantId?: string;
  merchantName?: string;
  openBank?: string;
  openBankAccount?: string;
  openCity?: string;
  phone?: string;
  registeredAddress?: string;
  status?: string;
  storeAbbreviation?: string;
  storeAddress?: string;
  businessLicenseNo?: string;
  channelId?: string;
  companyBankAccount?: string;
  contact?: string;
  createBy?: string;
  createTime?: string;
  industryCode?: string;
  isDeleted?: boolean;
  legalIdNumber?: string;
  legalIdType?: string;
  legalName?: string;
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
  appMerchantSignedList: appMerchantSignedList[];
  accountInfo: AccountInfo;
  listparticulars: listparticulars;
  querysigna: querysigna;
  records:records[]
}

export interface selectAppMerchant {
  merchantId: string;
}
export interface querysigna {
  createBy:string	
  createTime:string
  deviceModel:string	
  deviceSerialNumber:string	
  merchantId:string	
  token	:string	
  updateBy:string	
  updateTime:string
  total:string
}


export interface records {
  merchantId: string,
  deviceSerialNumber: string,
  deviceModel: string,
  token: string,
  createBy: string,
  createTime: string,
}
