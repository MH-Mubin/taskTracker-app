function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Confirm Delete</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="modal-cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-confirm-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
