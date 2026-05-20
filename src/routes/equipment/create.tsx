import { EquipmentFormPage } from '@/pages/equipment/create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipment/create')({
    component: EquipmentFormPage,
});
