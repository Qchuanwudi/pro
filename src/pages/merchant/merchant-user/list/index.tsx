import { Form, message , Result, Button} from 'antd';
import React, { useState, useRef } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { merchantsBillsDetails, merchantRefundOrder } from './service';
import OrderForm from './components/OrderForm';
import ResultForm from './components/ResultForm';

import router from 'umi/router';
import ReactDOM from 'react-dom';
interface TableListProps extends FormComponentProps { }

const TableList: React.FC<TableListProps> = () => {

  const actionRef = useRef<ActionType>();
  const [entity, handleEntity] = useState<any>();
  const [resultOrder, handleEntity2] = useState<any>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [createModalVisible2, handleModalVisible2] = useState<boolean>(false);
  /**
   * 退款
   * @param fields
   */
  const refundOrder = async fields => {
    
    const hide = message.loading('正在退款');
    const response = await merchantRefundOrder(fields);
    handleEntity2(response),
    handleModalVisible2(true)
    debugger;
    if (response.code === 0) {
      hide();
      message.success('退款成功');
      return true;
    }
    debugger;
    hide();
    message.error(response.message);
    return true;
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
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
      dataIndex: 'goodsList.goodsName',
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
      dataIndex: 'buyerPayAmount',
      hideInSearch: true,
    },
    {
      title: '支付方式',
      dataIndex: 'codeType',
      hideInSearch: true,
      align: 'center',
      initialValue: '',
      valueEnum: {
        '01': { text: '刷脸支付', status: 'Processing' },
        '02': { text: '扫码支付', status: 'Processing' },
        '03': { text: '刷卡支付', status: 'Processing' },
        '04': { text: '待定', status: 'Error' },
      },
    },
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
            onClick={async () => {
              handleEntity(record);
              handleModalVisible(true)
            }
            }
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
      <ProTable
        headerTitle="商户对账列表"
        size="middle"
        actionRef={actionRef}
        rowKey="userId"
        // onInit={setActionRef}
        pagination={{
          showSizeChanger: true,
        }}
        // rowSelection="true"
        request={async (params = {}) => {
          const pagination = { current: params.current, size: params.pageSize ,orders: [{ column: 'id', asc: false }],};

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
      <OrderForm
        onSubmit={async value => {
          let success = false;
          handleEntity(value);
          if (value.orderNo) {
            success = await refundOrder(value);
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
       <ResultForm
        onSubmit={async value => {
          let success = false;
          handleEntity(value);
          // if (value.orderNo) {
          //   success = await resultOrder(value);
          // }
          if (success) {
            handleModalVisible(false);
            actionRef.current!.reload();
          }
        }}
        entity={entity}
        resultOrder={resultOrder}
        onCancel={() => handleModalVisible2(false)}
        modalVisible={createModalVisible2}
      />


    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
