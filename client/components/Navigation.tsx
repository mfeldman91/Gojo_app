import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
                    {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
                        <img
              src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800"
              alt="Gojo Martial Arts Logo"
              className="w-10 h-10 object-contain"
              style={{
                mixBlendMode: 'screen',
                filter: 'contrast(1.2) brightness(1.1)'
              }}
            />
            <span className="font-bold text-xl text-foreground">Gojo</span>
          </Link>

                    {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-foreground/80 hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/community" className="text-foreground/80 hover:text-foreground transition-colors">
              Community
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border mt-4">
              <Link
                to="/courses"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/styles"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Martial Arts
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
