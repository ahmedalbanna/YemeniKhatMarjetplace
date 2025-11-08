'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { products } from '@/lib/mock-data';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProductsPage() {

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">إدارة المنتجات</h1>
                    <p className="text-muted-foreground">عرض، إضافة، تعديل، وحذف منتجاتك.</p>
                </div>
                <Button>
                    <PlusCircle className="ml-2 h-5 w-5" />
                    إضافة منتج جديد
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>قائمة المنتجات</CardTitle>
                    <CardDescription>
                        لديك حاليًا {products.length} منتج معروض في متجرك.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">صورة</span>
                                </TableHead>
                                <TableHead>الاسم</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead className="hidden md:table-cell">السعر الأساسي</TableHead>
                                <TableHead className="hidden md:table-cell">عدد التقييمات</TableHead>
                                <TableHead>
                                    <span className="sr-only">الإجراءات</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image
                                            alt={product.name}
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={product.images[0]}
                                            width="64"
                                            data-ai-hint={product.dataAiHint}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {product.name}
                                        <div className="text-sm text-muted-foreground">{product.strain}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">نشط</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {product.price.toLocaleString()} ريال
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{product.reviews}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">قائمة الإجراءات</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                                                <DropdownMenuItem><Edit className="ml-2 h-4 w-4"/>تعديل</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600"><Trash2 className="ml-2 h-4 w-4"/>حذف</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
