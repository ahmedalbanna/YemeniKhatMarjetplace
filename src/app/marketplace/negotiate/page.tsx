
'use client';

import { useSearchParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, MapPin, Package, Car, Landmark, Wallet, HelpCircle, LocateFixed } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

type OrderItem = {
  typeId: string;
  quantity: number;
};

export default function NegotiatePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const productId = searchParams.get('productId');
    const itemsParam = searchParams.get('items');
    
    const [deliveryOption, setDeliveryOption] = useState('Pickup');
    const [deliveryCostOption, setDeliveryCostOption] = useState('PayWithOrder');
    const [address, setAddress] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    
    const items: OrderItem[] = itemsParam ? JSON.parse(itemsParam) : [];

    const product = products.find(p => p.id === productId);

    if (!product || !items || items.length === 0) {
        return notFound();
    }
    
    const productsTotal = useMemo(() => items.reduce((total, item) => {
        const khatType = product.khatTypes?.find(t => t.id === item.typeId);
        if (!khatType) return total;
        return total + (item.quantity * khatType.pricePerGram);
    }, 0), [items, product]);

    const deliveryCost = useMemo(() => {
        if (deliveryOption === 'Delivery' && address.length > 5) {
            // Mock delivery cost calculation
            return 1500;
        }
        return 0;
    }, [deliveryOption, address]);

    const finalTotal = useMemo(() => {
        let total = productsTotal;
        if (deliveryOption === 'Delivery' && deliveryCostOption === 'PayWithOrder') {
            total += deliveryCost;
        }
        return total;
    }, [productsTotal, deliveryOption, deliveryCost, deliveryCostOption]);
    
    const handleLocateMe = () => {
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, you'd use a geocoding service to convert lat/lng to an address
                setAddress(`شارع ${Math.floor(Math.random() * 100)}، حي ${Math.floor(Math.random() * 50)} (محاكاة)`);
                setIsLocating(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("لا يمكن الوصول إلى موقعك. يرجى إدخال العنوان يدويًا.");
                setIsLocating(false);
            }
        );
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة إلى المنتج
            </Button>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Package className="h-6 w-6 text-primary" />
                            <CardTitle className="font-headline text-2xl">مراجعة الطلب</CardTitle>
                        </div>
                        <CardDescription>راجع طلبك قبل إرساله إلى البائع للموافقة.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/20">
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
                            <h4 className="font-semibold mb-2 text-sm">تفاصيل الكمية:</h4>
                            <div className="space-y-2 p-3 bg-muted/50 rounded-lg border text-sm">
                                {items.map(item => {
                                    const khatType = product.khatTypes?.find(t => t.id === item.typeId);
                                    if (!khatType) return null;
                                    const itemCost = item.quantity * khatType.pricePerGram;
                                    return (
                                        <div key={item.typeId} className="flex justify-between items-center">
                                            <span>{khatType.name} ({item.quantity} جرام)</span>
                                            <span className="font-mono font-medium">{itemCost.toLocaleString()} ريال</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="message">رسالة إلى البائع (اختياري)</Label>
                            <Textarea id="message" placeholder="يمكنك إضافة أي ملاحظات أو أسئلة هنا..." />
                        </div>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Car className="h-6 w-6 text-primary" />
                            <CardTitle className="font-headline text-2xl">خيارات الاستلام</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="Pickup" id="pickup" className="peer sr-only" />
                                <Label htmlFor="pickup" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    <Landmark className="mb-3 h-6 w-6" />
                                    استلام من المتجر
                                    <p className="text-xs text-muted-foreground mt-1 text-center">يمكنك الدفع لاحقاً، مع ضرورة تحديد وقت الاستلام.</p>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="Delivery" id="delivery" className="peer sr-only" />
                                <Label htmlFor="delivery" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    <MapPin className="mb-3 h-6 w-6" />
                                    توصيل إلى المنزل
                                    <p className="text-xs text-muted-foreground mt-1 text-center">يجب الدفع المسبق للطلب، ويمكنك اختيار طريقة دفع رسوم التوصيل.</p>
                                </Label>
                            </div>
                        </RadioGroup>

                        {deliveryOption === 'Delivery' && (
                            <div className="mt-6 space-y-4 animate-in fade-in-50">
                                <Separator/>
                                <div className="space-y-2">
                                    <Label htmlFor="address">عنوان التوصيل</Label>
                                    <div className="relative">
                                        <Input id="address" placeholder="ادخل عنوانك هنا..." className="pr-10" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        <Button type="button" size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8" onClick={handleLocateMe} disabled={isLocating}>
                                            <LocateFixed className={cn("h-5 w-5", isLocating && "animate-pulse")} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                     <div className="flex items-center gap-2">
                                        <Label>دفع رسوم التوصيل</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild><button type="button"><HelpCircle className="h-4 w-4 text-muted-foreground" /></button></TooltipTrigger>
                                                <TooltipContent><p>اختر كيف تريد دفع رسوم التوصيل المقدرة.</p></TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <RadioGroup value={deliveryCostOption} onValueChange={setDeliveryCostOption} className="flex gap-4">
                                        <div className="flex items-center space-x-2 space-x-reverse">
                                            <RadioGroupItem value="PayWithOrder" id="pay-delivery-now" />
                                            <Label htmlFor="pay-delivery-now">الدفع مع الطلب</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 space-x-reverse">
                                            <RadioGroupItem value="PayOnArrival" id="pay-delivery-later" />
                                            <Label htmlFor="pay-delivery-later">الدفع عند الاستلام</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Wallet className="h-6 w-6 text-primary" />
                            <CardTitle className="font-headline text-2xl">ملخص الدفع</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between text-muted-foreground">
                            <span>إجمالي سعر المنتجات</span>
                            <span className="font-mono font-medium">{productsTotal.toLocaleString()} ريال</span>
                        </div>
                         {deliveryOption === 'Delivery' && (
                             <div className="flex justify-between text-muted-foreground">
                                <span>تكلفة التوصيل المقدرة</span>
                                <span className={cn("font-mono font-medium", deliveryCost === 0 && 'text-xs')}>{deliveryCost > 0 ? `${deliveryCost.toLocaleString()} ريال` : '(أدخل العنوان للحساب)'}</span>
                            </div>
                         )}
                         <Separator />
                         <div className="flex justify-between text-lg font-bold">
                            <span>المجموع النهائي المطلوب دفعه الآن</span>
                            <span className="font-mono">{finalTotal.toLocaleString()} ريال</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button 
                            size="lg" 
                            className="w-full" 
                            disabled={deliveryOption === 'Delivery' && address.length <= 5}
                            onClick={() => {
                                // In a real app, this would create a quote request
                                // For now, we'll simulate it and redirect
                                toast({
                                    title: 'تم إرسال الطلب',
                                    description: 'تم إرسال طلبك إلى البائع بنجاح. سيتم إشعارك عند الموافقة.',
                                });
                                setTimeout(() => {
                                    router.push('/customer/orders');
                                }, 1500);
                            }}
                        >
                            <Send className="mr-2 h-5 w-5"/>
                            إرسال الطلب إلى البائع
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">سيتم إرسال طلبك إلى البائع للموافقة. لن يتم خصم أي مبلغ الآن.</p>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}

