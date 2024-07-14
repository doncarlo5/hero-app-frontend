const baseURL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => {
  return {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  };
};

const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};

export default fetchApi;
