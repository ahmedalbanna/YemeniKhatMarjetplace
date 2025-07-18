import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card text-muted-foreground py-6 mt-auto border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} سوق القات اليمني. جميع الحقوق محفوظة.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/support" className="text-sm hover:text-foreground transition-colors">الدعم الفني</Link>
          <Link href="#" className="text-sm hover:text-foreground transition-colors">شروط الخدمة</Link>
          <Link href="#" className="text-sm hover:text-foreground transition-colors">سياسة الخصوصية</Link>
        </div>
      </div>
    </footer>
  );
}
