import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Modal from './ui/modal';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className='p-6 space-y-4 dark:bg-gray-900 dark:text-white'>
                <h2 className="text-lg font-semibold">Apakah anda yakin menghapus data ini?</h2>
                <p className="mt-2">Tindakan ini tidak bisa dibatalkan</p>
                <div className="flex w-full items-center justify-end space-x-2 pt-6">
                    <Button disabled={loading} variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                        Hapus
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
