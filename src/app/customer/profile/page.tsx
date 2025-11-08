'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, this would update the user profile
        if (user) {
            user.phone = phone;
            user.address = address;
            localStorage.setItem('user', JSON.stringify(user));
        }
        
        toast({
            title: 'تم الحفظ بنجاح',
            description: 'تم تحديث معلوماتك الشخصية.',
        });
        setIsSaving(false);
    };

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">يرجى تسجيل الدخول لعرض الملف الشخصي.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">الملف التعريفي</h1>
                <p className="text-muted-foreground">إدارة معلوماتك الشخصية وإعدادات الحساب.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <User className="h-6 w-6 text-primary" />
                        <CardTitle>المعلومات الشخصية</CardTitle>
                    </div>
                    <CardDescription>تحديث معلوماتك الشخصية وبيانات الاتصال.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">الاسم الأول</Label>
                            <Input 
                                id="firstName" 
                                value={user.firstName} 
                                disabled 
                                className="bg-muted"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">الاسم الأخير</Label>
                            <Input 
                                id="lastName" 
                                value={user.lastName} 
                                disabled 
                                className="bg-muted"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            <Mail className="inline ml-2 h-4 w-4" />
                            البريد الإلكتروني
                        </Label>
                        <Input 
                            id="email" 
                            type="email" 
                            value={user.email} 
                            disabled 
                            className="bg-muted"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">
                            <Phone className="inline ml-2 h-4 w-4" />
                            رقم الهاتف
                        </Label>
                        <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="+967 777 123 456"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">
                            <MapPin className="inline ml-2 h-4 w-4" />
                            العنوان
                        </Label>
                        <Input 
                            id="address" 
                            placeholder="شارع حدة، صنعاء، اليمن"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="pt-4">
                        <Button onClick={handleSave} disabled={isSaving}>
                            <Save className="ml-2 h-4 w-4" />
                            {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>معلومات الحساب</CardTitle>
                    <CardDescription>معلومات إضافية عن حسابك.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">نوع الحساب</span>
                        <span className="font-semibold">{user.role === 'customer' ? 'مشتري' : 'بائع'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">معرف المستخدم</span>
                        <span className="font-mono text-sm">{user.id}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

