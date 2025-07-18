'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { quoteRequests } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, User, Package, MessageSquare, MapPin, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function QuoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const quoteId = params.id;

    const quote = quoteRequests.find(q => q.id === quoteId);

    if (!quote) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة إلى الطلبات
            </Button>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline text-2xl">تفاصيل طلب عرض السعر</CardTitle>
                            <CardDescription>مراجعة الطلب والرد على العميل بسعر نهائي.</CardDescription>
                        </div>
                         <Badge
                            variant="outline"
                            className="capitalize h-fit"
                         >
                            {quote.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Customer Info */}
                        <Card>
                            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
                                <User className="h-6 w-6 text-primary"/>
                                <CardTitle className="text-lg font-bold">العميل</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">{quote.customerName}</p>
                                <p className="text-sm text-muted-foreground">طلب بتاريخ: {new Date(quote.date).toLocaleDateString()}</p>
                            </CardContent>
                        </Card>
                        {/* Product Info */}
                         <Card>
                            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
                                <Package className="h-6 w-6 text-primary"/>
                                <CardTitle className="text-lg font-bold">المنتج المطلوب</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">{quote.productName}</p>
                                <div className="text-sm text-muted-foreground">
                                    <span>النوع: {quote.khatTypeName}</span>
                                    <span className="mx-2">|</span>
                                    <span>الكمية: {quote.quantity}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Message & Delivery */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold">معلومات إضافية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">رسالة العميل</p>
                                    <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">{"لا يوجد رسالة."}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">خيار الاستلام</p>
                                    <p className="text-sm text-muted-foreground">توصيل إلى المنزل</p>
                                    <p className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-md">شارع حدة، صنعاء، اليمن</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     {/* Pricing Section */}
                    <Card className="bg-muted/30">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold">التسعير</CardTitle>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4 items-end">
                            <div>
                                <Label>السعر التقديري (من طرف العميل)</Label>
                                <p className="text-2xl font-bold text-muted-foreground">${quote.estimatedPrice.toFixed(2)}</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="finalPrice" className="font-semibold">السعر النهائي المقترح</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="finalPrice" type="number" placeholder="0.00" className="pl-10 text-lg font-bold" defaultValue={quote.finalPrice}/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button size="lg">
                        <Send className="mr-2 h-5 w-5"/>
                        إرسال عرض السعر للعميل
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
