import s from './imageGalleryItem.module.css'
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, tags, id  }) => {
    return (
        <li className={s.item}>
            <img id={id} src={url} alt={tags} className={s.image} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default ImageGalleryItem