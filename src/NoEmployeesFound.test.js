import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useApiData } from './utilities/firebase';

jest.mock('./utilities/firebase');

const mockProfiles = [
  {
    "fullName": "M1",
    "department": "Marketing"
  },
  {
    "fullName": "M2",
    "department": "Mobile Development"
  },
  {
    "fullName": "M3",
    "department": "Human Resources"
  }
];

const mockValue = [mockProfiles, null];
const mockNoData = [[], null];

test('"No employees found" displays when the API doesn\'t return any data', async () => {
    useApiData.mockReturnValue(mockNoData);
    render(<App />);
  
    expect(await screen.findByText('No employees found')).toBeVisible();
});

test('"No employees found" displays when a search returns no employees', async () => {
    useApiData.mockReturnValue(mockValue);
    render(<App />);
  
    const search = screen.getByPlaceholderText('Looking for someone?');
  
    expect(search.value).toBe('');
  
    fireEvent.change(search, { target: { value: 'M4' } });
  
    expect(screen.queryByText('M4')).toBeNull();
    expect(screen.queryByText('No employees found')).toBeVisible();
  });