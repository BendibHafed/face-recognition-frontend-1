/* eslint-env jest */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../../../src/components/Logo/Logo';

describe('Logo Component', () => {
  it('renders the logo image with correct alt text', () => {
    render(<Logo />);
    
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('is wrapped in a Tilt component', () => {
    const { container } = render(<Logo />);
    
    // Check Tilt wrapper by class name (since it's hard to check imported component types directly)
    const tiltElement = container.querySelector('.Tilt');
    expect(tiltElement).toBeInTheDocument();
  });
});
