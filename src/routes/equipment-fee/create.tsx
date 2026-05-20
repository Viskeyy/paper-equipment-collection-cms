import { EquipmentFeeCreate } from '@/pages/equipment-fee/create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipment-fee/create')({
    component: EquipmentFeeCreate,
});
