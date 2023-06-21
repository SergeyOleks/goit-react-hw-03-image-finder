import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
// import { nanoid } from 'nanoid';

const ImageGallery = ({ data, onClick }) => {
  return (
    data && (
      <ul className={css.imageGallery} onClick={onClick}>
        {data.map(({ webformatURL, user, id }) => {
          return (
            <li key={id} className={css.gallery__item}>
              <ImageGalleryItem webformatURL={webformatURL} user={user} />
            </li>
          );
        })}
      </ul>
    )
  );
};

export default ImageGallery;
