"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Package, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { restockProduct, removeFromRestockQueue } from "@/actions/restock.action";

interface RestockItem {
  id: string;
  productId: string;
  currentStock: number;
  threshold: number;
  priority: string;
  priorityLabel: string;
  product: {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    minStockThreshold: number;
    category: { name: string };
  };
}

interface RestockTableProps {
  items: RestockItem[];
  onUpdate: () => void;
}

const priorityColors: Record<string, string> = {
  HIGH: "bg-red-100 text-red-800 border-red-200",
  MEDIUM: "bg-orange-100 text-orange-800 border-orange-200",
  LOW: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const priorityIcons: Record<string, React.ReactNode> = {
  HIGH: <AlertTriangle className="h-3 w-3" />,
  MEDIUM: <TrendingUp className="h-3 w-3" />,
  LOW: <Package className="h-3 w-3" />,
};

export function RestockTable({ items, onUpdate }: RestockTableProps) {
  const [restockingId, setRestockingId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<RestockItem | null>(null);

  const handleRestock = async () => {
    if (!selectedProduct || quantity <= 0) return;
    
    setRestockingId(selectedProduct.productId);
    const result = await restockProduct(selectedProduct.productId, quantity);
    
    if (result.error) {
      alert(result.error.message);
    } else {
      onUpdate();
      setDialogOpen(false);
      setQuantity(10);
    }
    setRestockingId(null);
  };

  const handleRemove = async (productId: string, productName: string) => {
    if (confirm(`Remove "${productName}" from restock queue?`)) {
      const result = await removeFromRestockQueue(productId);
      if (result.error) {
        alert(result.error.message);
      } else {
        onUpdate();
      }
    }
  };

  const openRestockDialog = (item: RestockItem) => {
    setSelectedProduct(item);
    setQuantity(item.threshold - item.currentStock + 5);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.product.name}</TableCell>
                <TableCell>{item.product.category?.name || "Uncategorized"}</TableCell>
                <TableCell>
                  <span className="text-orange-600 font-semibold">
                    {item.currentStock} units
                  </span>
                </TableCell>
                <TableCell>{item.threshold} units</TableCell>
                <TableCell>
                  <Badge className={priorityColors[item.priority]}>
                    <span className="flex items-center gap-1">
                      {priorityIcons[item.priority]}
                      {item.priorityLabel}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>${item.product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openRestockDialog(item)}
                    disabled={restockingId === item.productId}
                  >
                    <Package className="mr-1 h-3 w-3" />
                    Restock
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemove(item.productId, item.product.name)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  No products in restock queue
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Restock Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{selectedProduct.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Category: {selectedProduct.product.category?.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Current Stock</p>
                  <p className="font-bold text-orange-600">{selectedProduct.currentStock} units</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Threshold</p>
                  <p className="font-bold">{selectedProduct.threshold} units</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Quantity to Add</label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: {selectedProduct.threshold - selectedProduct.currentStock + 10} units
                </p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRestock} disabled={quantity <= 0}>
                  Add Stock
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}