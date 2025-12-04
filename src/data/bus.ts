export type BusItem = {
  slug: string;
  name: string;
  pdfUrl?: string; // optional placeholder PDF
};

export const busData: BusItem[] = [
  {
    slug: 'bus-1',
    name: 'Bus 1 (Markad)',
    // Placeholder PDF; replace with /pdfs/bus-1.pdf in public/ when ready
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-2',
    name: 'Bus 2 (olava)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-3',
    name: 'Bus 3 (pathirp)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-4',
    name: 'Bus 4(Patmbi)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-5',
    name: 'Bus 5(shnor)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];
