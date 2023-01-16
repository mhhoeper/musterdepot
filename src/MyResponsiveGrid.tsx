import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import DepotComponent from "./DepotComponent";
import "./Grid.css"

const ResponsiveGridLayout = WidthProvider(Responsive);

function getLayoutsFromSomewhere() {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 },
        { i: "d", x: 0, y: 2, w: 1, h: 2 }
    ];
    return {layout};
}

class MyResponsiveGrid extends React.Component {

    render() {
        var layouts = getLayoutsFromSomewhere();
        return (
            <ResponsiveGridLayout
                className="Layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            >
                <div key="a" className="Card">a</div>
                <div key="b" className="Card"><DepotComponent keynr={1}>b</DepotComponent></div>
                <div key="c" className="Card">c</div>
                <div key="d" className="Card">d</div>
            </ResponsiveGridLayout>
        )
    }
}

export default MyResponsiveGrid;