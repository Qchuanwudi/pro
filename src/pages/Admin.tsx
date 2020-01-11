import React from 'react';
import { Card, Typography, Alert, Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageHeaderWrapper content=" 这个页面只有 admin 权限才能查看">
    <Card>asasas</Card>
    <p style={{ textAlign: 'center', marginTop: 24 }}></p>
  </PageHeaderWrapper>
);
