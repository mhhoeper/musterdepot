import React from 'react';
import './App.css';
import MyResponsiveGrid from "./MyResponsiveGrid";
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-menu"><a href="https://github.com/mhhoeper/musterdepot">Github Repository</a><br />&nbsp;</div>
      <MyResponsiveGrid />
    </div>
  );
}

export default App;
