import { Navbar } from '@/components/layout/Navbar';
import { ToastProvider } from '@/providers/ToastProvider';

export default function PublicLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
                <ToastProvider />
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
        </div>
    );
}