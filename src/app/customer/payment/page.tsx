'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { wallet, orders, quoteRequests } from '@/lib/mock-data';
import { useAuth } from '@/contexts/auth-context';

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { user } = useAuth();
    
    const amount = parseInt(searchParams.get('amount') || '0');
    const orderId = searchParams.get('orderId') || '';
    const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'mobile' | 'card'>('wallet');
    const [mobileNumber, setMobileNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!user) {
        router.push('/auth/login');
        return null;
    }

    const handlePayment = async () => {
        if (paymentMethod === 'wallet' && wallet.balance < amount) {
            toast({
                variant: 'destructive',
                title: 'رصيد غير كافي',
                description: 'رصيد محفظتك غير كافي لإتمام هذه العملية.',
            });
            return;
        }

        if (paymentMethod === 'mobile' && !mobileNumber) {
            toast({
                variant: 'destructive',
                title: 'رقم الهاتف مطلوب',
                description: 'يرجى إدخال رقم الهاتف المحمول.',
            });
            return;
        }

        if (paymentMethod === 'card' && !cardNumber) {
            toast({
                variant: 'destructive',
                title: 'رقم البطاقة مطلوب',
                description: 'يرجى إدخال رقم البطاقة.',
            });
            return;
        }

        setIsProcessing(true);
        
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update order status
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = 'قيد التجهيز';
            
            // Optionally update quote status if needed for consistency
            const quote = quoteRequests.find(q => q.id === order.quoteId);
            if (quote) {
                quote.status = 'قيد التجهيز';
            }
        }

        if (paymentMethod === 'wallet') {
            wallet.balance -= amount;
        }

        toast({
            title: 'تم الدفع بنجاح',
            description: `تم دفع ${amount.toLocaleString()} ريال بنجاح.`,
        });

        setIsProcessing(false);
        
        // Redirect to orders page after a short delay
        setTimeout(() => {
            router.push(`/customer/orders/${orderId}`);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">إتمام الدفع</CardTitle>
                    <CardDescription>اختر طريقة الدفع وأكمل عملية الشراء.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">المبلغ المطلوب</span>
                            <span className="text-2xl font-bold">{amount.toLocaleString()} ريال</span>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <Label className="text-lg font-semibold mb-4 block">اختر طريقة الدفع</Label>
                        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)} className="space-y-3">
                            <div>
                                <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                                <Label 
                                    htmlFor="wallet" 
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <Wallet className="h-5 w-5" />
                                        <div>
                                            <p className="font-semibold">المحفظة الإلكترونية</p>
                                            <p className="text-xs text-muted-foreground">الرصيد المتاح: {wallet.balance.toLocaleString()} ريال</p>
                                        </div>
                                    </div>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                                <Label 
                                    htmlFor="mobile" 
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="h-5 w-5" />
                                        <div>
                                            <p className="font-semibold">المحفظة المحمولة</p>
                                            <p className="text-xs text-muted-foreground">M-Pesa, MTN Mobile Money, إلخ</p>
                                        </div>
                                    </div>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                <Label 
                                    htmlFor="card" 
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5" />
                                        <div>
                                            <p className="font-semibold">بطاقة ائتمانية/مدينة</p>
                                            <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
                                        </div>
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {paymentMethod === 'mobile' && (
                        <div className="space-y-2 animate-in fade-in-50">
                            <Label htmlFor="mobileNumber">رقم الهاتف المحمول</Label>
                            <Input 
                                id="mobileNumber" 
                                type="tel" 
                                placeholder="+967 777 123 456"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>
                    )}

                    {paymentMethod === 'card' && (
                        <div className="space-y-2 animate-in fade-in-50">
                            <Label htmlFor="cardNumber">رقم البطاقة</Label>
                            <Input 
                                id="cardNumber" 
                                type="text" 
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                maxLength={19}
                            />
                            <p className="text-xs text-muted-foreground">هذه صفحة تجريبية. لن يتم خصم أي مبلغ فعلي.</p>
                        </div>
                    )}

                    {paymentMethod === 'wallet' && wallet.balance < amount && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                رصيدك الحالي ({wallet.balance.toLocaleString()} ريال) غير كافي. يرجى إضافة رصيد أو اختيار طريقة دفع أخرى.
                            </p>
                        </div>
                    )}

                    <Separator />

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">المبلغ الإجمالي</span>
                            <span className="font-semibold">{amount.toLocaleString()} ريال</span>
                        </div>
                        <Button 
                            size="lg" 
                            className="w-full" 
                            onClick={handlePayment}
                            disabled={isProcessing || (paymentMethod === 'wallet' && wallet.balance < amount)}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    جاري المعالجة...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    تأكيد الدفع
                                </>
                            )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            بالضغط على تأكيد الدفع، أنت توافق على شروط وأحكام الموقع.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
