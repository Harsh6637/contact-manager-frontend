import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Contact List Manager heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Contact List Manager/i); // Updated to match the correct heading
  expect(headingElement).toBeInTheDocument();
});

test('renders the Add Contact button', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Contact/i);
  expect(addButton).toBeInTheDocument();
});

test('renders the Search button', () => {
  render(<App />);
  const searchButton = screen.getByText(/Search/i);
  expect(searchButton).toBeInTheDocument();
});
