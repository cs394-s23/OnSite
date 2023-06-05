import {render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useApiData } from './utilities/firebase';

jest.mock('./utilities/firebase');

const mockProfiles = [
    {
        "fullName": "David",
        "department": "Support"
    },
    {
        "fullName": "Kim",
        "department": "Security"
    }
];

const mockValue = [mockProfiles, null];

// Simple test David Kim
test('the location data displays correctly', async () => {
    useApiData.mockReturnValue(mockValue);
    render(<App />)
    
    //click SP office location
    fireEvent.click(screen.getByText("SP"));
    //check if the location data is displayed
    expect(screen.queryByText('Sao Paulo (BR)')).toBeVisible();
    expect(screen.queryByText('Porto Alegre (BR)')).toBeNull();
    //check the other location
    fireEvent.click(screen.getByText("POA"));
    //check if the location data is displayed
    expect(screen.queryByText('Sao Paulo (BR)')).toBeNull();
    expect(screen.queryByText('Porto Alegre (BR)')).toBeVisible();
})

// Hard test David Kim
test('filter by location like Sao Paolo will show me all employees in Sao Paolo', async () => {
    useApiData.mockReturnValue(mockValue);
    render(<App />)

    //click SP office location
    fireEvent.click(screen.getByText("SP"));
    // David profile should be visible with the location
    expect(screen.queryByText('David')).toBeVisible();
    expect(screen.queryByText('Kim')).toBeNull();

    //click POA office location
    fireEvent.click(screen.getByText("POA"));
    //Kim profile should be visible with the location
    expect(screen.queryByText('Kim')).toBeVisible();
    expect(screen.queryByText('David')).toBeNull();
})