import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeSubmitForm } from './service';

export interface StateType {
  current?: string;
  step?: {
    
    merchantName: string; //企业名称
    storeAbbreviation: string; //企业简称
    channelId: string; //所属代理
    industryCode: string; //行业分类
    businessLicenseNo: string; //营业执照号码
    registeredAddress: string; //注册地址
    storeAddress: string; //店铺地址
    aliCommissionAccount: string; //支付宝签约账号
    wxCommissionAccount: string; //微信签约账号
    legalName: string; //法人姓名
    legalIdType: string; //证件类型1身份证2护照3港澳台
    legalIdNumber: string; //证件号码
    openBank: string; //开户银行
    openCity: string; //开户城市
    openBankAccount: string; //开户支行
    companyBankAccount: string; //公司银行账号
    contact: string; //联系人
    phone: string; //联系电话
    address: string; //联系地址
    loginId: string; //账号
    loginPwd: string; //密码

    businessLicensePic: string; //营业执照图片
    legalIdentityCardFront: string; //法人身份证正面
    legalIdentityCardBack: string; //法人身份证背面
    storeFront: string; //门头照片
    storeInterior: string; //店铺内景
    businessLicenseAuthPic: string; //营业执照授权函图片

    payAccount: string;
    receiverAccount: string;
    receiverName: string;
    amount: string;
  };
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    saveCurrentStep2: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formAndstepForm',

  state: {
    current: 'info',
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },
    saveCurrentStep2(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
  },
};

export default Model;
