import { Col, Row, Statistic, Card } from 'antd';
import React from 'react';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: { marginBottom: 24 },
};

const IntroduceRowTop = ({ analysisTopData }: { loading: boolean; analysisTopData: any }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <Card bodyStyle={{ padding: '10px' }}>
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <Statistic title="商户总数" value={analysisTopData.merchantCount ? analysisTopData.merchantCount : '0'} />
          </div>
          <div className={styles.statItem}>
            <Statistic title="今日新增" value={analysisTopData.todyIncreasedMerchantCount ? analysisTopData.todyIncreasedMerchantCount : '0'}/>
          </div>
        </div>
      </Card>
    </Col>

    <Col {...topColResponsiveProps}>
      <Card bodyStyle={{ padding: '10px' }}>
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <Statistic title="交易订单数" value={analysisTopData.orderCount ? analysisTopData.orderCount : '0'} />
          </div>
          <div className={styles.statItem}>
            <Statistic title="交易金额(元)" value={analysisTopData.sumActualAmount ? analysisTopData.sumActualAmount : '0'} />
          </div>
        </div>
      </Card>
    </Col>

    <Col {...topColResponsiveProps}>
      <Card bodyStyle={{ padding: '10px' }}>
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <Statistic title="有效交易基数（元）" value={analysisTopData.sumValidTradeAmount ? analysisTopData.sumValidTradeAmount : '0'} />
          </div>
          <div className={styles.statItem}>
            <Statistic title="奖励金额（元 ）" value={analysisTopData.sumAwardTradeAmount ? analysisTopData.sumAwardTradeAmount : '0'} />
          </div>
        </div>
      </Card>
    </Col>

  </Row>
);

export default IntroduceRowTop;
