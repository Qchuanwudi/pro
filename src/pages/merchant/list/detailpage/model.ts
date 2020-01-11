import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { BasicGood, selectAppMerchant } from './data.d';
import { queryBasicProfile } from './service';

export interface StateType {
  basicGoods: BasicGood[];
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
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryBasicProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
