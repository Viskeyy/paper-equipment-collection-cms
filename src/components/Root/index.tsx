import { Outlet } from '@tanstack/react-router';

export const Root = () => (
    <div className="h-screen w-screen overflow-hidden p-4">
        <Outlet />
    </div>
);
