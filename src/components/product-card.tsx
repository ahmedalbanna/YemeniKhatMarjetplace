import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/mock-data';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow text-right">
          <Badge variant={product.category === 'قات' ? 'default' : 'secondary'} className="mb-2 bg-primary/20 text-primary-foreground hover:bg-primary/30">{product.category}</Badge>
          <CardTitle className="text-lg font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{product.vendor}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-bold text-primary-foreground">{product.price.toLocaleString()} ريال</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
