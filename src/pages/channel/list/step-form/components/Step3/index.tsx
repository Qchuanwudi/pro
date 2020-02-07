import { Alert, Button, Descriptions, Divider, Select, Form, Input } from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import { queryUserById } from "../../service";
import e from 'express';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step3Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

class Step3 extends React.Component<Step3Props> {
  //输入账号时 异步检验账号是否存在
  userName = async (value) => {
    // const loginId = this.props.form.getFieldValue('loginId');
    // alert(loginId);
    // const response = await queryUserById(loginId);
    // // response.records.records
    // console.log(response.result.records.length);
    // alert(response.result.records.length);
    // debugger
  };
  // const Step2: React.FC<Step2Props> = props => {
  render() {
    const { form, data, dispatch } = this.props;

    if (!data) {
      return null;
    }
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const onPrev = () => {
      if (dispatch) {
        const values = getFieldsValue();
        dispatch({
          type: 'channelAddForm/saveStepFormData',
          payload: {
            ...data,
            ...values,
          },
        });
        dispatch({
          type: 'channelAddForm/saveCurrentStep',
          payload: 'confirm',
        });
      }
    };

    const onValidateForm = () => {
      validateFields((err: any, values: StateType['step']) => {
        if (!err && dispatch && values) {
          const values = getFieldsValue();
          dispatch({
            type: 'channelAddForm/submitStepForm',
            payload: {
              ...data,
              accountInfo: {
                username: values.loginId,
                password: values.loginPwd,
              },
            },
          });
          dispatch({
            type: 'channelAddForm/saveCurrentStep',
            payload: {},
          });
        }
      });
    };

    // const { channelAttribute, referrer, channelName } = data;
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="账号" >
          {getFieldDecorator('loginId', {
            initialValue: data.loginId,
            rules: [{
              required: true, max: 50, message: '请输入您的用户名，由字母数字组成!',
              // pattern: new RegExp(/^[0-9,a-z]\d*$/, "g"),
            }],
            getValueFromEvent: (event) => {
              return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
            },
          })(<Input placeholder="账号" onBlur={this.userName} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="登录密码">
          {getFieldDecorator('loginPwd', {
            // initialValue: data.loginPwd,
            rules: [{ required: true, max: 50, message: '密码由8位数字、大小写字母和特殊符号组成!' }],
          })(<Input placeholder="请输入登录密码" type="password" />)}
        </Form.Item>
        {/* <Form.Item {...formItemLayout} label="确认密码">
          {form.getFieldDecorator('loginPwdR', {
            rules: [
              { required: true, max: 50, message: '请重新输入登录密码!' },
              {
                validator: (rule, value, callback) => {
                  try {
                    const pwd = form.getFieldValue('loginPwd');
                    const pwdr = form.getFieldValue('loginPwdR');
                    if (pwd !== pwdr) {
                      throw new Error('Something wrong!');
                    }
                  } catch (err) {
                    callback(err);
                    return;
                  }
                  callback();
                },
                message: '密码输入不一致!',
              },
            ],
          })(<Input type="password" placeholder="请重新输入登录密码" />)}
        </Form.Item> */}
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
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default connect(
  ({
    channelAddForm,
    loading,
  }: {
    channelAddForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['channelAddForm/submitStepForm'],
    data: channelAddForm.step,
  }),
)(Form.create<Step3Props>()(Step3));
