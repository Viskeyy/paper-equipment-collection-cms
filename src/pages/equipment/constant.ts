import type { Dayjs } from 'dayjs';

type EquipmentItem<TCollectionTime, TInspectionData> = {
    device_name: string;
    device_model: string;
    device_id: string;
    sample_number: string;
    inspection_item: string;
    collection_time: TCollectionTime;
    inspection_data: TInspectionData | null;
};
export type EquipmentTableItem = EquipmentItem<string, string> & {
    id: string;
    created_at: string;
};
export type EquipmentCreateItem = EquipmentItem<string, string>;

type InspectionDataItem = {
    inspection_name: string;
    inspection_unit: string;
    inspection_value: string;
};
export type EquipmentFormItem = EquipmentItem<Dayjs, InspectionDataItem[]>;
