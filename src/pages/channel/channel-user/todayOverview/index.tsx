import {
  Avatar,
  Card,
  Col,
  Dropdown,
  Form,
  Icon,
  List,
  Menu,
  Row,
  Tooltip,
  Button,
  DatePicker,
  Table,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
// import numeral from 'numeral';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
// import TagSelect from './components/TagSelect';
import styles from './style.less';

const FormItem = Form.Item;

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    width: 150,
  },
  {
    title: '商户名称',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '订单金额',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: '退款金额',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: '优惠金额',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: '实付金额',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
  {
    title: '手续费',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: '111',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: '123123',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: '123123',
    tags: ['cool', 'teacher'],
  },
];

interface ApplicationsProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  listAndsearchAndapplications: StateType;
  loading: boolean;
}

class Applications extends Component<ApplicationsProps> {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listAndsearchAndapplications/fetch',
    });
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    const {
      listAndsearchAndapplications: { list },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const CardInfo: React.FC<{
      activeUser: React.ReactNode;
      newUser: React.ReactNode;
    }> = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>活跃用户</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>新增用户</p>
          <p>{newUser}</p>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.filterCardList}>
        <Row>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow block style={{ paddingBottom: 11 }}>
                <Col className="gutter-row" span={6}>
                  <FormItem>
                    <Button type="primary" style={{ marginLeft: 10 }}>
                      昨天
                    </Button>
                    <Button type="primary" style={{ marginLeft: 10 }}>
                      今日
                    </Button>
                    <Button type="primary" style={{ marginLeft: 10 }}>
                      近七天
                    </Button>
                  </FormItem>
                </Col>
                <div>
                  <Col className="gutter-row" span={8} style={{ marginLeft: 5 }}>
                    <DatePicker
                      disabledDate={this.disabledStartDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      value={startValue}
                      placeholder="Start"
                      onChange={this.onStartChange}
                      onOpenChange={this.handleStartOpenChange}
                    />
                    <a>至</a>
                    <DatePicker
                      disabledDate={this.disabledEndDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      value={endValue}
                      placeholder="End"
                      onChange={this.onEndChange}
                      open={endOpen}
                      onOpenChange={this.handleEndOpenChange}
                    />
                  </Col>
                </div>
              </StandardFormRow>
            </Form>
          </Card>
        </Row>
        <br />

        <List<ListItemDataType>
          rowKey="id"
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip key="download" title="下载">
                    <Icon type="download" />
                  </Tooltip>,
                  <Tooltip key="edit" title="编辑">
                    <Icon type="edit" />
                  </Tooltip>,
                  <Tooltip title="分享" key="share">
                    <Icon type="share-alt" />
                  </Tooltip>,
                  <Dropdown key="ellipsis" overlay={itemMenu}>
                    <Icon type="ellipsis" />
                  </Dropdown>,
                ]}
              >
                <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    activeUser={formatWan(item.activeUser)}
                    newUser={numeral(item.newUser).format('0,0')}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

const WarpForm = Form.create<ApplicationsProps>({
  onValuesChange({ dispatch }: ApplicationsProps) {
    // 表单项变化时请求数据
    // 模拟查询表单生效
    dispatch({
      type: 'listAndsearchAndapplications/fetch',
    });
  },
})(Applications);

export default connect(
  ({
    listAndsearchAndapplications,
    loading,
  }: {
    listAndsearchAndapplications: StateType;
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    listAndsearchAndapplications,
    loading: loading.effects['listAndsearchAndapplications/fetch'],
  }),
)(WarpForm);
