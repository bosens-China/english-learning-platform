'use client';

import React, { FC, PropsWithChildren } from 'react';
// import { useSwitchThemes } from '@/hooks/useSwitchThemes';
import { Sider as LayoutSider } from './sider';
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
  // useSwitchThemes();
  return (
    <Layout className="h-100vh">
      <Sider style={{ background: 'var(--semi-color-fill-2)' }}>
        <LayoutSider />
      </Sider>
      <Layout>
        <Header className="z-1" style={commonStyle}>
          Header
        </Header>
        <Content className="p-24px">{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};
