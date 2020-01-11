import { Button, Divider, Form, Input, Select } from 'antd';
import React, { Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

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
}

const Step1: React.FC<Step1Props> = props => {
  const { form, dispatch, data } = props;
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields } = form;
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
        <Form.Item  {...formItemLayout}  label="代理类型"  className={styles.stepForm}  hideRequiredMark  >
          {getFieldDecorator('channelAttribute', {
            rules: [{ required: true, message: '请选择代理类型' }],
          })(
            <Select placeholder="请选择代理类型">
              <Option value="2">企业</Option>
              <Option value="1">个人</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="推荐人">
          {getFieldDecorator('referrer', {
            initialValue: data.referrer,
            rules: [{ required: true, message: '请输入推荐人' }],
          })(<Input placeholder="请输入推荐人" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="企业名称">
          {getFieldDecorator('channelName', {
            initialValue: data.channelName,
            rules: [{ required: true, message: '请输入企业名称' }],
          })(<Input placeholder="请输入企业名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="营业执照号">
          {getFieldDecorator('legalIdNumber', {
            initialValue: data.legalIdNumber,
            rules: [{ required: true, message: '请输入营业执照号' }],
          })(<Input placeholder="请输入营业执照号" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="联系人">
          {getFieldDecorator('contact', {
            initialValue: data.contact,
            rules: [{ required: true, message: '请输入联系人' }],
          })(<Input placeholder="请输入联系人" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="联系电话">
          {getFieldDecorator('phone', {
            initialValue: data.phone,
            rules: [{ required: true, message: '请输入联系电话' }],
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
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Form.create<Step1Props>()(Step1));
