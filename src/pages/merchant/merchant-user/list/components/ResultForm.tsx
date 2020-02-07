import { Form, Input, Modal, Divider, Result, Button } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface ResultFormProps extends FormComponentProps {
  entity?: any;
  resultOrder?: any;
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const ResultForm: React.FC<ResultFormProps> = props => {

  const { modalVisible, form, onSubmit: refundOrder, onCancel, entity, resultOrder } = props;
  // alert({this.props.window.currentUser});
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      refundOrder(fieldsValue);
    });
  };

  if((resultOrder ? resultOrder.code : '') === 0){
    return (
      <Modal
        destroyOnClose
        title="退款结果"
        visible={modalVisible}
        // onOk={okHandle}
        onCancel={() => onCancel()}
        footer={[
          <Button key="back" onClick={onCancel}>
            返回
          </Button>,
        ]}
      >
        <Result
          status="success"
          title="退款申请已提交!"
          subTitle="等待支付宝结果"
        // extra={[
        //   <Button type="primary" key="console">
        //     Go Console
        //   </Button>,
        //   <Button key="buy">Buy Again</Button>,
        // ]}
        />
  
      </Modal>
    );

  }else{
    return (
      <Modal
        destroyOnClose
        title="退款结果"
        visible={modalVisible}
        // onOk={okHandle}
        onCancel={() => onCancel()}
        footer={[
          <Button key="back" onClick={onCancel}>
            返回
          </Button>,
        ]}
      >
        <Result
          status="error"
          title="退款失败!"
          subTitle={resultOrder ? resultOrder.message : ''}
        // extra={[
        //   <Button type="primary" key="console">
        //     Go Console
        //   </Button>,
        //   <Button key="buy">Buy Again</Button>,
        // ]}
        />
  
      </Modal>
    );
  }

  
};

export default Form.create<ResultFormProps>()(ResultForm);
