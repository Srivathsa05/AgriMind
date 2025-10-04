// Frontend/src/components/NavBar.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { LogOut, User } from 'lucide-react';

export const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-green-600">AgriMind</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User size={18} />
                  <span>Profile</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => handleAuthClick('login')}
                >
                  Login
                </Button>
                <Button 
                  variant="default" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleAuthClick('register')}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialTab={authMode}
      />
    </nav>
  );
};

export default NavBar;