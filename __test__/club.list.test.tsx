import React from 'react';
import { render, screen } from '@testing-library/react';
import ClubList from '@/components/club/ClubList';
import clubData from '@/data/club';

// Mock next/navigation useRouter used in ClubList
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

describe('ClubList', () => {
  it('renders club cards for all clubs from data', () => {
    render(<ClubList />);
    clubData.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
