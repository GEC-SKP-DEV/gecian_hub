export type BusItem = {
  slug: string;
  name: string;
  category: 'college' | 'private'; // 👈 This fixes the TypeScript error
  pdfUrl?: string; // optional placeholder PDF
};

export const busData: BusItem[] = [
  {
    slug: 'bus-1',
    name: 'Bus 1 (Mannarkkad)',
    category: 'college',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-2',
    name: 'Bus 2 (Olavakkode)',
    category: 'college',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-3',
    name: 'Bus 3 (Pathirippala)',
    category: 'college',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-4',
    name: 'Bus 4 (Pattambi)',
    category: 'college',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'mannpatta-to-palakkad',
    name: 'Mannpatta to Palakkad (Private)',
    category: 'private',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'mannpatta-to-skp',
    name: 'Mannpatta to SKP (Private)',
    category: 'private',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'skp-to-otp',
    name: 'SKP to Ottappalam (Private)',
    category: 'private',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'skp-to-shr',
    name: 'SKP to Shornnur (Private)',
    category: 'private',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];