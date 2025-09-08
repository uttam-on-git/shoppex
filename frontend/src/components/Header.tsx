import * as React from 'react';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';



interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
  search: string;
  setSearch: (s: string) => void;
  user?: { name: string } | null;
  onLogout?: (
  ) => void;
}


export const Header = ({ onCartClick, onAuthClick, search, setSearch, user, onLogout }: HeaderProps) => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  // Hide search bar when route changes
  React.useEffect(() => { setShowMobileSearch(false); }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary"></div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Shoppex
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop search */}
          {location.pathname === "/products" && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="w-64 pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          )}
          {/* Mobile search icon */}
          {location.pathname === "/products" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => setShowMobileSearch((v) => !v)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              {showMobileSearch && (
                <div className="absolute left-0 top-16 w-full bg-background p-2 z-50 flex sm:hidden">
                  <Input
                    autoFocus
                    placeholder="Search products..."
                    className="w-full pl-10"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(false)}>
                    ✕
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Hamburger menu for mobile */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>

          {/* User info (desktop) */}
          {user ? (
            <div className="hidden md:flex items-center space-x-2">
              <span className="font-medium text-sm">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={onAuthClick} className="hidden md:inline-flex">
              <User className="h-4 w-4" />
              <span className="sr-only">User account</span>
            </Button>
          )}

          {/* Cart button */}
          <Button variant="ghost" size="sm" onClick={onCartClick} className="relative">
            <ShoppingCart className="h-4 w-4" />
            {getTotalItems() > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {getTotalItems()}
              </Badge>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
        </div>
      </div>
      {/* Hamburger Sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="p-0 w-[200px]">
          <SheetHeader className="p-4">
            <p className="text-lg font-semibold text-left pl-3">Menu</p>
          </SheetHeader>
          <nav className="flex flex-col gap-2 px-4 pb-4">
              <Link to="/" className="py-2 pl-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md" onClick={() => setMenuOpen(false)}>
                Home
            </Link>
            <Link to="/products" className="py-2 pl-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md " onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            {user ? (
              <>
                <span className="py-2 text-base font-medium">{user.name}</span>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { setMenuOpen(false); onLogout && onLogout(); }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { setMenuOpen(false); onAuthClick(); }}>
                Login / Signup
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};