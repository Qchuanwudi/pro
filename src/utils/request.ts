/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { router } from 'umi';
import { Md5 } from 'ts-md5';
// import { Fingerprint2 } from 'fingerprintjs2';

import { getNonce } from '@/utils/utils';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
// const authorizotion: string = localStorage.getItem("authorizotion") || '';

const request = extend({
  errorHandler, // 默认错误处理
  responseType: 'json',
  parseResponse: true,
});

const params = {
  APP_ID: 'admin_backend',
  APP_SECRET: 'cdc58e10167b11eaa38fe111b14750bc',
};
const params1 = {
  APP_ID: 'beinuo_backend',
  APP_SECRET: '7dd60af4323911eaa6d7d6e90e8984fc',
};
/**
const deviceCode = () => {
	const start = new Date().getTime();
	let excludes = {userAgent:true};
	excludes.userAgent = true;
  	let options = {excludes: excludes}

	Fingerprint2.get(options, function (components) {
	    // 参数
	    const values = components.map(function (component) {
	        return component.value
	    });
	    // 指纹
	    const murmur = Fingerprint2.x64hash128(values.join(''), 31);
	    console.log('指纹 : ' + murmur);
	    console.log('消耗 : ' + (new Date().getTime() - start) + ' 毫秒');
	});
}
*/
// deviceCode();
// 请求拦截
request.interceptors.request.use((url, options) => {
  const Nonce = getNonce();
  const Timestamp = new Date().getTime().toString();
  let nappId;
  let token;
  let Sign;
  if (window.location.host === 'admin.aiotpay.top') {
    nappId = params.APP_ID;
    token = Md5.hashStr([params.APP_ID, params.APP_SECRET, Timestamp, Nonce].join('')).toString();
    Sign = Md5.hashStr(
      [
        `app_id=${params.APP_ID}`,
        `app_token=${token}`,
        `nonce=${Nonce}`,
        `timestamp=${Timestamp}`,
        `app_secret=${params.APP_SECRET}`,
      ].join('&'),
    )
      .toString()
      .toUpperCase();
  } else if (window.location.host === 'console.aiotpay.top') {
    nappId = params1.APP_ID;
    token = Md5.hashStr([params1.APP_ID, params1.APP_SECRET, Timestamp, Nonce].join('')).toString();
    Sign = Md5.hashStr(
      [
        `app_id=${params1.APP_ID}`,
        `app_token=${token}`,
        `nonce=${Nonce}`,
        `timestamp=${Timestamp}`,
        `app_secret=${params1.APP_SECRET}`,
      ].join('&'),
    )
      .toString()
      .toUpperCase();
  } else {
    nappId = params1.APP_ID;
    token = Md5.hashStr([params1.APP_ID, params1.APP_SECRET, Timestamp, Nonce].join('')).toString();
    Sign = Md5.hashStr(
      [
        `app_id=${params1.APP_ID}`,
        `app_token=${token}`,
        `nonce=${Nonce}`,
        `timestamp=${Timestamp}`,
        `app_secret=${params1.APP_SECRET}`,
      ].join('&'),
    )
      .toString()
      .toUpperCase();

    // nappId = params.APP_ID;
    // token = Md5.hashStr([params.APP_ID, params.APP_SECRET, Timestamp, Nonce].join('')).toString();
    // Sign = Md5.hashStr(
    //   [
    //     `app_id=${params.APP_ID}`,
    //     `app_token=${token}`,
    //     `nonce=${Nonce}`,
    //     `timestamp=${Timestamp}`,
    //     `app_secret=${params.APP_SECRET}`,
    //   ].join('&'),
    // )
    //   .toString()
    //   .toUpperCase();

  }
  options.headers = {
    Authorization: localStorage.getItem('authorizotion') || '',
  };
  const para = options.data;
  options.data = {
    common: {
      appToken: token,
      appId: nappId,
      nonce: Nonce,
      timestamp: Timestamp,
      sign: Sign,
    },
    json: para,
  };
  //	console.log(options);
  return {
    url: `${url}?_t=${Timestamp}`,
    options: { ...options, interceptors: true },
  };
});

// 相应拦截
request.interceptors.response.use(async response => {
  const data = await response.clone().json();
  // 处理全局状态码
  // token过期
  if (data && data.code === 1000) {
    if (window.location.href.indexOf('/user/login') >= 0) {
      message.error('登录失败！', 5);
    } else {
      router.push('/user/login');
    }
  }
  // console.log(response)
  return response;
});

export default request;
