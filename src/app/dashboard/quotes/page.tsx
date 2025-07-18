import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { quoteRequests } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ClipboardList, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function VendorQuotesPage() {
  const statusTranslations = {
    'New': 'جديد',
    'Responded': 'تم الرد',
    'Accepted': 'مقبول',
    'Cancelled': 'ملغي'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <ClipboardList className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline">طلبات عروض الأسعار</CardTitle>
              <CardDescription>عرض وإدارة طلبات عروض الأسعار الواردة من العملاء.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">السعر التقديري</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quoteRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                    <div className="font-medium">{req.id}</div>
                    <div className="text-sm text-muted-foreground">{new Date(req.date).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>{req.customerName}</TableCell>
                  <TableCell>
                    <div>{req.productName}</div>
                    <div className="text-sm text-muted-foreground">
                      {req.khatTypeName} (x{req.quantity})
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'capitalize',
                        req.status === 'جديد' && 'bg-blue-100 text-blue-800 border-blue-200',
                        req.status === 'تم الرد' && 'bg-yellow-100 text-yellow-800 border-yellow-200',
                        req.status === 'مقبول' && 'bg-green-100 text-green-800 border-green-200',
                        req.status === 'ملغي' && 'bg-red-100 text-red-800 border-red-200'
                      )}
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">${req.estimatedPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-left">
                    <Button variant="outline" size="sm" asChild>
                       <Link href={`/dashboard/quotes/${req.id}`}>
                         <ExternalLink className="ml-2 h-4 w-4" />
                         عرض والرد
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
