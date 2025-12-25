import { useEffect } from 'react';

import { useToastStore } from './store/toastStore';
import styles from './Toast.module.scss';

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: { id: string; message: string; type: 'error' | 'success' | 'info' };
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[`toast_${toast.type}`]}`} onClick={onClose}>
      <p className={styles.toast_message}>{toast.message}</p>
    </div>
  );
}
