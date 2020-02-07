import {
  Alert,
  Button,
  Descriptions,
  Divider,
  Statistic,
  Form,
  Input,
  Select,
  Spin,
  message,
} from 'antd';

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
interface Step3Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

class Step3 extends React.Component<Step3Props> {
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

  fetchChannelType = value => {
    this.setState({ channelTypes: [], fetching: true });
    if (value.trim() === '') {
      return;
    }
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    const word = value;
    // 搜索代理商
    const { dispatch } = this.props;
    dispatch({
      type: 'platformChannel/fetchQueryAppChanneTypelList',
      payload: {
        current: 1,
        size: 10,
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
      channelTypes: [],
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

    const onCancel = () => {
      window.location.href = '/platform/channel/list';
    };
    const onValidateForm = (e: React.FormEvent) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          if (dispatch) {
            const hide = message.loading('正在添加');
            // debugger;
            dispatch({
              type: 'platformChannel/fetchAddAppChannel',
              payload: {
                ...data,
                ...values,
              },
            }).then(result => {
              hide();
              if (result.code === 0) {
                // 提示添加成功
                message.success('添加成功');
                // 跳转至详情页面,暂时调整，后续优化
                window.location.href =
                  '/channel/list/detailpage?channelId=' + result.result.channelId;
              } else {
                message.error(result.message);
              }
            });
          }
        }
      });
    };

    const { payAccount, receiverAccount, receiverName, amount } = data;
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="代理账号">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入账号！' }],
          })(<Input placeholder="" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="初始密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(<Input placeholder="" type="password" />)}
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
            预览并添加
          </Button>
          <Button onClick={onCancel} style={{ marginLeft: 8 }}>
            取消添加
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
)(Form.create<Step3Props>()(Step3));
