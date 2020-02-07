import { Form, Input, Modal, Select, Steps } from 'antd';
const { Option } = Select;
import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface UpdateFormProps extends FormComponentProps {
  modalVisible: boolean;
  entity: any;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
  // labelText:string;
}
const UpdateForm: React.FC<UpdateFormProps> = props => {
  // show = () => {
  //   if (this.state.labelV === '返佣比例') {
  //     if (commissionRatio.value > 0 && commissionRatio.value <= 100) {
  //     } else {
  //       alert('请输入0-100之间的小数');
  //       // debugger;
  //       this.setState({
  //         message2: '请输入0-100之间的小数',
  //       });
  //     }
  //   } else {
  //     if (commissionRatio.value >= 0.001 && commissionRatio.value <= 0.4) {
  //     } else {
  //       alert('请输入0.001-0.4之间的小数');
  //       this.setState({
  //         message2: '请输入0.001-0.4之间的小数',
  //       });
  //     }
  //   }
  // };

  const { modalVisible, form, onSubmit: handleAdd, onCancel, entity } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  // this.setState({
  //   channelType: entity.channelType,
  // });
  return (
    <Modal
      destroyOnClose
      title="编辑商户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      {/* <Input type="hidden" name = "channelType" value = {entity.channelType} />} */}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商户名称">
        {form.getFieldDecorator('name', {
          initialValue: entity ? entity.merchantName : '',
          rules: [{ required: true, message: '代理名称！' }],
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="行业类别">
        {form.getFieldDecorator('commissionType', {
          initialValue: entity ? entity.industryCode : '',
          rules: [{ required: true, message: '代理类型！' }],
        })(<Input placeholder="" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系人">
        {form.getFieldDecorator('agentMoney', {
          initialValue: entity ? entity.legalName : '',
          rules: [
            {
              required: true,
            },
          ],
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系电话">
        {form.getFieldDecorator('agentPhone', {
          initialValue: entity ? entity.phone : '',
          rules: [
            {
              pattern: new RegExp(/^[0-9]\d*$/, 'g'),
              required: true,
              message: '请输入纯数字',
            },
          ],
        })(<Input placeholder="" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
