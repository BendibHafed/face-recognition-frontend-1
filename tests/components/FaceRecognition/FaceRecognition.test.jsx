import React from 'react';
import { render, screen } from '@testing-library/react';
import FaceRecognition from '../../../src/components/FaceRecognition/FaceRecognition';

describe('FaceRecognition Component', () => {
  const testUrl = 'https://example.com/image.jpg';
  const testBox = {
    topRow: '10px',
    rightCol: '20px',
    bottomRow: '30px',
    leftCol: '40px',
  };

  test('renders image when imageUrl is provided', () => {
    render(<FaceRecognition imageUrl={testUrl} box={testBox} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testUrl);
  });

  test('renders bounding box with correct styles', () => {
    render(<FaceRecognition imageUrl={testUrl} box={testBox} />);
    const boxElement = document.querySelector('.bounding-box');
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveStyle(`top: ${testBox.topRow}`);
    expect(boxElement).toHaveStyle(`right: ${testBox.rightCol}`);
    expect(boxElement).toHaveStyle(`bottom: ${testBox.bottomRow}`);
    expect(boxElement).toHaveStyle(`left: ${testBox.leftCol}`);
  });
});
