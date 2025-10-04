import { Sprout, Settings, Cloud, Wrench } from "lucide-react"; 
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Helper function for NavLink class logic (improves readability)
const getNavLinkClasses = (isActive) =>
  `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary/10 text-primary"
      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
  }`;

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/crop-recommender", label: "Recommender", icon: Sprout },
    { to: "/weather", label: "Weather", icon: Cloud },
    { to: "/settings", label: "Settings", icon: Settings },
    // Path correctly links to the Equipment Rentals route
    { to: "/equipment-rentals", label: "Equipment", icon: Wrench }, 
  ];

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
        <Link 
          to="/" 
          onClick={handleBrandClick} 
          className="flex items-center gap-2"
          aria-label="Home" // Added aria-label for accessibility
        >
          <Sprout className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">AgriMind</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                // Applies dynamic styling based on the active route
                className={({ isActive }) => getNavLinkClasses(isActive)}
                // Added aria-label for improved screen reader support
                aria-label={link.label} 
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
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
