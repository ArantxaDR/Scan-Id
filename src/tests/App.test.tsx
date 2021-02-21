import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { HashRouter } from 'react-router-dom';

test('renders Scan your ID', () => {
  render(<HashRouter><App /></HashRouter>);
  const linkElement = screen.getByText(/Scan your ID/i);
  expect(linkElement).toBeInTheDocument();
});
