/* eslint-env jest */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signin from '../../../src/components/Signin/Signin';

describe('Signin component', () => {
  const mockLoadUser = jest.fn();
  const mockOnRouteChange = jest.fn();

  // Clean up mocks after each test to avoid interference between tests
  afterEach(() => {
    jest.clearAllMocks();
    if (global.fetch) {
      global.fetch.mockClear();
    }
  });

  beforeEach(() => {
    render(<Signin loadUser={mockLoadUser} onRouteChange={mockOnRouteChange} />);
  });

  it('renders Sign In form', () => {
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/sign-in/i)).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('123456');
  });

  it('calls fetch and props on successful sign in', async () => {
    const mockUser = { id: '123', name: 'Test User' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByDisplayValue(/sign-in/i));

    await waitFor(() => {
      expect(mockLoadUser).toHaveBeenCalledWith(mockUser);
      expect(mockOnRouteChange).toHaveBeenCalledWith('home');
    });
  });

  it('handles failed sign in gracefully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}), // no id returned
      })
    );

    window.alert = jest.fn(); // mock alert to avoid real popup

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByDisplayValue(/sign-in/i));

    await waitFor(() => {
      expect(mockLoadUser).not.toHaveBeenCalled();
      expect(mockOnRouteChange).not.toHaveBeenCalled();
      expect(window.alert).not.toHaveBeenCalled(); // optional, if your component calls alert on failure
    });
  });
});
