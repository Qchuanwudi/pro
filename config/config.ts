import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/home',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '',
              name: '首页',
              component: './home',
            },
            {
              component: './404',
            },
          ],
        },

        {
          component: './404',
        },
      ],
    },
    {
      path: '/channel',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/channel',
              name: '代理商管理',
              routes: [
                {
                  path: '/channel/list',
                  name: '代理商列表',
                  component: './channel/list',
                },
                {
                  path: '/channel/list/step-form',
                  name: '代理商添加',
                  component: './channel/list/step-form',
                },

                {
                  path: 'channel/list/detailpage',
                  name: '代理商查看详情',
                  component: './channel/list/detailpage',
                },
                {
                  path: '/channel/category',
                  name: '代理商类型',
                  component: './channel/category',
                },

                {
                  path: '/channel/channel-user/list',
                  name: '商户列表',
                  component: './channel/channel-user/list',
                },
                {
                  path: '/channel/channel-user/list/step-form',
                  name: '商户添加',
                  component: './channel/channel-user/list/step-form',
                },
                {
                  path: '/channel/channel-user/todayOverview',
                  name: '今日概览',
                  component: './channel/channel-user/todayOverview',
                },
                {
                  path: 'channel/channel-user/list/detailpage',
                  name: '商户详情',
                  component: './channel/channel-user/list/detailpage',
                },
              ],
            },

            {
              component: './404',
            },
          ],
        },

        {
          component: './404',
        },
      ],
    },

    {
      path: '/merchant',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/merchant',
              name: '商户管理',
              routes: [
                {
                  path: '/merchant/list',
                  name: '商户列表',
                  component: './merchant/list',
                },
                {
                  path: '/merchant/list/step-form',
                  name: '商户添加',
                  component: './merchant/list/step-form',
                },
                {
                  path: 'merchant/list/detailpage',
                  name: '商户详情',
                  component: './merchant/list/detailpage',
                },
                {
                  path: '/merchant/merchant-bills/list',
                  name: '商户对账列表',
                  component: './merchant/merchant-bills/list',
                },
                {
                  path: 'merchant/merchant-bills/list/components',
                  name: '对账详情',
                  component: './merchant/merchant-bills/list/components',
                },
                {
                  path: '/merchant/merchant-user/list',
                  name: '流水记录',
                  component: './merchant/merchant-user/list',
                },

              ],
            },

            {
              component: './404',
            },
          ],

        },

        {
          component: './404',
        },
      ],

    },


    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user/',
          redirect: '/',
        },
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          redirect: '/sys/user',
        },
        {
          path: '/sys',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/sys/user',
            },
            {
              path: '/sys',
              redirect: '/sys/user',
            },
            {
              path: '/sys/user',
              name: 'user',
              icon: 'smile',
              component: './sys/user',
            },
            {
              path: '/sys/role',
              name: 'role',
              icon: 'smile',
              component: './sys/role',
            },
            {
              path: '/sys/menu',
              name: 'menu',
              icon: 'smile',
              component: './sys/menu',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: {
    '/server/api/': {
      // target: 'http://console.aiotpay.top/',
      target: 'http://localhost:8082/',
      changeOrigin: true,
      pathRewrite: {
        '^/server': '',
      },
    },
  },
} as IConfig;
