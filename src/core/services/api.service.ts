import axios from 'axios';

/**
 * A singleton service for making API requests.
 */
class ApiService {
  /** Axios instance for making HTTP requests */
  apiClient: any;

  /** Singleton instance of ApiService */
  private static instance: ApiService;

  /**
   * Creates an instance of ApiService.
   * Ensures only one instance exists (Singleton pattern).
   */
  constructor() {
    if (!ApiService.instance) {
      ApiService.instance = this;
      this.apiClient = axios.create({
        baseURL: 'https://official-joke-api.appspot.com/jokes/random/250',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return ApiService.instance;
  }

  /**
   * Fetches jokes from the API.
   * @returns {Promise<any>} A promise that resolves to the fetched jokes.
   * @throws {Error} If the request fails, an error message is thrown.
   */
  public async get(): Promise<any> {
    try {
      const response = await this.apiClient.get();
      return response.data;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  /**
   * Handles API errors and returns a user-friendly message.
   * @param {any} error - The error object from Axios.
   * @returns {string} A descriptive error message.
   */
  private handleError(error: any): string {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      switch (error.response.status) {
        case 400:
          return 'Bad Request: Please check your input.';
        case 401:
          return 'Unauthorized: Please log in.';
        case 403:
          return 'Forbidden: You do not have permission.';
        case 404:
          return 'Not Found: The requested resource was not found.';
        case 500:
          return 'Internal Server Error: Please try again later.';
        default:
          return `Unexpected Error: ${error.response.status}`;
      }
    } else if (error.request) {
      // No response received from the server
      return 'Network Error: Please check your internet connection.';
    } else {
      // Other errors
      return `Error: ${error.message}`;
    }
  }
}

/** Singleton instance of ApiService */
const apiServiceInstance = new ApiService();
Object.freeze(apiServiceInstance);

export default apiServiceInstance;
