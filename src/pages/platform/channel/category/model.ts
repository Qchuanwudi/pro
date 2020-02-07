import { queryAppChannelTypeList } from './service';


export default {
    namespace: 'platform',

    state : {

    },

    effects : {
        *fetchQueryAppChannelTypeList({ payload }, { call, put }) {
            const response = yield call(queryAppChannelTypeList, payload);
            yield put({
                type: 'show',
                payload: response.result,
            });
        }
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