import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import router from 'umi/router';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

interface Step4Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

class Step4 extends React.Component<Step4Props> {
  render() {
    const { data, dispatch } = this.props;
    if (!data) {
      return null;
    }
    const { payAccount, receiverAccount, receiverName, amount } = data;
    const onFinish = () => {
      if (dispatch) {
        dispatch({
          type: 'channelAddForm/saveCurrentStep',
          payload: 'info',
        });
      }
    };
    const information = <div className={styles.information}></div>;
    const extra = (
      <>
        <Button type="primary" onClick={onFinish}>
          继续代理商
        </Button>
        <a
          onClick={() => {
            router.push(`/channel/list`);
          }}
        >
          <Button type="primary" onClick={onFinish}>返回代理商列表</Button>
        </a>
      </>
    );
    if (data.code !== 0) {
      return (
        <Result
          status="error"
          title="提交失败"
          subTitle={data.message}
          extra={extra}
          className={styles.result}
        >
        </Result>
      );
    } else {
      return (
        <Result
          status="success"
          title="操作成功"
          // subTitle="预计两小时内到账"
          extra={extra}
          className={styles.result}
        >
        </Result>
      );
    }
  }
}

export default connect(({ channelAddForm }: { channelAddForm: StateType }) => ({
  data: channelAddForm.step,
}))(Step4);
