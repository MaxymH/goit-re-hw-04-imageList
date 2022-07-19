import { Component } from 'react'
import s from './modal.module.css'
import PropTypes from 'prop-types';
class Modal extends Component  {
    componentDidMount() {
        window.addEventListener('keydown', e => {
           if (e.code === "Escape") {
            this.props.closeModal()
           }
       })
    }
    onClick = (e) => {
         const {closeModal} = this.props
        if (e.target === e.currentTarget) {
            closeModal()
        }
    } 
    render() {
        const {url} = this.props
        return (
            <div onClick={this.onClick} className={s.overlay}>
                <div className={s.modal}>
                    <img src={url[0].largeImageURL } alt={url[0].tags } />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    url: PropTypes.array.isRequired
}

export default Modal