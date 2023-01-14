import React from "react";
import Grid from "./Grid"

var styles = require("./styles.css");
var reactstyles1 = require("../node_modules/react-grid-layout/css/styles.css");
var reactstyles2 = require("../node_modules/react-resizable/css/styles.css");

function stringifyLayout() {
    return (<div>test</div>);
}

const App = () => {
    return ( 
        <div className="App">
            <div className="LayoutJSON">
                Displayed as <code>[x, y, w, h]</code>:
                <div className="columns">{stringifyLayout()}</div>
            </div>
            {/* Hier muss die nächste Komponente rein.  */}
            <Grid />
        </div>
    );
};

export default App;