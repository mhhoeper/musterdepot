import React from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import DepotComponent from "./DepotComponent";
import DepotComponent2 from "./DepotComponent2";
import "./Grid.css"


function getFromLS(key: string): any {
    let ls: any = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("musterdepot-storage") || "");
        }
        catch (e) {
            // Ignore
        }
    }
    return ls[key];
}

function safeToLS(key: string, value: any) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "musterdepot-storage",
            JSON.stringify({
                [key]: value
            })
        );
    }
}


const originalLayouts = getFromLS("layouts") || {};

const ResponsiveGridLayout = WidthProvider(Responsive);

class MyResponsiveGrid extends React.Component<{}, {layouts: ReactGridLayout.Layouts}> {
    constructor(props: {}) {
        super(props);

        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts))
        };
    }

    static get defaultProps() {
        return {
            className: "layout",
            cols: { lg: 8, md: 6, sm: 4, xs: 2, xxs: 1},
            rowHeight: 30
        };
    }

    onLayoutChange(layout: ReactGridLayout.Layout[], layouts: ReactGridLayout.Layouts) {
        safeToLS("layouts", layouts);
        this.setState({ layouts });
    }

    render() {
        const layoutlg = [
            { i: "a", x: 4, y: 6, w: 2, h: 2},
            { i: "b", x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
            { i: "c", x: 0, y: 3, w: 3, h: 2 },
            { i: "d", x: 6, y: 6, w: 2, h: 2, static: true  }
        ];
        return (
            <ResponsiveGridLayout
                className="Layout"
                layouts={{lg: layoutlg}}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1}}
                rowHeight={30}
                onLayoutChange={(layout, layouts) =>
                    this.onLayoutChange(layout, layouts)
                }
            >
                <div key="a" className="Card">a</div>
                <div key="b" className="Card"><DepotComponent keynr={1}>b</DepotComponent></div>
                <div key="c" className="Card"><DepotComponent2 /></div>
                <div key="d" className="Card">d</div>
            </ResponsiveGridLayout>
        )
    }
}

export default MyResponsiveGrid;