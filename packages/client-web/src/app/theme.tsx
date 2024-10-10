'use client';

import React, { FC, PropsWithChildren } from 'react';
import { useSwitchThemes } from '@/hooks/useSwitchThemes';

import { Layout } from '@douyinfe/semi-ui';

const { Header, Footer, Sider, Content } = Layout;
const commonStyle: React.CSSProperties = {
  height: 64,
  lineHeight: '64px',
  background: 'var(--semi-color-fill-0)',
  position: 'sticky',
  top: 0,
};

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  useSwitchThemes();
  return (
    <Layout className="h-100vh">
      <Sider style={{ width: '120px', background: 'var(--semi-color-fill-2)' }}>Sider</Sider>
      <Layout>
        <Header style={commonStyle}>Header</Header>
        <Content style={{ height: 300, lineHeight: '300px' }}>{children}</Content>
        <Footer style={commonStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};
