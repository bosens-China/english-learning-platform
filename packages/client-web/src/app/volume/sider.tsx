import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconSemiLogo } from '@douyinfe/semi-icons';
import { IconBadge } from '@douyinfe/semi-icons-lab';

export const Sider = () => {
  return (
    <Nav
      defaultOpenKeys={['job']}
      defaultSelectedKeys={['信息录入']}
      defaultIsCollapsed={true}
      bodyStyle={{ height: 300 }}
      className="h-100vh"
      items={[
        { itemKey: '1', text: '新概念1', icon: <IconBadge /> },
        { itemKey: '2', text: '新概念2', icon: <IconBadge /> },
        { itemKey: '3', text: '新概念3', icon: <IconBadge /> },
        { itemKey: '4', text: '新概念4', icon: <IconBadge /> },
      ]}
      header={{
        logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
        text: 'Semi 运营后台',
      }}
      footer={{
        collapseButton: true,
      }}
    />
  );
};
