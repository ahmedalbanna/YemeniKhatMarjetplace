
'use client';

import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Send, Leaf } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type OrderQuantities = {
  [key: string]: number;
};

export default function ProductDetailPage() {
  const [quantities, setQuantities] = useState<OrderQuantities>({});
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const handleQuantityChange = (typeId: string, value: string) => {
    const amount = parseInt(value, 10);
    setQuantities(prev => ({
      ...prev,
      [typeId]: isNaN(amount) || amount < 0 ? 0 : amount,
    }));
  };

  const totalCost = useMemo(() => {
    return product.khatTypes?.reduce((total, type) => {
      const quantity = quantities[type.id] || 0;
      return total + (quantity * type.pricePerGram);
    }, 0) || 0;
  }, [quantities, product.khatTypes]);
  
  const handleRequestQuote = () => {
    const items = Object.entries(quantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([typeId, quantity]) => ({ typeId, quantity }));
    
    if (items.length > 0) {
        const query = new URLSearchParams({
            productId: product.id,
            items: JSON.stringify(items),
        }).toString();
        router.push(`/negotiate?${query}`);
    }
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
            <Badge variant={'default'} className="mb-2 w-fit bg-primary/20 text-primary-foreground hover:bg-primary/30">{product.strain}</Badge>
            <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm text-muted-foreground">البائع: <span className="font-medium text-foreground">{product.vendor}</span></p>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
                <span className="font-semibold">{product.rating}</span>
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {product.khatTypes && product.khatTypes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">اختر الكمية بالجرام لكل فئة</h3>
                 <div className="space-y-4">
                    {product.khatTypes.map((type) => (
                      <Card key={type.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-grow">
                           <Leaf className="w-6 h-6 text-primary/70 shrink-0" />
                           <div>
                                <Label htmlFor={type.id} className="font-bold text-base cursor-pointer">{type.name}</Label>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                                <p className="font-semibold text-primary/90 text-sm mt-1">{type.pricePerGram.toLocaleString()} ريال/جرام</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Input 
                                id={type.id} 
                                type="number" 
                                min="0"
                                step="10"
                                placeholder="0"
                                className="w-24 text-center"
                                value={quantities[type.id] || ''}
                                onChange={(e) => handleQuantityChange(type.id, e.target.value)}
                            />
                            <Label htmlFor={type.id} className="text-sm text-muted-foreground">جرام</Label>
                        </div>
                      </Card>
                    ))}
                  </div>
              </div>
            )}
            
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg mb-6">
                <span className="text-lg font-medium text-muted-foreground">السعر الإجمالي</span>
                <p className={cn("text-4xl font-bold text-primary transition-colors duration-300", totalCost === 0 && "text-muted-foreground")}>
                  {totalCost.toLocaleString()} ريال
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="lg" className="w-full" disabled={totalCost === 0} onClick={handleRequestQuote}>
                <Send className="ml-2 h-5 w-5" />
                إرسال الطلب للبائع
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">ملحوظة: السعر ثابت حسب ما يحدده البائع. أرسل الطلب وانتظر موافقة البائع للمتابعة إلى خيارات التسليم والدفع.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
