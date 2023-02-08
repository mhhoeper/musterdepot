import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

// Go through the react-router-dom example on https://github.com/Annysah/react-ts-sidebar-menu/blob/master/src/App.tsx


import Sidebar from './components/sidebar/Sidebar'

import MyResponsiveGrid from "./MyResponsiveGrid";
import MobileDepot from "./pages/MobileDepot";
import SettingsPanel from "./SettingsPanel";

const App: React.FunctionComponent = () => {
  // do not know why this is necessary. See https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined
  window.Buffer = window.Buffer || require("buffer").Buffer;  

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/musterdepot' element={<MyResponsiveGrid />} />
          <Route path='/musterdepot/mobiledepot' element={<MobileDepot />} />
          <Route path='/musterdepot/settings' element={<SettingsPanel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
