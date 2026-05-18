import './index.css';
import { routeTree } from './routeTree.gen';
import { FetchError, fetcher } from '@/utils/fetcher';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

// import 'dayjs/locale/zh-cn';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider locale={zhCN}>
            <SWRConfig
                value={{
                    fetcher,
                    revalidateOnFocus: false,
                    shouldRetryOnError: (err) =>
                        !(
                            err instanceof FetchError &&
                            [401, 403, 404].includes(err.status)
                        ),
                    onError: (err) => {
                        if (err instanceof FetchError && err.status === 401) {
                            // TODO: 接入登录流程时跳登录页
                        }
                    },
                }}
            >
                <RouterProvider router={router} />
            </SWRConfig>
        </ConfigProvider>
    </StrictMode>,
);
