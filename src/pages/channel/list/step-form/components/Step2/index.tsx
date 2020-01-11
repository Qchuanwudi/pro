import { Alert, Button, Descriptions, Divider, Select, Form, Input } from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
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

interface Step2Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = props => {
  const { form, data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = () => {
    validateFields((err: any, values: StateType['step']) => {
      if (!err && dispatch) {
        dispatch({
          type: 'formAndstepForm/submitStepForm',
          payload: values,
        });
        // dispatch({
        //   type: 'formAndstepForm/saveCurrentStep',
        //   payload: 'confirm',
        // });
      }
    });
  };

  const { channelAttribute, referrer, channelName } = data;
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Form.Item {...formItemLayout} label="代理类型">
        {getFieldDecorator('channelAttribute', {
          initialValue: data.channelAttribute,
          rules: [{ required: true, message: '请输入推荐人' }],
        })(<Input placeholder="请输入推荐人" />)}
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

      <Form.Item {...formItemLayout} label="代理类型ID">
        {form.getFieldDecorator('channelType', {
          initialValue: data.channelType,
        })(
          <Select style={{ width: '100%' }}>
            <Option value="ca49ebcebc3843dc84cc68db3801808c">A黄金代理</Option>
            <Option value="fb739c0bd8e248889fb31456526c74f2">B黄金代理</Option>
            <Option value="304bd55d4401438a969c9ade494b19bb">C黄金代理</Option>
            <Option value="1dee179882e1480fb7557b6c990edc4b">D黄金代理</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="返佣类型">
        {getFieldDecorator('commissionType', {
          initialValue: data.commissionType,
          rules: [{ required: true, message: '返佣类型' }],
        })(<Input placeholder="返佣类型" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="返佣比例">
        {getFieldDecorator('commissionRatio', {
          initialValue: data.commissionRatio,
          rules: [{ required: true, message: '返佣比例' }],
        })(<Input placeholder="返佣比例" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="支付宝账号">
        {getFieldDecorator('aliCommissionAccount', {
          initialValue: data.aliCommissionAccount,
          rules: [{ required: true, message: '支付宝账号' }],
        })(<Input placeholder="支付宝账号" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="微信支付账号">
        {getFieldDecorator('wxCommissionAccount', {
          initialValue: data.wxCommissionAccount,
          rules: [{ required: true, message: '微信支付账号' }],
        })(<Input placeholder="微信支付账号" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="第三方账号">
        {getFieldDecorator('bankCommissionAccount', {
          initialValue: data.bankCommissionAccount,
          rules: [{ required: true, message: '第三方账号' }],
        })(<Input placeholder="第三方账号" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="银行卡账号">
        {getFieldDecorator('thirdCommissionAccount', {
          initialValue: data.thirdCommissionAccount,
          rules: [{ required: true, message: '银行卡账号' }],
        })(<Input placeholder="银行卡账号" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="账号">
        {getFieldDecorator('loginId', {
          initialValue: data.loginId,
          rules: [{ required: true, message: '账号' }],
        })(<Input placeholder="账号" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="密码">
        {getFieldDecorator('loginPwd', {
          initialValue: data.loginPwd,
          rules: [{ required: true, message: '密码' }],
        })(<Input placeholder="密码" />)}
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
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    formAndstepForm,
    loading,
  }: {
    formAndstepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['formAndstepForm/submitStepForm'],
    data: formAndstepForm.step,
  }),
)(Form.create<Step2Props>()(Step2));
