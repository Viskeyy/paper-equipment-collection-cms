import { EquipmentInfoCollectionForm } from '@/pages/equipment-info-collection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipment-info-collection/')({
    component: EquipmentInfoCollectionForm,
});
