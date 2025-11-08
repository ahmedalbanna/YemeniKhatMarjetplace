'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { orders, wallet } from '@/lib/mock-data';
import { Package, Wallet as WalletIcon, ClipboardList, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CustomerPage() {
    const recentOrders = orders.slice(0, 3);
    const pendingOrders = orders.filter(o => o.status === 'بانتظار الموافقة' || o.status === 'قيد التجهيز').length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">لوحة تحكم المشتري</h1>
                <p className="text-muted-foreground">نظرة عامة على طلباتك ومحفظتك.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">الرصيد الحالي</CardTitle>
                        <WalletIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{wallet.balance.toLocaleString()} ريال</div>
                        <p className="text-xs text-muted-foreground">في محفظتك الإلكترونية</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">الطلبات النشطة</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders}</div>
                        <p className="text-xs text-muted-foreground">طلبات قيد المعالجة</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders.length}</div>
                        <p className="text-xs text-muted-foreground">جميع طلباتك</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>أحدث الطلبات</CardTitle>
                            <CardDescription>آخر طلباتك.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/customer/orders">
                                عرض الكل
                                <ArrowRight className="mr-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {recentOrders.length > 0 ? (
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-semibold">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(order.date).toLocaleDateString()} • {order.status}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-semibold">{order.total.toLocaleString()} ريال</p>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/customer/orders/${order.id}`}>
                                                عرض التفاصيل
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">لا توجد طلبات بعد.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
