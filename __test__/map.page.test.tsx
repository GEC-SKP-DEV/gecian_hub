import React from 'react';
import { render, screen } from '@testing-library/react';
import CollegeMapPage from '@/app/map/page';
import { floorData } from '@/data/map';

describe('CollegeMapPage', () => {
  it('renders floor buttons from data', () => {
    render(<CollegeMapPage />);
    floorData.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
