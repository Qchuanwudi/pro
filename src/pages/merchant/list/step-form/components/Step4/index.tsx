import { Button, Result, Descriptions, Statistic } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import { router } from 'umi';
interface Step4Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}
class Step4 extends Component<Step4Props> {
  render() {
    const { data, dispatch } = this.props;
    if (!data) {
      return null;
    }
    const { payAccount, receiverAccount, receiverName, amount } = data;
    const onFinish = () => {
      if (dispatch) {
        dispatch({
          type: 'formAndstepForm/saveCurrentStep',
          payload: 'info',
        });
      }
    };


    const onFinish2 = () =>{
            
      router.push('/platform/merchant/list')
    }


    const information = (
      <div className={styles.information}>
        {/* <Descriptions column={1}>
          <Descriptions.Item label="付款账户"> {payAccount}</Descriptions.Item>
          <Descriptions.Item label="收款账户"> {receiverAccount}</Descriptions.Item>
          <Descriptions.Item label="收款人姓名"> {receiverName}</Descriptions.Item>
          <Descriptions.Item label="转账金额">
            <Statistic value={amount} suffix="元" />
          </Descriptions.Item>
        </Descriptions> */}
      </div>
    );
    const extra = (
      <>
        <Button type="primary" onClick={onFinish2}>
          查询列表
        </Button>
        
          

        <Button type="primary" onClick={onFinish}>
          继续添加
        </Button>
        {/* <Button>查看信息</Button> */}
      </>
    );
    return (
      <Result
        status="success"
        title="添加成功"
        extra={extra}
        className={styles.result}
      >
        {/* {information} */}
      </Result>
    );
  }
}
export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step4);
