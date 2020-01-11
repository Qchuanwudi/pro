import {  Form } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { merchantsBillsDetails} from './service';
import router from 'umi/router';
interface TableListProps extends FormComponentProps {}

      
const TableList: React.FC<TableListProps> = () => {
  // const id = this.props.location.query.id;
  debugger;
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '交易流水号',
      dataIndex: 'tradeNo',
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
    },
    {
      title: '交易时间',
      dataIndex: 'payTime',
    },
    {
      title: '支付方式',
      dataIndex: 'refundAmount',
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
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
      title: '协助费',
      dataIndex: 'merchantSignedRatio',
    },
    {
      title: '优惠',
      dataIndex: 'mdiscountAmount',
    },
    {
      title: '交易明细',
      dataIndex: 'transactionDetail',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => (
    //     <>
    //       <a
    //         onClick={() => {
    //           router.push(`merchant/list/detailpage?id=${record.merchantId}`);
    //         }}
    //       >
    //         查看详情
    //       </a>
    //     </>
    //   ),
    // },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询商户对账列表"
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
          const response = await merchantsBillsDetails(pagination);
          return {
            // data: response.result.records,
            // page: pagination.current,
            // success: true,
            // total: response.result.total,
          };
        }}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
