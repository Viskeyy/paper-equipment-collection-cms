import { EquipmentTablePage } from '@/pages/equipment-list';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: EquipmentTablePage,
});
