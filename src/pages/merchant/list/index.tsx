import { Button, Divider, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {
  queryChannel,
  removeChannel,
  updateChannel,
  updateUser,
  queryCategoryById,
  addAppCategory,
} from './service';

import FormUserPwd from './components/FormUserPwd';
import router from 'umi/router';
interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const addChannel = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await queryChannel({
      loginId: fields.loginId,
      loginPwd: fields.loginPwd,
    });
    console.log(loginId);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const handleAdd = async (fields: TableListParams) => {
  const hide = message.loading('正在添加');
  const response = await addAppCategory(fields);
  if (response.code === 0) {
    hide();
    message.success('添加成功');
    return true;
  }
  hide();
  message.error(response.message);
  return false;
};
/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  // const hide = message.loading('正在配置');
  try {
    const response = await queryCategoryById(fields);

    if (response.code === 0) {
      // hide();
      message.success('添加成功');
      return true;
    }
    // hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    // hide();
    message.error('修改失败请重试！');
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

const TableList: React.FC<TableListProps> = () => {
  const [entity, handleEntity] = useState<any>();
  const [userId, handleUserId] = useState<string>('');
  const [roles, handleRoles] = useState<any>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [updatePwdModalVisible, handleUpdatePwdModalVisible] = useState<boolean>(false);

  const [setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();

  const columns: ProColumns<TableListItem>[] = [
   
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      search: false,
      key: '1',
    },
    {
      title: '行业类别',
      dataIndex: 'industryCode',
      key: '2',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: '3',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: '3',
    },
    {
      title: '账号',
      dataIndex: 'accountInfo[0].status',
      key: '3',
    },
    {
      title: '商户来源',
      dataIndex: 'channelName',
    },
    {
      title: '支付宝签约状态',
      dataIndex: 'appMerchantPaywayList[0].status',
    },
    {
      title: '微信签约状态',
      dataIndex: 'wxStatus',
    },
    {
      title: '银联签约状态',
      dataIndex: 'bankStatus',
    },
    {
      title: '商户状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            key="password"
            onClick={() => {
              console.log(record);
              handleEntity(record);
              handleUpdatePwdModalVisible(true);
            }}
          >
            更改密码
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            禁用
          </a> */}
          <Divider type="vertical" />
          <a
            onClick={() => {
              router.push(`/merchant/list/detailpage?id=${record.merchantId}`);
            }}
          >
            查看详情
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a
            key="detail"
            onClick={async () => {
              const response = await queryCategoryById({ merchantId: record.merchantId });
              console.log(response);
              handleEntity(response.result);
              handleUpdateModalVisible(true);
            }}
          >
            <Icon type="info-circle" />
            编辑
          </a>
        </>
      ),
    },
  ];
  console.log(columns);
  const handleUpdatePwd = async fields => {
    const hide = message.loading('正在更新');
    const response = await updateUser(fields);
    console.log(response);
    if (response.code === 0) {
      hide();
      message.success('更新成功');
      return true;
    }
    hide();
    message.error(response.message);
    return false;
  };
  console.log();
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
          <a>
            <Button
              icon="plus"
              type="primary"
              onClick={() => {
                router.push('/merchant/list/step-form');
              }}
            >
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


     
        // tableAlertRender={selectedRowKeys => (
          
        //   <div>
        //     说的<a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
        //   </div>
        // )}

        
        request={async (params = {}) => {
          const pagination = { current: params.current, size: params.pageSize };

          delete params.current;
          delete params.pageSize;
          const query = params;
          pagination.query = query;

          const response = await queryChannel(pagination);
          console.log();
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
          const success = await queryChannel(value);
          if (success) {
            handleModalVisible(false);
            debugger;
            actionRef!.reload();
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {/* 修改密码 */}
      <FormUserPwd
        onSubmit={async value => {
          const success = await handleUpdatePwd(value);
          if (success) {
            handleUpdatePwdModalVisible(false);
            actionRef.current!.reload();
          }
        }}
        onCancel={() => handleUpdatePwdModalVisible(false)}
        modalVisible={updatePwdModalVisible}
        userId={userId}
        entity={entity}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            } else {
              location.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />

      {/* {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              location.reload();
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        /> 



        
     ): null} */}
      <UpdateForm
        onSubmit={async value => {
          handleEntity(value);
          const success = await handleUpdate(value);
          console.log(success);
          if (success) {
            handleUpdateModalVisible(false);
            debugger;
            if (actionRef.current) {
              actionRef.current.reload();
              debugger;
            } else {
              location.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
        entity={entity}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
