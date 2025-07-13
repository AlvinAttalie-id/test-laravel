import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Guru',
        href: '/guru/edit',
    },
];

interface Guru {
    id: number;
    nama: string;
    nip: string;
    no_hp: string;
}

export default function EditGuru() {
    const { props } = usePage();

    const guru = props.gurus as Guru;

    const { data, setData, post, processing, errors , reset} = useForm({
        nama: guru.nama,
        nip: guru.nip,
        no_hp: guru.no_hp,
    });
       

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('guru.update', guru.id), {
            onSuccess: () => {
                reset();
            },
        });
    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Guru" />

            <div className="container mx-auto p-6 py-6">
                <div className="card rounded-lg border p-6 shadow-sm">
                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label htmlFor="nama">Nama</label>
                            <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} placeholder="Masukkan nama guru" />
                            {errors.nama && <div className="text-sm text-red-500">{errors.nama}</div>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="nip">NIP</label>
                            <Input id="nip" value={data.nip} onChange={(e) => setData('nip', e.target.value)} placeholder="Masukkan NIP" />
                            {errors.nip && <div className="text-sm text-red-500">{errors.nip}</div>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="no_hp">Nomor HP</label>
                            <Input id="no_hp" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} placeholder="Masukkan nomor HP" />
                            {errors.no_hp && <div className="text-sm text-red-500">{errors.no_hp}</div>}
                        </div>

                        <div className="flex justify-between">
                            <Button type="button" variant="secondary">
                                <Link href={route('guru.index')}>Kembali</Link>
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
