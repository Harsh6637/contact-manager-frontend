import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../ContactForm';

describe('ContactForm Component', () => {
  it('renders input fields and add button', () => {
    const mockSetName = jest.fn();
    const mockSetEmail = jest.fn();
    const mockAddContact = jest.fn();

    render(
      <ContactForm
        name=""
        email=""
        setName={mockSetName}
        setEmail={mockSetEmail}
        addContact={mockAddContact}
      />
    );

    expect(screen.getByPlaceholderText('Enter Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
  });

  it('calls setName and setEmail on input change', () => {
    const mockSetName = jest.fn();
    const mockSetEmail = jest.fn();

    render(
      <ContactForm
        name=""
        email=""
        setName={mockSetName}
        setEmail={mockSetEmail}
        addContact={jest.fn()}
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

  it('calls addContact when button is clicked', () => {
    const mockAddContact = jest.fn();

    render(
      <ContactForm
        name="John Doe"
        email="john@example.com"
        setName={jest.fn()}
        setEmail={jest.fn()}
        addContact={mockAddContact}
      />
    );

    fireEvent.click(screen.getByText('Add Contact'));

    expect(mockAddContact).toHaveBeenCalled();
  });
});
