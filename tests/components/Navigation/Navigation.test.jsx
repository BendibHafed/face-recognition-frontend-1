import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../../../src/components/Navigation/Navigation';

describe('Navigation Component', () => {
  test('renders Sign Out when signed in', () => {
    render(<Navigation isSignedIn={true} onRouteChange={() => {}} />);
    const signOutLink = screen.getByText(/sign out/i);
    expect(signOutLink).toBeInTheDocument();
  });

  test('renders Sign In and Register when signed out', () => {
    render(<Navigation isSignedIn={false} onRouteChange={() => {}} />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  test('calls onRouteChange with "signout" when Sign Out is clicked', () => {
    const mockRouteChange = jest.fn();
    render(<Navigation isSignedIn={true} onRouteChange={mockRouteChange} />);
    fireEvent.click(screen.getByText(/sign out/i));
    expect(mockRouteChange).toHaveBeenCalledWith('signout');
  });

  test('calls onRouteChange with "signin" and "register" when clicked', () => {
    const mockRouteChange = jest.fn();
    render(<Navigation isSignedIn={false} onRouteChange={mockRouteChange} />);
    
    fireEvent.click(screen.getByText(/register/i));
    expect(mockRouteChange).toHaveBeenCalledWith('register');

    fireEvent.click(screen.getByText(/sign in/i));
    expect(mockRouteChange).toHaveBeenCalledWith('signin');
  });
});
