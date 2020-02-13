import { Card, Steps, message } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step4 from './components/Step4';
import Step5 from "./components/Step5";
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

interface StepFormProps {
  current: StateType['current'];
}

class StepForm extends Component<StepFormProps> {
  getCurrentStep() {
    const { current } = this.props;

    switch (current) {
      case 'info':
        return 0;
        case 'billinginfo':
          return 1
      case 'confirm':
        return 2;
      case 'confirm2':
        return 3;
      case 'result':
        return 4;
      
      default:
        return 0;
    }
  }
  render() {
    console.log(this.props);
    const currentStep = this.getCurrentStep();
    console.log(currentStep);
    let stepComponent;
    if (currentStep === 0) {
      stepComponent = <Step1 />;
    } else if (currentStep === 1) {
      stepComponent = <Step5 />;
    } else if (currentStep === 2) {
      stepComponent = <Step2 />;
    } else if (currentStep === 3) {
      stepComponent = <Step3 />;
    } else if(currentStep === 4){
      stepComponent = <Step4 />;
    } else {
      stepComponent = <Step1/>;
    }
    return (
      <PageHeaderWrapper  content="" title="添加商户">
        <Card bordered={false}>
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="基本信息" />
              <Step title="结算信息" />
              <Step title="图片信息" />
              <Step title="账户信息" />
            </Steps>
            {stepComponent}
          </>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  current: formAndstepForm.current,
}))(StepForm);
