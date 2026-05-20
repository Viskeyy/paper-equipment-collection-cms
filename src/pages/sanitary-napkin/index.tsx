import type { SanitaryNapkinTableItem } from './constant';
import { useNavigate } from '@tanstack/react-router';
import type { TableColumnsType } from 'antd';
import { Button, Card, Col, Row, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import useSWR from 'swr';

export const EquipmentSanitaryNapkin = () => {
    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState({
        page: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useSWR(['/api/v1/sanitary-napkin', queryParams], {
        refreshInterval: 30_000,
        revalidateOnFocus: true,
        keepPreviousData: true,
    });

    const columns: TableColumnsType<SanitaryNapkinTableItem> = [
        { title: '仪器编号', dataIndex: 'instrument_no', key: 'instrument_no', fixed: 'left' },
        { title: '样品编号', dataIndex: 'sample_no', key: 'sample_no', fixed: 'left' },
        { title: '样品型号', dataIndex: 'sample_model', key: 'sample_model' },
        { title: '加液次数', dataIndex: 'liquid_add_count', key: 'liquid_add_count' },
        { title: '加液量', dataIndex: 'liquid_add_volume', key: 'liquid_add_volume' },
        { title: '保压时间', dataIndex: 'pressure_hold_time', key: 'pressure_hold_time' },
        {
            title: '一次吸收时间',
            children: [
                { title: '试样一', dataIndex: 'first_absorb_1', key: 'first_absorb_1' },
                { title: '试样二', dataIndex: 'first_absorb_2', key: 'first_absorb_2' },
                { title: '试样三', dataIndex: 'first_absorb_3', key: 'first_absorb_3' },
                { title: '试样四', dataIndex: 'first_absorb_4', key: 'first_absorb_4' },
                { title: '试样五', dataIndex: 'first_absorb_5', key: 'first_absorb_5' },
                { title: '平均时间', dataIndex: 'first_absorb_avg', key: 'first_absorb_avg' },
            ],
        },
        {
            title: '二次吸收时间',
            children: [
                { title: '试样一', dataIndex: 'second_absorb_1', key: 'second_absorb_1' },
                { title: '试样二', dataIndex: 'second_absorb_2', key: 'second_absorb_2' },
                { title: '试样三', dataIndex: 'second_absorb_3', key: 'second_absorb_3' },
                { title: '试样四', dataIndex: 'second_absorb_4', key: 'second_absorb_4' },
                { title: '试样五', dataIndex: 'second_absorb_5', key: 'second_absorb_5' },
                { title: '平均时间', dataIndex: 'second_absorb_avg', key: 'second_absorb_avg' },
            ],
        },
        {
            title: '回渗量',
            children: [
                { title: '试样一', dataIndex: 'rewet_1', key: 'rewet_1' },
                { title: '试样二', dataIndex: 'rewet_2', key: 'rewet_2' },
                { title: '试样三', dataIndex: 'rewet_3', key: 'rewet_3' },
                { title: '试样四', dataIndex: 'rewet_4', key: 'rewet_4' },
                { title: '试样五', dataIndex: 'rewet_5', key: 'rewet_5' },
                { title: '平均时间', dataIndex: 'rewet_avg', key: 'rewet_avg' },
            ],
        },
        {
            title: '打印时间',
            dataIndex: 'print_time',
            key: 'print_time',
            render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];

    const tableData = data?.data.items ?? [];

    return (
        <Card title="卫生巾检测数据列表" className="w-full">
            <Table
                title={() => (
                    <Row>
                        <Col span={24}>
                            <Button type="primary" onClick={() => navigate({ to: '/sanitary-napkin/create' })}>
                                新增记录
                            </Button>
                        </Col>
                    </Row>
                )}
                rowKey="id"
                bordered
                loading={isLoading}
                columns={columns}
                dataSource={tableData}
                scroll={{ x: 'max-content' }}
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
