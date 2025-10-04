import { Sprout, Settings, Activity, Leaf } from "lucide-react"; // Removed Cloud icon
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';

export const NavBar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Updated navLinks: removed the "Weather" link
  const navLinks = [
    { to: "/crop-recommender", label: "Recommender", icon: Leaf },
    { to: "/yield-predictor", label: "Yield Predictor", icon: Activity },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleBrandClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" onClick={handleBrandClick} className="flex items-center gap-2">
            <Sprout className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">AgriMind</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`
                  }
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="font-semibold"
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="font-semibold"
                    onClick={() => handleAuthClick('login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="default"
                    className="font-semibold"
                    onClick={() => handleAuthClick('register')}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authMode}
      />
    </>
  );
};

export default NavBar;
