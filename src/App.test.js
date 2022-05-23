import { render, screen } from '@testing-library/react';
import { useData, useUserState }from './utils/firebase';
import '@testing-library/jest-dom';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headerElement = screen.getByText(/Happened/i);
  expect(headerElement).toBeInTheDocument();
});

jest.mock('./utils/firebase');

test('authenticated user sees something different', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  useData.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue(mockUser);
  render(<App />)
  const signOutButton = screen.getByText(/Sign Out/i)
  expect(signOutButton).toBeInTheDocument();
})

test('non authenticated user', () => {
  useData.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue(null);
  render(<App />)
  const signOutButton = screen.getByText(/Sign In/i)
  expect(signOutButton).toBeInTheDocument();
})