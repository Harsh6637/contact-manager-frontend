import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ContactList from '../../ContactList';

describe('ContactList Integration', () => {
  it('renders "No results found" when the contacts list is empty', () => {
    render(<ContactList contacts={[]} deleteContact={() => {}} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders a list of contacts with delete buttons', () => {
    const contacts = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];

    render(<ContactList contacts={contacts} deleteContact={() => {}} />);

    expect(screen.getByText('John Doe - john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe - jane@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('Delete').length).toBe(2);
  });

  it('calls deleteContact with the correct ID when a delete button is clicked', () => {
    const mockDeleteContact = jest.fn();
    const contacts = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

    render(<ContactList contacts={contacts} deleteContact={mockDeleteContact} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteContact).toHaveBeenCalledWith(1);
  });
});
