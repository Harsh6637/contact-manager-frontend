import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../ContactForm';

test('renders ContactForm correctly', () => {
  render(<ContactForm name="" email="" setName={() => {}} setEmail={() => {}} addContact={() => {}} />);
  expect(screen.getByPlaceholderText('Enter Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
  expect(screen.getByText('Add Contact')).toBeInTheDocument();
});

test('calls addContact when the button is clicked', () => {
  const mockAddContact = jest.fn();
  render(<ContactForm name="John" email="john@example.com" setName={() => {}} setEmail={() => {}} addContact={mockAddContact} />);
  fireEvent.click(screen.getByText('Add Contact'));
  expect(mockAddContact).toHaveBeenCalled();
});
