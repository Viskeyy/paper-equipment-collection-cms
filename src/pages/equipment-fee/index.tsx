import { EQUIPMENT_FEE_TYPE, type EquipmentFeeTableItem } from './constant';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Col, Form, Row, Select, Table, type TableColumnsType } from 'antd';
import { useState } from 'react';
import useSWR from 'swr';

export const EquipmentFee = () => {
    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState({
        page: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useSWR(['/api/v1/equipment-fee', queryParams], {
        refreshInterval: 30_000,
        revalidateOnFocus: true,
        keepPreviousData: true,
    });

    const columns: TableColumnsType<EquipmentFeeTableItem> = [
        { title: '序号', render: (_: unknown, __: unknown, index: number) => index + 1 },
        {
            title: '费用类别',
            dataIndex: 'fee_type',
            render: (value: string) => EQUIPMENT_FEE_TYPE.find((item) => item.value === value)?.label || value,
        },
        { title: '费用项目', dataIndex: 'fee_item' },
        { title: '估价', dataIndex: 'appraisal' },
        { title: '备注', dataIndex: 'remark' },
    ];

    const tableData = data?.data ?? [];

    return (
        <Card title="设备费列表" className="w-full">
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
                            }))
                        }
                        onReset={() => setQueryParams({ page: 1, pageSize: 10 })}
                    >
                        <Row gutter={'1rem'}>
                            <Col span={6}>
                                <Form.Item label="费用类别" name="fee_type">
                                    <Select options={EQUIPMENT_FEE_TYPE} />
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
                                <Button type="primary" onClick={() => navigate({ to: '/equipment-fee/create' })}>
                                    新增记录
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
                scroll={{ x: 'max-content' }}
                columns={columns}
                bordered
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
