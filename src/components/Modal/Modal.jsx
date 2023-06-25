import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {

    if (e.target === e.currentTarget) {
       this.props.onClose();
    }
  };

  render() {
    const { picture } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={picture.largeImageURL} alt={picture.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes= {
  picture: PropTypes.string,
}