import { Form, Button, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormRoleProps extends FormComponentProps {
  onSubmit: (fieldsValue: {}) => void;
  onClose: () => void;
  type: string;
  entity?: any;
}

const FormRole: React.FC<FormRoleProps> = props => {
  const { form, onSubmit: handleAdd, onClose, type, entity } = props;

  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Form>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="角色名">
        {form.getFieldDecorator('roleName', {
          initialValue: entity ? entity.roleName : '',
          rules: [{ required: true, message: '请输入角色名称!' }],
        })(<Input placeholder="请输入角色名称" />)}
      </FormItem>

      {entity ? (
        <div>
          {getFieldDecorator('roleId', { initialValue: entity.roleId })(<Input type="hidden" />)}
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="角色编码">
            {form.getFieldDecorator('roleCode', {
              initialValue: entity ? entity.roleCode : '',
              rules: [{ required: true, message: '请输入角色编码!' }],
            })(<Input placeholder="请输入角色编码" readOnly />)}
          </FormItem>
        </div>
      ) : (
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="角色编码">
          {form.getFieldDecorator('roleCode', {
            initialValue: entity ? entity.roleCode : '',
            rules: [{ required: true, message: '请输入角色编码!' }],
          })(<Input placeholder="请输入角色编码" />)}
        </FormItem>
      )}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="描述">
        {form.getFieldDecorator('description', {
          initialValue: entity ? entity.description : '',
          rules: [],
        })(<TextArea placeholder="请输入描述" autoSize={{ minRows: 5, maxRows: 5 }} />)}
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

export default Form.create<FormRoleProps>()(FormRole);
