
import React, { useState } from 'react';
import Header from '@/components/dashboard/Header';
import TaskList from '@/components/dashboard/TaskList';
import TaskForm from '@/components/dashboard/TaskForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks, TaskFilter } from '@/hooks/useTasks';

const Dashboard = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const {
    tasks,
    isLoading,
    filter,
    setFilter,
    handleAddTask,
    handleToggleCompletion,
    handleDeleteTask,
  } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleAddTask(newTaskTitle, newTaskDescription);
    if (success) {
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />

      <main className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-lg border-2 border-muted">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-primary">My Tasks</span>
                  <div className="flex space-x-2 text-sm">
                    {(['all', 'active', 'completed'] as TaskFilter[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full transition-colors ${
                          filter === f
                            ? 'bg-primary text-white'
                            : 'bg-muted hover:bg-muted/70'
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={tasks}
                  isLoading={isLoading}
                  onToggleCompletion={handleToggleCompletion}
                  onDeleteTask={handleDeleteTask}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <TaskForm
              title={newTaskTitle}
              description={newTaskDescription}
              onTitleChange={setNewTaskTitle}
              onDescriptionChange={setNewTaskDescription}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
