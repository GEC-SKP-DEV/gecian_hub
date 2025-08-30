export type FloorItem = {
  slug: string;
  name: string;
  pdfUrl?: string; // optional placeholder PDF
};

export const floors: FloorItem[] = [
  {
    slug: 'Ground Floor',
    name: 'Ground Floor',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'Floor-1',
    name: 'Floor 1',
    // Placeholder PDF; replace with /pdfs/floor-1.pdf in public/ when ready
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'Floor-2',
    name: 'Floor 2',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'Floor-3',
    name: 'Floor 3',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'Floor-4',
    name: 'Floor 4',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'Floor-5',
    name: 'Floor 5',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'Floor-6',
    name: 'Floor 6',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'Floor-7',
    name: 'Floor 7',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];
