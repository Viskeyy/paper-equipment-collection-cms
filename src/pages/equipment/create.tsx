import type { EquipmentTableItem, EquipmentFormItem, EquipmentCreateItem } from './constant';
import { postJson, type ApiResponse } from '@/utils/fetcher';
import { transformToUTCString } from '@/utils/timer';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Col, DatePicker, Form, Input, Row, message } from 'antd';
import useSWRMutation from 'swr/mutation';

export const EquipmentFormPage = () => {
    const navigate = useNavigate();

    const { trigger, isMutating } = useSWRMutation<ApiResponse<EquipmentTableItem>, Error, string, EquipmentCreateItem>(
        '/api/v1/equipment',
        postJson,
    );

    const submit = async (value: EquipmentFormItem) => {
        const { collection_time, inspection_data, ...rest } = value;

        const bodyData: EquipmentCreateItem = {
            ...rest,
            collection_time: transformToUTCString(collection_time),
            inspection_data: JSON.stringify(inspection_data),
        };

        try {
            const res = await trigger(bodyData);
            if (res.code !== 200001) {
                throw new Error(res.message || '保存失败，请稍后重试');
            }
            message.success('保存成功');
            navigate({ to: '/' });
        } catch (error) {
            message.error(error instanceof Error ? error.message : '保存失败，请稍后重试');
        }
    };

    return (
        <Card title="设备信息收集">
            <Form onFinish={submit} className="mx-auto! w-1/2">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="设备名称"
                            name="device_name"
                            rules={[{ required: true, message: '请输入设备名称' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="设备型号"
                            name="device_model"
                            rules={[{ required: true, message: '请输入设备型号' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="设备 ID"
                            name="device_id"
                            rules={[{ required: true, message: '请输入设备 ID' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="样品编号"
                            name="sample_number"
                            rules={[{ required: true, message: '请输入样品编号' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="检验项目"
                            name="inspection_item"
                            rules={[{ required: true, message: '请输入检验项目' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="采集时间"
                            name="collection_time"
                            rules={[{ required: true, message: '请选择采集时间' }]}
                        >
                            <DatePicker className="w-full" showTime />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.List name="inspection_data">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field) => (
                                        <Row key={field.key} gutter={16}>
                                            <Col span={6}>
                                                <Form.Item label="检测名称" name={[field.name, 'inspection_name']}>
                                                    <Input placeholder="请输入检测名称" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item label="检测单位" name={[field.name, 'inspection_unit']}>
                                                    <Input placeholder="请输入检测单位" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item label="检测值" name={[field.name, 'inspection_value']}>
                                                    <Input placeholder="请输入检测值" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Button onClick={() => remove(field.name)}>删除</Button>
                                            </Col>
                                        </Row>
                                    ))}

                                    <Col span={24} className="px-0!">
                                        <Button onClick={() => add()}>新增一条检测数据</Button>
                                    </Col>
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} className="text-right">
                        <Button type="primary" htmlType="submit" loading={isMutating}>
                            保存
                        </Button>
                        <Button className="ml-4" onClick={() => navigate({ to: '/equipment' })}>
                            取消
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
