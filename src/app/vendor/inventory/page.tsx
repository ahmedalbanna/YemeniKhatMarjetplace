'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Package, ShoppingCart } from 'lucide-react';

const dailyStats = {
  revenue: 78500,
  orders: 5,
  itemsSold: 28,
};

const monthlySalesData = [
  { name: 'الأسبوع 1', total: 180000 },
  { name: 'الأسبوع 2', total: 250000 },
  { name: 'الأسبوع 3', total: 210000 },
  { name: 'الأسبوع 4', total: 320000 },
];

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <div>
          <h1 className="text-3xl font-bold font-headline">الجرد والسجلات</h1>
          <p className="text-muted-foreground">تتبع مبيعاتك وأداءك اليومي والشهري.</p>
      </div>

      {/* Daily Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
             <Calendar className="h-6 w-6 text-primary"/>
            <CardTitle>إحصائيات اليوم</CardTitle>
          </div>
          <CardDescription>ملخص نشاطك التجاري لليوم الحالي.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.revenue.toLocaleString()} ريال</div>
                <p className="text-xs text-muted-foreground">+15% عن الأمس</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الطلبات المكتملة</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{dailyStats.orders}</div>
                <p className="text-xs text-muted-foreground">تم إكمال 5 طلبات بنجاح</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المنتجات المباعة</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.itemsSold}</div>
                 <p className="text-xs text-muted-foreground">إجمالي عدد المنتجات المباعة</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>سجل المبيعات الشهري</CardTitle>
          <CardDescription>عرض بياني لإجمالي المبيعات خلال الشهر الحالي.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlySalesData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value as number / 1000).toLocaleString()} ألف`}
              />
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
