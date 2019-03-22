import React, { Component } from 'react';
import Appnavbar from './components/Appnavbar';
import Todolist from './components/Todolist';
import ItemModal from './components/itemModal';
import { Container } from 'reactstrap'; 


import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
    	<Provider store={store}>
      <div className="App">
       <Appnavbar />
       <Container>
         <ItemModal />
         <Todolist />
       </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
