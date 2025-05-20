import React from 'react';
import { render, screen } from '@testing-library/react';
import Rank from '../../../src/components/Rank/Rank';

describe('Rank Component', () => {
  it('displays the name and entries correctly', () => {
    const testName = 'Alice';
    const testEntries = 5;

    render(<Rank name={testName} entries={testEntries} />);

    expect(screen.getByText(`${testName}, your current entry count is:`)).toBeInTheDocument();
    expect(screen.getByText(testEntries.toString())).toBeInTheDocument();
  });
});

