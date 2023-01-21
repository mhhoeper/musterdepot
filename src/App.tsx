import React from 'react';
import './App.css';
import MyResponsiveGrid from "./MyResponsiveGrid";
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

function App() {
  window.Buffer = window.Buffer || require("buffer").Buffer;  // do not know why this is necessary. See https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined

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
