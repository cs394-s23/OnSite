import { render, screen } from '@testing-library/react';
import App from './App';

it('has different department', async () => {
  render(<App />);
  await screen.findByText(/department/);
});
