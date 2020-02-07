import { Button, Divider, Form, Input, Select } from 'antd';
import React, { Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import { queryChannel } from "../../service";

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
class Step1 extends React.Component<Step1Props> {
  state = {
    channelName: '企业名称',
    legalIdNumber: '营业执照号',
    data: [],
    data2: [],
  };

  render() {
    // const Step1: React.FC<Step1Props> = props => {
    const { form, dispatch, data } = this.props;
    if (!data) {
      return null;
    }
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err: any, values: StateType['step']) => {
        if (!err && dispatch) {
          dispatch({
            type: 'channelAddForm/saveStepFormData',
            payload: values,
          });
          dispatch({
            type: 'channelAddForm/saveCurrentStep',
            payload: 'confirm',
          });
        }
      });
    };

    const agency = async (e) => {
      const data = { size: 100, total: 0, }
      const response = await queryChannel(data)
      if (response) {
        this.setState({
          data2: response.result.records
        })
      }
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item
            {...formItemLayout}
            label="代理类型"
            className={styles.stepForm}
          >
            {getFieldDecorator('channelAttribute', {
              initialValue: data.channelAttribute,
              rules: [{ required: true, message: '请选择代理类型' }],
            })(
              <Select
                style={{ width: '100%' }}
                onChange={value => {
                  this.setState({
                    channelName: value === '2' ? '企业名称' : '姓名',
                    legalIdNumber: value === '2' ? '营业执照号' : '身份证号',
                  });
                }}
              >
                <Option value="1">个人</Option>
                <Option value="2">企业</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="推荐人"
            onClick={agency}
            className={styles.stepForm}>
            {getFieldDecorator('referrer', {
              // rules: [{ required: true, message: '请选择推荐人' }],
            })(<Select placeholder="请选择推荐人" style={{ width: '100%' }}>
              {this.state.data2.map((item, index) => <Option key={index} value={item.channelName}>{item.channelName}</Option>)}
            </Select>)}
          </Form.Item>

          <Form.Item {...formItemLayout} label={this.state.channelName}>
            {getFieldDecorator('channelName', {
              initialValue: data.channelName,
              rules: [{ required: true, max: 50, message: '请输入企业名称' }],
            })(<Input placeholder="请输入企业名称" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={this.state.legalIdNumber}>
            {getFieldDecorator('legalIdNumber', {
              initialValue: data.legalIdNumber,
              rules: [{
                required: true, max: 45, message: '请输入营业执照号，由字母数字组成!',
              }],
              getValueFromEvent: (event) => {
                return event.target.value.replace(/[\u4E00-\u9FA5]/g, '')
              },
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="联系人">
            {getFieldDecorator('contact', {
              initialValue: data.contact,
              rules: [{ required: true, max: 50, message: '请输入联系人' }],
            })(<Input placeholder="请输入联系人" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="联系电话">
            {getFieldDecorator('phone', {
              initialValue: data.phone,
              rules: [{

                pattern: new RegExp(/^[1][3,4,5,6,7,8][0-9]{9}$/, "g"),
                // pattern: new RegExp(/^[0-9]\d*$/, "g"),
                required: true, message: '请输入有效手机号码',
              }],
            })(<Input placeholder="请输入联系电话" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="联系地址">
            {getFieldDecorator('address', {
              initialValue: data.address,
              rules: [{ required: true, max: 150, message: '请输入联系地址' }],
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
            {/* <a href = 'https://pro.ant.design/docs/getting-started-cn'>baidu</a> */}
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default connect(({ channelAddForm }: { channelAddForm: StateType }) => ({
  data: channelAddForm.step,
  queryagency: channelAddForm.queryagency,
}))(Form.create<Step1Props>()(Step1));
