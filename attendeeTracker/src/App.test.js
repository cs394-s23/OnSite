

import { render, screen } from '@testing-library/react';
import App from './App';
import { useDbData } from './utilities/firebase';


jest.mock('./utilities/firebase');

const mockProfiles = {
  "people": {
    "00001": {
      "department": "marketing",
      "name": "Mock Name",
      "office": "Lisbon",
      "role": "Manager",
      "status": "remote"
    }
  }
};


test('renders App', async () => {
  // useDbData.mockReturnValue(mockProfiles);
  render(<App />)
  expect(await screen.findByText(/office/)).toBeVisible()
})


test('mock user on dashboard', async () => {
  useDbData.mockReturnValue(mockProfiles);
  render(
    <App />
  );
  expect(await screen.findByText('Mock Name', {}, { timeout: 3000})).toBeVisible();
})
