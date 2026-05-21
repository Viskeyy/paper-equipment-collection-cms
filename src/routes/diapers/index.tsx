import { SanitaryNapkinADiapersTable } from '@/pages/sanitary-napkin-a-diapers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/diapers/')({
    component: () => <SanitaryNapkinADiapersTable equipmentType="diapers" />,
});
