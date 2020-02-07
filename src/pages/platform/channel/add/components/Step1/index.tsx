import { Button, Divider, Form, Input, Select, Spin } from 'antd';
import React, { Fragment } from 'react';

import debounce from 'lodash/debounce';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

import { queryAppChannelList } from '../../../service';
import { string } from 'prop-types';

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

class Step1 extends React.Component<Step1Props> {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchChannel = debounce(this.fetchChannel, 800);
  }

  state = {
    searchs: [],
    channel: {},
    fetching: false,
    view: 'company',
  };

  componentDidMount() {
    this.fetchChannel('');
  }

  fetchChannel = value => {
    this.setState({ searchs: [], fetching: true });
    // if(value.trim() === ''){
    //   return;
    // }
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    const word = value;
    // 搜索代理商
    const { dispatch } = this.props;
    dispatch({
      type: 'platformChannel/fetchQueryAppChannelList',
      payload: {
        current: 1,
        size: 100,
        orders: [{ column: 'id', asc: false }],
        query: { channelName: word },
      },
    }).then(result => {
      this.setState({ searchs: result, fetching: false });
    });
  };

  handleChange = value => {
    this.setState({
      channel: value,
      channelId: value.key,
      // searchs: [],
      fetching: false,
    });
  };

  render() {
    const { form, dispatch, data } = this.props;

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
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item {...formItemLayout} label="代理类型">
            {getFieldDecorator('channelAttribute', {
              initialValue: data.channelAttribute || '2',
              rules: [{ required: true, message: '请选择类型！' }],
            })(
              <Select
                placeholder="请选择类型"
                onChange={value => {
                  if (value === '1') {
                    this.setState({ view: 'personal' });
                  } else {
                    this.setState({ view: 'company' });
                  }
                }}
              >
                <Option value="1">个人</Option>
                <Option value="2">公司</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="推荐人">
            {getFieldDecorator('referrer', {
              initialValue: this.state.channel.value,
              rules: [],
            })(
              <Select
                showSearch="true"
                labelInValue
                value={this.state.channel.channelId}
                placeholder="搜索推荐人"
                notFoundContent={this.state.fetching ? <Spin size="small" /> : <>未找到数据</>}
                filterOption={false}
                onSearch={this.fetchChannel}
                onChange={this.handleChange}
                style={{ width: '100%' }}
              >
                {this.state.searchs.map(d => (
                  <Option key={d.value}>{d.text}</Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          {this.state.view === 'company' ? (
            <>
              <Form.Item {...formItemLayout} label="企业名称">
                {getFieldDecorator('channelName', {
                  initialValue: data.channelName,
                  rules: [{ required: true, message: '请输入企业名称！' }],
                })(<Input placeholder="" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="营业执照号">
                {getFieldDecorator('legalIdNumber', {
                  initialValue: data.legalIdNumber,
                  rules: [{ required: true, message: '请输入营业执照号！' }],
                })(<Input placeholder="" />)}
              </Form.Item>

              <Form.Item {...formItemLayout} label="联系人">
                {getFieldDecorator('contact', {
                  initialValue: data.contact,
                  rules: [{ required: true, message: '请输入联系人！' }],
                })(<Input placeholder="" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="联系电话">
                {getFieldDecorator('phone', {
                  initialValue: data.phone,
                  rules: [{ required: true, message: '请输联系电话！' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item {...formItemLayout} label="姓名">
                {getFieldDecorator('channelName', {
                  initialValue: data.channelName,
                  rules: [{ required: true, message: '请输入姓名！' }],
                })(<Input placeholder="" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="身份证号">
                {getFieldDecorator('legalIdNumber', {
                  initialValue: data.legalIdNumber,
                  rules: [{ required: true, message: '请输入身份证号！' }],
                })(<Input placeholder="" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="联系电话">
                {getFieldDecorator('phone', {
                  initialValue: data.phone,
                  rules: [{ required: true, message: '请输联系电话！' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </>
          )}

          <Form.Item {...formItemLayout} label="联系地址">
            {getFieldDecorator('address', {
              initialValue: data.address,
            })(<Input.TextArea placeholder="" autoSize={{ minRows: 3, maxRows: 5 }} />)}
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
  }
}

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Form.create<Step1Props>()(Step1));
