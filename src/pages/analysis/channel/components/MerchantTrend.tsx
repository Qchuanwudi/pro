import { Card, Col, Icon, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { SearchDataType, VisitDataType, OfflineChartData, OfflineDataType } from '../data.d';

import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

import { TimelineChart, Pie } from './Charts';

const MerchantTrend = ({
  loading,
  offlineChartData,
}: {
  loading: boolean;
  offlineChartData: OfflineChartData[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    title='商户增长趋势'
    style={{
      height: '100%',
    }}
  >
    <Col sm={24} xs={24} style={{ marginBottom: 0 }}>
          <div style={{ padding: '0' }}>
            <TimelineChart
              height={400}
              data={offlineChartData}
              titleMap={{
                y1: '商户总数',
                y2: '新增商户',
              }}
            />
          </div>
      </Col>
  </Card>
);

export default MerchantTrend;
