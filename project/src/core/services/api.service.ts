import axios from 'axios'

class ApiService {
  apiClient: any
  private static instance: ApiService
  constructor() {
    if (!ApiService.instance) {
      ApiService.instance = this
      this.apiClient = axios.create({
        baseURL: 'https://official-joke-api.appspot.com/jokes/random/250',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    return ApiService.instance
  }

   public async get() {
    try {
      const response = await this.apiClient.get();
      return response.data;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

    private handleError(error: any) {
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

const apiServiceInstance = new ApiService()
Object.freeze(apiServiceInstance)

export default apiServiceInstance
