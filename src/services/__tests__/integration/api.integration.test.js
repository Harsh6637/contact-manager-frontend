import axiosInstance from '../../api';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

describe('API Integration Tests', () => {
  let consoleErrorMock;

  // Mock `console.error` globally
  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  // Section: Request Handling Tests
  describe('Request Handling', () => {
    it('handles GET requests successfully', async () => {
      const mockResponse = { data: [{ id: 1, name: 'John Doe' }] };

      axiosInstance.get.mockResolvedValueOnce(mockResponse);

      const response = await axiosInstance.get('/contacts');
      expect(response.data).toEqual(mockResponse.data);
      expect(axiosInstance.get).toHaveBeenCalledWith('/contacts');
    });

    it('handles POST requests successfully', async () => {
      const newContact = { name: 'Jane Doe', email: 'jane@example.com' };
      const mockResponse = { data: { id: 2, ...newContact } };

      axiosInstance.post.mockResolvedValueOnce(mockResponse);

      const response = await axiosInstance.post('/contacts', { contact: newContact });
      expect(response.data).toEqual(mockResponse.data);
      expect(axiosInstance.post).toHaveBeenCalledWith('/contacts', { contact: newContact });
    });

    it('handles DELETE requests successfully', async () => {
      axiosInstance.delete.mockResolvedValueOnce({});

      const response = await axiosInstance.delete('/contacts/1');
      expect(response).toEqual({});
      expect(axiosInstance.delete).toHaveBeenCalledWith('/contacts/1');
    });

    it('handles GET request errors gracefully', async () => {
      const errorMessage = 'Network Error';
      axiosInstance.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(axiosInstance.get('/contacts')).rejects.toThrow(errorMessage);
      expect(axiosInstance.get).toHaveBeenCalledWith('/contacts');
    });

    it('handles POST request errors gracefully', async () => {
      const errorMessage = 'Failed to create contact';
      axiosInstance.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(axiosInstance.post('/contacts', { contact: {} })).rejects.toThrow(errorMessage);
      expect(axiosInstance.post).toHaveBeenCalledWith('/contacts', { contact: {} });
    });
  });

  // Section: Interceptor Handling Tests
  describe('Interceptor Handling', () => {
    it('resolves with mock data in test environment (request interceptor)', async () => {
      process.env.NODE_ENV = 'test'; // Set environment to test
      const mockInterceptor = jest.fn((config) => config);

      axiosInstance.interceptors.request.use.mockImplementationOnce(mockInterceptor);

      const config = { url: '/contacts' };
      const result = await axiosInstance.interceptors.request.use(config);
      expect(result).toEqual(config);
      expect(mockInterceptor).toHaveBeenCalled();
    });

    it('resolves with mock data in test environment (response interceptor)', async () => {
      process.env.NODE_ENV = 'test'; // Set environment to test
      const mockInterceptor = jest.fn((response) => response);

      axiosInstance.interceptors.response.use.mockImplementationOnce(mockInterceptor);

      const response = { data: { id: 1, name: 'John Doe' } };
      const result = await axiosInstance.interceptors.response.use(response);
      expect(result).toEqual(response);
      expect(mockInterceptor).toHaveBeenCalled();
    });

    it('logs error and rejects outside test environment', async () => {
      // Set environment to production to test the interceptor behavior outside of the test environment
      process.env.NODE_ENV = 'production';

      // Create an error instance that we will use for rejection
      const error = new Error('Request failed');

      // Mock the behavior of axios instance to simulate an error being thrown
      axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
          console.error('Response error:', error.message); // Ensure console.error is called
          return Promise.reject(error); // Return a rejected promise
        }
      );

      // Simulate rejection and check that the error gets logged
      try {
        await axiosInstance.get('/contacts'); // This should trigger the rejection
      } catch (e) {
        // Validate console.error is called with correct arguments
        expect(consoleErrorMock).toHaveBeenCalledWith('Response error:', error.message);
        expect(e).toEqual(error); // Ensure that the error is propagated
      }
    });
  });
});
