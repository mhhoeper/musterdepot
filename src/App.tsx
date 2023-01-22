import React, { useState } from 'react';
import './App.css';
import MyResponsiveGrid from "./MyResponsiveGrid";
import SettingsPanel from "./SettingsPanel";
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

function App() {
  const [page, setPage] = useState(0);
  window.Buffer = window.Buffer || require("buffer").Buffer;  // do not know why this is necessary. See https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined

  const pagecontent = page === 1 ? <SettingsPanel /> : <MyResponsiveGrid />;

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-menu"><a href="https://github.com/mhhoeper/musterdepot">Github Repository</a>&nbsp;&nbsp;
      | Menü: <span onClick={() => setPage(0)}>Daten</span> - <span onClick={() => setPage(1)}>Einstellungen</span><br />&nbsp;</div>
      {pagecontent}
    </div>
  );
}

export default App;
