'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { orders, quoteRequests, products } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ArrowLeft, Package, MapPin, Calendar, DollarSign, CheckCircle, CreditCard, ShieldCheck, CornerDownLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { suggestReply } from '@/ai/flows/suggest-reply-flow';

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const orderId = params.id as string;

    const [isSuggesting, setIsSuggesting] = useState(false);
    const [message, setMessage] = useState('');

    const order = orders.find(o => o.id === orderId);
    const quote = order ? quoteRequests.find(q => q.id === order.quoteId) : null;
    const product = quote ? products.find(p => p.name === quote.productName) : null;

    if (!order || !quote) {
        return notFound();
    }

    const handleConfirmReceipt = () => {
        order.status = 'تم التوصيل';
        if (quote) {
            quote.status = 'تم التوصيل';
        }
        toast({
            title: 'تم تأكيد الاستلام',
            description: 'شكراً لك! تم تحديث حالة الطلب إلى "تم التوصيل".',
        });
        router.refresh();
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'تم التوصيل':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'بانتظار الموافقة':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
             case 'مقبول':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'قيد التفاوض':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'قيد التجهيز':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'ملغي':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-purple-100 text-purple-800 border-purple-200';
        }
    };
    
    const handleSendMessage = () => {
        if (!message.trim() || !quote) return;

        quote.messages.push({
            sender: 'Customer',
            message: message,
            timestamp: new Date().toISOString()
        });
        
        setMessage('');
        toast({
            title: 'تم إرسال الرسالة',
        });
        router.refresh();
    };

    const handleSuggestReply = async () => {
        if(!quote) return;
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


    const showNegotiation = order.status === 'قيد التفاوض' || order.status === 'مقبول';
    const showPaymentButton = order.status === 'مقبول';
    const isPendingApproval = order.status === 'بانتظار الموافقة';
    const isProcessing = order.status === 'قيد التجهيز';
    const isDelivered = order.status === 'تم التوصيل';
    
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة إلى الطلبات
            </Button>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-headline">تفاصيل الطلب</CardTitle>
                            <CardDescription>رقم الطلب: {order.id}</CardDescription>
                        </div>
                        <Badge
                            variant="outline"
                            className={cn('capitalize text-lg px-4 py-2', getStatusVariant(order.status))}
                        >
                            {order.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm text-muted-foreground">تاريخ الطلب</p>
                                <p className="font-semibold">{new Date(order.date).toLocaleDateString('ar-SA')}</p>
                            </div>
                        </div>
                        {!isPendingApproval && (
                             <div className="flex items-start gap-3">
                                <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">المبلغ الإجمالي</p>
                                    <p className="font-semibold text-lg">{order.total.toLocaleString()} ريال</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {product && (
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                المنتج
                            </h3>
                            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                                <p className="font-semibold">{quote.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                    النوع: {quote.khatTypeName} | الكمية: {quote.quantity} جرام
                                </p>
                                <p className="text-sm text-muted-foreground">البائع: {product.vendor}</p>
                            </div>
                        </div>
                    )}

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            معلومات الاستلام
                        </h3>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="font-semibold mb-2">
                                {quote.deliveryOption === 'Delivery' ? 'توصيل إلى المنزل' : 'استلام من المتجر'}
                            </p>
                            {quote.deliveryAddress && (
                                <p className="text-sm text-muted-foreground">{quote.deliveryAddress}</p>
                            )}
                        </div>
                    </div>

                    { !isPendingApproval && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-3">ملخص السعر</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">السعر المبدئي</span>
                                        <span>{quote.estimatedPrice.toLocaleString()} ريال</span>
                                    </div>
                                    {quote.finalPrice && quote.finalPrice !== quote.estimatedPrice && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">السعر النهائي المتفق عليه</span>
                                            <span className="font-semibold">{quote.finalPrice.toLocaleString()} ريال</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>المجموع</span>
                                        <span>{order.total.toLocaleString()} ريال</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {showNegotiation && (
                         <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle>المفاوضة مع البائع</CardTitle>
                                <CardDescription>هنا يمكنك التواصل مع البائع بخصوص السعر والتفاصيل.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[250px] w-full pr-4 mb-4 border bg-background rounded-lg p-4">
                                    <div className="space-y-4">
                                        {quote.messages.map((msg, index) => (
                                            <div key={index} className={cn("flex items-end gap-2", msg.sender === 'Customer' ? 'justify-end' : 'justify-start')}>
                                                {msg.sender === 'Vendor' && (
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>B</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.sender === 'Customer' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                                    <p className="text-sm">{msg.message}</p>
                                                    <p className="text-xs text-right mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                                {msg.sender === 'Customer' && (
                                                     <Avatar className="h-8 w-8">
                                                        <AvatarFallback>{quote.customerName.charAt(0)}</AvatarFallback>
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
                    )}


                    {isDelivered && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <p className="text-sm text-green-800">تم تسليم الطلب بنجاح. شكراً لاستخدامك خدماتنا!</p>
                        </div>
                    )}
                    
                    {isPendingApproval && (
                         <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                            <p className="text-sm text-blue-800">
                                طلبك في انتظار موافقة البائع. سيتم إشعارك عند قبول الطلب لبدء التفاوض وتحديد السعر النهائي.
                            </p>
                        </div>
                    )}
                    
                    {showPaymentButton && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-3">
                            <p className="text-sm text-yellow-800">وافق البائع على السعر النهائي. يرجى إتمام عملية الدفع للمتابعة.</p>
                            <Button asChild className="w-full">
                                <Link href={`/customer/payment?amount=${order.total}&orderId=${order.id}`}>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    إتمام الدفع ({order.total.toLocaleString()} ريال)
                                </Link>
                            </Button>
                        </div>
                    )}

                    {isProcessing && (
                         <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                            <p className="text-sm text-green-800">تم الدفع بنجاح. البائع يقوم بتجهيز طلبك الآن.</p>
                            <Button className="w-full" onClick={handleConfirmReceipt}>
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                تأكيد استلام الطلب
                            </Button>
                         </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
