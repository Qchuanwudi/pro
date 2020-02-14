import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import {
  BasicGood, selectAppMerchant, appMerchantSignedList, AccountInfo, listparticulars, querysigna, records,
  payWayList,
  subAccountList,
} from './data.d';
import {
  queryBasicProfile, querysignacontractlist,
  fetchPayWayList,
  fetchSubAccountList,
} from './service';

export interface StateType {
  basicGoods: BasicGood[];
  appMerchantSignedList: appMerchantSignedList[];
  accountInfo: AccountInfo;
  listparticulars: listparticulars;
  // querysigna: querysigna;
  records: records[];
  payWayList: payWayList[];
  subAccountList: subAccountList[];
  
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
    fetch: Effect;
    fetchPaywayList: Effect;
    fetchSubAccountList: Effect;
  };
  
  
  reducers: {
    show: Reducer<StateType>;
    query: Reducer<StateType>;
    queryPaywayList: Reducer<StateType>;
    querySubAccountList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'profileAndbasic',

  state: {
    basicGoods: [],
    appMerchantSignedList: [],
    accountInfo: {},
    listparticulars: {},
    records:[],
 
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      // debugger
      const response = yield call(queryBasicProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      // debugger
      const response = yield call(querysignacontractlist, payload);
      yield put({
        type: 'query',
        payload: response,
      });
    },
    *fetchPaywayList({ payload }, { call, put }) {
      const response = yield call(fetchPayWayList, payload);
      yield put({
        type: 'queryPaywayList',
        payload: response,
      });
    },
    *fetchSubAccountList({ payload }, { call, put }) {
      const response = yield call(fetchSubAccountList, payload);
      yield put({
        type: 'querySubAccount',
        payload: response,
      });
    },
    


  },

  reducers: {
    show(state, { payload }) {
    
      return {
        ...state,
        ...payload.result,
       
      };
    },
    query(state, { payload }) {
    
      return {
        ...state,
        ...payload.result,
       
      };
    },
    queryPaywayList(state, { payload }) {
      return {
        ...state,
        payWayList: payload.result.records,
      };
    },
    querySubAccountList(state, { payload }) {
      return {
        ...state,
        subAccountList: payload.result.records,
      };
    },
  
  },
};

export default Model;