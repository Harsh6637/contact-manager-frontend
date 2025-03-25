import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ContactForm from '../../ContactForm';

describe('ContactForm Integration', () => {
  it('renders correctly with all inputs and buttons', () => {
    render(
      <ContactForm
        name=""
        email=""
        setName={() => {}}
        setEmail={() => {}}
        addContact={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Enter Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
  });

  it('calls setName and setEmail when inputs are changed', () => {
    const mockSetName = jest.fn();
    const mockSetEmail = jest.fn();

    render(
      <ContactForm
        name=""
        email=""
        setName={mockSetName}
        setEmail={mockSetEmail}
        addContact={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), {
      target: { value: 'john@example.com' },
    });

    expect(mockSetName).toHaveBeenCalledWith('John Doe');
    expect(mockSetEmail).toHaveBeenCalledWith('john@example.com');
  });

  it('calls addContact when the "Add Contact" button is clicked', () => {
    const mockAddContact = jest.fn();

    render(
      <ContactForm
        name="John Doe"
        email="john@example.com"
        setName={() => {}}
        setEmail={() => {}}
        addContact={mockAddContact}
      />
    );

    fireEvent.click(screen.getByText('Add Contact'));
    expect(mockAddContact).toHaveBeenCalled();
  });
});
