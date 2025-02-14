import { Button } from '../ui/button';
import Modal from './Modal';

interface ConfirmDeleteProps {
  onConfirm: (id: string) => void;
  onTrigger: React.ReactNode;
  id: any;
}

const ConfirmDelete = ({ onConfirm, onTrigger, id }: ConfirmDeleteProps) => {
  return (
    <Modal
      trigger={onTrigger}
      title="Are you sure?"
      onConfirm={() => onConfirm(id)}
      onCancel={() => console.log('Cancel clicked')}
      confirmText="Yes, Delete"
      cancelText="No, Cancel"
    >
      <p className="text-white">Warning! This action cannot be undone.</p>
    </Modal>
  );
};

export default ConfirmDelete;
