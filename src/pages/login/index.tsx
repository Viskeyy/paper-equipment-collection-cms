import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Form, Input, message, Typography } from 'antd';
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
        <div className="flex h-screen w-screen items-center justify-center">
            <Card className="w-120" variant="outlined">
                <Typography.Title level={3} className="text-center">
                    造纸院设备中心实验室数据采集系统
                </Typography.Title>
                <div className="mx-auto w-96">
                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
};
