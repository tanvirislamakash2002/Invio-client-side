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
import { Roles } from "@/constants/roles";

export default function CategoryTable({ categories, userRole }: any) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    {(userRole === Roles.admin || userRole === Roles.manager) && (
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
                        {(userRole === Roles.admin|| userRole === Roles.manager) && (
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