import { Button, Divider, Form, Input, Select, Spin, Cascader, DatePicker, Card ,Row} from 'antd';
import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import { userState, useEffect } from 'react';
import { queryFakeList } from '../../service';
import { withRouter } from 'react-router-dom';
import { async } from 'q';
import { cityCode } from '../../service';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
let province = [
  { value: 110000000000, label: '北京市', isLeaf: false },
  { value: 120000000000, label: '天津市', isLeaf: false },
  { value: 130000000000, label: '河北省', isLeaf: false },
  { value: 140000000000, label: '山西省', isLeaf: false },
  { value: 150000000000, label: '内蒙古自治区', isLeaf: false },
  { value: 210000000000, label: '辽宁省', isLeaf: false },
  { value: 220000000000, label: '吉林省', isLeaf: false },
  { value: 230000000000, label: '黑龙江省', isLeaf: false },
  { value: 310000000000, label: '上海市', isLeaf: false },
  { value: 320000000000, label: '江苏省', isLeaf: false },
  { value: 330000000000, label: '浙江省', isLeaf: false },
  { value: 340000000000, label: '安徽省', isLeaf: false },
  { value: 350000000000, label: '福建省', isLeaf: false },
  { value: 360000000000, label: '江西省', isLeaf: false },
  { value: 370000000000, label: '山东省', isLeaf: false },
  { value: 410000000000, label: '河南省', isLeaf: false },
  { value: 420000000000, label: '湖北省', isLeaf: false },
  { value: 430000000000, label: '湖南省', isLeaf: false },
  { value: 440000000000, label: '广东省', isLeaf: false },
  { value: 450000000000, label: '广西壮族自治区', isLeaf: false },
  { value: 460000000000, label: '海南省', isLeaf: false },
  { value: 500000000000, label: '重庆市', isLeaf: false },
  { value: 510000000000, label: '四川省', isLeaf: false },
  { value: 520000000000, label: '贵州省', isLeaf: false },
  { value: 530000000000, label: '云南省', isLeaf: false },
  { value: 540000000000, label: '西藏自治区', isLeaf: false },
  { value: 610000000000, label: '陕西省', isLeaf: false },
  { value: 620000000000, label: '甘肃省', isLeaf: false },
  { value: 630000000000, label: '青海省', isLeaf: false },
  { value: 640000000000, label: '宁夏回族自治区', isLeaf: false },
  { value: 650000000000, label: '新疆维吾尔自治区', isLeaf: false },
  { value: 7013135772653, label: '香港特别行政区', isLeaf: false },
  { value: 7112407077174, label: '澳门特别行政区', isLeaf: false },
  { value: 7212684281636, label: '台湾省', isLeaf: false },
];

let options = province;

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step1Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  queryagency: StateType['queryagency'];
}

class Step1 extends Component<Step1Props> {
  state = {
    data: [],
    data2: [],
    view: 'company',
    options: options,
    inputValue: '',
    inputValue2: '',
    inputValue3: '',
    inputValue4: '',
    areaCode: '',
    empty: '',
  };

  _onChange = (value, selectedOptions) => {
    console.log(value);
    this.setState({
      areaCode: value,
      // address: selectedOptions,
    });
    this.setState({
      inputValue: selectedOptions.map(o => o.label).join(', '),
    });
    const onChange = this.props.onChange;

    if (onChange) {
      onChange({ ...value });
    }
  };

  _onChange2 = (value, selectedOptions) => {
    console.log(value);
    this.setState({
      areaCode: value,
      // address: selectedOptions,
    });
    this.setState({
      inputValue2: selectedOptions.map(o => o.label).join(', '),
    });
    const onChange = this.props.onChange;

    if (onChange) {
      onChange({ ...value });
    }
  };
  _onChange3 = (value, selectedOptions) => {
    console.log(value);
    this.setState({
      areaCode: value,
      // address: selectedOptions,
    });
    this.setState({
      inputValue3: selectedOptions.map(o => o.label).join(', '),
    });
    const onChange = this.props.onChange;

    if (onChange) {
      onChange({ ...value });
    }
  };
  _onChange4 = (value, selectedOptions) => {
    console.log(value);
    this.setState({
      areaCode: value,
      // address: selectedOptions,
    });
    this.setState({
      inputValue4: selectedOptions.map(o => o.label).join(', '),
    });
    const onChange = this.props.onChange;

    if (onChange) {
      onChange({ ...value });
    }
  };

  _loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const id = targetOption.value;
    targetOption.loading = true;
    // debugger;
    if (selectedOptions.length == '1') {
      // 点击省,获取市
      const data1 = { condition: { parentCode: id }, size: 100, total: 100 };
      cityCode(data1).then(data => {
        // debugger;
        if (data.code == 0) {
          targetOption.loading = false;
          targetOption.children = [];
          data.result.records.map((item, index) => {
            // 拼出市
            targetOption.children.push({
              value: item.areaCode,
              label: item.name,
              isLeaf: false,
            });
          });
          this.setState({
            options: [...this.state.options],
          });
        }
      });
    } else if (selectedOptions.length == '2') {
      // 点击市,获取区
      const data1 = { condition: { parentCode: id }, size: 100, total: 100 };

      cityCode(data1).then(data => {
        if (data.code == 0) {
          targetOption.loading = false;
          targetOption.children = [];
          data.result.records.map((item, index) => {
            // 拼出市
            // debugger;
            targetOption.children.push({
              value: item.areaCode,
              label: item.name,
              isLeaf: true,
            });
          });
          this.setState({
            options: [...this.state.options],
          });
        }
      });
    } else {
      targetOption.loading = false;
    }
  };

  _resetLocation = () => {
    document.getElementsByClassName('ant-cascader-picker-clear')[0].click();
    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { form, dispatch, data, data1 } = this.props;
    console.log(data1);
    if (data1 === 'result') {
      this.setState({
        empty: ' ',
      });
    }
    console.log(form);
    if (!data) {
      return null;
    }
    const { getFieldDecorator, validateFields } = form;
    console.log('save data');
    console.log(form);
    console.log('save data');

    const onValidateForm = () => {
      validateFields((err: any, values: StateType['step']) => {

        let newVal = JSON.parse(JSON.stringify(values))
        let paywayType = newVal.paywayType;
        let signedRatio =newVal.signedRatio
console.log(signedRatio)
        let payload = {};

        if (paywayType == '1') {
          
          let aliCommissionAccount = newVal.aliCommissionAccount;
          let wxCommissionAccount = newVal.wxCommissionAccount;
          delete newVal.aliCommissionAccount;
          delete newVal.wxCommissionAccount;

          payload['appMerchantPaywayList'] = {
            paywayAccount: [aliCommissionAccount, wxCommissionAccount],
          };
         
         
        }
        
        payload['appMerchantSignedList'] = {
          paywayType,
          signedRatio
        },


        // payload['paywayType'] = paywayType;
        payload['appMerchantSettle'] = {
          openBankAccount: newVal.openBankAccount,settlementCardAddress: newVal.settlementCardAddress,
          settlementCardBank: newVal.settlementCardBank, settlementCardNo: newVal.settlementCardNo,
          settlementCardType:newVal.settlementCardType,settlementName:newVal.settlementName,
        };
        if (!err && dispatch) {
          dispatch({
            type: 'formAndstepForm/saveStepFormData',
            payload

             
             
          });
          dispatch({
            type: 'formAndstepForm/saveCurrentStep',
            payload: 'confirm',
          });
        }
      });
    };

    const agency = async e => {
      const data = { size: 10, total: 60 };
      const response = await queryFakeList(data);
      if (response) {
        this.setState({
          data2: response.result.records,
        });
      }
      console.log(response);
    };


    

    return (
      <Fragment>
          
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark >
      <Divider>支付通道信息 ：</Divider>
        <Form.Item
            style={{ marginBottom: 28, marginTop: 20 }}
            {...formItemLayout}
            label="支付通道类型"
            className={styles.stepForm}
            hideRequiredMark
          >
            {getFieldDecorator('paywayType', {
              rules: [{ required: true, message: '请选择通道类型' }],
            })(
              <Select placeholder="请选择证件类型"
              onChange={value => {
                if (value === '1') {
                  this.setState({ view: 'personal' });
                } else {
                  this.setState({ view: 'company' });
                }
              }}
              >
                <Option value="1">直连通道</Option>
                <Option value="2">间联通道</Option>
              
              </Select>,
            )}
          </Form.Item>

    <Form.Item {...formItemLayout}  label='签约费率'>
        {form.getFieldDecorator('signedRatio', {
          rules: [{ required: true,message: '必须输入签约费率'}],
        })(<Input  suffix="%" type="number"/>)}
      </Form.Item>


   
          {this.state.view === 'personal' ? (
            <>
          <Form.Item {...formItemLayout} label="支付宝签约账号">
            {getFieldDecorator('aliCommissionAccount', {
              initialValue: "",
              rules: [{ required: true, message: '请输入支付宝签约账号' }],
            })(<Input placeholder="请输入支付宝签约账号" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="微信签约账号">
            {getFieldDecorator('wxCommissionAccount', {
              initialValue: "",
              rules: [{ required: true, message: '请输入微信签约账号' }],
            })(<Input placeholder="请输入微信签约账号" />)}
              </Form.Item>
              </>
          ) : (
          ''    
  )}

          
          <Divider >商户结算信息：</Divider>
          

          <Form.Item
            style={{ marginBottom: 28, marginTop: 20 }}
            {...formItemLayout}
            label="账户类型"
            className={styles.stepForm}
            hideRequiredMark
          >
            {getFieldDecorator('settlementCardType', {
              rules: [{ required: true, message: '请选择证件类型' }],
            })(
              <Select placeholder="请选择证件类型">
                <Option value="1">对公</Option>
                <Option value="2">对私</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="账户卡号">
            {getFieldDecorator('settlementCardNo', {
              rules: [
                {
                  required: true,
                  message: '请输入公司银行账号',
                  pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                },
              ],
              getValueFromEvent: event => {
                return event.target.value.replace(/\D/g, '');
              },
              initialValue: "",
            })(<Input placeholder="请输入公司银行账号" />)}
              </Form.Item>
          <Form.Item {...formItemLayout} label="账户开户名">
            {getFieldDecorator('settlementName', {
              initialValue: "",
              rules: [{ required: true, message: '请输入开户支行' }],
            })(<Input placeholder="请输入开户支行" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="账户开户地">
            <Cascader
              options={this.state.options}
              loadData={this._loadData}
              onChange={this._onChange}
              changeOnSelect
              placeholder="请选择账户开户地"
            />
            {getFieldDecorator('settlementCardAddress', {
              initialValue: this.state.inputValue,
              rules: [{ required: true, message: '请选择账户开户地' }],
            })(<Input placeholder="请选择账户开户地" type="hidden" />)}
          </Form.Item>

          {/* <Form.Item {...formItemLayout} label="店铺地址">
            <Cascader
              options={this.state.options}
              loadData={this._loadData}
              onChange={this._onChange2}
              changeOnSelect
              placeholder="请选择店铺地址"
            />
            {getFieldDecorator('storeAddress', {
              initialValue: this.state.inputValue2,
              rules: [{ required: true, message: '请输入店铺地址' }],
            })(<Input placeholder="请输入店铺地址" type="hidden" />)}
          </Form.Item> */}

         

          <Form.Item
            onClick={agency}
            {...formItemLayout}
            label="开户银行"
            className={styles.stepForm}
            hideRequiredMark
            style={{ marginBottom: 25, marginTop: 20 }}
          >
            {getFieldDecorator('paywayBank', {
              rules: [{ required: true, message: '请选择开户银行' }],
            })(
              
              <Select placeholder="请选择开户银行">
                {this.state.data2.map((item, index) => (
                  <Option key={index} value={item.bankName}>
                    {item.bankName}
                  </Option>
                ))}
              </Select>,
             
            )}
          </Form.Item>
        

          <Form.Item {...formItemLayout} label="开户支行">
            {getFieldDecorator('paywaySubBank', {
              initialValue: "",
              rules: [{ required: true, message: '请输入开户支行' }],
            })(<Input placeholder="请输入开户支行" />)}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm} style={{ marginLeft: 150 }}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
  queryagency: formAndstepForm.queryagency,
  data1: formAndstepForm.current,
}))(Form.create<Step1Props>()(Step1));
