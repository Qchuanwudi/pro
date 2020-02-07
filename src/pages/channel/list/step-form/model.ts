import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeSubmitForm, queryFakeList, queryType } from './service';

export interface StateType {
  queryagency?: string;
  current?: string;
  step?: {
    // userId: '',//userID
    // channelAttribute: '', //代理类型(1=个人，2=公司)
    // channelId: '', //所属代理
    // channelName: '', //企业名称
    // channelType: '', //代理类型
    // referrer: '', //推荐人
    // status: '',
    // legalIdNumber: '', //证件号码
    // contact: '', //联系人
    // phone: '', //联系电话
    // address: '', //联系地址
    // aliCommissionAccount: '', //支付号佣账号
    // wxCommissionAccount: '', //微信佣账号
    // bankCommissionAccount: '', //银行佣账号
    // thirdCommissionAccount: '', //第三方佣账号
    // commissionType: '',//返佣类型
    // commissionRatio: '',//返佣比例
    // loginId: '', //账号
    // loginPwd: '', //密码
    // accountInfo: {
    //   password: string,
    //   storeId: string,
    //   username: string,
    // },
    // appChannelCommissionList: [
    //   {
    //     agentMoney: 0,
    //     channelId: "",
    //     commissionAccount: "",
    //     commissionChannel: 0,
    //     commissionRatio: 0,
    //     commissionType: 0,
    //     createBy: "",
    //     createTime: "",
    //     isDeleted: true,
    //     updateBy: "",
    //     updateTime: "",
    //   }
    // ],
    // businessLicensePic: string; //营业执照图片
    // legalIdentityCardFront: string; //法人身份证正面
    // legalIdentityCardBack: string; //法人身份证背面
    // storeFront: string; //门头照片
    // storeInterior: string; //店铺内景
    // businessLicenseAuthPic: string; //营业执照授权函图片
    // payAccount: string;
    // receiverAccount: string;
    // receiverName: string;
    // amount: string;
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
    submitQueryChannel: Effect;
    QueryAgency: Effect;
    queryType: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    saveCurrentStep2: Reducer<StateType>;
    ChannelList: Reducer<StateType>;
    savequeryData: Reducer<StateType>;
    savequeryType: Reducer<StateType>;
  };
}
// channelAddForm
const Model: ModelType = {
  namespace: 'channelAddForm',

  state: {
    current: 'info',
    queryagency: '',
    step: {
      userId: '', //userID
      channelAttribute: '', //代理类型(1=个人，2=公司)
      channelId: '', //所属代理
      channelName: '', //企业名称
      channelType: '', //代理类型
      referrer: '', //推荐人
      status: '',
      legalIdNumber: '', //证件号码
      contact: '', //联系人
      phone: '', //联系电话
      address: '', //联系地址
      aliCommissionAccount: '', //支付号佣账号
      wxCommissionAccount: '', //微信佣账号
      bankCommissionAccount: '', //银行佣账号
      thirdCommissionAccount: '', //第三方佣账号
      commissionType: '', //返佣类型
      commissionRatio: '', //返佣比例
      loginId: '', //账号
      loginPwd: '', //密码
      accountInfo: {
        password: '',
        storeId: '',
        username: '',
      },
      appChannelCommissionList: [
        {
          agentMoney: '',
          channelId: '',
          commissionAccount: '',
          commissionChannel: '',
          commissionRatio: '',
          commissionType: '',
          createBy: '',
          createTime: '',
          isDeleted: '',
          updateBy: '',
          updateTime: '',
        },
      ],
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      //代理商返佣信息表，账号分别储存
      let appChannelCommissionList = [];
      if (payload.aliCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: payload.aliCommissionAccount,
          commissionChannel: '1',
        });
      }
      if (payload.wxCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: payload.wxCommissionAccount,
          commissionChannel: '2',
        });
      }
      if (payload.bankCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: payload.bankCommissionAccount,
          commissionChannel: '3',
        });
      }
      if (payload.thirdCommissionAccount) {
        appChannelCommissionList.push({
          commissionAccount: payload.thirdCommissionAccount,
          commissionChannel: '4',
        });
      }
      payload.appChannelCommissionList = appChannelCommissionList;

      const response = yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload: response,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
    *QueryAgency({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'savequeryData',
        payload: response,
      });
    },
    *queryType({ payload }, { call, put }) {
      const response = yield call(queryType, payload);
      yield put({
        type: 'savequeryType',
        payload: response,
      });
    },
    *submitQueryChannel({ payload }, { call, put }) {
      yield call(queryChannel, payload);
      yield put({
        type: 'ChannelList',
        payload,
      });
    },
  },

  reducers: {
    savequeryData(state, { payload }) {
      return {
        ...state,
        queryagency: payload,
      };
    },
    savequeryType(state, { payload }) {
      return {
        ...state,
        queryagency: payload,
      };
    },
    ChannelList(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },
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
