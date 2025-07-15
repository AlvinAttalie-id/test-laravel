import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ChevronDown, MoreHorizontal, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AlertModal } from '@/components/modal-hapus';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

export type Guru = {
    id: string;
    nip: string;
    nama: string;
    kelas?: {
        id: number;
        nama: string;
    }[];
    no_hp: string;
};

export interface GuruPageProps extends PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Guru',
        href: '/guru',
    },
];

export const columns: ColumnDef<Guru>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'nip',
        header: 'NIP',
        cell: ({ row }) => <div className="capitalize">{row.getValue('nip')}</div>,
    },
    {
        accessorKey: 'nama',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama
                    {/* <ArrowUpDown /> */}
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('nama')}</div>,
    },

    {
        accessorKey: 'no_hp',
        header: 'No HP',
        cell: ({ row }) => <div className="capitalize">{row.getValue('no_hp')}</div>,
    },

    {
        accessorKey: 'kelas',
        header: 'Kelas yang Diasuh',
        cell: ({ row }) => {
            const kelas = row.original.kelas;

            if (!kelas || kelas.length === 0) {
                return <span className="text-gray-500 italic">Belum ada</span>;
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {kelas.map((kls) => (
                        <span
                            key={kls.id}
                            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                        >
                            {kls.nama}
                        </span>
                    ))}
                </div>
            );
        },
    },

    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const kelases = row.original;
            const [loading, setLoading] = useState(false);
            const [open, setOpen] = useState(false);
            const form = useForm({});

            const onConfirm = () => {
                form.delete(route('kelas.destroy', kelases.id), {
                    onSuccess: () => setOpen(false),
                    onError: (errors) => console.error(errors),
                });
            };

            return (
                <div className="flex items-center justify-between gap-2">
                    {/* Tombol Lihat Detail */}
                    <Link href={route('guru.kelas', kelases.id)}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            Lihat Detail
                        </Button>
                    </Link>

                    {/* Dropdown Edit & Hapus */}
                    <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={route('kelas.edit', kelases.id)} className="ml-2">
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={() => setOpen(true)} variant="ghost" className="ml-2">
                                    Hapus
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },

];

export default function GuruPage() {
    const { props } = usePage();
    const data = props.gurus as Guru[];
    const { flash } = usePage<GuruPageProps>().props;

    useEffect(() => {
        console.log('Flash message:', flash);
        if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = useState<{
        pageIndex: number;
        pageSize: number;
    }>({
        pageIndex: 0,
        pageSize: 10, // Jumlah data per halaman
    });


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,

        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Guru" />

            <ToastContainer theme="light" position="top-right" autoClose={3000} />

            <div className="p-6">
                <div className="w-full">
                    <div className="flex items-center py-4">
                        <div className="flex justify-between">
                            <Input
                                placeholder="Filter Nama Guru..."
                                value={(table.getColumn('nip')?.getFilterValue() as string) ?? ''}
                                onChange={(event) => table.getColumn('nip')?.setFilterValue(event.target.value)}
                                className="max-w-sm"
                            />
                            <Button className="ml-4 bg-black text-white dark:bg-white dark:text-black">
                                <PlusCircle />
                                <Link href={route('guru.create')}>
                                    <span className="ml-2">Tambah Guru</span>
                                </Link>
                            </Button>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>

                            {/* Tombol halaman windowed */}
                            {(() => {
                                const pageCount = table.getPageCount();
                                const currentPage = table.getState().pagination.pageIndex;
                                const pages = [];

                                const start = Math.max(0, currentPage - 2);
                                const end = Math.min(pageCount - 1, currentPage + 2);

                                if (start > 0) {
                                    pages.push(
                                        <Button
                                            key={0}
                                            variant={currentPage === 0 ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => table.setPageIndex(0)}
                                        >
                                            1
                                        </Button>
                                    );
                                    if (start > 1) {
                                        pages.push(<span key="start-ellipsis" className="px-2">...</span>);
                                    }
                                }

                                for (let i = start; i <= end; i++) {
                                    pages.push(
                                        <Button
                                            key={i}
                                            variant={i === currentPage ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => table.setPageIndex(i)}
                                        >
                                            {i + 1}
                                        </Button>
                                    );
                                }

                                if (end < pageCount - 1) {
                                    if (end < pageCount - 2) {
                                        pages.push(<span key="end-ellipsis" className="px-2">...</span>);
                                    }
                                    pages.push(
                                        <Button
                                            key={pageCount - 1}
                                            variant={currentPage === pageCount - 1 ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => table.setPageIndex(pageCount - 1)}
                                        >
                                            {pageCount}
                                        </Button>
                                    );
                                }

                                return pages;
                            })()}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
