import { EquipmentSanitaryNapkin } from '@/pages/sanitary-napkin';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sanitary-napkin/')({
    component: EquipmentSanitaryNapkin,
});
