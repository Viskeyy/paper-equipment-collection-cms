import { useNavigate } from '@tanstack/react-router';
import { Button, Form, Input, message, Typography } from 'antd';
import { useEffect } from 'react';

const EXPIRE_TIME = 3 * 24 * 60 * 60 * 1000;

type UserInfo = {
    username: string;
    password: string;
    fullname: string;
};

export const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = (values: { username: string; password: string }) => {
        const raw = JSON.parse(import.meta.env.VITE_USERS as string) || [];
        const matched = raw.find((u: UserInfo) => u.username === values.username && u.password === values.password);
        if (matched) {
            localStorage.setItem('fullname', matched.fullname);
            localStorage.setItem('expire', String(Date.now() + EXPIRE_TIME));
            message.success('登录成功');
            navigate({ to: '/equipment-info-collection' });
        } else {
            message.error('用户名或密码错误');
        }
    };

    useEffect(() => {
        const expire = localStorage.getItem('expire');
        if (expire && Date.now() < Number(expire)) {
            navigate({ to: '/equipment-info-collection' });
        } else {
            localStorage.removeItem('fullname');
            localStorage.removeItem('expire');
        }
    }, []);

    return (
        <div
            className="flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/login.png)' }}
        >
            <div className="w-[90%] border-0 bg-transparent md:w-112.5">
                <Typography.Title level={1} className="flex flex-col gap-4 text-center text-white!">
                    <span className="text-4xl">「造纸院设备中心」</span>
                    <span className="font-normal">实验室数据采集系统</span>
                </Typography.Title>
                <div className="mt-12">
                    <Form onFinish={onFinish}>
                        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input
                                placeholder="请输入用户名"
                                prefix={<img src="/icons/user.svg" alt="user" className="h-4 w-4" />}
                                size="large"
                                styles={{ root: { height: 50 } }}
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password
                                placeholder="请输入密码"
                                prefix={<img src="/icons/password.svg" alt="password" className="h-4 w-4" />}
                                size="large"
                                styles={{ root: { height: 50 } }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                styles={{ root: { height: 50 } }}
                                block
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
