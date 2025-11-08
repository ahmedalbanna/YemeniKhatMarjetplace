'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { orders, quoteRequests, products } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ArrowLeft, Package, MapPin, Calendar, DollarSign, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const orderId = params.id as string;

    const order = orders.find(o => o.id === orderId);
    const quote = order ? quoteRequests.find(q => q.id === order.quoteId) : null;
    const product = quote ? products.find(p => p.name === quote.productName) : null;

    if (!order || !quote) {
        return notFound();
    }

    const handleConfirmReceipt = () => {
        order.status = 'تم التوصيل';
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
            case 'قيد التجهيز':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'ملغي':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return '';
        }
    };

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
                        {order.status !== 'بانتظار الموافقة' && (
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

                    {order.status !== 'بانتظار الموافقة' && (
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


                    {order.status === 'تم التوصيل' && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <p className="text-sm text-green-800">تم تسليم الطلب بنجاح. شكراً لاستخدامك خدماتنا!</p>
                        </div>
                    )}

                    {order.status === 'بانتظار الموافقة' && (
                        <>
                             <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                                <p className="text-sm text-blue-800">
                                    طلبك في انتظار موافقة البائع. سيتم إشعارك عند قبول الطلب لبدء التفاوض وتحديد السعر النهائي.
                                </p>
                            </div>

                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-3">
                                <p className="text-sm text-yellow-800">هذا الطلب في انتظار الدفع. يرجى إتمام عملية الدفع للمتابعة.</p>
                                <Button asChild className="w-full">
                                    <Link href={`/customer/payment?amount=${order.total}&orderId=${order.id}`}>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        إتمام الدفع
                                    </Link>
                                </Button>
                            </div>
                        </>
                    )}

                    {order.status === 'قيد التجهيز' && (
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