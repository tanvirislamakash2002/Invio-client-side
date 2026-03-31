import { getSession } from "@/actions/auth.action";
import { getCategories } from "@/actions/category.action";
import CategoryTable from "@/components/modules/categories/CategoryTable";
import CreateCategoryDialog from "@/components/modules/categories/CreateCategoryDialog";

export default async function CategoriesPage() {
    const { data } = await getCategories();
    const userInfo = await getSession()
    const user = userInfo?.data?.user
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Categories</h1>

                {(user.role === "admin" || user.role === "manager") && (
                    <CreateCategoryDialog user = {user} />
                )}
            </div>

            <CategoryTable categories={data || []} userRole={user.role} />
        </div>
    );
}