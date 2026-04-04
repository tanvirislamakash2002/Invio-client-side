"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProductSummaryProps {
  products: {
    id: string;
    name: string;
    stockQuantity: number;
    minStockThreshold: number;
    status: string;
  }[];
}

export function ProductSummary({ products }: ProductSummaryProps) {
  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < threshold) return { label: "Low Stock", variant: "default" as const };
    return { label: "OK", variant: "secondary" as const };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Stock Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const status = getStockStatus(product.stockQuantity, product.minStockThreshold);
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <span className={product.stockQuantity < product.minStockThreshold ? "text-orange-600 font-semibold" : ""}>
                      {product.stockQuantity} left
                    </span>
                  </TableCell>
                  <TableCell>{product.minStockThreshold}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>
                      {status.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}