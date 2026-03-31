
import UpdateProductForm from "@/components/modules/products/update-product-form";
import { getProductById } from "@/actions/product.action";
import { getCategories } from "@/actions/category.action";

export default async function UpdateProductPage({ params }: {
    params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = id;
console.log(productId);
  // Fetch product and categories on server-side
  const [{ data: product }, { data: categories }] = await Promise.all([
    getProductById(productId),
    getCategories(),
  ]);

  if (!product) {
    return <div className="p-6 text-center">Product not found</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <UpdateProductForm
        product={product}
        productId={product.id}
        categories={categories || []}
      />
    </div>
  );
}