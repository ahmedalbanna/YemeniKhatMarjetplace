'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { quoteRequests, products } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ClipboardList, ExternalLink, ArrowUp, DollarSign, Package, Activity } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverviewPage() {

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'بانتظار موافقة البائع':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'قيد التفاوض':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'تم الرد':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'مقبول':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ملغي':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return '';
    }
  };

  const recentQuotes = quoteRequests.slice(0, 3);

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">لوحة تحكم البائع</h1>
            <p className="text-muted-foreground">نظرة عامة على نشاطك التجاري.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,250,000 ريال</div>
                    <p className="text-xs text-muted-foreground">+20.1% عن الشهر الماضي</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">المنتجات النشطة</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{products.length}</div>
                    <p className="text-xs text-muted-foreground">منتج معروض حالياً</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">طلبات جديدة</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{quoteRequests.filter(q => q.status === 'بانتظار موافقة البائع').length}</div>
                    <p className="text-xs text-muted-foreground">بانتظار موافقتك</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">تقييمك العام</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4.8 / 5</div>
                    <p className="text-xs text-muted-foreground">بناءً على آخر 50 تقييم</p>
                </CardContent>
            </Card>
        </div>

        <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle>أحدث الطلبات</CardTitle>
                <CardDescription>آخر طلبات عروض الأسعار التي تلقيتها.</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/quotes">
                    عرض الكل
                </Link>
            </Button>
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
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentQuotes.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                    <div className="font-medium">{req.id}</div>
                    <div className="text-sm text-muted-foreground">{new Date(req.date).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>{req.customerName}</TableCell>
                  <TableCell>
                    <div>{req.productName}</div>
                    <div className="text-sm text-muted-foreground">
                      {req.khatTypeName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn('capitalize', getStatusVariant(req.status))}
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">
                    <Button variant="outline" size="sm" asChild>
                       <Link href={`/dashboard/quotes/${req.id}`}>
                         <ExternalLink className="ml-2 h-4 w-4" />
                         عرض والتفاوض
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
