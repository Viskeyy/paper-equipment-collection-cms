import { type DiapersItemPayload, type FormItem, type SanitaryNapkinItemPayload } from './constant';
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const MeasurementCard = ({ title, field }: { title: string; field: string }) => {
    return (
        <Row gutter={'1rem'}>
            <Col span={24}>{title}</Col>

            <Col span={8}>
                <Form.Item
                    label="试样一"
                    name={[field, `${field}_1`]}
                    rules={[{ required: true, message: '请填写必填项' }]}
                >
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="试样二"
                    name={[field, `${field}_2`]}
                    rules={[{ required: true, message: '请填写必填项' }]}
                >
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="试样三"
                    name={[field, `${field}_3`]}
                    rules={[{ required: true, message: '请填写必填项' }]}
                >
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="试样四"
                    name={[field, `${field}_4`]}
                    rules={[{ required: true, message: '请填写必填项' }]}
                >
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="试样五"
                    name={[field, `${field}_5`]}
                    rules={[{ required: true, message: '请填写必填项' }]}
                >
                    <InputNumber className="w-full!" precision={3} controls={false} />
                </Form.Item>
            </Col>
        </Row>
    );
};

export const EquipmentInfoCollectionForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const DIAPER_DEVICE_MODEL_OPTIONS = [
        { label: 'T025A', value: 'T025A' },
        { label: 'T025B', value: 'T025B' },
    ];
    const SANITARY_NAPKIN_DEVICE_MODEL_OPTIONS = [
        { label: 'T017B', value: 'T017B' },
        { label: 'T017C', value: 'T017C' },
    ];

    const submit = async (values: FormItem) => {
        setLoading(true);

        let bodyData: DiapersItemPayload | SanitaryNapkinItemPayload;

        const {
            sampling_at,
            first_absorption_time_samples,
            second_absorption_time_samples,
            third_absorption_time_samples,
            permeation_samples,
            back_seepage_samples,
            ...rest
        } = values;
        const commonData = {
            ...rest,
            sampling_at: dayjs(sampling_at).format('YYYY-MM-DDTHH:mm:ss'),
            first_absorption_time_samples: Object.values(first_absorption_time_samples),
            second_absorption_time_samples: Object.values(second_absorption_time_samples),
            back_seepage_samples: Object.values(back_seepage_samples),
        };
        const metaData = {
            source_ip: '127.0.0.1',
            project_name: 'default',
            laboratory: '第一实验室',
            tester: '测试员一',
        };

        if (values.device_type === 'diaper') {
            bodyData = {
                ...metaData,
                data: {
                    ...commonData,
                    third_absorption_time_samples: Object.values(third_absorption_time_samples ?? {}),
                    permeation_samples: Object.values(permeation_samples ?? {}),
                },
            };
        } else {
            bodyData = {
                ...metaData,
                data: commonData,
            };
        }

        try {
            const url = import.meta.env.VITE_API_URL;
            if (!url) {
                throw new Error('API URL is not defined');
            }

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });
            if (!res.ok) {
                throw new Error(`请求失败: ${res.status}`);
            }
            message.success('保存成功');
            form.resetFields();
        } catch (error) {
            message.error(error instanceof Error ? error.message : '保存失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    const deviceType = Form.useWatch('device_type', form);

    return (
        <Card
            title="设备检测信息收集"
            className="flex h-full w-full flex-col"
            styles={{ body: { flex: 1, minHeight: 0, overflowY: 'auto' } }}
        >
            <Form form={form} className="mx-auto! w-1/2" onFinish={submit}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="设备类型"
                            name="device_type"
                            rules={[{ required: true, message: '请选择设备类型' }]}
                        >
                            <Select
                                options={[
                                    { label: '纸尿裤', value: 'diaper' },
                                    { label: '卫生巾', value: 'sanitary' },
                                ]}
                                placeholder="请选择设备类型"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="设备型号"
                            name="device_model"
                            rules={[{ required: true, message: '请选择设备型号' }]}
                        >
                            <Select
                                options={
                                    deviceType === 'diaper'
                                        ? DIAPER_DEVICE_MODEL_OPTIONS
                                        : SANITARY_NAPKIN_DEVICE_MODEL_OPTIONS
                                }
                                placeholder="请选择设备型号"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="设备 ID"
                            name="device_id"
                            rules={[{ required: true, message: '请输入设备 ID' }]}
                        >
                            <Input placeholder="请输入设备 ID" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="样品编号"
                            name="sample_number"
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
                            name="times_of_add_liquid"
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
                            name="amount_of_liquid"
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
                            name="holding_time"
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
                            name="sampling_at"
                            rules={[{ required: true, message: '请选择打印时间' }]}
                        >
                            <DatePicker showTime className="w-full" />
                        </Form.Item>
                    </Col>

                    <MeasurementCard title="一次吸收时间" field="first_absorption_time_samples" />
                    <MeasurementCard title="二次吸收时间" field="second_absorption_time_samples" />
                    {deviceType === 'diaper' && (
                        <>
                            <MeasurementCard title="三次吸收时间" field="third_absorption_time_samples" />
                            <MeasurementCard title="渗透量" field="permeation_samples" />
                        </>
                    )}
                    <MeasurementCard title="回渗量" field="back_seepage_samples" />

                    <Col span={24} className="text-right">
                        <Button type="primary" htmlType="submit" loading={loading}>
                            保存
                        </Button>
                        <Button className="ml-4" onClick={() => form.resetFields()} loading={loading}>
                            取消
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
