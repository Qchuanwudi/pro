import { Reducer } from 'redux';
import { Effect } from 'dva';

import { NoticeIconData } from '@/components/NoticeIcon';
import { queryMenus, queryNotices } from '@/services/user';
import { ConnectState } from './connect.d';

export interface Menu {
  icon: string;
  name: string;
  path: string;
  target?: string;
  mpid?: string;
  routes?: Menu[];
}

export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  menus?: Menu[];
  collapsed: boolean;
  notices: NoticeItem[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchMenus: Effect;
    //  fetchNotices: Effect;
    //  clearNotices: Effect;
    //  changeNoticeReadState: Effect;
  };
  reducers: {
    saveMenus: Reducer<GlobalModelState>;
    //  changeLayoutCollapsed: Reducer<GlobalModelState>;
    //  saveNotices: Reducer<GlobalModelState>;
    //  saveClearedNotices: Reducer<GlobalModelState>;
  };
  // subscriptions: { setup: Subscription };
}

const setMenu = (menues: Menu[]) => {
  if (menues && menues.length === 0) {
    return [];
  }
  const menuList: Menu[] = [];
  menues.forEach((item, index) => {
    menuList[index] = item;
    /** 
		if (item.children && item.children.length !== 0) {
	        // menuListType[index].target = '_self';
	        let list = (menuList[index].routes = [{ name: '', icon: '', path: '' }] as Menu[]);
	        item.children.forEach((value, i) => {
	          list[i] = { name: '', icon: '', path: '' } as Menu;
	          list[i] = { ...value, routes: value.children } as Menu;
	          list[i].target = '_self';
	        });
	     }
	     */
  });
  return menuList;
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    menus: [],
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchMenus(_, { call, put }) {
      const response = yield call(queryMenus);
      // console.log(response);
      if (response && response.result) {
        yield put({
          type: 'saveMenus',
          payload: {
            ...response,
          },
        });
      }
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(agencylist);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select((state: ConnectState) => state.global.notices.length);
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select((state: ConnectState) =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    saveMenus(state, { payload }) {
      return {
        ...state,
        menus: setMenu(payload.result),
      };
    },
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter((item): boolean => item.type !== payload),
      };
    },
  },
  /** 
  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
  */
};

export default GlobalModel;
