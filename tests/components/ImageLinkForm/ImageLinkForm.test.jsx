/* global describe, test, expect, beforeEach, afterEach, jest */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageLinkForm from '../../../src/components/ImageLinkForm/ImageLinkForm';

describe('ImageLinkForm Component', () => {
  test('renders input and button', () => {
    render(<ImageLinkForm onInputChange={() => {}} onPictureSubmit={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /detect/i })).toBeInTheDocument();
  });

  test('calls onInputChange when input changes', () => {
    const handleInputChange = jest.fn();
    render(<ImageLinkForm onInputChange={handleInputChange} onPictureSubmit={() => {}} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test image url' } });
    expect(handleInputChange).toHaveBeenCalledTimes(1);
  });

  test('calls onPictureSubmit when button is clicked', () => {
    const handleSubmit = jest.fn();
    render(<ImageLinkForm onInputChange={() => {}} onPictureSubmit={handleSubmit} />);
    
    const button = screen.getByRole('button', { name: /detect/i });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
