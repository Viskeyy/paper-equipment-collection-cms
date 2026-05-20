import { EquipmentTablePage } from '@/pages/equipment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipment/')({
    component: EquipmentTablePage,
});
