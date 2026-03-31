import { getProducts } from "@/actions/product.action";
import ProductTable from "@/components/modules/products/ProductTable";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const { data: products } = await getProducts();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <a href="/products/new">Add Product</a>
        </Button>
      </div>

      <ProductTable products={products || []} />
    </div>
  );
}