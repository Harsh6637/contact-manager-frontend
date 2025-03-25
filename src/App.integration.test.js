import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axiosInstance from './services/api';

// Mock axiosInstance
jest.mock('./services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('fetches and displays contacts on load', async () => {
  // Mock API response for fetching contacts
  axiosInstance.get.mockResolvedValueOnce({
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ],
  });

  render(<App />);

  // Assert that contacts are fetched and displayed
  await waitFor(() => {
    expect(screen.getByText(/John Doe - john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe - jane@example.com/i)).toBeInTheDocument();
  });
});

test('adds a contact and displays it in the list', async () => {
  // Mock API responses
  axiosInstance.get.mockResolvedValueOnce({ data: [] }); // Initial fetch
  axiosInstance.post.mockResolvedValueOnce({
    data: { id: 3, name: 'New Contact', email: 'new@example.com' },
  });
  axiosInstance.get.mockResolvedValueOnce({
    data: [
      { id: 3, name: 'New Contact', email: 'new@example.com' },
    ],
  });

  render(<App />);

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText(/Enter Name/i), {
    target: { value: 'New Contact' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
    target: { value: 'new@example.com' },
  });

  // Click the "Add Contact" button
  fireEvent.click(screen.getByText(/Add Contact/i));

  // Assert that the new contact is displayed in the list
  await waitFor(() => {
    expect(screen.getByText(/New Contact - new@example.com/i)).toBeInTheDocument();
  });
});

test('searches for a contact and displays the result', async () => {
  // Mock API response for the search request
  axiosInstance.get.mockResolvedValueOnce({
    data: [
      { id: 1, name: 'Search Result', email: 'search@example.com' },
    ],
  });

  render(<App />);

  // Enter search query
  fireEvent.change(screen.getByPlaceholderText(/Search Contacts/i), {
    target: { value: 'Search Result' },
  });

  // Click the "Search" button
  fireEvent.click(screen.getByText(/Search/i));

  // Assert that the search result is displayed
  await waitFor(() => {
    expect(screen.getByText(/Search Result - search@example.com/i)).toBeInTheDocument();
  });
});

test('shows a message if no contacts match the search', async () => {
  // Mock API response for no search results
  axiosInstance.get.mockResolvedValueOnce({ data: [] });

  render(<App />);

  // Enter a non-existent contact in the search field
  fireEvent.change(screen.getByPlaceholderText(/Search Contacts/i), {
    target: { value: 'Nonexistent' },
  });

  // Click the "Search" button
  fireEvent.click(screen.getByText(/Search/i));

  // Assert that the "no results" message appears
  await waitFor(() => {
    expect(
      screen.getByText(/No results found./i)
    ).toBeInTheDocument();
  });
});

test('deletes a contact from the list', async () => {
  // Mock API responses
  axiosInstance.get
    .mockResolvedValueOnce({
      data: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ],
    }) // Initial fetch
    .mockResolvedValueOnce({
      data: [{ id: 2, name: 'Jane Doe', email: 'jane@example.com' }], // After deletion
    });

  axiosInstance.delete.mockResolvedValueOnce({});

  render(<App />);

  // Assert initial contacts are displayed
  await waitFor(() => {
    expect(screen.getByText(/John Doe - john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe - jane@example.com/i)).toBeInTheDocument();
  });

  // Click the "Delete" button for John Doe
  fireEvent.click(screen.getAllByText(/Delete/i)[0]);

  // Assert that John Doe is removed from the list
  await waitFor(() => {
    expect(screen.queryByText(/John Doe - john@example.com/i)).not.toBeInTheDocument();
  });
});
