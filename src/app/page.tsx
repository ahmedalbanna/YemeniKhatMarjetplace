'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { products as allProducts, governorates, KhatType } from '@/lib/mock-data';
import type { Product } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, ShoppingBasket, Leaf } from 'lucide-react';

export default function Home() {
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedKhatType, setSelectedKhatType] = useState('all');

  const markets = useMemo(() => {
    if (selectedGovernorate === 'all') return [];
    return governorates.find(g => g.id === selectedGovernorate)?.markets || [];
  }, [selectedGovernorate]);

  const khatTypes: Omit<KhatType, 'price' | 'description'>[] = useMemo(() => {
    const types = new Map<string, string>();
    allProducts.forEach(p => {
        if (p.khatTypes) {
            p.khatTypes.forEach(kt => {
                if (!types.has(kt.id)) {
                    types.set(kt.id, kt.name);
                }
            });
        }
    });
    // Convert map to array and add 'all' option
    const uniqueTypes = Array.from(types, ([id, name]) => ({ id, name }));
    return uniqueTypes;
  }, []);


  const filteredProducts = allProducts.filter((product) => {
    const matchesGovernorate = selectedGovernorate === 'all' || product.governorateId === selectedGovernorate;
    const matchesMarket = selectedMarket === 'all' || product.marketId === selectedMarket;
    
    const matchesKhatType = selectedKhatType === 'all' || 
        (product.category === 'قات' && product.khatTypes?.some(kt => kt.id === selectedKhatType));
    
    // For non-khat products, khat type filter should not exclude them if khat type is not 'all'
    const isAccessoryAndKhatTypeSelected = product.category === 'ملحقات' && selectedKhatType !== 'all';

    return matchesGovernorate && matchesMarket && (matchesKhatType || isAccessoryAndKhatTypeSelected);
  });

  const handleGovernorateChange = (value: string) => {
    setSelectedGovernorate(value);
    setSelectedMarket('all'); // Reset market when governorate changes
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground mb-2">أهلاً بك في السوق</h1>
        <p className="text-lg text-muted-foreground">اكتشف أجود أنواع القات والملحقات في اليمن.</p>
      </header>

      <div className="mb-8 p-4 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedGovernorate} onValueChange={handleGovernorateChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المحافظة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المحافظات</SelectItem>
                {governorates.map(gov => (
                  <SelectItem key={gov.id} value={gov.id}>{gov.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5 text-muted-foreground" />
             <Select value={selectedMarket} onValueChange={setSelectedMarket} disabled={selectedGovernorate === 'all'}>
              <SelectTrigger>
                <SelectValue placeholder="اختر السوق" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأسواق</SelectItem>
                {markets.map(market => (
                   <SelectItem key={market.id} value={market.id}>{market.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedKhatType} onValueChange={setSelectedKhatType}>
                <SelectTrigger>
                    <SelectValue placeholder="اختر نوع القات" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">كل الأنواع</SelectItem>
                    {khatTypes.map(kt => (
                        <SelectItem key={kt.id} value={kt.id}>{kt.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
         <div className="text-center col-span-full py-16">
            <p className="text-muted-foreground">لم يتم العثور على منتجات تطابق بحثك.</p>
         </div>
      )}
    </div>
  );
}
