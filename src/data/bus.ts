export type BusItem = {
  slug: string;
  name: string;
  pdfUrl?: string; // optional placeholder PDF
};

export const busData: BusItem[] = [
  {
    slug: 'bus-1',
    name: 'Bus 1',
    // Placeholder PDF; replace with /pdfs/bus-1.pdf in public/ when ready
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-2',
    name: 'Bus 2',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-3',
    name: 'Bus 3',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-4',
    name: 'Bus 4',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-5',
    name: 'Bus 5',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-6',
    name: 'Bus 6',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];
