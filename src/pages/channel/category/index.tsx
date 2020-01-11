import { Button, Divider, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
// import { queryCategory } from './service';
import { queryCategory, addAppCategory, removeCategory, updateCategory } from './service';
interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  // debugger;
  const hide = message.loading('正在添加');
  try {
    await addAppCategory({
      channelName: fields.channelName,
      commissionType: fields.commissionType,
      commissionRatio: fields.commissionRatio,
      agentMoney: fields.agentMoney,
    });
    // debugger;
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
    await updateCategory({
      channelName: fields.channelName,
      commissionType: fields.commissionType,
      commissionRatio: fields.commissionRatio,
      agentMoney: fields.agentMoney,
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
    await removeCategory({
      // alert(row.key);
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '分类名称',
      dataIndex: 'channelName',
    },
    {
      title: '代理金额',
      dataIndex: 'agentMoney',
      hideInSearch: true,
    },
    {
      title: '返佣类型',
      dataIndex: 'commissionType',
      hideInSearch: true,
      align: 'center',
      initialValue: '',
      valueEnum: {
        1: { text: '返佣比例', status: 'Processing' },
        2: { text: '返佣费率', status: 'Processing' },
      },
    },
    {
      title: '返佣比例',
      dataIndex: 'commissionRatio',
      hideInSearch: true,
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '代理数',
      dataIndex: 'channelNumber',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/* <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            禁用
          </a>
          <Divider type="vertical" />
          <a href="">分配角色</a> */}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询代理商"
        onInit={setActionRef}
        rowKey="channelType"
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
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
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
          const pagination = { current: params.current, size: params.pageSize };

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
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            alert(success);
            debugger;
            // actionRef!.reload();
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
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
