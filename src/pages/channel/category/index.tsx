import { Button, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { GridContent } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { queryCategory, addAppCategory, updateCategory, removeCategory } from './service';

import CreateForm from './components/CreateForm';

interface ChannelCategoryProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
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
const handleUpdate = async fields => {
  const hide = message.loading('正在更新');
  const response = await updateCategory(fields);
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
    data.push({ channelType: selectedRows[i].channelType });
  }
  const response = await removeCategory(data);
  if (response.code === 0) {
    const params = response.result;
    let success = true;
    let msg = '';
    // 校验data与响应结果一致
    for (let j = 0; j < data.length; j += 1) {
      const id = data[j].channelType;
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

const ChannelCategoryList: React.FC<ChannelCategoryProps> = () => {
  const [entity, handleEntity] = useState<any>();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '代理金额(元)',
      dataIndex: 'agentMoney',
      hideInSearch: true,
    },
    {
        title: '返佣类型',
        dataIndex: 'commissionType',
        valueEnum: {
          1: { text: '按比例', status: 'Processing' },
          2: { text: '固定费率', status: 'Success' },
        },
    },
    {
        title: '返佣比例',
        dataIndex: 'commissionRatio',
        render: (text, record) => <span>{record.commissionRatio}%</span>,
        hideInSearch: true,
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      align: 'center',
    },
    {
        title: '代理数',
        dataIndex: 'channelCount',
        sorter: true,
        hideInSearch: true,
        align: 'center',
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
                  }
                }}
                selectedKeys={[]}
              >
                <Menu.Item
                  key="detail"
                  onClick={async () => {
                    handleEntity(record);
                    handleModalVisible(true)
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
      ),
    },
  ];

  return (
    <GridContent>
      <ProTable<TableListItem>
        headerTitle="代理商分类管理"
        size="middle"
        actionRef={actionRef}
        rowKey="channelType"
        pagination={{
          showSizeChanger: true,
        }}
        rowSelection="true"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon="plus" type="primary" onClick={() => {handleEntity(null); handleModalVisible(true)}}>
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
          const response = await queryCategory(pagination);
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
          let success = false;
          handleEntity(value);
          if(value.channelType){
            success = await handleUpdate(value);
          }else {
            success = await handleAdd(value);
          }
          if (success) {
            handleModalVisible(false);
            actionRef.current!.reload();
          }
        }}
        entity={entity}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
    </GridContent>
  );
};

export default Form.create<ChannelCategoryProps>()(ChannelCategoryList);
