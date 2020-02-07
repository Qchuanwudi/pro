import { Alert, Button, Descriptions, Divider, Select, Form, Input } from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import { queryType, queryTypeById } from "../../service";

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
  queryagency: StateType['queryagency'];
}

class Step2 extends React.Component<Step2Props> {
  state = {
    data: [],
    data2: [],
    commissionType: '',
    commissionRatio: '',
    array: [{}],
  };
  handleSelectChange = async (value) => {
    let channelType = value;
    const response = await queryTypeById(channelType)
    this.props.form.setFieldsValue({
      commissionType: response.result.commissionType === 1 ? '返佣比例' : '返佣费率',
      commissionRatio: response.result.commissionRatio + '%',
    });

  };
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
          payload: 'info',
        });
      }
    };

    const onValidateForm = () => {
      validateFields((err: any, values: StateType['step']) => {
        if (!err && dispatch) {
          dispatch({
            type: 'channelAddForm/saveStepFormData',
            payload: values,
          });
          dispatch({
            type: 'channelAddForm/saveCurrentStep',
            payload: 'confirm2',
          });
        }
      });
    };
    //下拉框获取渠道人
    const agency = async (e) => {
      const data = { size: 50, total: 0, }
      const response = await queryType(data)
      if (response) {
        this.setState({
          data2: response.result.records
        })
      }
    };

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item
          onClick={agency}
          {...formItemLayout}
          label="代理类型"
          className={styles.stepForm}
        >
          {getFieldDecorator('channelType', {
            rules: [{ required: true, message: '请选择代理类型' }], 
          })(
            <Select placeholder="请选择代理类型"
              onChange={this.handleSelectChange}
            >
              {this.state.data2.map((item, index) => (
                <Option key={index} value={item.channelType} >
                  {item.name}
                  <Input id="commissionType1" value={item.commissionType} type='hidden' />
                  <Input id='commissionRatio2' value={item.commissionRatio} type='hidden' />
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="返佣类型">
          {getFieldDecorator('commissionType', {
            initialValue: data.commissionType,
          })(<Input placeholder="返佣类型" disabled='disabled' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="返佣比例">
          {getFieldDecorator('commissionRatio', {
            initialValue: data.commissionRatio,
          })(<Input placeholder="返佣比例" disabled='disabled' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="支付宝账号">
          {getFieldDecorator('aliCommissionAccount', {
            initialValue: data.aliCommissionAccount,
            rules: [{
              required: false, max: 30, message: '请输入支付宝账号，由字母数字组成!',
            }],
            getValueFromEvent: (event) => {
              return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
            },
          })(<Input placeholder="支付宝账号" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="微信支付账号">
          {getFieldDecorator('wxCommissionAccount', {
            initialValue: data.wxCommissionAccount,
            rules: [{
              required: false, max: 30, message: '请输入微信支付账号，由字母数字组成!',
            }],
            getValueFromEvent: (event) => {
              return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
            },
          })(<Input placeholder="微信支付账号" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="银行卡账号">
          {getFieldDecorator('bankCommissionAccount', {
            initialValue: data.bankCommissionAccount,
            rules: [{
              required: false, max: 30, message: '请输入银行卡账号，由字母数字组成!',
            }],
            getValueFromEvent: (event) => {
              return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
            },
          })(<Input placeholder="银行卡账号" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="第三方账号">
          {getFieldDecorator('thirdCommissionAccount', {
            initialValue: data.thirdCommissionAccount,
            rules: [{
              required: false, max: 30, message: '请输入第三方账号，由字母数字组成!',
            }],
            getValueFromEvent: (event) => {
              return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
            },
          })(<Input placeholder="第三方账号" />)}
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
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm}>
            下一步
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
    queryagency: channelAddForm.queryagency,
  }),
)(Form.create<Step2Props>()(Step2));
