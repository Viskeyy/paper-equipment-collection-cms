import { Sidebar } from '../Sidebar';
import { Outlet } from '@tanstack/react-router';

export const Root = () => (
    <div className="flex h-screen w-screen gap-4 p-4">
        <Sidebar />
        <Outlet />
    </div>
);
