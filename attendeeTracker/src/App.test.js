
import { render, screen } from '@testing-library/react';
import App from './App';

import { useDbData } from './utilities/firebase';

// vi.mock('../utilities/firebase');

const mockProfiles = {
  "88888": {
    "department": "marketing",
    "name": "Abby",
    "office": "Lisbon",
    "role": "Manager",
    "status": "remote"
  }
};

it('has different department', async () => {
  render(<App />);
  await screen.findByText(/department/);
});

it('mocking network call', () => {
  // useData.mockReturnValue([mockSchedule, false, null]);
  // useUserState.mockReturnValue(null);

  // useDbData.mockReturnValue(mockProfiles);

  render(<App />);
  const name = screen.queryByText(/Abby/);
  expect(name).toBeInTheDocument();
});
