
import React from 'react';
import { Task } from '@/models/Task';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  isLoading: boolean;
}

const TaskList = ({ tasks, onToggleCompletion, onDeleteTask, isLoading }: TaskListProps) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No tasks found. Create a new task to get started.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li 
          key={task.id} 
          className={`flex items-start justify-between p-4 border rounded-lg transition-all duration-200 ${
            task.completed 
              ? 'bg-muted/30 border-accent/50' 
              : 'bg-white hover:shadow-md border-muted'
          }`}
        >
          <div className="flex items-start space-x-3 flex-1">
            <Checkbox 
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => onToggleCompletion(task)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <label 
                htmlFor={`task-${task.id}`}
                className={`font-medium block ${
                  task.completed 
                    ? 'line-through text-muted-foreground' 
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </label>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 break-words">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDeleteTask(task.id)}
            className="text-destructive hover:bg-destructive/10 ml-2"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
