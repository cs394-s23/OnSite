import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useApiData } from './utilities/firebase';

jest.mock('./utilities/firebase');

const mockProfiles = [
  {
    "fullName": "Mock1",
    "department": "Marketing"
  },
  {
    "fullName": "Mock2",
    "department": "Mobile Development"
  },
  {
    "fullName": "Mock3",
    "department": "Human Resources"
  },
  {
    "fullName": "Other",
    "department": "Human Resources"
  }
];

const mockValue = [mockProfiles, null];

test('all names display', async () => {
  useApiData.mockReturnValue(mockValue);
  render(<App />);

  expect(await screen.findByText('Mock1')).toBeVisible();
  expect(await screen.findByText('Mock2')).toBeVisible();
  expect(await screen.findByText('Mock3')).toBeVisible();
  expect(await screen.findByText('Other')).toBeVisible();
});

test('search does not display false results', async () => {
  useApiData.mockReturnValue(mockValue);
  render(<App />);

  const searchInput = screen.getByPlaceholderText('Looking for someone?');

  expect(searchInput.value).toBe('');

  fireEvent.change(searchInput, { target: { value: 'Mock' } });

  expect(searchInput.value).toBe('Mock');
  expect(await screen.findByText('Mock1')).toBeVisible();
  expect(await screen.findByText('Mock2')).toBeVisible();
  expect(await screen.findByText('Mock3')).toBeVisible();
  expect(screen.queryByText('Other')).toBeNull();
});
