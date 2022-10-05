import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './imageGallery.module.css'

export default function ImageGallery ({items, onClick, page}) {
    const images = items.map(({ id, webformatURL, largeImageURL}) => {
        return <ImageGalleryItem key={id} webformatURL={webformatURL} onClick={onClick} largeImageURL={largeImageURL}/>
    })

    return ( 
             <ul className={styles.ImageGallery} key={page}>
                {images}
            </ul>
    )
}

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        largeImageURL: PropTypes.string,
    })),

    onClick: PropTypes.func,
    page: PropTypes.number,
}
