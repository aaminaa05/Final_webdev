
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-primary to-secondary shadow-lg p-4 sticky top-0 z-10">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Task Manager</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
            <User className="h-4 w-4 text-white/90 mr-2" />
            <span className="text-white/90 text-sm">{user?.username}</span>
          </div>
          <Button 
            onClick={logout}
            variant="secondary" 
            size="sm"
            className="bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
