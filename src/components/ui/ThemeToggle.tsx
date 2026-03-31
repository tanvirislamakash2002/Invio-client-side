"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Return a placeholder with same dimensions to prevent layout shift
    if (!mounted) {
        return <div className="h-9 w-9" />;
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}