
'use client';

import { useSearchParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check, Send, MapPin, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function NegotiatePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const productId = searchParams.get('productId');
    const typeId = searchParams.get('typeId');
    const quantity = searchParams.get('quantity');

    const [deliveryOption, setDeliveryOption] = useState('pickup');
    const [address, setAddress] = useState('');
    const [isLocating, setIsLocating] = useState(false);

    const product = products.find(p => p.id === productId);
    const khatType = product?.khatTypes?.find(t => t.id === typeId);

    if (!product || !khatType || !quantity) {
        return notFound();
    }

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
             toast({
                variant: 'destructive',
                title: 'خطأ',
                description: 'خدمة تحديد المواقع غير مدعومة في متصفحك.',
            });
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // For a real app, you would use a reverse geocoding service here.
                // For this prototype, we'll just show the coordinates.
                setAddress(`تم تحديد الموقع بنجاح. خط العرض: ${latitude.toFixed(4)}, خط الطول: ${longitude.toFixed(4)}`);
                setIsLocating(false);
                toast({
                    title: 'نجاح',
                    description: 'تم تحديد موقعك بنجاح.',
                });
            },
            (error) => {
                setIsLocating(false);
                toast({
                    variant: 'destructive',
                    title: 'خطأ في تحديد الموقع',
                    description: 'يرجى التأكد من تمكين إذن الوصول إلى الموقع في متصفحك.',
                });
                console.error("Geolocation error:", error);
            }
        );
    };

    const estimatedPrice = khatType.price * parseInt(quantity);

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة إلى المنتج
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">طلب عرض سعر</CardTitle>
                    <CardDescription>أكمل التفاصيل لإرسال طلبك إلى البائع.</CardDescription>
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
                            <Separator className="my-2"/>
                            <div className="flex justify-between text-sm">
                                <span>النوع: <span className="font-semibold">{khatType.name}</span></span>
                                <span>الكمية: <span className="font-semibold">{quantity} حبة</span></span>
                            </div>
                             <div className="text-right mt-2 font-bold text-primary">
                                السعر التقديري: {estimatedPrice.toLocaleString()} ريال
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="message">رسالة إلى البائع (اختياري)</Label>
                        <Textarea id="message" placeholder="يمكنك إضافة أي ملاحظات أو أسئلة هنا..." />
                    </div>

                    <div className="space-y-4">
                        <Label>خيار الاستلام</Label>
                        <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="gap-4">
                           <Card className="p-4 flex items-center justify-between cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-lg">
                                <div>
                                    <Label htmlFor="pickup" className="font-bold cursor-pointer">استلام من المتجر</Label>
                                    <p className="text-sm text-muted-foreground">ستستلم طلبك مباشرة من موقع البائع.</p>
                                </div>
                                <RadioGroupItem value="pickup" id="pickup" />
                           </Card>
                           <Card className="p-4 flex items-center justify-between cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-lg">
                                <div>
                                    <Label htmlFor="delivery" className="font-bold cursor-pointer">توصيل إلى المنزل</Label>
                                    <p className="text-sm text-muted-foreground">سيتم توصيل طلبك إلى موقعك.</p>
                                </div>
                                <RadioGroupItem value="delivery" id="delivery" />
                           </Card>
                        </RadioGroup>
                    </div>

                    {deliveryOption === 'delivery' && (
                        <div className="space-y-2">
                            <Label htmlFor="address">عنوان التوصيل</Label>
                             <div className="relative">
                                <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="أدخل عنوانك هنا أو استخدم الخريطة..." />
                                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleGetLocation} disabled={isLocating}>
                                    {isLocating ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                    )}

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
