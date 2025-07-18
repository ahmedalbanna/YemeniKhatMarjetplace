import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
           <Leaf className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-headline mt-4">إنشاء حساب جديد</CardTitle>
          <CardDescription>أدخل معلوماتك للبدء</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">الاسم الأول</Label>
                <Input id="first-name" placeholder="يوسف" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">الاسم الأخير</Label>
                <Input id="last-name" placeholder="السعيد" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              إنشاء حساب
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            هل لديك حساب بالفعل؟{' '}
            <Link href="/login" className="underline">
              تسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
