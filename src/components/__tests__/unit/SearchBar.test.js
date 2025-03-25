import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../SearchBar';

test('renders SearchBar correctly', () => {
  render(<SearchBar searchQuery="" setSearchQuery={() => {}} searchContacts={() => {}} />);
  expect(screen.getByPlaceholderText('Search Contacts')).toBeInTheDocument();
  expect(screen.getByText('Search')).toBeInTheDocument();
});

test('calls searchContacts when the button is clicked', () => {
  const mockSearchContacts = jest.fn();
  render(<SearchBar searchQuery="John" setSearchQuery={() => {}} searchContacts={mockSearchContacts} />);
  fireEvent.click(screen.getByText('Search'));
  expect(mockSearchContacts).toHaveBeenCalled();
});
