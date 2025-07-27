import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, logout } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    // Update user state when component mounts or when localStorage changes
    const checkUser = () => setUser(getCurrentUser());
    checkUser();

    // Listen for storage changes to update user state across tabs
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <nav className="bg-black backdrop-blur border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800"
              alt="Gojo Martial Arts Logo"
              className="w-10 h-10 object-contain"
              style={{
                mixBlendMode: "screen",
                filter: "contrast(1.2) brightness(1.1)",
              }}
            />
            <span className="font-bold text-xl text-white">Gojo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className="text-white font-bold hover:text-red-500 transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/community"
              className="text-white font-bold hover:text-red-500 transition-colors"
            >
              Community
            </Link>
            <Link
              to="/about"
              className="text-white font-bold hover:text-red-500 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/instructor/dashboard">Teach on Gojo</Link>
            </Button>
            {user ? (
              <>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  asChild
                >
                  <Link to="/profile">
                    <User className="w-4 h-4 mr-2" />
                    {user.firstName}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  asChild
                >
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border mt-4">
              <Link
                to="/courses"
                className="block px-3 py-2 text-base font-bold text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/community"
                className="block px-3 py-2 text-base font-bold text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-bold text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link
                    to="/instructor/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Teach on Gojo
                  </Link>
                </Button>
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      asChild
                    >
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        {user.firstName}'s Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      asChild
                    >
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        Log In
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
