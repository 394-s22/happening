import { render, screen, fireEvent } from '@testing-library/react';
import { useUserState }from './utils/firebase';
import { useEvents, useUserRsvpEvents } from "./utils/api"
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./utils/firebase');
jest.mock('./utils/api');

test('page loads', () => {
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const headerElement = screen.getByText(/Happened/i);
  expect(headerElement).toBeInTheDocument();
});

test('non authenticated user', () => {
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const signInButton = screen.getByTestId("btn-sign-in");
  expect(signInButton).toBeInTheDocument();
});

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


// Quinton test 1 below
test('bookmark button takes you to My Events page', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null])
  render(<App />);
  const bookmarkButton = screen.getByTestId('bookmark-button');
  fireEvent.click(bookmarkButton)
  expect(screen.getByText('My Events')).toBeInTheDocument();
  expect(screen.queryByText('Ooga Booga')).not.toBeInTheDocument();
})