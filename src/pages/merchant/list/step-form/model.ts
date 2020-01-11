import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeSubmitForm } from './service';

export interface StateType {
  current?: string;
  step?: {
    channelAttribute: string; //代理类型(1=个人，2=公司)
    referrer: string; //推荐人
    channelName: string; //代理商名称或姓名
    legalIdNumber: string; //营业执照号或身份证号
    contact: string; //联系人
    phone: string; //联系电话
    address: string; //联系地址

    channelType: string; //代理类型ID
    commissionType: string; //返佣类型(1=按比例,2=固定费率)
    commissionRatio: string; //返佣比例
    aliCommissionAccount: string; //支付号佣账号
    wxCommissionAccount: string; //微信佣账号
    bankCommissionAccount: string; //银行佣账号
    thirdCommissionAccount: string; //第三方佣账号
    loginId: string; //账号
    loginPwd: string; //密码
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
    queryList: Reducer<StateType>;
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
    list:[]
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
     const response  = yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
      yield put({
        type: 'information',
        payload:response,
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

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload

      }
    }
  },
};

export default Model;
