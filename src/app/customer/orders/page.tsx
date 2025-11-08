'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { orders } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Package2, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Package2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline text-2xl">طلباتي</CardTitle>
              <CardDescription>عرض وإدارة سجل طلباتك.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجمالي</TableHead>
                <TableHead className="text-left">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn('capitalize', getStatusVariant(order.status))}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left font-mono">{order.total.toLocaleString()} ريال</TableCell>
                   <TableCell className="text-left">
                    <Button variant="outline" size="sm" asChild>
                       <Link href={`/customer/orders/${order.id}`}>
                         <ExternalLink className="ml-2 h-4 w-4" />
                         عرض التفاصيل
                       </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
