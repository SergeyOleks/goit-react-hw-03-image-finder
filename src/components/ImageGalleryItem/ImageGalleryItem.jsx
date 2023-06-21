// import { nanoid } from 'nanoid';

const ImageGalleryItem = ({ webformatURL, user }) => {
    return <img src={webformatURL} alt={user} className={CSS.gallery__itemImage} />;
};

export default ImageGalleryItem;
