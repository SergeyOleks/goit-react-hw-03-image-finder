import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, user }) => {
    return <img src={webformatURL} alt={user} className={css.gallery__itemImage} />;
};


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  user: PropTypes.string,
};
export default ImageGalleryItem;
