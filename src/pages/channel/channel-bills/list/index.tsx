import { Form } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { merchantBills } from './service';
import router from 'umi/router';
interface TableListProps extends FormComponentProps {}

const TableList: React.FC<TableListProps> = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '代理商名称',
      dataIndex: 'merchantName',
    },
    {
      title: '商户总数',
      dataIndex: 'totalAmount',
      hideInSearch: true,
    },
    {
      title: '订单总数',
      dataIndex: 'orderNumber',
      hideInSearch: true,
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
      hideInSearch: true,
    },
    {
      title: '退款订单数',
      dataIndex: 'refundNumber',
      hideInSearch: true,
    },
    {
      title: '有效交易基数',
      dataIndex: 'actualAmount',
      hideInSearch: true,
    },
    {
      title: '返佣总额',
      dataIndex: 'buyerPayAmount',
      hideInSearch: true,
    },
    {
      title: '已提现金额',
      dataIndex: 'wxStatus',
      hideInSearch: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            // onClick={() => {
            //   router.push(`merchantBills/list/components?id=${record.merchantId}`);
            // }}
          >
            查看详细
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="商户对账列表"
        // onInit={setActionRef}
        rowKey="merchantId"
        pagination={{
          showSizeChanger: true,
        }}
        // rowSelection="true"
        request={async (params = {}) => {
          const pagination = { current: params.current, size: params.pageSize };

          delete params.current;
          delete params.pageSize;
          const query = params;
          pagination.query = query;
          const response = await merchantBills(pagination);
          return {
            data: response.result.records,
            page: pagination.current,
            success: true,
            total: response.result.total,
          };
        }}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
