import { EquipmentCollectionPage } from '@/pages/equipment-collection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipment-collection/')({
    component: EquipmentCollectionPage,
});
