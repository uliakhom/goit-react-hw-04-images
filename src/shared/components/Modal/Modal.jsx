import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';
const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = e => {
    if (e.code === 'Escape') {
      close();
      return;
    }
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func,
};
