import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MyEvents from './MyEvents';
import { useUserRsvpEvents } from '../utils/api';

jest.mock('../utils/api');

// Spencer Test 2
test('Only user\'s RSVPed events shown on My Events page', () => {
  const mockUser = {
    _id: 'testid0'
  };
  const mockRsvpEvents = [
    {
      __v: 0,
      _id: '62674d9b3ba75c3804b50130',
      title: 'The Real Skim Shady',
      location: 'McCormick Auditorium',
      time: 1651104000,
      description: 'A two-person improv show.',
      pictureUrl: 'https://cdn11.bigcommerce.com/s-q1qpuo8ch5/images/stencil/2048x2048/products/981/507/skimmilkhalf__61068.1554299719.jpg?c=2',
      filters: ['free', 'indoors', 'entertainment'],
      rsvp: ['testid0'],
    },
    {
      __v: 0,
      _id: '62674d9b3ba75c3804b50131',
      title: 'Cheers on the Lakefill',
      location: 'Northwestern Lakefill',
      time: 1651105000,
      description: 'Celebrate Class of 2022 senior donors with free food, soda, and beer.',
      pictureUrl: 'https://cdn11.bigcommerce.com/s-q1qpuo8ch5/images/stencil/2048x2048/products/981/507/skimmilkhalf__61068.1554299719.jpg?c=2',
      filters: ['free', 'outdoors'],
      rsvp: ['testid0'],
    },
  ];

  useUserRsvpEvents.mockReturnValue([mockRsvpEvents, false, null]);
  render(<MyEvents user={mockUser} onBackClick={() => null} />);

  expect(useUserRsvpEvents).toBeCalledWith(mockUser);
  mockRsvpEvents.forEach(event => {
    expect(screen.getByText(event.title)).toBeInTheDocument();
  });
});