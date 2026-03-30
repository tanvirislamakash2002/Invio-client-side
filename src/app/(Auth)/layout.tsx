import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Home, Heart, Shield, Pill } from "lucide-react";

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background">
            {/* Left Column - Brand Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-primary/10 to-background relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo and Actions */}
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                                <Pill className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                MediGo
                            </span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <Button variant="ghost" size="sm" asChild className="gap-2">
                                <Link href="/">
                                    <Home className="h-4 w-4" />
                                    Home
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 my-auto">
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold tracking-tight">
                                Welcome to
                                <span className="text-primary"> MediGo</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Your trusted online medicine shop. Get authentic medicines delivered to your doorstep.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 backdrop-blur-sm">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Shield className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">100% Genuine Medicines</p>
                                    <p className="text-sm text-muted-foreground">Certified and authentic products</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 backdrop-blur-sm">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Heart className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">24/7 Customer Support</p>
                                    <p className="text-sm text-muted-foreground">Always here to help you</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="pt-6">
                            <p className="text-sm text-muted-foreground">
                                Trusted by over 10,000+ customers across Bangladesh
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-muted-foreground">
                        © 2024 MediGo. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Column - Form Section */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Header */}
                    <div className="lg:hidden mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Pill className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    MediGo
                                </span>
                            </Link>
                            <div className="flex items-center gap-2">
                                <ThemeToggle />
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/">
                                        <Home className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">Welcome Back</h2>
                            <p className="text-muted-foreground mt-1">Please sign in to continue</p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <Card className="border-0 shadow-none lg:shadow-lg bg-transparent lg:bg-background">
                        <CardContent className="p-0 lg:p-6">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}