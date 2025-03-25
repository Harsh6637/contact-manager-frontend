import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../SearchBar';

describe('SearchBar Component', () => {
  it('renders input and search button', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={() => {}}
        searchContacts={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Search Contacts')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls setSearchQuery on input change', () => {
    const mockSetSearchQuery = jest.fn();

    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchContacts={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search Contacts'), {
      target: { value: 'Jane Doe' },
    });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('Jane Doe');
  });

  it('calls searchContacts when search button is clicked', () => {
    const mockSearchContacts = jest.fn();

    render(
      <SearchBar
        searchQuery="Jane"
        setSearchQuery={() => {}}
        searchContacts={mockSearchContacts}
      />
    );

    fireEvent.click(screen.getByText('Search'));

    expect(mockSearchContacts).toHaveBeenCalled();
  });
});
