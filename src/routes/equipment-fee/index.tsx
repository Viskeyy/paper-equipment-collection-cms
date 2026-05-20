import { EquipmentFee } from '@/pages/equipment-fee';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipment-fee/')({
    component: EquipmentFee,
});
