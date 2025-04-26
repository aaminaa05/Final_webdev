
import { Task } from '../models/Task';
import { getTasks, createTask, updateTask, deleteTask } from './api';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await getTasks();
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data || [];
};

export const addTask = async (task: Omit<Task, 'id' | 'userId' | 'createdAt'>): Promise<Task> => {
  const response = await createTask(task);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data as Task;
};

export const toggleTaskCompletion = async (task: Task): Promise<Task> => {
  const response = await updateTask(task.id, { 
    completed: !task.completed 
  });
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data as Task;
};

export const removeTask = async (id: number): Promise<void> => {
  const response = await deleteTask(id);
  if (response.error) {
    throw new Error(response.error);
  }
};
