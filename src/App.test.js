import { render, screen } from '@testing-library/react';
import App from './App';
import { useApiData } from './utilities/firebase';

// const utils = require('./utilities/firebase');
jest.mock('./utilities/firebase');

const mockProfiles = [
  {
    "fullName": "Mock",
    "department": "Marketing"
  }
];

const mockValue = [mockProfiles, null];


test('renders App', async () => {
  useApiData.mockReturnValue(mockValue);
  render(<App />)
  expect(await screen.findByText(/office/)).toBeVisible()
})

test('mock user on dashboard', async () => {
  useApiData.mockReturnValue(mockValue);
  render(
    <App />
  );
  expect(await screen.findByText('Mock')).toBeVisible();
})
