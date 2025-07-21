
'use client';

import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { products, KhatType } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Minus, Plus, MessageSquareQuote, Leaf } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<KhatType | null>(null);
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (product?.khatTypes && product.khatTypes.length > 0 && !selectedType) {
      setSelectedType(product.khatTypes[0]);
    }
  }, [product, selectedType]);

  if (!product) {
    notFound();
  }
  
  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  }

  const handleTypeSelection = (typeId: string) => {
      const type = product?.khatTypes?.find(t => t.id === typeId) || null;
      setSelectedType(type);
      setQuantity(1);
  }

  const handleRequestQuote = () => {
    if (product && selectedType) {
        const query = new URLSearchParams({
            productId: product.id,
            typeId: selectedType?.id || '',
            quantity: quantity.toString(),
        }).toString();
        router.push(`/negotiate?${query}`);
    }
  }

  const displayPrice = selectedType ? selectedType.price : product.price;

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
                <h3 className="text-lg font-semibold mb-3">اختر الفئة (حسب الحبة)</h3>
                 <RadioGroup
                    value={selectedType?.id}
                    onValueChange={handleTypeSelection}
                    className="gap-4"
                  >
                    {product.khatTypes.map((type) => (
                      <Card key={type.id} className="p-4 flex items-center justify-between cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-lg">
                        <div className="flex items-center gap-4">
                           <Leaf className="w-6 h-6 text-primary/70" />
                           <div>
                                <Label htmlFor={type.id} className="font-bold text-base cursor-pointer">{type.name}</Label>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                           </div>
                        </div>
                        <div className="text-left">
                             <p className="font-bold text-lg text-primary">{type.price.toLocaleString()} ريال</p>
                             <RadioGroupItem value={type.id} id={type.id} className="mt-1 mr-auto" />
                        </div>
                      </Card>
                    ))}
                  </RadioGroup>
              </div>
            )}
            
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg mb-6">
                <span className="text-lg font-medium text-muted-foreground">السعر المبدئي</span>
                <p className="text-4xl font-bold text-primary">{displayPrice.toLocaleString()} ريال</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 border rounded-md p-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)} disabled={!selectedType || quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold w-8 text-center">{quantity}</span>
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)} disabled={!selectedType}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="w-full sm:w-auto" disabled={!selectedType} onClick={handleRequestQuote}>
                <MessageSquareQuote className="ml-2 h-5 w-5" />
                اطلب عرض سعر
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">ملحوظة: السعر أعلاه هو سعر تقديري. أرسل طلبًا للحصول على السعر النهائي من البائع.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
