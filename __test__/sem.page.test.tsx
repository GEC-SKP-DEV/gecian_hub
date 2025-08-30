import React from 'react';
import { render, screen } from '@testing-library/react';
import SemPage from '@/app/studymaterial/pages/sem';
import { semesters } from '@/data/study';

describe('SemPage', () => {
  it('renders all semesters from data', () => {
    render(<SemPage />);
    semesters.forEach((sem) => {
      expect(screen.getByText(sem)).toBeInTheDocument();
    });
  });
});
