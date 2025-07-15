import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Siswa',
        href: '/guru/create',
    },
];

interface Kelas {
    id: number;
    nama: string;
}

interface Siswa {
    id: number;
    nis: string;
    nama: string;
    kelas_id: number;
    tanggal_lahir: string;
    alamat: string;

}

interface SiswaPageProps extends PageProps {
    kelas: Kelas[];
    siswa: Siswa;
}

export default function TambahKelas() {
    const { siswa, kelas } = usePage<SiswaPageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        nis: siswa.nis,
        nama: siswa.nama,
        kelas_id: siswa.kelas_id.toString(),
        tanggal_lahir: siswa.tanggal_lahir,
        alamat: siswa.alamat,
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('siswa.update', siswa.id), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Siswa" />

            <div className="container mx-auto p-6 py-6">
                <div className="card rounded-lg border p-6 shadow-sm">
                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="nip" className="text-sm font-medium">
                                    NIS
                                </label>
                                <Input
                                    id="nis"
                                    value={data.nis}
                                    onChange={(e) => setData('nis', e.target.value)}
                                    placeholder="Masukkan NIS siswa"
                                    className="mt-4 w-full"
                                />
                                {errors.nis && <div className="text-sm text-red-500">{errors.nis}</div>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="nama" className="text-sm font-medium">
                                    Nama
                                </label>
                                <Input
                                    id="nama"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    placeholder="Masukkan nama siswa"
                                    className="mt-4 w-full"
                                />
                                {errors.nama && <div className="text-sm text-red-500">{errors.nama}</div>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="kelas_id" className="text-sm font-medium">
                                    Kelas
                                </label>
                                <select
                                    id="kelas_id"
                                    value={data.kelas_id}
                                    onChange={(e) => setData('kelas_id', e.target.value)}
                                    className="border-input ring-offset-background focus:ring-ring mt-4 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                >
                                    <option value="">Pilih Kelas</option>
                                    {kelas.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>
                                {errors.kelas_id && <div className="text-sm text-red-500">{errors.kelas_id}</div>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tanggal_lahir" className="text-sm font-medium">
                                    Tanggal Lahir
                                </label>
                                <Input
                                    type="date"
                                    id="tanggal_lahir"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                    className="mt-4 w-full"
                                />
                                {errors.tanggal_lahir && <div className="text-sm text-red-500">{errors.tanggal_lahir}</div>}
                            </div>

                            <div className="col-span-2 space-y-2">
                                <label htmlFor="alamat" className="text-sm font-medium">
                                    Alamat
                                </label>
                                <Input
                                    type="textarea"
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    placeholder="Masukkan alamat"
                                    className="mt-4 w-full"
                                />
                                {errors.alamat && <div className="text-sm text-red-500">{errors.alamat}</div>}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button type="button" variant="secondary">
                                <Link href={route('siswa.index')}>Kembali</Link>
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
