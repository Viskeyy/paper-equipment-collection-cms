import type { SanitaryNapkinTableItem, SanitaryNapkinCreateItem, SanitaryNapkinFormItem } from './constant';
import { postJson, type ApiResponse } from '@/utils/fetcher';
import { transformToUTCString } from '@/utils/timer';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row } from 'antd';
import useSWRMutation from 'swr/mutation';

const MeasurementCard = ({ title, field }: { title: string; field: string }) => {
    return (
        <Row gutter={'1rem'}>
            <Col span={24}>{title}</Col>

            <Col span={8}>
                <Form.Item label="试样一" name={`${field}_1`} rules={[{ required: true, message: '请填写必填项' }]}>
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="试样二" name={`${field}_2`} rules={[{ required: true, message: '请填写必填项' }]}>
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="试样三" name={`${field}_3`} rules={[{ required: true, message: '请填写必填项' }]}>
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="试样四" name={`${field}_4`} rules={[{ required: true, message: '请填写必填项' }]}>
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="试样五" name={`${field}_5`} rules={[{ required: true, message: '请填写必填项' }]}>
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="平均时间" name={`${field}_avg`} rules={[{ required: true, message: '请填写必填项' }]}>
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
        </Row>
    );
};

export const EquipmentSanitaryNapkinCreate = () => {
    const navigate = useNavigate();

    const { trigger, isMutating } = useSWRMutation<
        ApiResponse<SanitaryNapkinTableItem>,
        Error,
        string,
        SanitaryNapkinCreateItem
    >('/api/v1/sanitary-napkin', postJson);

    const submit = async (values: SanitaryNapkinFormItem) => {
        const { print_time, ...rest } = values;
        const bodyData: SanitaryNapkinCreateItem = { ...rest, print_time: transformToUTCString(print_time) };

        try {
            const res = await trigger(bodyData);

            if (res.code !== 200001) {
                message.error(res.messages ?? '保存失败，请稍后重试');
                return;
            }

            message.success('保存成功');
            navigate({ to: '/sanitary-napkin' });
        } catch (error) {
            message.error(error instanceof Error ? error.message : '保存失败，请稍后重试');
        }
    };

    return (
        <Card title="卫生巾检测信息收集" className="w-full">
            <Form className="mx-auto! w-1/2" onFinish={submit}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="仪器编号"
                            name="instrument_no"
                            rules={[{ required: true, message: '请输入仪器编号' }]}
                        >
                            <Input placeholder="请输入仪器编号" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="样品编号"
                            name="sample_no"
                            rules={[{ required: true, message: '请输入样品编号' }]}
                        >
                            <Input placeholder="请输入样品编号" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="样品型号"
                            name="sample_model"
                            rules={[{ required: true, message: '请输入样品型号' }]}
                        >
                            <Input placeholder="请输入样品型号" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="加液次数"
                            name="liquid_add_count"
                            rules={[{ required: true, message: '请输入加液次数' }]}
                        >
                            <InputNumber
                                className="w-full!"
                                min={0}
                                precision={0}
                                placeholder="请输入加液次数"
                                controls={false}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="加液量"
                            name="liquid_add_volume"
                            rules={[{ required: true, message: '请输入加液量' }]}
                        >
                            <InputNumber
                                className="w-full!"
                                precision={3}
                                placeholder="请输入加液量"
                                controls={false}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="保压时间"
                            name="pressure_hold_time"
                            rules={[{ required: true, message: '请输入保压时间' }]}
                        >
                            <InputNumber
                                className="w-full!"
                                precision={3}
                                placeholder="请输入保压时间"
                                controls={false}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="打印时间"
                            name="print_time"
                            rules={[{ required: true, message: '请选择打印时间' }]}
                        >
                            <DatePicker showTime className="w-full" />
                        </Form.Item>
                    </Col>

                    <MeasurementCard title="一次吸收时间" field="first_absorb" />
                    <MeasurementCard title="二次吸收时间" field="second_absorb" />
                    <MeasurementCard title="回渗量" field="rewet" />

                    <Col span={24} className="text-right">
                        <Button type="primary" htmlType="submit" loading={isMutating}>
                            保存
                        </Button>
                        <Button className="ml-4" onClick={() => navigate({ to: '/sanitary-napkin' })}>
                            取消
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
