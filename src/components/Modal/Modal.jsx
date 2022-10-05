import { createPortal } from "react-dom";
import { useEffect } from 'react';
import styles from './Modal.module.css';
import closePic from '../../images/closeIcon.png'
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, children}) {
    useEffect(() => {
        document.addEventListener('keydown', onClose);
    
        return () => {
          document.removeEventListener('keydown', onClose);
        };
      });

   const handleKeyDown = ({target, currentTarget, code}) => {
        if (target === currentTarget || code === 'Escape') {
           onClose()
        }
    }

        return createPortal(
            <div className={styles.Overlay} onClick={handleKeyDown}>
                <div className={styles.Modal}>
                   <img className={styles.close} alt="" src={closePic} width="25px" onClick={handleKeyDown} />
                    <div className={styles.content}>
                    {children}
                    </div>
                </div>
            </div>,
            modalRoot,
        );
}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}