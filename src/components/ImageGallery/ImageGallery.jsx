import ImageGalleryItem from "./ImageGalleryItem"
import s from './imageGallery.module.css'
import PropTypes from 'prop-types';

const ImageGallery = ({ image , onClickGalleryItem}) => {
    if (!image) {
        return
    }
    const onClick = (e) => {
        onClickGalleryItem(e.target.id)
    }
    const element = image.map(res => {
        return (
            <ImageGalleryItem onClick={onClick} id={res.id} key={res.id} url={res.webformatURL} tags={res.tags} />
        )
        
    })

    
    return (
        <ul  className={s.gallery}>
            {element}
        </ul>
    )
}

ImageGallery.propTypes = {
    image: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    })
    ).isRequired,
    onClickGalleryItem: PropTypes.func.isRequired,
}


export default ImageGallery