import { Alert, Checkbox, Icon ,Form,Input, Row} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { LoginParamsType ,verificationcode} from '@/services/login';
import Captcha from "./Captcha";
import { ConnectState } from '@/models/connect';
import { async } from 'q';

const { UserName, Password, Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting?: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
  image: string;
  code: string;
  inputCode: string;
  key: string;
}

class Login extends Component<LoginProps, LoginState> {

  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
    image: '',
    code: "1234",
    inputCode: '',
    key:''
  };

  componentDidMount() {
    this.handleVerify()
  }



  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  changeCode = async () => {
    // this.props.dispatch({  type: 'formAndstepForm/saveStepFormData',
    //   payload: { businessLicenseAuthPic: value },
    // })
    const response = await verificationcode(this.state.inputCode)
    debugger
    console.log(response)
    this.setState({
      code: response.result.code,
      key:response.result.key
    })
    // this.setState({
    //   code: this.state.image
    // });
  }

  handleSubmit = (err: unknown, values: LoginParamsType) => {
if (this.state.inputCode) {
                     verificationcode(this.state.inputCode,this.state.key)
}
  debugger
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  handleVerify = async() => {
      const response = await verificationcode('')
    console.log(response)
    this.setState({
      code: response.result.code,
      key:response.result.key
    })

  }
  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );



 

  checkCode() {
    const { inputCode, code } = this.state;
    if (inputCode !== code) {
      alert("错误刷新");
      this.setState(
        {
          inputCode: ""
        },
        () => {
          this.changeCode();
        }
      );
    } else {
      alert("成功");
    }
  }
  render() {
    console.log(this.state.inputCode)
    console.log(this.state.key)
    const { code, inputCode } = this.state;
    const { userLogin = {}, submitting } = this.props;
    const { status, type: loginType, message: loginMessage } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <div key="account">
          {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(`${loginMessage}`)}
            <UserName
              name="username"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
            <Form.Item> 
              

          {/* 验证码 */}
          
              <Row>
                
                <Input
                
          type="text"
          style={{width:170,height:40,float:'left'}}
          value={inputCode}
                  placeholder={'请输入验证码'}
          onChange={e =>
            this.setState({
              inputCode: e.target.value
            })
          }
                  
                />
          <div style={{float:'left',marginLeft:30}}>
        <Captcha
          
          onClick={() => {
            // 点击事件，用来从后台接口获取验证码等操作
            this.changeCode();
          }}
          // 验证码
          identifyCode={code}
                  />
                  </div>
       </Row>
       
         </Form.Item>
           
            
          </div>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          
        </LoginComponents>
      </div>
    );
  }
}

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
