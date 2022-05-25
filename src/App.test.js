import { render, screen } from '@testing-library/react';
import { useUserState }from './utils/firebase';
import { useEvents } from "./utils/api"
import '@testing-library/jest-dom';
import App from './App';

test('page loads', () => {
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const headerElement = screen.getByText(/Happened/i);
  expect(headerElement).toBeInTheDocument();
});

jest.mock('./utils/firebase');
jest.mock('./utils/api');

test('authenticated user sees something different', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const signOutButton = screen.getByTestId('btn-sign-out');
  expect(signOutButton).toBeInTheDocument();
});

test('non authenticated user', () => {
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const signOutButton = screen.getByTestId("btn-sign-in");
  expect(signOutButton).toBeInTheDocument();
});
