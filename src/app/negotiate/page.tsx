
'use client';

import { useSearchParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type OrderItem = {
  typeId: string;
  quantity: number;
};

export default function NegotiatePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get('productId');
    const itemsParam = searchParams.get('items');
    
    const items: OrderItem[] = itemsParam ? JSON.parse(itemsParam) : [];

    const product = products.find(p => p.id === productId);

    if (!product || !items || items.length === 0) {
        return notFound();
    }
    
    const totalCost = items.reduce((total, item) => {
        const khatType = product.khatTypes?.find(t => t.id === item.typeId);
        if (!khatType) return total;
        return total + (item.quantity * khatType.pricePerGram);
    }, 0);

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة إلى المنتج
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">إرسال الطلب للبائع</CardTitle>
                    <CardDescription>راجع طلبك وأرسله إلى البائع للموافقة عليه.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            data-ai-hint={product.dataAiHint}
                        />
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-muted-foreground">{product.vendor}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">ملخص الطلب:</h4>
                        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                             {items.map(item => {
                                const khatType = product.khatTypes?.find(t => t.id === item.typeId);
                                if (!khatType) return null;
                                const itemCost = item.quantity * khatType.pricePerGram;
                                return (
                                    <div key={item.typeId} className="flex justify-between items-center text-sm">
                                        <span>{khatType.name} ({item.quantity} جرام)</span>
                                        <span className="font-mono">{itemCost.toLocaleString()} ريال</span>
                                    </div>
                                );
                            })}
                            <Separator />
                             <div className="flex justify-between items-center font-bold text-base">
                                <span>الإجمالي</span>
                                <span className="font-mono">{totalCost.toLocaleString()} ريال</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="message">رسالة إلى البائع (اختياري)</Label>
                        <Textarea id="message" placeholder="يمكنك إضافة أي ملاحظات أو أسئلة هنا..." />
                    </div>

                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button size="lg">
                        <Send className="mr-2 h-5 w-5"/>
                        إرسال الطلب
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
