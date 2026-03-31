import { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "Authentication | Invio",
  description: "Sign in to your Invio inventory management account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simple Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-purple-950/20" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Brand Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative">
          <div className="relative z-10 flex flex-col justify-center items-center p-12 h-full text-center">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center gap-3 group mb-12">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-white font-bold text-3xl">I</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-white">Invio</span>
                <p className="text-indigo-200 text-sm mt-1">Smart Inventory Management</p>
              </div>
            </Link>
            
            {/* Main Heading */}
            <div className="space-y-4 max-w-sm mx-auto mb-12">
              <h1 className="text-4xl font-bold text-white">
                Manage Inventory<br />
                <span className="text-indigo-200">with Intelligence</span>
              </h1>
              <p className="text-indigo-100/80">
                Streamline your stock, automate orders, and never miss a restock with Invio's smart inventory system.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto w-full">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99%</div>
                <p className="text-xs text-indigo-200">Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50%</div>
                <p className="text-xs text-indigo-200">Time Saved</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <p className="text-xs text-indigo-200">Real-time</p>
              </div>
            </div>
            
            {/* Features as chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-12">
              {[
                "Smart Inventory",
                "Order Management",
                "Restock Queue",
                "Analytics",
              ].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 text-xs text-indigo-100 bg-white/10 rounded-full backdrop-blur-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md animate-fade-in-up">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Invio
                </span>
              </Link>
            </div>
            
            {/* Form Container */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-8">
              {children}
            </div>
            
            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to Invio's{" "}
                <Link href="/terms" className="text-indigo-600 hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}