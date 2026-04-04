"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSearchSelector } from "./product-search-selector";
import { Trash2, ArrowLeft } from "lucide-react";
import { createOrder } from "@/actions/order.action";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  stockQuantity: number;
}

export function OrderForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);

  const addProduct = (product: any) => {
    const existing = items.find(item => item.productId === product.id);
    if (existing) {
      alert("This product is already added to the order");
      return;
    }

    setItems([
      ...items,
      {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        stockQuantity: product.stockQuantity,
      },
    ]);
  };

  const updateQuantity = (index: number, quantity: number) => {
    const newItems = [...items];
    const maxStock = newItems[index].stockQuantity;
    
    if (quantity < 1) {
      newItems.splice(index, 1);
    } else if (quantity > maxStock) {
      alert(`Only ${maxStock} items available in stock`);
      newItems[index].quantity = maxStock;
    } else {
      newItems[index].quantity = quantity;
    }
    
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getExcludedProductIds = () => {
    return items.map(item => item.productId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName) {
      alert("Customer name is required");
      return;
    }

    if (items.length === 0) {
      alert("Add at least one product");
      return;
    }

    setLoading(true);

    const result = await createOrder({
      customer: {
        name: customerName,
        email: customerEmail || undefined,
        phone: customerPhone || undefined,
      },
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      router.push("/orders");
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName" className="pb-2">Customer Name *</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail" className="pb-2">Email (Optional)</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone" className="pb-2">Phone (Optional)</Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+1234567890"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Card - FIX: Add overflow-visible */}
      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>Add Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 overflow-visible">
          {/* Wrapper with relative positioning for dropdown */}
          <div className="relative z-10">
            <ProductSearchSelector 
              onSelect={addProduct}
              excludedProductIds={getExcludedProductIds()}
            />
          </div>

          {/* Order Items List */}
          {items.length > 0 && (
            <div className="space-y-3 mt-6">
              <h3 className="font-medium">Order Items</h3>
              <div className="border rounded-lg divide-y">
                {items.map((item, index) => (
                  <div key={item.productId} className="p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="w-32">
                      <Input
                        type="number"
                        min="1"
                        max={item.stockQuantity}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="w-24 text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="flex justify-end border-t pt-4 mt-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Order Total</p>
                  <p className="text-3xl font-bold">${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button type="submit" disabled={loading || items.length === 0}>
          {loading ? "Creating Order..." : "Create Order"}
        </Button>
      </div>
    </form>
  );
}