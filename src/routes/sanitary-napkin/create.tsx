import { EquipmentSanitaryNapkinCreate } from '@/pages/sanitary-napkin/create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sanitary-napkin/create')({
    component: EquipmentSanitaryNapkinCreate,
});
