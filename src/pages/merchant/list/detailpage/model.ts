import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { BasicGood, selectAppMerchant,appMerchantSignedList,AccountInfo,listparticulars ,querysigna,records} from './data.d';
import { queryBasicProfile,querysignacontractlist } from './service';

export interface StateType {
  basicGoods: BasicGood[];
  appMerchantSignedList: appMerchantSignedList[];
  accountInfo: AccountInfo;
  listparticulars: listparticulars;
  // querysigna: querysigna;
  records: records[];
  
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
  };
  
  
  reducers: {
    show: Reducer<StateType>;
    query:Reducer<StateType>
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
  
  },
};

export default Model;