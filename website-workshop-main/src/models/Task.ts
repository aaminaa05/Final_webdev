
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

export interface Tag {
  id: number;
  name: string;
}
