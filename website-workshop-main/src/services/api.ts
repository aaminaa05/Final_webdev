
import { Task, User, Category } from '../models/Task';

// Simulating a mock API
const API_URL = 'https://api.taskmanager.example';

// Authentication token handling
let authToken: string | null = null;

// Interface for API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Set authentication token
export const setToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

// Initialize token from localStorage
export const initializeToken = (): void => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    authToken = token;
  }
};

// Common headers for API requests
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
};

// Login function
export const login = async (email: string, password: string): Promise<ApiResponse<User>> => {
  // Simulate successful login
  if (email === 'user@example.com' && password === 'password') {
    const user: User = {
      id: 1,
      username: 'demouser',
      email: 'user@example.com',
      token: 'fake-jwt-token-for-demo',
    };
    
    setToken(user.token);
    
    return {
      data: user,
      status: 200,
    };
  }
  
  // Simulate login failure
  return {
    error: 'Invalid email or password',
    status: 401,
  };
};

// Logout function
export const logout = (): void => {
  setToken(null);
};

// Get all tasks
export const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  // Simulate API call
  if (!authToken) {
    return {
      error: 'Authentication required',
      status: 401,
    };
  }

  // Return mock data
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete project requirements',
      description: 'Review all requirements for the project',
      completed: false,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Fix UI bugs',
      description: 'There are some alignment issues in the dashboard',
      completed: true,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Meeting with client',
      description: 'Discuss project progress',
      completed: false,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
  ];

  return {
    data: tasks,
    status: 200,
  };
};

// Create a new task
export const createTask = async (task: Omit<Task, 'id' | 'userId' | 'createdAt'>): Promise<ApiResponse<Task>> => {
  if (!authToken) {
    return {
      error: 'Authentication required',
      status: 401,
    };
  }

  // Simulate creating a task
  const newTask: Task = {
    id: Math.floor(Math.random() * 1000),
    ...task,
    userId: 1,
    createdAt: new Date().toISOString(),
  };

  return {
    data: newTask,
    status: 201,
  };
};

// Update a task
export const updateTask = async (id: number, updates: Partial<Task>): Promise<ApiResponse<Task>> => {
  if (!authToken) {
    return {
      error: 'Authentication required',
      status: 401,
    };
  }

  // For demo, just return the updates as if they were saved
  return {
    data: {
      id,
      title: updates.title || 'Untitled Task',
      description: updates.description || '',
      completed: updates.completed || false,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    status: 200,
  };
};

// Delete a task
export const deleteTask = async (id: number): Promise<ApiResponse<null>> => {
  if (!authToken) {
    return {
      error: 'Authentication required',
      status: 401,
    };
  }

  // Simulate successful deletion
  return {
    status: 204,
  };
};

// Get categories (to demonstrate relationships between models)
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  if (!authToken) {
    return {
      error: 'Authentication required',
      status: 401,
    };
  }

  // Return mock categories with related tasks
  const categories: Category[] = [
    {
      id: 1,
      name: 'Work',
      description: 'Work related tasks',
      tasks: [
        {
          id: 1,
          title: 'Complete project requirements',
          description: 'Review all requirements for the project',
          completed: false,
          userId: 1,
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: 2,
      name: 'Personal',
      description: 'Personal tasks',
      tasks: [
        {
          id: 3,
          title: 'Meeting with client',
          description: 'Discuss project progress',
          completed: false,
          userId: 1,
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ];

  return {
    data: categories,
    status: 200,
  };
};
