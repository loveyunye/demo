import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './assets/iconfont/style.css';
import IndexPage from './router/IndexPage';
import { Provider } from 'react-redux';
import { store } from './reducers/user'

function App() {
  return (
      <Provider store={store}>
        <Router>
          <div style={style.container}>
            <IndexPage/>
          </div>
        </Router>
      </Provider>
  );
}

const style = {
  container: {
    height: '100vh',
    width: '100wh'
  }
}

export default App;
