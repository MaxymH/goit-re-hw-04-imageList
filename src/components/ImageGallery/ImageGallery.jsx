import ImageGalleryItem from "./ImageGalleryItem"
import s from './imageGallery.module.css'
import PropTypes from 'prop-types';

const ImageGallery = ({ url , onClickGalleryItem}) => {
    if (!url) {
        return
    }
    const element = url.map(res => {
        return (
            <ImageGalleryItem id={res.id} key={res.id} url={res.webformatURL} tags={res.tags} />
        )
        
    })

    const onClick = (e) => {
        onClickGalleryItem(e.target.id)
    }
    return (
        <ul onClick={onClick} className={s.gallery}>
            {element}
        </ul>
    )
}

ImageGallery.propTypes = {
    url: PropTypes.array.isRequired,
    onClickGalleryItem: PropTypes.func.isRequired,
}


export default ImageGallery