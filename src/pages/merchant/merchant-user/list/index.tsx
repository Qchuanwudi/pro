import { Form} from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { merchantsBillsDetails} from './service';
import router from 'umi/router';
interface TableListProps extends FormComponentProps {}


const TableList: React.FC<TableListProps> = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单时间',
      dataIndex: 'createTime',
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
      hideInSearch: true,
    },
    {
      title: '商品详情',
      dataIndex: 'goodsList',
      hideInSearch: true,
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
      hideInSearch: true,
    },
    {
      title: '优惠金额',
      dataIndex: 'mdiscountAmount',
      hideInSearch: true,
    },
    {
      title: '实付金额',
      dataIndex: 'actualAmount',
      hideInSearch: true,
    },
    {
      title: '支付方式',
      dataIndex: 'codeType',
      hideInSearch: true,
      align: 'center',
      initialValue: '',
      valueEnum: {
        "01": { text: '刷脸支付', status: 'Processing' },
        "02": { text: '扫码支付', status: 'Processing' },
        "03": { text: '刷卡支付', status: 'Processing' },
        "04": { text: '待定', status: 'Error' },
      },
    },
    // {
    //   title: '状态',01刷脸支付，02扫码支付，03刷卡支付，04待定
    //   dataIndex: 'status',
    //   align: 'center',
    //   initialValue: '',
    //   valueEnum: {
    //     1: { text: '正常', status: 'Processing' },
    //     2: { text: '冻结', status: 'Error' },
    //   },
    // },
    {
      title: '交易流水号',
      dataIndex: 'tradeNo',
      hideInSearch: true,
    },
    {
      title: '手续费',
      dataIndex: 'serviceCharge',
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
            //   router.push(`merchantsBillsDetails/list/components?id=${record.merchantId}`);
            // }}
            
          >
            退款
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
          const response = await merchantsBillsDetails(pagination);
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
