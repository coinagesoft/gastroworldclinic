import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/servicesData';
import { CLINIC } from '@/lib/clinicInfo';

const service = getService('day-care-gi-procedures')!;

export const metadata: Metadata = {
  title: `${service.title} | ${CLINIC.name}`,
  description: service.tagline,
};

export default function Page() {
  return <ServicePage service={service} />;
}