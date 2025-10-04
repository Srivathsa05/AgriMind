import { Sprout, Settings, Cloud, Home } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom"; // 1. Import useLocation
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation(); // 2. Get the current page location

  const navLinks = [
    { to: "/crop-recommender", label: "Recommender", icon: Sprout },
    { to: "/weather", label: "Weather", icon: Cloud }, // Assuming a /weather route
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  // 3. Create the click handler function
  const handleBrandClick = () => {
    // If we are already on the homepage, scroll to the top
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo and Name */}
        {/* 4. Add the onClick handler to the Link */}
        <Link to="/" onClick={handleBrandClick} className="flex items-center gap-2">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">AgriMind</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Navigation Links */}
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
        
          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" className="font-semibold">
              Register
            </Button>
            <Button variant="default" className="font-semibold">
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

