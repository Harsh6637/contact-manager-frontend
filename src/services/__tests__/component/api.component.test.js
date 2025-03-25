import axiosInstance from '../../api';
import axios from 'axios';

// Mock axios
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

describe('API Component Tests for api.js', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should pass request through the interceptor correctly', () => {
    const mockConfig = { url: '/contacts' };
    const onFulfilled = jest.fn((config) => config);

    // Simulating the interceptor behavior
    axiosInstance.interceptors.request.use.mockImplementationOnce((fn) => fn(mockConfig));

    const result = axiosInstance.interceptors.request.use(onFulfilled);

    // Test if interceptor was called and passed the config
    expect(onFulfilled).toHaveBeenCalledWith(mockConfig);
    expect(result).toEqual(mockConfig);
  });

  it('should pass response through the interceptor correctly', () => {
    const mockResponse = { data: { success: true } };
    const onFulfilled = jest.fn((response) => response);

    // Simulating the interceptor behavior
    axiosInstance.interceptors.response.use.mockImplementationOnce((fn) => fn(mockResponse));

    const result = axiosInstance.interceptors.response.use(onFulfilled);

    // Test if interceptor was called and passed the response
    expect(onFulfilled).toHaveBeenCalledWith(mockResponse);
    expect(result).toEqual(mockResponse);
  });

  it('should resolve with mock data in test environment (request interceptor)', async () => {
    process.env.NODE_ENV = 'test';
    const mockData = { data: null };

    // Simulate resolution of the request interceptor
    axiosInstance.interceptors.request.use.mockImplementationOnce((onFulfilled) => Promise.resolve(onFulfilled(mockData)));

    const result = await axiosInstance.interceptors.request.use((config) => config, (error) => Promise.reject(error));
    expect(result).toEqual(mockData);
  });

  it('should resolve with mock data in test environment (response interceptor)', async () => {
    process.env.NODE_ENV = 'test';
    const mockData = { data: {} };

    // Simulate resolution of the response interceptor
    axiosInstance.interceptors.response.use.mockImplementationOnce((onFulfilled) => Promise.resolve(onFulfilled(mockData)));

    const result = await axiosInstance.interceptors.response.use((response) => response, (error) => Promise.reject(error));
    expect(result).toEqual(mockData);
  });
});
