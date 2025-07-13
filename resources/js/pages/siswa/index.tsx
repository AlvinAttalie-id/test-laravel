import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ChevronDown, MoreHorizontal, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AlertModal } from '@/components/modal-hapus';
import { Checkbox } from '@/components/ui/checkbox';
import { BreadcrumbItem, PageProps } from '@/types';
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

export type Siswa = {
    id: string;
    nis: string;
    nama: string;
    tanggal_lahir: string;
    alamat: string;
    kelas: { nama: string };
};

interface SiswaPageProps extends PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Siswa',
        href: '/siswa',
    },
];

export const columns: ColumnDef<Siswa>[] = [
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
        accessorKey: 'nis',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    NIS
                    {/* <ArrowUpDown /> */}
                </Button>
            );
        },
        cell: ({ row }) => <div >{row.getValue('nis')}</div>,
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
        cell: ({ row }) => <div >{row.getValue('nama')}</div>,
    },

    {
        accessorKey: 'kelas',
        header: 'Kelas',
        cell: ({ row }) => {
            const kelas = row.original.kelas;
            return (
                <div>
                    <span key={kelas.nama} className="mr-1">
                        {kelas.nama}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'tanggal_lahir',
        header: 'Tanggal Lahir',
        cell: ({ row }) => {
            const date = new Date(row.getValue('tanggal_lahir'));
            return <div>{format(date, 'dd MMMM yyyy', { locale: id })}</div>;
        },
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
        cell: ({ row }) => <div>{row.getValue('alamat')}</div>,
    },

    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const siswas = row.original;
            const [loading, setLoading] = useState(false);
            const [open, setOpen] = useState(false);
            const form = useForm({});

            const onConfirm = () => {
                form.delete(route('siswa.destroy', siswas.id), {
                    onSuccess: () => {
                        setOpen(false);
                    },
                    onError: (errors) => {
                        console.error(errors);
                        // toast.error('Failed to delete user.');
                    },
                });
            };
            return (
                <>
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
                                <Link href={route('siswa.edit', siswas.id)}>
                                    <span className="ml-4">Edit</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={() => setOpen(true)} variant="ghost">
                                    Hapus
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];

export default function GuruPage() {
    const { props } = usePage();
    const data = props.siswas as Siswa[];

    const { flash } = usePage<SiswaPageProps>().props;

    useEffect(() => {
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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Siswa" />

            <ToastContainer theme="light" position="top-right" autoClose={3000} />

            <div className="p-6">
                <div className="w-full">
                    <div className="flex items-center py-4">
                        <div className="flex justify-between">
                            <Input
                                placeholder="Filter Nama Siswa..."
                                value={(table.getColumn('nama')?.getFilterValue() as string) ?? ''}
                                onChange={(event) => table.getColumn('nama')?.setFilterValue(event.target.value)}
                                className="max-w-sm"
                            />
                            <Button className="ml-4 bg-black text-white dark:bg-white dark:text-black">
                                <PlusCircle />
                                <Link href={route('siswa.create')}>
                                    <span className="ml-2">Tambah Siswa</span>
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
                            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
