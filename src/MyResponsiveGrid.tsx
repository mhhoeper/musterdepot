import React from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import { getFromLS, safeToLS } from "./components/configdata/LocalStorage";
import DepotComponent2 from "./DepotComponent2";
import "./Grid.css"


const layoutlg = [
    { i: "a", x: 4, y: 6, w: 2, h: 2},
    { i: "b", x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 0, y: 3, w: 3, h: 2 },
    { i: "d", x: 6, y: 6, w: 2, h: 2, static: true  }
];
const presetlayouts = {lg: layoutlg};
const originalLayouts = getFromLS("layouts") || presetlayouts;

const ResponsiveGridLayout = WidthProvider(Responsive);

class MyResponsiveGrid extends React.Component<{}, {layouts: ReactGridLayout.Layouts}> {
    constructor(props: {}) {
        super(props);

        console.log("read original layout for grid\n" + JSON.stringify(originalLayouts));
        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts))
        };
    }

    onLayoutChange(layout: ReactGridLayout.Layout[], layouts: ReactGridLayout.Layouts) {
        console.log("onLayoutChange\nlayout:\n" + JSON.stringify(layout) + "\nlayouts:\n" + JSON.stringify(layouts));
        safeToLS("layouts", layouts);
        this.setState({ layouts });
    }

    render() {
        console.log("Compare local storage layout in state variable and old preset:\n" + JSON.stringify(this.state.layouts) + "\n" + JSON.stringify(presetlayouts));
        return (
            <ResponsiveGridLayout
                className="Layout"
                layouts={this.state.layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1}}
                rowHeight={140}
                onLayoutChange={(layout, layouts) =>
                    this.onLayoutChange(layout, layouts)
                }
            >
                <div key="a" className="Card">a</div>
                <div key="b" className="Card">b</div>
                <div key="c" className="Card"><DepotComponent2 /></div>
                <div key="d" className="Card">d</div>
            </ResponsiveGridLayout>
        )
    }
}

export default MyResponsiveGrid;