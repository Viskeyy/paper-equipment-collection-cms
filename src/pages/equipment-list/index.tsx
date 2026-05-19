import { transformToUTCDay } from '@/utils/timer';
import { useNavigate } from '@tanstack/react-router';
import { Button, Col, DatePicker, Form, Input, Row, Table, Card } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import useSWR from 'swr';

interface EquipmentItem {
    id: string;
    created_at: string;
    device_name: string;
    device_model: string;
    device_id: string;
    sample_number: string;
    inspection_item: string;
    collection_time: string;
    inspection_data: string | null;
}

interface EquipmentTableResponse {
    data: {
        items: EquipmentItem[];
        total: number;
    };
}

interface InspectionDataItem {
    inspection_name: string;
    inspection_unit: string;
    inspection_value: string;
}

export const EquipmentTablePage = () => {
    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState({
        page: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useSWR<EquipmentTableResponse>(['/api/v1/equipment', queryParams], {
        refreshInterval: 30_000,
        revalidateOnFocus: true,
        keepPreviousData: true,
    });

    const columns = [
        { title: '设备名称', dataIndex: 'device_name' },
        { title: '设备型号', dataIndex: 'device_model' },
        { title: '设备 ID', dataIndex: 'device_id' },
        { title: '样品编号', dataIndex: 'sample_number' },
        { title: '检验项目', dataIndex: 'inspection_item' },
        {
            title: '采集时间',
            dataIndex: 'collection_time',
            render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '检测数据',
            dataIndex: 'inspection_data',
            render: (value: EquipmentItem['inspection_data']) => {
                if (!value) return '-';

                try {
                    const items = JSON.parse(value) as InspectionDataItem[];

                    if (!Array.isArray(items) || items.length === 0) {
                        return '-';
                    }

                    return (
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-1 text-left">检测名称</th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">检测单位</th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">检测值</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={`${item.inspection_name}-${index}`}>
                                        <td className="border border-gray-300 px-2 py-1">{item.inspection_name}</td>
                                        <td className="border border-gray-300 px-2 py-1">{item.inspection_unit}</td>
                                        <td className="border border-gray-300 px-2 py-1">{item.inspection_value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    );
                } catch {
                    return '-';
                }
            },
        },
        { title: '操作' },
    ];

    const tableData = data?.data.items ?? [];

    return (
        <Card title="设备信息列表">
            <Table
                rowKey="id"
                loading={isLoading}
                title={() => (
                    <Form
                        onFinish={(value) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                ...value,
                                page: 1,
                                collection_time: value.collection_time
                                    ? transformToUTCDay(value.collection_time)
                                    : undefined,
                            }))
                        }
                        onReset={() => setQueryParams({ page: 1, pageSize: 10 })}
                    >
                        <Row gutter={'1rem'}>
                            <Col span={6}>
                                <Form.Item label="设备名称" name="device_name">
                                    <Input placeholder="请输入设备名称" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="设备型号" name="device_model">
                                    <Input placeholder="请输入设备型号" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="样品编号" name="sample_number">
                                    <Input placeholder="请输入样品编号" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="检验项目" name="inspection_item">
                                    <Input placeholder="请输入检验项目" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="采集时间" name="collection_time">
                                    <DatePicker className="w-full" />
                                </Form.Item>
                            </Col>
                            <Col span={24} className="text-right">
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                                <Button className="ml-4" htmlType="reset">
                                    重置
                                </Button>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" onClick={() => navigate({ to: '/equipment-collection' })}>
                                    新增设备
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
                columns={columns}
                dataSource={tableData}
                pagination={{
                    total: data?.data.total ?? 0,
                    current: queryParams.page,
                    pageSize: queryParams.pageSize,
                    showTotal: (total, range) => `共 ${total} 条, 显示第 ${range[0]} ~ ${range[1]} 条数据`,
                    showSizeChanger: true,
                    onChange(page, pageSize) {
                        setQueryParams((prev) => ({ ...prev, page, pageSize }));
                    },
                }}
            />
        </Card>
    );
};
