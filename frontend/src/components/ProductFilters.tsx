import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  categories: string[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  maxPrice: number;
}

export const ProductFilters = ({ 
  categories, 
  filters, 
  onFiltersChange, 
  maxPrice 
}: ProductFiltersProps) => {
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(filters.priceRange[1]);

  useEffect(() => {
    setMaxSelectedPrice(filters.priceRange[1]);
  }, [filters.priceRange]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };


  const handlePriceChange = (value: number[]) => {
    setMaxSelectedPrice(value[0]);
  };


  const applyPriceFilter = () => {
    onFiltersChange({
      ...filters,
      priceRange: [0, maxSelectedPrice],
    });
  };


  const clearFilters = () => {
    const defaultFilters = {
      categories: [],
      priceRange: [0, maxPrice] as [number, number],
    };
    setMaxSelectedPrice(maxPrice);
    onFiltersChange(defaultFilters);
  };

  const formatCategory = (category: string) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const activeFiltersCount = filters.categories.length + 
    (filters.priceRange[1] < maxPrice ? 1 : 0);

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{activeFiltersCount}</Badge>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={category} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {formatCategory(category)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Max Price</Label>
          <div className="space-y-4">
            <Slider
              min={0}
              max={maxPrice}
              step={1}
              value={[maxSelectedPrice]}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex items-center justify-end text-sm text-muted-foreground">
              <span>${maxSelectedPrice}</span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={applyPriceFilter}
              className="w-full"
            >
              Apply Price Filter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};