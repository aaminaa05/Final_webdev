
import { useState, useEffect } from 'react';
import { Task } from '@/models/Task';
import { fetchTasks, addTask, toggleTaskCompletion, removeTask } from '@/services/taskService';
import { useToast } from '@/components/ui/use-toast';

export type TaskFilter = 'all' | 'active' | 'completed';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const { toast } = useToast();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        toast({
          title: "Error",
          description: "Failed to load tasks",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [toast]);

  const handleAddTask = async (title: string, description: string) => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return false;
    }

    try {
      const task = await addTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
      
      setTasks([...tasks, task]);
      toast({
        title: "Success",
        description: "Task created successfully",
      });
      return true;
    } catch (error) {
      console.error('Failed to add task:', error);
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleToggleCompletion = async (task: Task) => {
    try {
      const updatedTask = await toggleTaskCompletion(task);
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      toast({
        title: task.completed ? "Task uncompleted" : "Task completed",
        description: `"${task.title}" has been ${task.completed ? 'uncompleted' : 'completed'}`,
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await removeTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Task deleted",
        description: "The task has been removed",
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    isLoading,
    filter,
    setFilter,
    handleAddTask,
    handleToggleCompletion,
    handleDeleteTask,
  };
};
