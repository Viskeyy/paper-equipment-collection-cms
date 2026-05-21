import { SanitaryNapkinADiapersTable } from '@/pages/sanitary-napkin-a-diapers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sanitary-napkin/')({
    component: () => <SanitaryNapkinADiapersTable equipmentType="sanitaryNapkin" />,
});
