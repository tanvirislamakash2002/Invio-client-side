import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteCategoryButton from "./DeleteCategoryButton";
import UpdateCategoryDialog from "./UpdateCategoryDialog";

export default function CategoryTable({ categories, userRole }: any) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    {(userRole === "ADMIN" || userRole === "MANAGER") && (
                        <TableHead>
                            Actions
                        </TableHead>
                    )}
                </TableRow>
            </TableHeader>

            <TableBody>
                {categories.map((cat: any) => (
                    <TableRow key={cat.id}>
                        <TableCell>{cat.name}</TableCell>
                        <TableCell>{cat.description || "-"}</TableCell>
                        {(userRole === "ADMIN" || userRole === "MANAGER") && (
                            <TableCell className="flex gap-2">

                                <UpdateCategoryDialog category={cat} userRole={userRole} />
                                <DeleteCategoryButton id={cat.id} />

                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}