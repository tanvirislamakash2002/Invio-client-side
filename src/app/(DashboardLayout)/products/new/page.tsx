// app/products/add/page.tsx

import { Suspense } from "react";
import AddProductForm from "@/components/modules/products/add-product-form";
import { getCategories } from "@/actions/category.action";

export default async function AddProductPage() {
  const { data: categories } = await getCategories();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <AddProductForm categories={categories || []} />
      </Suspense>
    </div>
  );
}