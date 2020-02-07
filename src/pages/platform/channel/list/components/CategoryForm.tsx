import { Form, Input, Select, Button, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react';

const FormItem = Form.Item;
const { Option } = Select;

interface CategoryFormProps extends FormComponentProps {
  entity?: any;
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = props => {

  const [commissionRatioLabel, handleCommissionRatioLabel] = useState<string>('返佣比例');
  const [commissionRatioPlaceholder, handleCommissionRatioPlaceholder] = useState<string>('0-100的整数值');

  const { modalVisible, form, onSubmit: handleAdd, onCancel, entity } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      // 校验返佣比例值范围
      if(fieldsValue.commissionType === '1'){
        if(fieldsValue.commissionRatio < 0 || fieldsValue.commissionRatio > 100){
          form.setFields({
            "commissionRatio": {errors: [Error(commissionRatioPlaceholder)] }
          });
          return;
        }
      }else if(fieldsValue.commissionType === '2'){
        if(fieldsValue.commissionRatio < 0.001 || fieldsValue.commissionRatio > 0.4){
          form.setFields({
            "commissionRatio": {errors: [Error(commissionRatioPlaceholder)] }
          });
          return;
        }
      }
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
   
  const onChange = (value: any) => {
    if(value === '1'){
      handleCommissionRatioLabel('返佣比例');
      handleCommissionRatioPlaceholder('0-100的整数值');
    }else if(value === '2'){
      handleCommissionRatioLabel('返佣费率');
      handleCommissionRatioPlaceholder('0.001-0.4之间的小数');
    }
  }

  return (
    <Modal
      destroyOnClose
      title="添加代理类型"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={okHandle}>
          {entity ? '保存' : '添加'}
        </Button>,
      ]}
    >
      {entity ? (
        <div>
          {form.getFieldDecorator('channelType', { initialValue: entity.channelType })(<Input type="hidden" />)}
        </div>
      ) : null}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理类型">
        {form.getFieldDecorator('name', {
          initialValue: entity ? entity.name : '',
          rules: [{ required: true, message: '请输入代理类型！'}],
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="返佣类型">
        {form.getFieldDecorator('commissionType', {
          initialValue: entity ? String(entity.commissionType) : '1',
          rules: [{ required: true, message: '请选择返佣类型！'}],
        })(
          <Select
            showSearch
            style={{ width: '100%'}}
            placeholder="请选择返佣类型"
            onChange={onChange}
          >
            <Option value="1">固定比例</Option>
            <Option value="2">固定费率</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={commissionRatioLabel}>
        {form.getFieldDecorator('commissionRatio', {
          initialValue: entity ? entity.commissionRatio : '',
          rules: [{ required: true, message: `请输入${commissionRatioPlaceholder}！`}],
        })(<Input placeholder={commissionRatioPlaceholder} suffix="%" type="number"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理金额">
        {form.getFieldDecorator('agentMoney', {
          initialValue: entity ? entity.agentMoney : '',
          rules: [{}],
        })(<Input placeholder="" suffix="元" type="number"/>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CategoryFormProps>()(CategoryForm);
