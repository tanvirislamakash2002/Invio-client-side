"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orderService } from "@/services/order.service";

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

interface NewOrderFormProps {
  customers: Customer[];
}

interface OrderItem {
  productId: string;
  quantity: number;
}

export default function NewOrderForm({ customers }: NewOrderFormProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [items, setItems] = useState<OrderItem[]>([{ productId: "", quantity: 1 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleItemChange = (index: number, key: keyof OrderItem, value: string | number) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [key]: key === "quantity" ? Number(value) : String(value)
    } as OrderItem;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { productId: "", quantity: 1 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!selectedCustomer) throw new Error("Select a customer");
      if (!items.length) throw new Error("Add at least one product");

      // Prepare payload
      const payload = {
        customer: { id: selectedCustomer },
        items,
      };

      const res = await orderService.create(payload);

      if (res.error) throw new Error(res.error.message);

      alert("Order created successfully!");
      setItems([{ productId: "", quantity: 1 }]);
      setSelectedCustomer("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      {/* Customer Select */}
      <div>
        <label className="block text-sm font-medium mb-1">Customer</label>
        <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
          <SelectTrigger>
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name} {c.email && `(${c.email})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Order Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              placeholder="Product ID"
              value={item.productId}
              onChange={(e) => handleItemChange(index, "productId", e.target.value)}
              required
            />
            <Input
              type="number"
              min={1}
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
              required
            />
            {items.length > 1 && (
              <Button type="button" variant="destructive" onClick={() => removeItem(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={addItem}>
          Add Item
        </Button>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Order"}
      </Button>
    </form>
  );
}