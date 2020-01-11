import { Alert, Button, Descriptions, Divider, Statistic, Form, Input,Upload ,Icon} from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step2Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = props => {
  const { form, data, dispatch, submitting } = props;
  
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  console.log()
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = () => {
    validateFields((err: any, values: StateType['step']) => {
      if (!err && dispatch) {
        dispatch({
          type: 'formAndstepForm/submitStepForm',
          payload: values,
        });
        dispatch({
          type: 'formAndstepForm/saveCurrentStep',
          payload: 'confirm',
        });
      }
    });
  };
  const fileList = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error',
    },
  ];
 const props1 = {
    action: 'server/api/file/upload',
    listType: 'picture',
    defaultFileList: [...fileList],
  };

  return (
    <div>
    <Upload {...props1}>
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    </Upload>
    <br />
      <Button type="primary" onClick={onValidateForm}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
  </div>
  );
};
export default connect(
  ({
    formAndstepForm,
    loading,
  }: {
    formAndstepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['formAndstepForm/submitStepForm'],
    data: formAndstepForm.step,
  }),
)(Form.create<Step2Props>()(Step2));
