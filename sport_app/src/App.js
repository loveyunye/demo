import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './assets/iconfont/style.css';
import IndexPage from './router/IndexPage';

function App() {
  return (
      <Router>
        <div style={style.container}>
          <IndexPage/>
        </div>
      </Router>
  );
}

const style = {
  container: {
    height: '100vh',
    width: '100wh'
  }
}

export default App;
