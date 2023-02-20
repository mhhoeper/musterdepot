import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

// Go through the react-router-dom example on https://github.com/Annysah/react-ts-sidebar-menu/blob/master/src/App.tsx

import Sidebar from './components/sidebar/Sidebar';
import { PagesData } from './pages/pagesconfig/PagesData';


// Allow debugging as in https://stackoverflow.com/questions/73919518/debug-routes-with-navigate-routes
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';

const DebugLayout = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  React.useEffect( () => {
    console.log("The current URL is", {...location});
    console.log("The last navigation action was", navigationType);
  }, [location, navigationType]);

  return <Outlet />;
};

const App: React.FunctionComponent = () => {
  // do not know why this is necessary. See https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined
  window.Buffer = window.Buffer || require("buffer").Buffer;  

  return (
    <>
      <HashRouter>
        <Sidebar />
        <Routes>
          <Route element={<DebugLayout />}>
          {PagesData.map( (page, index) => {
            return(
              <Route path={page.path} element={page.content} />
            );
          })}
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
