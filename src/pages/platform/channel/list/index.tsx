import { Button, Dropdown, Form, Icon, Menu, message, Divider } from 'antd';
import React, { useRef, useState } from 'react';
import router from 'umi/router';
import { FormComponentProps } from 'antd/es/form';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { queryAppChannelList, addAppChannel, updateAppChannel, deleteAppChannel } from '../service';

interface ChannelProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  const response = await addAppChannel(fields);
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
  const response = await updateAppChannel(fields);
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
    data.push({ channelId: selectedRows[i].channelId });
  }
  const response = await deleteAppChannel(data);
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

const ChannelList: React.FC<ChannelProps> = () => {
  const [entity, handleEntity] = useState<any>();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

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
      dataIndex: 'accountInfo.username',
      hideInSearch: true,
    },
    {
        title: '开通商户数',
        dataIndex: 'merchantCount',
        sorter: true,
        hideInSearch: true,
        align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        1: { text: '启用', status: 'Success' },
        2: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              
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
                  
                }}
                selectedKeys={[]}
              >
                {record.status === 1 ? (
                  <Menu.Item key="freeze">
                    <Icon type="lock" />
                    禁用
                  </Menu.Item>
                ) : (
                  <Menu.Item key="unfreeze">
                    <Icon type="unlock" />
                    启用
                  </Menu.Item>
                )}
                <Menu.Item
                  key="updatepwd"
                  onClick={async () => {

                  }}
                >
                  <Icon type="info-circle" />
                  更改密码
                </Menu.Item>
                <Menu.Item
                  key="detail"
                  onClick={async () => {
                    router.push(`/channel/list/detailpage?channelId=${record.channelId}`);
                  }}
                >
                  <Icon type="info-circle" />
                  查看详情
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
    <>
    <GridContent>
      <ProTable<TableListItem>
        headerTitle="代理商列表"
        size="middle"
        actionRef={actionRef}
        rowKey="channelId"
        pagination={{
          showSizeChanger: true,
        }}
        rowSelection="true"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon="plus" type="primary" onClick={() => {window.location.href = '/platform/channel/add'}}>
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
          const response = await queryAppChannelList(pagination);
          return {
            data: response.result.records,
            page: pagination.current,
            success: true,
            total: response.result.total,
          };
        }}
        columns={columns}
      />
    </GridContent>
    </>
  );
};

export default Form.create<ChannelProps>()(ChannelList);
