import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { faqs } from '@/lib/mock-data';
import { LifeBuoy } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-primary-foreground">الدعم الفني</h1>
        <p className="text-lg text-muted-foreground mt-2">نحن هنا للمساعدة. ابحث عن إجابات لأسئلتك أو تواصل معنا.</p>
      </header>

      <Tabs defaultValue="faq" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
          <TabsTrigger value="contact">اتصل بنا</TabsTrigger>
        </TabsList>
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>الأسئلة الشائعة</CardTitle>
              <CardDescription>ابحث عن إجابات للأسئلة الأكثر شيوعاً.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full text-right">
                {faqs.map((faq) => (
                  <AccordionItem value={faq.id} key={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>اتصل بنا</CardTitle>
              <CardDescription>املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4 text-right">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input id="name" placeholder="اسمك" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="بريدك الإلكتروني" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">الموضوع</Label>
                  <Input id="subject" placeholder="مثال: مشكلة في الطلب، استفسار" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea id="message" placeholder="اكتب رسالتك هنا." className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
