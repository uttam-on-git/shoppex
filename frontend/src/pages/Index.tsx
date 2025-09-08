import { useState } from 'react';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthDialog } from '@/components/AuthDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = ({ user, setUser, onLogout }: { user: { name: string } | null, setUser: (user: { name: string } | null) => void, onLogout: () => void }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [search, setSearch] = useState('');

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on all orders over $50'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment with SSL encryption'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCartClick={() => setCartOpen(true)}
        onAuthClick={() => setAuthOpen(true)}
        search={search}
        setSearch={setSearch}
        user={user}
        onLogout={onLogout}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 h-[calc(100vh-64px)]">
        <div className="container relative z-10">
          <div className="text-center text-white space-y-10">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Premium Shopping Experience
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Shop the latest trends and find exactly what you're looking for in our curated collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Link to="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>

            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Shoppex?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide the best shopping experience with premium quality products and exceptional service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">
              Explore our wide range of products across different categories
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Men\'s Clothing', 'Women\'s Clothing', 'Electronics', 'Jewelry'].map((category, index) => (
              <Card key={category} className="group cursor-pointer overflow-hidden border-0 bg-gradient-card hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gradient-primary opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Discover amazing products
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} setUser={setUser} />
    </div>
  );
};

export default Index;
