import { SanitaryNapkinADiapersForm } from '@/pages/sanitary-napkin-a-diapers/create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/diapers/create')({
    component: () => <SanitaryNapkinADiapersForm equipmentType="diapers" />,
});
