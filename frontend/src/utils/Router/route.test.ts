import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from './Router';

test('loads and displays greeting', async () => {
  render(<Router />);
});
