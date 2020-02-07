import { Alert, Button, Descriptions, Divider, Statistic, Form, Input, Select, Spin } from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

import debounce from 'lodash/debounce';
import { number, any } from 'prop-types';

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

class Step2 extends React.Component<Step2Props> {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchChannelType = debounce(this.fetchChannelType, 800);
  }

  state = {
    channelTypes: [],
    channelType: {},
    fetching: false,
  };

  componentDidMount() {
    this.fetchChannelType('');
  }

  fetchChannelType = value => {
    this.setState({ channelTypes: [], fetching: true });
    // if(value.trim() === ''){
    //   return;
    // }
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    const word = value;
    // 搜索代理商
    const { dispatch } = this.props;
    dispatch({
      type: 'platformChannel/fetchQueryAppChanneTypelList',
      payload: {
        current: 1,
        size: 100,
        orders: [{ column: 'id', asc: false }],
        query: { name: word },
      },
    }).then(result => {
      this.setState({ channelTypes: result, fetching: false });
    });
  };

  handleChange = value => {
    // 获取当前选择类型
    const arr = this.state.channelTypes;
    let entity;
    for (let i = 0; i < arr.length; i = i + 1) {
      if (value.key === arr[i].value) {
        entity = arr[i];
      }
    }
    this.setState({
      channelType: entity,
      // channelTypes: [],
      fetching: false,
    });
  };

  render() {
    const { form, data, dispatch, submitting } = this.props;
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
    const onValidateForm = (e: React.FormEvent) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          if (dispatch) {
            dispatch({
              type: 'formAndstepForm/saveStepFormData',
              payload: values,
            });
            dispatch({
              type: 'formAndstepForm/saveCurrentStep',
              payload: 'result',
            });
          }
        }
      });
    };

    const { payAccount, receiverAccount, receiverName, amount } = data;
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="代理类型">
          {getFieldDecorator('channelType', {
            rules: [{ required: true, message: '请选择代理类型！' }],
          })(
            <Select
              showSearch="true"
              labelInValue
              value={this.state.value}
              placeholder="请选择类别"
              filterOption={false}
              onSearch={this.fetchChannelType}
              notFoundContent={this.state.fetching ? <Spin size="small" /> : <>未找到数据</>}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {this.state.channelTypes.map(d => (
                <Option key={d.value}>{d.text}</Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        {this.state.channelType.value ? (
          <>
            <Form.Item {...formItemLayout} label="返佣类型">
              {this.state.channelType.commissionType === 1 ? <>按比例</> : null}
              {this.state.channelType.commissionType === 2 ? <>固定费率</> : null}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={this.state.channelType.commissionType === '1' ? '返佣比例' : '返佣费率'}
            >
              {this.state.channelType.commissionRatio || '0'}%
            </Form.Item>
          </>
        ) : null}
        <Form.Item {...formItemLayout} label="支付宝账号">
          {getFieldDecorator('commissionAccount_alipay', {})(<Input placeholder="" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="微信支付账号">
          {getFieldDecorator('commissionAccount_wxpay', {})(<Input placeholder="" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="第三方账号">
          {getFieldDecorator('commissionAccount_third', {})(<Input placeholder="" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="银行账号">
          {getFieldDecorator('commissionAccount_bank', {})(<Input placeholder="" />)}
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            下一步
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
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
