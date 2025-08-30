import React from 'react';
import { render, screen } from '@testing-library/react';
import FloorPage from '@/app/floor/page';
import { floors } from '@/data/floor';

describe('FloorPage', () => {
  it('renders all floors from data', () => {
    render(<FloorPage />);
    floors.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
