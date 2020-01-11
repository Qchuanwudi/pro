import { Badge, Card, Descriptions, Divider, Table, Row, Col, Input, Button } from 'antd';
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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class Basic extends Component<BasicProps, BasicState> {
  state = {
    data: '',
  };

  componentDidMount() {
    // this.queryBasic();
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAndbasic/fetchBasic',
      payload: {
        merchantId: this.props.location.query.id,
      },
    });
  }

  // queryBasic = async () => {
  //   const id = this.props.location.query.id;
  //   console.log(id);
  //   const Profile = await queryBasicProfile(id);
  //   this.setState({
  //     data: Profile.result.appMerchant,
  //   });
  // };

  render() {
    console.log(data);

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
          <Descriptions title={data.merchantName}>{data.merchantName}</Descriptions>
          <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="企业名称">1000000000</Descriptions.Item>
            <Descriptions.Item label="企业简称">1000000000</Descriptions.Item>
            <Descriptions.Item label="所属代理">1000000000</Descriptions.Item>
            <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
            <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
            <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
            <Descriptions.Item label="状态">已取货</Descriptions.Item>
            <Descriptions.Item label="销售单号">1234123421</Descriptions.Item>
            <Descriptions.Item label="子订单">3214321432</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions title="法人及对公账户信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="法人姓名">付小小</Descriptions.Item>
            <Descriptions.Item label="证件类型">18100000000</Descriptions.Item>
            <Descriptions.Item label="证件号码">菜鸟仓储</Descriptions.Item>
            <Descriptions.Item label="开户银行">浙江省杭州市西湖区万塘路18号</Descriptions.Item>
            <Descriptions.Item label="开户支行">无</Descriptions.Item>
            <Descriptions.Item label="公司银行账户">无</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />

          <Descriptions title="联系人信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="联系人姓名">付小小</Descriptions.Item>
            <Descriptions.Item label="联系人电话">18100000000</Descriptions.Item>
            <Descriptions.Item label="联系人地址">菜鸟仓储</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions title="账号信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="商户编号">付小小</Descriptions.Item>
            <Descriptions.Item label="商户账号">18100000000</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />

          <div className={styles.title}>退货商品</div>

          <Row>
            <Col className="支付宝" span={10}>
              <div style={{ background: '#ECECEC', padding: '18px' }}>
                <Card title="支付宝" bordered={false} style={{ width: 500, height: 500 }}>
                  <Row>
                    <Col span={4}>
                      <p>支付费率：</p>
                      <p>刷脸支付：</p>
                      <p>扫码支付：</p>
                    </Col>
                    <Col span={5}>
                      <Input defaultValue="0571" />
                    </Col>
                    <Col span={5}>
                      <a>%</a>
                    </Col>
                  </Row>
                  <div style={{ marginTop: 200, marginLeft: 150 }}>
                    <Button size="large" type="primary">
                      申请授权
                    </Button>
                  </div>
                </Card>
              </div>
              ,
            </Col>
            <Col className="gutter-row" span={14}>
              <div style={{ background: '#ECECEC', padding: '18px' }}>
                <Card title="微信" bordered={false} style={{ width: 500, height: 500 }}>
                  <Row>
                    <Col span={4}>
                      <p>支付费率：</p>
                      <p>刷脸支付：</p>
                      <p>扫码支付：</p>
                    </Col>
                    <Col span={5}>
                      <Input defaultValue="0571" />
                    </Col>
                    <Col span={5}>
                      <a>%</a>
                    </Col>
                  </Row>
                </Card>
              </div>
              ,
            </Col>
          </Row>
          <div className={styles.title}>退货进度</div>

          <Table columns={columns} dataSource={data} />
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
