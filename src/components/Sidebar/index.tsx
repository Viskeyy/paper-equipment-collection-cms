import { Link } from '@tanstack/react-router';
import { Menu } from 'antd';

export const Sidebar = () => {
    const items = [
        { key: 'equipment-list', label: <Link to="/">数据检表</Link> },
        { key: 'equipment-fee', label: <Link to="/equipment-fee">设备费</Link> },
    ];

    return <Menu items={items} className="w-64" mode="vertical" defaultValue="equipment-list" />;
};
