import { render, screen, fireEvent } from '@testing-library/react';
import { useUserState }from '../utils/firebase';
import { useEvents } from "../utils/api"
import '@testing-library/jest-dom';
import App from '../App'

jest.mock('../utils/firebase');
jest.mock('../utils/api');

// Quinton test 2 below
test('Clicking filter adds it to the list, clicking again removes it', () => {
    const mockUser = {
        email: 'test@u.northwestern.edu'
      };

    useEvents.mockReturnValue([{events: []}, false, null]);
    useUserState.mockReturnValue([mockUser]);
    render(<App />);
    expect(screen.queryByText('nightlife')).not.toBeInTheDocument();
    const filterButton = screen.getByTestId('btn-filter');
    fireEvent.click(filterButton)
    let nightLifeButton = screen.getByText('nightlife')
    expect(nightLifeButton).toBeInTheDocument();
    expect(screen.queryByTestId('selected-filter-nightlife')).not.toBeInTheDocument();
    fireEvent.click(nightLifeButton);
    let selectedNightlife = screen.getByTestId('selected-filter-nightlife')
    expect(selectedNightlife).toBeInTheDocument();
    fireEvent.click(selectedNightlife)
    expect(screen.queryByTestId('selected-filter-nightlife')).not.toBeInTheDocument();


  })