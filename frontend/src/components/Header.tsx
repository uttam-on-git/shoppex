import { ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';



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
  const navigate= useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary"></div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ShopLux
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

          {
            location.pathname === "/products" && (
              <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="w-64 pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
            )
          }
          

          {user ? (
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={onAuthClick}>
              <User className="h-4 w-4" />
              <span className="sr-only">User account</span>
            </Button>
          )}
          
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
    </header>
  );
};