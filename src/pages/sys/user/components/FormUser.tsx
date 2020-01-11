import { Form, Button, Input, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;
const { Option } = Select;

interface FormUserProps extends FormComponentProps {
  onSubmit: (fieldsValue: {}) => void;
  onClose: () => void;
  type: string;
  entity?: any;
  roles?: any;
}

const FormUser: React.FC<FormUserProps> = props => {
  const { form, onSubmit: handleAdd, onClose, type, entity, roles } = props;

  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      delete fieldsValue.loginPwdR;
      handleAdd(fieldsValue);
    });
  };

  const handleChange = value => {
    if (entity && entity.roleIds) {
      entity.roleIds = value;
    }
  };
  const children = [];
  for (let k = 0; k < roles.length; k += 1) {
    const role = roles[k];
    children.push(<Option key={role.roleId}>{role.roleName}</Option>);
  }

  const projects = [];
  projects.push(<Option key={1}>超级管理员系统</Option>);
  projects.push(<Option key={2}>北诺科技</Option>);

  const userTypeRadio = (userType: number) => {
    if (userType === 1) {
      return (
        <Radio.Group>
          <Radio value="1">超级管理员</Radio>
          <Radio value="2">平台管理员</Radio>
          <Radio value="0">普通用户</Radio>
        </Radio.Group>
      );
    }
    if (userType === 2) {
      return (
        <Radio.Group>
          <Radio value="2">平台管理员</Radio>
          <Radio value="0">普通用户</Radio>
        </Radio.Group>
      );
    }
    return <></>;
  };

  return (
    <Form>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="用户类型">
        {form.getFieldDecorator('userType', {
          initialValue: entity ? String(entity.userType) : '0',
          rules: [],
        })(userTypeRadio(window.currentUser.userType))}
      </FormItem>

      {window.currentUser.userType === 1 ? (
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="选择平台">
          {form.getFieldDecorator('projectId', { initialValue: entity ? entity.projectId : [] })(
            <Select style={{ width: '100%' }} placeholder="选择平台" onChange={handleChange}>
              {projects}
            </Select>,
          )}
        </FormItem>
      ) : null}

      {window.currentUser.userType === 2 ? (
        <>
        {getFieldDecorator('projectId', { initialValue: window.currentUser.projectId })(
          <Input type="hidden" />,
        )}
        </>
      ) : null}

      {entity ? (
        <div>
          {getFieldDecorator('userId', { initialValue: entity.userId })(<Input type="hidden" />)}
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="用户名">
            {form.getFieldDecorator('loginId', {
              initialValue: entity ? entity.loginId : '',
              rules: [{ required: true, message: '请输入用户账户!' }],
            })(<Input placeholder="请输入用户账户" readOnly />)}
          </FormItem>
        </div>
      ) : (
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="用户名">
          {form.getFieldDecorator('loginId', {
            initialValue: entity ? entity.loginId : '',
            rules: [{ required: true, message: '请输入用户账户!' }],
          })(<Input placeholder="请输入用户账户" />)}
        </FormItem>
      )}

      {type === 'create' ? (
        <div>
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
        </div>
      ) : null}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="角色分配">
        {form.getFieldDecorator('roleIds', { initialValue: entity ? entity.roleIds : [] })(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择用户角色"
            onChange={handleChange}
          >
            {children}
          </Select>,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="邮箱">
        {form.getFieldDecorator('email', { initialValue: entity ? entity.email : '', rules: [] })(
          <Input placeholder="请输入邮箱" />,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="手机号">
        {form.getFieldDecorator('phone', { initialValue: entity ? entity.phone : '', rules: [] })(
          <Input placeholder="请输入手机号" />,
        )}
      </FormItem>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={okHandle} type="primary">
          {type === 'create' ? '提交' : '保存'}
        </Button>
      </div>
    </Form>
  );
};

export default Form.create<FormUserProps>()(FormUser);
