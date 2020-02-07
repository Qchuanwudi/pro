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

class UpdateForm extends React.Component<UpdateFormProps> {
  state = {
    labelV: '返佣比例',
    message2: '请输入',
    type : '',
  };

  show = () => {
    if (this.state.labelV === '返佣比例') {
      if (commissionRatio.value > 0 && commissionRatio.value <= 100) {
      } else {
        alert('请输入0-100之间的小数');
        // debugger;
        this.setState({
          message2: '请输入0-100之间的小数',
        });
      }
    } else {
      if (commissionRatio.value >= 0.001 && commissionRatio.value <= 0.4) {
      } else {
        alert('请输入0.001-0.4之间的小数');
        this.setState({
          message2: '请输入0.001-0.4之间的小数',
        });
      }
    }
  };
  render() {
    const { modalVisible, form, onSubmit: handleAdd, onCancel , entity} = this.props;

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
        title="添加代理商分类"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => onCancel()}
      >
        {/* <Input type="hidden" name = "channelType" value = {entity.channelType} />} */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={this.state.type}>
          {form.getFieldDecorator('channelType', {
            initialValue: entity ? entity.channelType : '',
            // rules: [{ required: true, message: '代理名称！' }],
          })(<Input placeholder="" type = "hidden"/>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理名称">
          {form.getFieldDecorator('name', {
            initialValue: entity ? entity.name : '',
            rules: [{ required: true, message: '代理名称！' }],
          })(<Input placeholder="" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理类型">
          {form.getFieldDecorator('commissionType', {
            // initialValue: entity ? (entity.commissionType === 1 ? '返佣比例' : '返佣费率') : '',
            rules: [{ required: true, message: '代理类型！' }],
          })(
            <Select 
              style={{ width: '100%' }}
              onChange={value => {
                this.setState({ labelV: value === '1' ? '返佣比例' : '返佣费率' });
              }}
            >
              <Option value="1" >固定比例</Option>
              <Option value="2">固定费率</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={this.state.labelV}>
          {form.getFieldDecorator('commissionRatio', {
            initialValue: entity ? entity.commissionRatio : '',
            rules: [{ required: true, message: this.state.message2 }],
            // rules: [{
            //   required: true,
            //   // pattern: this.state.feilv,
            //   message: this.state.message2,
            //   // pattern: new RegExp( /(^0.4$|^0(\.\d{1,3})?$)[0-9]*/),
            //   // message: '请输入0.001-0.4之间的小数'

            // }],
          })(<Input placeholder="" onChange={this.show} />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理金额">
          {form.getFieldDecorator('agentMoney', {
            initialValue: entity ? entity.agentMoney : '',
            rules: [{
              pattern: new RegExp(/^[0-9]\d*$/, "g"),
              required: true, message: '请输入纯数字',
            }],
          })(<Input placeholder="" />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
