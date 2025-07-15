import React, { useState } from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    flexRender,
} from '@tanstack/react-table';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

interface Siswa {
    id: number;
    nama: string;
    nis: string;
    alamat: string;
    tanggal_lahir: string;
    kelas?: {
        nama: string;
    };
}

interface Kelas {
    id: number;
    nama: string;
    wali_kelas?: {
        nama: string;
    };
}

interface Props extends PageProps {
    kelas: Kelas;
    siswas: Siswa[];
}

const columns: ColumnDef<Siswa>[] = [
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
        header: 'NIS',
        cell: ({ row }) => <div>{row.getValue('nis')}</div>,
    },
    {
        accessorKey: 'nama',
        header: 'Nama',
        cell: ({ row }) => <div>{row.getValue('nama')}</div>,
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
        cell: ({ row }) => <div>{row.getValue('alamat')}</div>,
    },
    {
        accessorKey: 'tanggal_lahir',
        header: 'Tanggal Lahir',
        cell: ({ row }) => <div>{row.getValue('tanggal_lahir')}</div>,
    },
    {
        accessorKey: 'kelas.nama',
        header: 'Kelas',
        cell: ({ row }) => <div>{row.original.kelas?.nama ?? '-'}</div>,
    },

];

export default function SiswaKelasPage() {
    const { kelas, siswas } = usePage<Props>().props;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data: siswas,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Kelas', href: '/kelas' },
        { title: kelas.nama, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Siswa Kelas ${kelas.nama}`} />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Siswa Kelas {kelas.nama}</h1>
                        {kelas.wali_kelas && (
                            <p className="text-sm text-muted-foreground">Wali Kelas: {kelas.wali_kelas.nama}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Filter Nama..."
                        value={(table.getColumn('nama')?.getFilterValue() as string) ?? ''}
                        onChange={(e) => table.getColumn('nama')?.setFilterValue(e.target.value)}
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table.getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        className="capitalize"
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(val) => col.toggleVisibility(!!val)}
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="rounded-md border overflow-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center py-8">
                                        Tidak ada siswa.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} dipilih.
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
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
        </AppLayout>
    );
}
