import { queryAppMerchantList, addAppMerchant } from './service';
import { queryAppChannelList } from '../channel/service';

export default {
    namespace: 'platformMerchant',
    state: {

    },
    effects: {
      *fetchQueryAppMerchantList({ payload }, { call, put }) {
        const response = yield call(queryAppMerchantList, payload);
        return response;
      },
      *fetchQueryAppChanneList({ payload }, { call, put }) {
        const response = yield call(queryAppChannelList, payload);
        if(response.code === 0){
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
      *fetchAddAppMerchant({ payload }, { call, put }) {
        // 重新封装信息
        debugger;

        // 重置 referrer 属性
        let referrerObj = payload.referrer;
        delete payload.referrer;
        payload.referrer = referrerObj.key;

        // 重置 channelType 属性
        let channelTypeObj = payload.channelType;
        delete payload.channelType;
        payload.channelType = channelTypeObj.key;

        //组装分佣信息
        let appChannelCommissionList = [];
        if(payload.commissionAccount_alipay){
          appChannelCommissionList.push({commissionAccount: payload.commissionAccount_alipay, commissionChannel: '1'});
        }
        payload.appChannelCommissionList = appChannelCommissionList;

        //组装账号信息
        let accountInfo = {};
        if(payload.username && payload.password){
          accountInfo.username = payload.username;
          accountInfo.password = payload.password;
          payload.accountInfo = accountInfo;
        }

        const response = yield call(addAppMerchant, payload);
        return response;
      },
    }
}