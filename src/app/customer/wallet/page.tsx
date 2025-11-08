'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { wallet, transactions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Wallet, Landmark, ArrowRightLeft, PlusCircle } from 'lucide-react';


export default function WalletPage() {
    
    const getTransactionType = (type: string) => {
        switch (type) {
            case 'deposit':
                return { text: 'إيداع', color: 'text-green-600', icon: <Landmark className="h-4 w-4" /> };
            case 'payment':
                return { text: 'دفعة طلب', color: 'text-red-600', icon: <ArrowRightLeft className="h-4 w-4" /> };
            case 'refund':
                return { text: 'استرداد', color: 'text-blue-600', icon: <ArrowRightLeft className="h-4 w-4" /> };
            default:
                return { text: type, color: '', icon: null };
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
            <div>
                 <div className="flex items-center gap-3 mb-2">
                    <Wallet className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold font-headline">المحفظة المالية</h1>
                </div>
                <p className="text-muted-foreground">إدارة رصيدك، إيداع الأموال، ومراجعة سجل معاملاتك.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Balance and Deposit */}
                <div className="md:col-span-1 space-y-8">
                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="text-lg">الرصيد الحالي</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold font-mono">{wallet.balance.toLocaleString()} ريال</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>إيداع أموال</CardTitle>
                            <CardDescription>إضافة رصيد إلى محفظتك.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="amount">المبلغ (بالريال اليمني)</Label>
                                <Input id="amount" type="number" placeholder="5000" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <PlusCircle className="ml-2 h-4 w-4" />
                                إيداع
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Transactions History */}
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>سجل المعاملات</CardTitle>
                            <CardDescription>آخر المعاملات التي تمت على حسابك.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>التاريخ</TableHead>
                                        <TableHead>النوع</TableHead>
                                        <TableHead>الوصف</TableHead>
                                        <TableHead className="text-left">المبلغ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <div className={cn("flex items-center gap-2 text-sm", getTransactionType(tx.type).color)}>
                                                    {getTransactionType(tx.type).icon}
                                                    <span>{getTransactionType(tx.type).text}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">{tx.description}</TableCell>
                                            <TableCell className={cn("text-left font-mono font-medium", getTransactionType(tx.type).color)}>
                                                {tx.type === 'deposit' ? '+' : '-'} {tx.amount.toLocaleString()} ريال
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
