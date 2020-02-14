import {
  Badge,
  Card,
  Descriptions,
  Divider,
  Table,
  Row,
  Col,
  Input,
  Form,
  Icon,
  Button,
  Modal,
  Timeline,
} from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
const FormItem = Form.Item;
import { BasicProfileDataType, records } from './data.d';
import styles from './style.less';
import TableForm from '../components/TableForm';
import svg from '../../list/components/uploader/u1498.svg';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { queryBasicProfile, queryimg, querysignacontractlist } from './service';
import { async } from 'q';
import { router } from 'umi';

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
  records: records;
  payWayList: [];
}

enum payType {
  // 1=支付宝,2=微信,3=银行卡,4=汇付
  '',
  '支付宝',
  '微信',
  '银行卡',
  '汇付',
}

class Basic extends Component<BasicProps, BasicState> {
  state = {
    display: 'block',
    none: 'none',
    Payrates: 'none',
    inputbox: 'none',
    record: [],
    visible: false,
  };

  componentDidMount() {
    // this.queryBasic();
    const { dispatch } = this.props;
    // console.log(this.props.location.query.channelId)

    dispatch({
      type: 'profileAndbasic/fetchBasic',
      payload: {
        merchantId: this.props.location.query.channelId,
      },
    });

    dispatch({
      type: 'profileAndbasic/fetch',
      payload: {
        size: 5,
        total: 50,
      },
    });

    dispatch({
      type: 'profileAndbasic/fetchPaywayList',
      payload: {
        size: 5,
        total: 50,
      },
    });

    dispatch({
      type: 'profileAndbasic/fetchSubAccountList',
      payload: {
        size: 5,
        total: 50,
      },
    });
  }

  showModal = async () => {
    this.setState({
      display: 'none',
    });
    if (this.state.display) {
      this.setState({
        none: 'block',
      });
    }
  };
  showModal1 = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  chang_image = () => {
    if (profileAndbasic.businessLicenseAuthPic) {
    }
  };

  render() {
    console.log(this.props);
    const columns: ProColumns<records>[] = [
      {
        title: '序号 ',
        dataIndex: '1',
        key: '2',
        width: 80,
        ellipsis: true,
      },
      {
        title: '设备型号',
        dataIndex: 'deviceModel',
        key: '1',
        width: 150,
        ellipsis: true,
      },

      {
        title: '设备编号',
        dataIndex: 'deviceSerialNumber',
        key: '3',
        ellipsis: true,
      },
      {
        title: '绑定时间',
        dataIndex: 'createTime',
        key: '4',
        ellipsis: true,
      },
    ];

    const columns1 = [
      {
        title: '通道名称',
        width: 100,
        dataIndex: 'paywayType',
        key: 'paywayType',
        fixed: 'left',
        render: (text: any, record: any, index: any) => {
          return `${payType[text]}`;
        },
      },
      {
        title: '通道类型',
        width: 100,
        dataIndex: 'paywaySubBank',
        key: 'paywaySubBank',
        fixed: 'left',
        render: (text: any, record: any, index: any) => {
          return `${payType[text]}`;
        },
      },
      { title: '签约费率', dataIndex: 'address', key: '1' },
      { title: '开通时间', dataIndex: 'address', key: '2' },
      { title: '签约时间', dataIndex: 'address', key: '3' },
      { title: '签约账号', dataIndex: 'address', key: '4' },
      { title: '签约密钥信息', dataIndex: 'address', key: '5' },
      { title: '签约状态', dataIndex: 'address', key: '6' },
      { title: '操作人', dataIndex: 'address', key: '7' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (record, showModal1) => (
          <a
            onClick={async () => {
              // window.location.href =
              //   '/merchant/list/detailpage?channelId=' + record.merchantId;
              this.showModal1();
            }}
          >
            查看
          </a>
        ),
      },
    ];

    const data1 = [
      {
        key: '1',
        name: '微信',
        age: '直联通道',
        address: '',
      },
      {
        key: '2',
        name: '支付宝',
        age: '直联通道',
        address: '',
      },
    ];
    const data2 = [
      {
        key: '1',
        name: '微信',
        age: '间联通道',
        address: '',
      },
    ];

    const { getFieldDecorator } = this.props.form;
    const { profileAndbasic, data } = this.props;
    
    const { basicGoods, accountInfo, records, payWayList =[], subAccountList=[] } = profileAndbasic;

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


     //支付通道
   const payWayType = {
    direct: payWayList.filter(v => v.paywayType != 4),
    inDirect: payWayList.filter(v => v.paywayType == 4),
  };

    const { direct, inDirect } = payWayType;

    // subAccountList 子账户列表
    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.card}>
          <Descriptions></Descriptions>
          <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="企业名称">{profileAndbasic.merchantName}</Descriptions.Item>
            <Descriptions.Item label="企业简称">
              {profileAndbasic.storeAbbreviation}
            </Descriptions.Item>
            <Descriptions.Item label="所属代理">{profileAndbasic.merchantId}</Descriptions.Item>
            <Descriptions.Item label="注册地址">
              {profileAndbasic.registeredAddress}
            </Descriptions.Item>
            <Descriptions.Item label="行业分类">{profileAndbasic.industryCode}</Descriptions.Item>
            <Descriptions.Item label="营业执照号">
              {profileAndbasic.businessLicenseNo}
            </Descriptions.Item>
            <Descriptions.Item label="店铺地址">
              {profileAndbasic.businessLicenseNo}
            </Descriptions.Item>
            <Descriptions.Item label="支付宝签约账号">1234123421</Descriptions.Item>
            <Descriptions.Item label="微信签约账号">3214321432</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions title="法人及对公账户信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="法人姓名">{profileAndbasic.legalName}</Descriptions.Item>
            <Descriptions.Item label="证件类型">
              {profileAndbasic.legalIdType === '1'
                ? '身份证'
                : profileAndbasic.legalIdType === '2'
                ? '护照'
                : '港澳台'}
            </Descriptions.Item>
            <Descriptions.Item label="证件号码">{profileAndbasic.legalIdNumber}</Descriptions.Item>
            <Descriptions.Item label="开户银行">{profileAndbasic.openBank}</Descriptions.Item> */}
            <Descriptions.Item label="开户支行">
              {profileAndbasic.openBankAccount}
            </Descriptions.Item>
            <Descriptions.Item label="公司银行账户">
              {profileAndbasic.companyBankAccount}
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />

          <Descriptions title="法人信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="法人姓名">{profileAndbasic.contact}</Descriptions.Item>
            <Descriptions.Item label="法人手机号">{profileAndbasic.phone}</Descriptions.Item>
            <Descriptions.Item label="法人身份证号">{accountInfo.address}</Descriptions.Item>
            <Descriptions.Item label="身份证有效期">1</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions title="联系人信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="商户编号">{profileAndbasic.merchantCode}</Descriptions.Item>
            <Descriptions.Item label="商户账号">{accountInfo.username}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
        </Card>
        <Card title="支付通道" className={styles.card} bordered={false}>
          <Table columns={columns1} dataSource={direct} scroll={{ x: 1300 }} />
          <Table columns={columns1} dataSource={inDirect} scroll={{ x: 1300 }} />
        </Card>
        <Card title="账号信息" className={styles.card} bordered={false}>
          <Table columns={columns} dataSource={records} />
        </Card>
        <Card title="设备信息" className={styles.card} bordered={false}>
          <Table columns={columns} dataSource={records} />
        </Card>
        <Card title="图片信息" className={styles.card} bordered={false}>
          {/* 图片信息   */}
          <Row gutter={[16, 16]}>
            <Col span={5}>
              {profileAndbasic.businessLicenseAuthPic && (
                <img
                  className={styles.imagebusinessLicenseAuthPic}
                  src={profileAndbasic.businessLicenseAuthPic}
                  alt="示例图片"
                />
              )}
              {profileAndbasic.businessLicenseAuthPic && <Col>营业执照</Col>}
            </Col>

            <Col span={5} style={{}} onChange={this.chang_image}>
              {profileAndbasic.legalIdentityCardFront && (
                <img
                  className={styles.imagebusinessLicenseAuthPic}
                  src={profileAndbasic.legalIdentityCardFront}
                  alt="示例图片"
                />
              )}
              {profileAndbasic.legalIdentityCardFront && <Col>法人身份证正面</Col>}
            </Col>
            <Col span={5}>
              {profileAndbasic.legalIdentityCardBack && (
                <img
                  className={styles.imagebusinessLicenseAuthPic}
                  src={profileAndbasic.legalIdentityCardBack}
                  alt="示例图片"
                />
              )}
              {profileAndbasic.legalIdentityCardBack && <Col>法人身份证反面</Col>}
            </Col>
            <Col span={5}>
              {/* <img src={svg} alt="示例图片" />
                <Col>行业许可证照片</Col> */}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={5}>
              {profileAndbasic.storeFront && (
                <img
                  className={styles.imagebusinessLicenseAuthPic}
                  src={profileAndbasic.storeFront}
                  alt="示例图片"
                />
              )}
              {profileAndbasic.storeFront && <Col>门头照片</Col>}
            </Col>
            <Col span={5}>
              {/* <img src={svg} alt="示例图片" />
                <Col>店铺内景1</Col> */}
            </Col>
            <Col span={5}>
              {/* <img src={svg} alt="示例图片" />
                <Col>店铺内景2</Col> */}
            </Col>
            <Col span={5}>
              {/* <img src={svg} alt="示例图片" />
                <Col>店铺内景3</Col> */}
            </Col>
          </Row>
        </Card>
        <Modal
          title="支付宝签约"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row gutter={[16, 16]}>
            <Col span={15}>
              <Timeline>
                <Timeline.Item>2015-09-01</Timeline.Item>
                <Timeline.Item>2015-09-01</Timeline.Item>
                <Timeline.Item>2015-09-01</Timeline.Item>
              </Timeline>
              ,
            </Col>
            <Col span={6}>
              <img
                style={{ width: 150, height: 150 }}
                alt="example"
                src={`/server/api/merchant/app-merchant/auth/qrcode/${profileAndbasic.merchantId}`}
              />
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={6}>
              收款账号：ccccccc@支付宝账户号
              <br />
              签约费率：0.42%
              <br />
              签约应用ID:
              <br />
              签约产品:
              <br />
            </Col>
            <Col span={6} />
          </Row>

          <Button size="large" type="primary" style={{ marginLeft: 70 }} onClick={this.showModal}>
            发起签约
          </Button>
        </Modal>
        ;
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
)(Form.create()(Basic));
