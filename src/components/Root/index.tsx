import { Outlet } from '@tanstack/react-router';

export const Root = () => {
    return (
        <div className="h-screen w-screen">
            <Outlet />
        </div>
    );
};
