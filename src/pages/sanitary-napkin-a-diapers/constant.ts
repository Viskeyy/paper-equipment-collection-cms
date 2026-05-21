import type { Dayjs } from 'dayjs';

type SanitaryNapkinItem<TPrintTime> = {
    instrument_no: string;
    sample_no: string;
    sample_model: string;
    liquid_add_count: number;
    liquid_add_volume: number;
    pressure_hold_time: number;
    first_absorb_1: number;
    first_absorb_2: number;
    first_absorb_3: number;
    first_absorb_4: number;
    first_absorb_5: number;
    first_absorb_avg: number;
    second_absorb_1: number;
    second_absorb_2: number;
    second_absorb_3: number;
    second_absorb_4: number;
    second_absorb_5: number;
    second_absorb_avg: number;
    rewet_1: number;
    rewet_2: number;
    rewet_3: number;
    rewet_4: number;
    rewet_5: number;
    rewet_avg: number;
    print_time: TPrintTime;
};
export type SanitaryNapkinTableItem = SanitaryNapkinItem<string> & {
    id: string;
    created_at: string;
    updated_at: string;
};
export type SanitaryNapkinCreateItem = SanitaryNapkinItem<string>;
export type SanitaryNapkinFormItem = SanitaryNapkinItem<Dayjs>;
