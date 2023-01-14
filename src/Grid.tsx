import React from "react";
import ReactGridLayout from "react-grid-layout";
import GridLayout from "react-grid-layout";

{/* does not compile. try https://codesandbox.io/s/vinojvgrid-layouts-z7pvr */}

const Grid = () => {
    const layout : ReactGridLayout.Layout[] = [
        {i: "a", x: 0, y: 0, w: 1, h: 2, static:true},
        {i: "b", x: 1, y: 0, w: 3, h: 2, minW: 1, maxW: 4 },
        {i: "c", x: 4, y: 0, w: 1, h: 2}
    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
        >
            <div key="a" className="Card">a</div>
            <div key="b" className="Card">b</div>
            <div key="c" className="Card">c</div>
        </GridLayout>
    )
};


interface TitleProps {
    title: string;
    subtitle?: string;
  }
  
  class Title extends React.Component<TitleProps> {
    render() {
      const { title, subtitle, children } = this.props;
      return (
        <>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <div>{children}</div>
        </>
      );
    }
  }

export default Grid;