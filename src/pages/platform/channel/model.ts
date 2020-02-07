import { queryAppChannelList, addAppChannel } from './service';
import { queryAppChannelTypeList } from './category/service';

export default {
  namespace: 'platformChannel',
  state: {},
  effects: {
    *fetchQueryAppChannelList({ payload }, { call, put }) {
      const response = yield call(queryAppChannelList, payload);

      if (response.code === 0) {
        const data = response.result.records.map(channel => ({
          text: `${channel.contact}[${channel.phone}]`,
          value: channel.channelId,
        }));
        return data;
      }
      return null;
    },
    *fetchQueryAppChanneTypelList({ payload }, { call, put }) {
      const response = yield call(queryAppChannelTypeList, payload);
      if (response.code === 0) {
        const data = response.result.records.map(channel => ({
          text: `${channel.name}`,
          value: channel.channelType,
          commissionType: channel.commissionType,
          commissionRatio: channel.commissionRatio,
        }));
        return data;
      }
      return null;
    },
    *fetchAddAppChannel({ payload }, { call, put }) {
      // 重新封装信息
      // 重置 referrer 属性
      let referrerObj = payload.referrer;
      if (referrerObj && referrerObj.key) {
        delete payload.referrer;
        payload.referrer = referrerObj.key;
      }

      // 重置 channelType 属性
      let channelTypeObj = payload.channelType;
      if (channelTypeObj && channelTypeObj.key) {
        delete payload.channelType;
        payload.channelType = channelTypeObj.key;
      }

      //组装分佣信息
      let appChannelCommissionList = [];
      if (payload.commissionAccount_alipay) {
        appChannelCommissionList.push({
          commissionAccount: payload.commissionAccount_alipay,
          commissionChannel: '1',
        });
      }
      payload.appChannelCommissionList = appChannelCommissionList;

      //组装账号信息
      let accountInfo = {};
      if (payload.username && payload.password) {
        accountInfo.username = payload.username;
        accountInfo.password = payload.password;
        payload.accountInfo = accountInfo;
      }

      const response = yield call(addAppChannel, payload);
      return response;
    },
  },
};
