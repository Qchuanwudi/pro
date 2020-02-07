import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { BasicGood, AccountInfo, AppChannelCommission, AppChannel, AppChannelType } from './data.d';
import { queryBasicProfile } from './service';

export interface StateType {
  basicGoods: BasicGood[];
  accountInfo: AccountInfo;
  appChannelCommission: AppChannelCommission[];
  appChannel: AppChannel;
  appChannelType: AppChannelType;

}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'profileAndbasic',

  state: {
    basicGoods: [],
    appChannelCommission: [],
    appChannel: {},
    accountInfo: {},
    appChannelType: {},
    
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      // debugger;
      const response = yield call(queryBasicProfile, payload);
      // debugger;
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {

      // debugger;
      return {
        ...state,
        ...payload.result,
      };
    },
  },
};

export default Model;
