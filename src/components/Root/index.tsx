import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';

const AUTH_KEY = 'auth:logged-in';

export const Root = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const showLogout = location.pathname !== '/login';

    return (
        <div className="h-screen w-screen overflow-hidden p-4">
            {showLogout && (
                <div className="flex justify-end">
                    <Button
                        type="link"
                        onClick={() => {
                            localStorage.removeItem(AUTH_KEY);
                            navigate({ to: '/login' });
                        }}
                    >
                        退出登录
                    </Button>
                </div>
            )}
            <Outlet />
        </div>
    );
};
