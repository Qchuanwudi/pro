import { Button, Divider, Form, Input, Select, Spin } from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import { userState, useEffect } from 'react';
import { queryFakeList } from '../../service';
import { withRouter } from 'react-router-dom';
import { async } from 'q';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step1Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  queryagency: StateType['queryagency'];
}

class Step1 extends Component<Step1Props> {
  state = {
    data: [],
    data2: [],
  };

  // componentDidMount() {
  //   const { dispatch, queryagency } = this.props;

  //   if (queryagency) {
  //     console.log(queryagency);
  //     this.setState({
  //       data2: queryagency.result.records,
  //       success:true,
  //     });
  //     debugger
  //   }
  //   if (dispatch) {
  //     dispatch({
  //       type: 'formAndstepForm/QueryAgency',
  //       payload: {

  //         json: {

  //           size: 10,
  //           total: 60,
  //         },
  //       },
  //     });

  //   }

  //};

  // componentDidMount() {
  //   const { dispatch, queryagency } = this.props;

  //   if (queryagency) {
  //     console.log(queryagency);
  //     this.setState({
  //       data2: queryagency.result.records,
  //     });
  //   }
  //   if (dispatch) {
  //     dispatch({
  //       type: 'formAndstepForm/QueryAgency',
  //       payload: {

  //         json: {

  //           size: 10,
  //           total: 60,
  //         },
  //       },
  //     });

  //   }

  // };

  render() {
    const { form, dispatch, data } = this.props;

    console.log(dispatch);
    if (!data) {
      return null;
    }
    const { getFieldDecorator, validateFields } = form;
    console.log('save data')
    console.log(form)
    console.log('save data')

    const onValidateForm = () => {
      validateFields((err: any, values: StateType['step']) => {
        if (!err && dispatch) {
          dispatch({
            type: 'formAndstepForm/saveStepFormData',
            payload: values,
          });
          dispatch({
            type: 'formAndstepForm/saveCurrentStep',
            payload: 'confirm',
          });
        }
      });
    };

    const agency = async e => {
      const data = { size: 10, total: 60 };
      const response = await queryFakeList(data);
      if (response) {
        this.setState({
          data2: response.result.records,
        });
      }
      console.log(response);
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="企业名称">
            {getFieldDecorator('merchantName', {
              initialValue: data.merchantName,
              rules: [{ required: true, message: '请输入企业名称' }],
            })(<Input placeholder="请输入企业名称" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="企业简称">
            {getFieldDecorator('storeAbbreviation', {
              initialValue: data.storeAbbreviation,
            })(<Input placeholder="请输入企业简称" />)}
          </Form.Item>

          <Form.Item
            onClick={agency}
            {...formItemLayout}
            label="所属代理"
            className={styles.stepForm}
            hideRequiredMark
            style={{ marginBottom: 25, marginTop: 20 }}
          >
            {getFieldDecorator('channelId', {
              rules: [{ required: true, message: '请选择代理商' }],
            })(
              
              <Select placeholder="请选择代理商">
                {this.state.data2.map((item, index) => (
                  <Option key={index} value={item.channelId}>
                    {item.channelName}
                  </Option>
                ))}
              </Select>,
             
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="行业分类">
            {getFieldDecorator('industryCode', {
              initialValue: data.industryCode,
              rules: [
                {
                  required: false,
                  message: '请填写正确行业，如：销售行业,餐饮行业...',
                  pattern: new RegExp(/^[\u4e00-\u9fa5]+$/, 'g'),
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="营业执照号">
            {getFieldDecorator('businessLicenseNo', {
              initialValue: data.businessLicenseNo,
              rules: [{ required: true, message: '请输入营业执照号' }],
            })(<Input placeholder="请输入营业执照号" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="注册地址">
            {getFieldDecorator('registeredAddress', {
              initialValue: data.registeredAddress,
              rules: [{ required: true, message: '请输入注册地址' }],
            })(<Input placeholder="请输入注册地址" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="店铺地址">
            {getFieldDecorator('storeAddress', {
              initialValue: data.storeAddress,
              rules: [{ required: true, message: '请输入店铺地址' }],
            })(<Input placeholder="请输入店铺地址" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="支付宝签约账号">
            {getFieldDecorator('aliCommissionAccount', {
              initialValue: data.aliCommissionAccount,
              rules: [{ required: true, message: '请输入支付宝签约账号' }],
            })(<Input placeholder="请输入支付宝签约账号" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="微信签约账号">
            {getFieldDecorator('wxCommissionAccount', {
              initialValue: data.wxCommissionAccount,
              rules: [{ required: true, message: '请输入微信签约账号' }],
            })(<Input placeholder="请输入微信签约账号" />)}
          </Form.Item>

          <Form.Item style={{ marginBottom: 10 }} {...formItemLayout} label="法人姓名">
            {getFieldDecorator('legalName', {
              initialValue: data.legalName,
              rules: [
                {
                  required: true,
                  message: '请输入输入姓名由中文组成',
                  pattern: new RegExp(/^[\u4e00-\u9fa5]+$/, 'g'),
                },
              ],
            })(<Input placeholder="请输入微信签约账号" />)}
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 28, marginTop: 20 }}
            {...formItemLayout}
            label="证件类型"
            className={styles.stepForm}
            hideRequiredMark
          >
            {getFieldDecorator('legalIdType', {
              rules: [{ required: true, message: '请选择证件类型' }],
            })(
              <Select placeholder="请选择证件类型">
                <Option value="1">身份证</Option>
                <Option value="2">护照</Option>
                <Option value="3">港澳台</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="证件号码">
            {getFieldDecorator('legalIdNumber', {
              initialValue: data.legalIdNumber,
              rules: [
                {
                  required: true,
                  message: '请输入完整身份证号码',
                  pattern: new RegExp(
                    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                    'g',
                  ),
                },
              ],
            })(<Input placeholder="请输入证件号码" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="开户银行">
            {getFieldDecorator('openBank', {
              initialValue: data.openBank,
              rules: [{
                required: true, message: '请填写正确开户行',
                pattern: new RegExp(/^[\u4e00-\u9fa5]+$/, 'g'),
              }],
            })(<Input placeholder="请输入开户银行" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="开户城市">
            {getFieldDecorator('openCity', {
              initialValue: data.openCity,
              rules: [{ required: true, message: '请输入开户城市' }],
            })(<Input placeholder="请输入开户城市" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="开户支行">
            {getFieldDecorator('openBankAccount', {
              initialValue: data.openBankAccount,
              rules: [{ required: true, message: '请输入开户支行' }],
            })(<Input placeholder="请输入开户支行" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="公司银行账号">
            {getFieldDecorator('companyBankAccount', {
              rules: [
                {
                  required: true,
                  message: '请输入公司银行账号',
                  pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                },
              ],
              getValueFromEvent: event => {
                return event.target.value.replace(/\D/g, '');
              },
              initialValue: data.companyBankAccount,
            })(<Input placeholder="请输入公司银行账号" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="联系人">
            {getFieldDecorator('contact', {
              initialValue: data.contact,
              rules: [
                {
                  required: true,
                  message: '请填写联系人姓名',

                  pattern: new RegExp(/^[\u4e00-\u9fa5]+$/, 'g'),
                },
              ],
            })(<Input placeholder="请输入联系人" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="联系电话">
            {getFieldDecorator('phone', {
              initialValue: data.phone,
              rules: [
                {
                  required: true,
                  message: '请输入完整手机号码',
                  pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, 'g'),
                },
              ],
              getValueFromEvent: event => {
                return event.target.value.replace(/\D/g, '');
              },
            })(<Input placeholder="请输入联系电话" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="联系地址">
            {getFieldDecorator('address', {
              initialValue: data.address,
              rules: [{ required: true, message: '请输入联系地址' }],
            })(<Input placeholder="请输入联系地址" />)}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm} style={{marginLeft:150}}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
  queryagency: formAndstepForm.queryagency,
}))(Form.create<Step1Props>()(Step1));
