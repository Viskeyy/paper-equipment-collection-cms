import { EQUIPMENT_FEE_TYPE } from './constant';
import { postJson } from '@/utils/fetcher';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

export const EquipmentFeeCreate = () => {
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();
    const { trigger, isMutating } = useSWRMutation<CreateEquipmentResponse, Error, string, CreateEquipmentPayload>(
        '/api/v1/equipment-fee',
        postJson,
    );

    const submit = async (value: EquipmentCollectionItem) => {
        const bodyData: CreateEquipmentPayload = {
            ...value,
        };

        try {
            const result = await trigger(bodyData);

            await mutate((key) => Array.isArray(key) && key[0] === '/api/v1/equipment-fee', undefined, {
                revalidate: true,
            });

            message.success(result.message || '保存成功');
            navigate({ to: '/equipment-fee' });
        } catch (error) {
            message.error(error instanceof Error ? error.message : '保存失败，请稍后重试');
        }
    };

    return (
        <Card title="设备信息收集" className="w-full">
            <Form onFinish={submit} className="mx-auto! w-1/2">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="费用类型"
                            name="fee_type"
                            rules={[{ required: true, message: '请输入费用类型' }]}
                        >
                            <Select options={EQUIPMENT_FEE_TYPE} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="费用项" name="fee_item" rules={[{ required: true, message: '请输入费用项' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="估价" name="appraisal" rules={[{ required: true, message: '请输入估价' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="备注" name="remark">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-right">
                        <Button type="primary" htmlType="submit" loading={isMutating}>
                            保存
                        </Button>
                        <Button className="ml-4" onClick={() => navigate({ to: '/' })}>
                            取消
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
