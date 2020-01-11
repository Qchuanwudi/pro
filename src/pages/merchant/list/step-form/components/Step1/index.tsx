import {Button, Divider, Form, Input, Select} from 'antd';
import React, {Fragment} from 'react';

import {Dispatch} from 'redux';
import {FormComponentProps} from 'antd/es/form';
import {connect} from 'dva';
import {StateType} from '../../model';
import styles from './index.less';
import { userState, useEffect } from "react";

import { async } from 'q';
const {Option} = Select;
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
}

const Step1: React.FC<Step1Props> = props => {

 
  const { form, dispatch, data } = props;
  console.log(props)
  if (!data) {
    return null;
  }
  const {getFieldDecorator, validateFields} = form;
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

 
  return (
    <Fragment>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item {...formItemLayout} label="企业名称">
          {getFieldDecorator('merchantName', {
            initialValue: data.merchantName,
            rules: [{required: true, message: '请输入企业名称'}],
          })(<Input placeholder="请输入企业名称"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="企业简称">
          {getFieldDecorator('storeAbbreviation', {
            initialValue: data.storeAbbreviation,
          })(<Input placeholder="请输入企业简称"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="所属代理" className={styles.stepForm} hideRequiredMark>
          {getFieldDecorator('channelId', {
            rules: [{required: true, message: '请选择代理商'}],
          })(
            <Select placeholder="请选择代理商">
              <Option value="SYS001870838">北京代理商</Option>
              <Option value="SYS001582681">河北代理商</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="行业分类">
          {getFieldDecorator('industryCode', {
            initialValue: data.industryCode,
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="营业执照号">
          {getFieldDecorator('businessLicenseNo', {
            initialValue: data.businessLicenseNo,
            rules: [{required: true, message: '请输入营业执照号'}],
          })(<Input placeholder="请输入营业执照号"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="注册地址">
          {getFieldDecorator('registeredAddress', {
            initialValue: data.registeredAddress,
            rules: [{required: true, message: '请输入注册地址'}],
          })(<Input placeholder="请输入注册地址"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="店铺地址">
          {getFieldDecorator('storeAddress', {
            initialValue: data.storeAddress,
            rules: [{required: true, message: '请输入店铺地址'}],
          })(<Input placeholder="请输入店铺地址"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="支付宝签约账号">
          {getFieldDecorator('aliCommissionAccount', {
            initialValue: data.aliCommissionAccount,
            rules: [{required: true, message: '请输入支付宝签约账号'}],
          })(<Input placeholder="请输入支付宝签约账号"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="微信签约账号">
          {getFieldDecorator('wxCommissionAccount', {
            initialValue: data.wxCommissionAccount,
            rules: [{required: true, message: '请输入微信签约账号'}],
          })(<Input placeholder="请输入微信签约账号"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="法人姓名">
          {getFieldDecorator('legalName', {
            initialValue: data.legalName,
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="证件类型" className={styles.stepForm} hideRequiredMark>
          {getFieldDecorator('legalIdType', {
            rules: [{required: true, message: '请选择证件类型'}],
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
            rules: [{required: true, message: '请输入证件号码'}],
          })(<Input placeholder="请输入证件号码"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="开户银行">
          {getFieldDecorator('openBank', {
            initialValue: data.openBank,
            rules: [{required: true, message: '请输入开户银行'}],
          })(<Input placeholder="请输入开户银行"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="开户城市">
          {getFieldDecorator('openCity', {
            initialValue: data.openCity,
            rules: [{required: true, message: '请输入开户城市'}],
          })(<Input placeholder="请输入开户城市"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="开户支行">
          {getFieldDecorator('openBankAccount', {
            initialValue: data.openBankAccount,
            rules: [{required: true, message: '请输入开户支行'}],
          })(<Input placeholder="请输入开户支行"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="公司银行账号">
          {getFieldDecorator('companyBankAccount', {
            initialValue: data.companyBankAccount,
          })(<Input placeholder="请输入公司银行账号"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="联系人">
          {getFieldDecorator('contact', {
            initialValue: data.contact,
            rules: [{required: true, message: '请输入联系人'}],
          })(<Input placeholder="请输入联系人"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="联系电话">
          {getFieldDecorator('phone', {
            initialValue: data.phone,
            rules: [{required: true, message: '请输入联系电话'}],
          })(<Input placeholder="请输入联系电话"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="联系地址">
          {getFieldDecorator('address', {
            initialValue: data.address,
            rules: [{required: true, message: '请输入联系地址'}],
          })(<Input placeholder="请输入联系地址"/>)}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: {span: 24, offset: 0},
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default connect(({formAndstepForm}: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Form.create<Step1Props>()(Step1));
