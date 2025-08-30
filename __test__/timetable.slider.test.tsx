import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeTableSlider } from '@/components/home/TimeTableSlider';
import { timetableData } from '@/data/timetable';

describe('TimeTableSlider', () => {
  it('renders current day data and pagination', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();

    render(
      <TimeTableSlider
        currentDay={0}
        onPrevDay={onPrev}
        onNextDay={onNext}
      />
    );

    // displays the first day title from data
    expect(screen.getByText(timetableData[0].day)).toBeInTheDocument();

    // renders pagination indicators equal to number of days
    const dots = document.querySelectorAll('.size-2.rounded-full');
    expect(dots.length).toBe(timetableData.length);

    // right nav works (not disabled at index 0)
    const rightBtn = screen.getByTestId('chevron-right-icon').closest('button');
    expect(rightBtn).toBeInTheDocument();
    if (rightBtn) fireEvent.click(rightBtn);
    expect(onNext).toHaveBeenCalled();

    // left nav disabled at index 0
    const leftBtn = screen.getByTestId('chevron-left-icon').closest('button');
    expect(leftBtn).toBeInTheDocument();
    if (leftBtn) expect(leftBtn).toBeDisabled();
  });
});
