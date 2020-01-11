import { Form, Input, Modal, Select, Steps } from 'antd';
const { Option } = Select;
import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="添加代理商分类"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理名称">
        {form.getFieldDecorator('channelName', {
          rules: [{ required: true, message: '代理名称！' }],
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理类型">
        {form.getFieldDecorator('commissionType', {
          rules: [{ required: true, message: '代理类型！' }],
        })(
          <Select style={{ width: '100%' }}>
            <Option value="1">固定比例</Option>
            <Option value="2">固定费率</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="返佣比例">
        {form.getFieldDecorator('commissionRatio', {
          rules: [{ required: true, message: '返佣比例！' }],
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理金额">
        {form.getFieldDecorator('agentMoney', {
          rules: [{ required: true, message: '代理金额！' }],
        })(<Input placeholder="" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
