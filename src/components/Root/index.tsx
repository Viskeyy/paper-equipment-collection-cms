import { Sidebar } from '../Sidebar';
import { Outlet } from '@tanstack/react-router';

export const Root = () => (
    <div className="flex h-screen w-screen gap-4 overflow-hidden p-4">
        <div className="shrink-0">
            <Sidebar />
        </div>

        <div className="min-w-0 flex-1">
            <Outlet />
        </div>
    </div>
);
