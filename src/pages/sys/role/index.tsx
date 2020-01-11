import { Divider, Button, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { GridContent } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import FormRoleCreate from './components/FormRoleCreate';
import FormRoleUpdate from './components/FormRoleUpdate';

import DrawerMenu from './components/DrawerMenu';

import { TableListItem } from './data.d';
import {
  queryRole,
  queryRoleById,
  updateRole,
  addRole,
  removeRole,
  addPerissminAssignment,
  queryMenusAndPermissions,
} from '@/services/api';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  const response = await addRole(fields);
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
 *	更新操作
 */
const handleUpdate = async fields => {
  const hide = message.loading('正在更新');
  const response = await updateRole(fields);
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
 * 绑定用户角色权限
 */
const handleUpdateRolePermissions = async params => {
  const hide = message.loading('正在配置');
  const response = await addPerissminAssignment(params);
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
    data.push({ roleId: selectedRows[i].roleId });
  }
  const response = await removeRole(data);
  if (response.code === 0) {
    const params = response.result;
    let success = true;
    let msg = '';
    // 校验data与响应结果一致
    for (let j = 0; j < data.length; j += 1) {
      const id = data[j].roleId;
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
  const [entity, handleEntity] = useState<any>();
  const [menus, handleMenus] = useState<any>();
  const [permissionIds, handlePermissionIds] = useState<any>();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [createRoleDrawerVisible, handleRoleDrawerVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '角色标识',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {window.currentUser.projectId === record.projectId ? (
            <>
              <a
                onClick={async () => {
                  // 获取菜单
                  const response = await queryMenusAndPermissions({ roleId: record.roleId });
                  if (response.code === 0) {
                    handleMenus(response.result.menus);
                    handlePermissionIds(response.result.permissionIds);
                    handleEntity(record);
                  }

                  handleRoleDrawerVisible(true);
                }}
              >
                分配权限
              </a>
              <Divider type="vertical" />
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
                      }
                    }}
                    selectedKeys={[]}
                  >
                    <Menu.Item
                      key="detail"
                      onClick={async () => {
                        const response = await queryRoleById({ roleId: record.roleId });
                        handleEntity(response.result);
                        handleUpdateModalVisible(true);
                      }}
                    >
                      <Icon type="info-circle" />
                      编辑
                    </Menu.Item>
                    <Menu.Item key="remove">
                      <Icon type="delete" />
                      删除
                    </Menu.Item>
                  </Menu>
                }
              >
                <a>
                  更多 <Icon type="down" />
                </a>
              </Dropdown>
            </>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <GridContent>
      <ProTable<TableListItem>
        headerTitle="查询角色"
        size="middle"
        actionRef={actionRef}
        rowKey="roleId"
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
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">
                    <Icon type="delete" />
                    删除
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
          const response = await queryRole(pagination);

          return {
            data: response.result.records,
            page: pagination.current,
            success: true,
            total: response.result.total,
          };
        }}
        columns={columns}
      />
      <FormRoleCreate
        onSubmit={async value => {
          handleEntity(value);
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            actionRef.current!.reload();
          }
        }}
        onClose={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      <FormRoleUpdate
        onSubmit={async value => {
          handleEntity(value);
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            actionRef.current!.reload();
          }
        }}
        onClose={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
        entity={entity}
      />
      <DrawerMenu
        onSubmit={async value => {
          console.log(value);
          const success = await handleUpdateRolePermissions({
            permissionIds: value,
            roleId: entity.roleId,
          });

          if (success) {
            handleRoleDrawerVisible(false);
            actionRef.current!.reload();
          }
        }}
        onClose={() => handleRoleDrawerVisible(false)}
        modalVisible={createRoleDrawerVisible}
        entity={entity}
        menus={menus}
        permissionIds={permissionIds}
      />
    </GridContent>
  );
};

export default Form.create<TableListProps>()(TableList);
