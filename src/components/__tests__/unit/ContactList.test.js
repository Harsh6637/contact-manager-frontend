import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactList from '../../ContactList';

test('renders ContactList correctly', () => {
  const mockContacts = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
  render(<ContactList contacts={mockContacts} deleteContact={() => {}} />);
  expect(screen.getByText('John Doe - john@example.com')).toBeInTheDocument();
});

test('calls deleteContact when delete button is clicked', () => {
  const mockDeleteContact = jest.fn();
  const mockContacts = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
  render(<ContactList contacts={mockContacts} deleteContact={mockDeleteContact} />);
  fireEvent.click(screen.getByText('Delete'));
  expect(mockDeleteContact).toHaveBeenCalledWith(1);
});
