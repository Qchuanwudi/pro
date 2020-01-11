import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { BasicProfileDataType } from './data.d';
import styles from './style.less';
import { queryBasicProfile } from './service';

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'success') {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="processing" text="进行中" />;
    },
  },

  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

interface BasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  profileAndbasic: BasicProfileDataType;
}
interface BasicState {
  visible: boolean;
}

class Basic extends Component<BasicProps, BasicState> {
  state = {
    appChannel: '',
    sysUser: '',
    appChannelType: '',
    appChannelCommissionList: '',
  };

  componentDidMount() {
    this.queryBasic();
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAndbasic/fetchBasic',
    });
  }

  queryBasic = async () => {
    const id = this.props.location.query.id;
    console.log(id);
    const Profile = await queryBasicProfile(id);
    // alert(Profile.result);
    // debugger;
    this.setState({
      appChannel: Profile.result.appChannel,
      sysUser: Profile.result.sysUser,
      appChannelType: Profile.result.appChannelType,
      // appChannelCommissionList: Profile.result.appChannelCommission,
    });
    debugger;
  };

  render() {
    const appChannel = this.state.appChannel;
    const sysUser = this.state.sysUser;
    const appChannelType = this.state.appChannelType;
    const appChannelCommissionList = this.state.appChannelCommissionList;

    // console.log(data);
    // appChannelCommissionList.fontcolor

    const { profileAndbasic, loading } = this.props;
    const { basicGoods, basicProgress } = profileAndbasic;
    let goodsData: typeof basicGoods = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value: any, row: any, index: any) => {
      const obj: {
        children: any;
        props: { colSpan?: number };
      } = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right' as 'left' | 'right' | 'center',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          {/* <Descriptions title={appChannel.channelId}>{appChannel.channelId}</Descriptions> */}
          <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="企业名称">{appChannel.channelName}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{appChannel.createTime}</Descriptions.Item>
            <Descriptions.Item label="所属代理">{appChannel.channelAttribute}</Descriptions.Item>
            <Descriptions.Item label="联系人">{appChannel.contact}</Descriptions.Item>
            <Descriptions.Item label="手机号">{appChannel.phone}</Descriptions.Item>
            <Descriptions.Item label="联系地址">{appChannel.address}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions title="账号信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="代理编号">{appChannel.channelId}</Descriptions.Item>
            <Descriptions.Item label="代理账号">{sysUser.loginId}</Descriptions.Item>
            <Descriptions.Item label="登入密码">******</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />

          <Descriptions title="返佣信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="代理类别">{appChannelType.channelName}</Descriptions.Item>
            <Descriptions.Item label="返佣类型">{appChannelType.commissionType}</Descriptions.Item>
            <Descriptions.Item label="返佣比例">{appChannelType.commissionRatio}</Descriptions.Item>
            <Descriptions.Item label="返佣渠道">{appChannelCommissionList}</Descriptions.Item>
            <Descriptions.Item label="返佣账号">菜鸟仓储</Descriptions.Item>
          </Descriptions>
          {/* <Divider style={{ marginBottom: 32 }} />
          <Descriptions title="账号信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="商户编号">付小小</Descriptions.Item>
            <Descriptions.Item label="商户账号">18100000000</Descriptions.Item>
          </Descriptions> */}
          <Divider style={{ marginBottom: 32 }} />

          <div className={styles.title}>退货商品</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>退货进度</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    profileAndbasic,
    loading,
  }: {
    profileAndbasic: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    profileAndbasic,
    loading: loading.effects['profileAndbasic/fetchBasic'],
  }),
)(Basic);
