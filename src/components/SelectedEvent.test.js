import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App'
import SelectedEvent from './SelectedEvent';
import { useUserState } from '../utils/firebase';
import { useEvents } from "../utils/api";

jest.mock('../utils/firebase');
jest.mock('../utils/api');

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

  useEvents.mockReturnValue([{events: [{"_id":{"$oid":"62674ace3ba75c3804b4f8e8"},"title":"Refresh Presents: The Universe","location":"Ryan Auditorium","time":{"$numberInt":"1656816897"},"description":"3 years after our last in-person spring show, Refresh Dance Crew is so excited to present its SIXTH annual spring show: THE UNIVERSE. Our team has continued to grow to an astronomical size and have worked so hard (while staying safe!) to perform choreography and freestyle sets that are out of this world. 🪐 WHEN & WHERE 🪐 April 29th / 9PM April 30th / 7PM & 10PM @ Tech Ryan Auditorium ☄️ TICKETS ☄️ $5 Wildcard / $7 Without LINK COMING SOON Tickets will NOT be available for purchase at door Stay tuned for more details and sneakpeeks to come... ","pictureUrl":"https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/278958501_659882258721394_4538617596824949587_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=340051&_nc_ohc=ne8MEWHI4n8AX96YWpl&_nc_ht=scontent-ort2-1.xx&oh=00_AT9cgxVMFK_EG3mH95qwnIkl18ZgdAue0f-X7JPAi25jDg&oe=626C34B5","filters":["nightlife","entertainment"],"rsvp":[]}]}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);

  const eventButton = screen.getByTestId('eventCard');
  fireEvent.click(eventButton)
  let selectedEvent = screen.getByTestId('selectedEventCard')
  expect(selectedEvent).toBeInTheDocument();

  });

  // Yabi Test 2
test('RSVP increments and decrements', () => {
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

  const rsvpButton = screen.getByTestId('rsvp-button');
  
  expect(screen.getByText('Number of attendees 0')).toBeInTheDocument();

  fireEvent.click(rsvpButton); 
  expect(screen.getByText('Number of attendees 1')).toBeInTheDocument();

  const cancelButton = screen.getByTestId('cancel-button');
  fireEvent.click(cancelButton); 
  expect(screen.getByText('Number of attendees 0')).toBeInTheDocument();

});