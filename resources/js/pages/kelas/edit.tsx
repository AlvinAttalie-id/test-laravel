import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Kelas',
        href: '/guru/create',
    },
];

interface Wali {
    id: number;
    nama: string;
}

interface Kelas {
    id: number;
    nama: string;
    wali_kelas_id: number;
}


interface KelasPageProps extends PageProps {
    wali: Wali[];
    kelases: Kelas;
}

export default function TambahKelas() {
    const { kelases, wali } = usePage<KelasPageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: kelases.nama,
        wali_kelas_id: '',
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('kelas.update', kelases.id), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kelas" />

            <div className="container mx-auto p-6 py-6">
                <div className="card rounded-lg border p-6 shadow-sm">
                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 ">
                                <label htmlFor="nama" className="text-sm font-medium">Nama</label>
                                <Input 
                                    id="nama" 
                                    value={data.nama} 
                                    onChange={(e) => setData('nama', e.target.value)} 
                                    placeholder="Masukkan nama kelas"
                                    className="w-full mt-4" 
                                />
                                {errors.nama && <div className="text-sm text-red-500">{errors.nama}</div>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="wali_kelas_id" className="text-sm font-medium">Wali Kelas</label>
                                <select
                                    id="wali_kelas_id"
                                    value={data.wali_kelas_id}
                                    onChange={(e) => setData('wali_kelas_id', e.target.value)}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-4"
                                >
                                    <option value="">Pilih Wali Kelas</option>
                                    {wali.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>
                                {errors.wali_kelas_id && <div className="text-sm text-red-500">{errors.wali_kelas_id}</div>}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button type="button" variant="secondary">
                                <Link href={route('kelas.index')}>Kembali</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
