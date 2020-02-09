import { Form, Icon, Input, Card, message, Button, Row, Col } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { router } from 'umi';

const FormItem = Form.Item;
import { StateType } from '../../model';
import styles from './index.less';

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

class Step3 extends Component<Step3Props> {
  state = {
    value1: '',
    value2: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleMaxBackUp = () => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState(() => ({ value1: value }));
    }
  };
  //在输入框发生变化的时候修改状态的值
  handleMaxRestoreUp = e => {
    if (event && event.target && event.target.value) {
      let value = event.target.value;
      this.setState(() => ({ value2: value }));
    }
    e.preventDefault();
  };

  render() {
    const { data, dispatch } = this.props;
    console.log('rednder formData');
    console.log(data);
    console.log('rednder formData');

    const { username } = this.state.value1;
    const { getFieldDecorator, getFieldsValue, validateFields } = this.props.form;

    const onPrev = (e: React.FormEvent) => {
      validateFields((err: any, values: StateType['step']) => {
        if (!err && dispatch && values) {
          const values = getFieldsValue();
          dispatch({
            type: 'formAndstepForm/submitStepForm',
            payload: {
              ...data,
              accountInfo: {
                password: this.state.value2,
                roleId: '',
                roleType: 0,
                storeId: '77ww7',
                sysUserId: '123',
                userId: '',
                username: this.state.value1,
              },
              // address: '',
              appMerchantPaywayList: [
                {
                  createBy: '',
                  createTime: '',
                  isDeleted: true,
                  merchantId: '123',
                  paywayAccount: '123',
                  paywayBank: '123',
                  paywayCity: '123',
                  paywaySubBank: '123',
                  paywayType: 0,
                  status: 0,
                },
              ],
              appMerchantSignedList: [],
              // legalName: '1',
              merchantCode: '1',
              merchantId: '1',
            },
          });
        }
      });
    };

    const onPrev3 = () => {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'formAndstepForm/saveCurrentStep',
          payload: 'info',
        });
      }
    };
    return (
     
       
          <Form labelCol={{ span: 9 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="用户初始账号">
              
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的用户名，由字母数字组成!',
                    // pattern: new RegExp(/^[0-9,a-z]\d*$/, "g"),
                  },
                ],
                getValueFromEvent: event => {
                  return event.target.value.replace(/[\u4E00-\u9FA5]/g, '');
                },
                initialValue: '',
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入初始账号"
                  onChange={event => this.handleMaxBackUp(event)}
                  style={{width:350}}
                />,
              )}
            </Form.Item>

            <Form.Item label="用户初始密码">
              {getFieldDecorator('请输入初始密码', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                  onChange={event => this.handleMaxRestoreUp(event)}
                  style={{width:350}}
                />,
              )}
        </Form.Item>
        
        <Row>
          <Col span={14} style={{ textAlign: 'right' }}>
            <Button
          type="primary"
          onClick={onPrev}
          style={{width:97}}
        >
          添加
        </Button>
        
        
        <Button
          type="primary"
          onClick={onPrev3} 
          style={{marginLeft:100}}
        >
          取消添加
        </Button>
        </Col>
        </Row>
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
  }) => {
    console.log(formAndstepForm);
    return {
      submitting: loading.effects['formAndstepForm/submitStepForm'],
      data: formAndstepForm.step,
    };
  },
)(Form.create<Step3Props>()(Step3));
