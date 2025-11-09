'use client';

import { suggestReply } from '@/ai/flows/suggest-reply-flow';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { orders, quoteRequests } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { CheckCircle, CornerDownLeft, Loader2, MapPin, Package, Send, Sparkles, User, XCircle } from 'lucide-react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
export default function QuoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const quoteId = params.id;

    const [isSuggesting, setIsSuggesting] = useState(false);
    const [message, setMessage] = useState('');

    const quote = quoteRequests.find(q => q.id === quoteId);

    if (!quote) {
        return notFound();
    }

    const [finalPrice, setFinalPrice] = useState(quote.finalPrice || quote.estimatedPrice || 0);

    const handleAcceptQuote = () => {
        quote.status = 'قيد التفاوض';
        toast({
            title: 'تم قبول الطلب',
            description: 'تم قبول الطلب وبدء التفاوض مع العميل.',
        });
        router.refresh();
    };

    const handleRejectQuote = () => {
        quote.status = 'ملغي';
        toast({
            title: 'تم رفض الطلب',
            description: 'تم رفض الطلب.',
        });
        setTimeout(() => {
            router.push('/vendor/quotes');
        }, 1500);
    };

    const handleSendFinalPrice = () => {
        quote.finalPrice = finalPrice;
        // The status remains 'قيد التفاوض' until the customer accepts.
        // We just add a message to notify the customer.
        quote.messages.push({
            sender: 'Vendor',
            message: `لقد عرضت سعرًا نهائيًا قدره ${finalPrice.toLocaleString()} ريال. في انتظار موافقة العميل.`,
            timestamp: new Date().toISOString()
        });

        // Create or update the order with the new potential total
        const existingOrder = orders.find(o => o.quoteId === quote.id);
        if (existingOrder) {
            existingOrder.total = finalPrice;
            // The order status also remains 'قيد التفاوض'
        } else {
            const newOrder = {
                id: `ORD-${Date.now()}`,
                quoteId: quote.id,
                date: new Date().toISOString().split('T')[0],
                status: 'قيد التفاوض' as const, // Stays in negotiation
                total: finalPrice,
            };
            orders.push(newOrder);
        }

        toast({
            title: 'تم إرسال عرض السعر',
            description: 'تم إرسال عرض السعر النهائي للعميل.',
        });
        router.refresh();
    };

    const handleSendMessage = () => {
        if (!message.trim()) return;

        quote.messages.push({
            sender: 'Vendor',
            message: message,
            timestamp: new Date().toISOString()
        });

        if (quote.status === 'بانتظار موافقة البائع') {
            quote.status = 'قيد التفاوض';
        }

        setMessage('');
        toast({
            title: 'تم إرسال الرسالة',
            description: 'تم إرسال رسالتك للعميل.',
        });
        router.refresh();
    };

    const handleSuggestReply = async () => {
        setIsSuggesting(true);
        try {
            const result = await suggestReply({
                customerName: quote.customerName,
                productName: quote.productName,
                khatTypeName: quote.khatTypeName,
                quantity: quote.quantity,
                estimatedPrice: quote.estimatedPrice,
                messages: quote.messages.map(m => ({ sender: m.sender, message: m.message })),
            });
            if (result.reply) {
                setMessage(result.reply);
            }
        } catch (error) {
            console.error("Error suggesting reply:", error);
            toast({
                variant: 'destructive',
                title: 'خطأ',
                description: 'حدث خطأ أثناء اقتراح الرد. الرجاء المحاولة مرة أخرى.',
            });
        } finally {
            setIsSuggesting(false);
        }
    }

    const showNegotiation = quote.status === 'قيد التفاوض' || quote.status === 'تم الرد' || quote.status === 'مقبول';
    const isProcessing = quote.status === 'قيد التجهيز';
    const isDelivered = quote.status === 'تم التوصيل';
    const offerSent = quote.finalPrice && (quote.status === 'قيد التفاوض' || quote.status === 'مقبول');

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Card: State-dependent */}
                    {isProcessing ? (
                         <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">تجهيز الطلب</CardTitle>
                                <CardDescription>تم الدفع. قم بتجهيز الطلب للتسليم أو الاستلام.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <p className="text-sm text-green-800">الطلب مدفوع وفي انتظار التجهيز والتسليم.</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : isDelivered ? (
                         <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">اكتمل الطلب</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                    <p className="text-sm text-blue-800">تم توصيل هذا الطلب بنجاح.</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : showNegotiation ? (
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="font-headline text-2xl">المفاوضات</CardTitle>
                                        <CardDescription>تواصل مع العميل لتحديد السعر النهائي.</CardDescription>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={cn("capitalize h-fit", 
                                            quote.status === 'مقبول' && 'bg-green-100 text-green-800 border-green-200',
                                            quote.status === 'قيد التفاوض' && 'bg-blue-100 text-blue-800 border-blue-200'
                                        )}
                                    >
                                        {quote.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] w-full pr-4 mb-4">
                                    <div className="space-y-4">
                                        {quote.messages.map((msg, index) => (
                                            <div key={index} className={cn("flex items-end gap-2", msg.sender === 'Vendor' ? 'justify-end' : 'justify-start')}>
                                                {msg.sender === 'Customer' && (
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>{quote.customerName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.sender === 'Vendor' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                                    <p className="text-sm">{msg.message}</p>
                                                    <p className="text-xs text-right mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                                {msg.sender === 'Vendor' && (
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>V</AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Textarea
                                            placeholder="اكتب رسالتك هنا..."
                                            className="pr-16"
                                            rows={3}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <Button
                                            size="icon"
                                            className="absolute top-1/2 right-3 -translate-y-1/2"
                                            onClick={handleSendMessage}
                                            disabled={!message.trim()}
                                        >
                                            <CornerDownLeft className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSuggestReply}
                                        disabled={isSuggesting}
                                    >
                                        {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                        اقتراح رد
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>مراجعة الطلب المبدئي</CardTitle>
                                <CardDescription>الطلب في انتظار موافقتك لبدء التفاوض.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">راجع تفاصيل الطلب أدناه. بمجرد الموافقة، يمكنك البدء في التواصل مع العميل.</p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="destructive" onClick={handleRejectQuote}>
                                    <XCircle className="ml-2 h-4 w-4" />
                                    رفض الطلب
                                </Button>
                                <Button onClick={handleAcceptQuote}>
                                    <CheckCircle className="ml-2 h-4 w-4" />
                                    الموافقة وبدء التفاوض
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* Pricing Section */}
                    {showNegotiation && (
                        <Card className="bg-muted/30">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-bold">التسعير</CardTitle>
                            </CardHeader>
                            <CardContent className="grid sm:grid-cols-2 gap-4 items-end">
                                <div>
                                    <Label>السعر المبدئي من المشتري</Label>
                                    <p className="text-2xl font-bold text-muted-foreground">{quote.estimatedPrice.toLocaleString()} ريال</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="finalPrice" className="font-semibold">السعر النهائي المقترح</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-muted-foreground">ريال</span>
                                        <Input
                                            id="finalPrice"
                                            type="number"
                                            placeholder="0"
                                            className="pl-12 text-lg font-bold"
                                            value={finalPrice}
                                            onChange={(e) => setFinalPrice(parseInt(e.target.value) || 0)}
                                            disabled={quote.status === 'مقبول'}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end pt-4">
                                <Button size="lg" onClick={handleSendFinalPrice} disabled={finalPrice <= 0 || quote.status === 'مقبول'}>
                                    <Send className="mr-2 h-5 w-5" />
                                    {offerSent ? 'إعادة إرسال عرض السعر' : 'إرسال عرض السعر النهائي'}
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {/* Customer Info */}
                    <Card>
                        <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
                            <User className="h-6 w-6 text-primary" />
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
                            <Package className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg font-bold">المنتج المطلوب</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{quote.productName}</p>
                            <div className="text-sm text-muted-foreground">
                                <span>النوع: {quote.khatTypeName}</span>
                                <span className="mx-2">|</span>
                                <span>الكمية: {quote.quantity} جرام</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Info */}
                    <Card>
                        <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
                            <MapPin className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg font-bold">معلومات الاستلام</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{quote.deliveryOption === 'Delivery' ? 'توصيل إلى المنزل' : 'استلام من المتجر'}</p>
                            {quote.deliveryAddress && (
                                <p className="text-sm text-muted-foreground p-2 bg-muted/50 rounded-md mt-2">{quote.deliveryAddress}</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
