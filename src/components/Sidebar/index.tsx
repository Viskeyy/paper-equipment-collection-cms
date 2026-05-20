import { Link, useLocation } from '@tanstack/react-router';
import { Menu } from 'antd';

export const Sidebar = () => {
    const { pathname } = useLocation();

    const items = [
        { key: 'equipment', label: <Link to="/equipment">数据检表</Link> },
        { key: 'equipment-fee', label: <Link to="/equipment-fee">设备费</Link> },
        { key: 'sanitary-napkin', label: <Link to="/sanitary-napkin">卫生巾设备</Link> },
    ];

    const selectedKey = (() => {
        if (pathname.startsWith('/equipment-fee')) return 'equipment-fee';
        if (pathname.startsWith('/sanitary-napkin')) return 'sanitary-napkin';
        if (pathname.startsWith('/equipment')) return 'equipment';

        return '';
    })();

    return <Menu items={items} className="w-64" mode="vertical" selectedKeys={[selectedKey]} />;
};
