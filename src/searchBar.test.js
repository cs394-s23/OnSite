import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useApiData } from './utilities/firebase';

// const utils = require('./utilities/firebase');
jest.mock('./utilities/firebase');

const mockProfiles = [
  {
    "fullName": "Mock",
    "department": "Marketing"
  },
  {
    "fullName": "Mocked",
    "department": "Marketing"
  },
  {
    "fullName": "Fake",
    "department": "Human Resources"
  },
  {
    "fullName": "Prototype",
    "department": "Software Development"
  }
];

const mockValue = [mockProfiles, null];

test('search Input', async () => {
  useApiData.mockReturnValue(mockValue);
  render(<App />);

  const searchInput = screen.getByPlaceholderText('Looking for someone?');
  fireEvent.change(searchInput, { target: { value: 'test'}})
    
  expect(searchInput.value).toBe('test');
})

test('search Employee', async () => {
  useApiData.mockReturnValue(mockValue);
  render(<App />);

  const searchInput = screen.getByPlaceholderText('Looking for someone?');
  fireEvent.change(searchInput, { target: { value: 'Fake'}})
    
  expect(await screen.findByText('Fake')).toBeVisible();
})

