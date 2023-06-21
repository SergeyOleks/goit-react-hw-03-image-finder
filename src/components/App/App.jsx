import { Component } from 'react';
import css from './App.module.css';
import Searchbar from 'components/Searchbar';



class App extends Component {
  state = {
    showModal: false,
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar />      
      </div>
    );
  }
}

export default App;
