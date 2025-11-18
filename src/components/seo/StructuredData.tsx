import type { StructuredDataSchema } from '@/types/seo';

interface StructuredDataProps {
  data: StructuredDataSchema;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
