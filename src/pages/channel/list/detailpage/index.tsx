import { Badge, Card, Descriptions, Divider, Table, Option, Form, Modal, Input, Button, Select, message } from 'antd';
import React, { Component, useState } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, router } from 'dva';
import { BasicProfileDataType } from './data.d';
import styles from './style.less';
import { updateChannel, channelType } from './service';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface BasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  profileAndbasic: BasicProfileDataType;
}
interface BasicState {
  visible: boolean;
}

class Basic extends React.Component<BasicProps, BasicState> {
  //-----------------------
  state = {
    visible: false,
    visible2: false,
    visible3: false,
    type: 'aaaa',
  };
  //----------------基本信息--------------------
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      const hide = message.loading('正在保存');
      const response = updateChannel(values);
      // debugger;
      const { dispatch } = this.props;
      // debugger;
      // dispatch({
      //   type: 'profileAndbasic/fetchBasic',
      //   payload: {
      //     channelId: values.channelId,
      //   }
      // });

      hide();
      message.success('基本信息编辑成功');
      // location.replace(document.referrer);
      history.go(0)
      return false;
    });
  };

  saveFormRef = (formRef: any) => {
    // debugger;
    this.formRef = formRef;
  };
  //------------------------返佣信息-------------
  showModal2 = () => {
    this.setState({ visible2: true });
  };

  handleCancel2 = () => {
    this.setState({ visible2: false });
  };

  handleCreate2 = () => {
    const { form } = this.formRef2.props;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      const hide = message.loading('正在保存');
      const response = channelType(values);
      // debugger;
      const { dispatch } = this.props;

      hide();
      message.success('返佣信息编辑成功');
      // location.replace(document.referrer);
      history.go(0)
      return false;
    });
  };

  saveFormRef2 = (formRef2: any) => {
    // debugger;
    this.formRef2 = formRef2;
  };
  //------------------------账号信息-------------
  showModal3 = () => {
    this.setState({ visible3: true });
  };

  handleCancel3 = () => {
    this.setState({ visible3: false });
  };

  handleCreate3 = () => {
    const { form } = this.formRef3.props;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      const hide = message.loading('正在保存');
      const response = channelType(values);
      // debugger;
      const { dispatch } = this.props;

      hide();
      message.success('返佣信息编辑成功');
      // location.replace(document.referrer);
      history.go(0)
      return false;
    });
  };

  saveFormRef3 = (formRef3: any) => {
    // debugger;
    this.formRef3 = formRef3;
  };
  //-----------------------------
  componentDidMount() {
    const channelId = this.props.location.query.channelId;
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAndbasic/fetchBasic',
      payload: {
        channelId: channelId,
      }
    });
  }

  // constructor(props: Readonly<BasicProps>) {
  //   super(props);

  //   this.state = {
  //     modalAddInfoVisible: false, //编辑信息Modal的显示属性
  //   }
  // }
  // //弹出一个弹出框用于编辑信息
  // openModalAddInfo = (type) => {
  //   this.setState({ modalAddInfoVisible: true })
  // }


  render() {
    const { profileAndbasic, loading } = this.props;
    const { basicGoods, appChannel, appChannelCommission, appChannelType } = profileAndbasic;
    const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
      // eslint-disable-next-line
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="编辑基本信息"
              okText="保存"
              onCancel={onCancel}
              onOk={onCreate}
            >

              <Form layout="vertical">
                {getFieldDecorator('channelId', {
                  initialValue: appChannel.channelId,
                })(<Input type='hidden' />)}
                {getFieldDecorator('channelAttribute', {
                  initialValue: appChannel.channelAttribute,
                })(<Input type='hidden' />)}


                <Form.Item {...formItemLayout} label="返佣类型:">
                  {appChannel.channelAttribute == '1' ? '个人' : '企业'}
                </Form.Item>
                <Form.Item {...formItemLayout} label="推荐人:">
                  {appChannel.referrer}
                </Form.Item>
                {/* <Form.Item label="推荐人">
                  {getFieldDecorator('referrer', {
                    initialValue: appChannel.referrer,
                  })(<Input />)}
                </Form.Item> */}
                {appChannel.channelAttribute == '2' ? (
                  <>
                    <Form.Item {...formItemLayout} label="企业名称:">
                      {getFieldDecorator('channelName', {
                        initialValue: appChannel.channelName,
                        rules: [{ required: true, max: 50, message: '请输入企业名称' }],
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="营业执照:">
                      {getFieldDecorator('legalIdNumber', {
                        initialValue: appChannel.legalIdNumber,
                        rules: [{
                          required: true, max: 45, message: '请输入营业执照号，由字母数字组成!',
                        }],
                        getValueFromEvent: (event) => {
                          return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
                        },
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系人:">
                      {getFieldDecorator('contact', {
                        initialValue: appChannel.contact,
                        rules: [{ required: true, max: 50, message: '请输入联系人' }],
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系电话:">
                      {getFieldDecorator('phone', {
                        initialValue: appChannel.phone,
                        rules: [{

                          pattern: new RegExp(/^[1][3,4,5,6,7,8][0-9]{9}$/, "g"),
                          // pattern: new RegExp(/^[0-9]\d*$/, "g"),
                          required: true, message: '请输入有效手机号码',
                        }],
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系地址:">
                      {getFieldDecorator('address', {
                        initialValue: appChannel.address,
                        rules: [{ required: true, max: 150, message: '请输入联系地址' }],
                      })(<Input />)}
                    </Form.Item>
                  </>
                ) : (
                    <>
                      <Form.Item {...formItemLayout} label="姓名:">
                        {getFieldDecorator('channelName', {
                          initialValue: appChannel.channelName,
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="身份证号:">
                        {getFieldDecorator('legalIdNumber', {
                          initialValue: appChannel.legalIdNumber,
                          rules: [{
                            required: true, max: 45, message: '请输入身份证号，由字母数字组成!',
                          }],
                          getValueFromEvent: (event) => {
                            return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
                          },
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="联系电话:">
                        {getFieldDecorator('phone', {
                          initialValue: appChannel.phone,
                          rules: [{

                            pattern: new RegExp(/^[1][3,4,5,6,7,8][0-9]{9}$/, "g"),
                            // pattern: new RegExp(/^[0-9]\d*$/, "g"),
                            required: true, message: '请输入有效手机号码',
                          }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="联系地址:">
                        {getFieldDecorator('address', {
                          initialValue: appChannel.address,
                          rules: [{ required: true, max: 150, message: '请输入联系地址' }],
                        })(<Input />)}
                      </Form.Item>
                    </>
                  )}
              </Form>

            </Modal>
          );
        }
      },
    );
    const TypeForm = Form.create({ name: 'form_in_modal' })(
      // eslint-disable-next-line
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="编辑返佣信息"
              okText="保存"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                {getFieldDecorator('channelId', {
                  initialValue: appChannel.channelId,
                })(<Input type='hidden' />)}

                <Form.Item {...formItemLayout} label="代理类型:">
                  {appChannelType.name}
                  {/* {getFieldDecorator('channelType', {
                    initialValue: appChannelType.name,
                  })(<Input />)} */}
                </Form.Item>
                <Form.Item {...formItemLayout} label="返佣类型:">
                  {appChannelType.commissionType == '1' ? '按比例' : '固定费率'}
                  {/* {getFieldDecorator('commissionType', 
                    initialValue: appChannelType.commissionType,
                  })(<Input />)} */}
                </Form.Item>
                <Form.Item {...formItemLayout} label="返佣比例:">
                  {appChannelType.commissionRatio}%
                  {/* {getFieldDecorator('commissionRatio', {
                    initialValue: appChannelType.commissionRatio,
                  })(<Input />)} */}
                </Form.Item>
                {appChannelCommission.map((item, index) =>
                  <span >{item.commissionAccount === '' ? '' : (
                    item.commissionChannel === 1 ?
                      (
                        <>
                          {/* {getFieldDecorator('channelAttribute', {
                  initialValue: item.channelId,
                })(<Input  />)} */}
                          <Form.Item {...formItemLayout} label="支付宝账号:">
                            {getFieldDecorator('aliCommissionAccount', {
                              initialValue: item.commissionAccount,
                            })(<Input />)}
                          </Form.Item>
                        </>
                      ) : (
                        item.commissionChannel === 2 ?
                          (
                            <>
                              <Form.Item {...formItemLayout} label="微信支付账号:">
                                {getFieldDecorator('wxCommissionAccount', {
                                  initialValue: item.commissionAccount,
                                })(<Input />)}
                              </Form.Item>
                            </>
                          ) : (
                            item.commissionChannel === 3 ?
                              (
                                <>
                                  <Form.Item {...formItemLayout} label="银行卡账号:">
                                    {getFieldDecorator('bankCommissionAccount', {
                                      initialValue: item.commissionAccount,
                                    })(<Input />)}
                                  </Form.Item>
                                </>
                              ) : (
                                item.commissionChannel === 4 ?
                                  (
                                    <>
                                      <Form.Item {...formItemLayout} label="第三方账号:">
                                        {getFieldDecorator('thirdCommissionAccount', {
                                          initialValue: item.commissionAccount,
                                        })(<Input />)}
                                      </Form.Item>
                                    </>
                                  ) :

                                  ''))))},
                </span>
                )}
              </Form>

            </Modal>
          );
        }
      },
    );
    const UserForm = Form.create({ name: 'form_in_modal' })(
      // eslint-disable-next-line
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="编辑账号信息"
              okText="保存"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                {getFieldDecorator('channelId', {
                  initialValue: appChannel.channelId,
                })(<Input type='hidden' />)}
                <Form.Item {...formItemLayout} label="代理商编号:">
                  {appChannel.channelCode}
                  {/* {getFieldDecorator('channelType', {
                    initialValue: appChannelType.name,
                  })(<Input />)} */}
                </Form.Item>
                <Form.Item {...formItemLayout} label="用户名:">
                  {getFieldDecorator('loginId', {
                    initialValue: appChannel.accountInfo?.username,
                  })(<Input readOnly />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="登录密码">
                  {getFieldDecorator('loginPwd', {
                    // initialValue: data.loginPwd,
                    rules: [{ required: true, max: 50, message: '密码由8位数字、大小写字母和特殊符号组成!' }],
                  })(<Input />)}
                </Form.Item>
              </Form>

            </Modal>
          );
        }
      },
    );
    const goodsColumns = [
      {
        title: '账单期',
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
        title: '账单时间',
        dataIndex: 'name',
        key: 'name',
        // render: renderContent,
      },
      {
        title: '商户数',
        dataIndex: 'barcode',
        key: 'barcode',
        // render: renderContent,
      },
      {
        title: '商户交易额',
        dataIndex: 'price',
        key: 'price',
        align: 'right' as 'left' | 'right' | 'center',
        // render: renderContent,
      },
      {
        title: '返佣金额',
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
        title: '返佣状态',
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
      {
        title: '返佣时间',
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
      {
        title: '付款渠道',
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
      {
        title: '操作',
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
      <PageHeaderWrapper title='代理商详情' >
        <Button type="primary" onClick={this.showModal}>
          编辑
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Card title="基本信息" style={{ marginBottom: 32 }}>
          {/* <Divider style={{ marginBottom: 32 }} /> */}
          <Descriptions style={{ marginBottom: 32 }}>
            {appChannel.channelAttribute == '2' ? (<>
              <Descriptions.Item label="企业名称">{appChannel.channelName}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{appChannel.createTime}</Descriptions.Item>
              <Descriptions.Item label="所属代理">{appChannel.referrer}</Descriptions.Item>
              <Descriptions.Item label="营业执照">{appChannel.legalIdNumber}</Descriptions.Item>
              <Descriptions.Item label="联系人">{appChannel.contact}</Descriptions.Item>
              <Descriptions.Item label="手机号">{appChannel.phone}</Descriptions.Item>
              <Descriptions.Item label="联系地址">{appChannel.address}</Descriptions.Item>
            </>) : (<>
              <Descriptions.Item label="姓名">{appChannel.channelName}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{appChannel.createTime}</Descriptions.Item>
              <Descriptions.Item label="所属代理">{appChannel.referrer}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{appChannel.legalIdNumber}</Descriptions.Item>
              <Descriptions.Item label="手机号">{appChannel.phone}</Descriptions.Item>
              <Descriptions.Item label="联系地址">{appChannel.address}</Descriptions.Item>
            </>)}
          </Descriptions>
        </Card>
        <Button type="primary" onClick={this.showModal3}>
          编辑
        </Button>
        <UserForm
          wrappedComponentRef={this.saveFormRef3}
          visible={this.state.visible3}
          onCancel={this.handleCancel3}
          onCreate={this.handleCreate3}
        />
        {/* <a><button >编辑</button></a>  */}
        <Card title="账号信息" style={{ marginBottom: 32 }}>
          {/* <Divider style={{ marginBottom: 32 }} /> */}
          <Descriptions style={{ marginBottom: 32 }}>
            <Descriptions.Item label="代理编号">{appChannel.channelCode}</Descriptions.Item>
            <Descriptions.Item label="代理账号">{appChannel.accountInfo?.username}</Descriptions.Item>
            <Descriptions.Item label="登入密码">******</Descriptions.Item>
          </Descriptions>
        </Card>
        <Button type="primary" onClick={this.showModal2}>
          编辑
        </Button>
        <TypeForm
          wrappedComponentRef={this.saveFormRef2}
          visible={this.state.visible2}
          onCancel={this.handleCancel2}
          onCreate={this.handleCreate2}
        />
        {/* <a><button>编辑</button></a> */}
        <Card title="返佣信息" style={{ marginBottom: 32 }}>
          {/* <Divider style={{ marginBottom: 32 }} /> */}

          <Descriptions style={{ marginBottom: 32 }}>
            <Descriptions.Item label="代理类别">{appChannelType.name}</Descriptions.Item>
            <Descriptions.Item label="返佣类型">{appChannelType.commissionType === 1 ? '固定比例' : '固定费率'}</Descriptions.Item>
            <Descriptions.Item label="返佣比例">{appChannelType.commissionRatio}%</Descriptions.Item>
            <Descriptions.Item label="返佣渠道">
              {appChannelCommission.map((item, index) =>
                <Descriptions.Item >{item.commissionAccount === '' ? '' : (item.commissionChannel === 1 ? '支付宝' : (item.commissionChannel === 2 ? '微信' : (item.commissionChannel === 3 ? '银行卡' : (item.commissionChannel === 4 ? '第三方' : ''))))},</Descriptions.Item>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="返佣账号">
              {appChannelCommission.map((item, index) =>
                <Descriptions.Item >{item.commissionAccount},</Descriptions.Item>
              )}
            </Descriptions.Item>
          </Descriptions>
          {/* <Divider style={{ marginBottom: 32 }} /> */}
        </Card>
        <Card title="结算信息" style={{ marginBottom: 32 }}>
          <div className={styles.title}>每月25日至次月25日为一个结算周期</div>
          <Table
            style={{ marginBottom: 32 }}
            pagination={false}
            loading={loading}
            // dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
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
