/* eslint-env jest */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../../../src/components/Register/Register';

describe('Register Component', () => {
  const mockLoadUser = jest.fn();
  const mockOnRouteChange = jest.fn();

  beforeEach(() => {
    mockLoadUser.mockClear();
    mockOnRouteChange.mockClear();
  });

  test('renders all input fields and register button', () => {
    render(<Register loadUser={mockLoadUser} onRouteChange={mockOnRouteChange} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<Register loadUser={mockLoadUser} onRouteChange={mockOnRouteChange} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/new password/i);

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('Alice');
    expect(emailInput.value).toBe('alice@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits form and handles successful registration', async () => {
    const mockUser = { id: '123', name: 'Alice' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );

    render(<Register loadUser={mockLoadUser} onRouteChange={mockOnRouteChange} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'pass123' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/register', expect.anything());
      expect(mockLoadUser).toHaveBeenCalledWith(mockUser);
      expect(mockOnRouteChange).toHaveBeenCalledWith('home');
    });

    global.fetch.mockClear();
  });

  test('handles registration failure gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject('API error'));

    render(<Register loadUser={mockLoadUser} onRouteChange={mockOnRouteChange} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'bob@example.com' } });
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'secret' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(mockLoadUser).not.toHaveBeenCalled();
      expect(mockOnRouteChange).not.toHaveBeenCalled();
    });

    global.fetch.mockClear();
  });
});
