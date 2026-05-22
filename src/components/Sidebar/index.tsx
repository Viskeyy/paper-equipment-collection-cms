import { Link, useLocation } from '@tanstack/react-router';
import { Menu } from 'antd';

export const Sidebar = () => {
    const { pathname } = useLocation();

    const items = [
        // { key: 'equipment', label: <Link to="/equipment">数据检表</Link> },
        // { key: 'equipment-fee', label: <Link to="/equipment-fee">设备费</Link> },
        // { key: 'sanitary-napkin', label: <Link to="/sanitary-napkin">卫生巾设备</Link> },
        // { key: 'diapers', label: <Link to="/diapers">纸尿裤设备</Link> },
        { key: 'equipment-info-collection', label: <Link to="/equipment-info-collection">设备信息收集</Link> },
    ];

    const selectedKey = (() => {
        // if (pathname.startsWith('/equipment-fee')) return 'equipment-fee';
        // if (pathname.startsWith('/sanitary-napkin')) return 'sanitary-napkin';
        // if (pathname.startsWith('/equipment')) return 'equipment';
        // if (pathname.startsWith('/diapers')) return 'diapers';
        if (pathname.startsWith('/equipment-info-collection')) return 'equipment-info-collection';
        return '';
    })();

    return <Menu items={items} className="w-64" mode="vertical" selectedKeys={[selectedKey]} />;
};
