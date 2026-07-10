import { Root } from '@/components/Root';
import { createRootRoute, redirect } from '@tanstack/react-router';

export const Route = createRootRoute({
    beforeLoad: ({ location }) => {
        const expire = localStorage.getItem('expire');
        if ((!expire || Date.now() > Number(expire)) && location.pathname !== '/login') {
            throw redirect({ to: '/login' });
        }
    },
    component: Root,
});
