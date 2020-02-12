import { Button, Statistic, Form, Input, Upload, Icon, message, Modal, Card, Row } from 'antd';
import request from '@/utils/request';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React, { Component } from 'react';
import { connect } from 'dva';
import { StateType } from '../../model';
import { UploaderComponent } from '../../../components/uploader';
import styles from './index.less';
import { async } from 'q';
import { file } from '@babel/types';
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

class Step2 extends Component<Step2Props> {
  //营业执照
  change_yingyezhizhao = (value: string) => {
    this.props.dispatch({
      type: 'formAndstepForm/saveStepFormData',
      payload: { businessLicenseAuthPic: value },
    });
  };
  //法人身份正面
  change_farenzhengmian = (value: string) => {
    this.props.dispatch({
      type: 'formAndstepForm/saveStepFormData',
      payload: { legalIdentityCardFront: value },
    });
  };
  //法人身份反面
  change_farenfanmian = (value: string) => {
    this.props.dispatch({
      type: 'formAndstepForm/saveStepFormData',
      payload: { legalIdentityCardBack: value },
    });
  };

  //门头照片
  change_mentouzhaopian = (value: string) => {
    this.props.dispatch({
      type: 'formAndstepForm/saveStepFormData',
      payload: { storeFront: value },
    });
  };

  //   change_dianpu1 = (value: string) => {
  //     this.props.dispatch({type:'formAndstepForm/saveStepFormData',payload:{}})
  //   }

  //   change_dianpu2 = (value: string) => {
  //     this.props.dispatch({type:'formAndstepForm/saveStepFormData',payload:{}})
  //   }

  //   change_dianpu3 = (value: string) => {
  //     this.props.dispatch({type:'formAndstepForm/saveStepFormData',payload:{}})
  //   }

  // change_hangye = (value: string) => {
  //   this.props.dispatch({type:'formAndstepForm/saveStepFormData',payload:{}})
  // }

  // changeExamplePic
  render() {
    console.log(this.state);
    const { form, data, dispatch } = this.props;

    if (!data) {
      return null;
    }
    const { validateFields, getFieldsValue } = form;
    const onPrev = () => {
      
      if (dispatch) {
        const values = getFieldsValue();
        console.log(values);
        
        dispatch({
          type: 'formAndstepForm/saveStepFormData',
          payload: {
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
      console.log(this.props.form);
      validateFields((err: any, values: StateType['step']) => {
        if (!err && dispatch) {
          dispatch({
            type: 'formAndstepForm/saveStepFormData',
            payload: values,
          });
          dispatch({
            type: 'formAndstepForm/saveCurrentStep',
            payload: 'confirm2',
          });
        }
      });
    };

    return (
      <Row className={styles.row}>
        <UploaderComponent title={'营业执照'} onChange={this.change_yingyezhizhao} />
        <UploaderComponent title={'法人身份证正面'} onChange={this.change_farenzhengmian} />
        <UploaderComponent title={'法人身份证反面'} onChange={this.change_farenfanmian} />
        <UploaderComponent title={'门头照片'} onChange={this.change_mentouzhaopian} />
        <UploaderComponent title={'店铺内景1'}  />
        <UploaderComponent title={'店铺内景2'}  />
        <UploaderComponent title={'店铺内景3'}  />
        <UploaderComponent title={'行业许可证'}  />
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          营业执照：选择示例图片查看大图提示：请保持图片内容清晰，格式支持jpg、jepg、png、bmp格式，文件大写不超过5M
        </div>
        <Button onClick={onPrev} style={{ marginLeft: 200 }}>
          上一步
        </Button>
        <Button type="primary" onClick={onValidateForm} style={{ marginLeft: 150 }}>
          下一步
        </Button>
      </Row>
    );
  }
}

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
