import css from './Searchbar.module.css';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import { fetchFindResult } from './fetchFindResult';
import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';


class Searchbar extends Component {
  state = {
    name: '',
    loading: false,
    data: false,
    page: 1,
    showModal: false,
    modalPic: false,
  };

  toggleModal = event => {
    if (event) {
      const { src } = event.target;
      const { data } = this.state;

      const findObject = data.hits.find(el => el.webformatURL === src);
      this.setState({ modalPic: findObject });
    }

    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleSubmit = async event => {
    const { name, page } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    const resp = await fetchFindResult(name, page);
    const { data } = resp;

    setTimeout(() => {
    this.setState({
      loading: false,
      data: data,
    });

    }, 1000);

  };

  handlePageIncreace = async () => {
    let { page, name } = this.state;
    page = page + 1;

    console.log(page);
    const resp = await fetchFindResult(name, page);
    const { data } = resp;
    this.setState({
      loading: false,
      data: data,
      page: page,
    });
  };

  handleNameChange = event => {
    this.setState({ name: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { name, loading, data, showModal, modalPic } = this.state;

    return (
      <>
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchForm__button}>
              <FaSearch />
            </button>

            <input
              className={css.searchForm__input}
              type="text"
              value={name}
              onChange={this.handleNameChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
        {loading && <Loader />}
        <ImageGallery data={data.hits} onClick={this.toggleModal} />
        {data && <Button onClick={this.handlePageIncreace} />}
        {showModal && <Modal onClose={this.toggleModal} picture={modalPic} />}
      </>
    );
  }
}

export default Searchbar;
