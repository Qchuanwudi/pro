import { Button, Dropdown, Form, Icon, Menu, message, Divider } from 'antd';
import React, { useRef, useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { GridContent } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import FormMenuCreate from './components/FormMenuCreate';
import FormMenuUpdate from './components/FormMenuUpdate';

import { queryMenus, queryMenuById, updateMenu, addMenu, removeMenus } from './service';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  const response = await addMenu(fields);
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
  const response = await updateMenu(fields);
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
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  const data = [];
  // 遍历数组
  for (let i = 0; i < selectedRows.length; i += 1) {
    data.push({ permissionId: selectedRows[i].permissionId });
  }
  const response = await removeMenus(data);
  if (response.code === 0) {
    const params = response.result;
    let success = true;
    let msg = '';
    // 校验data与响应结果一致
    for (let j = 0; j < data.length; j += 1) {
      const id = data[j].permissionId;
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

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const menuColumns = [
    {
      title: '菜单名称',
      dataIndex: 'nameTxt',
      key: 'nameTxt',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      valueEnum: {
        1: { text: '系统菜单', status: 'Processing' },
        2: { text: '内嵌链接', status: 'Processing' },
        3: { text: '跳出链接', status: 'Processing' },
      },
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      key: 'sortNo',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              const response = await queryMenuById({ permissionId: record.permissionId });
              handleEntity(response.result);
              handleUpdateModalVisible(true);
            }}
          >
            编辑
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
                    const response = await queryMenuById({ permissionId: record.permissionId });
                    handleEntity(response.result);
                    handleUpdateModalVisible(true);
                  }}
                >
                  <Icon type="info-circle" />
                  详情
                </Menu.Item>
                <Menu.Item
                  key="add"
                  onClick={() => {
                    handleEntity({ parentId: record.permissionId });
                    handleModalVisible(true);
                  }}
                >
                  <Icon type="plus" />
                  添加子菜单
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
      ),
    },
  ];

  return (
    <GridContent>
      <GridContent>
        <ProTable
          search={false}
          size="middle"
          actionRef={actionRef}
          options={{ fullScreen: true, reload: true, setting: true }}
          columns={menuColumns}
          request={async () => {
            const response = await queryMenus();
            const resultMenus = response.result;
            handleMenus(resultMenus);
            return {
              data: resultMenus,
              success: true,
            };
          }}
          rowKey="permissionId"
          // pagination={{ disabled: 'none' }}
          dateFormatter="string"
          headerTitle="菜单管理"
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
        />
        <FormMenuCreate
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              actionRef.current!.reload();
            }
          }}
          onClose={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          menus={menus}
          entity={entity}
        />
        <FormMenuUpdate
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              actionRef.current!.reload();
            }
          }}
          onClose={() => handleUpdateModalVisible(false)}
          modalVisible={updateModalVisible}
          entity={entity}
          menus={menus}
        />
      </GridContent>
    </GridContent>
  );
};

export default Form.create<TableListProps>()(TableList);
