import { Button, Divider, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useState } from 'react';
import router from 'umi/router';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
// import CreateForm from './components/CreateForm';
// import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {
  queryChannel,
  removeChannel,
  updateChannel,
  updateAppChannelPassword,
} from './service';

interface TableListProps extends FormComponentProps { }


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
    data.push({ channelId: selectedRows[i].channelId });
  }
  const response = await removeChannel(data);
  if (response.code === 0) {
    const params = response.result;
    let success = true;
    let msg = '';
    // 校验data与响应结果一致
    for (let j = 0; j < data.length; j += 1) {
      const id = data[j].channelId;
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



//账号禁用
const editAndDelete = async (channelId: string, status: number) => {
  debugger;
  if (status === 1) {
    status = 2;
  } else {
    status = 1;
  }
  const result = await updateChannel(channelId, status);
  // console.log(result.result.status);
  if (result.code === 0) {
    alert('成功');
    //刷新页面
    location.replace(document.referrer);
  } else {
    alert(result.message);
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
  // const [entity, handleEntity] = useState<any>();
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // const [stepFormValues, setStepFormValues] = useState({});

  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();
  const columns: ProColumns<any>[] = [
    {
      title: '代理名称',
      dataIndex: 'channelName',
    },
    {
      title: '代理类别',
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
      // dataIndex: 'loginId',
      dataIndex: 'accountInfo.username',

      hideInSearch: true,
    },
    {
      title: '开通商户数',
      dataIndex: 'merchantCount',
      hideInSearch: true,
    },

    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      align: 'center',
      initialValue: '',
      valueEnum: {
        1: { text: '启用', status: 'Processing' },
        2: { text: '禁用', status: 'Error' },
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
            {record.status === 1 ? '禁用' : '启用'}
          </a>
          <Divider type="vertical" />
          {/* <a onClick={() => updateChannelPassword(record.channelId)}>更改密码</a> */}
          <Divider type="vertical" />
          <a
            // key="detail"
            onClick={() => {
              router.push(`/channel/list/detailpage?channelId=${record.channelId}`);
            }}
          >
            查看详情
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
                    // action.reload();
                    location.reload();
                    // actionRef.current!.reload();
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
            <a>
              更多 <Icon type="down" />
            </a>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="代理商列表"
        size="middle"
        actionRef={actionRef}
        // onInit={setActionRef}
        rowKey="channelId"
        pagination={{
          showSizeChanger: true,
        }}
        rowSelection="true"
        toolBarRender={(action, { selectedRows }) => [
          <a
            onClick={() => {
              router.push(`/channel/list/step-form`);
            }}
          >
            <Button icon="plus" type="primary">
              新建
            </Button>,
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
          const pagination = { current: params.current, size: params.pageSize, orders: [{ column: 'id', asc: false }], };

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
      {/* <CreateForm
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
      /> */}

      {/* {stepFormValues && Object.keys(stepFormValues).length ? (
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
      ) : null} */}
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
