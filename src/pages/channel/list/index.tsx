import { Button, Divider, Dropdown, Form, Icon, Menu, message, Modal, Result } from 'antd';
import React, { useState } from 'react';

import Link from 'umi/link';
import router from 'umi/router';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';

import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem, TableListParams } from './data.d';
import {
  queryChannel,
  removeChannel,
  save,
  updateChannel,
  updateAppChannelPassword,
} from './service';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  debugger;
  const hide = message.loading('正在添加');
  try {
    await addChannel({
      // channelName: fields.channelName,
      // channelTypeName: fields.channelTypeName,
      // contact: fields.contact,
      // phone: fields.phone,
      // loginId: fields.loginId,
      // merchantNumber: fields.merchantNumber,
      status: fields.status,
    });
    debugger;
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await save({
      // name: fields.name,
      // desc: fields.desc,
      // key: fields.key,
      // userId: string;//userID
      channelAttribute: fields.channelAttribute, //代理类型(1=个人，2=公司)
      channelId: fields.channelId, //所属代理
      channelName: fields.channelName, //企业名称
      channelType: fields.channelType, //代理类型
      referrer: fields.referrer, //推荐人
      status: fields.status,
      legalIdNumber: fields.legalIdNumber, //证件号码
      contact: fields.contact, //联系人
      phone: fields.phone, //联系电话
      address: fields.address, //联系地址
      aliCommissionAccount: fields.aliCommissionAccount, //支付号佣账号
      wxCommissionAccount: fields.wxCommissionAccount, //微信佣账号
      bankCommissionAccount: fields.bankCommissionAccount, //银行佣账号
      thirdCommissionAccount: fields.thirdCommissionAccount, //第三方佣账号
      commissionRatio: fields.commissionRatio, //返佣比例
      commissionType: fields.commissionType, //返佣类型
      loginId: fields.loginId, //账号
      loginPwd: fields.loginPwd, //密码
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeChannel({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

//账号禁用
const editAndDelete = async (channelId: string, status: string) => {
  const result = await updateChannel(channelId, status);
  if (result.result === true) {
    alert('成功');
    //刷新页面
    location.replace(document.referrer);
  } else {
    alert('失败');
  }
};

//修改密码
const updateChannelPassword = async (channelId: string) => {
  const result = await updateAppChannelPassword(channelId);
  debugger;
  alert('新密码：' + result.result);
  // if (result === true) {
  //   //刷新页面
  //   location.replace(document.referrer);
  // } else {
  //   alert("禁用失败")
  // }
};
// 事件
const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '代理商名称',
      dataIndex: 'channelName',
    },
    {
      title: '代理商类别',
      dataIndex: 'channelTypeName',
      hideInSearch: true,
    },
    {
      title: '联系人',
      dataIndex: 'contact',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '账号',
      dataIndex: 'loginId',
      hideInSearch: true,
    },
    {
      title: '开通商户数',
      dataIndex: 'merchantNumber',
      hideInSearch: true,
    },

    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      align: 'center',
      initialValue: '',
      valueEnum: {
        1: { text: '正常', status: 'Processing' },
        2: { text: '冻结', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            //账号禁用
            onClick={() => editAndDelete(record.channelId, record.status)}
          >
            禁用
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a onClick={() => updateChannelPassword(record.channelId)}>更改密码</a>
          <Divider type="vertical" />
          <a
            // key="detail"
            onClick={() => {
              router.push(`channel/list/detailpage?id=${record.channelId}`);
              // onClick={async () => {
              //   router.push('/channel/list/components/basic?channelId=' + record.channelId);
            }}
          >
            查看详情
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询代理商"
        onInit={setActionRef}
        rowKey="channelId"
        pagination={{
          showSizeChanger: true,
        }}
        rowSelection="true"
        toolBarRender={(action, { selectedRows }) => [
          <a href={'/channel/list/step-form'}>
            <Button icon="plus" type="primary">
              新建
            </Button>
            ,
          </a>,

          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              columns
              <Button>
                批量操作 <Icon type="down" />
              </Button>
            </Dropdown>
          ),
        ]}
        toolBarRender={(action, { selectedRows }) => [
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(action);
            }}
            // href={'/channel/list/step-form'}
          >
            <Button icon="plus" type="primary">
              新建new
            </Button>
            ,
          </a>,
          <a href={'/channel/list/step-form'}>
            <Button icon="plus" type="primary">
              新建
            </Button>
            ,
          </a>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              columns
              <Button>
                批量操作 <Icon type="down" />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={selectedRowKeys => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        request={async (params = {}) => {
          const pagination = { current: params.current, size: params.pageSize };

          delete params.current;
          delete params.pageSize;
          const query = params;
          pagination.query = query;
          const response = await queryChannel(pagination);
          return {
            data: response.result.records,
            page: pagination.current,
            success: true,
            total: response.result.total,
          };
        }}
        columns={columns}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            debugger;
            actionRef!.reload();
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              // actionRef!.reload();
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
      {/* <ChannelForm
        onSubmit= {
          const success = true;
          if (success) {
            handleModalVisible(false);
            debugger;
            actionRef!.reload();
          }
        }
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      /> */}
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
