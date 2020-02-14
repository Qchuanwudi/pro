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

const needUpLoadList = [
  {
    id: '01',
    title: '营业执照',
  },
  {
    id: '05',
    title: '法人身份证正面',
  },
  {
    id: '06',
    title: '法人身份证反面',
  },
  {
    id: '02',
    title: '税务登记证号',
  },
  {
    id: '20',
    title: '门头照',
  },
  {
    id: '03',
    title: '组织机构代码证',
  },
  {
    id: '04',
    title: '开户许可证',
  },
  {
    id: '07',
    title: '结算人身份证正面',
  },
  {
    id: '08',
    title: '结算人身份证反面',
  },
  {
    id: '09',
    title: '商务协议',
  },
  {
    id: '10',
    title: '公司照片',
  },
];

class Step2 extends Component<Step2Props> {
  public constructor(props: Step2Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initState();
  }

  // 初始化状态
  initState() {
    let initState = {};
    needUpLoadList.forEach((v, i) => {
      initState[v.id] = '';
    });
    this.setState(initState);
  }

  // 上传图片后的方法
  onUploadChange = (value: Object) => {
    this.setState(value);
  };

  // changeExamplePic
  render() {
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
      validateFields((err: any, values: StateType['step']) => {
        if (!err && dispatch) {
          let appMerchantFileList = [];

          let selfState = this.state;

          for (const key in selfState) {
            let val = selfState[key];
            if (val) {
              appMerchantFileList.push({
                attachType: key,
                attachPic: val,
              });
            }
          }

          dispatch({
            type: 'formAndstepForm/saveStepFormData',
            payload: { appMerchantFileList },
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
        {needUpLoadList.map((v, i) => (
          <UploaderComponent
            title={v.title}
            key={i}
            field={v.id}
            onChange={this.onUploadChange}
            onDelete={this.onUploadChange}
          />
        ))}
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