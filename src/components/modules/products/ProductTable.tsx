"use client";

import Link from "next/link";
import DeleteProductModal from "./DeleteProductModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ProductTable({ products }: any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category?.name || "-"}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.stockQuantity}</TableCell>
            <TableCell>{product.status}</TableCell>
            <TableCell className="flex gap-2">
              <Link href={`/products/${product.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <DeleteProductModal productId={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}