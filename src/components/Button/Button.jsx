import s from './button.module.css'
import PropTypes from 'prop-types';


const Button = ({func}) => {
   const onClick = () => {
            func('s')
        }
    return (
        <button onClick={() => onClick()} className={s.button}>Load more</button>
    )
}

Button.propTypes = {
    func: PropTypes.func.isRequired,
}

export default Button