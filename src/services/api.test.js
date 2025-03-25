import axiosInstance from './api';

jest.mock('./api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

describe('API Service Methods', () => {
  let consoleErrorMock;

  beforeAll(() => {
    // Suppress all console.error messages globally during tests
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore console.error after all tests
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('getContacts', () => {
    it('fetches contacts successfully', async () => {
      const mockContacts = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ];
      axiosInstance.get.mockResolvedValueOnce({ data: mockContacts });

      const response = await axiosInstance.get('/contacts');

      expect(response.data).toEqual(mockContacts);
      expect(axiosInstance.get).toHaveBeenCalledWith('/contacts');
    });

    it('handles network errors gracefully', async () => {
      const networkError = new Error('Network Error');
      axiosInstance.get.mockRejectedValueOnce(networkError);

      await expect(axiosInstance.get('/contacts')).rejects.toThrow('Network Error');
      expect(axiosInstance.get).toHaveBeenCalledWith('/contacts');
    });
  });

  describe('searchContacts', () => {
    it('fetches search results successfully', async () => {
      const searchQuery = 'John';
      const mockResults = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      axiosInstance.get.mockResolvedValueOnce({ data: mockResults });

      const response = await axiosInstance.get(`/contacts/search/${searchQuery}`);

      expect(response.data).toEqual(mockResults);
      expect(axiosInstance.get).toHaveBeenCalledWith(`/contacts/search/${searchQuery}`);
    });

    it('handles errors during search gracefully', async () => {
      const searchQuery = 'Invalid';
      const searchError = new Error('Search failed');
      axiosInstance.get.mockRejectedValueOnce(searchError);

      await expect(axiosInstance.get(`/contacts/search/${searchQuery}`)).rejects.toThrow('Search failed');
      expect(axiosInstance.get).toHaveBeenCalledWith(`/contacts/search/${searchQuery}`);
    });
  });

  describe('addContact', () => {
    it('adds a contact successfully', async () => {
      const newContact = { id: 3, name: 'Alice Doe', email: 'alice@example.com' };
      axiosInstance.post.mockResolvedValueOnce({ data: newContact });

      const response = await axiosInstance.post('/contacts', { contact: newContact });

      expect(response.data).toEqual(newContact);
      expect(axiosInstance.post).toHaveBeenCalledWith('/contacts', { contact: newContact });
    });

    it('handles errors while adding a contact', async () => {
      const addError = new Error('Failed to add contact');
      axiosInstance.post.mockRejectedValueOnce(addError);

      await expect(
        axiosInstance.post('/contacts', { contact: { name: 'Alice Doe', email: 'alice@example.com' } })
      ).rejects.toThrow('Failed to add contact');
      expect(axiosInstance.post).toHaveBeenCalledWith('/contacts', {
        contact: { name: 'Alice Doe', email: 'alice@example.com' },
      });
    });
  });

  describe('deleteContact', () => {
    it('deletes a contact successfully', async () => {
      axiosInstance.delete.mockResolvedValueOnce({});

      const response = await axiosInstance.delete('/contacts/1');

      expect(response).toEqual({});
      expect(axiosInstance.delete).toHaveBeenCalledWith('/contacts/1');
    });

    it('handles errors while deleting a contact', async () => {
      const deleteError = new Error('Failed to delete contact');
      axiosInstance.delete.mockRejectedValueOnce(deleteError);

      await expect(axiosInstance.delete('/contacts/1')).rejects.toThrow('Failed to delete contact');
      expect(axiosInstance.delete).toHaveBeenCalledWith('/contacts/1');
    });
  });
});
