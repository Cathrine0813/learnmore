import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import ClassCmp from './pages/ClassCmp'

// 这里是function组件：通常无状态，仅关注内容展示，返回渲染结果即可
function App() {
  // hooks出现可以在function组件中存储state状态
  return (
    <div className="App">
      app
      <ClassCmp/>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
