import { Button, Divider, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryChannel, removeChannel, addChannel, updateChannel } from './service';
import router from 'umi/router';
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
      loginId: fields.loginId,
      loginPwd: fields.loginPwd,
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
    await updateChannel({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
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

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '商户名称',
      dataIndex: 'merchantName',
    },
    {
      title: '行业类别',
      dataIndex: 'industryCode',
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
      dataIndex: 'account',
    },
    {
      title: '商户来源',
      dataIndex: 'channelName',
    },
    {
      title: '支付宝签约状态',
      dataIndex: 'aliStatus',
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
          <a
            onClick={() => {
              router.push(`channelUser/list/detailpage?id=${record.merchantId}`);
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
          <a href={'/merchant/list/step-form'}>
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
              actionRef!.reload();
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
