'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }
  
  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-4 md:p-8">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative rounded-lg overflow-hidden border">
                    <Image src={src} alt={`${product.name} image ${index + 1}`} fill className="object-cover" data-ai-hint={product.dataAiHint} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          
          <div className="flex flex-col justify-center">
            <Badge variant={product.category === 'Khat' ? 'default' : 'secondary'} className="mb-2 w-fit bg-primary/20 text-primary-foreground hover:bg-primary/30">{product.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <p className="text-sm text-muted-foreground">Vendor: <span className="font-medium text-foreground">{product.vendor}</span></p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
            
            <div className="mb-6">
                <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 border rounded-md p-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold w-8 text-center">{quantity}</span>
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="w-full sm:w-auto">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
