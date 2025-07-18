import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { orders } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Package2 } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Package2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline">طلباتي</CardTitle>
              <CardDescription>عرض وإدارة سجل طلباتك.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">رقم الطلب</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجمالي</TableHead>
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
                      className={cn(
                        'capitalize',
                        order.status === 'تم التوصيل' && 'bg-green-100 text-green-800 border-green-200',
                        order.status === 'قيد التجهيز' && 'bg-amber-100 text-amber-800 border-amber-200',
                        order.status === 'ملغي' && 'bg-red-100 text-red-800 border-red-200'
                      )}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
