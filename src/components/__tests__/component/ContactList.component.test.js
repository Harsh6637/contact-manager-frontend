import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactList from '../../ContactList';

describe('ContactList Component', () => {
  it('renders no contacts message when contacts list is empty', () => {
    render(<ContactList contacts={[]} deleteContact={() => {}} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders contacts and delete button', () => {
    const contacts = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];

    render(<ContactList contacts={contacts} deleteContact={() => {}} />);

    expect(screen.getByText('John Doe - john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe - jane@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('Delete').length).toBe(2);
  });

  it('calls deleteContact with correct ID when delete button is clicked', () => {
    const mockDeleteContact = jest.fn();
    const contacts = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

    render(<ContactList contacts={contacts} deleteContact={mockDeleteContact} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(mockDeleteContact).toHaveBeenCalledWith(1);
  });
});
