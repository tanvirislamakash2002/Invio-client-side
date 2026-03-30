import { Footer } from '@/components/layout/common/Footer';
import { Navbar } from '@/components/layout/common/Navbar';
import { CartProvider } from '@/providers/CartProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export default function PublicLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <CartProvider>
                <ToastProvider />
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </CartProvider>
        </div>
    );
}