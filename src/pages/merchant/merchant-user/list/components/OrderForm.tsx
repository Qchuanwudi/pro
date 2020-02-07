import { Form, Input, Modal, Divider } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface OrderFormProps extends FormComponentProps {
  entity?: any;
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = props => {

  const { modalVisible, form, onSubmit: refundOrder, onCancel, entity } = props;
  // alert({this.props.window.currentUser});
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      refundOrder(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="退款订单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="订单号">
        {form.getFieldDecorator('orderNo', {
          initialValue: entity ? entity.orderNo : '',
        })(<Input placeholder="" type = 'hidden'/>)}{entity ? entity.orderNo : ''}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="交易时间">
        {form.getFieldDecorator('createTime', {
        })}{entity ? entity.createTime : ''}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="支付渠道">
        {form.getFieldDecorator('orderSource', {
        })}
        {(entity ? (entity.orderSource) : '') === 1 ? (
          <>支付宝</>
        ) : null}
        {(entity ? (entity.orderSource) : '') === 2 ? (
          <>微信</>
        ) : null}
        {(entity ? (entity.orderSource) : '') === 3 ? (
          <>银行卡</>
        ) : null}
        {(entity ? (entity.orderSource) : '') === 4 ? (
          <>第三方</>
        ) : null}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品信息">
        {form.getFieldDecorator('subject', {
        })}{entity ? entity.subject : ''}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="订单金额">
        {form.getFieldDecorator('totalAmount', {
          // initialValue: entity ? entity.totalAmount : '',
        })(<Input placeholder="" type = 'hidden'/>)}{entity ? entity.totalAmount : ''}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="实付金额">
        {form.getFieldDecorator('buyerPayAmount', {
        })}{entity ? entity.buyerPayAmount : ''}
      </FormItem>
      <Divider style={{ marginBottom: 32 }} />
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="退款金额">
        {form.getFieldDecorator('buyerPayAmount', {
          // initialValue: entity ? entity.buyerPayAmount : '',
          // rules: [{ required: true, message: '请输入！', min: 5, max: 32 }],
        })(<Input placeholder="" type="hidden" />)}{entity ? entity.buyerPayAmount : ''}
      </FormItem>
    </Modal>
  );
};

export default Form.create<OrderFormProps>()(OrderForm);
