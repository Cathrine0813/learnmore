import React from 'react';
import ReduxPage from './pages/ReduxPage';
// import ClassComponent from './pages/ClassComponent';
// import { FunctionComponent } from './pages/FunctionComponent';
// import SetStatePage from './pages/SetStatePage';
// import LifeCyclePage from './pages/LifeCyclePage';
// import HomePage from './pages/HomePage';
// import UserPage from './pages/UserPage';
// import Card from './pages/Card';
// import logo from './logo.svg';
// import './App.css';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return <div className="App">
    {/* <ClassComponent /> */}
    {/* <FunctionComponent /> */}
    {/* <SetStatePage /> */}
    {/* <LifeCyclePage /> */}

    {/* 组件复合 */}
    {/* <HomePage /> */}
    {/* <UserPage /> */}
    {/* <Card /> */}

    {/* redux */}
    <ReduxPage />
    
  </div>
}

export default App;
