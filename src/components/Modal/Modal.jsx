import { useEffect } from 'react'
import s from './modal.module.css'
import PropTypes from 'prop-types';

const Modal = ({ closeModal, children }) => {
    
    useEffect(() => {
        document.addEventListener('keydown', closed)
        
        return () => document.removeEventListener('keydown', closed)
        
        })
        
    const closed = (e) => {
        
        if (e.code === "Escape") {
                closeModal()
            }
            
            if (e.target === e.currentTarget) {
                closeModal()
            }
        }

        return (
            <div onClick={closed} className={s.overlay}>
                <div className={s.modal}>
                    {children}
                </div>
            </div>
        )
    }


Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default Modal