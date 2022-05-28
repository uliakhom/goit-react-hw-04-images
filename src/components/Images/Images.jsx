import { useEffect, useState } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import Loader from './Loader';

import styles from './images.module.css';

const Images = () => {
  const [images, setImages] = useState({
    items: [],
    loading: false,
    error: null,
  });

  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState({
    isModalOpen: false,
    modalBody: {},
  });

  useEffect(() => {
    const fetchImages = async () => {
      setImages({
        ...images,
        loading: true,
        error: null,
      });
      try {
        const items = await axios.get(
          `https://pixabay.com/api/?q=${q}&page=${page}&key=27146874-6a4ead2ef4bbc8421b81b25a7&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages(prevState => ({
          ...prevState,
          items: [...prevState.items, ...items.data.hits],
          loading: false,
        }));
      } catch (error) {
        setImages({
          ...images,
          loading: false,
          error: error.message,
        });
        console.log(error);
      }
    };
    if (q !== '') {
      fetchImages();
    }
  }, [q, page]);

  const setSearch = ({ q }) => {
    setQ(q);
    setPage(1);
    setImages({ ...images, items: [] });
  };

  const showModal = ({ largeImageURL, tags }) => {
    setModal({
      isModalOpen: true,
      modalBody: {
        url: largeImageURL,
        tags: tags,
      },
    });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setModal({
      modalBody: {},
      isModalOpen: false,
    });
  };

  const { items, loading } = images;
  const { modalBody, isModalOpen } = modal;

  return (
    <>
      <SearchBar onSubmit={setSearch} />
      {!loading && Boolean(items.length) && (
        <ImageGallery items={items} onClick={showModal} />
      )}
      {!loading && Boolean(items.length) && (
        <div className={styles.buttonContainer}>
          <Button onClick={loadMore} text="Load more" />
        </div>
      )}
      {loading && <Loader />}
      {isModalOpen && (
        <Modal close={closeModal}>
          <img src={modalBody.url} alt={modalBody.tags} />
        </Modal>
      )}
    </>
  );
};

export default Images;
