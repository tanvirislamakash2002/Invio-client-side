"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/actions/product.action";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    category: { name: string };
}

interface ProductSearchSelectorProps {
    onSelect: (product: Product) => void;
    excludedProductIds?: string[];
    className?: string;
}

export function ProductSearchSelector({
    onSelect,
    excludedProductIds = [],
    className
}: ProductSearchSelectorProps) {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Search products when user types
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (search.length < 2) {
                setProducts([]);
                return;
            }

            setLoading(true);
            const result = await getProducts({
                search,
                limit: 10,
                status: "ACTIVE"
            });

            // Get products array from response
            let productsArray = result.data?.data || result.data || [];

            // Filter out already added products
            const filtered = productsArray.filter(
                (p: Product) => !excludedProductIds.includes(p.id)
            );

            setProducts(filtered);
            setLoading(false);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, excludedProductIds]); // ← Make sure excludedProductIds is in dependency array

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (products.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, products.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, -1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && products[selectedIndex]) {
                    onSelect(products[selectedIndex]);
                    setSearch("");
                    setProducts([]);
                    setShowDropdown(false);
                    setSelectedIndex(-1);
                }
                break;
            case "Escape":
                setShowDropdown(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Handle product selection
    const handleSelect = (product: Product) => {
        onSelect(product);
        setSearch("");
        setProducts([]);
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    return (
        <div className={cn("relative", className)}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    placeholder="Search products by name..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowDropdown(true);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                        // Delay to allow click on dropdown
                        setTimeout(() => setShowDropdown(false), 200);
                    }}
                    className="pl-9"
                />
                {loading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
            </div>

            {/* Dropdown results */}
            {showDropdown && products.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-80 overflow-y-auto dark:bg-gray-700"
                >
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={cn(
                                "p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b last:border-0 dark:bg-gray-700",
                                selectedIndex === index && "bg-gray-100 dark:bg-gray-700"
                            )}
                            onClick={() => handleSelect(product)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {product.category?.name}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">${product.price.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Stock: {product.stockQuantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No results */}
            {showDropdown && search.length >= 2 && !loading && products.length === 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg p-4 text-center text-muted-foreground">
                    No products found
                </div>
            )}
        </div>
    );
}