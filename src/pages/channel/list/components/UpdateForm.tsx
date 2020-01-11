import { Button, Form, Input, Modal, Select, Steps } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {

  userId?: string;//userID
  channelAttribute?: string; //代理类型(1=个人，2=公司)
  channelId?: string; //所属代理
  channelName?: string; //企业名称
  channelType?: string; //代理类型
  referrer?: string; //推荐人
  status?: number;
  legalIdNumber?: string; //证件号码
  contact?: string; //联系人
  phone?: string; //联系电话
  address?: string; //联系地址
  aliCommissionAccount?: string; //支付号佣账号
  wxCommissionAccount?: string; //微信佣账号
  bankCommissionAccount?: string; //银行佣账号
  thirdCommissionAccount?: string; //第三方佣账号
  commissionRatio?: string;//返佣比例
  loginId?: string; //账号
  loginPwd?: string; //密码
  // target?: string;
  // template?: string;
  // type?: string;
  // time?: string;
  // frequency?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => { },
    handleUpdateModalVisible: () => { },
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        // channelId: props.values.channelId,
        // channelName: props.values.channelName,
        // target: '0',
        // template: '0',
        // type: '1',
        // time: '',
        // frequency: 'month',
      },
      currentStep: 0,
    };
  }

  handleNext = (currentStep: number) => {
    const { form, onSubmit: handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        },
      );
    });
  };

  backward = () => {
    debugger;
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    debugger;
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep: number, formVals: FormValueType) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [

        <FormItem key="target" {...this.formLayout} label="代理商类型">
          {form.getFieldDecorator('channelType', {
            initialValue: formVals.channelType,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="ca49ebcebc3843dc84cc68db3801808c">A黄金代理</Option>
              <Option value="fb739c0bd8e248889fb31456526c74f2">B黄金代理</Option>
              <Option value="304bd55d4401438a969c9ade494b19bb">C黄金代理</Option>
              <Option value="1dee179882e1480fb7557b6c990edc4b">D黄金代理</Option>
            </Select>,
          )}
        </FormItem>,
        <FormItem key="name" {...this.formLayout} label="返佣类型">
          {form.getFieldDecorator('commissionType', {
            // rules: [{ required: true, message: '请输入返佣类型！' }],
            initialValue: formVals.commissionType,
          })(<Input placeholder="请输入" />)}
        </FormItem>,

        <FormItem key="name" {...this.formLayout} label="返佣比例">
          {form.getFieldDecorator('commissionRatio', {
            // rules: [{ required: true, message: '请输入返佣比例！' }],
            initialValue: formVals.commissionRatio,
          })(<Input placeholder="请输入" />)}
        </FormItem>,
        <FormItem key="name" {...this.formLayout} label="支付宝账号">
          {form.getFieldDecorator('aliCommissionAccount', {
            // rules: [{ required: true, message: '请输入规则名称！' }],
            initialValue: formVals.aliCommissionAccount,
          })(<Input placeholder="请输入" />)}
        </FormItem>,
        <FormItem key="name" {...this.formLayout} label="微信账号">
          {form.getFieldDecorator('wxCommissionAccount', {
            // rules: [{ required: true, message: '请输入规则名称！' }],
            initialValue: formVals.wxCommissionAccount,
          })(<Input placeholder="请输入" />)}
        </FormItem>,
        <FormItem key="name" {...this.formLayout} label="银行卡账号">
          {form.getFieldDecorator('bankCommissionAccount', {
            // rules: [{ required: true, message: '请输入规则名称！' }],
            initialValue: formVals.bankCommissionAccount,
          })(<Input placeholder="请输入" />)}
        </FormItem>,
        <FormItem key="name" {...this.formLayout} label="第三方账号">
          {form.getFieldDecorator('thirdCommissionAccount', {
            // rules: [{ required: true, message: '请输入规则名称！' }],
            initialValue: formVals.thirdCommissionAccount,
          })(<Input placeholder="请输入" />)}
        </FormItem>,

      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="name" {...this.formLayout} label="账号">
          {form.getFieldDecorator('loginId', {
            rules: [{ required: true, message: '请输入规则名称！' }],
            initialValue: formVals.loginId,
          })(<Input placeholder="请输入" />)}
        </FormItem>,
        <FormItem key="name" {...this.formLayout} label="密码">
          {form.getFieldDecorator('loginPwd', {
            rules: [{ required: true, message: '请输入规则名称！' }],
            initialValue: formVals.loginPwd,
          })(<Input placeholder="请输入" />)}
        </FormItem>,

      ];
    }
    return [



      <FormItem key="target" {...this.formLayout} label="代理类型">
        {form.getFieldDecorator('channelAttribute', {
          initialValue: formVals.channelAttribute,
        })(
          <Select style={{ width: '100%' }}>
            <Option value="2">企业</Option>
            <Option value="1">个人</Option>
          </Select>,
        )}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="推荐人">
        {form.getFieldDecorator('referrer', {
          // rules: [{ required: true, message: '请输入推荐人！' }],
          initialValue: formVals.referrer,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="企业名称">
        {form.getFieldDecorator('channelName', {
          rules: [{ required: true, message: '请输入企业名称！' }],
          initialValue: formVals.channelName,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="营业执照号">
        {form.getFieldDecorator('legalIdNumber', {
          // rules: [{ required: true, message: '请输入营业执照号！' }],
          initialValue: formVals.legalIdNumber,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="联系人">
        {form.getFieldDecorator('contact', {
          rules: [{ required: true, message: '请输入联系人！' }],
          initialValue: formVals.contact,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="联系电话">
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入联系电话！' }],
          initialValue: formVals.phone,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="联系地址">
        {form.getFieldDecorator('address', {
          rules: [{ required: true, message: '请输入联系地址！' }],
          initialValue: formVals.address,
        })(<Input placeholder="请输入" />)}
      </FormItem>,

    ];
  };

  renderFooter = (currentStep: number) => {
    const { onCancel: handleUpdateModalVisible, values } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, onCancel: handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={1000}

        bodyStyle={{ padding: '32px 40px 48px', height: 700 }}
        destroyOnClose
        title="添加代理商"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="返佣信息" />
          <Step title="账号信息" />
          {/* <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" /> */}
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
