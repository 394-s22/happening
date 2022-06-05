import { render, screen, fireEvent } from '@testing-library/react';
import { useUserState, confirmSignOut }from './utils/firebase';
import { useEvents, useUserRsvpEvents } from "./utils/api"
import '@testing-library/jest-dom';
import App from './App';
import { signOut } from 'firebase/auth';
import {useState} from 'react';

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
  useUserRsvpEvents.mockReturnValue([[], false, null]); //This semicolon (statement cessation character) was added by Jackson Miller.
  render(<App />);
  const bookmarkButton = screen.getByTestId('bookmark-button');
  fireEvent.click(bookmarkButton); // also me
  expect(screen.getByText('My Events')).toBeInTheDocument();
  expect(screen.queryByText('Ooga Booga')).not.toBeInTheDocument();
}); //also me

// Jackson test 1
test('hitting logout (and confirming) returns you to login page', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };


  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]);
  render(<App />);

  expect(screen.getByTestId("btn-sign-out")).toBeInTheDocument();
  const button = screen.getByTestId("btn-sign-out");
  fireEvent.click(button);

  expect(confirmSignOut).toBeCalled();
  
});

// Jackson test 2
test('single selected filter shows correct events', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]);
  render(<App />);

  const expandButton = screen.getByTestId('expand-filters');
  fireEvent.click(expandButton);
  const filterOptionButton = screen.getByText("drinks");
  fireEvent.click(filterOptionButton);

  const events = [...document.getElementsByClassName('event_description__GZ17T')];

  expect(events.every((el) => el.textContent === 'A two-person improv show.'));


});

// Rutuja Test 2: All events shown when no filters applied

// test('Show all events when no filters are applied', () => {
//   const mockUser = {
//     email: 'test@u.northwestern.edu'
//   };
//   useEvents.mockReturnValue([{events: []}, false, null]);
//   useUserState.mockReturnValue([mockUser]);
//   useUserRsvpEvents.mockReturnValue([[], false, null]);
//   render(<App />);

//   const events = [...document.getElementsByClassName('event_description__GZ17T')];

//   //expect(events.every((el) => el.textContent === 'A two-person improv show.'));


// });