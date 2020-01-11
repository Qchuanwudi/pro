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
      title: '商户名称',
      dataIndex: 'merchantName',
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
    },
    {
      title: '订单数',
      dataIndex: 'orderNumber',
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
    },
    {
      title: '退款订单数',
      dataIndex: 'refundNumber',
    },
    {
      title: '有效交易基数',
      dataIndex: 'actualAmount',
    },
    {
      title: '顾客实付',
      dataIndex: 'buyerPayAmount',
    },
    {
      title: '分账总金额',
      dataIndex: 'wxStatus',
    },
    {
      title: '已付分账',
      dataIndex: 'bankStatus',
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
            查看详情
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
