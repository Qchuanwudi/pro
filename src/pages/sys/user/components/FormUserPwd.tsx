import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface FormUserPwdProps extends FormComponentProps {
  entity?: any;
  roles?: any;
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const FormUserPwd: React.FC<FormUserPwdProps> = props => {
  const { entity, modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      delete fieldsValue.loginPwdR;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="重新设定密码"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form>
        {getFieldDecorator('userId', { initialValue: entity ? entity.userId : '' })(
          <Input type="hidden" />,
        )}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="用户名">
          {form.getFieldDecorator('loginId', {
            initialValue: entity ? entity.loginId : '',
            rules: [{ required: true, message: '请输入用户账户!' }],
          })(<Input placeholder="请输入用户账户" readOnly />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="登录密码">
          {form.getFieldDecorator('loginPwd', {
            rules: [{ required: true, message: '密码由8位数字、大小写字母和特殊符号组成!' }],
          })(<Input type="password" placeholder="请输入登录密码" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="确认密码">
          {form.getFieldDecorator('loginPwdR', {
            rules: [
              { required: true, message: '请重新输入登录密码!' },
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
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(FormUserPwd);
