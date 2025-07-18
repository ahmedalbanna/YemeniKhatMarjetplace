import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card text-muted-foreground py-6 mt-auto border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Yemeni Khat Marketplace. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/support" className="text-sm hover:text-foreground transition-colors">Customer Support</Link>
          <Link href="#" className="text-sm hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="#" className="text-sm hover:text-foreground transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
