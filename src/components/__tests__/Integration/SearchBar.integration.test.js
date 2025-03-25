import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SearchBar from '../../SearchBar';

describe('SearchBar Integration', () => {
  it('renders correctly with input and button', () => {
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

  it('calls setSearchQuery when input changes', () => {
    const mockSetSearchQuery = jest.fn();

    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchContacts={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search Contacts'), {
      target: { value: 'John' },
    });
    expect(mockSetSearchQuery).toHaveBeenCalledWith('John');
  });

  it('calls searchContacts when the "Search" button is clicked', () => {
    const mockSearchContacts = jest.fn();

    render(
      <SearchBar
        searchQuery="John"
        setSearchQuery={() => {}}
        searchContacts={mockSearchContacts}
      />
    );

    fireEvent.click(screen.getByText('Search'));
    expect(mockSearchContacts).toHaveBeenCalled();
  });
});
