"use client";

import { useState, useEffect, useCallback } from "react";
import { OrderTable } from "@/components/modules/orders/order-table";
import { OrderFilters } from "@/components/modules/orders/order-filters";
import { OrderDetailsDialog } from "@/components/modules/orders/order-details-dialog";
import { getOrders, updateOrderStatus, cancelOrder } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface OrdersClientProps {
    initialOrders: any[];
    initialPagination: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    };
}

export function OrdersClient({ initialOrders, initialPagination }: OrdersClientProps) {
    const [orders, setOrders] = useState(initialOrders);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // Filters
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(initialPagination.page);
    const [totalPages, setTotalPages] = useState(initialPagination.totalPage);
    const limit = initialPagination.limit;

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        const result = await getOrders({ search, status, page, limit });
        if (result.data) {
            setOrders(result.data.data || result.data);
            setTotalPages(result.data.pagination?.totalPage || 1);
        }
        setLoading(false);
    }, [search, status, page, limit]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleApplyFilters = () => {
        setPage(1);
        fetchOrders();
    };

    const handleResetFilters = () => {
        setSearch("");
        setStatus("");
        setPage(1);
    };

    const handleViewOrder = (order: any) => {
        setSelectedOrder(order);
        setDetailsOpen(true);
    };

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        const result = await updateOrderStatus(orderId, newStatus);
        if (!result.error) {
            fetchOrders();
        } else {
            alert(result.error.message);
        }
    };

    const handleCancelOrder = async (orderId: string) => {
        const result = await cancelOrder(orderId);
        if (!result.error) {
            fetchOrders();
        } else {
            alert(result.error.message);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Orders</h1>
                    <p className="text-muted-foreground mt-1">Manage and track customer orders</p>
                </div>
                <Link href="/orders/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Order
                    </Button>
                </Link>
            </div>

            <div className="space-y-6">
                <OrderFilters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    onApply={handleApplyFilters}
                    onReset={handleResetFilters}
                />

                {loading ? (
                    <div className="text-center py-8">Loading orders...</div>
                ) : (
                    <>
                        <OrderTable
                            orders={orders}
                            onView={handleViewOrder}
                            onUpdateStatus={handleUpdateStatus}
                            onCancel={handleCancelOrder}
                        />

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6 gap-4">
                                <Button
                                    variant="outline"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </Button>
                                <span className="py-2">
                                    Page {page} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <OrderDetailsDialog
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                order={selectedOrder}
            />
        </>
    );
}