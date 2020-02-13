import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeSubmitForm, queryFakeList, updataimg } from './service';
import { file } from '@babel/types';

export interface StateType {
  queryagency?: string;

  current?: string;
  saveimg?: string;
  step?: {
    signedRatio: number;
    signedType: integer;
    status: integer;
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

    example_pic: string; // lizi
    appMerchantSettle:[
      {
        paywayType: string;
        settlementCardType: string;
        settlementCardNo: string;
        settlementName: string;
        settlementCardAddress: string;
        settlementCardBank: string;
        openBankAccount: string;
      }
  ]
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
    QueryAgency: Effect;
    Updataimg: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveStepForm: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    saveCurrent: Reducer<StateType>;
    queryList: Reducer<StateType>;
    savequeryData: Reducer<StateType>;
    saveimg: Reducer<StateType>;
    changeExamplePic: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formAndstepForm',

  state: {
    current: 'info',
    queryagency: '',
    updated: '',

    step: {
      // payAccount: '',
      // receiverAccount: '',
      // receiverName: '',
      // amount: '',
      // example_pic: '',
      appMerchantSettle: [
        
         
          
        
         
       
      ],
    },
   

    // example_pic: '',
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      const response = yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveStepForm',
        payload,
      });

      yield put({
        type: 'saveCurrent',
        payload: 'confirm2',
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
      yield put({
        type: 'information',
        payload: response,
      });
    },
    *QueryAgency({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);

      yield put({
        type: 'savequeryData',
        payload: response,
      });
    },
    *Updataimg({ payload }, { call, put }) {
      const response = yield call(updataimg, payload);

      yield put({
        type: 'saveimg',
        updated: response,
      });
    },
  },

  reducers: {
    savequeryData(state, { payload }) {
      return {
        ...state,
        queryagency: payload.result.recods,
      };
    },
    saveimg(state, { payload }) {
      return {
        ...state,
        queryagency: payload,
      };
    },
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      console.log('model payload');
      console.log(payload);
      console.log('model payload');

      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },
    saveStepForm(state, { payload }) {
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
        ...payload,
      };
    },
    changeExamplePic(state, { payload }) {
      console.log('reducer');
      console.log(payload);

      return {
        ...state,
        example_pic: payload,
      };
    },
  },
};

export default Model;
