import { Button, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { GridContent } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import FormUserCreate from './components/FormUserCreate';
import FormUserUpdate from './components/FormUserUpdate';
import FormUserPwd from './components/FormUserPwd';

import { TableListItem } from './data.d';
import {
  queryUser,
  queryUserById,
  updateUser,
  updateUserBatch,
  addUser,
  removeUser,
  queryUserRoles,
} from './service';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  const response = await addUser(fields);
  if (response.code === 0) {
    hide();
    message.success('添加成功');
    return true;
  }
  hide();
  message.error(response.message);
  return false;
};
const handleUpdate = async fields => {
  const hide = message.loading('正在更新');
  const response = await updateUser(fields);
  if (response.code === 0) {
    hide();
    message.success('更新成功');
    return true;
  }
  hide();
  message.error(response.message);
  return false;
};

const handleUpdatePwd = async fields => {
  const hide = message.loading('正在更新');
  const response = await updateUser(fields);
  if (response.code === 0) {
    hide();
    message.success('更新成功');
    return true;
  }
  hide();
  message.error(response.message);
  return false;
};

/**
 * 禁用或启用用户
 * @param fields
 */
const handleForbiddenOrUse = async (records, flag) => {
  const hide = message.loading('正在配置');
  if (!records) return true;

  const arr = [];

  for (let i = 0; i < records.length; i += 1) {
    const record = records[i];
    let statusa = 1;
    if (flag === true) {
      statusa = 2;
    }
    arr.push({ userId: record.userId, loginId: record.loginId, status: statusa });
  }
  const response = await updateUserBatch(arr);
  if (response.code === 0) {
    hide();
    message.success('配置成功');
    return true;
  }
  hide();
  message.error(response.message);
  return false;
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  const data = [];
  // 遍历数组
  for (let i = 0; i < selectedRows.length; i += 1) {
    data.push({ userId: selectedRows[i].userId });
  }
  const response = await removeUser(data);
  if (response.code === 0) {
    const params = response.result;
    let success = true;
    let msg = '';
    // 校验data与响应结果一致
    for (let j = 0; j < data.length; j += 1) {
      const id = data[j].userId;
      if (params[id] !== true) {
        success = false;
        msg = params[id].message!;
        break;
      }
    }

    if (success) {
      hide();
      message.success('删除成功，即将刷新');
      return true;
    }
    hide();
    message.error(msg);
    return true;
  }
  hide();
  message.error(response.message);
  return false;
};

const TableList: React.FC<TableListProps> = () => {
  const [userId, handleUserId] = useState<string>('');
  const [entity, handleEntity] = useState<any>();
  const [roles, handleRoles] = useState<any>();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [updatePwdModalVisible, handleUpdatePwdModalVisible] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'loginId',
      search: false,
    },
    {
      title: '用户标识',
      dataIndex: 'userId',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      placeholder: '请选择',
      valueEnum: {
        1: { text: '正常', status: 'Processing' },
        2: { text: '冻结', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <>
          <Dropdown
            overlay={
              <Menu
                onClick={async e => {
                  const records = [record];
                  // 删除
                  if (e.key === 'remove') {
                    // 提示删除
                    await handleRemove(records);
                    actionRef.current!.reload();
                  } else if (e.key === 'freeze') {
                    await handleForbiddenOrUse(records, true);
                    actionRef.current!.reload();
                  } else if (e.key === 'unfreeze') {
                    await handleForbiddenOrUse(records, false);
                    actionRef.current!.reload();
                  }
                }}
                selectedKeys={[]}
              >
                <Menu.Item
                  key="detail"
                  onClick={async () => {
                    handleUserId(record.userId);
                    const response = await queryUserById({ userId: record.userId });
                    handleEntity(response.result);
                    handleUpdateModalVisible(true);
                  }}
                >
                  <Icon type="info-circle" />
                  详情
                </Menu.Item>
                <Menu.Item
                  key="password"
                  onClick={async () => {
                    handleEntity(record);
                    handleUpdatePwdModalVisible(true);
                  }}
                >
                  <Icon type="lock" />
                  密码
                </Menu.Item>

                <Menu.Item key="remove">
                  <Icon type="delete" />
                  删除
                </Menu.Item>
                {record.status === 1 ? (
                  <Menu.Item key="freeze">
                    <Icon type="unlock" />
                    冻结
                  </Menu.Item>
                ) : (
                  <Menu.Item key="unfreeze">
                    <Icon type="unlock" />
                    解冻
                  </Menu.Item>
                )}
              </Menu>
            }
          >
            <a>
              更多 <Icon type="down" />
            </a>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <GridContent>
      <ProTable<TableListItem>
        headerTitle="查询用户"
        size="middle"
        actionRef={actionRef}
        rowKey="userId"
        pagination={{
          showSizeChanger: true,
        }}
        rowSelection="true"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon="plus" type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      actionRef.current!.reload();
                    } else if (e.key === 'freeze') {
                      await handleForbiddenOrUse(selectedRows, true);
                      actionRef.current!.reload();
                    } else if (e.key === 'unfreeze') {
                      await handleForbiddenOrUse(selectedRows, false);
                      actionRef.current!.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">
                    <Icon type="delete" />
                    删除
                  </Menu.Item>
                  <Menu.Item key="freeze">
                    <Icon type="lock" />
                    冻结
                  </Menu.Item>
                  <Menu.Item key="unfreeze">
                    <Icon type="unlock" />
                    解冻
                  </Menu.Item>
                </Menu>
              }
            >
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
          const pagination = {
            current: params.current,
            size: params.pageSize,
            orders: [{ column: 'id', asc: false }],
          };

          delete params.current;
          delete params.pageSize;
          const query = params;
          pagination.query = query;
          const response = await queryUser(pagination);

          // 获取角色信息
          const result = await queryUserRoles();
          handleRoles(result.result.records);
          return {
            data: response.result.records,
            page: pagination.current,
            success: true,
            total: response.result.total,
          };
        }}
        columns={columns}
      />
      <FormUserCreate
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            actionRef.current!.reload();
          }
        }}
        onClose={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        roles={roles}
      />
      <FormUserUpdate
        onSubmit={async value => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            actionRef.current!.reload();
          }
        }}
        onClose={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
        userId={userId}
        entity={entity}
        roles={roles}
      />
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
    </GridContent>
  );
};

export default Form.create<TableListProps>()(TableList);
