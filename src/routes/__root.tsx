import { Root } from '@/components/Root';
import { createRootRoute, redirect } from '@tanstack/react-router';

const AUTH_KEY = 'auth:logged-in';

export const Route = createRootRoute({
    beforeLoad: ({ location }) => {
        if (localStorage.getItem(AUTH_KEY) !== '1' && location.pathname !== '/login') {
            throw redirect({ to: '/login' });
        }
    },
    component: Root,
});
