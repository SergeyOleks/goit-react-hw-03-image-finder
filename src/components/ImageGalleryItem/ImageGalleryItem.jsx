
import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, user }) => {
    return <img src={webformatURL} alt={user} className={css.gallery__itemImage} />;
};

export default ImageGalleryItem;
