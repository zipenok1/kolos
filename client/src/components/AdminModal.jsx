import { createPortal } from 'react-dom';

export default function AdminModal({ isOpen, onClose, children }) {  

  if (!isOpen) return null

  return createPortal(
    <div className='modal'>
      <div className='modal__content'>
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
