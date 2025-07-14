import { AreaGraph } from '@/components/area-graph';
import { BarGraph } from '@/components/bar-graph';
import { PieGraph } from '@/components/pie-graph';
import { RecentSales } from '@/components/sales';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Home, UserCircle2, Users } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ totalGuru, totalSiswa, totalKelas }: { totalGuru: number, totalSiswa: number, totalKelas: number, totalMapel: number }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col space-y-2 p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
                            <UserCircle2 />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalGuru}</div>
                            <p className="text-muted-foreground text-xs"></p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                            <Users />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSiswa}</div>
                            <p className="text-muted-foreground text-xs"></p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
                            <Home />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalKelas}</div>
                            <p className="text-muted-foreground text-xs"></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4">
                        <BarGraph />
                    </div>
                    <div className="col-span-4 md:col-span-3 lg:col-span-3">
                        <RecentSales />
                    </div>
                    <div className='col-span-4'><AreaGraph /></div>
                    <div className='col-span-4 md:col-span-3 lg:col-span-3'><PieGraph /></div>
                </div>
            </div>
        </AppLayout>
    );
}
