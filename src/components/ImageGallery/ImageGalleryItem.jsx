import styles from './imageGallery.module.css'
import PropTypes from 'prop-types';

export default function ImageGalleryItem ({webformatURL, largeImageURL, onClick }) {
        return (
            <li className={styles.ImageGalleryItem}>
                <img src={webformatURL} alt="" onClick={() => onClick({largeImageURL})} className={styles.ImageGalleryItemImage}/>
            </li>
        )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    onClick: PropTypes.func,
}