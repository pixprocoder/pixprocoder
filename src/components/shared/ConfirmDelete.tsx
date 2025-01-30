import { Button } from '../ui/button';
import Modal from './Modal';

const ConfirmDelete = ({ onConfirm, onTrigger, id }) => {
  console.log('id', id);
  return (
    <Modal
      trigger={onTrigger}
      title="Are you sure?"
      onConfirm={() => onConfirm(id)}
      onCancel={() => console.log('Cancel clicked')}
      confirmText="Yes, Delete"
      cancelText="No, Cancel"
    >
      <p className="text-white">This action cannot be undone.</p>
    </Modal>
  );
};

export default ConfirmDelete;
