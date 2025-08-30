import React from 'react';
import { render, screen } from '@testing-library/react';
import BusPage from '@/app/bus/page';
import { busData } from '@/data/bus';

describe('BusPage', () => {
  it('renders all bus buttons based on data', () => {
    render(<BusPage />);
    busData.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
