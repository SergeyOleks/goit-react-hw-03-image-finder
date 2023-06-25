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
    pageFlag: true,
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
    let { name, page, pageFlag } = this.state;
    event.preventDefault();
    this.setState({ loading: true });

    if (name.trim() === '') {
      this.setState({
        pageFlag: false,
        loading: false,
      });
      return;
    }

    const resp = await fetchFindResult(name, page);
    const { data } = resp;

    console.log(data);

    if (!data || data['hits'].length === 0) {
      this.setState({
        data: false,
        loading: false,
        pageFlag: false,
      });

      return;
    }

    if (data.totalHits <= 12) {
      pageFlag = false;
    }

    setTimeout(() => {
      this.setState({
        pageFlag: pageFlag,
        loading: false,
        data: data,
      });
    }, 1000);
  };

  handlePageIncreace = async () => {
    let { page, name, pageFlag } = this.state;
    page = page + 1;

    const resp = await fetchFindResult(name, page);
    const { data } = resp;

    data.hits = this.state.data.hits.concat(data.hits);

    console.log('page', page);
    console.log(data);

    if (page * 12 >= this.state.data.totalHits) {
      console.log(pageFlag);
      pageFlag = false;
    }

    this.setState({
      pageFlag: pageFlag,
      loading: false,
      data: data,
      page: page,
    });
  };

  handleNameChange = event => {
    this.setState({ name: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { name, loading, data, showModal, modalPic, pageFlag } = this.state;

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
        {data && pageFlag && <Button onClick={this.handlePageIncreace} />}
        {showModal && <Modal onClose={this.toggleModal} picture={modalPic} />}
      </>
    );
  }
}

export default Searchbar;
