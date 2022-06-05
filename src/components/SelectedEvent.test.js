import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SelectedEvent from './SelectedEvent';
import { useUserState } from '../utils/firebase';

jest.mock('../utils/firebase');

// Spencer Test 1
test('All tags for event shown on page', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };
  const mockEvent = {
    __v: 0,
    _id: '62674d9b3ba75c3804b50130',
    title: 'The Real Skim Shady',
    location: 'McCormick Auditorium',
    time: 1651104000,
    description: 'A two-person improv show.',
    pictureUrl: 'https://cdn11.bigcommerce.com/s-q1qpuo8ch5/images/stencil/2048x2048/products/981/507/skimmilkhalf__61068.1554299719.jpg?c=2',
    filters: ['free', 'indoors', 'entertainment'],
    rsvp: [],
  };

  useUserState.mockReturnValue([mockUser]);
  render(<SelectedEvent event={mockEvent}/>);

  mockEvent.filters.forEach(tag => {
    expect(screen.getByText(tag)).toBeInTheDocument();
  });
});

// Rutuja Test 1 : Clicking event card opens up page with more information

test('Open Event Card with more information', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  const mockEvent = {
    __v: 0,
    _id: '62674d9b3ba75c3804b50130',
    title: 'The Real Skim Shady',
    location: 'McCormick Auditorium',
    time: 1651104000,
    description: 'A two-person improv show.',
    pictureUrl: 'https://cdn11.bigcommerce.com/s-q1qpuo8ch5/images/stencil/2048x2048/products/981/507/skimmilkhalf__61068.1554299719.jpg?c=2',
    filters: ['free', 'indoors', 'entertainment'],
    rsvp: [],
  };

  useUserState.mockReturnValue([mockUser]);
  render(<App />);

  const eventButton = screen.getByTestId('eventCard');
  fireEvent.click(eventButton)
  let selectedEvent = screen.getByTestId('selectedEventCard')
  expect(selectedEvent).toBeInTheDocument();

  });